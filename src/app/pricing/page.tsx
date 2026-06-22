import type { Metadata } from "next";
import Link from "next/link";
import PricingCards from "@/components/PricingCards";
import { PRICING_ENABLED } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free. Premium guides you through the Bible in a year, from your Day 1. Patron helps keep The Daily Walk free for everyone.",
};

const schedule = [
  ["Daily Devotional (prayer + Good News)", "Mon–Fri", "6:30 AM", [1, 1, 1]],
  ["Sunday Rest & Reflect", "Sunday", "7:00 AM", [1, 1, 1]],
  ["Wednesday Pastor's Take", "Wednesday", "in the daily", [1, 1, 1]],
  ["Bible-in-a-Year guided reading", "Daily · your Day 1", "6:30 AM", [0, 1, 1]],
  ["Audio devotional", "Daily", "6:30 AM", [0, 1, 1]],
  ["Weekend Deep-Dive", "Saturday", "8:00 AM", [0, 1, 1]],
  ["Monthly study workbook", "Monthly", "—", [0, 1, 1]],
  ["Patron Letter + Live Prayer Night", "Monthly", "8:00 PM", [0, 0, 1]],
  ["Quarterly Mini-Study", "Quarterly", "—", [0, 0, 1]],
] as const;

const comparison: Array<
  { group: string } | { row: string; tiers: [number, number, number] }
> = [
  { group: "The Daily Newsletter · free for everyone" },
  { row: "Daily devotional (Mon–Fri)", tiers: [1, 1, 1] },
  { row: "One honest prayer every day", tiers: [1, 1, 1] },
  { row: "Daily “Good News” — 3 uplifting stories", tiers: [1, 1, 1] },
  { row: "Wednesday Pastor's Take", tiers: [1, 1, 1] },
  { row: "Sunday Rest & Reflect", tiers: [1, 1, 1] },
  { row: "Weekly Scripture reading preview", tiers: [1, 1, 1] },
  { row: "Free community access", tiers: [1, 1, 1] },
  { group: "The Bible-in-a-Year Journey · Premium" },
  { row: "Full guided plan, starting on your Day 1", tiers: [0, 1, 1] },
  { row: "Daily guided Scripture reading", tiers: [0, 1, 1] },
  { row: "Plain-English breakdown of each passage", tiers: [0, 1, 1] },
  { row: "“What this shows us about God” reflection", tiers: [0, 1, 1] },
  { row: "Real-life application for modern life", tiers: [0, 1, 1] },
  { row: "Daily reflection question + prayer prompt", tiers: [0, 1, 1] },
  { row: "Audio devotional for each day", tiers: [0, 1, 1] },
  { row: "Saturday Weekend Deep-Dive", tiers: [0, 1, 1] },
  { row: "Monthly downloadable study workbook", tiers: [0, 1, 1] },
  { row: "Full searchable archive", tiers: [0, 1, 1] },
  { row: "Restart or catch up your plan anytime", tiers: [0, 1, 1] },
  { group: "Community & Participation · Patron" },
  { row: "Monthly Patron-only devotional letter", tiers: [0, 0, 1] },
  { row: "Patron Prayer Wall (submit & pray for others)", tiers: [0, 0, 1] },
  { row: "Monthly live prayer night + replay", tiers: [0, 0, 1] },
  { row: "Submit questions for Pastor's Take", tiers: [0, 0, 1] },
  { row: "Vote on upcoming studies & themes", tiers: [0, 0, 1] },
  { row: "Private Patron room in the community", tiers: [0, 0, 1] },
  { group: "Keepsakes & Printables · Patron" },
  { row: "Complete printable prayer-card library", tiers: [0, 0, 1] },
  { row: "Quarterly mini-study (PDF)", tiers: [0, 0, 1] },
  { row: "Monthly Scripture wallpapers (phone + desktop)", tiers: [0, 0, 1] },
  { group: "Support the Mission" },
  { row: "Helps fund The Daily Walk", tiers: [0, 1, 1] },
  { row: "Sponsors free access for readers who can't pay", tiers: [0, 0, 1] },
  { row: "“Founding Supporter” badge in the community", tiers: [0, 0, 1] },
];

const faqs = [
  {
    q: "Is the free version really free forever?",
    a: "Yes. The daily devotional, a prayer, three Good News stories, the Wednesday Pastor's Take, the Sunday Rest & Reflect, and the community are all free with no card required. Premium adds the full guided Bible-in-a-Year journey; Patron adds deeper community and helps keep the free version free for everyone.",
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
    return (
      <header className="hero sunrise portal-hero">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">Coming soon</div>
            <h1>Subscriptions are on the way</h1>
            <p className="lead">
              The Daily Walk is free to start right now. Paid plans (with the
              guided Bible-in-a-Year journey and more) are coming soon — join
              free today and you&apos;ll be first to know when they open. 🙏
            </p>
            <div style={{ marginTop: 22 }}>
              <Link href="/subscribe" className="btn btn-gold">
                Join free
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
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
            Get a daily devotional, a real prayer, and good news from around the
            world — free, forever. And when you&apos;re ready, let Premium guide
            you through the whole Bible in a year, starting on your Day 1.
          </p>
        </div>

        <h2 className="section">Pick your tier</h2>
        <p className="section-sub">
          The daily walk is free. Premium guides you through the Bible in a year.
          Patron helps build the mission and keep it free for everyone.
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
                <th className="c">Premium</th>
                <th className="c">Patron</th>
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
          Everyone gets the daily newsletter. Premium adds the full guided
          Bible-in-a-Year journey — starting on <em>your</em> Day 1, not wherever
          the public newsletter is. Patron adds live prayer, the Patron letter,
          and deeper community.
        </p>

        {/* EXPLAINER */}
        <h2 className="section">What a tier actually looks like</h2>
        <div className="explain">
          <h3>Two rhythms, one walk</h3>
          <p>
            The Daily Walk runs on two rhythms. The{" "}
            <strong>daily newsletter</strong> goes out to everyone on the
            calendar — encouragement, a prayer, Good News from around the world,
            the Wednesday Pastor&apos;s Take, and the Sunday Rest &amp; Reflect.
            The <strong>Bible-in-a-Year journey</strong> is personal: it starts
            on <em>your</em> Day 1, the day you join, so you&apos;re never dropped
            into the middle and never feel behind before you begin.
          </p>
          <p className="punch">
            Free walks with you daily. Premium guides you through the Bible.
            Patron helps build the mission.
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
                <th className="c">Premium</th>
                <th className="c">Patron</th>
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
