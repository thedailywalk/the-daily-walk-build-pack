import type { Metadata } from "next";
import { fullWellnessFor, weekdayLabel, prettyDate, isWellnessDay, type WellnessIssue } from "@/lib/wellness";
import { renderWellnessHtml } from "@/lib/wellnessHtml";

export const metadata: Metadata = {
  title: "The Spiritual Wellness Guide — preview",
  robots: { index: false },
};

/**
 * A clean, login-free preview of a single Spiritual Wellness Guide issue —
 * just the newsletter, safe to share. Optional ?date=YYYY-MM-DD; defaults to a
 * representative Mon/Wed/Fri issue.
 */
export default async function WellnessPreview({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const sp = await searchParams;
  const date =
    sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) && isWellnessDay(sp.date)
      ? sp.date
      : "2026-06-26";

  const issue: WellnessIssue = {
    date,
    status: "ready",
    title: "",
    data: fullWellnessFor(date),
  };

  const CSS = `
    body{margin:0;background:#E4E8E0}
    .wp-wrap{max-width:640px;margin:0 auto;padding:26px 14px 60px}
    .wp-kick{font-family:Arial,Helvetica,sans-serif;text-align:center;letter-spacing:2.5px;text-transform:uppercase;font-size:11px;font-weight:700;color:#2C463B;margin-bottom:4px}
    .wp-date{font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12.5px;color:#6a7468;margin-bottom:18px}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="wp-wrap">
        <div className="wp-kick">The Daily Walk · A preview</div>
        <div className="wp-date">{weekdayLabel(date)}, {prettyDate(date)}</div>
        <div dangerouslySetInnerHTML={{ __html: renderWellnessHtml(issue) }} />
      </div>
    </>
  );
}
