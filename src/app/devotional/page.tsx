import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getLiveDevotional, prettyDate } from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import { getDailyGoodNews } from "@/lib/goodNews";
import { getUser, supabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Today's Devotional",
  description:
    "A daily guide for walking with God in real life — today's devotional from The Daily Walk.",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function DevotionalPage() {
  // Today's devotional is for members/subscribers now — read it in your inbox,
  // or sign in to read it on the site. Signed-out visitors are sent to log in.
  if (supabaseConfigured) {
    const user = await getUser();
    if (!user) redirect("/login?next=/devotional");
  }

  const dev = await getLiveDevotional();

  if (!dev) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
          <div className="sec-tag">Daily Devotional</div>
          <h1 style={{ color: "var(--navy)" }}>Today&apos;s devotional is on its way</h1>
          <p className="sub">
            We&apos;re preparing today&apos;s reading. Check back shortly — or get it
            in your inbox each morning by subscribing.
          </p>
          <a className="btn btn-gold" href="/subscribe">
            Get it by email →
          </a>
        </div>
      </section>
    );
  }

  const goodNews = await getDailyGoodNews(3);

  return (
    <section className="dev-reader">
      <div
        className="dev-issue-frame"
        // Server-rendered, escaped, brand-scoped markup (see renderDevotionalHtml).
        dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(dev, goodNews) }}
      />
      <p className="dev-reader-note">
        Walking with God in real life · {prettyDate(dev.date)}
      </p>
    </section>
  );
}
