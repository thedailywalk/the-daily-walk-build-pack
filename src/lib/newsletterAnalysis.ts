import "server-only";
import { detectTopics } from "@/lib/scripture";
import { TOPICS } from "@/lib/library";
import {
  adminGetByDate,
  fullDevotionalFor,
  upcomingDates,
  weekdayLabel,
  type DevotionalData,
} from "@/lib/devotionals";
import { premiumGetByDate, fullPremiumFor, type PremiumData } from "@/lib/premium";
import { fieldsFor, type Publication } from "@/lib/newsletterEvolution";

/**
 * Analyze the owner's recent inspiration against the UPCOMING week of newsletters
 * (free daily + premium) and propose edits that make each issue read fresher and
 * more relevant to today and this generation. Inspiration shapes DELIVERY only —
 * warmth, relatability, real-life framing — never Scripture or doctrine. Uses
 * Claude when ANTHROPIC_API_KEY is set; returns nothing otherwise (no filler in
 * outward-facing copy).
 */

export type NewsletterPlacement = {
  publication: Publication;
  issueDate: string;
  targetField: string;
  currentText: string;
  proposedText: string;
  whyFits: string;
  impact: string;
  themes: string[];
  tone: string;
};

export type NewsletterAnalysis = {
  themes: string[];
  placements: NewsletterPlacement[];
  mode: "ai" | "none";
};

function trim(text: string, max: number): string {
  const t = (text ?? "").trim().replace(/\s+/g, " ");
  return t.length <= max ? t : t.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

type EditionPayload = {
  publication: Publication;
  issueDate: string;
  weekday: string;
  fields: Record<string, string>;
};

/** Build the current text of the next `days` editions for both publications. */
async function buildEditions(days: number): Promise<{
  payload: EditionPayload[];
  current: Map<string, string>; // "pub:date:field" -> current text
}> {
  const dates = upcomingDates(days);
  const payload: EditionPayload[] = [];
  const current = new Map<string, string>();

  for (const date of dates) {
    // Free daily
    {
      const existing = await adminGetByDate(date);
      const data: DevotionalData = existing?.data ?? fullDevotionalFor(date);
      const fields: Record<string, string> = {};
      for (const f of fieldsFor("free")) {
        const v = String((data as unknown as Record<string, unknown>)[f] ?? "");
        fields[f] = v;
        current.set(`free:${date}:${f}`, v);
      }
      payload.push({ publication: "free", issueDate: date, weekday: weekdayLabel(date), fields });
    }
    // Premium
    {
      const existing = await premiumGetByDate(date);
      const data: PremiumData = existing?.data ?? fullPremiumFor(date);
      const fields: Record<string, string> = {};
      for (const f of fieldsFor("premium")) {
        const v = String((data as unknown as Record<string, unknown>)[f] ?? "");
        fields[f] = v;
        current.set(`premium:${date}:${f}`, v);
      }
      payload.push({ publication: "premium", issueDate: date, weekday: weekdayLabel(date), fields });
    }
  }
  return { payload, current };
}

const AI_SYSTEM = `You are the editorial assistant for "The Daily Walk," a Christian devotional newsletter (a free daily edition and a deeper premium edition). The owner saves inspiration — reels, sermons, notes, ideas. You use it as INSPIRATION ONLY to make the UPCOMING issues read fresher and more relatable to today and to this generation.

Absolute rules:
- NEVER copy the inspiration's wording; NEVER paste it in verbatim.
- NEVER change Scripture, verses, references, or doctrine. You only touch the prose delivery fields you are given.
- Keep each field's core meaning; rewrite in original, warm, plain language (no church jargon, no guilt), similar length to the original.

What a great edit feels like: organic and human, personal and warm, spiritually grounded in that issue's theme, practical for everyday life, and clearly more relevant to today's world and this generation than the original — without chasing trends or sounding gimmicky.

Only propose an edit where it genuinely improves the issue. Quality over quantity. Return ONLY valid JSON, no prose.`;

type AiEdition = {
  publication?: string;
  issueDate?: string;
  edits?: Array<{ field?: string; proposedText?: string; whyFits?: string; impact?: string }>;
};

export async function analyzeNewsletters(input: {
  text: string;
  sourceLabel: string;
  days?: number;
}): Promise<NewsletterAnalysis> {
  const themes = detectTopics(input.text, [...TOPICS]);
  const key = process.env.ANTHROPIC_API_KEY;
  const days = Math.min(Math.max(input.days ?? 7, 1), 7);
  const { payload, current } = await buildEditions(days);

  if (!key) return { themes, placements: [], mode: "none" };

  const editionsForPrompt = payload.map((e) => ({
    publication: e.publication,
    issueDate: e.issueDate,
    weekday: e.weekday,
    editableFields: Object.fromEntries(
      Object.entries(e.fields).map(([k, v]) => [k, trim(v, 400)])
    ),
  }));

  const user = `INSPIRATION (${input.sourceLabel}):
"""
${trim(input.text, 3000)}
"""

Detected themes: ${themes.join(", ") || "(general faith)"}

UPCOMING ISSUES (edit only the fields listed for each; leave the rest alone):
${JSON.stringify(editionsForPrompt, null, 2)}

For EACH issue that genuinely benefits, return:
{ "publication", "issueDate", "edits": [ { "field" (one of that issue's editable field keys), "proposedText" (the FULL rewritten field — original wording, same meaning, warmer and more relevant to today), "whyFits" (1 short sentence), "impact" (1 short sentence on what improves for the reader) } ] }
Include only fields that genuinely get better. Omit issues you wouldn't change.

Respond with JSON: { "issues": [ ... ] }`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model:
          process.env.NEWSLETTER_MODEL ??
          process.env.WORKBOOK_MODEL ??
          process.env.GUIDE_MODEL ??
          "claude-haiku-4-5-20251001",
        max_tokens: 5000,
        system: AI_SYSTEM,
        messages: [{ role: "user", content: user }],
      }),
      cache: "no-store",
    });
    if (!res.ok) return { themes, placements: [], mode: "none" };
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const raw = (data.content ?? [])
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("")
      .trim();
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as { issues?: AiEdition[] };

    const placements: NewsletterPlacement[] = [];
    for (const iss of parsed.issues ?? []) {
      const pub: Publication = iss.publication === "premium" ? "premium" : "free";
      const date = String(iss.issueDate ?? "");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
      const allowed = new Set(fieldsFor(pub));
      const seen = new Set<string>();
      for (const e of iss.edits ?? []) {
        const field = String(e.field ?? "");
        if (!allowed.has(field) || seen.has(field) || !e.proposedText?.trim()) continue;
        const cur = current.get(`${pub}:${date}:${field}`);
        if (cur === undefined) continue; // not a real upcoming edition/field
        seen.add(field);
        placements.push({
          publication: pub,
          issueDate: date,
          targetField: field,
          currentText: cur,
          proposedText: e.proposedText.trim(),
          whyFits: e.whyFits?.trim() || "Makes this issue read fresher and more relatable.",
          impact: e.impact?.trim() || "A warmer, more relevant take on the same message.",
          themes,
          tone: "",
        });
      }
    }
    return { themes, placements, mode: "ai" };
  } catch {
    return { themes, placements: [], mode: "none" };
  }
}
