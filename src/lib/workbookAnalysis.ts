import "server-only";
import { getStudyDay } from "@/lib/studyGuide";
import { detectTopics, detectEmotion } from "@/lib/scripture";
import { TOPICS } from "@/lib/library";
import {
  dayThemes,
  listDayStates,
  EDITABLE_FIELDS,
  type EditableField,
} from "@/lib/workbookEvolution";

/**
 * Analyze a piece of inspiration (a reel/sermon transcript, a note, etc.) and
 * propose TARGETED workbook updates — only on study days with a genuine thematic
 * fit, never on locked days. The inspiration shapes DELIVERY (warmth, pacing,
 * relatability, story, gentle humor), never doctrine. Uses Claude when
 * ANTHROPIC_API_KEY is set; a solid heuristic otherwise.
 */

export type AnalysisInput = {
  text: string;
  sourceLabel: string;
  sourceType: string;
  link?: string;
  maxPlacements?: number;
};

export type Placement = {
  dayIndex: number;
  reading: string;
  themes: string[];
  targetField: EditableField;
  currentText: string;
  whyFits: string;
  proposedText: string;
  impact: string;
};

export type Analysis = {
  themes: string[];
  tone: string;
  techniques: string[];
  placements: Placement[];
  mode: "ai" | "heuristic";
};

/* ----------------------------- tone / technique ---------------------------- */

const TECHNIQUE_CUES: [string, RegExp][] = [
  ["personal story", /\b(i remember|when i was|my (mom|dad|story|life)|years ago|growing up)\b/i],
  ["direct address", /\b(you|your|let me ask you|here's the thing|listen)\b/i],
  ["gentle humor", /\b(funny|laugh|joke|ridiculous|let's be honest|i'm not gonna lie)\b/i],
  ["vivid metaphor", /\b(it's like|imagine|picture this|kind of like|as if)\b/i],
  ["question hook", /\?/],
  ["repetition / rhythm", /\b(\w+)\b[\s,]+\1\b/i],
  ["practical step", /\b(today|this week|try this|start by|one thing)\b/i],
];

function detectTechniques(text: string): string[] {
  const out: string[] = [];
  for (const [name, re] of TECHNIQUE_CUES) {
    if (re.test(text) && !out.includes(name)) out.push(name);
  }
  return out.slice(0, 5);
}

function describeTone(text: string, techniques: string[]): string {
  const bits: string[] = [];
  if (techniques.includes("personal story")) bits.push("story-driven");
  if (techniques.includes("direct address")) bits.push("warm and personal");
  if (techniques.includes("gentle humor")) bits.push("lighthearted");
  if (techniques.includes("vivid metaphor")) bits.push("picture-rich");
  if (techniques.includes("practical step")) bits.push("practical");
  if (!bits.length) bits.push("encouraging");
  const emotion = detectEmotion(text);
  if (emotion) bits.push(emotion);
  return bits.slice(0, 3).join(", ");
}

/* ------------------------------- field choice ------------------------------ */

/** Which study-day field a theme most naturally strengthens. */
const THEME_FIELD: Record<string, EditableField> = {
  Anxiety: "realLife",
  Grief: "realLife",
  Fear: "realLife",
  Healing: "realLife",
  Forgiveness: "realLife",
  Identity: "aboutPeople",
  Purpose: "aboutPeople",
  Prayer: "prayer",
  Confidence: "realLife",
  Obedience: "step",
  Discipline: "step",
  Wisdom: "plainEnglish",
  "Bible Study": "plainEnglish",
  Testimonies: "realLife",
  Relationships: "realLife",
};

function fieldForTheme(theme: string): EditableField {
  return THEME_FIELD[theme] ?? "realLife";
}

function trimExcerpt(text: string, max = 600): string {
  const t = text.trim().replace(/\s+/g, " ");
  return t.length <= max ? t : t.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/* ------------------------------ candidate match ---------------------------- */

type Candidate = { dayIndex: number; overlap: string[]; score: number };

/** Score every UNLOCKED day by theme overlap with the inspiration. */
async function rankCandidates(themes: string[], limit: number): Promise<Candidate[]> {
  const states = await listDayStates();
  const set = new Set(themes);
  const out: Candidate[] = [];
  for (let d = 1; d <= 365; d++) {
    if (states.get(d)?.status === "locked") continue; // protect locked days
    const dt = dayThemes(d);
    const overlap = dt.filter((t) => set.has(t));
    if (!overlap.length) continue;
    // Prefer days that aren't already approved (still evolving), and stronger overlap.
    const statusBoost = states.get(d)?.status === "approved" ? -0.5 : 0;
    out.push({ dayIndex: d, overlap, score: overlap.length + statusBoost });
  }
  out.sort((a, b) => b.score - a.score || a.dayIndex - b.dayIndex);
  return out.slice(0, limit);
}

/* ------------------------------- heuristic --------------------------------- */

function heuristicProposed(
  currentText: string,
  theme: string,
  tone: string,
  excerpt: string
): string {
  const bridge =
    `Here's a way to picture it: ${excerpt.split(/[.!?]/)[0].trim()}. ` +
    `That's what ${theme.toLowerCase()} can feel like — and it's exactly where today's reading meets you. ` +
    `[Draft in a ${tone} voice — read it aloud and make it sound like you before approving.]`;
  return `${currentText.trim()}\n\n${bridge}`;
}

function heuristicAnalysis(input: AnalysisInput, candidates: Candidate[], themes: string[], tone: string, techniques: string[]): Analysis {
  const excerpt = trimExcerpt(input.text);
  const placements: Placement[] = candidates.map((c) => {
    const s = getStudyDay(c.dayIndex);
    const theme = c.overlap[0] ?? themes[0] ?? "Faith";
    const field = fieldForTheme(theme);
    const current = String((s as unknown as Record<string, unknown>)[field] ?? "");
    return {
      dayIndex: c.dayIndex,
      reading: s.reading,
      themes: c.overlap,
      targetField: field,
      currentText: current,
      whyFits:
        `Day ${c.dayIndex} (${s.reading}) already centers on ${c.overlap.join(" & ")}. ` +
        `The ${input.sourceType} you saved explains ${theme.toLowerCase()} in a ${tone} way that would make this section land harder.`,
      proposedText: heuristicProposed(current, theme, tone, excerpt),
      impact: `A more relatable, ${tone} take on ${theme.toLowerCase()} — same Scripture, warmer delivery.`,
    };
  });
  return { themes, tone, techniques, placements, mode: "heuristic" };
}

/* ----------------------------------- AI ------------------------------------ */

type AiPlacement = {
  dayIndex: number;
  targetField?: string;
  whyFits?: string;
  proposedText?: string;
  impact?: string;
  skip?: boolean;
};

const AI_SYSTEM = `You are the editorial assistant for "The Daily Walk," a Christian devotional workbook. You improve how lessons are DELIVERED using inspiration the owner provides (reel/sermon transcripts, notes).

Hard rules:
- Inspiration shapes delivery only — warmth, pacing, relatability, storytelling, gentle humor, plain-language application. NEVER change doctrine, and never copy the inspiration's wording. Everything you write is original.
- Stay biblically sound, encouraging, and beginner-friendly. No church jargon, no guilt.
- You revise ONE field of a study day at a time, keeping its existing meaning and Scripture, just making it land better. Keep length similar (you may add 1–3 sentences).
- If a candidate day does not genuinely fit the inspiration's theme, set "skip": true for it. Quality over quantity.
- Voice: like a trusted mentor sitting beside the reader. Vary naturally — some moments deeper, some lighter.

Return ONLY valid JSON, no prose.`;

async function aiAnalysis(
  input: AnalysisInput,
  candidates: Candidate[],
  themes: string[],
  tone: string,
  techniques: string[]
): Promise<Analysis | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const dayPayload = candidates.map((c) => {
    const s = getStudyDay(c.dayIndex);
    const field = fieldForTheme(c.overlap[0] ?? themes[0] ?? "Faith");
    return {
      dayIndex: c.dayIndex,
      reading: s.reading,
      sharedThemes: c.overlap,
      targetField: field,
      currentText: String((s as unknown as Record<string, unknown>)[field] ?? ""),
    };
  });

  const user = `INSPIRATION (${input.sourceType}${input.sourceLabel ? ` — ${input.sourceLabel}` : ""}):
"""
${trimExcerpt(input.text, 2500)}
"""

Detected themes: ${themes.join(", ") || "(none)"}
Detected tone: ${tone}

CANDIDATE STUDY DAYS to consider improving (only where there's a real thematic fit):
${JSON.stringify(dayPayload, null, 2)}

For EACH candidate, return an object: { "dayIndex", "targetField", "whyFits" (1 sentence on the thematic connection), "proposedText" (the FULL revised field text — existing meaning kept, delivery improved, original wording), "impact" (1 sentence on what improves for the reader), "skip" (true if it doesn't truly fit) }.

Respond with JSON: { "tone": "...", "techniques": ["..."], "placements": [ ... ] }`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.WORKBOOK_MODEL ?? process.env.GUIDE_MODEL ?? "claude-haiku-4-5-20251001",
        max_tokens: 3000,
        system: AI_SYSTEM,
        messages: [{ role: "user", content: user }],
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const raw = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("").trim();
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as { tone?: string; techniques?: string[]; placements?: AiPlacement[] };

    const byDay = new Map(candidates.map((c) => [c.dayIndex, c]));
    const placements: Placement[] = [];
    for (const p of parsed.placements ?? []) {
      if (p.skip || !p.proposedText?.trim()) continue;
      const c = byDay.get(p.dayIndex);
      if (!c) continue;
      const s = getStudyDay(p.dayIndex);
      const tf = (EDITABLE_FIELDS as readonly string[]).includes(String(p.targetField))
        ? (p.targetField as EditableField)
        : fieldForTheme(c.overlap[0] ?? "Faith");
      placements.push({
        dayIndex: p.dayIndex,
        reading: s.reading,
        themes: c.overlap,
        targetField: tf,
        currentText: String((s as unknown as Record<string, unknown>)[tf] ?? ""),
        whyFits: p.whyFits?.trim() || `Shares the theme of ${c.overlap.join(" & ")}.`,
        proposedText: p.proposedText.trim(),
        impact: p.impact?.trim() || "A warmer, more relatable delivery of the same truth.",
      });
    }
    if (!placements.length) return null;
    return {
      themes,
      tone: parsed.tone?.trim() || tone,
      techniques: parsed.techniques?.length ? parsed.techniques.slice(0, 6) : techniques,
      placements,
      mode: "ai",
    };
  } catch {
    return null;
  }
}

/* --------------------------------- public ---------------------------------- */

export async function analyzeInspiration(input: AnalysisInput): Promise<Analysis> {
  const themes = detectTopics(input.text, [...TOPICS]);
  const techniques = detectTechniques(input.text);
  const tone = describeTone(input.text, techniques);
  const limit = Math.min(Math.max(input.maxPlacements ?? 5, 1), 8);

  if (!themes.length) {
    return { themes, tone, techniques, placements: [], mode: "heuristic" };
  }

  const candidates = await rankCandidates(themes, limit);
  if (!candidates.length) {
    return { themes, tone, techniques, placements: [], mode: "heuristic" };
  }

  const ai = await aiAnalysis(input, candidates, themes, tone, techniques);
  return ai ?? heuristicAnalysis(input, candidates, themes, tone, techniques);
}
