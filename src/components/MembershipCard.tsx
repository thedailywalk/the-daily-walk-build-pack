"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * The membership pricing card — a two-panel layout (brand gradient + details)
 * with a tier switcher (Founding Member / Founding Partner / Free) and a
 * monthly / annual toggle, modeled on the beehiiv upgrade card in our palette.
 * Always opens on the paid Founding Member tier so prices show immediately.
 * Styles live in globals.css under the `.mc-` prefix.
 */

type TierKey = "member" | "partner" | "free";
type Group = { h: string; items: string[] };

const premiumUrl = site.beehiiv.upgradePremiumUrl;
const patronUrl = site.beehiiv.upgradePatronUrl;
const premiumReady = !!premiumUrl && premiumUrl !== "/pricing";
const patronReady = !!patronUrl && patronUrl !== "/pricing";

const TIERS: Record<
  TierKey,
  {
    name: string;
    sub: string;
    paid: boolean;
    ready?: boolean;
    url?: string;
    cta: string;
    monthly?: string;
    annualPerMo?: string;
    annualTotal?: string;
    savePct?: string;
    groups: Group[];
  }
> = {
  member: {
    name: "Founding Member",
    sub: "Everything, one membership",
    paid: true,
    ready: premiumReady,
    url: premiumUrl,
    cta: "Become a Founding Member",
    monthly: "$5.99",
    annualPerMo: "$4.92",
    annualTotal: "$59",
    savePct: "18%",
    groups: [
      {
        h: "Walk with God daily",
        items: [
          "The daily devotional, every morning",
          "The Deeper Walk Bible teaching",
          "The Bible Thread — it points to Jesus",
          "Pray the Word each day",
        ],
      },
      {
        h: "Grow deeper",
        items: [
          "Heart Check & Journal With God",
          "A Spiritual Wellness Guide practice",
          "A Walk It Out step to live it",
          "The Weekend Study (Saturdays)",
        ],
      },
      {
        h: "Stay on the path",
        items: [
          "Guided Bible-in-a-Year, from your Day 1",
          "Restart or catch up anytime",
          "The full devotional archive",
        ],
      },
      {
        h: "Founding perks",
        items: [
          "Founding price locked in for life",
          "Monthly downloadable workbook",
          "Free community access",
        ],
      },
    ],
  },
  partner: {
    name: "Founding Partner",
    sub: "Everything — plus you pay it forward",
    paid: true,
    ready: patronReady,
    url: patronUrl,
    cta: "Become a Founding Partner",
    monthly: "$19.99",
    annualPerMo: "$16.58",
    annualTotal: "$199",
    savePct: "17%",
    groups: [
      {
        h: "Everything in Founding Member",
        items: [
          "Every devotional + the full Deeper Walk",
          "Bible-in-a-Year from your Day 1",
          "Wellness Guide, workbook & full archive",
          "Founding price locked in for life",
        ],
      },
      {
        h: "Keep it free for others",
        items: [
          "Sponsors free access for readers who can't pay",
          "Keeps a Christian counselor within reach of all",
          "Pastors & perspectives from across the world",
        ],
      },
      {
        h: "See your impact",
        items: [
          "Live updates on every project",
          "Monthly founder notes",
          "Always in the loop on what we build",
        ],
      },
      {
        h: "Founding perks",
        items: ["Everything above, for life", "Free community access", "Our deepest thanks 🤍"],
      },
    ],
  },
  free: {
    name: "Free",
    sub: "The devotional, three mornings a week",
    paid: false,
    url: "/subscribe",
    cta: "Start free",
    groups: [
      {
        h: "Every Mon · Wed · Fri",
        items: [
          "The devotional 3× a week",
          "One honest prayer with each issue",
          "An uplifting Good News story",
        ],
      },
      {
        h: "Always included",
        items: ["The Wednesday Pastor's Take", "Free community access", "Save & share verse cards"],
      },
    ],
  },
};

const TAB_ORDER: TierKey[] = ["member", "partner", "free"];

export default function MembershipCard() {
  const [tier, setTier] = useState<TierKey>("member");
  const [annual, setAnnual] = useState(false);
  const t = TIERS[tier];

  // Price display
  let amt: string, per: string, bill: string, plabel: string;
  if (!t.paid) {
    amt = "$0";
    per = "forever";
    bill = "No card required — free 3× a week";
    plabel = "Free forever · no card required";
  } else if (annual) {
    amt = t.annualPerMo!;
    per = "/ month";
    bill = `${t.annualTotal} billed once a year · save ${t.savePct}`;
    plabel = "One membership · everything included";
  } else {
    amt = t.monthly!;
    per = "/ month";
    bill = "Billed monthly · cancel anytime";
    plabel = "One membership · everything included";
  }

  // CTA — link to beehiiv checkout when configured, else invite to join free first.
  const ctaReady = !t.paid || t.ready;
  const ctaText = t.paid ? (t.ready ? t.cta : "Join free — be first in line →") : t.cta;
  const ctaHref = t.paid ? (t.ready ? t.url! : "/subscribe") : "/subscribe";

  return (
    <div className="mc-card">
      {/* LEFT: brand gradient panel */}
      <aside className="mc-panel">
        <span className="mc-specks" aria-hidden="true" />
        <div className="mc-top">
          <span className="mc-mark">
            <span className="mc-dot">🕊️</span>
            <span className="mc-wm">The Daily Walk</span>
          </span>
        </div>
        <div className="mc-bottom">
          <div className="mc-rule" />
          <p className="mc-tag">Walking with God in real life.</p>
          <p className="mc-verse">
            <b>&ldquo;Your word is a lamp for my feet, a light on my path.&rdquo;</b>
          </p>
          <p className="mc-cite">— Psalm 119:105</p>
          <p className="mc-trust">
            <span className="mc-pip" /> Join the readers building this from day one.
          </p>
        </div>
      </aside>

      {/* RIGHT: details */}
      <section className="mc-detail">
        <div className="mc-tabs" role="tablist" aria-label="Membership tier">
          {TAB_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tier === k}
              className="mc-tab"
              onClick={() => setTier(k)}
            >
              {TIERS[k].name}
            </button>
          ))}
        </div>

        <div className="mc-head">
          <span className="mc-hex" aria-hidden="true">
            ✦
          </span>
          <div>
            <h2 className="mc-h2">{t.name}</h2>
            <p className="mc-subsm">{t.sub}</p>
          </div>
        </div>

        {t.paid && (
          <div className="mc-toggle" role="tablist" aria-label="Billing period">
            <button
              type="button"
              role="tab"
              aria-selected={!annual}
              className="mc-tgl"
              onClick={() => setAnnual(false)}
            >
              Pay monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={annual}
              className="mc-tgl"
              onClick={() => setAnnual(true)}
            >
              Pay annually <span className="mc-save">Save {t.savePct}</span>
            </button>
          </div>
        )}

        <div className="mc-pricebox">
          <span className="mc-plabel">
            <span className="mc-chk">✓</span> {plabel}
          </span>
          <div className="mc-price">
            <span className="mc-amt">{amt}</span>
            <span className="mc-per">{per}</span>
            <span className="mc-bill">{bill}</span>
          </div>
        </div>

        <div className="mc-groups">
          {t.groups.map((g) => (
            <div className="mc-grp" key={g.h}>
              <h3>{g.h}</h3>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mc-foot">
          <a className="mc-cta" href={ctaHref}>
            {ctaText}
          </a>
          {t.paid && !ctaReady && (
            <p className="mc-note">
              Founding membership opens within days — free subscribers get the invite first.
            </p>
          )}
          {tier === "member" && (
            <p className="mc-alt">
              Just want the basics?{" "}
              <button type="button" className="mc-link" onClick={() => setTier("free")}>
                The Daily Walk is free 3× a week →
              </button>
            </p>
          )}
          {tier === "partner" && (
            <p className="mc-alt">
              Prefer the standard membership?{" "}
              <button type="button" className="mc-link" onClick={() => setTier("member")}>
                Founding Member is $5.99 →
              </button>
            </p>
          )}
          {tier === "free" && (
            <p className="mc-alt">
              Want everything, every day?{" "}
              <button type="button" className="mc-link" onClick={() => setTier("member")}>
                Become a Founding Member — $5.99 →
              </button>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
