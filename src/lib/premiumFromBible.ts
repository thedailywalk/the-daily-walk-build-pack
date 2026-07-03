import "server-only";
import { voiceGuide, BLEND_AND_FEEL } from "@/lib/devotionalFromBible";
import type { PremiumData } from "@/lib/premium";

/**
 * Generate the premium "Deeper Walk" devotional FROM the day's actual Bible
 * passage — a richer, deeper companion to the free daily — in The Daily Walk's
 * voice, blending the passage (backbone), fresh writing (fills the gaps), and
 * the author's own saved material (an occasional personal touch). Verses NIV.
 *
 * Best-effort: returns a partial PremiumData to merge over the library-seeded
 * base when ANTHROPIC_API_KEY is set; returns null otherwise so the existing
 * study-library content stands as the fallback.
 */

export type PremiumBibleInput = {
  reading: string; // e.g. "John 1" — the actual passage to write from
  arc?: string; // e.g. "John"
  theme?: string; // weekly focus
  weekday: string; // e.g. "Monday"
  isSaturday: boolean; // add the Weekend Study
  libraryMaterial?: string; // your own on-topic notes to optionally draw on
};

type Draft = {
  devHeading: string;
  devIntro: string;
  devVerseText: string;
  devVerseRef: string;
  devBody: string;
  devKeyWord: string; // "Word — meaning"
  devApply: string;
  devPause: string; // reflective pause line
  devReflection: string;
  devPrayer: string;
  studyHeading?: string;
  studyBody?: string;
  studyKeyWord?: string; // "Word — meaning"
  studyVerse?: string; // "Ref — text"
  studyPause?: string;
  studyQuestion?: string;
};

export async function draftPremiumFromBible(
  input: PremiumBibleInput
): Promise<Partial<PremiumData> | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const sat = input.isSaturday
    ? `,
  "studyHeading": "a heading for a deeper weekend study of ${input.reading}",
  "studyBody": "a richer 5–7 sentence weekend study of ${input.reading} — go deeper than the daily reflection",
  "studyKeyWord": "one key word from ${input.reading} as 'Word — plain-English meaning'",
  "studyVerse": "one verse from ${input.reading} as 'Reference — NIV text'",
  "studyPause": "one short reflective line (about 12–20 words) inviting the reader to pause and sit with what they just read",
  "studyQuestion": "one deeper study question, beginning with 👉"`
    : "";

  const material = input.libraryMaterial?.trim()
    ? `

YOUR OWN MATERIAL (the author personally wrote this — her "Personal Take · In My Own Words · The Science Behind It," plus notes):
${input.libraryMaterial.trim()}

HOW TO USE IT: This is the OCCASIONAL personal touch from "THE BLEND" above — not the backbone. Draw on its insight ONLY where it genuinely fits ${input.reading}, and keep it light. Rework it into your own flow; never paste it verbatim. If nothing fits, write from the passage alone — that's the normal case.`
    : "";

  const user = `Write today's PREMIUM "Deeper Walk" devotional for The Daily Walk — a richer, deeper companion to the free daily issue, for the most committed members — grounded ENTIRELY in this Bible passage:

  PASSAGE: ${input.reading}${input.arc ? ` (part of ${input.arc})` : ""}
  ${input.theme ? `This week's focus: ${input.theme}` : ""}
  Day of week: ${input.weekday}

RULES:
- Everything must come from what ${input.reading} ACTUALLY says — real people, events, words. Do not invent details.
- Go DEEPER than a short daily devotional: more context, more of the "why," a key word unpacked — but still clear and readable, never academic or dry.
- Quote verses using the NIV wording, with references.
- Follow the voice and the blend below closely.

${voiceGuide()}

${BLEND_AND_FEEL}${material}

Return ONLY a JSON object (no markdown, no commentary) with these exact keys:
{
  "devHeading": "a short headline naming what this passage shows about who God is (max ~9 words)",
  "devIntro": "2–4 warm sentences setting up what's happening in ${input.reading}, with a little depth",
  "devVerseText": "the NIV text of one verse from ${input.reading}, no quotation marks",
  "devVerseRef": "the reference for that verse, e.g. 'John 1:5'",
  "devBody": "the deeper reflection — 5–7 sentences walking through ${input.reading}, what it means, and why it matters today",
  "devKeyWord": "one key word from ${input.reading} as 'Word — plain-English meaning'",
  "devApply": "how this lands in real, everyday life, then 'Try this today: <one small concrete step>', then 'For example, <a specific relatable example of doing it>.'",
  "devPause": "one short reflective line (about 12–20 words) inviting the reader to pause and sit with what they just read — quiet, personal, not a question",
  "devReflection": "one honest, deeper reflection question, beginning with 👉",
  "devPrayer": "a short first-person prayer (2–3 sentences) flowing from this passage"${sat}
}`;

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
          process.env.PREMIUM_MODEL ??
          process.env.DEVOTIONAL_MODEL ??
          process.env.GUIDE_MODEL ??
          "claude-haiku-4-5-20251001",
        max_tokens: 1800,
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

    const refl = draft.devReflection.trim();
    const out: Partial<PremiumData> = {
      devHeading: draft.devHeading.trim(),
      devIntro: draft.devIntro.trim(),
      devVerseText: draft.devVerseText.replace(/^["“]|["”]$/g, "").trim(),
      devVerseRef: draft.devVerseRef.trim(),
      devBody: draft.devBody.trim(),
      devKeyWord: draft.devKeyWord.trim(),
      devApply: draft.devApply.trim(),
      devPause: draft.devPause.trim(),
      devReflection: refl.startsWith("👉") ? refl : `👉 ${refl}`,
      devPrayer: draft.devPrayer.trim(),
    };
    if (input.isSaturday && draft.studyBody?.trim()) {
      const q = (draft.studyQuestion ?? "").trim();
      out.studyHeading = (draft.studyHeading ?? "").trim();
      out.studyBody = draft.studyBody.trim();
      out.studyKeyWord = (draft.studyKeyWord ?? "").trim();
      out.studyVerse = (draft.studyVerse ?? "").trim();
      out.studyPause = (draft.studyPause ?? "").trim();
      out.studyQuestion = q ? (q.startsWith("👉") ? q : `👉 ${q}`) : "";
    }
    // Drop any blank field so the library base fills it in.
    for (const k of Object.keys(out) as (keyof PremiumData)[]) {
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
    if (!obj.devBody || !obj.devPrayer) return null;
    return {
      devHeading: obj.devHeading ?? "",
      devIntro: obj.devIntro ?? "",
      devVerseText: obj.devVerseText ?? "",
      devVerseRef: obj.devVerseRef ?? "",
      devBody: obj.devBody ?? "",
      devKeyWord: obj.devKeyWord ?? "",
      devApply: obj.devApply ?? "",
      devPause: obj.devPause ?? "",
      devReflection: obj.devReflection ?? "",
      devPrayer: obj.devPrayer ?? "",
      studyHeading: obj.studyHeading,
      studyBody: obj.studyBody,
      studyKeyWord: obj.studyKeyWord,
      studyVerse: obj.studyVerse,
      studyPause: obj.studyPause,
      studyQuestion: obj.studyQuestion,
    };
  } catch {
    return null;
  }
}
