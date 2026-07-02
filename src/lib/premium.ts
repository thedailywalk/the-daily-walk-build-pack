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
  devPrayer?: string;

  /* The World Through God's Lens — Thursdays. 2–3 events seen through faith, each
     with What Happened / How We See It Through Faith / How We Can Pray, then a
     smaller uplifting section. Aware without anxious. */
  worldHeading?: string; // e.g. "The World Through God's Lens"
  worldIntro?: string; // gentle framing line
  world1What?: string;
  world1Faith?: string;
  world1Pray?: string;
  world1Url?: string; // link to the real article this summarizes
  world1Source?: string; // e.g. "BBC News"
  world1Img?: string; // OPTIONAL reshare-cleared photo URL (see world1Credit)
  world1Credit?: string; // required attribution when an image is used
  world2What?: string;
  world2Faith?: string;
  world2Pray?: string;
  world2Url?: string;
  world2Source?: string;
  world2Img?: string;
  world2Credit?: string;
  world3What?: string;
  world3Faith?: string;
  world3Pray?: string;
  world3Url?: string;
  world3Source?: string;
  world3Img?: string;
  world3Credit?: string;
  brightHeading?: string; // uplifting section name, e.g. "Light Still Breaking Through"
  brightBody?: string; // 2–3 positive items, blank-line separated

  /* The Weekend Study — Saturdays */
  studyHeading?: string;
  studyRef?: string;
  studyBody?: string;
  studyKeyWord?: string; // "Word — meaning"
  studyVerse?: string; // "Ref — text"
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
    const data = fullPremiumFor(date);
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
    devApply: s.step,
    devPrayer: s.prayer,

    closingLine:
      "You're not just reading more — you're being discipled, and you're helping someone else find Jesus by making this possible. Thank you for being a Founding Member.",
  };

  // Inside the Circle — recurring live-session invite
  data.circleBody =
    "Founding Members get a seat in the live room. This season:\n\n• A monthly live conversation with a guest pastor — bring your real questions.\n\n• A live session with a licensed Christian therapist on faith and mental health — practical, gentle, no judgment.\n\nWatch your inbox for the link and the date — your spot is already saved.";
  data.circleCtaLabel = "See what's coming →";
  data.circleCtaUrl = process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "";

  // The World Through God's Lens — Thursdays only. 2–3 events through faith +
  // an uplifting close. Generated as a calm template; real headlines swap in.
  if (weekday === "Thursday") {
    data.worldHeading = "The World Through God's Lens";
    data.worldIntro =
      "A few of this week's headlines, held up to God's light instead of handed to our fear. Stay informed without becoming overwhelmed — aware, but not afraid. God is still sovereign, still near, still moving.";

    data.world1What =
      "Communities in a region hit by disaster are recovering, with many displaced and aid workers pressing in to reach those who are cut off.";
    data.world1Faith =
      "Suffering this size can make us feel small and helpless. But God never asks us to carry what only He can carry — He asks us to trust the One who is “close to the brokenhearted” (Psalm 34:18). He is already in that place, in the hands of every rescuer and neighbor showing up.";
    data.world1Pray =
      "Lord, be near to everyone who lost so much. Move through every helping hand, and make us people who pray before we scroll past.";

    data.world2What =
      "Leaders met to work through a decision that touches millions of ordinary lives — the kind of headline that can quietly stir worry.";
    data.world2Faith =
      "When outcomes feel far outside our control, Proverbs 21:1 steadies us: even a ruler's heart is “in the hand of the Lord.” We can stay informed without letting the result become our peace. Our security was never in the news cycle.";
    data.world2Pray =
      "Father, grant wisdom and humility to those deciding things that affect so many. Guard our hearts from anxiety and keep our hope anchored in You.";

    data.world3What =
      "A new development in science or health is drawing attention for its potential to help people who have waited a long time for answers.";
    data.world3Faith =
      "Every bit of healing and discovery reflects the God who made a world we are still learning to understand. We can hold even uncertain news with curiosity instead of dread, trusting the Giver behind every good gift (James 1:17).";
    data.world3Pray =
      "God, thank You for the gift of discovery. Guide it toward what truly heals, and toward the people who need it most.";

    data.brightHeading = "Light Still Breaking Through";
    data.brightBody =
      "Even on a heavy news week, grace keeps showing up. A few signs of it:\n\n• Somewhere this week, a community quietly rallied around a family in crisis — strangers becoming neighbors.\n\n• A long-awaited reunion, recovery, or answered prayer that never made the front page but changed someone's whole world.\n\n• Ordinary people choosing kindness in a moment that could have gone the other way.\n\n(Swap in the week's real good-news stories before you send — this is the breath of fresh air at the end.)";
  }

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
