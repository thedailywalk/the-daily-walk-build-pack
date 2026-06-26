import type { Metadata } from "next";
import { fullWellnessFor, weekdayLabel, prettyDate, type WellnessIssue } from "@/lib/wellness";
import { renderWellnessHtml } from "@/lib/wellnessHtml";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Spiritual Wellness Guide — sample issues",
  robots: { index: false },
};

/** Mon / Wed / Fri samples so you can see the full wellness rhythm.
 *  June 29 = Mon, July 1 = Wed, July 3 = Fri (2026). Shareable while hidden. */
const SAMPLES = [
  { date: "2026-06-29", note: "Monday — start the week steady" },
  { date: "2026-07-01", note: "Wednesday — midweek reset" },
  { date: "2026-07-03", note: "Friday — release the week, walk into rest" },
];

const CSS = `
  .ps-wrap{max-width:760px;margin:0 auto;padding:40px 20px 80px;font-family:Georgia,'Times New Roman',serif;color:#22262B}
  .ps-k{font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;text-transform:uppercase;font-size:12px;font-weight:700;color:#B8902E;text-align:center}
  .ps-h{font-size:34px;text-align:center;color:#2C463B;margin:10px 0 6px;line-height:1.15}
  .ps-sub{text-align:center;color:#4c5a4d;font-size:16px;max-width:580px;margin:0 auto 36px;line-height:1.6}
  .ps-card{margin:0 0 46px}
  .ps-label{font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#2C463B;background:#EAF0E7;border:1px solid #CFDDC9;border-radius:8px;padding:10px 16px;margin:0 0 12px}
  .ps-label span{color:#6a7468;font-weight:600}
  body{background:#E4E8E0}
`;

export default function WellnessSamplePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ps-wrap">
        <div className="ps-k">The Daily Walk · Founding-Member Bonus</div>
        <h1 className="ps-h">The Spiritual Wellness Guide — samples</h1>
        <p className="ps-sub">
          A bonus for Founding Members, sent three times a week (Mon · Wed · Fri).
          Faith + neuroscience tools to steady the heart and mind — peace, not
          just inspiration. Each issue: The Science Behind It, The Peace Practice,
          The Pattern Breaker, The Prayer Lab, and A Question Worth Sitting With.
        </p>

        {SAMPLES.map((s) => {
          const issue: WellnessIssue = {
            date: s.date,
            status: "draft",
            title: "",
            data: fullWellnessFor(s.date),
          };
          return (
            <div className="ps-card" key={s.date}>
              <div className="ps-label">
                {weekdayLabel(s.date)}, {prettyDate(s.date)} — <span>{s.note}</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: renderWellnessHtml(issue) }} />
            </div>
          );
        })}
      </div>
    </>
  );
}
