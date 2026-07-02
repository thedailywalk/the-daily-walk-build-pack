import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import GoodNewsCard from "@/components/GoodNewsCard";
import PrayerWallPreview from "@/components/PrayerWallPreview";
import { listApprovedPrayers } from "@/lib/prayers";
import { getDailyGoodNews } from "@/lib/goodNews";
import { GOOD_NEWS_PUBLIC, PRICING_ENABLED } from "@/lib/flags";
import { site } from "@/lib/site";
import { studyTips as tips } from "@/lib/studyTips";

// Free features — what comes with the daily newsletter (free for everyone).
const freeFeatures = [
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
    icon: "🤝",
    title: "Walk together",
    body: "A free, welcoming community to share, ask questions, and encourage each other along the way.",
  },
];

// Premium features — the guided Bible-in-a-Year journey.
const premiumFeatures = [
  {
    icon: "📖",
    title: "Start with Jesus",
    body: "The plan opens with John, Romans, and Acts — so Scripture clicks before you ever hit the hard parts.",
  },
  {
    icon: "🗓️",
    title: "Never feel behind",
    body: "Your plan starts on your Day 1. Miss a day? Just pick up where you left off — nothing resets on you.",
  },
  {
    icon: "🎧",
    title: "Listen or read",
    body: "Premium includes an audio devotional each day — perfect for the commute or the morning coffee.",
  },
];

export default async function HomePage() {
  const previewPrayers = (await listApprovedPrayers(12)).map((p) => ({
    id: p.id,
    name: p.name,
    body: p.body,
    prayCount: p.prayCount,
  }));
  const goodNews = GOOD_NEWS_PUBLIC ? await getDailyGoodNews() : [];

  return (
    <>
      {/* HERO — editorial sunrise */}
      <header className="hero sunrise">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">A Christian devotional newsletter</div>
            <h1>Walk with God in real life.</h1>
            <p className="lead">
              Three mornings a week: a short, honest devotional, a real prayer,
              and good news from around the world — free. And when you&apos;re
              ready, be guided through the whole Bible in a year, starting on
              your Day 1.
            </p>
            <SignupForm variant="hero" />
            <div className="reassure">
              Free forever · No card required ·{" "}
              <b>Welcoming wherever you are on the journey.</b>
            </div>
          </div>
        </div>
      </header>

      {/* WHY OPEN IT — the captivate */}
      <section className="manifesto">
        <div className="wrap">
          <div className="sec-tag">Why open it</div>
          <h2 className="h">Life doesn&apos;t come with an instruction manual.</h2>
          <div className="manifesto-body">
            <p className="manifesto-lead">
              It does — most of us just never opened it.
            </p>
            <p>
              You&apos;ll never grow close to someone you never actually talk to.
              Not your closest friend, not the person you love most — and not God.
            </p>
            <p>
              His Word is where you learn how to live, how to heal, and how to
              become the person He made you to be. Wisdom when you&apos;re lost,
              strength when you&apos;re empty, an anchor when you&apos;ve forgotten
              who you are — it was never a box to check.
            </p>
            <p>
              There are battles no one else can see; the Word is how you learn to
              fight them — and win. The armor of God has one weapon:{" "}
              <em>His Word.</em> Start your morning with it, and nothing meets you
              unarmed.
            </p>
            <p>
              A little, every day, adds up. Ten honest minutes each morning for a
              year, and you&apos;ll know God in a way that quietly changes
              everything. You don&apos;t have to have it figured out. You just have
              to open it.
            </p>
          </div>
          <div className="manifesto-cta">
            <Link href="/subscribe" className="btn btn-gold">Start free →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — two rhythms */}
      <section id="how">
        <div className="wrap">
          <div className="sec-tag">How it works</div>
          <h2 className="h">Two rhythms, one walk</h2>
          <p className="sub">
            A daily dose of encouragement for everyone — and a personal, guided
            journey through Scripture for those who want to go deeper.
          </p>
          <div className="rhythms tiers">
            {/* FREE — newsletter + its features */}
            <div className="tiercol">
              <div className="rcard">
                <div className="rk">Mon · Wed · Fri · Free</div>
                <h3>The Daily Walk newsletter</h3>
                <p>
                  A 2-minute devotional, one honest prayer, three uplifting Good
                  News stories, and the Wednesday Pastor&apos;s Take — three
                  mornings a week. Encouragement that meets you in real life.
                </p>
                <div className="who">
                  For anyone who wants encouragement, prayer, and hope.
                </div>
              </div>
              <div className="tierfeats">
                {freeFeatures.map((f) => (
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

            {/* PREMIUM — journey + its features */}
            <div className="tiercol">
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
              <div className="tierfeats">
                {premiumFeatures.map((f) => (
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
          </div>
        </div>
      </section>

      {/* WHY READ THE BIBLE */}
      <section id="why" className="whysec">
        <div className="wrap">
          <div className="why-band">
          <div className="why-head">
            <div className="sec-tag">Why it matters</div>
            <h2 className="h">Why read the Bible?</h2>
          </div>
          <div className="why-copy">
            <p className="why-lead">
              You&apos;ll never grow close to someone you never actually talk to.
              Not your closest friend, not the person you love most — and not God.
            </p>
            <p>
              The Bible isn&apos;t a rulebook to feel guilty about. It&apos;s the
              clearest way God gave us to actually know Him — how He thinks, how
              He loves, how He keeps showing up for ordinary people who are sure
              they&apos;ve blown it.
            </p>
            <p>
              And here&apos;s the honest part: we make time for what we care
              about. There&apos;s always time for the phone, the feed, the next
              episode. Ten minutes in Scripture isn&apos;t one more box to check —
              it&apos;s giving God a real seat in your real day.
            </p>
            <p>
              There&apos;s a reason the Bible calls Scripture a sword. Ephesians
              6 says to put on the armor of God every morning — and the one piece
              you actually fight with is the Word. Start your day with it and you
              walk into everything else already armed. Do it for a week and
              you&apos;ll feel the difference.
            </p>
            <p>
              You don&apos;t start in the deep end. You don&apos;t even start in
              Genesis. You start with Jesus — who He is, how He treats people,
              what He came to do — so the rest finally makes sense.
            </p>
            <p className="why-kicker">
              A little, every day, adds up. Ten honest minutes each morning for a
              year, and you&apos;ll know God in a way that quietly changes
              everything. You don&apos;t have to have it figured out. You just
              have to open it.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* ARM YOURSELF — practical how-to-start */}
      <section id="arm" className="armsec">
        <div className="wrap">
          <div className="why-head">
            <div className="sec-tag">Arm yourself</div>
            <h2 className="h">How to actually start</h2>
            <p className="sub">
              Ephesians 6 tells us to put on the armor of God every day — and the
              one weapon in it is the sword of the Spirit, the Word of God. If you
              do one thing each morning, pick up your sword. Here&apos;s how — it
              honestly doesn&apos;t have to be complicated.
            </p>
          </div>
          <div className="tips">
            {tips.map((t) => (
              <div className="feat" key={t.title}>
                <div className="ic" aria-hidden="true">
                  {t.icon}
                </div>
                <h4>{t.title}</h4>
                <p>
                  {t.body}
                  {t.link && (
                    <>
                      {" "}
                      <a
                        href={t.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.link.label}
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Closing moment */}
          <div className="arm-close">
            <span className="arm-close-rule" aria-hidden="true" />
            <p className="arm-close-lead">
              Everyone says life doesn&apos;t come with an instruction manual.
              It does — most of us just never opened it.
            </p>
            <p className="arm-close-body">
              God didn&apos;t leave you to guess your way through. His Word is
              where you learn how to live, how to heal, how to make the braver
              call, how to fight the battles no one else can see — and how to
              become the person He made you to be. It was never a religious box
              to check. It&apos;s wisdom when you&apos;re lost, strength when
              you&apos;re running on empty, an anchor when you&apos;ve forgotten
              who you are, and healing for the places nothing else has reached.
              Pick it up, and you stop walking through life blind.
            </p>
            <Link href="/subscribe" className="btn btn-gold arm-cta">
              Pick up your sword →
            </Link>
            <p className="arm-close-sub">Free to start · no card required</p>
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
      {GOOD_NEWS_PUBLIC && (
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
      {PRICING_ENABLED && (
      <section id="pricing">
        <div className="wrap">
          <div className="sec-tag">Simple pricing</div>
          <h2 className="h">Start free. Go all-in when you&apos;re ready.</h2>
          <p className="sub">
            The devotional is free three mornings a week. Founding Members get
            everything — every day — for $5.99/mo, and help keep it free for
            others.
          </p>
          <div className="ptiers ptiers-two">
            <div className="pt">
              <div className="tname" style={{ color: "#7a828c" }}>
                Free
              </div>
              <div className="pr">$0</div>
              <div className="pd">Always free · Mon · Wed · Fri</div>
              <ul>
                <li>The devotional 3× a week + prayer</li>
                <li>3 Good News stories</li>
                <li>Wednesday Pastor&apos;s Take</li>
                <li>Free community access</li>
              </ul>
              <Link href="/subscribe" className="btn btn-ghost btn-block">
                Start free
              </Link>
            </div>
            <div className="pt feat-tier">
              <span className="pop">FOUNDING MEMBER</span>
              <div className="tname" style={{ color: "var(--gold-deep)" }}>
                Founding Member
              </div>
              <div className="pr">
                $5.99<small>/mo</small>
              </div>
              <div className="pd">Just 20¢ a day · or $59/yr · everything</div>
              <ul>
                <li>Everything in Free — plus every day</li>
                <li>Guided Bible-in-a-Year from your Day 1</li>
                <li>The Deeper Walk discipleship newsletter</li>
                <li>The Spiritual Wellness Guide</li>
                <li>Audio, Weekend Study + monthly workbook</li>
                <li>Founding price locked in for life</li>
              </ul>
              <Link href="/pricing" className="btn btn-gold btn-block">
                Become a Founding Member
              </Link>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: 22 }}>
            <Link href="/pricing">See the full plan comparison →</Link>
          </p>
        </div>
      </section>
      )}

      {/* MISSION */}
      <section>
        <div className="wrap">
          <div className="mission">
            <h2>A daily guide for walking with God in real life.</h2>
            <p>
              {site.name}
              {" exists to make faith feel clear, honest, and close — "}
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
