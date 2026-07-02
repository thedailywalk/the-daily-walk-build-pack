"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <div className="toggle">
        <button
          type="button"
          className={`lbl${annual ? "" : " on"}`}
          aria-pressed={!annual}
          onClick={() => setAnnual(false)}
        >
          Monthly
        </button>
        <button
          type="button"
          className={`switch${annual ? " annual" : ""}`}
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
          onClick={() => setAnnual((v) => !v)}
        >
          <span className="knob" />
        </button>
        <button
          type="button"
          className={`lbl${annual ? " on" : ""}`}
          aria-pressed={annual}
          onClick={() => setAnnual(true)}
        >
          Annual <span className="save">save ~17%</span>
        </button>
      </div>

      <div className="cards cards-two">
        {/* FREE */}
        <div className="card free">
          <div className="cap" />
          <div className="body">
            <div className="tier">Free</div>
            <div className="price">$0</div>
            <div className="permo">No card required.</div>
            <div className="perday">
              Always free — <b>0¢ a day</b>
            </div>
            <div className="pitch" style={{ marginTop: 14 }}>
              Encouragement three mornings a week, for anyone who wants it.
            </div>
            <ul className="feat">
              <li>The devotional 3× a week — Mon · Wed · Fri</li>
              <li>One honest prayer with each issue</li>
              <li>3 uplifting &ldquo;Good News&rdquo; stories</li>
              <li>Wednesday &ldquo;Pastor&apos;s Take&rdquo; encouragement</li>
              <li>Free access to the community</li>
            </ul>
          </div>
          <Link className="btn btn-ghost" href="/subscribe">
            Start free
          </Link>
        </div>

        {/* FOUNDING MEMBER — the one paid tier: everything */}
        <div className="card premium">
          <div className="cap" />
          <span className="badge">FOUNDING MEMBER</span>
          <div className="body">
            <div className="tier">Founding Member</div>
            <div className="price">
              {annual ? "$59" : "$5.99"}
              <small>{annual ? "/yr" : "/mo"}</small>
            </div>
            <div className="permo">
              {annual ? "$59/year — about $4.92/mo" : "Billed monthly · or $59/yr"}
            </div>
            <div className="perday">
              Just <b>{annual ? "16¢ a day" : "20¢ a day"}</b> — everything, one membership
            </div>
            <div className="pitch" style={{ marginTop: 14 }}>
              The whole platform, for readers who want to walk with God every day.
            </div>
            <ul className="feat">
              <li>Everything in Free</li>
              <li>The devotional <b>every day</b> — not just 3× a week</li>
              <li>The guided <b>Bible-in-a-Year</b> journey, from your own Day 1</li>
              <li>The <b>Deeper Walk</b> premium discipleship newsletter</li>
              <li>The full <b>Spiritual Wellness Guide</b> (Mon · Wed · Fri)</li>
              <li>Daily guided Scripture with plain-English breakdowns + audio</li>
              <li>Saturday &ldquo;Weekend Study&rdquo; deep-dive</li>
              <li>Progress, streaks, notes &amp; favorite verses</li>
              <li>Monthly downloadable workbook + full archive</li>
              <li>Founding Member price locked in for life</li>
            </ul>
          </div>
          <a className="btn btn-gold" href={site.beehiiv.upgradePremiumUrl}>
            Become a Founding Member
          </a>
        </div>
      </div>
    </>
  );
}
