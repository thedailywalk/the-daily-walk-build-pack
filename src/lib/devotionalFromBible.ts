import "server-only";
import fs from "node:fs";
import path from "node:path";
import { getStudyDay } from "@/lib/studyGuide";
import type { DevotionalData } from "@/lib/devotionals";

/**
 * Generate a daily devotional written FROM the actual Bible passage being read
 * that day — grounded in what those chapters really say — using The Daily Walk's
 * brand voice and existing writing only as *style inspiration* (how it sounds,
 * not what it says). Verses are quoted from the NIV.
 *
 * Best-effort: returns a partial DevotionalData to merge over the library-seeded
 * base when ANTHROPIC_API_KEY is set and the model responds; returns null
 * otherwise, so the existing study-library content stands as the fallback.
 */

/* ---- Voice guide, distilled once from the brand docs + a real sample ---- */

function readContext(file: string): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), "context", file), "utf8");
  } catch {
    return "";
  }
}

/**
 * The blend + the feel — shared by the daily and premium generators. Keeps the
 * Bible as the backbone, AI as the connective tissue, and your saved material as
 * an occasional personal touch (never the crutch).
 */
export const BLEND_AND_FEEL = `THE BLEND (how to weave the sources — this matters):
- The Bible passage is the BACKBONE. Everything grows out of what the passage actually says.
- YOU, the writer, fill the gaps: make it clear, real, relevant to today, and quietly motivating. This connective tissue is most of the piece.
- The author's own saved material (when provided below) is an OCCASIONAL personal touch — draw on it ONLY when it genuinely fits today's passage and adds something the text alone doesn't. Never lean on it two days in a row, never let it carry the piece, and always rework it into your own flow. Most days, the passage + your own writing are all you need.

THE FEEL (your north star):
Write so that by the last line it feels real and written for today — clear, honest, and quietly motivating. It should help get the reader's mind right and ready for the day's battles, and leave them wanting tomorrow's. No fluff, no guilt, no church clichés.`;

let voiceCache: string | null = null;
export function voiceGuide(): string {
  if (voiceCache) return voiceCache;

  // Brand voice, straight from your own docs.
  const brand = readContext("02-brand-guide.md");
  const voiceSection =
    brand.split(/## Voice & tone/i)[1]?.split(/## /)[0]?.trim() ?? "";

  // One real, hand-written day as "write it like this" inspiration (not to copy).
  const sample = getStudyDay(1); // Day 1 — John 1, fully authored in your voice

  voiceCache = `THE DAILY WALK — HOW WE WRITE (voice inspiration, do not copy the words):
${voiceSection}

Extra house rules:
- Plain, warm, human. Short sentences. One idea per piece.
- No church jargon; if a churchy term is unavoidable, gloss it in everyday words.
- Never guilt or shame. "Welcome back," never "you're behind."
- Write so a curious non-believer feels at home right next to a lifelong Christian.
- Concrete over abstract. Everyday images (a dark room, a locked door, breakfast) over lofty ones.

EXAMPLE OF OUR VOICE (from a past issue on ${sample.reading} — match this FEEL, don't reuse these words or this passage):
Context: ${sample.context}
Plain English: ${sample.plainEnglish}
Real life: ${sample.realLife}
Prayer: ${sample.prayer}
Try this today: ${sample.step}`;
  return voiceCache;
}

/* ------------------------------ generation ------------------------------ */

export type BibleDevotionalInput = {
  reading: string; // e.g. "John 1" — the actual passage to write from
  arc?: string; // e.g. "John"
  theme?: string; // weekly focus
  weekday: string; // e.g. "Monday"
  isWednesday: boolean;
  libraryMaterial?: string; // your own on-topic notes/take to optionally draw on
};

type Draft = {
  readingHeading: string; // short "what this shows about God" headline
  readingIntro: string; // sets up the passage (2–4 sentences)
  verseText: string; // ONE verse quoted from the passage, NIV wording
  verseRef: string; // e.g. "John 1:5"
  readingAfter: string; // plain-English walk-through of the actual passage
  makeItRealHeading: string;
  makeItRealBody: string; // application + "Try this today: …" + a concrete example
  question: string; // one honest reflection question
  prayer: string;
  closingLine: string;
  pastorTake?: string;
};

export async function draftDevotionalFromBible(
  input: BibleDevotionalInput
): Promise<Partial<DevotionalData> | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const wed = input.isWednesday
    ? `\n- "pastorTake": a short midweek encouragement (2–3 sentences) from this passage, warm and practical.`
    : "";

  const material = input.libraryMaterial?.trim()
    ? `

YOUR OWN MATERIAL (the author personally wrote this — her "Personal Take · In My Own Words · The Science Behind It," plus notes):
${input.libraryMaterial.trim()}

HOW TO USE IT: This is the OCCASIONAL personal touch from "THE BLEND" above — not the backbone. You MAY draw on its insight, angle, or science/psychology ONLY where it genuinely fits ${input.reading} and today's focus, and even then keep it light — a thread, not the whole cloth. Rework it into your own smooth flow; never paste it verbatim, always tweak it. If nothing here fits today's passage, ignore all of it and write from the passage alone — that's the normal case, not a failure.`
    : "";

  const user = `Write today's short devotional for The Daily Walk, grounded ENTIRELY in this Bible passage:

  PASSAGE: ${input.reading}${input.arc ? ` (part of ${input.arc})` : ""}
  ${input.theme ? `This week's focus: ${input.theme}` : ""}
  Day of week: ${input.weekday}

RULES:
- Everything must come from what ${input.reading} ACTUALLY says — the real people, events, and words in those verses. Do not invent details that aren't in the passage.
- Quote exactly ONE verse from ${input.reading}, using the NIV wording, and give its reference (book chapter:verse).
- Keep it short and readable — a 2–3 minute read total.
- Follow the voice below closely (match the feel; never reuse its example words).

${voiceGuide()}

${BLEND_AND_FEEL}${material}

Return ONLY a JSON object (no markdown, no commentary) with these exact keys:
{
  "readingHeading": "a short headline naming what this passage shows about who God is (max ~9 words)",
  "readingIntro": "2–4 warm sentences setting up what's happening in ${input.reading}",
  "verseText": "the NIV text of one verse from ${input.reading}, no quotation marks",
  "verseRef": "the reference for that verse, e.g. 'John 1:5'",
  "readingAfter": "a plain-English walk-through of what actually happens in ${input.reading} and why it matters (3–5 sentences)",
  "makeItRealHeading": "a short, human heading for the application (max ~6 words)",
  "makeItRealBody": "how this lands in real, everyday life, then 'Try this today: <one small concrete step>', then 'For example, <a specific relatable example of doing it>.'",
  "question": "one honest reflection question, beginning with the emoji 👉",
  "prayer": "a short first-person prayer (2–3 sentences) flowing from this passage",
  "closingLine": "one encouraging closing sentence, no guilt"${wed ? `,\n  "pastorTake": "a short midweek encouragement (2–3 sentences) from this passage"` : ""}
}${wed}`;

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
          process.env.DEVOTIONAL_MODEL ??
          process.env.GUIDE_MODEL ??
          "claude-haiku-4-5-20251001",
        max_tokens: 1400,
        messages: [{ role: "user", content: user }],
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const raw = (data.content ?? [])
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("")
      .trim();
    const draft = parseDraft(raw);
    if (!draft) return null;

    const q = draft.question.trim();
    const out: Partial<DevotionalData> = {
      readingHeading: draft.readingHeading.trim(),
      readingIntro: draft.readingIntro.trim(),
      verseText: draft.verseText.replace(/^["“]|["”]$/g, "").trim(),
      verseRef: draft.verseRef.trim(),
      readingAfter: draft.readingAfter.trim(),
      makeItRealHeading: draft.makeItRealHeading.trim(),
      makeItRealBody: draft.makeItRealBody.trim(),
      question: q.startsWith("👉") ? q : `👉 ${q}`,
      prayer: draft.prayer.trim(),
      closingLine: draft.closingLine.trim(),
    };
    if (input.isWednesday && draft.pastorTake) {
      out.pastorTake = draft.pastorTake.trim();
      out.pastorByline =
        "— a midweek encouragement. Swap in a featured pastor's quote when you have one.";
    }
    // Drop any field the model left blank so the library base fills it in.
    for (const k of Object.keys(out) as (keyof DevotionalData)[]) {
      if (!String(out[k] ?? "").trim()) delete out[k];
    }
    return out;
  } catch {
    return null;
  }
}

/** Pull the JSON object out of the model's reply, tolerating code fences. */
function parseDraft(raw: string): Draft | null {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) text = fence[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const obj = JSON.parse(text.slice(start, end + 1)) as Partial<Draft>;
    if (!obj.readingAfter || !obj.prayer) return null;
    return {
      readingHeading: obj.readingHeading ?? "",
      readingIntro: obj.readingIntro ?? "",
      verseText: obj.verseText ?? "",
      verseRef: obj.verseRef ?? "",
      readingAfter: obj.readingAfter ?? "",
      makeItRealHeading: obj.makeItRealHeading ?? "",
      makeItRealBody: obj.makeItRealBody ?? "",
      question: obj.question ?? "",
      prayer: obj.prayer ?? "",
      closingLine: obj.closingLine ?? "",
      pastorTake: obj.pastorTake,
    };
  } catch {
    return null;
  }
}
