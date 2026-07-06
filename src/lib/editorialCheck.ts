import type { DevotionalData } from "@/lib/devotionals";
import type { PremiumData } from "@/lib/premium";

/**
 * The editorial safety net — fast, rule-based checks that run on a draft before
 * you publish. It never blocks; it just surfaces things worth a second look:
 * malformed Scripture references, missing pieces, and tone that drifts off-brand
 * (guilt, church jargon, prosperity-gospel language). A deeper, AI-assisted
 * verse-and-tone check lives in editorialCheckAI.ts.
 */

export type Finding = {
  level: "warn" | "info";
  label: string;
  detail?: string;
};

// The 66 books (+ a few common abbreviations) so we can sanity-check references.
const BOOKS = new Set(
  [
    "genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua",
    "judges", "ruth", "1 samuel", "2 samuel", "1 kings", "2 kings",
    "1 chronicles", "2 chronicles", "ezra", "nehemiah", "esther", "job",
    "psalm", "psalms", "proverbs", "ecclesiastes", "song of solomon",
    "song of songs", "isaiah", "jeremiah", "lamentations", "ezekiel", "daniel",
    "hosea", "joel", "amos", "obadiah", "jonah", "micah", "nahum", "habakkuk",
    "zephaniah", "haggai", "zechariah", "malachi", "matthew", "mark", "luke",
    "john", "acts", "romans", "1 corinthians", "2 corinthians", "galatians",
    "ephesians", "philippians", "colossians", "1 thessalonians",
    "2 thessalonians", "1 timothy", "2 timothy", "titus", "philemon", "hebrews",
    "james", "1 peter", "2 peter", "1 john", "2 john", "3 john", "jude",
    "revelation",
    // common abbreviations
    "gen", "ex", "lev", "num", "deut", "josh", "ps", "prov", "eccl", "isa",
    "jer", "lam", "ezek", "dan", "matt", "rom", "cor", "gal", "eph", "phil",
    "col", "thess", "tim", "heb", "jas", "pet", "rev",
  ].map((b) => b.toLowerCase())
);

/** Is a reference like "Mark 9:24" / "1 John 4:8" / "Numbers 24:17" well-formed? */
function checkReference(ref: string): { ok: boolean; reason?: string } {
  const r = ref.trim().replace(/[“”"]/g, "");
  if (!r) return { ok: true };
  // Book = leading words (may start with a number, e.g. "1 John"); then digits.
  const m = r.match(/^([1-3]?\s?[A-Za-z][A-Za-z ]*?)\s+\d/);
  if (!m) return { ok: false, reason: "couldn't find a book + chapter" };
  const book = m[1].trim().toLowerCase();
  if (!BOOKS.has(book)) return { ok: false, reason: `unknown book "${m[1].trim()}"` };
  if (!/\d+\s*[:.]\s*\d+/.test(r) && !/\d+\s*[–-]\s*\d+/.test(r)) {
    return { ok: false, reason: "no chapter:verse" };
  }
  return { ok: true };
}

// Off-brand phrase patterns → advisory flags (The Daily Walk voice: no guilt,
// no exclusionary jargon, no prosperity gospel).
const TONE_RULES: { re: RegExp; label: string }[] = [
  { re: /\byou'?re behind\b|\byou are behind\b/i, label: "“behind” language — the brand rule is “Welcome back,” never “you’re behind”" },
  { re: /\bshould feel\b|\byou should\b/i, label: "“you should” can read as guilt — consider an invitation instead" },
  { re: /\bnot good enough\b|\bnever enough\b/i, label: "“not good enough” — watch for shame framing" },
  { re: /\bif you (really|truly) (loved|believed|had faith|trusted)\b/i, label: "conditional-faith guilt (“if you really believed…”)" },
  { re: /\btry harder\b/i, label: "“try harder” — the brand leans on grace, not effort" },
  { re: /\bhedge of protection\b|\btraveling mercies\b|\bjourney mercies\b|\bunspoken request\b|\blove offering\b/i, label: "church jargon that can exclude newcomers" },
  { re: /\bname it and claim it\b|\bseed faith\b|\bsow a seed\b|\bfinancial breakthrough\b/i, label: "prosperity-gospel language" },
  { re: /\bGod wants you (rich|wealthy|healthy)\b/i, label: "prosperity-gospel promise" },
];

type Field = { label: string; text?: string };
type VersePair = { where: string; ref?: string; text?: string };

function runChecks(input: {
  fields: Field[];
  required: Field[];
  verses: VersePair[];
  question?: string;
  requireArrow?: boolean;
}): Finding[] {
  const out: Finding[] = [];

  // 1) Required fields present
  for (const f of input.required) {
    if (!f.text?.trim()) {
      out.push({ level: "warn", label: `Missing: ${f.label}`, detail: "This section is empty." });
    }
  }

  // 2) Verse references + pairing
  for (const v of input.verses) {
    const hasRef = !!v.ref?.trim();
    const hasText = !!v.text?.trim();
    if (hasRef && !hasText) {
      out.push({ level: "warn", label: `${v.where}: reference but no verse text`, detail: v.ref });
    } else if (hasText && !hasRef) {
      out.push({ level: "info", label: `${v.where}: verse text but no reference`, detail: "Add the reference so the citation is clear." });
    }
    if (hasRef) {
      const c = checkReference(v.ref!);
      if (!c.ok) {
        out.push({ level: "warn", label: `${v.where}: check the reference “${v.ref!.trim()}”`, detail: c.reason });
      }
    }
  }

  // 3) Tone / brand voice across all body text
  const body = input.fields.map((f) => f.text ?? "").join("\n");
  for (const rule of TONE_RULES) {
    if (rule.re.test(body)) out.push({ level: "info", label: rule.label });
  }

  // 4) Format — the reflection question convention
  if (input.requireArrow && input.question?.trim() && !input.question.trim().startsWith("👉")) {
    out.push({ level: "info", label: "Reflection question doesn’t start with 👉", detail: "The house style opens the question with 👉." });
  }

  return out;
}

export function checkFree(d: DevotionalData): Finding[] {
  return runChecks({
    required: [
      { label: "Reading heading", text: d.readingHeading },
      { label: "Key verse", text: d.verseText },
      { label: "Prayer", text: d.prayer },
    ],
    verses: [{ where: "Key verse", ref: d.verseRef, text: d.verseText }],
    question: d.question,
    requireArrow: true,
    fields: [
      { label: "intro", text: d.readingIntro },
      { label: "after", text: d.readingAfter },
      { label: "make it real", text: d.makeItRealBody },
      { label: "question", text: d.question },
      { label: "prayer", text: d.prayer },
      { label: "pastor take", text: d.pastorTake },
      { label: "closing", text: d.closingLine },
    ],
  });
}

export function checkPremium(d: PremiumData): Finding[] {
  const findings = runChecks({
    required: [
      { label: "Devotional heading", text: d.devHeading },
      { label: "Devotional body", text: d.devBody },
      { label: "Pray the Word", text: d.devPrayer },
    ],
    verses: [{ where: "Key verse", ref: d.devVerseRef, text: d.devVerseText }],
    requireArrow: false,
    fields: [
      { label: "intro", text: d.devIntro },
      { label: "body", text: d.devBody },
      { label: "deeper walk", text: d.deeperWalk },
      { label: "bible thread", text: d.bibleThread },
      { label: "heart check", text: d.heartCheck },
      { label: "journal", text: d.journalPrompt },
      { label: "wellness", text: d.wellnessPractice },
      { label: "pray", text: d.devPrayer },
      { label: "walk it out", text: d.walkItOut },
      { label: "study", text: d.studyBody },
      { label: "save line", text: d.saveLine },
      { label: "tomorrow", text: d.tomorrowThread },
    ],
  });
  // Premium-specific: Heart Check should carry at least a couple of questions.
  const hc = (d.heartCheck ?? "").split(/\n+|\s*\|\s*/).map((q) => q.trim()).filter(Boolean);
  if (d.heartCheck?.trim() && hc.length < 2) {
    findings.push({ level: "info", label: "Heart Check has only one question", detail: "2–3 questions land better — separate them with “ | ”." });
  }
  return findings;
}
