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

      <div className="cards cards-three">
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
              <li>An uplifting &ldquo;Good News&rdquo; story</li>
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
          <span className="badge">MOST POPULAR</span>
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
            <div className="card-quip">
              ☕ For less than one Starbucks, a whole month of wisdom — delivered
              straight to your inbox.
            </div>
            <div className="pitch" style={{ marginTop: 14 }}>
              The whole platform, for readers who want to walk with God every day.
            </div>
            <ul className="feat">
              <li>Everything in Free</li>
              <li>
                The <b>Deeper Walk</b> premium devotional — <b>every day</b> (not
                just 3× a week)
              </li>
              <li>
                Deeper <b>Bible teaching</b> + <b>The Bible Thread</b> (how each
                reading points to Jesus)
              </li>
              <li>
                <b>Heart Check</b>, <b>Journal With God</b> &amp;{" "}
                <b>Pray the Word</b> — real daily spiritual formation
              </li>
              <li>
                A daily <b>Spiritual Wellness Guide</b> practice + a{" "}
                <b>Walk It Out</b> step to live it
              </li>
              <li>Guided Scripture · monthly workbook · full archive</li>
              <li>
                <b>Lifetime access to the whole platform as it launches</b>
                <span className="feat-sub">
                  Your guided Bible-in-a-Year journey and dashboard, plus live
                  group sessions with some of the best Christian therapists and
                  live streams with pastors from all over the world.
                </span>
              </li>
              <li>Founding Member price locked in for life</li>
            </ul>
          </div>
          <a className="btn btn-gold" href={site.beehiiv.upgradePremiumUrl}>
            Become a Founding Member
          </a>
        </div>

        {/* FOUNDING PARTNER — pay-it-forward supporter tier */}
        <div className="card patron">
          <div className="cap" />
          <span className="badge badge-partner">PAY IT FORWARD</span>
          <div className="body">
            <div className="tier">Founding Partner</div>
            <div className="price">
              {annual ? "$199" : "$19.99"}
              <small>{annual ? "/yr" : "/mo"}</small>
            </div>
            <div className="permo">
              {annual ? "$199/year — about $16.58/mo" : "Billed monthly · or $199/yr"}
            </div>
            <div className="perday">
              For those who can <b>give a little more</b>
            </div>
            <div className="pitch" style={{ marginTop: 14 }}>
              Everything in Founding Member — plus you help keep it free and open
              for the people who can&apos;t pay at all.
            </div>
            <ul className="feat">
              <li>Everything in <b>Founding Member</b></li>
              <li>Keeps a licensed <b>Christian counselor</b> within reach of everyone</li>
              <li>Keeps The Daily Walk <b>free</b> for readers who can&apos;t pay</li>
              <li>Brings you <b>pastors &amp; perspectives</b> from across the world</li>
              <li><b>Live updates on every project</b> — see the lives your giving changes</li>
              <li><b>Monthly founder notes</b> on everything we&apos;re building — you&apos;re always in the loop</li>
            </ul>
          </div>
          <a className="btn btn-ghost" href={site.beehiiv.upgradePatronUrl}>
            Become a Founding Partner
          </a>
        </div>
      </div>
    </>
  );
}
