import type { Metadata } from "next";
import { getLiveDevotional, prettyDate } from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";

export const metadata: Metadata = {
  title: "Today's Devotional",
  description:
    "A daily guide for walking with God in real life — today's devotional from The Daily Walk.",
};

// Re-render through the day so the right date's issue goes live automatically.
export const revalidate = 600;

export default async function DevotionalPage() {
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

  return (
    <section className="dev-reader">
      <div
        className="dev-issue-frame"
        // Server-rendered, escaped, brand-scoped markup (see renderDevotionalHtml).
        dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(dev) }}
      />
      <p className="dev-reader-note">
        Walking with God in real life · {prettyDate(dev.date)}
      </p>
    </section>
  );
}
