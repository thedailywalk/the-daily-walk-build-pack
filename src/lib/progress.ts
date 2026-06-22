import "server-only";
import { createClient } from "./supabase/server";
import { newProgress, type PaceMode, type Progress } from "./journey";

/**
 * Persistence for journey progress, backed by the Supabase `plan_progress`
 * table (one row per user, row-level-security so each user only sees their own).
 * The transition rules live in journey.ts; this module just loads/saves.
 */

const TABLE = "plan_progress";

type Row = {
  user_id: string;
  start_date: string;
  current_day: number;
  pace_mode: PaceMode;
  status: Progress["status"];
};

/** Today's date (YYYY-MM-DD) anchored to Pacific — the publication's timezone. */
export function todayPT(): string {
  // en-CA renders ISO-style YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

function rowToProgress(r: Row): Progress {
  return {
    startDate: r.start_date,
    currentDay: r.current_day,
    paceMode: r.pace_mode,
    status: r.status,
  };
}

/** Load the user's progress, creating a fresh Day 1 record on first visit. */
export async function getOrCreateProgress(userId: string): Promise<Progress> {
  const supabase = await createClient();

  const { data } = await supabase
    .from(TABLE)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (data) return rowToProgress(data as Row);

  const fresh = newProgress(todayPT());
  const { error } = await supabase.from(TABLE).insert({
    user_id: userId,
    start_date: fresh.startDate,
    current_day: fresh.currentDay,
    pace_mode: fresh.paceMode,
    status: fresh.status,
  });
  if (error) console.error("[progress] insert failed:", error.message);
  return fresh;
}

/** Persist a progress record for the user. */
export async function saveProgress(
  userId: string,
  p: Progress
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from(TABLE)
    .update({
      start_date: p.startDate,
      current_day: p.currentDay,
      pace_mode: p.paceMode,
      status: p.status,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
  if (error) console.error("[progress] update failed:", error.message);
}
