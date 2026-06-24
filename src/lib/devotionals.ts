import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { todayPT } from "@/lib/progress";
import { getStudyDay } from "@/lib/studyGuide";

/** The editable sections of one daily devotional (matches the issue template). */
export type DevotionalData = {
  weekFocus?: string;
  dayLabel?: string; // optional, e.g. "Day 10"
  readingHeading?: string;
  readingRef?: string;
  readingIntro?: string;
  verseText?: string;
  verseRef?: string;
  readingAfter?: string;
  makeItRealHeading?: string;
  makeItRealBody?: string;
  question?: string;
  prayer?: string;
  healingScience?: string; // "How Healing Works" — neuroscience-grounded blurb only
  pastorTake?: string; // optional (e.g. Wednesdays)
  pastorByline?: string;
  communityText?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  closingLine?: string;
};

export type DevotionalStatus = "draft" | "ready";

export type Devotional = {
  date: string; // YYYY-MM-DD
  status: DevotionalStatus;
  title: string;
  data: DevotionalData;
  updatedAt?: string;
};

/* ----------------------------- date helpers ----------------------------- */

/** Add n days to a YYYY-MM-DD string (UTC-noon math avoids DST drift). */
export function addDays(date: string, n: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function weekdayLabel(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function prettyDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

/** The next `count` dates starting today (PT). */
export function upcomingDates(count = 7, from = todayPT()): string[] {
  return Array.from({ length: count }, (_, i) => addDays(from, i));
}

/* --------------------------- public (reader) ---------------------------- */

function rowToDevotional(r: {
  date: string;
  status: string;
  title: string;
  data: unknown;
  updated_at?: string;
}): Devotional {
  return {
    date: r.date,
    status: (r.status as DevotionalStatus) ?? "draft",
    title: r.title ?? "",
    data: (r.data as DevotionalData) ?? {},
    updatedAt: r.updated_at,
  };
}

/** Today's live devotional — or the most recent ready one if today's isn't up. */
export async function getLiveDevotional(): Promise<Devotional | null> {
  if (!supabaseConfigured) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("devotionals")
      .select("date,status,title,data,updated_at")
      .eq("status", "ready")
      .lte("date", todayPT())
      .order("date", { ascending: false })
      .limit(1)
      .maybeSingle();
    return data ? rowToDevotional(data) : null;
  } catch {
    return null;
  }
}

/* ----------------------------- admin (CMS) ------------------------------ */

export async function adminGetByDate(date: string): Promise<Devotional | null> {
  if (!adminDbConfigured) return null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("devotionals")
      .select("date,status,title,data,updated_at")
      .eq("date", date)
      .maybeSingle();
    return data ? rowToDevotional(data) : null;
  } catch {
    return null;
  }
}

export async function adminListRange(
  start: string,
  end: string
): Promise<Devotional[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("devotionals")
      .select("date,status,title,data,updated_at")
      .gte("date", start)
      .lte("date", end)
      .order("date", { ascending: true });
    return (data ?? []).map(rowToDevotional);
  } catch {
    return [];
  }
}

/** Past PUBLISHED devotionals (ready + before today), newest first — for the
 *  member archive. Read with the service client (server-side). */
export async function listPublishedArchive(limit = 60): Promise<Devotional[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("devotionals")
      .select("date,status,title,data,updated_at")
      .eq("status", "ready")
      .lt("date", todayPT())
      .order("date", { ascending: false })
      .limit(limit);
    return (data ?? []).map(rowToDevotional);
  } catch {
    return [];
  }
}

/** Recent PUBLISHED devotionals (ready + on/before today), newest first — for
 *  the public RSS feed that Beehiiv's RSS-to-Send reads. */
export async function listRecentPublished(limit = 30): Promise<Devotional[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("devotionals")
      .select("date,status,title,data,updated_at")
      .eq("status", "ready")
      .lte("date", todayPT())
      .order("date", { ascending: false })
      .limit(limit);
    return (data ?? []).map(rowToDevotional);
  } catch {
    return [];
  }
}

/** Auto-publish: mark a date's devotional "ready" so it goes live everywhere. */
export async function adminMarkReady(date: string): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase
      .from("devotionals")
      .update({ status: "ready", updated_at: new Date().toISOString() })
      .eq("date", date);
  } catch {
    /* ignore */
  }
}

export async function adminUpsert(
  date: string,
  status: DevotionalStatus,
  title: string,
  data: DevotionalData
): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("devotionals").upsert(
      {
        date,
        status,
        title,
        data,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "date" }
    );
  } catch {
    /* ignore */
  }
}

export async function adminDelete(date: string): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("devotionals").delete().eq("date", date);
  } catch {
    /* ignore */
  }
}

/** Seed FULLY-written drafts for any of the next `count` days missing one. */
export async function adminEnsureWeek(count = 7): Promise<void> {
  if (!adminDbConfigured) return;
  const dates = upcomingDates(count);
  const existing = await adminListRange(dates[0], dates[dates.length - 1]);
  const have = new Set(existing.map((d) => d.date));
  for (const date of dates) {
    if (have.has(date)) continue;
    const data = fullDevotionalFor(date);
    await adminUpsert(date, "draft", data.readingHeading ?? "", data);
  }
}

/** Past devotionals (before `beforeDate`), newest first — for the Archive. */
export async function adminListBefore(
  beforeDate: string,
  limit = 120
): Promise<Devotional[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("devotionals")
      .select("date,status,title,data,updated_at")
      .lt("date", beforeDate)
      .order("date", { ascending: false })
      .limit(limit);
    return (data ?? []).map(rowToDevotional);
  } catch {
    return [];
  }
}

/* ---------------------- full default generation ----------------------- */

const ARC_FOCUS: Record<string, string> = {
  John: "Meet Jesus — who He really is",
  Romans: "The gospel — grace, not performance",
  Psalms: "Honest prayer — bring God your real self",
  Proverbs: "Wisdom for everyday life",
  Acts: "The Spirit and the unstoppable mission",
  "The whole story": "The whole story — Genesis to Revelation",
};
const BE_REAL = [
  "Psalm 27",
  "Psalm 23",
  "Psalm 139",
  "Psalm 121",
  "Psalm 46",
  "Psalm 91",
  "Psalm 103",
];
const CLOSINGS = [
  "Even when the world feels heavy, God is still moving — keep your eyes open today.",
  "However today goes, you're not walking it alone.",
  "Small steps, taken daily, are how God quietly changes a life.",
  "You don't have to have it all figured out — just keep showing up.",
  "God isn't grading you. He's glad you came.",
  "His mercies are new this morning — including for you.",
  "Take it one honest day at a time. He's with you in all of them.",
];

function dayOfYear(date: string): number {
  const d = new Date(`${date}T12:00:00Z`);
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  return Math.floor((d.getTime() - start) / 86400000);
}

/** Which study-library day (1..365) a calendar date seeds its devotional from. */
export function dayIndexForDate(date: string): number {
  return ((dayOfYear(date) - 1 + 365) % 365) + 1;
}
function weekdayIndex(date: string): number {
  return new Date(`${date}T12:00:00Z`).getUTCDay(); // 0 = Sunday
}
function splitVerse(v: string): { text: string; ref: string } {
  const i = v.lastIndexOf(" — ");
  if (i === -1) return { text: v.replace(/[“”]/g, "").trim(), ref: "" };
  return {
    text: v.slice(0, i).replace(/[“”]/g, "").trim(),
    ref: v.slice(i + 3).trim(),
  };
}
function firstPara(t: string): string {
  return (t ?? "").split(/\n{2,}/)[0].trim();
}

/**
 * A COMPLETE daily devotional for any date — every section filled, seeded from
 * the study library (so each date is distinct and ready to read), in the issue
 * template. The owner opens it, reads the whole thing, and edits in their voice.
 */
export function fullDevotionalFor(date: string): DevotionalData {
  const wIdx = weekdayIndex(date);
  const weekday = weekdayLabel(date);
  const s = getStudyDay(dayIndexForDate(date)); // distinct per date
  const { text: verseText, ref: verseRef } = splitVerse(s.verse);

  const data: DevotionalData = {
    weekFocus:
      weekday === "Sunday"
        ? "Rest & Reflect"
        : ARC_FOCUS[s.arc] ?? "Walking with God in real life",
    readingHeading: s.aboutGod,
    readingRef: `📖 Main: ${s.reading}  ·  Be real with God: ${BE_REAL[wIdx]}`,
    readingIntro: firstPara(s.context),
    verseText,
    verseRef,
    readingAfter: s.plainEnglish,
    makeItRealHeading: weekday === "Sunday" ? "Be still for a moment" : "So what, for today?",
    makeItRealBody: `${s.realLife} ${s.aboutPeople} A small step today: ${s.step}`,
    question: s.reflection.startsWith("👉") ? s.reflection : `👉 ${s.reflection}`,
    prayer: s.prayer,
    communityText:
      "You weren't meant to do this alone. We're talking through today's question in the community — come share, or just read along.",
    ctaLabel: "Join the conversation →",
    ctaUrl: process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "",
    closingLine: CLOSINGS[wIdx],
  };

  if (weekday === "Wednesday") {
    data.pastorTake = `${s.realLife} A way to live it this week: ${s.step}`;
    data.pastorByline =
      "— a midweek encouragement. Swap in a featured pastor's quote when you have one.";
  }
  return data;
}

/** Back-compat alias — every new draft is now fully written, not a blank scaffold. */
export const templateFor = fullDevotionalFor;
