import type { Metadata } from "next";
import {
  adminGetByDate,
  fullDevotionalFor,
  upcomingDates,
} from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import { renderPremiumHtml } from "@/lib/premiumHtml";
import {
  SAMPLE_PREMIUM_DATE,
  SAMPLE_PREMIUM_DATA,
  SAMPLE_GOOD_NEWS,
} from "@/lib/sampleIssue";
import { wellnessGetByDate, fullWellnessFor, isWellnessDay } from "@/lib/wellness";
import { renderWellnessHtml } from "@/lib/wellnessHtml";
import { getDailyGoodNews } from "@/lib/goodNews";
import SamplesTabs from "@/components/SamplesTabs";

export const metadata: Metadata = {
  title: "Samples",
  description:
    "See exactly what lands in your inbox — a sample of the free Daily Walk devotional, the premium Deeper Walk, and the Spiritual Wellness Guide.",
};

// Rolls forward each day so the samples always show a real upcoming issue.
export const dynamic = "force-dynamic";

export default async function SamplesPage() {
  const dates = upcomingDates(10);
  const tomorrow = dates[1] ?? dates[0];
  const wellnessDate = dates.find((d) => isWellnessDay(d)) ?? dates[0];
  const goodNews = await getDailyGoodNews(3);

  // Free — tomorrow's devotional (published issue if there is one, else the
  // platform's auto-written version, which is what tomorrow's issue would be).
  const savedFree = await adminGetByDate(tomorrow);
  const freeData = savedFree?.status === "ready" ? savedFree.data : fullDevotionalFor(tomorrow);
  const freeHtml = renderDevotionalHtml(
    { date: tomorrow, status: "ready", title: savedFree?.title ?? "", data: freeData },
    goodNews
  );

  // Premium — a curated, hand-written Deeper Walk issue (our best work),
  // pinned so the preview never shows auto-generated copy. Its Glimpse story
  // is pinned too, so the sample always leads with a strong photo.
  const premiumHtml = renderPremiumHtml(
    {
      date: SAMPLE_PREMIUM_DATE,
      status: "ready",
      title: SAMPLE_PREMIUM_DATA.devHeading ?? "",
      data: SAMPLE_PREMIUM_DATA,
    },
    SAMPLE_GOOD_NEWS
  );

  // Wellness — the next Mon/Wed/Fri issue (included with Premium).
  const savedWell = await wellnessGetByDate(wellnessDate);
  const wellData = savedWell?.status === "ready" ? savedWell.data : fullWellnessFor(wellnessDate);
  const wellnessHtml = renderWellnessHtml({
    date: wellnessDate,
    status: "ready",
    title: savedWell?.title ?? "",
    data: wellData,
  });

  return (
    <>
      <header className="hero sunrise about-hero">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">See a sample</div>
            <h1>Peek inside before you subscribe</h1>
            <p className="lead">
              Here&apos;s exactly what lands in your inbox. Free readers get{" "}
              <strong>The Daily Walk</strong> three mornings a week. Founding Members get the
              deeper devotional <strong>every morning</strong> — plus the{" "}
              <strong>Spiritual Wellness Guide</strong> three times a week, included.
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <SamplesTabs free={freeHtml} premium={premiumHtml} wellness={wellnessHtml} />
        </div>
      </section>
    </>
  );
}
