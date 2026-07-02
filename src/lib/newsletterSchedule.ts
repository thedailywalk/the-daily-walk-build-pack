import "server-only";
import {
  addDays,
  weekdayLabel,
  prettyDate,
  upcomingDates,
  fullDevotionalFor,
  adminListRange,
  type Devotional,
} from "@/lib/devotionals";
import { premiumListRange, fullPremiumFor, type PremiumIssue } from "@/lib/premium";
import {
  wellnessListRange,
  fullWellnessFor,
  isWellnessDay,
  type WellnessIssue,
} from "@/lib/wellness";

/**
 * One unified view of every newsletter edition across all publications, so the
 * owner can see and track the whole publishing schedule in one admin hub.
 *
 *   • Free Devotional         — Mon/Wed/Fri (tier: Free)
 *   • The Deeper Walk (Premium) — every day; +World (Thu), +Weekend Study (Sat)
 *   • Spiritual Wellness Guide  — Mon / Wed / Fri (Founding bonus)
 */
export type Publication = "free" | "premium" | "wellness";
export type EditionStatus = "ready" | "draft" | "generated";

export type Edition = {
  date: string; // YYYY-MM-DD
  publication: Publication;
  type: string; // short label shown in the "Type" column
  headline: string; // the edition's lead heading
  extra?: string; // e.g. "+ The World Through God's Lens"
  tier: "Free" | "Premium";
  status: EditionStatus;
  editHref: string;
  previewHref: string;
};

export const PUBLICATION_META: Record<
  Publication,
  { label: string; tier: "Free" | "Premium"; editBase: string }
> = {
  free: { label: "Daily Devotional", tier: "Free", editBase: "/admin/devotionals" },
  premium: { label: "The Deeper Walk", tier: "Premium", editBase: "/admin/premium" },
  wellness: { label: "Wellness Guide", tier: "Premium", editBase: "/admin/wellness" },
};

function statusOf(row: { status?: string } | undefined): EditionStatus {
  if (!row) return "generated";
  return row.status === "ready" ? "ready" : "draft";
}

/** The free newsletter sends 3× a week: Monday · Wednesday · Friday. */
export function isFreeDay(date: string): boolean {
  const wd = weekdayLabel(date);
  return wd === "Monday" || wd === "Wednesday" || wd === "Friday";
}

/** Build the edition objects for a single date from the (optional) saved rows. */
function editionsForDate(
  date: string,
  dev?: Devotional,
  prem?: PremiumIssue,
  well?: WellnessIssue
): Edition[] {
  const wd = weekdayLabel(date);
  const out: Edition[] = [];

  // Free devotional — Mon/Wed/Fri (3× a week)
  if (isFreeDay(date)) {
    const devHeadline = (dev?.data.readingHeading || fullDevotionalFor(date).readingHeading || "").trim();
    out.push({
      date,
      publication: "free",
      type: "Devotional (Free)",
      headline: devHeadline,
      tier: "Free",
      status: statusOf(dev),
      editHref: `/admin/devotionals?date=${date}`,
      previewHref: `/admin/newsletters?preview=free&date=${date}`,
    });
  }

  // Premium daily
  const premHeadline = (prem?.data.devHeading || fullPremiumFor(date).devHeading || "").trim();
  out.push({
    date,
    publication: "premium",
    type: "The Deeper Walk",
    headline: premHeadline,
    extra:
      wd === "Thursday"
        ? "+ The World Through God's Lens"
        : wd === "Saturday"
          ? "+ The Weekend Study"
          : undefined,
    tier: "Premium",
    status: statusOf(prem),
    editHref: `/admin/premium?date=${date}`,
    previewHref: `/admin/newsletters?preview=premium&date=${date}`,
  });

  // Wellness — Mon/Wed/Fri
  if (isWellnessDay(date)) {
    const wHeadline = (well?.data.scienceHeading || fullWellnessFor(date).scienceHeading || "").trim();
    out.push({
      date,
      publication: "wellness",
      type: "Wellness Guide",
      headline: wHeadline,
      tier: "Premium",
      status: statusOf(well),
      editHref: `/admin/wellness?date=${date}`,
      previewHref: `/admin/newsletters?preview=wellness&date=${date}`,
    });
  }

  return out;
}

/** Every edition between start and end (inclusive), oldest→newest. */
export async function editionsForRange(start: string, end: string): Promise<Edition[]> {
  const [devs, prems, wells] = await Promise.all([
    adminListRange(start, end),
    premiumListRange(start, end),
    wellnessListRange(start, end),
  ]);
  const devMap = new Map(devs.map((d) => [d.date, d]));
  const premMap = new Map(prems.map((d) => [d.date, d]));
  const wellMap = new Map(wells.map((d) => [d.date, d]));

  const editions: Edition[] = [];
  let d = start;
  // walk day by day (inclusive)
  while (d <= end) {
    editions.push(...editionsForDate(d, devMap.get(d), premMap.get(d), wellMap.get(d)));
    d = addDays(d, 1);
  }
  return editions;
}

/** A default window for the editorial list: ~5 weeks back through ~5 weeks ahead. */
export function defaultWindow(): { start: string; end: string } {
  const today = upcomingDates(1)[0];
  return { start: addDays(today, -35), end: addDays(today, 35) };
}

export { weekdayLabel, prettyDate, addDays };
