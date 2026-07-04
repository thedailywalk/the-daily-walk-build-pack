"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Interactive "How it works" — the morning-flow (habit loop) up top, then a
 * click-to-switch explainer for each tier: how the Free works, how the Founding
 * Member works, how the Founding Partner works. Each panel shows clean visual
 * "preview" boxes; the Founding Member panel expands a full what's-included list.
 */

type TierKey = "free" | "member" | "partner";

const TABS: { key: TierKey; name: string; price: string }[] = [
  { key: "free", name: "Free", price: "$0" },
  { key: "member", name: "Founding Member", price: "$5.99/mo" },
  { key: "partner", name: "Founding Partner", price: "$19.99/mo" },
];

const INCLUDED = [
  "The daily devotional — every day, not just 3× a week",
  "The Deeper Walk — a daily 5-minute premium devotional",
  "The Spiritual Wellness Guide — 3× a week (Mon · Wed · Fri)",
  "The Saturday Weekend Study — a deeper weekend deep-dive",
  "The guided Bible-in-a-Year journey, from your own Day 1",
  "Daily guided Scripture — plain-English breakdown + audio",
  "Monthly downloadable workbook + the full archive",
  "Progress, streaks, notes & favorite verses",
];

export default function HowItWorks() {
  const [tab, setTab] = useState<TierKey>("member");
  const [openList, setOpenList] = useState(false);

  return (
    <div className="hiw">
      <div className="hiw-tabs hiw-tabs-3" role="tablist" aria-label="How each option works">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={`hiw-tab${tab === t.key ? " on" : ""}`}
            onClick={() => setTab(t.key)}
          >
            <span className="hiw-tab-k">How the {t.name} works</span>
            <span className="hiw-tab-t">
              {t.name} <span className="hiw-tab-price">· {t.price}</span>
            </span>
          </button>
        ))}
      </div>

      {tab === "free" && (
        <div className="hiw-panel" key="free">
          <div className="hiw-panel-main">
            <div className="hiw-panel-tag">Mon · Wed · Fri · Free</div>
            <h3>How the Free walk works</h3>
            <p className="hiw-panel-pitch">
              The simplest way to start — no card, no pressure. Three mornings a
              week, a short devotional shows up. You read it, you carry it, and
              little by little it becomes part of your day.
            </p>
            <Link href="/subscribe" className="btn btn-gold hiw-cta">
              Start free →
            </Link>
            <button
              type="button"
              className="hiw-xlink"
              onClick={() => setTab("member")}
            >
              Want to go deeper? See how Founding Member works →
            </button>
          </div>
          <div className="hiw-panel-feats">
            <div className="hiw-box">
              <div className="hiw-box-k">In your inbox</div>
              <h4>The Daily Walk newsletter</h4>
              <p>
                A 2-minute devotional, one honest prayer, three uplifting Good
                News stories, and the Wednesday Pastor&apos;s Take — three
                mornings a week. Encouragement that meets you in real life.
              </p>
            </div>
            <div className="hiw-box hiw-box-soft">
              <div className="hiw-box-k">What you carry</div>
              <h4>Inspiration &amp; hope, every week</h4>
              <p>
                Real encouragement to keep you steady and moving — until
                you&apos;re ready to take the next step in your journey and dive
                deeper.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === "member" && (
        <div className="hiw-panel" key="member">
          <div className="hiw-panel-main">
            <div className="hiw-panel-tag">Your Day 1 · Founding Member</div>
            <h3>How the Founding Member works</h3>
            <p className="hiw-panel-pitch">
              Everything, one membership. You get the free daily newsletter{" "}
              <em>every</em> day — plus the deeper newsletter, the wellness guide,
              and lifetime access to the whole platform as it launches.
            </p>
            <div className="hiw-note">
              For a limited time, as a thank-you for your early support, your
              price <strong>locks in for life</strong> — even after it goes up at
              launch.
            </div>
            <Link href="/pricing" className="btn btn-gold hiw-cta">
              Become a Founding Member →
            </Link>
            <Link href="/pricing" className="hiw-xlink hiw-xlink-a">
              See the full side-by-side breakdown →
            </Link>
          </div>
          <div className="hiw-panel-feats">
            <div className="hiw-box">
              <div className="hiw-box-k">The daily upgrade</div>
              <h4>The Deeper Walk newsletter</h4>
              <p>
                A daily 5-minute devotional that goes further than the free one:
                fuller context, a key word unpacked, a reflective pause as you
                read, and a real next step to live it out.
              </p>
            </div>
            <div className="hiw-box hiw-box-soft">
              <div className="hiw-box-k">3× a week</div>
              <h4>The Spiritual Wellness Guide</h4>
              <p>
                Practical, real-life tools for the relationships that matter
                most — as a parent, a child, a spouse, or a friend — plus the
                Saturday Weekend Study deep-dive.
              </p>
            </div>
            <div className="hiw-box hiw-box-coming">
              <div className="hiw-box-k">Coming in the next couple months</div>
              <h4>The full platform — locked in for life</h4>
              <p>
                Your guided Bible-in-a-Year journey and dashboard, plus{" "}
                <strong>live group sessions</strong> with some of the best
                Christian therapists and <strong>live streams</strong> with
                pastors from all over the world.
              </p>
            </div>
            <button
              type="button"
              className="hiw-more"
              aria-expanded={openList}
              onClick={() => setOpenList((v) => !v)}
            >
              {openList ? "Hide everything included ▲" : "See everything included ▾"}
            </button>
            {openList && (
              <ul className="hiw-included">
                {INCLUDED.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {tab === "partner" && (
        <div className="hiw-panel" key="partner">
          <div className="hiw-panel-main">
            <div className="hiw-panel-tag">Pay it forward · Founding Partner</div>
            <h3>How the Founding Partner works</h3>
            <p className="hiw-panel-pitch">
              Everything in Founding Member is already yours. This is for anyone
              in a season to give a little more — not for extra features, but to
              keep The Daily Walk free and open for the people who can&apos;t pay
              at all.
            </p>
            <Link href="/pricing" className="btn btn-gold hiw-cta">
              Become a Founding Partner →
            </Link>
            <Link href="/mission" className="hiw-xlink hiw-xlink-a">
              See where it all goes →
            </Link>
          </div>
          <div className="hiw-panel-feats">
            <div className="hiw-box">
              <div className="hiw-box-k">Your giving keeps it free</div>
              <h4>Open to everyone</h4>
              <p>
                It keeps a licensed Christian counselor within reach of everyone,
                sponsors free access for readers who can&apos;t pay, and funds
                pastors and perspectives from hard-to-reach places.
              </p>
            </div>
            <div className="hiw-box hiw-box-soft">
              <div className="hiw-box-k">Always in the loop</div>
              <h4>See the change you make</h4>
              <p>
                Live updates on every project and monthly founder notes — so you
                see exactly where your giving goes and the lives it changes. Your
                gift could be the very one that leads someone home.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
