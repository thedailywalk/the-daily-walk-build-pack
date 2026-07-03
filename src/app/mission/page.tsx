import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Why The Daily Walk exists: to help anyone find and follow Jesus, feel loved, and grow — and to turn what we build into learning centers and hope for kids around the world.",
};

/** The Mission page — the heart behind The Daily Walk, in Lulu's voice. */
export default function MissionPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="sec-tag" style={{ textAlign: "center" }}>Our Mission</div>
        <h1 className="h" style={{ textAlign: "center" }}>
          Find Jesus. Feel loved. Grow.
        </h1>
        <p className="sub" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 8px" }}>
          And help us build hope for the next kid, in the next town, anywhere in the world.
        </p>

        <div className="mission-body">
          <MissionBlock kicker="Why we're here" title="Everyone deserves the chance">
            We believe everyone deserves the chance to find Jesus — and to feel
            welcome the moment they do, whether they&apos;ve followed Him for forty
            years or have never opened a Bible in their life.
          </MissionBlock>

          <MissionBlock kicker="The newsletter" title="A place to start, every morning">
            Every morning, The Daily Walk is a place to start: real Scripture in
            plain words, an honest prayer, and good news to remind you God is still
            moving. It&apos;s simple on purpose — a few honest minutes that meet you
            right where you are, no matter how long it&apos;s been or how far away
            God can feel.
          </MissionBlock>

          <MissionBlock kicker="Made for everyone" title="Kept low, on purpose">
            Because this is meant for <em>anyone</em>, we keep it as affordable as we
            possibly can. The devotional is free, and our membership is priced low on
            purpose — so money is never the reason someone can&apos;t walk with God.
          </MissionBlock>

          <MissionBlock kicker="The platform" title="How we go further, together">
            It&apos;s how we go further together — a way to connect, to teach clearly,
            and to put real tools and resources within reach of anyone who wants to
            grow.
          </MissionBlock>

          <MissionBlock kicker="Where it's all going" title="Bigger than an inbox">
            Our mission is bigger than an inbox. As The Daily Walk grows, we&apos;ll
            turn what it earns into learning centers in communities that lack
            computers, teachers, and schools — giving kids around the world a chance,
            an education, and hope for what&apos;s ahead.
          </MissionBlock>
        </div>

        <div className="mission-verse">
          “Your word is a lamp to my feet and a light to my path.” — Psalm 119:105
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

function MissionBlock({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mission-block">
      <div className="mission-kicker">{kicker}</div>
      <h2 className="mission-h2">{title}</h2>
      <p className="mission-p">{children}</p>
    </div>
  );
}
