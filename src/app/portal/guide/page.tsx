import type { Metadata } from "next";
import Pathlight from "@/components/Pathlight";

export const metadata: Metadata = {
  title: "Pathlight · Bible Guide",
  robots: { index: false },
};

export default function GuidePage() {
  return (
    <div className="m-wrap">
      <section className="m-hero m-hero-sm">
        <div className="m-hero-in">
          <span className="m-hero-kicker">✦ Pathlight</span>
          <h1 className="m-hero-h">Your Bible reading companion</h1>
          <p className="m-hero-sub">
            Ask about a verse, unpack a hard passage, find Scripture for what
            you&apos;re feeling, or get a prayer to pray. Pathlight always points you
            back to the Word — it walks beside your reading, it doesn&apos;t replace it.
          </p>
        </div>
      </section>

      <Pathlight />
    </div>
  );
}
