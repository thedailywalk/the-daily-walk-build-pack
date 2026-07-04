import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import GivebutterEmbed from "@/components/GivebutterEmbed";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support The Daily Walk — help keep the devotional free for everyone and fund learning centers, buses, and resources for the places hardest to reach.",
};

export default function GivePage() {
  const gb = site.givebutter;
  const canEmbed = Boolean(gb.widgetId);

  return (
    <section className="give-page">
      <div className="wrap">
        <div className="give-head">
          <div className="sec-tag">Give</div>
          <h1 className="h">Your gift becomes hope on the ground</h1>
          <p className="sub">
            Every gift keeps The Daily Walk free for people who can&apos;t pay —
            and pours back out into learning centers, buses, worship spaces, and
            resources for the places hardest to reach. It comes from all of us,
            but it&apos;s because of Him — and every bit of the glory is His.
          </p>
        </div>

        <div className="give-panel">
          {canEmbed ? (
            <GivebutterEmbed widgetId={gb.widgetId} accountId={gb.accountId} />
          ) : gb.url ? (
            <div className="give-cta-wrap">
              <p className="give-cta-lead">
                Give securely through Givebutter — every dollar goes to the
                mission.
              </p>
              <a
                href={gb.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold give-cta"
              >
                <span aria-hidden="true">♥</span> Give on Givebutter →
              </a>
            </div>
          ) : (
            <div className="give-soon">
              <h2>Giving opens soon</h2>
              <p>
                Our donation page is almost ready. Thank you for your heart to
                give — check back shortly, and it&apos;ll be right here.
              </p>
            </div>
          )}
        </div>

        <p className="give-note">
          We&apos;re committed to full transparency — you&apos;ll see where every
          gift goes.{" "}
          <Link href="/mission">Read our mission &amp; where giving goes →</Link>
        </p>
      </div>
    </section>
  );
}
