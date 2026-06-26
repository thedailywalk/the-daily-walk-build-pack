import "server-only";

/**
 * Turn a saved piece of inspiration (science / neuroscience / wellness / a
 * practical note) into a draft "The Science Behind It" angle for the Spiritual
 * Wellness Guide. Inspiration ONLY — never copied verbatim. Uses Claude when
 * ANTHROPIC_API_KEY is set; a gentle heuristic otherwise.
 */

function trim(text: string, max = 2600): string {
  const t = text.trim().replace(/\s+/g, " ");
  return t.length <= max ? t : t.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

const SYSTEM = `You are the editorial assistant for "The Daily Walk" Spiritual Wellness Guide. You turn the owner's saved inspiration (science/neuroscience/wellness/practical notes) into a draft "The Science Behind It" entry — faith + grounded science, woven together warmly.

Rules:
- Inspiration ONLY. Never copy its wording; everything original. Stay scientifically responsible (no hype, no fake studies) and biblically sound.
- Warm, plain-language, beginner-friendly. No jargon, no guilt. Like a trusted friend who also happens to understand the brain.
- Pair the finding with a fitting Scripture, and end with one tiny, doable practice.

Return ONLY valid JSON: { "heading", "verse" (e.g. "“…” — Romans 12:2"), "body" (2 short paragraphs), "practice" (one sentence) }.`;

function format(d: { heading?: string; verse?: string; body?: string; practice?: string }): string {
  const parts = [
    d.heading?.trim() ? `✦ ${d.heading.trim()}` : "",
    d.verse?.trim() ?? "",
    d.body?.trim() ?? "",
    d.practice?.trim() ? `Try this today: ${d.practice.trim()}` : "",
  ].filter(Boolean);
  return parts.join("\n\n");
}

async function ai(text: string, title: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.WORKBOOK_MODEL ?? process.env.GUIDE_MODEL ?? "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        system: SYSTEM,
        messages: [{ role: "user", content: `INSPIRATION${title ? ` — ${title}` : ""}:\n"""\n${trim(text)}\n"""\n\nDraft one "The Science Behind It" entry inspired by this. JSON only.` }],
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const raw = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("").trim();
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as { heading?: string; verse?: string; body?: string; practice?: string };
    if (!parsed.body?.trim()) return null;
    return format(parsed);
  } catch {
    return null;
  }
}

/** Draft a "Science Behind It" angle from inspiration; null if there's too little to work with. */
export async function draftWellnessScience(text: string, title: string): Promise<string | null> {
  if (text.trim().length < 40) return null;
  const fromAi = await ai(text, title);
  if (fromAi) return fromAi;
  // Heuristic fallback — a clearly-marked starting point.
  const first = text.trim().replace(/\s+/g, " ").split(/(?<=[.!?])\s/)[0] ?? "";
  return format({
    heading: title || "A science-backed angle to develop",
    verse: "“…be transformed by the renewing of your mind.” — Romans 12:2",
    body: `${first}\n\n[Draft from your saved inspiration — shape it into a warm "Science Behind It" entry: the finding, why it matters, and how it meets faith. Set ANTHROPIC_API_KEY for an auto-written version.]`,
    practice: "Add one small, doable practice here.",
  });
}
