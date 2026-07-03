import type { Metadata } from "next";
import { fullPremiumFor, weekdayLabel, prettyDate, type PremiumIssue } from "@/lib/premium";
import { renderPremiumHtml } from "@/lib/premiumHtml";
import type { GoodNewsItem } from "@/lib/content";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Premium newsletter — sample issues",
  robots: { index: false },
};

/** Two sample dates so you can see every premium (discipleship) segment: a
 *  regular weekday (the Main Premium Devotional) and a Saturday (which adds The
 *  Weekend Study). Shareable while the main site is hidden. */
const SAMPLES = [
  { date: "2026-06-29", note: "A regular weekday — the Main Premium Devotional" },
  { date: "2026-07-04", note: "Saturday, July 4 — adds The Weekend Study" },
];

/** Sample Good News so the preview shows the 3-story briefing layout. Live
 *  issues pull real stories + free, license-cleared Wikimedia photos + links. */
const SAMPLE_GOODNEWS: GoodNewsItem[] = [
  {
    category: "Generosity",
    headline: "A NYC cab driver lost everything in a riot — then strangers gave back $75,000",
    image: "",
    href: "https://www.goodnewsnetwork.org/",
    source: "Good News Network",
    summary:
      "After a driver's taxi was destroyed by a celebrating crowd, a fundraiser with the drivers' union passed $75,000 in days — enough to help him rebuild.",
  },
  {
    category: "Community",
    headline: "A man mowed a grieving widow's lawn for free — viewers turned it into $685,000",
    image: "",
    href: "https://www.goodnewsnetwork.org/",
    source: "Good News Network",
    summary:
      "A creator who quietly mows overgrown yards for free spotlighted a widow behind on rent; strangers turned one afternoon into more than $685,000.",
  },
  {
    category: "Restoration",
    headline: "After a 2-year wait, an orangutan crossed a rope bridge over a road — a world first",
    image: "",
    href: "https://www.goodnewsnetwork.org/",
    source: "Good News Network",
    summary:
      "A road had split a population of endangered orangutans in two. Conservationists strung canopy bridges and waited — a camera finally caught one crossing safely.",
  },
];

const CSS = `
  .ps-wrap{max-width:760px;margin:0 auto;padding:40px 20px 80px;font-family:Georgia,'Times New Roman',serif;color:#22262B}
  .ps-k{font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;text-transform:uppercase;font-size:12px;font-weight:700;color:#B8902E;text-align:center}
  .ps-h{font-size:34px;text-align:center;color:#1F3A5F;margin:10px 0 6px;line-height:1.15}
  .ps-sub{text-align:center;color:#5b5340;font-size:16px;max-width:560px;margin:0 auto 36px;line-height:1.6}
  .ps-card{margin:0 0 46px}
  .ps-label{font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#1F3A5F;background:#F3ECDA;border:1px solid #E0D6BF;border-radius:8px;padding:10px 16px;margin:0 0 12px}
  .ps-label span{color:#8a7d5c;font-weight:600}
  body{background:#EFEADD}
`;

export default function PremiumSamplePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ps-wrap">
        <div className="ps-k">The Daily Walk · Premium</div>
        <h1 className="ps-h">The Deeper Walk — sample issues</h1>
        <p className="ps-sub">
          The Premium Discipleship Newsletter. The free daily devotional still
          goes to everyone — this is the deeper layer: a richer daily devotional
          with reflective pauses as you read, the same Good News briefing, a
          weekend study, and a seat in the live room. (The wellness tools — Peace
          Practice, Pattern Breaker, Prayer Lab — are the separate Spiritual
          Wellness Guide, sampled{" "}
          <a href="/designs/wellness-sample" style={{ color: "#B8902E" }}>here</a>
          .)
        </p>

        {SAMPLES.map((s) => {
          const issue: PremiumIssue = {
            date: s.date,
            status: "draft",
            title: "",
            data: {
              ...fullPremiumFor(s.date),
              devPause:
                "Sit here a second before you read on — where in your own life does this land today?",
              studyPause:
                "Don't rush past this one. Let it settle before you keep going.",
            },
          };
          return (
            <div className="ps-card" key={s.date}>
              <div className="ps-label">
                {weekdayLabel(s.date)}, {prettyDate(s.date)} —{" "}
                <span>{s.note}</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: renderPremiumHtml(issue, SAMPLE_GOODNEWS) }} />
            </div>
          );
        })}
      </div>
    </>
  );
}
