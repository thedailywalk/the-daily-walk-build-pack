import type { Metadata } from "next";
import { fullPremiumFor, weekdayLabel, prettyDate, type PremiumIssue } from "@/lib/premium";
import { renderPremiumHtml } from "@/lib/premiumHtml";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Premium newsletter — sample issues",
  robots: { index: false },
};

/** Three sample dates so you can see all premium segments at once:
 *  a daily-only Friday, a Thursday (The World This Week), a Saturday (The
 *  Weekend Study). Shareable while the main site is hidden. */
const SAMPLES = [
  { date: "2026-06-26", note: "A regular weekday — daily science only" },
  { date: "2026-06-25", note: "Thursday — adds The World This Week" },
  { date: "2026-06-27", note: "Saturday — adds The Weekend Study" },
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
          This is the Founding Member newsletter. The free daily devotional still
          goes to everyone — this is the deeper layer underneath it: the science,
          the world through a faith lens, a weekend study, and a seat in the live
          room. Three days below so you can see every segment.
        </p>

        {SAMPLES.map((s) => {
          const issue: PremiumIssue = {
            date: s.date,
            status: "draft",
            title: "",
            data: fullPremiumFor(s.date),
          };
          return (
            <div className="ps-card" key={s.date}>
              <div className="ps-label">
                {weekdayLabel(s.date)}, {prettyDate(s.date)} —{" "}
                <span>{s.note}</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: renderPremiumHtml(issue) }} />
            </div>
          );
        })}
      </div>
    </>
  );
}
