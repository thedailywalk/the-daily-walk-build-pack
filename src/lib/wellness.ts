import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { todayPT } from "@/lib/progress";
import { getStudyDay } from "@/lib/studyGuide";
import { weekdayLabel, prettyDate, upcomingDates, dayIndexForDate } from "@/lib/devotionals";

export { weekdayLabel, prettyDate, upcomingDates };

/**
 * The SPIRITUAL WELLNESS GUIDE — the Founding-Member bonus track, sent 3×/week
 * (Mon / Wed / Fri). Faith-based emotional wellness + neuroscience tools, built
 * to give peace and practical calm, not just more content. Segments:
 *   • The Science Behind It        — faith + neuroscience + one tool
 *   • The Peace Practice           — a 60-second nervous-system reset (Release / Receive / Respond)
 *   • The Pattern Breaker          — old thought → new truth → one action
 *   • The Prayer Lab               — a guided prayer prompt for a real situation
 *   • A Question Worth Sitting With — a deeper reflection/journal prompt
 *
 * Same prep rhythm as the newsletters (open & edit → mark Ready → publishes).
 */
export type WellnessData = {
  weekFocus?: string;
  dayLabel?: string;
  editorNote?: string;

  /* The Science Behind It */
  scienceHeading?: string;
  scienceVerse?: string;
  scienceBody?: string;
  sciencePractice?: string;

  /* The Peace Practice — 60-second reset */
  peaceIntro?: string; // the breathe + prayer line
  peaceRelease?: string; // one thing you cannot control
  peaceReceive?: string; // one truth from God
  peaceRespond?: string; // one obedient next step

  /* The Pattern Breaker */
  patternOld?: string;
  patternNew?: string;
  patternNote?: string; // optional one-line why/encouragement

  /* The Prayer Lab — a guided prayer for a real situation */
  prayerLabTitle?: string; // e.g. "When you feel anxious"
  prayerLabStart?: string;
  prayerLabName?: string;
  prayerLabSurrender?: string;
  prayerLabAsk?: string;

  /* A Question Worth Sitting With */
  question?: string;

  closingLine?: string;
};

export type WellnessStatus = "draft" | "ready";

export type WellnessIssue = {
  date: string;
  status: WellnessStatus;
  title: string;
  data: WellnessData;
  updatedAt?: string;
};

const TABLE = "wellness_issues";

/** Mon / Wed / Fri are wellness days (1=Mon, 3=Wed, 5=Fri). */
export function isWellnessDay(date: string): boolean {
  const dow = new Date(`${date}T12:00:00Z`).getUTCDay();
  return dow === 1 || dow === 3 || dow === 5;
}

/* ------------------------------ row mapping ----------------------------- */
function rowToIssue(r: {
  date: string;
  status: string;
  title: string;
  data: unknown;
  updated_at?: string;
}): WellnessIssue {
  return {
    date: r.date,
    status: (r.status as WellnessStatus) ?? "draft",
    title: r.title ?? "",
    data: (r.data as WellnessData) ?? {},
    updatedAt: r.updated_at,
  };
}

/* ------------------------------- reader -------------------------------- */
export async function getLiveWellness(): Promise<WellnessIssue | null> {
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
export async function wellnessGetByDate(date: string): Promise<WellnessIssue | null> {
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

export async function wellnessListRange(start: string, end: string): Promise<WellnessIssue[]> {
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

export async function wellnessListBefore(beforeDate: string, limit = 120): Promise<WellnessIssue[]> {
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

export async function wellnessUpsert(
  date: string,
  status: WellnessStatus,
  title: string,
  data: WellnessData
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

export async function wellnessDelete(date: string): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from(TABLE).delete().eq("date", date);
  } catch {
    /* ignore */
  }
}

/** Seed FULLY-written wellness drafts for the Mon/Wed/Fri days in the next
 *  `count` days that are missing one. */
export async function wellnessEnsureWeek(count = 7): Promise<void> {
  if (!adminDbConfigured) return;
  const dates = upcomingDates(count).filter(isWellnessDay);
  if (!dates.length) return;
  const existing = await wellnessListRange(dates[0], dates[dates.length - 1]);
  const have = new Set(existing.map((d) => d.date));
  for (const date of dates) {
    if (have.has(date)) continue;
    const data = fullWellnessFor(date);
    await wellnessUpsert(date, "draft", data.scienceHeading ?? "", data);
  }
}

/* ---------------------- rotating content libraries ---------------------- */

/** Neuroscience angles — each pairs a brain finding with a Scripture truth. */
const SCIENCE_ANGLES = [
  {
    heading: "Why repeating truth rewires you",
    verse: "“…be transformed by the renewing of your mind.” — Romans 12:2",
    lead: "Neuroscientists call it neuroplasticity: the thoughts you return to most often physically thicken the neural pathways that carry them. Repeat worry and you pave a worry highway; repeat a promise of God and you lay new road. Paul wrote “renewing of your mind” two thousand years before we could watch it happen on a scan — but the brain agrees with him.",
    practice: "Pick one true line and say it out loud three times before noon. You're not being sentimental — you're laying track.",
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
    lead: "Felt connection releases oxytocin and dampens the body's threat response; chronic isolation registers in the brain much like physical pain. We were literally built to heal in company. “Carry each other's burdens” isn't only kindness — it's how God designed our nervous systems to recover.",
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
    practice: "Before the feed, before the inbox — five minutes with God. Let Him have the open window first.",
  },
];

const PEACE = [
  {
    intro: "Take 60 seconds. Breathe slowly. Place your hand over your chest and pray: “Lord, help me carry only what You have given me to carry today.”",
    release: "one thing you cannot control.",
    receive: "“My grace is sufficient for you.” (2 Corinthians 12:9)",
    respond: "the next small, faithful step in front of you.",
  },
  {
    intro: "Pause for one minute. Inhale for four counts, exhale for six. As you exhale, pray: “You are God, and I am not — and that is good news.”",
    release: "the outcome you keep rehearsing in your head.",
    receive: "“The Lord is my shepherd; I shall not want.” (Psalm 23:1)",
    respond: "one thing that is actually yours to do today.",
  },
  {
    intro: "Sixty seconds. Unclench your jaw and your hands. Breathe, and pray: “I don't have to hold it all together. You already are.”",
    release: "the pressure to have it all figured out.",
    receive: "“He will keep in perfect peace those whose minds are stayed on Him.” (Isaiah 26:3)",
    respond: "one slow, present act — really see the person in front of you.",
  },
];

const PATTERNS = [
  { old: "I shut down when I feel rejected.", neu: "I pause, pray, and respond from security instead of fear.", note: "You are already accepted in Christ — rejection can't touch that." },
  { old: "I obsess over what I cannot control.", neu: "I bring it to God and take the next faithful step.", note: "Control was never your job; faithfulness is." },
  { old: "I compare my life to everyone else's.", neu: "I remember that obedience is not a race.", note: "God is writing a different, on-time story for you." },
  { old: "I numb out when things feel heavy.", neu: "I name what I feel and bring it to God before I escape it.", note: "Feeling it with God beats avoiding it alone." },
  { old: "I assume the worst when someone goes quiet.", neu: "I choose trust over the story my fear is writing.", note: "Most of what we dread never happens." },
];

const PRAYER_LAB = [
  { title: "When you feel anxious", start: "God, I'm being honest with You…", name: "I feel anxious about ___, and it's bigger than I can carry.", surrender: "I release my grip on the outcome into Your hands.", ask: "Lead me into Your peace, and show me the one next step that's mine." },
  { title: "When you need wisdom", start: "God, I'm being honest with You…", name: "I feel unsure, and I don't want to force a door.", surrender: "I release my timeline and my need to look like I have it together.", ask: "Give me wisdom, and the patience to wait for Your clarity." },
  { title: "When you feel distant from God", start: "God, I'm being honest with You…", name: "I feel far from You — and I'm not even sure why.", surrender: "I release the guilt that says I have to earn my way back.", ask: "Meet me here. Help me take one small step toward You today." },
  { title: "When you're tired of starting over", start: "God, I'm being honest with You…", name: "I feel discouraged, like I keep ending up at the beginning.", surrender: "I release the lie that starting again means I've failed.", ask: "Give me the grace to begin once more, with You beside me." },
  { title: "When you're tempted to go back to an old pattern", start: "God, I'm being honest with You…", name: "I feel the pull of something I know doesn't lead anywhere good.", surrender: "I release the part of me that wants the quick comfort.", ask: "Strengthen me to choose the better thing, one moment at a time." },
];

const QUESTIONS = [
  "What are you asking God to change around you that He may first be trying to heal within you?",
  "Where have you been confusing pressure with purpose?",
  "What would peace look like if nothing in your circumstances changed yet?",
  "What part of your life needs obedience more than explanation?",
  "What are you carrying today that God never asked you to pick up?",
  "Where is God inviting you to trade control for trust?",
];

function pick<T>(arr: T[], i: number): T {
  return arr[((i % arr.length) + arr.length) % arr.length];
}

/**
 * A COMPLETE wellness-guide issue for a Mon/Wed/Fri date — every segment filled,
 * rotating through the content libraries so each issue is distinct and ready.
 */
export function fullWellnessFor(date: string): WellnessData {
  const dayIdx = dayIndexForDate(date);
  const s = getStudyDay(dayIdx);
  const angle = pick(SCIENCE_ANGLES, dayIdx - 1);
  const peace = pick(PEACE, dayIdx - 1);
  const pattern = pick(PATTERNS, dayIdx - 1);
  const lab = pick(PRAYER_LAB, dayIdx - 1);
  const question = pick(QUESTIONS, dayIdx - 1);

  return {
    weekFocus: "Steady your heart, mind, and walk with God",
    editorNote:
      "Your midweek breath of fresh air. A few small practices to steady your mind and bring your real life to God. — Lulu",

    scienceHeading: angle.heading,
    scienceVerse: angle.verse,
    scienceBody: `${angle.lead}\n\nWhere this meets your week: ${s.realLife}`,
    sciencePractice: angle.practice,

    peaceIntro: peace.intro,
    peaceRelease: peace.release,
    peaceReceive: peace.receive,
    peaceRespond: peace.respond,

    patternOld: pattern.old,
    patternNew: pattern.neu,
    patternNote: pattern.note,

    prayerLabTitle: lab.title,
    prayerLabStart: lab.start,
    prayerLabName: lab.name,
    prayerLabSurrender: lab.surrender,
    prayerLabAsk: lab.ask,

    question,

    closingLine:
      "Small practices, done with God, are how a steady soul is built. You don't have to carry it all — He's with you in all of it.",
  };
}
