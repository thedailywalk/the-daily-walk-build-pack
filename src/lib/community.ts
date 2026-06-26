import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { todayPT } from "@/lib/progress";

/**
 * Member Home community layer: a grace-based streak, Scripture-memory tracking +
 * a weekly leaderboard, derived badges, and an encouragement wall with reactions.
 *
 * Privacy: per-member data (check-ins, memory verses) is read/written with the
 * user-context client under RLS. The cross-member leaderboard and wall are built
 * server-side with the service client and expose only first names + counts.
 */

/* ------------------------------- helpers ------------------------------- */

export function displayNameFromEmail(email?: string | null): string {
  const raw = (email ?? "friend").split("@")[0].replace(/[._-]+/g, " ").trim();
  const first = raw.split(" ")[0] || "friend";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function addDaysStr(date: string, n: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Monday (YYYY-MM-DD) of the current week, Pacific. */
export function weekStartPT(from = todayPT()): string {
  const dow = new Date(`${from}T12:00:00Z`).getUTCDay(); // 0=Sun..6=Sat
  const back = dow === 0 ? 6 : dow - 1;
  return addDaysStr(from, -back);
}

/* --------------------------------- streak ------------------------------- */

export type Streak = { current: number; longest: number; today: boolean };

/** Record that this member showed up today (idempotent). */
export async function recordCheckIn(userId: string): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    await supabase
      .from("member_checkins")
      .upsert({ user_id: userId, day: todayPT() }, { onConflict: "user_id,day" });
  } catch {
    /* ignore */
  }
}

export async function getStreak(userId: string): Promise<Streak> {
  if (!supabaseConfigured) return { current: 0, longest: 0, today: false };
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("member_checkins")
      .select("day")
      .eq("user_id", userId)
      .order("day", { ascending: false })
      .limit(800);
    const days = (data ?? []).map((r) => r.day as string);
    if (!days.length) return { current: 0, longest: 0, today: false };

    const set = new Set(days);
    const today = todayPT();
    const hasToday = set.has(today);

    // Current streak: count back from today (grace: if today not logged yet but
    // yesterday is, the streak still stands).
    let current = 0;
    let cursor = hasToday ? today : addDaysStr(today, -1);
    while (set.has(cursor)) {
      current++;
      cursor = addDaysStr(cursor, -1);
    }

    // Longest streak across all check-ins.
    const sorted = [...set].sort();
    let longest = 0;
    let run = 0;
    let prev = "";
    for (const d of sorted) {
      run = prev && addDaysStr(prev, 1) === d ? run + 1 : 1;
      if (run > longest) longest = run;
      prev = d;
    }
    return { current, longest: Math.max(longest, current), today: hasToday };
  } catch {
    return { current: 0, longest: 0, today: false };
  }
}

/* ----------------------------- memory verses ---------------------------- */

export type MemoryVerse = {
  id: string;
  ref: string;
  verseText: string;
  status: "memorizing" | "memorized";
  memorizedAt: string | null;
  createdAt: string;
};

export async function listMyVerses(userId: string): Promise<MemoryVerse[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("memory_verses")
      .select("id,ref,verse_text,status,memorized_at,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return (data ?? []).map((r) => ({
      id: r.id as string,
      ref: (r.ref as string) ?? "",
      verseText: (r.verse_text as string) ?? "",
      status: (r.status as "memorizing" | "memorized") ?? "memorizing",
      memorizedAt: (r.memorized_at as string) ?? null,
      createdAt: r.created_at as string,
    }));
  } catch {
    return [];
  }
}

export async function memorizedCounts(
  userId: string
): Promise<{ thisWeek: number; total: number }> {
  if (!supabaseConfigured) return { thisWeek: 0, total: 0 };
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("memory_verses")
      .select("memorized_at")
      .eq("user_id", userId)
      .eq("status", "memorized");
    const since = `${weekStartPT()}T00:00:00Z`;
    const all = (data ?? []).filter((r) => r.memorized_at);
    const week = all.filter((r) => (r.memorized_at as string) >= since);
    return { thisWeek: week.length, total: all.length };
  } catch {
    return { thisWeek: 0, total: 0 };
  }
}

export async function addMemoryVerse(
  userId: string,
  name: string,
  ref: string,
  verseText: string
): Promise<void> {
  if (!supabaseConfigured || !ref.trim()) return;
  try {
    const supabase = await createClient();
    await supabase.from("memory_verses").insert({
      user_id: userId,
      name,
      ref: ref.trim(),
      verse_text: verseText.trim(),
      status: "memorizing",
    });
  } catch {
    /* ignore */
  }
}

/** The member's current (still-being-memorized) verse — newest first, one shown. */
export async function getCurrentMemoryVerse(userId: string): Promise<MemoryVerse | null> {
  const verses = await listMyVerses(userId);
  return verses.find((v) => v.status === "memorizing") ?? null;
}

/**
 * Set THE single active memory verse for the dashboard flashcard. One at a time:
 * any other in-progress verse is cleared first, then this one is added.
 * (Already-memorized verses are kept as history.)
 */
export async function setSingleMemoryVerse(
  userId: string,
  name: string,
  ref: string,
  verseText: string
): Promise<void> {
  if (!supabaseConfigured || !ref.trim()) return;
  try {
    const supabase = await createClient();
    await supabase
      .from("memory_verses")
      .delete()
      .eq("user_id", userId)
      .eq("status", "memorizing");
    await supabase.from("memory_verses").insert({
      user_id: userId,
      name,
      ref: ref.trim(),
      verse_text: verseText.trim(),
      status: "memorizing",
    });
  } catch {
    /* ignore */
  }
}

export async function deleteMemoryVerse(userId: string, id: string): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    await supabase.from("memory_verses").delete().eq("user_id", userId).eq("id", id);
  } catch {
    /* ignore */
  }
}

/** Mark a verse memorized, post it to the wall, and award any new badges. */
export async function markMemorized(
  userId: string,
  name: string,
  id: string
): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("memory_verses")
      .update({ status: "memorized", memorized_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("id", id)
      .eq("status", "memorizing")
      .select("ref")
      .maybeSingle();
    if (data?.ref) {
      await postAchievement(userId, name, "memorized", `memorized ${data.ref}`, "");
    }
  } catch {
    /* ignore */
  }
}

/* ------------------------------ leaderboard ----------------------------- */

export type LeaderRow = { userId: string; name: string; count: number; isMe: boolean };

async function tallyMemorized(meId: string, since?: string): Promise<LeaderRow[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    let q = supabase
      .from("memory_verses")
      .select("user_id,name,memorized_at")
      .eq("status", "memorized");
    if (since) q = q.gte("memorized_at", since);
    const { data } = await q.limit(5000);
    const by = new Map<string, { name: string; count: number }>();
    for (const r of data ?? []) {
      const uid = r.user_id as string;
      const cur = by.get(uid) ?? { name: (r.name as string) || "A member", count: 0 };
      cur.count++;
      if (r.name) cur.name = r.name as string;
      by.set(uid, cur);
    }
    return [...by.entries()]
      .map(([userId, v]) => ({ userId, name: v.name, count: v.count, isMe: userId === meId }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

export async function weeklyLeaderboard(meId: string, limit = 10): Promise<LeaderRow[]> {
  const rows = await tallyMemorized(meId, `${weekStartPT()}T00:00:00Z`);
  return rows.slice(0, limit);
}

export async function allTimeLeaderboard(meId: string, limit = 10): Promise<LeaderRow[]> {
  const rows = await tallyMemorized(meId);
  return rows.slice(0, limit);
}

/* ------------------------------- the wall ------------------------------- */

export const REACTIONS = [
  { kind: "amen", emoji: "🙏", label: "Amen" },
  { kind: "love", emoji: "❤️", label: "Love" },
  { kind: "fire", emoji: "🔥", label: "Keep going" },
  { kind: "pray", emoji: "🕊️", label: "Praying" },
] as const;
export type ReactionKind = (typeof REACTIONS)[number]["kind"];

export type WallItem = {
  id: string;
  name: string;
  kind: string;
  label: string;
  detail: string;
  createdAt: string;
  counts: Record<string, number>;
  myReaction: string | null;
};

/** Insert a milestone onto the wall (service role). */
export async function postAchievement(
  userId: string,
  name: string,
  kind: string,
  label: string,
  detail: string
): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase
      .from("achievements")
      .insert({ user_id: userId, name, kind, label, detail });
  } catch {
    /* ignore */
  }
}

export async function communityWall(meId: string, limit = 25): Promise<WallItem[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data: ach } = await supabase
      .from("achievements")
      .select("id,name,kind,label,detail,created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    const items = ach ?? [];
    if (!items.length) return [];
    const ids = items.map((a) => a.id as string);

    const { data: reacts } = await supabase
      .from("achievement_reactions")
      .select("achievement_id,user_id,kind")
      .in("achievement_id", ids);

    const counts = new Map<string, Record<string, number>>();
    const mine = new Map<string, string>();
    for (const r of reacts ?? []) {
      const aid = r.achievement_id as string;
      const c = counts.get(aid) ?? {};
      c[r.kind as string] = (c[r.kind as string] ?? 0) + 1;
      counts.set(aid, c);
      if ((r.user_id as string) === meId) mine.set(aid, r.kind as string);
    }

    return items.map((a) => ({
      id: a.id as string,
      name: (a.name as string) || "A member",
      kind: (a.kind as string) ?? "milestone",
      label: (a.label as string) ?? "",
      detail: (a.detail as string) ?? "",
      createdAt: a.created_at as string,
      counts: counts.get(a.id as string) ?? {},
      myReaction: mine.get(a.id as string) ?? null,
    }));
  } catch {
    return [];
  }
}

/** Toggle the member's reaction on an achievement (one reaction per member). */
export async function reactToAchievement(
  userId: string,
  achievementId: string,
  kind: ReactionKind
): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from("achievement_reactions")
      .select("id,kind")
      .eq("achievement_id", achievementId)
      .eq("user_id", userId)
      .maybeSingle();
    if (existing) {
      await supabase.from("achievement_reactions").delete().eq("id", existing.id);
      if (existing.kind === kind) return; // tapped the same one → just remove
    }
    await supabase
      .from("achievement_reactions")
      .insert({ achievement_id: achievementId, user_id: userId, kind });
  } catch {
    /* ignore */
  }
}

/* ---------------------------- walk score -------------------------------- */

export type WalkScore = {
  score: number;
  level: string;
  nextLevel: string | null;
  toNext: number; // points to the next level (0 if maxed)
  intoLevel: number; // 0..1 progress through the current level
};

const WALK_LEVELS = [
  { min: 0, name: "Seedling" },
  { min: 60, name: "Sprouting" },
  { min: 160, name: "Taking Root" },
  { min: 360, name: "Growing" },
  { min: 720, name: "Flourishing" },
  { min: 1400, name: "Deeply Rooted" },
] as const;

/** A single, transparent "how's my walk going" number from real engagement. */
export function walkScore(s: {
  daysCompleted: number;
  memorizedTotal: number;
  prayerCount: number;
  longestStreak: number;
  notesCount: number;
  favoritesCount: number;
}): WalkScore {
  const score =
    s.daysCompleted * 10 +
    s.memorizedTotal * 15 +
    s.prayerCount * 5 +
    s.longestStreak * 3 +
    s.notesCount * 2 +
    s.favoritesCount * 2;

  let idx = 0;
  for (let i = 0; i < WALK_LEVELS.length; i++) if (score >= WALK_LEVELS[i].min) idx = i;
  const level = WALK_LEVELS[idx].name;
  const next = WALK_LEVELS[idx + 1] ?? null;
  const base = WALK_LEVELS[idx].min;
  const toNext = next ? next.min - score : 0;
  const intoLevel = next ? Math.min(1, (score - base) / (next.min - base)) : 1;
  return { score, level, nextLevel: next?.name ?? null, toNext, intoLevel };
}

/* ----------------------- cross-member aggregates ------------------------ */

function currentStreakFromDays(days: string[]): number {
  const set = new Set(days);
  if (!set.size) return 0;
  const today = todayPT();
  let cur = 0;
  let cursor = set.has(today) ? today : addDaysStr(today, -1);
  while (set.has(cursor)) {
    cur++;
    cursor = addDaysStr(cursor, -1);
  }
  return cur;
}

/** Map user_id → first name, gathered from any table that stores it. */
async function nameMap(): Promise<Map<string, string>> {
  const m = new Map<string, string>();
  if (!adminDbConfigured) return m;
  try {
    const supabase = createServiceClient();
    const [{ data: a }, { data: v }] = await Promise.all([
      supabase.from("achievements").select("user_id,name"),
      supabase.from("memory_verses").select("user_id,name"),
    ]);
    for (const r of [...(a ?? []), ...(v ?? [])]) {
      const uid = r.user_id as string;
      const nm = (r.name as string) || "";
      if (uid && nm && !m.has(uid)) m.set(uid, nm);
    }
  } catch {
    /* ignore */
  }
  return m;
}

/** "Showing up" board — members ranked by their CURRENT streak. */
export async function streakLeaderboard(meId: string, limit = 8): Promise<LeaderRow[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from("member_checkins").select("user_id,day").limit(20000);
    const byUser = new Map<string, string[]>();
    for (const r of data ?? []) {
      const uid = r.user_id as string;
      const arr = byUser.get(uid) ?? [];
      arr.push(r.day as string);
      byUser.set(uid, arr);
    }
    const names = await nameMap();
    const rows: LeaderRow[] = [];
    for (const [uid, days] of byUser) {
      const cur = currentStreakFromDays(days);
      if (cur <= 0) continue;
      rows.push({ userId: uid, name: names.get(uid) || "A member", count: cur, isMe: uid === meId });
    }
    rows.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    return rows.slice(0, limit);
  } catch {
    return [];
  }
}

export type CommunityPace = {
  myDay: number;
  avgDay: number;
  walking: number; // members on the journey
  aheadPct: number; // % of members at or behind my day
};

/** "Where everyone's at" — community pace on the Bible-in-a-Year journey. */
export async function communityPace(meId: string, myDay: number): Promise<CommunityPace> {
  if (!adminDbConfigured) return { myDay, avgDay: myDay, walking: 1, aheadPct: 0 };
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from("plan_progress").select("user_id,current_day").limit(20000);
    const days = (data ?? []).map((r) => Number(r.current_day) || 1);
    const walking = days.length || 1;
    const avgDay = days.length ? Math.round(days.reduce((a, b) => a + b, 0) / days.length) : myDay;
    const atOrBehind = days.filter((d) => d <= myDay).length;
    const aheadPct = days.length ? Math.round((atOrBehind / days.length) * 100) : 0;
    return { myDay, avgDay, walking, aheadPct };
  } catch {
    return { myDay, avgDay: myDay, walking: 1, aheadPct: 0 };
  }
}

export type WeeklyActivity = {
  thisWeek: { days: number; verses: number };
  lastWeek: { days: number; verses: number };
};

/** This-week vs last-week activity for the momentum chart. */
export async function weeklyActivity(userId: string): Promise<WeeklyActivity> {
  const empty: WeeklyActivity = { thisWeek: { days: 0, verses: 0 }, lastWeek: { days: 0, verses: 0 } };
  if (!supabaseConfigured) return empty;
  try {
    const supabase = await createClient();
    const thisStart = weekStartPT();
    const lastStart = addDaysStr(thisStart, -7);
    const [{ data: ci }, { data: mv }] = await Promise.all([
      supabase.from("member_checkins").select("day").eq("user_id", userId).gte("day", lastStart),
      supabase
        .from("memory_verses")
        .select("memorized_at")
        .eq("user_id", userId)
        .eq("status", "memorized")
        .gte("memorized_at", `${lastStart}T00:00:00Z`),
    ]);
    const out: WeeklyActivity = { thisWeek: { days: 0, verses: 0 }, lastWeek: { days: 0, verses: 0 } };
    for (const r of ci ?? []) {
      const d = r.day as string;
      if (d >= thisStart) out.thisWeek.days++;
      else out.lastWeek.days++;
    }
    const thisStartTs = `${thisStart}T00:00:00Z`;
    for (const r of mv ?? []) {
      const m = r.memorized_at as string;
      if (m >= thisStartTs) out.thisWeek.verses++;
      else out.lastWeek.verses++;
    }
    return out;
  } catch {
    return empty;
  }
}

/** Post a member's own encouragement/praise to the wall. */
export async function shareToWall(userId: string, name: string, text: string): Promise<void> {
  const clean = text.trim().slice(0, 280);
  if (!clean) return;
  await postAchievement(userId, name, "share", clean, "");
}

/* -------------------------------- badges -------------------------------- */

export type BadgeStats = {
  longestStreak: number;
  currentStreak: number;
  memorizedTotal: number;
  prayerCount: number;
  favoritesCount: number;
  notesCount: number;
  daysCompleted: number;
  reactionsGiven: number;
  sharesPosted: number;
};

export type BadgeGroup =
  | "consistency"
  | "word"
  | "prayer"
  | "community"
  | "milestone"
  | "secret";

export const BADGE_GROUP_LABEL: Record<BadgeGroup, string> = {
  consistency: "Showing up",
  word: "The Word",
  prayer: "Prayer",
  community: "Community",
  milestone: "Milestones",
  secret: "Hidden blessings",
};

export type Badge = {
  id: string;
  group: BadgeGroup;
  emoji: string;
  label: string;
  blurb: string;
  earned: boolean;
  /** Secret badges are hidden until earned — a little delight, never previewed. */
  secret?: boolean;
};

export function computeBadges(s: BadgeStats): Badge[] {
  const B = (
    id: string,
    group: BadgeGroup,
    emoji: string,
    label: string,
    blurb: string,
    earned: boolean,
    secret = false
  ): Badge => ({ id, group, emoji, label, blurb, earned, secret });

  return [
    // Showing up — consistency
    B("first-step", "consistency", "👣", "First Step", "You showed up — day one.", s.longestStreak >= 1),
    B("faithful-week", "consistency", "🔥", "Faithful Week", "Seven days walking with God.", s.longestStreak >= 7),
    B("steadfast", "consistency", "🌿", "Steadfast", "A 30-day streak.", s.longestStreak >= 30),
    B("hundredfold", "consistency", "🏔️", "Hundredfold", "100 days of showing up.", s.longestStreak >= 100),
    B("year-walk", "consistency", "🕊️", "One-Year Walk", "365 days. A whole year with Him.", s.longestStreak >= 365),
    // The Word
    B("hidden-word", "word", "💛", "Hidden in My Heart", "Memorized your first verse.", s.memorizedTotal >= 1),
    B("word-filled", "word", "📖", "Word-Filled", "Memorized 10 verses.", s.memorizedTotal >= 10),
    B("treasured", "word", "⭐", "Treasured Verse", "Saved a verse to keep.", s.favoritesCount >= 1),
    // Prayer
    B("first-prayer", "prayer", "🙏", "First Prayer", "Wrote your first prayer.", s.prayerCount >= 1),
    B("prayer-warrior", "prayer", "🛡️", "Prayer Warrior", "Wrote 10 prayers.", s.prayerCount >= 10),
    B("mountain-mover", "prayer", "⛰️", "Mountain Mover", "Wrote 30 prayers.", s.prayerCount >= 30),
    // Community
    B("encourager", "community", "🤍", "Encourager", "Cheered others on 10 times.", s.reactionsGiven >= 10),
    B("voice-praise", "community", "📣", "Voice of Praise", "Shared something on the wall.", s.sharesPosted >= 1),
    // Milestones — the journey
    B("on-the-way", "milestone", "🚶", "On the Way", "Started the journey.", s.daysCompleted >= 1),
    B("halfway", "milestone", "🏞️", "Halfway There", "Reached the middle of the Bible.", s.daysCompleted >= 183),
    B("whole-bible", "milestone", "🏆", "Whole Bible", "Read the entire Bible. 🎉", s.daysCompleted >= 365),
    // Hidden blessings — secret, revealed only when earned
    B("comeback", "secret", "🌅", "Quiet Comeback", "You came back after a pause — grace wins.", s.currentStreak >= 1 && s.longestStreak >= 3 && s.longestStreak > s.currentStreak, true),
    B("hidden-gem", "secret", "💎", "Hidden Gem", "50 verses hidden in your heart.", s.memorizedTotal >= 50, true),
    B("well-rounded", "secret", "🌟", "Well-Rounded Walk", "Reading, prayer, memory & saved verses — all growing together.", s.memorizedTotal >= 5 && s.prayerCount >= 5 && s.daysCompleted >= 5 && s.favoritesCount >= 3, true),
  ];
}

/** How many times this member has reacted to others (for Community badges). */
export async function reactionsGivenCount(userId: string): Promise<number> {
  if (!supabaseConfigured) return 0;
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("achievement_reactions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);
    return count ?? 0;
  } catch {
    return 0;
  }
}

/** How many things this member has shared to the wall (for Community badges). */
export async function sharesPostedCount(userId: string): Promise<number> {
  if (!supabaseConfigured) return 0;
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("achievements")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("kind", "share");
    return count ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Award (post to the wall) any consistency/practice badges newly earned, once
 * each. De-duped by checking for an existing achievement with the same label.
 */
export async function awardNewBadges(
  userId: string,
  name: string,
  stats: BadgeStats
): Promise<void> {
  if (!adminDbConfigured) return;
  const earned = computeBadges(stats).filter((b) => b.earned);
  if (!earned.length) return;
  try {
    const supabase = createServiceClient();
    const { data: had } = await supabase
      .from("achievements")
      .select("label")
      .eq("user_id", userId)
      .eq("kind", "badge");
    const have = new Set((had ?? []).map((r) => r.label as string));
    for (const b of earned) {
      const label = `earned the “${b.label}” badge`;
      if (have.has(label)) continue;
      await postAchievement(userId, name, "badge", label, `${b.emoji} ${b.blurb}`);
    }
  } catch {
    /* ignore */
  }
}
