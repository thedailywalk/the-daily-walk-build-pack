"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  premiumUpsert,
  premiumDelete,
  premiumEnsureWeek,
  premiumGetByDate,
  fullPremiumFor,
  type PremiumData,
  type PremiumStatus,
} from "@/lib/premium";
function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function savePremiumAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const status: PremiumStatus =
    str(formData, "status") === "ready" ? "ready" : "draft";

  const data: PremiumData = {
    weekFocus: str(formData, "weekFocus"),
    dayLabel: str(formData, "dayLabel"),
    editorNote: str(formData, "editorNote"),
    devHeading: str(formData, "devHeading"),
    devRef: str(formData, "devRef"),
    devIntro: str(formData, "devIntro"),
    devVerseText: str(formData, "devVerseText"),
    devVerseRef: str(formData, "devVerseRef"),
    devBody: str(formData, "devBody"),
    devKeyWord: str(formData, "devKeyWord"),
    devReflection: str(formData, "devReflection"),
    devApply: str(formData, "devApply"),
    devPause: str(formData, "devPause"),
    devPrayer: str(formData, "devPrayer"),
    deeperWalk: str(formData, "deeperWalk"),
    bibleThread: str(formData, "bibleThread"),
    heartCheck: str(formData, "heartCheck"),
    journalPrompt: str(formData, "journalPrompt"),
    wellnessPractice: str(formData, "wellnessPractice"),
    walkItOut: str(formData, "walkItOut"),
    saveLine: str(formData, "saveLine"),
    tomorrowThread: str(formData, "tomorrowThread"),
    studyHeading: str(formData, "studyHeading"),
    studyRef: str(formData, "studyRef"),
    studyBody: str(formData, "studyBody"),
    studyKeyWord: str(formData, "studyKeyWord"),
    studyVerse: str(formData, "studyVerse"),
    studyPause: str(formData, "studyPause"),
    studyQuestion: str(formData, "studyQuestion"),
    circleBody: str(formData, "circleBody"),
    circleCtaLabel: str(formData, "circleCtaLabel"),
    circleCtaUrl: str(formData, "circleCtaUrl"),
    closingLine: str(formData, "closingLine"),
  };

  const title = data.devHeading || `Premium · ${date}`;
  await premiumUpsert(date, status, title, data);

  revalidatePath("/admin/premium");
  redirect(`/admin/premium?date=${date}&saved=1`);
}

/**
 * "Select this one" from the side-by-side comparison. Saves the chosen version
 * (the platform's auto-written one, or the existing pasted draft) as the issue
 * that publishes for this date, and marks it Ready.
 */
export async function selectPremiumVersionAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  const source = str(formData, "source") === "platform" ? "platform" : "draft";

  let data: PremiumData | null = null;
  let title = "";
  if (source === "platform") {
    data = fullPremiumFor(date);
    title = data.devHeading || `Premium · ${date}`;
  } else {
    const existing = await premiumGetByDate(date);
    if (existing) {
      data = existing.data;
      title = existing.title || existing.data.devHeading || `Premium · ${date}`;
    }
  }
  if (!data) {
    // Nothing to select (e.g. no pasted draft yet) — just return to the day.
    redirect(`/admin/premium?day=${date}`);
  }

  await premiumUpsert(date, "ready", title, data);
  revalidatePath("/admin/premium");
  redirect(`/admin/premium?day=${date}&selected=${source}`);
}

export async function preparePremiumWeekAction() {
  await requireAdmin();
  await premiumEnsureWeek(7);
  revalidatePath("/admin/premium");
  redirect("/admin/premium");
}

export async function deletePremiumAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (date) await premiumDelete(date);
  revalidatePath("/admin/premium");
  redirect("/admin/premium");
}

/* ---------------------------------------------------------------------------
 * Quick paste → create premium issues
 * Same idea as the free daily importer: paste one or more days in the labeled
 * format (days separated by ---, each with a `date: YYYY-MM-DD` line) and this
 * parses each into a premium issue and upserts it.
 * ------------------------------------------------------------------------- */

const CANON_KEYS: (keyof PremiumData)[] = [
  "weekFocus",
  "dayLabel",
  "editorNote",
  "devHeading",
  "devRef",
  "devIntro",
  "devVerseText",
  "devVerseRef",
  "devBody",
  "devKeyWord",
  "devReflection",
  "devApply",
  "devPause",
  "devPrayer",
  "deeperWalk",
  "bibleThread",
  "heartCheck",
  "journalPrompt",
  "wellnessPractice",
  "walkItOut",
  "saveLine",
  "tomorrowThread",
  "studyHeading",
  "studyRef",
  "studyBody",
  "studyKeyWord",
  "studyVerse",
  "studyPause",
  "studyQuestion",
  "circleBody",
  "circleCtaLabel",
  "circleCtaUrl",
  "closingLine",
];

function normKey(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const CANON_BY_NORM: Record<string, keyof PremiumData> = Object.fromEntries(
  CANON_KEYS.map((k) => [normKey(k), k])
);

function stripEmphasis(v: string): string {
  return v
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .trim();
}

const KEY_LINE =
  /^\s*(?:[-*]\s*)?\*{0,2}\s*([A-Za-z][A-Za-z0-9 _-]*?)\s*\*{0,2}\s*:\s*\*{0,2}\s*(.*)$/;

type ParsedDay = {
  date: string;
  status: string;
  data: PremiumData;
  hadFields: boolean;
};

function parseDayBlock(block: string): ParsedDay {
  const fields: Partial<Record<keyof PremiumData, string>> = {};
  let date = "";
  let status = "";
  let cur: keyof PremiumData | null = null;

  for (const raw of block.split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, "");
    const m = line.match(KEY_LINE);
    if (m) {
      const nk = normKey(m[1]);
      if (nk === "date") {
        date = m[2].trim();
        cur = null;
        continue;
      }
      if (nk === "status") {
        status = m[2].trim().toLowerCase();
        cur = null;
        continue;
      }
      const canon = CANON_BY_NORM[nk];
      if (canon) {
        fields[canon] = m[2];
        cur = canon;
        continue;
      }
    }
    if (cur) {
      const t = line.trim();
      if (t) fields[cur] = (fields[cur] ? fields[cur] + " " : "") + t;
    }
  }

  const data: PremiumData = {};
  for (const k of CANON_KEYS) {
    const v = fields[k];
    if (v != null && v.trim()) data[k] = stripEmphasis(v);
  }
  const hadFields = Object.keys(fields).length > 0 || !!date || !!status;
  return { date, status, data, hadFields };
}

export async function importPremiumAction(formData: FormData) {
  await requireAdmin();
  const raw = String(formData.get("paste") ?? "");
  const publishAll = String(formData.get("publish") ?? "") === "1";

  const blocks = raw.split(/\r?\n\s*-{3,}\s*\r?\n/);
  let created = 0;
  let skipped = 0;

  for (const block of blocks) {
    if (!block.trim()) continue;
    const parsed = parseDayBlock(block);
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(parsed.date);
    if (!validDate || Object.keys(parsed.data).length === 0) {
      if (parsed.hadFields) skipped++;
      continue;
    }
    const status: PremiumStatus =
      parsed.status === "ready" ? "ready" : publishAll ? "ready" : "draft";
    const title = parsed.data.devHeading || `Premium · ${parsed.date}`;
    await premiumUpsert(parsed.date, status, title, parsed.data);
    created++;
  }

  revalidatePath("/admin/premium");
  redirect(`/admin/premium?imported=${created}&skipped=${skipped}`);
}
