import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "The Daily Walk's vision and mission: help people meet Jesus and walk with Him, keep it welcoming and affordable for everyone, and turn what we build into learning centers and hope for kids around the world.",
};

/** Vision & Mission — full-width, broken into Vision vs Mission + how we do it. */
export default function MissionPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-tag" style={{ textAlign: "center" }}>Vision &amp; Mission</div>
        <h1 className="h" style={{ textAlign: "center" }}>
          Find Jesus. Feel loved. Grow.
        </h1>
        <p className="sub" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 10px" }}>
          And help us build hope for the next kid, in the next town, anywhere in
          the world.
        </p>

        {/* Vision vs Mission */}
        <div className="vm-grid">
          <div className="vm-card vm-vision">
            <span className="vm-ic" aria-hidden="true">👁️</span>
            <div className="vm-eyebrow">The &ldquo;why&rdquo; · where we&apos;re headed</div>
            <h2 className="vm-title">Our Vision</h2>
            <p className="vm-lead">
              A world where anyone, anywhere — in every town and every corner of
              the earth — can come to know Jesus, feel truly loved, and never walk
              alone. Where technology carries real hope to the next generation, and
              every kid has a classroom, a chance, and a future.
            </p>
          </div>
          <div className="vm-card vm-mission">
            <span className="vm-ic" aria-hidden="true">🎯</span>
            <div className="vm-eyebrow">The &ldquo;how&rdquo; · what we do now</div>
            <h2 className="vm-title">Our Mission</h2>
            <p className="vm-lead">
              To help people meet Jesus and keep walking with Him — in a way that
              feels real and welcoming, one honest morning at a time — and to turn
              what we build into learning centers and hope for kids around the
              world.
            </p>
          </div>
        </div>

        {/* How we do it */}
        <h2 className="mission-sec-h">How we do it</h2>
        <div className="mission-cards">
          <MissionCard kicker="Why we're here" title="Everyone deserves the chance">
            We believe everyone deserves the chance to find their way to Jesus —
            and to feel welcome the moment they do, whether they&apos;ve followed
            Him for forty years or have never opened a Bible in their life.
          </MissionCard>
          <MissionCard kicker="The newsletter" title="A place to start, every morning">
            Every morning, The Daily Walk is a place to start: real Scripture in
            plain words, an honest prayer, and good news to remind you God is still
            moving. A few honest minutes that meet you right where you are.
          </MissionCard>
          <MissionCard kicker="Made for everyone" title="Kept low, on purpose">
            Because this is meant for <em>anyone</em>, we keep it as affordable as
            we possibly can. The devotional is free, and our membership is priced
            low on purpose — so money is never the reason someone can&apos;t walk
            with God.
          </MissionCard>
          <MissionCard kicker="Where it's all going" title="Bigger than an inbox">
            As The Daily Walk grows, we turn what it earns into learning centers in
            communities that lack computers, teachers, and schools — giving kids
            around the world a chance, an education, and hope for what&apos;s ahead.
          </MissionCard>
        </div>

        {/* How your support goes further */}
        <h2 className="mission-sec-h">How your support goes further</h2>
        <p className="mission-sec-sub">
          Founding Partners give a little more — not for extra features, but to
          open all of this up for the people who can&apos;t pay at all.
        </p>
        <div className="mission-cards">
          <MissionCard kicker="A counselor for everyone" title="Never locked behind a price">
            Your support keeps a licensed Christian counselor within reach of
            everyone — a resource we never want to put out of anyone&apos;s reach.
          </MissionCard>
          <MissionCard kicker="Faith from every corner" title="Voices you'd never otherwise hear">
            It connects us with pastors across the world, so you hear how faith
            actually lives and moves in cultures and places most of us will never
            reach — where people have barely a fraction of what we do, and more
            faith than all of it.
          </MissionCard>
          <MissionCard kicker="The next generation" title="Meeting kids where they are">
            We meet kids where they already are — on their screens — with the hope
            of Jesus. But we don&apos;t leave them there: the goal is to point them
            back to the real world, to get outside, do good, and love the people in
            front of them.
          </MissionCard>
          <MissionCard kicker="You'll see every bit of it" title="Where your giving goes">
            Live updates on every single project, so you don&apos;t just see where
            your money went — you see the change it&apos;s making. Your gift could
            be the very one that gives someone hope, helps them meet God, and leads
            them home.
          </MissionCard>
        </div>

        <div className="mission-verse" style={{ maxWidth: 720, margin: "40px auto 0" }}>
          &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo; — Psalm 119:105
        </div>

        <div className="mission-cta">
          <Link href="/subscribe" className="btn btn-gold">Start free</Link>
          <Link href="/pricing" className="btn btn-ghost">See membership</Link>
        </div>

        <p className="mission-reach">
          Want to partner, give toward the mission, or just say hello? We&apos;d
          genuinely love to hear from you — call or text{" "}
          <a href={`tel:+1${site.founderPhone.replace(/[^0-9]/g, "")}`}>{site.founderPhone}</a>{" "}
          or email <a href={`mailto:${site.replyTo}`}>{site.replyTo}</a>.
          <br />
          <span className="mission-sign">— Lulu &amp; the founding family</span>
        </p>
      </div>
    </section>
  );
}

function MissionCard({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mission-card">
      <div className="mission-kicker">{kicker}</div>
      <h3 className="mission-h2">{title}</h3>
      <p className="mission-p">{children}</p>
    </div>
  );
}
