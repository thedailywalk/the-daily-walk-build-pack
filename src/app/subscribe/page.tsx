import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import PricingCards from "@/components/PricingCards";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Subscribe — Start free",
  description:
    "Join The Daily Walk free — the devotional, a real prayer, and good news, three mornings a week. Or become a Founding Member for $5.99/mo and get everything.",
};

const included = [
  "A 2-minute devotional — Mon · Wed · Fri",
  "A Scripture breakdown made simple",
  "One honest prayer with each issue",
  "An uplifting Good News story",
  "Wednesday Pastor's Take",
  "Free community access",
];

export default function SubscribePage() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="launch-banner" style={{ marginTop: 20 }}>
          <span className="launch-k">✨ Limited launch special</span>
          <p>
            Psst — don&apos;t miss out. Founding prices are locked in{" "}
            <strong>for life</strong>{" "}while we&apos;re building. They go up at
            launch.
          </p>
        </div>
        <div className="sec-tag">Start free</div>
        <h1
          className="center"
          style={{ fontSize: 36, margin: "8px 0 14px", color: "var(--navy)" }}
        >
          Tomorrow morning could start a little differently.
        </h1>
        <p className="sub">
          Join free — no card required. Your first devotional lands on our next
          send morning (Mon · Wed · Fri) at 5:00 AM ET.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <SignupForm />
        </div>

        <div
          className="rcard"
          style={{ marginTop: 36, maxWidth: 520, marginInline: "auto" }}
        >
          <div className="rk">What you get, free</div>
          <ul style={{ margin: "12px 0 0", paddingLeft: 18, color: "#3c4350" }}>
            {included.map((i) => (
              <li key={i} style={{ margin: "6px 0", fontSize: 15 }}>
                {i}
              </li>
            ))}
          </ul>
          <div className="who" style={{ marginTop: 16 }}>
            Want everything, every day? <strong>Founding Members ($5.99/mo)</strong>{" "}
            get the devotional daily — plus the guided Bible-in-a-Year from your
            Day 1, <strong>The Deeper Walk</strong>, and the full{" "}
            <strong>Spiritual Wellness Guide</strong> — one membership, founding
            rate locked in for life.{" "}
            <Link href="/pricing">Become a Founding Member →</Link>
          </div>
        </div>

        {site.beehiiv.subscribeUrl ? (
          <p className="center muted" style={{ marginTop: 24, fontSize: 13 }}>
            Trouble with the form?{" "}
            <a href={site.beehiiv.subscribeUrl} target="_blank" rel="noreferrer">
              Subscribe on our hosted page →
            </a>
          </p>
        ) : null}
      </div>

      {/* Full plan options — pick Free or go all-in as a Founding Member */}
      <div className="wrap" style={{ maxWidth: 940, marginTop: 40 }}>
        <div className="sec-tag">Or go all-in</div>
        <h2 className="h center" style={{ marginBottom: 6 }}>
          Choose your plan
        </h2>
        <p className="sub" style={{ marginTop: 0 }}>
          Start free three mornings a week — or become a Founding Member and get
          everything, every day, at a rate locked in for life.
        </p>
        <PricingCards />
      </div>
    </section>
  );
}
