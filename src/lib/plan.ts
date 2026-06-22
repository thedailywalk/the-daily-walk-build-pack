import "server-only";
import fs from "node:fs";
import path from "node:path";
import { TOTAL_DAYS, clampDay } from "./journey";

export { TOTAL_DAYS, clampDay };

/**
 * The 365-day Bible-in-a-Year plan, read from reading-plan/*.json (seed data).
 * Each subscriber walks this in order from their own Day 1. Static reference
 * data — no database table needed.
 */

export type PlanDay = {
  day: number; // 1..365
  week: number;
  /** that day's main reading, e.g. "John 1-2" */
  main: string;
  /** a Psalm/Proverb or a reflection prompt */
  companion: string;
  /** weekly focus / theme */
  weekTheme: string;
  /** the "Make It Real" question */
  prompt: string;
};

type RawDay = {
  day: number;
  week: number;
  main: string;
  companion: string;
  focus?: string;
  week_theme?: string;
  prompt: string;
};

let cache: PlanDay[] | null = null;

function load(): PlanDay[] {
  if (cache) return cache;
  const file = path.join(
    process.cwd(),
    "reading-plan",
    "the-daily-walk-365-plan.json"
  );
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as RawDay[];
  cache = raw.map((r) => ({
    day: r.day,
    week: r.week,
    main: r.main,
    companion: r.companion,
    weekTheme: r.week_theme ?? r.focus ?? "",
    prompt: r.prompt,
  }));
  return cache;
}

/** Get a single plan day (1..365), clamped to range. */
export function getPlanDay(day: number): PlanDay {
  const plan = load();
  return plan[clampDay(day) - 1];
}

/** Whole plan (e.g. for an archive view). */
export function getPlan(): PlanDay[] {
  return load();
}
