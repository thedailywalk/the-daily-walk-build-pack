import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import GoodNewsCard from "@/components/GoodNewsCard";
import PrayerWallPreview from "@/components/PrayerWallPreview";
import { listApprovedPrayers } from "@/lib/prayers";
import { getDailyGoodNews } from "@/lib/goodNews";
import { GOOD_NEWS_PUBLIC, PRICING_ENABLED } from "@/lib/flags";
import { site } from "@/lib/site";
import { studyTips as tips } from "@/lib/studyTips";
import HowItWorks from "@/components/HowItWorks";
import GiveButton from "@/components/GiveButton";

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
              You&apos;ll never grow close to someone you never talk to — not
              even God. His Word is the one weapon He gave you: wisdom when
              you&apos;re lost, strength when you&apos;re empty, an anchor when
              you&apos;ve forgotten who you are. Ten honest minutes a morning,
              and nothing meets you unarmed.
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
          <h2 className="h">
            Everyone says life doesn&apos;t come with an instruction manual.
          </h2>
          <div className="manifesto-body">
            <p className="manifesto-lead">
              It does — most of us just never opened it.
            </p>
            <p>
              God didn&apos;t leave you to guess your way through. His Word is
              where you learn how to live, how to heal, how to make the braver
              call, how to fight the battles no one else can see — and how to
              become the person He made you to be. It was never a religious box to
              check. Pick it up, and you stop walking through life blind.
            </p>
          </div>
          <div className="manifesto-cta">
            <Link href="/subscribe" className="btn btn-gold">Pick up your sword →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — two rhythms */}
      <section id="how">
        <div className="wrap">
          <div className="sec-tag">How it works</div>
          <h2 className="h">How each walk works</h2>
          <p className="sub">
            Small enough to actually do, every morning — encouragement for
            everyone, and a personal, guided journey for those who want to go
            deeper.
          </p>
          <HowItWorks />
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

      {/* OUR MISSION + THE FIRST BUILD (give via Givebutter) */}
      <section id="mission-home" className="mhsec">
        <div className="wrap">
          <div className="mh-grid">
            <div className="mh-text">
          <div className="why-head mh-head">
            <div className="sec-tag">Our mission</div>
            <h2 className="h">Bigger than an inbox</h2>
          </div>
          <p className="mh-lead">
            The Daily Walk exists to help people find Jesus, feel loved, and
            learn how to build a real relationship with God — one day at a time.
            You&apos;re welcome the moment you come, whether you&apos;ve followed
            Him for forty years or have never opened a Bible in your life.
          </p>
          <p className="mh-body">
            Every morning, The Daily Walk is a place to start: real Scripture in
            plain words, an honest prayer, and encouragement that meets you right
            where you are. And because this is meant for anyone, we keep it as
            accessible and affordable as we can — so money is never the reason
            someone feels too far from walking with God.
          </p>
          <p className="mh-body">
            But the mission does not stop at your inbox. As The Daily Walk grows,
            what comes in gets poured back out — into{" "}
            <strong>learning centers, school buses, worship spaces, and resources
            for the places hardest to reach</strong>, so everyone, everywhere gets
            the opportunity to know God.
          </p>
          <p className="mh-body">
            And because this is a community, we&apos;ll share live project
            updates, testimonies, and real progress along the way — with Founding
            Partners receiving personal monthly updates on how their giving is
            helping turn a daily word into hope on the ground.
          </p>
          <p className="mh-close">
            <strong>This is bigger than an inbox.</strong> It is a daily word
            becoming a deeper walk — and a deeper walk becoming hope for someone
            else.
          </p>
          <p className="mh-readmore">
            <Link href="/mission" className="mh-inline">
              Read our full mission →
            </Link>
          </p>
            </div>

          {/* The first build — give via Givebutter */}
          <div className="gfm-card">
            <div className="gfm-k">The first build</div>
            <h3 className="gfm-h">
              An after-school learning center in Mexico — and a bus to reach the
              towns around it
            </h3>
            <p className="gfm-p">
              Our first project is a community after-school learning center in a
              small town in Mexico — one of the few places nearby with running
              water and electricity in most homes. The villages around it barely
              have that, so we&apos;re not stopping at one town.
            </p>
            <p className="gfm-p">
              Inside, kids will have access to <strong>computers, school
              supplies, first-aid kits, and even clean clothes and shoes</strong>.
              On weekends, the goal is a bus route that <strong>picks up and drops
              off kids from the surrounding villages</strong> — so all our youth
              get the chance to attend <strong>free English classes and
              after-school worship</strong>{" "}at the center, with the tools and
              materials to help them in school. Most of all, it&apos;s a place to
              know and learn about God. It comes from all of us, but it&apos;s
              because of Him — and every bit of the glory is His.
            </p>
            {site.givebutter.url || site.givebutter.widgetId ? (
              <GiveButton
                label="Give to this →"
                className="btn btn-gold gfm-cta"
              />
            ) : (
              <span className="gfm-soon">
                Giving opens soon — watch this space.
              </span>
            )}
          </div>
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
              Real requests from real people. Tap a 🙏 ❤️ 🕊️ to pray over one —
              and watch the prayers rise.
            </p>
            <PrayerWallPreview prayers={previewPrayers} />
          </div>
        </section>
      )}

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
          <details className="arm-drop">
            <summary className="arm-toggle">
              <span className="arm-toggle-txt">Show me the 6 steps</span>
              <span className="arm-toggle-ic" aria-hidden="true">
                ▾
              </span>
            </summary>
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
          </details>
        </div>
      </section>

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
            Start free three mornings a week. Founding Members get everything —
            every day — for $5.99/mo, and Founding Partners give a little more to
            keep it free for people who can&apos;t pay.
          </p>
          <div className="ptiers">
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
              <span className="pop">MOST POPULAR</span>
              <div className="tname" style={{ color: "var(--gold-deep)" }}>
                Founding Member
              </div>
              <div className="pr">
                $5.99<small>/mo</small>
              </div>
              <div className="pd">Just 20¢ a day · or $59/yr · everything</div>
              <ul>
                <li>Everything in Free — plus the devotional every day</li>
                <li>Guided Bible-in-a-Year from your Day 1</li>
                <li>The Deeper Walk discipleship newsletter</li>
                <li>The Spiritual Wellness Guide</li>
                <li>Monthly workbook + the full archive</li>
                <li>Founding price locked in for life</li>
              </ul>
              <Link href="/pricing" className="btn btn-gold btn-block">
                Become a Founding Member
              </Link>
            </div>
            <div className="pt tier-partner">
              <span className="pop pop-alt">PAY IT FORWARD</span>
              <div className="tname" style={{ color: "var(--navy)" }}>
                Founding Partner
              </div>
              <div className="pr">
                $19.99<small>/mo</small>
              </div>
              <div className="pd">For those who can give a little more</div>
              <ul>
                <li>Everything in Founding Member</li>
                <li>Keeps a Christian counselor free for everyone</li>
                <li>Keeps it free for readers who can&apos;t pay</li>
                <li>Pastors &amp; perspectives from around the world</li>
                <li>Monthly founder updates — always in the loop</li>
              </ul>
              <Link href="/pricing" className="btn btn-ghost btn-block">
                Become a Founding Partner
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
