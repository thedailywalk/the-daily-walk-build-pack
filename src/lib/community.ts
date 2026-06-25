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

/* -------------------------------- badges -------------------------------- */

export type BadgeStats = {
  longestStreak: number;
  memorizedTotal: number;
  prayerCount: number;
  favoritesCount: number;
  notesCount: number;
  daysCompleted: number;
};

export type Badge = {
  id: string;
  group: "consistency" | "practice";
  emoji: string;
  label: string;
  blurb: string;
  earned: boolean;
};

export function computeBadges(s: BadgeStats): Badge[] {
  const B = (
    id: string,
    group: Badge["group"],
    emoji: string,
    label: string,
    blurb: string,
    earned: boolean
  ): Badge => ({ id, group, emoji, label, blurb, earned });

  return [
    // Consistency — just showing up
    B("first-step", "consistency", "👣", "First Step", "You showed up — day one.", s.longestStreak >= 1),
    B("faithful-week", "consistency", "🔥", "Faithful Week", "Seven days walking with God.", s.longestStreak >= 7),
    B("steadfast", "consistency", "🌿", "Steadfast", "A 30-day streak.", s.longestStreak >= 30),
    B("hundredfold", "consistency", "🏔️", "Hundredfold", "100 days of showing up.", s.longestStreak >= 100),
    B("year-walk", "consistency", "🕊️", "One-Year Walk", "365 days. A whole year with Him.", s.longestStreak >= 365),
    // Spiritual practices — going deeper
    B("hidden-word", "practice", "💛", "Hidden in My Heart", "Memorized your first verse.", s.memorizedTotal >= 1),
    B("word-filled", "practice", "📖", "Word-Filled", "Memorized 10 verses.", s.memorizedTotal >= 10),
    B("first-prayer", "practice", "🙏", "First Prayer", "Wrote your first prayer.", s.prayerCount >= 1),
    B("prayer-warrior", "practice", "🛡️", "Prayer Warrior", "Wrote 10 prayers.", s.prayerCount >= 10),
    B("treasured", "practice", "⭐", "Treasured Word", "Saved a verse to keep.", s.favoritesCount >= 1),
  ];
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
