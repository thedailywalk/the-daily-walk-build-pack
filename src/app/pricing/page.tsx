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
  ["Devotional (prayer + Good News)", "Mon · Wed · Fri", "6:30 AM", [1, 1, 1]],
  ["The devotional every day", "Daily", "6:30 AM", [0, 1, 1]],
  ["Wednesday Pastor's Take", "Wednesday", "in the issue", [1, 1, 1]],
  ["Bible-in-a-Year guided reading", "Daily · your Day 1", "6:30 AM", [0, 1, 1]],
  ["Audio devotional", "Daily", "6:30 AM", [0, 1, 1]],
  ["The Deeper Walk (premium newsletter)", "Daily", "6:30 AM", [0, 1, 1]],
  ["Reflective “pause & reflect” moments", "Daily", "in Deeper Walk", [0, 1, 1]],
  ["Weekend Study deep-dive", "Saturday", "8:00 AM", [0, 1, 1]],
  ["The Spiritual Wellness Guide", "Mon · Wed · Fri", "—", [0, 1, 1]],
  ["Monthly study workbook", "Monthly", "—", [0, 1, 1]],
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
  { row: "The Deeper Walk discipleship newsletter", tiers: [0, 1, 1] },
  { row: "Reflective “pause & reflect” moments in the Deeper Walk", tiers: [0, 1, 1] },
  { row: "Saturday Weekend Study", tiers: [0, 1, 1] },
  { row: "The Spiritual Wellness Guide (Mon · Wed · Fri)", tiers: [0, 1, 1] },
  { row: "Peace Practice · Pattern Breaker · Prayer Lab tools", tiers: [0, 1, 1] },
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
  { row: "Live GoFundMe updates as we hit each goal", tiers: [0, 0, 1] },
  { row: "Helps reach the next generation where they are", tiers: [0, 0, 1] },
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
        <div className="page-head">
          <h1>
            Walk with God in real life — every morning before the world gets
            loud.
          </h1>
          <p className="sub">
            The Daily Walk makes Scripture clear, honest, and easy to live out.
            Get the devotional, a real prayer, and good news from around the
            world three mornings a week — free. And when you&apos;re ready, become
            a Founding Member and be guided through the whole Bible in a year,
            starting on your Day 1.
          </p>
        </div>

        <h2 className="section">Pick your plan</h2>
        <p className="section-sub">
          The devotional is free three mornings a week. Founding Members get
          everything — every day — for $5.99/mo (or $59/yr). Founding Partners
          give a little more to keep it free for those who can&apos;t.
        </p>

        <PricingCards />

        {/* WEEKLY SCHEDULE */}
        <h2 className="section">What hits your inbox each week</h2>
        <p className="section-sub">A quick scan of what arrives, by tier and day.</p>
        <div className="tbl-card scroll">
          <table>
            <thead>
              <tr>
                <th>What you get</th>
                <th>Day</th>
                <th>Time PT</th>
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

        {/* EXPLAINER */}
        <h2 className="section">What a tier actually looks like</h2>
        <div className="explain">
          <h3>Two rhythms, one walk</h3>
          <p>
            The Daily Walk runs on two rhythms. The{" "}
            <strong>free devotional</strong> goes out to everyone three mornings
            a week — Monday, Wednesday &amp; Friday — with encouragement, a
            prayer, Good News from around the world, and the Wednesday
            Pastor&apos;s Take. The <strong>Bible-in-a-Year journey</strong> (for
            Founding Members) is personal: it starts on <em>your</em> Day 1, the
            day you join, so you&apos;re never dropped into the middle and never
            feel behind before you begin.
          </p>
          <p className="punch">
            Free walks with you three mornings a week. Founding Members get
            everything, every day — and help build the mission.
          </p>
          <p style={{ marginBottom: 0, color: "var(--grey)", fontSize: 13.5 }}>
            Community access stays free for every reader — because no one should
            have to pay to belong.
          </p>
        </div>

        {/* FULL COMPARISON */}
        <h2 className="section">The full comparison</h2>
        <div className="tbl-card scroll">
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

        {/* FAQ */}
        <h2 className="section">Frequently asked questions</h2>
        <div className="faq">
          {faqs.map((f) => (
            <div key={f.q}>
              <div className="q">{f.q}</div>
              <div className="a">{f.a}</div>
            </div>
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
                {check("A deeper daily devotional — fuller study, a key word, and a step to live it")}
                {check("The World Through God's Lens — the headlines without the fear (Thursdays)")}
                {check("The Weekend Study — a deeper guided Bible study (Saturdays)")}
                {check("Inside the Circle — live sessions with a licensed Christian therapist & guest pastors")}
                {check("BONUS: The Spiritual Wellness Guide, 3×/week — free for a full year", true)}
                {check("Peace Practice · Pattern Breaker · Prayer Lab · faith + neuroscience tools")}
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
