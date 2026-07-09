import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description:
    "The Daily Walk's vision and mission: give everyone, everywhere the opportunity to know God — starting with a simple morning word and coming full circle into learning centers, roads, school buses, and worship centers in the hardest-to-reach places.",
};

const CIRCLE = [
  {
    icon: "☀️",
    title: "It starts with the newsletter",
    body: "Every morning, a free word meets you right where you are — no cost, no pressure, just a place to begin.",
  },
  {
    icon: "📖",
    title: "It opens a door to go deeper",
    body: "From there, the platform and the guided journey help you build and grow a real relationship with God.",
  },
  {
    icon: "🌱",
    title: "Going deeper fuels the mission",
    body: "What the membership earns, we pour straight back out — so we can reach even more people, in places harder to reach.",
  },
  {
    icon: "🌍",
    title: "We build the way in",
    body: "Learning centers, roads, school buses, and worship centers — meeting people where the door has been hardest to open.",
  },
];

const GIVE = [
  {
    lead: "A counselor for everyone",
    body: "Keeps a licensed Christian counselor within reach of everyone — never locked behind a price.",
  },
  {
    lead: "Voices from every corner",
    body: "Brings you pastors and perspectives from cultures and places most of us will never reach.",
  },
  {
    lead: "The next generation",
    body: "We meet kids where they already are — then point them back to the real world, to do good and love the people in front of them.",
  },
  {
    lead: "You'll see every bit of it",
    body: "Live updates on every project, so you don't just see where your money went — you see the change it's making.",
  },
];

/** Vision & Mission — Vision/Mission up top, then the full-circle model + giving. */
export default function MissionPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-tag" style={{ textAlign: "center" }}>Vision &amp; Mission</div>
        <h1 className="h" style={{ textAlign: "center" }}>
          Everyone deserves the chance to know God.
        </h1>
        <p className="sub" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 10px" }}>
          Find Jesus. Feel loved. Grow. And help us open that door for the next
          person, in the next place — anywhere in the world.
        </p>

        {/* Vision vs Mission */}
        <div className="vm-grid">
          <div className="vm-card vm-vision">
            <span className="vm-ic" aria-hidden="true">👁️</span>
            <div className="vm-eyebrow">The &ldquo;why&rdquo; · where we&apos;re headed</div>
            <h2 className="vm-title">Our Vision</h2>
            <p className="vm-lead">
              A world where everyone, everywhere — in every town and every
              hard-to-reach corner of the earth — has a real opportunity to know
              God. Where a simple morning word grows into learning centers, roads,
              school buses, and worship centers, and no one is ever too far to be
              reached.
            </p>
          </div>
          <div className="vm-card vm-mission">
            <span className="vm-ic" aria-hidden="true">🎯</span>
            <div className="vm-eyebrow">The &ldquo;how&rdquo; · what we do now</div>
            <h2 className="vm-title">Our Mission</h2>
            <p className="vm-lead">
              To help people find Jesus — and learn how to build and grow that
              relationship into a peace that passes all understanding — one day at
              a time, meeting you wherever you are. And to keep widening the door,
              so everyone, everywhere gets the opportunity to know God.
            </p>
          </div>
        </div>

        {/* The full circle */}
        <h2 className="mission-sec-h">The full circle</h2>
        <p className="mission-sec-sub">
          How a simple morning word becomes hope on the ground — and comes back
          around to reach even more people.
        </p>
        <div className="circle-flow">
          {CIRCLE.map((s, i) => (
            <div className="circle-step" key={s.title}>
              <span className="circle-dot" aria-hidden="true">{s.icon}</span>
              <div className="circle-tx">
                <div className="circle-num">Step {i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
          <div className="circle-loop">
            ↺ …and it comes full circle — more people get the chance to know God,
            and the circle keeps turning.
          </div>
        </div>

        {/* Where your giving goes — navy band */}
        <div className="give-band">
          <div className="give-head">
            <div className="give-k">Founding Partner · pay it forward</div>
            <h2>Where your giving goes</h2>
            <p>
              Founding Partners give a little more — not for extra features, but
              to open all of this up for the people who can&apos;t pay at all.
              Here&apos;s what your gift makes possible.
            </p>
            <Link href="/pricing#founding-partner" className="btn btn-gold give-cta">
              Become a Founding Partner →
            </Link>
          </div>
          <ul className="give-list">
            {GIVE.map((g) => (
              <li className="give-item" key={g.lead}>
                <strong>{g.lead}</strong>
                <span>{g.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mission-verse" style={{ maxWidth: 720, margin: "44px auto 0" }}>
          &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo; — Psalm 119:105
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
          <span className="mission-sign">— the founding family</span>
        </p>
      </div>
    </section>
  );
}
