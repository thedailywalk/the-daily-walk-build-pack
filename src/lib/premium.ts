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
 * The PREMIUM (Founding Member) newsletter — the deeper-dive companion to the
 * free daily devotional. Same prep rhythm as the free one (week-ahead → open &
 * edit → mark Ready → it publishes on its date), but with the premium-only
 * segments:
 *   • The Science Behind It  — daily (neuroscience-grounded)
 *   • The World This Week     — Thursdays (real-world, faith lens, not political)
 *   • The Weekend Study       — Saturdays (a deeper guided Bible study)
 *   • Inside the Circle        — recurring live-session invites (therapist + pastors)
 */
export type PremiumData = {
  weekFocus?: string;
  dayLabel?: string; // optional, e.g. "Day 10"

  /** Short founder's note at the top of the issue. */
  editorNote?: string;

  /* The Science Behind It — daily */
  scienceHeading?: string;
  scienceVerse?: string; // anchor verse line
  scienceBody?: string;
  sciencePractice?: string; // a tiny, do-it-today practice

  /* The World This Week — Thursdays */
  worldHeading?: string;
  worldBody?: string; // blank-line separated items
  worldPrayer?: string;

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
    await premiumUpsert(date, "draft", data.scienceHeading ?? "", data);
  }
}

/* ---------------------- full default generation ----------------------- */

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

/** Neuroscience angles that rotate by day — each pairs a brain finding with a
 *  Scripture truth, grounded and never gimmicky. */
const SCIENCE_ANGLES: {
  heading: string;
  verse: string;
  lead: string;
  practice: string;
}[] = [
  {
    heading: "Why repeating truth rewires you",
    verse: "“…be transformed by the renewing of your mind.” — Romans 12:2",
    lead: "Neuroscientists call it neuroplasticity: the thoughts you return to most often physically thicken the neural pathways that carry them. Repeat worry and you pave a worry highway; repeat a promise of God and you lay new road. Paul wrote “renewing of your mind” two thousand years before we could watch it happen on a scan — but the brain agrees with him.",
    practice: "Pick one line from today's reading and say it out loud three times before noon. You're not being sentimental — you're laying track.",
  },
  {
    heading: "What gratitude does to the brain",
    verse: "“Give thanks in all circumstances.” — 1 Thessalonians 5:18",
    lead: "Naming something you're thankful for activates the brain's reward and regulation centers and measurably lowers the stress hormone cortisol. Gratitude isn't denial of what's hard — it's your nervous system finding solid ground. Scripture told us to give thanks long before we knew it calms the very chemistry of fear.",
    practice: "Write down three specific things from the last 24 hours. Specific beats vague — “the way the coffee smelled” works better than “my life.”",
  },
  {
    heading: "Why stillness isn't laziness",
    verse: "“Be still, and know that I am God.” — Psalm 46:10",
    lead: "When you go quiet, the brain switches into its “default mode network” — the state where it consolidates memory, processes meaning, and restores itself. Constant input blocks it. The rest God commands isn't a reward for finishing; it's the condition under which your mind heals at all.",
    practice: "Two minutes, no phone, eyes closed. Just breathe and let one verse sit. That's not nothing happening — that's repair.",
  },
  {
    heading: "How naming a feeling calms it",
    verse: "“Cast all your anxiety on him because he cares for you.” — 1 Peter 5:7",
    lead: "Brain imaging shows that putting a feeling into words — “I feel afraid,” “I feel alone” — quiets the amygdala, the brain's alarm. Psychologists call it “name it to tame it.” It's exactly what the Psalms model: David doesn't hide his fear from God, he says it out loud, and the saying begins the settling.",
    practice: "Tell God the true feeling in plain words today — not the tidy version. Naming it to Him is the first half of casting it on Him.",
  },
  {
    heading: "Why community changes your biology",
    verse: "“Carry each other's burdens.” — Galatians 6:2",
    lead: "Felt connection releases oxytocin and dampens the body's threat response; chronic isolation, by contrast, registers in the brain much like physical pain. We were literally built to heal in company. “Carry each other's burdens” isn't only kindness — it's how God designed our nervous systems to recover.",
    practice: "Send one honest text today — not “how are you,” but “here's how I actually am.” Connection starts when someone goes first.",
  },
  {
    heading: "The brain on hope",
    verse: "“…we have this hope as an anchor for the soul.” — Hebrews 6:19",
    lead: "Hope isn't wishful thinking to the brain — it's a forward-looking expectation that lights up the prefrontal cortex and helps regulate everything downstream of it. People with a sense of future cope measurably better with present pain. Scripture's “anchor for the soul” is doing real work in your head, not just your heart.",
    practice: "Name one thing you're looking forward to — small is fine. Giving your brain a future to lean toward changes how it carries today.",
  },
  {
    heading: "Why morning inputs set the day",
    verse: "“In the morning, Lord, you hear my voice.” — Psalm 5:3",
    lead: "The first 30 minutes after waking shape your baseline stress and attention for hours — the brain is unusually open then. What you feed it first tends to win. David's “in the morning” instinct lines up with how attention and mood actually get primed.",
    practice: "Before the feed, before the inbox — five minutes with the reading. Let God have the open window first.",
  },
];

/**
 * A COMPLETE premium issue for any date — every relevant segment filled, seeded
 * from the study library so each day is distinct and ready to read. The owner
 * opens it, reads the whole thing, edits in her voice, and marks it Ready.
 */
export function fullPremiumFor(date: string): PremiumData {
  const wIdx = weekdayIndex(date);
  const weekday = weekdayLabel(date);
  const dayIdx = dayIndexForDate(date);
  const s = getStudyDay(dayIdx);
  const angle = SCIENCE_ANGLES[(dayIdx - 1) % SCIENCE_ANGLES.length];

  const data: PremiumData = {
    weekFocus:
      weekday === "Sunday"
        ? "Rest & Reflect"
        : s.arc
          ? `Journey through ${s.arc}`
          : "Walking with God in real life",
    editorNote:
      "A little extra for the people walking closest with us. Here's the deeper layer behind today — the why under the what. — Lulu",

    // The Science Behind It — daily
    scienceHeading: angle.heading,
    scienceVerse: angle.verse,
    scienceBody: `${angle.lead}\n\nToday's reading sits right here. ${s.realLife}`,
    sciencePractice: angle.practice,

    closingLine:
      "You're not just reading more — you're going deeper, and you're helping someone find Jesus by making this possible. Thank you for being a Founding Member.",
  };

  // Inside the Circle — recurring live-session invite
  data.circleBody =
    "Founding Members get a seat in the live room. This season:\n\n• A monthly live conversation with a guest pastor — bring your real questions.\n\n• A live session with a licensed Christian therapist on faith and mental health — practical, gentle, no judgment.\n\nWatch your inbox for the link and the date — your spot is already saved.";
  data.circleCtaLabel = "See what's coming →";
  data.circleCtaUrl = process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "";

  // The World This Week — Thursdays only
  if (weekday === "Thursday") {
    data.worldHeading = "The World This Week";
    data.worldBody =
      "A few things moving in the world, read through the lens of faith — no outrage, no politics, just where God might be at work and how to pray.\n\n• Where we saw grace: a story of ordinary people showing up for each other this week — the kind of thing that rarely trends but is exactly what the Kingdom looks like.\n\n• Where the world is aching: a place carrying real weight right now. We don't look away; we lift it up.\n\n• Something to keep an eye on: a quiet shift worth noticing, and a question to sit with rather than a verdict to reach.\n\n(Replace these with the week's real items before you send — keep the tone warm, curious, and never partisan.)";
    data.worldPrayer =
      "Father, for the people behind every headline this week — the celebrating and the suffering — let Your mercy reach further than the news can. Make us people who pray before we post. Amen.";
  }

  // The Weekend Study — Saturdays only
  if (weekday === "Saturday") {
    const v = s.verses?.[0];
    const k = s.keyWords?.[0];
    const sv = splitVerse(s.verse);
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
