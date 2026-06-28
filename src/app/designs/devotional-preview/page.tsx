import type { Metadata } from "next";
import { fullDevotionalFor, weekdayLabel, prettyDate, type Devotional } from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";

export const metadata: Metadata = {
  title: "The Daily Walk — newsletter preview",
  robots: { index: false },
};

/**
 * A clean, login-free preview of a single free Daily Walk devotional — just the
 * newsletter, safe to share. Optional ?date=YYYY-MM-DD; defaults to a sample day.
 */
export default async function DevotionalPreview({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const sp = await searchParams;
  const date = sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) ? sp.date : "2026-06-26";

  const issue: Devotional = {
    date,
    status: "ready",
    title: fullDevotionalFor(date).readingHeading ?? "",
    data: fullDevotionalFor(date),
  };

  const CSS = `
    body{margin:0;background:#E8E2D4}
    .dp-wrap{max-width:640px;margin:0 auto;padding:26px 14px 60px}
    .dp-kick{font-family:Arial,Helvetica,sans-serif;text-align:center;letter-spacing:2.5px;text-transform:uppercase;font-size:11px;font-weight:700;color:#1F3A5F;margin-bottom:4px}
    .dp-date{font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12.5px;color:#8a8270;margin-bottom:18px}
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="dp-wrap">
        <div className="dp-kick">The Daily Walk · A preview</div>
        <div className="dp-date">{weekdayLabel(date)}, {prettyDate(date)}</div>
        <div dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(issue) }} />
      </div>
    </>
  );
}
