import type { Metadata } from "next";
import { getLiveDevotional, prettyDate } from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import { getDailyGoodNews } from "@/lib/goodNews";
import { verseCardImage } from "@/lib/verseCards";
import { site } from "@/lib/site";

/**
 * /today — the public share link for the day's FREE devotional.
 *
 * Made to be texted: no sign-in wall, a warm "someone sent you this" note up
 * top, the full issue in the middle, and a sticky "Subscribe free" bar so a
 * reader who wants tomorrow's can get it in one tap. The link preview (OG)
 * uses the day's annotated verse card, so the text message shows the verse.
 */

export const dynamic = "force-dynamic";

/** Rich link preview for texted/shared links — title, verse, and the day's card. */
export async function generateMetadata(): Promise<Metadata> {
  const dev = await getLiveDevotional();
  const baseTitle = dev?.title?.trim() || "Today's Devotional";
  // The bold first line of a texted link preview — branded so people know to tap.
  const ogTitle = `☀️ Today's Walk — ${baseTitle}`;
  const verse = dev?.data.verseText?.trim() ?? "";
  const ref = dev?.data.verseRef?.trim() ?? "";
  const description = verse
    ? `Tap to read today's free 2-minute devotional · “${verse.length > 110 ? `${verse.slice(0, 107).trimEnd()}…` : verse}”${ref ? ` — ${ref}` : ""}`
    : "Tap to read today's free 2-minute devotional from The Daily Walk.";
  const card = dev
    ? verseCardImage("free", dev.date, site.url) ??
      `${site.url}/api/verse-card?t=${encodeURIComponent(verse)}${ref ? `&r=${encodeURIComponent(ref)}` : ""}`
    : null;
  return {
    title: `Today's Walk — ${baseTitle}`,
    description,
    alternates: { canonical: `${site.url}/today` },
    openGraph: {
      title: ogTitle,
      description,
      url: `${site.url}/today`,
      siteName: site.name,
      type: "article",
      ...(card ? { images: [card] } : {}),
    },
    twitter: {
      card: card ? "summary_large_image" : "summary",
      title: ogTitle,
      description,
    },
  };
}

export default async function TodaySharePage() {
  const dev = await getLiveDevotional();

  if (!dev) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
          <div className="sec-tag">Today&apos;s Devotional</div>
          <h1 style={{ color: "var(--navy)" }}>This morning&apos;s walk is almost ready</h1>
          <p className="sub">
            We&apos;re putting the finishing touches on today&apos;s devotional. The
            surest way to never miss one: get it in your inbox each morning — free.
          </p>
          <a className="btn btn-gold" href="/subscribe">
            Subscribe free →
          </a>
        </div>
      </section>
    );
  }

  const goodNews = await getDailyGoodNews(3);

  return (
    <section className="dev-reader share-reader">
      <div className="share-hello">
        ☀️ Someone sent you <strong>Today&apos;s Walk</strong> ·{" "}
        {prettyDate(dev.date)}
      </div>
      <div
        className="dev-issue-frame"
        // Server-rendered, escaped, brand-scoped markup (see renderDevotionalHtml).
        dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(dev, goodNews, "web") }}
      />
      <div className="share-ctabar" role="complementary" aria-label="Subscribe">
        <div className="share-ctabar-text">
          <strong>Want this every morning?</strong> It&apos;s free.
        </div>
        <a className="btn btn-gold share-ctabar-btn" href="/subscribe">
          Subscribe free →
        </a>
      </div>
    </section>
  );
}
