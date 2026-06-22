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

      <div className="cards">
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
              For anyone who wants daily encouragement, prayer, and hope.
            </div>
            <ul className="feat">
              <li>Daily devotional, Mon–Fri at 6:30 AM PT</li>
              <li>One honest prayer every day</li>
              <li>3 uplifting &ldquo;Good News&rdquo; stories every day</li>
              <li>Wednesday &ldquo;Pastor&apos;s Take&rdquo; encouragement</li>
              <li>Sunday &ldquo;Rest &amp; Reflect&rdquo; issue</li>
              <li>Free access to the community</li>
              <li>Optional weekly Scripture reading preview</li>
            </ul>
          </div>
          <Link className="btn btn-ghost" href="/subscribe">
            Start free
          </Link>
        </div>

        {/* PREMIUM */}
        <div className="card premium">
          <div className="cap" />
          <span className="badge">MOST POPULAR</span>
          <div className="body">
            <div className="tier">Premium</div>
            <div className="price">
              {annual ? "$59" : "$5.99"}
              <small>{annual ? "/yr" : "/mo"}</small>
            </div>
            <div className="permo">
              {annual ? "$59/year — about $4.92/mo" : "Billed monthly"}
            </div>
            <div className="perday">
              Just <b>{annual ? "16¢ a day" : "20¢ a day"}</b>
            </div>
            <div className="pitch" style={{ marginTop: 14 }}>
              For readers who want to be personally guided through the Bible in
              one year.
            </div>
            <ul className="feat">
              <li>Everything in Free</li>
              <li>Start the Bible-in-a-Year journey anytime — from your Day 1</li>
              <li>Daily guided Scripture reading with plain-English breakdowns</li>
              <li>&ldquo;What this shows us about God&rdquo; reflection</li>
              <li>Real-life application for modern life</li>
              <li>Daily reflection question + prayer prompt</li>
              <li>Audio devotional for each day</li>
              <li>Saturday &ldquo;Weekend Deep-Dive&rdquo; on the week&apos;s theme</li>
              <li>Monthly downloadable Bible study workbook</li>
              <li>Full searchable archive of past issues</li>
            </ul>
          </div>
          <a className="btn btn-gold" href={site.beehiiv.upgradePremiumUrl}>
            Get Premium
          </a>
        </div>

        {/* PATRON */}
        <div className="card patron">
          <div className="cap" />
          <div className="body">
            <div className="tier">Patron</div>
            <div className="price">
              {annual ? "$199" : "$19.99"}
              <small>{annual ? "/yr" : "/mo"}</small>
            </div>
            <div className="permo">
              {annual ? "$199/year — about $16.58/mo" : "Billed monthly"}
            </div>
            <div className="perday">
              Just <b>{annual ? "55¢ a day" : "66¢ a day"}</b>
            </div>
            <div className="pitch" style={{ marginTop: 14 }}>
              For supporters who want to help keep The Daily Walk free and grow
              the community.
            </div>
            <ul className="feat">
              <li>Everything in Premium</li>
              <li>Help sponsor free access for readers who need encouragement</li>
              <li>Monthly Patron-only devotional letter</li>
              <li>Monthly live prayer night + replay</li>
              <li>Access to the Patron Prayer Wall</li>
              <li>Private Patron room in the community</li>
              <li>Submit questions for Pastor&apos;s Take</li>
              <li>Vote on upcoming studies &amp; themes</li>
              <li>Quarterly mini-study PDF</li>
              <li>Complete printable prayer-card library</li>
              <li>&ldquo;Founding Supporter&rdquo; badge</li>
            </ul>
          </div>
          <a className="btn btn-navy" href={site.beehiiv.upgradePatronUrl}>
            Become a Patron
          </a>
        </div>
      </div>
    </>
  );
}
