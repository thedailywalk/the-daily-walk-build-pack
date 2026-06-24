import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { TOPICS } from "@/lib/library";
import { detectTopics, suggestVersesForTopics } from "@/lib/scripture";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Pathlight — the member Bible guide. Uses Claude when ANTHROPIC_API_KEY is set;
 * otherwise gives a genuinely useful, Scripture-grounded fallback (related verses
 * for the topic) so the feature still helps before the key is added.
 *
 * Guardrails (system prompt + by design): Pathlight is a study aid, never a
 * replacement for Scripture, prayer, the local church, or a pastor — and it
 * routes anyone in crisis to real human help.
 */

const SYSTEM = `You are Pathlight, the warm Bible-reading companion inside "The Daily Walk," a Christian devotional app.

Your purpose: help people understand Scripture, reflect on devotional topics, find related verses, write honest prayers, and keep walking with God day by day.

Voice: warm, clear, practical, encouraging, beginner-friendly. No church jargon, no guilt, welcoming to seasoned believers and the just-curious alike. Keep replies fairly short and readable.

Always:
- Ground what you say in Scripture and cite the reference (book chapter:verse). When you quote more than a phrase, use a public-domain translation (World English Bible or KJV).
- End by gently turning the person back to the text itself or to prayer.

Firm guardrails — never break these:
- You are a study aid, NOT a replacement for reading the Bible yourself, for prayer, for a local church, or for a pastor. Encourage all of these often.
- Stay within historic, mere-Christian belief. On secondary matters Christians disagree about (denominational debates, end-times views, baptism modes, etc.), present the main views fairly, say faithful believers differ, and point them to study it themselves and ask their pastor. Don't crown a winner.
- Do not give medical, legal, or financial advice.
- If someone sounds like they may be in crisis or considering self-harm, respond with compassion, urge them to reach out right now to someone they trust, their pastor, or a crisis line (in the US, call or text 988), and remind them they are deeply loved by God. Do not try to be their counselor.
- Never claim to be God, the Holy Spirit, or to speak with divine authority. You're a humble guide pointing to Him.`;

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const user = await getUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  }
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") {
    return NextResponse.json({ error: "Pathlight is a member feature." }, { status: 403 });
  }

  let messages: Msg[] = [];
  try {
    const body = (await request.json()) as { messages?: Msg[] };
    messages = (body.messages ?? [])
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-12);
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  const key = process.env.ANTHROPIC_API_KEY;

  // ---- Fallback (no AI key): Scripture-grounded related verses ----
  if (!key) {
    const topics = detectTopics(lastUser, [...TOPICS]);
    const verses = suggestVersesForTopics(topics.length ? topics : ["Faith"], 4);
    const lines = verses.map((v) => `• ${v.ref} — “${v.text}”`).join("\n");
    const theme = topics[0] ? topics[0].toLowerCase() : "faith";
    const reply =
      `Here are a few verses that speak to ${theme}. Read them slowly, and let one of them be your prayer today:\n\n${lines}\n\n` +
      `Sit with whichever line catches you, talk to God honestly about it, and if it stirs something deeper, bring it to a trusted friend or your pastor too.\n\n` +
      `_(Pathlight's full conversation turns on once an AI key is added — for now I'll always point you to Scripture to start.)_`;
    return NextResponse.json({ reply, mode: "verses" });
  }

  // ---- Claude ----
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GUIDE_MODEL ?? "claude-haiku-4-5-20251001",
        max_tokens: 800,
        system: SYSTEM,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { reply: "I couldn't reach the study desk just now — try again in a moment. Meanwhile, open today's reading and sit with one verse." },
        { status: 200 }
      );
    }
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const reply = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("\n").trim();
    return NextResponse.json({ reply: reply || "Let's start with Scripture — what passage are you reading today?", mode: "ai" });
  } catch {
    return NextResponse.json(
      { reply: "Something interrupted us. Try again shortly — and keep that Bible open." },
      { status: 200 }
    );
  }
}
