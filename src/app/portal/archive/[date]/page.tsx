import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminGetByDate, prettyDate } from "@/lib/devotionals";
import { todayPT } from "@/lib/progress";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";

export const metadata: Metadata = {
  title: "Devotional",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function ArchiveReader({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const dev = await adminGetByDate(date);
  // Members only see issues that actually went out (ready + on/before today).
  if (!dev || dev.status !== "ready" || date > todayPT()) notFound();

  return (
    <div className="m-wrap m-reader">
      <Link href="/portal/archive" className="m-back">← Back to archive</Link>
      <div className="arc-readdate">{prettyDate(date)}</div>
      <article
        className="m-issue"
        dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(dev) }}
      />
    </div>
  );
}
