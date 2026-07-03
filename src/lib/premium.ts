import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { todayPT } from "@/lib/progress";
import { getStudyDay } from "@/lib/studyGuide";
import {
  addDays,
  weekdayLabel,
  prettyDate,
  upcomingDates,
  dayIndexForDate,
} from "@/lib/devotionals";
import { draftPremiumFromBible } from "@/lib/premiumFromBible";
import { deriveTopics, libraryMaterialForTopics } from "@/lib/library";
import { draftStepExample } from "@/lib/devotionalExample";

export { addDays, weekdayLabel, prettyDate, upcomingDates };

/**
 * The PREMIUM (Founding Member) newsletter — "The Deeper Walk", the Discipleship
 * Newsletter. The main paid offer: deeper Bible study + discipleship. Same prep
 * rhythm as the free daily (week-ahead → open & edit → mark Ready → publishes on
 * its date). Segments:
 *   • The Main Premium Devotional — daily (a deeper reflection than the free one)
 *   • The World Through God's Lens — Thursdays (2–3 events seen through faith, each
 *                                    with What Happened / How We See It Through Faith
 *                                    / How We Can Pray) + an uplifting close.
 *   • The Weekend Study            — Saturdays (a deeper guided Bible study)
 *   • Inside the Circle            — recurring live-session invites (therapist + pastors)
 *
 * The neuroscience/emotional-wellness tools (Science Behind It, Peace Practice,
 * Pattern Breaker, Prayer Lab, A Question Worth Sitting With) now live in the
 * separate Spiritual Wellness Guide — see `src/lib/wellness.ts`.
 */
export type PremiumData = {
  weekFocus?: string;
  dayLabel?: string; // optional, e.g. "Day 10"

  /** Short founder's note at the top of the issue. */
  editorNote?: string;

  /* The Main Premium Devotional — daily. A deeper reflection than the free one:
     fuller context, a key word, an application step, and a deeper question. */
  devHeading?: string;
  devRef?: string; // reading reference line
  devIntro?: string; // context / setup
  devVerseText?: string;
  devVerseRef?: string;
  devBody?: string; // the deeper reflection
  devKeyWord?: string; // "Word — meaning"
  devReflection?: string; // a deeper question
  devApply?: string; // "Today's walk" — one faithful step
  devPause?: string; // a short reflective "pause & reflect" line, mid-read
  devPrayer?: string;

  /* The Weekend Study — Saturdays */
  studyHeading?: string;
  studyRef?: string;
  studyBody?: string;
  studyKeyWord?: string; // "Word — meaning"
  studyVerse?: string; // "Ref — text"
  studyPause?: string; // a short reflective "pause & reflect" line, mid-read
  studyQuestion?: string;

  /* Inside the Circle — live sessions (recurring) */
  circleBody?: string;
  circleCtaLabel?: string;
  circleCtaUrl?: string;

  closingLine?: string;
};

export type PremiumStatus = "draft" | "ready";

export type PremiumIssue = {
  date: string; // YYYY-MM-DD
  status: PremiumStatus;
  title: string;
  data: PremiumData;
  updatedAt?: string;
};

const TABLE = "premium_issues";

/* ------------------------------ row mapping ----------------------------- */
function rowToIssue(r: {
  date: string;
  status: string;
  title: string;
  data: unknown;
  updated_at?: string;
}): PremiumIssue {
  return {
    date: r.date,
    status: (r.status as PremiumStatus) ?? "draft",
    title: r.title ?? "",
    data: (r.data as PremiumData) ?? {},
    updatedAt: r.updated_at,
  };
}

/* ------------------------------- reader -------------------------------- */
/** The live premium issue today — or the most recent ready one. */
export async function getLivePremium(): Promise<PremiumIssue | null> {
  if (!supabaseConfigured) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(TABLE)
      .select("date,status,title,data,updated_at")
      .eq("status", "ready")
      .lte("date", todayPT())
      .order("date", { ascending: false })
      .limit(1)
      .maybeSingle();
    return data ? rowToIssue(data) : null;
  } catch {
    return null;
  }
}

/* -------------------------------- admin -------------------------------- */
export async function premiumGetByDate(date: string): Promise<PremiumIssue | null> {
  if (!adminDbConfigured) return null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from(TABLE)
      .select("date,status,title,data,updated_at")
      .eq("date", date)
      .maybeSingle();
    return data ? rowToIssue(data) : null;
  } catch {
    return null;
  }
}

export async function premiumListRange(
  start: string,
  end: string
): Promise<PremiumIssue[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from(TABLE)
      .select("date,status,title,data,updated_at")
      .gte("date", start)
      .lte("date", end)
      .order("date", { ascending: true });
    return (data ?? []).map(rowToIssue);
  } catch {
    return [];
  }
}

export async function premiumListBefore(
  beforeDate: string,
  limit = 120
): Promise<PremiumIssue[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from(TABLE)
      .select("date,status,title,data,updated_at")
      .lt("date", beforeDate)
      .order("date", { ascending: false })
      .limit(limit);
    return (data ?? []).map(rowToIssue);
  } catch {
    return [];
  }
}

/** Recent PUBLISHED premium issues (ready + on/before today), newest first. */
export async function listRecentPremium(limit = 30): Promise<PremiumIssue[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from(TABLE)
      .select("date,status,title,data,updated_at")
      .eq("status", "ready")
      .lte("date", todayPT())
      .order("date", { ascending: false })
      .limit(limit);
    return (data ?? []).map(rowToIssue);
  } catch {
    return [];
  }
}

export async function premiumUpsert(
  date: string,
  status: PremiumStatus,
  title: string,
  data: PremiumData
): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from(TABLE).upsert(
      { date, status, title, data, updated_at: new Date().toISOString() },
      { onConflict: "date" }
    );
  } catch {
    /* ignore */
  }
}

export async function premiumDelete(date: string): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from(TABLE).delete().eq("date", date);
  } catch {
    /* ignore */
  }
}

/** Seed FULLY-written premium drafts for any of the next `count` days missing one. */
export async function premiumEnsureWeek(count = 7): Promise<void> {
  if (!adminDbConfigured) return;
  const dates = upcomingDates(count);
  const existing = await premiumListRange(dates[0], dates[dates.length - 1]);
  const have = new Set(existing.map((d) => d.date));
  for (const date of dates) {
    if (have.has(date)) continue;
    // Library-seeded base — the guaranteed fallback if the AI is unavailable.
    const data = fullPremiumFor(date);
    // Preferred: write the Deeper Walk FROM the day's actual passage, in our
    // voice, blending in your own material sparingly. Best-effort; on any miss
    // we keep the library base. Locked/existing issues are never touched (we
    // only create days that are missing).
    try {
      const s = getStudyDay(dayIndexForDate(date));
      const topics = deriveTopics(
        [s.context, s.plainEnglish, s.aboutGod, s.aboutPeople, s.realLife, s.reflection].join(" ")
      );
      const libraryMaterial = await libraryMaterialForTopics(topics, {
        rotate: dayIndexForDate(date) + 3, // offset from the free issue so they don't twin
      }).catch(() => "");
      const fresh = await draftPremiumFromBible({
        reading: s.reading,
        arc: s.arc,
        theme: s.arc ? `Journey through ${s.arc}` : undefined,
        weekday: weekdayLabel(date),
        isSaturday: weekdayLabel(date) === "Saturday",
        libraryMaterial,
      });
      if (fresh) {
        Object.assign(data, fresh);
      } else {
        // Fell back to the library base — still give its step a concrete example.
        const ex = await draftStepExample(s.step, s.reading).catch(() => "");
        if (ex) data.devApply = `${data.devApply} ${ex}`;
      }
    } catch {
      /* ignore — fall back to the library base */
    }
    await premiumUpsert(date, "draft", data.devHeading ?? "", data);
  }
}

/* ---------------------- full default generation ----------------------- */

function splitVerse(v: string): { text: string; ref: string } {
  const i = v.lastIndexOf(" — ");
  if (i === -1) return { text: v.replace(/[“”]/g, "").trim(), ref: "" };
  return {
    text: v.slice(0, i).replace(/[“”]/g, "").trim(),
    ref: v.slice(i + 3).trim(),
  };
}

/**
 * A COMPLETE premium (discipleship) issue for any date — the Main Premium
 * Devotional daily, plus Thursday's World Through God's Lens and Saturday's
 * Weekend Study. Seeded from the study library so each day is distinct and ready
 * to read. The owner opens it, edits in her voice, and marks it Ready.
 */
export function fullPremiumFor(date: string): PremiumData {
  const weekday = weekdayLabel(date);
  const dayIdx = dayIndexForDate(date);
  const s = getStudyDay(dayIdx);
  const v = s.verses?.[0];
  const k = s.keyWords?.[0];
  const sv = splitVerse(s.verse);

  const data: PremiumData = {
    weekFocus:
      weekday === "Sunday"
        ? "Rest & Reflect"
        : s.arc
          ? `Journey through ${s.arc}`
          : "Walking with God in real life",
    editorNote:
      "For the ones walking closest with us — the deeper layer underneath today's reading. Let's go further in. — Lulu",

    // The Main Premium Devotional — daily, deeper than the free issue.
    devHeading: s.aboutGod,
    devRef: `📖 ${s.reading}`,
    devIntro: s.context,
    devVerseText: sv.text,
    devVerseRef: sv.ref,
    devBody: s.plainEnglish,
    devKeyWord: k ? `${k.word} — ${k.meaning}` : "",
    devReflection: s.sideReflection || s.reflection,
    // "So what, for today?" — same shape as the free issue's Make It Real.
    devApply: `${s.realLife} ${s.aboutPeople} Try this today: ${s.step}`,
    devPrayer: s.prayer,

    closingLine:
      "You're not just reading more — you're being discipled, and you're helping someone else find Jesus by making this possible. Thank you for being a Founding Member.",
  };

  // Inside the Circle — recurring live-session invite
  data.circleBody =
    "Founding Members get a seat in the live room. This season:\n\n• A monthly live conversation with a guest pastor — bring your real questions.\n\n• A live session with a licensed Christian therapist on faith and mental health — practical, gentle, no judgment.\n\nWatch your inbox for the link and the date — your spot is already saved.";
  data.circleCtaLabel = "See what's coming →";
  data.circleCtaUrl = process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "";

  // The Weekend Study — Saturdays only
  if (weekday === "Saturday") {
    data.studyHeading = s.aboutGod || "A deeper look this weekend";
    data.studyRef = `📖 ${s.reading}`;
    data.studyBody = `${s.context}\n\n${s.plainEnglish}`;
    data.studyKeyWord = k ? `${k.word} — ${k.meaning}` : "";
    data.studyVerse = v
      ? `${v.ref} — ${v.text}`
      : sv.ref
        ? `${sv.ref} — ${sv.text}`
        : "";
    data.studyQuestion = s.reflection?.startsWith("👉")
      ? s.reflection
      : `👉 ${s.reflection}`;
  }

  return data;
}
