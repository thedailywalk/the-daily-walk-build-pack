import type { Metadata } from "next";
import Link from "next/link";
import PricingCards from "@/components/PricingCards";
import { PRICING_ENABLED } from "@/lib/flags";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free — the devotional 3× a week. Become a Founding Member for $5.99/mo and get everything: the daily devotional, the Deeper Walk, and the Spiritual Wellness Guide.",
};

const schedule = [
  ["Devotional (prayer + Good News)", "Mon · Wed · Fri", "5:00 AM ET", [1, 1, 1]],
  ["The devotional every day", "Daily", "5:00 AM ET", [0, 1, 1]],
  ["Wednesday Pastor's Take", "Wednesday", "in the issue", [1, 1, 1]],
  ["Bible-in-a-Year guided reading", "Daily · your Day 1", "your pace", [0, 1, 1]],
  ["The Deeper Walk (premium newsletter)", "Daily", "5:00 AM ET", [0, 1, 1]],
  ["The Spiritual Wellness Guide", "Mon · Wed · Fri", "—", [0, 1, 1]],
  ["Monthly study workbook", "Monthly", "—", [0, 1, 1]],
  ["The entire platform + all its features", "At launch", "locked at $5.99", [0, 1, 1]],
] as const;

const comparison: Array<
  { group: string } | { row: string; tiers: [number, number, number] }
> = [
  { group: "The free devotional · 3× a week" },
  { row: "The devotional (Mon · Wed · Fri)", tiers: [1, 1, 1] },
  { row: "One honest prayer with each issue", tiers: [1, 1, 1] },
  { row: "“Good News” — 3 uplifting stories", tiers: [1, 1, 1] },
  { row: "Wednesday Pastor's Take", tiers: [1, 1, 1] },
  { row: "Free community access", tiers: [1, 1, 1] },
  { group: "Founding Member · everything, one membership" },
  { row: "The devotional every day (not just 3× a week)", tiers: [0, 1, 1] },
  { row: "Full Bible-in-a-Year journey, from your Day 1", tiers: [0, 1, 1] },
  { row: "Daily guided Scripture reading", tiers: [0, 1, 1] },
  { row: "Plain-English breakdown of each passage", tiers: [0, 1, 1] },
  { row: "“What this shows us about God” reflection", tiers: [0, 1, 1] },
  { row: "Real-life application for modern life", tiers: [0, 1, 1] },
  { row: "Daily reflection question + prayer prompt", tiers: [0, 1, 1] },
  { row: "Audio devotional for each day", tiers: [0, 1, 1] },
  { row: "The Deeper Walk discipleship newsletter, every day", tiers: [0, 1, 1] },
  { row: "Deeper Bible teaching + The Bible Thread (points to Jesus)", tiers: [0, 1, 1] },
  { row: "Heart Check + Journal With God (daily formation)", tiers: [0, 1, 1] },
  { row: "Pray the Word + a Walk It Out step to live it", tiers: [0, 1, 1] },
  { row: "A daily Spiritual Wellness Guide grounding practice", tiers: [0, 1, 1] },
  { row: "The full Spiritual Wellness Guide (Mon · Wed · Fri)", tiers: [0, 1, 1] },
  { row: "Live sessions with a Christian therapist + pastors", tiers: [0, 1, 1] },
  { row: "Monthly downloadable workbook + full archive", tiers: [0, 1, 1] },
  { row: "Restart or catch up your plan anytime", tiers: [0, 1, 1] },
  { group: "Support the mission" },
  { row: "Helps fund The Daily Walk", tiers: [0, 1, 1] },
  { row: "Founding Member price locked in for life", tiers: [0, 1, 1] },
  { group: "Founding Partner · pay it forward" },
  { row: "Keeps a licensed Christian counselor free for everyone", tiers: [0, 0, 1] },
  { row: "Sponsors free access for readers who can't pay", tiers: [0, 0, 1] },
  { row: "Pastors & perspectives from hard-to-reach places", tiers: [0, 0, 1] },
  { row: "Live updates on every project — see the change you're making", tiers: [0, 0, 1] },
  { row: "Monthly founder notes — always in the loop on what we build", tiers: [0, 0, 1] },
  { row: "Meets kids where they are, then points them back to the real world", tiers: [0, 0, 1] },
];

const faqs = [
  {
    q: "Is the free version really free forever?",
    a: "Yes. Three mornings a week (Mon · Wed · Fri) you get the devotional, a prayer, three Good News stories, the Wednesday Pastor's Take, and the community — all free, no card required. Founding Members ($5.99/mo) get everything: the devotional every day, the full guided Bible-in-a-Year journey, the Deeper Walk discipleship newsletter, and the Spiritual Wellness Guide.",
  },
  {
    q: "When does my Bible-in-a-Year plan start?",
    a: "On your Day 1 — the day you join Premium. You're never dropped into the middle of someone else's calendar. If you'd rather follow along with the group, you can choose to join the community's current pace instead. Either way, you read Day 1, Day 2, Day 3 in order.",
  },
  {
    q: "What if I fall behind on the reading?",
    a: "No guilt, ever. You can restart your plan back at Day 1 or pick up right where you left off, anytime. The goal is 365 days in Scripture — not 365 days in a row.",
  },
  {
    q: "Do I need to be a Christian to subscribe?",
    a: "Not at all. The Daily Walk is written to be welcoming whether you've followed Jesus for decades, you're just curious, or you're somewhere in between. Start wherever you are.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel in one click. You keep access through the end of your current billing period.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. Full refund within the first 30 days, no questions asked.",
  },
];

function Yes() {
  return (
    <span className="yes" aria-label="Included">
      ✓
    </span>
  );
}
function No() {
  return (
    <span className="no" aria-label="Not included">
      ✕
    </span>
  );
}

export default function PricingPage() {
  if (!PRICING_ENABLED) {
    return <FoundingOffer />;
  }

  return (
    <>
      <div className="topbar" />
      <div className="wrap">
        <h2 className="section" style={{ textAlign: "center", marginTop: 48 }}>
          Pick your plan
        </h2>
        <p className="section-sub" style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 22px" }}>
          The devotional is free three mornings a week. Founding Members get
          everything — every day — for $5.99/mo (or $59/yr). Founding Partners
          give a little more to keep it free for those who can&apos;t.
        </p>

        <PricingCards />

        {/* WHAT FOUNDING MEMBER REALLY GIVES YOU */}
        <h2 className="section">The big things you&apos;re getting</h2>
        <p className="section-sub">
          Founding Member is everything, one membership — here&apos;s what that
          really means.
        </p>
        <div className="price-note">
          For a limited time, as a thank-you for your early support, your price{" "}
          <strong>locks in for life</strong> — even after it goes up at launch.
        </div>
        <div className="price-boxes">
          <div className="hiw-box">
            <div className="hiw-box-k">The daily upgrade</div>
            <h4>The Deeper Walk newsletter</h4>
            <p>
              A guided daily walk that goes further than the free one: deeper
              Bible teaching, The Bible Thread to Jesus, a Heart Check, Journal
              With God, Pray the Word, and a Walk It Out step — real formation,
              every morning.
            </p>
          </div>
          <div className="hiw-box hiw-box-soft">
            <div className="hiw-box-k">Every day</div>
            <h4>The Spiritual Wellness Guide</h4>
            <p>
              A faith-based grounding practice inside the Deeper Walk to steady
              your heart — plus the fuller Spiritual Wellness Guide with practical
              tools for the relationships that matter most.
            </p>
          </div>
          <div className="hiw-box hiw-box-coming">
            <div className="hiw-box-k">Coming in the next couple months</div>
            <h4>The full platform — locked in for life</h4>
            <p>
              Your guided Bible-in-a-Year journey and dashboard, plus{" "}
              <strong>live group sessions with some of the best Christian
              therapists</strong> and <strong>live streams with pastors from all
              over the world</strong>.
            </p>
          </div>
        </div>

        {/* WEEKLY SCHEDULE */}
        <h2 className="section">What hits your inbox each week</h2>
        <p className="section-sub">A quick scan of what arrives, by tier and day.</p>
        <div className="tbl-card scroll">
          <table>
            <thead>
              <tr>
                <th>What you get</th>
                <th>Day</th>
                <th>When</th>
                <th className="c">Free</th>
                <th className="c">Founding</th>
                <th className="c">Partner</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(([what, day, time, tiers]) => (
                <tr key={what}>
                  <td>{what}</td>
                  <td>{day}</td>
                  <td>{time}</td>
                  {tiers.map((t, i) => (
                    <td className="c" key={i}>
                      {t ? <Yes /> : <No />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted-note">
          Everyone gets the free devotional three mornings a week. Founding
          Members get it every day plus the full guided Bible-in-a-Year journey —
          starting on <em>your</em> Day 1 — the Deeper Walk, and the Spiritual
          Wellness Guide, all in one $5.99 membership.
        </p>

        {/* FOUNDING PARTNER */}
        <h2 className="section" id="founding-partner" style={{ scrollMarginTop: 90 }}>
          About Founding Partner
        </h2>
        <div className="explain partner-explain">
          <div className="partner-eyebrow">Founding Partner · pay it forward</div>
          <h3>Give a little more, and it goes a long way</h3>
          <p>
            Everything in Founding Member is already yours. This tier is for
            anyone in a season to give a bit extra — not for more features, but to
            keep The Daily Walk <strong>free and open for the people who
            can&apos;t pay at all</strong>, to keep a licensed Christian counselor
            within reach of everyone, and to bring you pastors and perspectives
            from cultures and places most of us will never reach.
          </p>
          <p>
            <strong>It reaches the next generation right where they are.</strong>{" "}
            We know most kids live on their screens — so that&apos;s where we meet
            them first, with the hope of Jesus. But we don&apos;t want to leave
            them there. The goal is to point them back to the real world: to get
            outside, to do good, to love the people in front of them — and to show
            them there&apos;s a fuller, better way to live than the one a screen
            keeps selling them.
          </p>
          <p>
            <strong>And you&apos;ll see exactly where your giving goes — and the
            good it does.</strong> You&apos;ll get live updates on every single
            project, so you don&apos;t just see where your money went, you see the
            change it&apos;s making. Come visit some of these places one day if you
            ever can, or simply rest in knowing you helped change a life — all of
            it in God&apos;s name. Your gift could be the very one that gives
            someone hope, helps them meet God, and leads them home.
          </p>
          <p className="punch">
            We&apos;re building this right now, in real time. Every partner moves
            it forward faster — and further out into the world.
          </p>
        </div>

        {/* FULL COMPARISON — collapsible so it doesn't take up space */}
        <details className="cmp-collapse">
          <summary>
            <span className="cmp-summary-title">The full comparison</span>
            <span className="cmp-summary-hint">tap to expand ▾</span>
          </summary>
          <div className="tbl-card scroll" style={{ marginTop: 16 }}>
          <table>
            <thead>
              <tr>
                <th>What you get</th>
                <th className="c">Free</th>
                <th className="c">Founding</th>
                <th className="c">Partner</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((item, idx) =>
                "group" in item ? (
                  <tr className="grp" key={`g-${idx}`}>
                    <td colSpan={4}>{item.group}</td>
                  </tr>
                ) : (
                  <tr key={item.row}>
                    <td>{item.row}</td>
                    {item.tiers.map((t, i) => (
                      <td className="c" key={i}>
                        {t ? <Yes /> : <No />}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
          </div>
        </details>

        {/* FAQ — click to open */}
        <h2 className="section">Frequently asked questions</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary className="q">{f.q}</summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </div>

        <hr className="div" />
      </div>
    </>
  );
}

/* ---- Founding-member newsletter offer (shown while the platform is in build) ---- */

function FoundingOffer() {
  const premiumUrl = site.beehiiv.upgradePremiumUrl;
  const premiumReady = !!premiumUrl && premiumUrl !== "/pricing";

  const navy = "#1F3A5F";
  const gold = "#C9A24B";
  const ink = "#3c4350";

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e7ddc7",
    borderRadius: 18,
    padding: "28px 26px",
    boxShadow: "0 18px 40px -28px rgba(31,58,95,0.45)",
  };
  const check = (t: string, strong = false) => (
    <li key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "9px 0", fontSize: 15, color: strong ? navy : ink }}>
      <span style={{ color: gold, fontWeight: 800 }}>✓</span>
      <span style={strong ? { fontWeight: 700 } : undefined}>{t}</span>
    </li>
  );

  return (
    <>
      <header className="hero sunrise portal-hero">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">Become a Founding Member</div>
            <h1>Start free. Go deeper for $5.99.</h1>
            <p className="lead">
              The daily walk is free, forever. <strong>Premium</strong> is for the reader who wants to go deeper —
              not just read a devotional, but learn how to live it: Scripture, prayer, real discipleship, and
              real-world reflection that keep you close to God and steady in your mind. Founding Members lock in{" "}
              <strong>$5.99/mo for life</strong>, get <strong>one full year of The Spiritual Wellness Guide free</strong>,
              and are grandfathered into the whole platform we&apos;re building (guided Bible-in-a-Year, audio,
              dashboard &amp; community) the day it opens. 🙏
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap" style={{ maxWidth: 940 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
            {/* FREE */}
            <div style={card}>
              <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#8a8270" }}>
                The Daily Walk
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 30, color: navy, margin: "4px 0 2px" }}>Free</div>
              <div style={{ color: "#8a8270", fontSize: 14, marginBottom: 14 }}>$0 — forever, no card</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
                {check("The devotional 3× a week (Mon · Wed · Fri)")}
                {check("One honest prayer with each issue")}
                {check("3 uplifting Good News stories")}
                {check("Free community access")}
              </ul>
              <Link href="/subscribe" className="btn btn-ghost" style={{ width: "100%", textAlign: "center" }}>
                Join free →
              </Link>
            </div>

            {/* PREMIUM — FOUNDING */}
            <div style={{ ...card, border: `2px solid ${gold}`, position: "relative" }}>
              <span style={{ position: "absolute", top: -13, left: 24, background: gold, color: navy, fontFamily: "var(--sans)", fontWeight: 800, fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", padding: "5px 12px", borderRadius: 20 }}>
                Founding Member · locked for life
              </span>
              <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#B8902E", marginTop: 6 }}>
                Premium · Discipleship Newsletter
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 30, color: navy, margin: "4px 0 2px" }}>
                $5.99<span style={{ fontSize: 16, color: "#8a8270" }}> /mo</span>
              </div>
              <div style={{ color: "#8a8270", fontSize: 14, marginBottom: 14 }}>or $59/year (2 months free)</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px" }}>
                {check("Everything in Free, plus —", true)}
                {check("The Deeper Walk — deeper Bible teaching, every day")}
                {check("The Bible Thread — how each reading points to Jesus")}
                {check("Heart Check + Journal With God — real daily formation")}
                {check("Pray the Word + a Walk It Out step to live it")}
                {check("A daily Spiritual Wellness Guide grounding practice")}
                {check("Inside the Circle — live sessions with a licensed Christian therapist & guest pastors")}
                {check("BONUS: The full Spiritual Wellness Guide, 3×/week — free for a full year", true)}
                {check("Founding rate locked at $5.99 for life", true)}
                {check("Grandfathered into the full platform when it launches", true)}
                {check("Your support helps someone find Jesus — it funds free access for those who can't pay", true)}
              </ul>
              {premiumReady ? (
                <a href={premiumUrl} className="btn btn-gold" style={{ width: "100%", textAlign: "center" }}>
                  Become a Founding Member →
                </a>
              ) : (
                <>
                  <Link href="/subscribe" className="btn btn-gold" style={{ width: "100%", textAlign: "center" }}>
                    Join free — be first in line →
                  </Link>
                  <p style={{ textAlign: "center", color: "#8a8270", fontSize: 12.5, margin: "10px 0 0" }}>
                    Founding membership opens within days — free subscribers get the invite first.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Platform coming soon */}
          <div style={{ marginTop: 30, background: navy, color: "#EDE6D4", borderRadius: 16, padding: "26px 28px" }}>
            <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#E3C074" }}>
              The platform is coming
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 26, color: "#fff", margin: "6px 0 10px" }}>
              You&apos;re getting in before the doors open.
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, maxWidth: 640, margin: "0 0 14px", color: "#cfd8e4" }}>
              You&apos;re not just subscribing — you&apos;re helping build it. Your $5.99 funds the mission of helping
              people find and follow Jesus, and carries it to those who need it. Founding Members are grandfathered
              into the whole platform at the same price, even after it goes up:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {[
                "Your guided Bible-in-a-Year journey, from your Day 1",
                "Daily audio devotionals",
                "Live sessions with a Christian therapist + pastors you can join",
                "A personal dashboard — streaks, milestones, your Walk Score",
                "A real community: prayer wall + encouragement wall",
              ].map((t) => (
                <div key={t} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 12, padding: "12px 14px", fontSize: 14, color: "#EDE6D4" }}>
                  ✦ {t}
                </div>
              ))}
            </div>
          </div>

          <p style={{ textAlign: "center", color: "#8a8270", fontSize: 13.5, margin: "22px 0 0" }}>
            Cancel anytime, one click. Questions? <a href={`mailto:${site.replyTo}`}>{site.replyTo}</a>
          </p>
        </div>
      </section>
    </>
  );
}
