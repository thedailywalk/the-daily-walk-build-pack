import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { todayPT } from "@/lib/progress";

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

/** Seed empty-but-structured drafts for any of the next `count` days missing one. */
export async function adminEnsureWeek(count = 7): Promise<void> {
  if (!adminDbConfigured) return;
  const dates = upcomingDates(count);
  const existing = await adminListRange(dates[0], dates[dates.length - 1]);
  const have = new Set(existing.map((d) => d.date));
  for (const date of dates) {
    if (have.has(date)) continue;
    await adminUpsert(date, "draft", "", templateFor(date));
  }
}

/** A gentle starter scaffold for a new draft — the owner fills in their voice. */
export function templateFor(date: string): DevotionalData {
  const weekday = weekdayLabel(date);
  const base: DevotionalData = {
    weekFocus: "",
    readingHeading: "",
    readingRef: "📖 Main:  ·  Be real with God: ",
    readingIntro: "",
    verseText: "",
    verseRef: "",
    readingAfter: "",
    makeItRealHeading: "So what, for today?",
    makeItRealBody: "",
    question: "👉 ",
    prayer: "",
    communityText:
      "You weren't meant to do this alone. We're talking through today's question in the community — come share, or just read along.",
    ctaLabel: "Join the conversation →",
    ctaUrl: process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "",
    closingLine: "",
  };
  if (weekday === "Wednesday") {
    base.pastorTake = "";
    base.pastorByline = "— featured perspective, shared with attribution.";
  }
  if (weekday === "Sunday") {
    base.weekFocus = "Rest & Reflect";
    base.makeItRealHeading = "Be still for a moment";
  }
  return base;
}
