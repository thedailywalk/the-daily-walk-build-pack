"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Samples previewer — a pricing-style tab switcher between the three
 * newsletters, each shown as a real rendered email in a framed "inbox" card.
 * The rendered HTML for each is generated server-side and passed in.
 */
type Key = "free" | "premium" | "wellness";

const upgradeHref =
  site.beehiiv.upgradePremiumUrl && site.beehiiv.upgradePremiumUrl !== "/pricing"
    ? site.beehiiv.upgradePremiumUrl
    : "/pricing";

const TABS: {
  key: Key;
  name: string;
  cadence: string;
  blurb: string;
  note?: string;
  cta: { label: string; href: string };
}[] = [
  {
    key: "free",
    name: "Free Devotional",
    cadence: "3 mornings a week · Mon · Wed · Fri · Free forever",
    blurb:
      "A short, honest devotional with a simple Scripture breakdown, a real prayer, and encouragement to start your day with God — simple and welcoming, wherever you are on the journey.",
    cta: { label: "Start free →", href: "/subscribe" },
  },
  {
    key: "premium",
    name: "The Deeper Walk",
    cadence: "Every morning · 7 days a week · Founding Members",
    blurb:
      "The Deeper Walk goes further — deeper Bible teaching, The Bible Thread (how it points to Jesus), a Heart Check, Journal With God, prayer, and one real step to live it. A daily discipleship rhythm, not just more emails.",
    cta: { label: "Become a Founding Member →", href: upgradeHref },
  },
  {
    key: "wellness",
    name: "Spiritual Wellness Guide",
    cadence: "3 mornings a week · Mon · Wed · Fri · Included with Founding Membership",
    blurb:
      "Faith paired with grounded, practical tools — emotional steadiness, prayer, and a little calm for real life.",
    note: "Included with your Founding membership — not a separate signup.",
    cta: { label: "Become a Founding Member →", href: upgradeHref },
  },
];

export default function SamplesTabs({
  free,
  premium,
  wellness,
}: {
  free: string;
  premium: string;
  wellness: string;
}) {
  const [tab, setTab] = useState<Key>("free");
  const html = tab === "free" ? free : tab === "premium" ? premium : wellness;
  const meta = TABS.find((t) => t.key === tab)!;
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Grow the preview to the full height of the email so readers scroll the
  // PAGE (seeing much more of the issue at once) instead of a small inner bar.
  function fitFrame() {
    const f = frameRef.current;
    const doc = f?.contentWindow?.document;
    if (!f || !doc) return;
    const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
    if (h) f.style.height = `${h + 8}px`;
  }

  return (
    <div className="sm">
      <div className="sm-tabs" role="tablist" aria-label="Choose a newsletter to preview">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className="sm-tab"
            onClick={() => setTab(t.key)}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="sm-body">
        <div className="sm-info">
          <div className="sm-cadence">{meta.cadence}</div>
          <h3 className="sm-name">{meta.name}</h3>
          <p className="sm-blurb">{meta.blurb}</p>
          {meta.note && <p className="sm-note">✦ {meta.note}</p>}
          <Link href={meta.cta.href} className="btn btn-gold sm-cta">
            {meta.cta.label}
          </Link>
        </div>

        <div className="sm-preview">
          <div className="sm-preview-bar">
            <span className="sm-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            A sample issue — {meta.name}
          </div>
          <iframe
            ref={frameRef}
            key={tab}
            className="sm-frame"
            srcDoc={html}
            onLoad={fitFrame}
            scrolling="no"
            title={`${meta.name} sample issue`}
          />
        </div>
      </div>
    </div>
  );
}
