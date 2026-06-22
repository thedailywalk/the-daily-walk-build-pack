/**
 * Pure progress logic for the Bible-in-a-Year journey. No database, no I/O —
 * these are the rules the UI and the data layer share, and what the tests cover.
 *
 * Model: `currentDay` is the day the subscriber is on now (1..365). Marking it
 * complete advances to the next day. The journey is catch-up friendly — progress
 * is driven by completion, never by the calendar, so no one is ever "behind".
 */

export const TOTAL_DAYS = 365;

/** Clamp a day number into the valid 1..365 range. */
export function clampDay(day: number): number {
  if (!Number.isFinite(day)) return 1;
  return Math.min(TOTAL_DAYS, Math.max(1, Math.floor(day)));
}

export type PaceMode = "self" | "community";
export type JourneyStatus = "active" | "completed";

export type Progress = {
  startDate: string; // ISO date (YYYY-MM-DD)
  currentDay: number; // 1..365 — the day to read now
  paceMode: PaceMode;
  status: JourneyStatus;
};

/** A fresh journey starting today on Day 1. */
export function newProgress(today: string): Progress {
  return { startDate: today, currentDay: 1, paceMode: "self", status: "active" };
}

/** Mark the current day complete and advance. Completing day 365 finishes the plan. */
export function markComplete(p: Progress): Progress {
  if (p.status === "completed") return p;
  const next = p.currentDay + 1;
  if (next > TOTAL_DAYS) {
    return { ...p, currentDay: TOTAL_DAYS, status: "completed" };
  }
  return { ...p, currentDay: next, status: "active" };
}

/** Restart the plan at Day 1 (fresh start date). */
export function restart(p: Progress, today: string): Progress {
  return { ...p, currentDay: 1, status: "active", startDate: today };
}

/** Jump to a specific day (e.g. "join the community pace"). Clamped to 1..365. */
export function jumpToDay(p: Progress, day: number): Progress {
  return { ...p, currentDay: clampDay(day), status: "active" };
}

export function setPace(p: Progress, mode: PaceMode): Progress {
  return { ...p, paceMode: mode };
}

/** Days fully completed so far (0..365). */
export function daysCompleted(p: Progress): number {
  return p.status === "completed" ? TOTAL_DAYS : p.currentDay - 1;
}

/** Whole-number progress percentage (0..100). */
export function progressPercent(p: Progress): number {
  return Math.round((daysCompleted(p) / TOTAL_DAYS) * 100);
}
