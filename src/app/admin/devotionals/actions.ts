"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  adminUpsert,
  adminDelete,
  adminEnsureWeek,
  adminGetByDate,
  fullDevotionalFor,
  type DevotionalData,
  type DevotionalStatus,
} from "@/lib/devotionals";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

/**
 * "Select this one" from the side-by-side comparison. Saves the chosen version
 * (the platform's auto-written one, or the existing pasted draft) as the issue
 * that publishes for this date, and marks it Ready.
 */
export async function selectDevotionalVersionAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  const source = str(formData, "source") === "platform" ? "platform" : "draft";

  let data: DevotionalData | null = null;
  let title = "";
  if (source === "platform") {
    data = fullDevotionalFor(date);
    title = data.readingHeading || `The Daily Walk · ${date}`;
  } else {
    const existing = await adminGetByDate(date);
    if (existing) {
      data = existing.data;
      title = existing.title || existing.data.readingHeading || `The Daily Walk · ${date}`;
    }
  }
  if (!data) {
    redirect(`/admin/devotionals?day=${date}`);
  }

  await adminUpsert(date, "ready", title, data);
  revalidatePath("/admin/devotionals");
  redirect(`/admin/devotionals?day=${date}&selected=${source}`);
}

export async function saveDevotionalAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const status: DevotionalStatus =
    str(formData, "status") === "ready" ? "ready" : "draft";

  const data: DevotionalData = {
    weekFocus: str(formData, "weekFocus"),
    dayLabel: str(formData, "dayLabel"),
    readingHeading: str(formData, "readingHeading"),
    readingRef: str(formData, "readingRef"),
    readingIntro: str(formData, "readingIntro"),
    verseText: str(formData, "verseText"),
    verseRef: str(formData, "verseRef"),
    readingAfter: str(formData, "readingAfter"),
    keyWord: str(formData, "keyWord"),
    makeItRealHeading: str(formData, "makeItRealHeading"),
    makeItRealBody: str(formData, "makeItRealBody"),
    question: str(formData, "question"),
    prayer: str(formData, "prayer"),
    healingScience: str(formData, "healingScience"),
    pastorTake: str(formData, "pastorTake"),
    pastorByline: str(formData, "pastorByline"),
    communityText: str(formData, "communityText"),
    ctaLabel: str(formData, "ctaLabel"),
    ctaUrl: str(formData, "ctaUrl"),
    closingLine: str(formData, "closingLine"),
  };

  const title = data.readingHeading || `Devotional · ${date}`;
  await adminUpsert(date, status, title, data);

  revalidatePath("/admin/devotionals");
  revalidatePath("/devotional");
  redirect(`/admin/devotionals?date=${date}&saved=1`);
}

export async function prepareWeekAction() {
  await requireAdmin();
  await adminEnsureWeek(7);
  revalidatePath("/admin/devotionals");
  redirect("/admin/devotionals");
}

export async function deleteDevotionalAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (date) await adminDelete(date);
  revalidatePath("/admin/devotionals");
  revalidatePath("/devotional");
  redirect("/admin/devotionals");
}

/* ---------------------------------------------------------------------------
 * Quick paste → create devotionals
 * Paste one or more days in the labeled format (the same one in the content
 * drafts) and this parses each day into a devotional and upserts it. Days are
 * separated by a line of dashes (---) and each needs a `date: YYYY-MM-DD` line.
 * ------------------------------------------------------------------------- */

const CANON_KEYS: (keyof DevotionalData)[] = [
  "weekFocus",
  "dayLabel",
  "readingHeading",
  "readingRef",
  "readingIntro",
  "verseText",
  "verseRef",
  "readingAfter",
  "keyWord",
  "makeItRealHeading",
  "makeItRealBody",
  "question",
  "prayer",
  "healingScience",
  "pastorTake",
  "pastorByline",
  "communityText",
  "ctaLabel",
  "ctaUrl",
  "closingLine",
];

/** Normalize a field label so "readingHeading", "Reading Heading" all match. */
function normKey(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const CANON_BY_NORM: Record<string, keyof DevotionalData> = Object.fromEntries(
  CANON_KEYS.map((k) => [normKey(k), k])
);

/** Remove markdown emphasis so no stray *asterisks* end up in the newsletter. */
function stripEmphasis(v: string): string {
  return v
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .trim();
}

// Matches "- **readingHeading:** value", "readingHeading: value", etc.
const KEY_LINE =
  /^\s*(?:[-*]\s*)?\*{0,2}\s*([A-Za-z][A-Za-z0-9 _-]*?)\s*\*{0,2}\s*:\s*\*{0,2}\s*(.*)$/;

type ParsedDay = {
  date: string;
  status: string;
  data: DevotionalData;
  hadFields: boolean;
};

function parseDayBlock(block: string): ParsedDay {
  const fields: Partial<Record<keyof DevotionalData, string>> = {};
  let date = "";
  let status = "";
  let cur: keyof DevotionalData | null = null;

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
    // Continuation line for a multi-line field (e.g. a wrapped paragraph).
    if (cur) {
      const t = line.trim();
      if (t) fields[cur] = (fields[cur] ? fields[cur] + " " : "") + t;
    }
  }

  const data: DevotionalData = {};
  for (const k of CANON_KEYS) {
    const v = fields[k];
    if (v != null && v.trim()) data[k] = stripEmphasis(v);
  }
  const hadFields = Object.keys(fields).length > 0 || !!date || !!status;
  return { date, status, data, hadFields };
}

export async function importDevotionalsAction(formData: FormData) {
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
      // Only flag blocks that looked like content but couldn't be used;
      // ignore preamble / notes silently.
      if (parsed.hadFields) skipped++;
      continue;
    }
    const status: DevotionalStatus =
      parsed.status === "ready" ? "ready" : publishAll ? "ready" : "draft";
    const title = parsed.data.readingHeading || `Devotional · ${parsed.date}`;
    await adminUpsert(parsed.date, status, title, parsed.data);
    created++;
  }

  revalidatePath("/admin/devotionals");
  revalidatePath("/devotional");
  redirect(`/admin/devotionals?imported=${created}&skipped=${skipped}`);
}
