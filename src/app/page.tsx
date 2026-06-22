import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import GoodNewsCard from "@/components/GoodNewsCard";
import PrayerWallPreview from "@/components/PrayerWallPreview";
import { listApprovedPrayers } from "@/lib/prayers";
import { getDailyGoodNews } from "@/lib/goodNews";
import { GOOD_NEWS_ENABLED } from "@/lib/flags";
import { site } from "@/lib/site";

const features = [
  {
    icon: "📖",
    title: "Start with Jesus",
    body: "The plan opens with John, Romans, and Acts — so Scripture clicks before you ever hit the hard parts.",
  },
  {
    icon: "🙏",
    title: "A prayer every day",
    body: "Short, honest, ready to pray. No performance, no pretending — just real words for a real day.",
  },
  {
    icon: "🌍",
    title: "Good News briefing",
    body: "Three uplifting, real stories each day — proof that even when the world feels heavy, good is still happening.",
  },
  {
    icon: "🎧",
    title: "Listen or read",
    body: "Premium includes an audio devotional each day — perfect for the commute or the morning coffee.",
  },
  {
    icon: "🗓️",
    title: "Never feel behind",
    body: "Your plan starts on your Day 1. Miss a day? Just pick up where you left off — nothing resets on you.",
  },
  {
    icon: "🤝",
    title: "Walk together",
    body: "A free, welcoming community to share, ask questions, and encourage each other along the way.",
  },
];

export default async function HomePage() {
  const previewPrayers = (await listApprovedPrayers(12)).map((p) => ({
    id: p.id,
    name: p.name,
    body: p.body,
    prayCount: p.prayCount,
  }));
  const goodNews = GOOD_NEWS_ENABLED ? await getDailyGoodNews() : [];

  return (
    <>
      {/* HERO — editorial sunrise */}
      <header className="hero sunrise">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">A daily devotional newsletter</div>
            <h1>Walk with God in real life.</h1>
            <p className="lead">
              Every morning: a short, honest devotional, a real prayer, and good
              news from around the world — free. And when you&apos;re ready, be
              guided through the whole Bible in a year, starting on your Day 1.
            </p>
            <SignupForm variant="hero" />
            <div className="reassure">
              Free forever · No card required ·{" "}
              <b>Welcoming wherever you are on the journey.</b>
            </div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS — two rhythms */}
      <section id="how">
        <div className="wrap">
          <div className="sec-tag">How it works</div>
          <h2 className="h">Two rhythms, one walk</h2>
          <p className="sub">
            A daily dose of encouragement for everyone — and a personal, guided
            journey through Scripture for those who want to go deeper.
          </p>
          <div className="rhythms">
            <div className="rcard">
              <div className="rk">Every day · Free</div>
              <h3>The Daily Walk newsletter</h3>
              <p>
                A 2-minute devotional, one honest prayer, three uplifting Good
                News stories, the Wednesday Pastor&apos;s Take, and a Sunday Rest
                &amp; Reflect. Encouragement that meets you in real life.
              </p>
              <div className="who">
                For anyone who wants daily encouragement, prayer, and hope.
              </div>
            </div>
            <div className="rcard">
              <div className="rk">Your Day 1 · Premium</div>
              <h3>The Bible-in-a-Year journey</h3>
              <p>
                Read the whole Bible in a year — starting with Jesus, not
                Genesis. Each day: the reading, a plain-English breakdown, what
                it shows us about God, real-life application, a question, and
                audio. Begins the day <em>you</em> join.
              </p>
              <div className="who">
                For readers who want to be personally guided through the Bible.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feats">
            {features.map((f) => (
              <div className="feat" key={f.title}>
                <div className="ic" aria-hidden="true">
                  {f.icon}
                </div>
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRAYER WALL PREVIEW */}
      {previewPrayers.length > 0 && (
        <section id="pray" className="pwsec">
          <div className="wrap">
            <div className="sec-tag">Pray with us</div>
            <h2 className="h">The community is praying</h2>
            <p className="sub" style={{ marginBottom: 4 }}>
              Real requests from real people. Tap 🙏 to pray over one — and watch
              the prayers rise.
            </p>
            <PrayerWallPreview prayers={previewPrayers} />
          </div>
        </section>
      )}

      {/* GOOD NEWS PREVIEW */}
      {GOOD_NEWS_ENABLED && (
      <section id="good" className="gnsec">
        <div className="wrap">
          <div className="sec-tag">In every issue</div>
          <h2 className="h">Good news from around the world</h2>
          <p className="sub">
            Real, current, sourced stories of kindness, restoration, and hope — a
            small daily reminder that God is still moving.
          </p>
          <div className="gngrid">
            {goodNews.map((g) => (
              <GoodNewsCard item={g} key={g.headline} />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* PRICING PREVIEW */}
      <section id="pricing">
        <div className="wrap">
          <div className="sec-tag">Simple pricing</div>
          <h2 className="h">Start free. Go deeper when you&apos;re ready.</h2>
          <p className="sub">
            The daily walk is free. Premium guides you through the Bible in a
            year. Patron helps build the mission and keep it free for everyone.
          </p>
          <div className="ptiers">
            <div className="pt">
              <div className="tname" style={{ color: "#7a828c" }}>
                Free
              </div>
              <div className="pr">$0</div>
              <div className="pd">Always free</div>
              <ul>
                <li>Daily devotional + prayer</li>
                <li>3 Good News stories daily</li>
                <li>Wednesday Pastor&apos;s Take</li>
                <li>Sunday Rest &amp; Reflect</li>
                <li>Free community access</li>
              </ul>
              <Link href="/subscribe" className="btn btn-ghost btn-block">
                Start free
              </Link>
            </div>
            <div className="pt feat-tier">
              <span className="pop">MOST POPULAR</span>
              <div className="tname" style={{ color: "var(--gold-deep)" }}>
                Premium
              </div>
              <div className="pr">
                $5.99<small>/mo</small>
              </div>
              <div className="pd">Just 20¢ a day · or $59/yr</div>
              <ul>
                <li>Everything in Free</li>
                <li>Guided Bible-in-a-Year from your Day 1</li>
                <li>Plain-English breakdowns + application</li>
                <li>Daily audio devotional</li>
                <li>Good News reading room (30/day)</li>
                <li>Weekend Deep-Dive + monthly workbook</li>
                <li>Full searchable archive</li>
              </ul>
              <Link href="/pricing" className="btn btn-gold btn-block">
                Get Premium
              </Link>
            </div>
            <div className="pt">
              <div className="tname">Patron</div>
              <div className="pr">
                $19.99<small>/mo</small>
              </div>
              <div className="pd">Just 66¢ a day · or $199/yr</div>
              <ul>
                <li>Everything in Premium</li>
                <li>Monthly Patron letter + live prayer</li>
                <li>Patron Prayer Wall + private room</li>
                <li>A say in upcoming studies</li>
                <li>Helps keep The Daily Walk free</li>
              </ul>
              <Link href="/pricing" className="btn btn-ghost btn-block">
                Become a Patron
              </Link>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 22 }}>
            <Link href="/pricing">See the full plan comparison →</Link>
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section>
        <div className="wrap">
          <div className="mission">
            <h2>A daily guide for walking with God in real life.</h2>
            <p>
              {site.name} exists to make faith feel clear, honest, and close —
              whether you&apos;ve followed Jesus for decades or you&apos;re just
              curious. No jargon. No guilt. Just Scripture, prayer, and hope, one
              day at a time.
            </p>
            <div className="verse">
              &ldquo;Your word is a lamp to my feet and a light to my
              path.&rdquo; — Psalm 119:105
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ paddingTop: 8 }}>
        <div className="wrap center">
          <div className="sec-tag">Start today</div>
          <h2 className="h">
            Tomorrow morning could start a little differently.
          </h2>
          <p className="sub">
            Join free and get your first devotional in your inbox tomorrow at
            6:30 AM PT.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SignupForm />
          </div>
        </div>
      </section>
    </>
  );
}
