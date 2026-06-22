import "server-only";
import { getStudyDay, type KeyWord, type SideVerse } from "@/lib/studyGuide";
import { TOTAL_DAYS } from "@/lib/journey";

/** One printable workbook per "month" of the journey (30-day blocks). */
export type WorkbookMonth = {
  month: number; // 1..12
  label: string; // "Month 1"
  startDay: number;
  endDay: number;
  covers: string; // e.g. "John & Romans"
};

export type WorkbookDay = {
  day: number;
  reading: string;
  verse: string;
  keyWords: KeyWord[];
  verses: SideVerse[];
  reflection: string;
  step: string;
  sideReflection: string;
};

export const MONTH_LENGTH = 30;
export const MONTH_COUNT = 12;

/** Day range for a given month (last month absorbs the remainder up to 365). */
export function monthRange(month: number): { startDay: number; endDay: number } {
  const startDay = (month - 1) * MONTH_LENGTH + 1;
  const endDay =
    month >= MONTH_COUNT ? TOTAL_DAYS : Math.min(month * MONTH_LENGTH, TOTAL_DAYS);
  return { startDay, endDay };
}

/** Friendly summary of which book(s)/arc the month spans. */
function coversFor(startDay: number, endDay: number): string {
  const arcs: string[] = [];
  for (let d = startDay; d <= endDay; d++) {
    const a = getStudyDay(d).arc;
    if (a && !arcs.includes(a)) arcs.push(a);
  }
  if (arcs.length <= 2) return arcs.join(" & ");
  return `${arcs[0]} → ${arcs[arcs.length - 1]}`;
}

export function listWorkbookMonths(): WorkbookMonth[] {
  const months: WorkbookMonth[] = [];
  for (let m = 1; m <= MONTH_COUNT; m++) {
    const { startDay, endDay } = monthRange(m);
    months.push({
      month: m,
      label: `Month ${m}`,
      startDay,
      endDay,
      covers: coversFor(startDay, endDay),
    });
  }
  return months;
}

/** Validate + clamp a month param. Returns null if out of range. */
export function parseMonth(raw: string | number): number | null {
  const m = Number(raw);
  if (!Number.isInteger(m) || m < 1 || m > MONTH_COUNT) return null;
  return m;
}

/** All days for a month, with just the fields the workbook prints. */
export function getWorkbookMonth(
  month: number
): { meta: WorkbookMonth; days: WorkbookDay[] } | null {
  if (!parseMonth(month)) return null;
  const { startDay, endDay } = monthRange(month);
  const days: WorkbookDay[] = [];
  for (let d = startDay; d <= endDay; d++) {
    const e = getStudyDay(d);
    days.push({
      day: e.day,
      reading: e.reading,
      verse: e.verse,
      keyWords: e.keyWords,
      verses: e.verses,
      reflection: e.reflection,
      step: e.step,
      sideReflection: e.sideReflection,
    });
  }
  return {
    meta: {
      month,
      label: `Month ${month}`,
      startDay,
      endDay,
      covers: coversFor(startDay, endDay),
    },
    days,
  };
}
