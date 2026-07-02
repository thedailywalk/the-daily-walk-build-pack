import "server-only";
import type { WellnessIssue } from "@/lib/wellness";
import { weekdayLabel, prettyDate } from "@/lib/wellness";
import { site } from "@/lib/site";

function esc(s: string | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * The Spiritual Wellness Guide — calm, sage-toned bonus issue. Inline styles
 * only (email-safe). Same Daily Walk palette, a softer green accent for "rest".
 */
const S = {
  outer: "background:#E4E8E0;padding:24px 12px;",
  wrap: "max-width:600px;margin:0 auto;background:#FAF8F2;font-family:Georgia,'Times New Roman',serif;color:#2B2B2B;border-radius:10px;overflow:hidden;border:1px solid #BFD0BE;",
  masthead: "background:#2C463B;text-align:center;padding:28px 20px 22px;border-bottom:3px solid #C9A24B;",
  ribbon: "font-family:Arial,Helvetica,sans-serif;display:inline-block;background:#C9A24B;color:#2C463B;font-weight:bold;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:10px;",
  logo: "font-family:Arial,Helvetica,sans-serif;letter-spacing:4px;font-size:12px;color:#D8C58A;font-weight:bold;",
  title: "font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:27px;font-weight:bold;margin:8px 0 4px;letter-spacing:0.5px;",
  tag: "font-family:Arial,Helvetica,sans-serif;color:#BCCBC0;font-size:12px;font-style:italic;",
  pad: "padding:0 34px;",
  meta: "font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;color:#8a8270;letter-spacing:1px;text-transform:uppercase;padding:16px 0 10px;",
  note: "background:#EAF0E7;border-radius:8px;padding:14px 18px;margin:4px 0 6px;font-style:italic;color:#4c5a4d;font-size:14.5px;line-height:1.6;",
  kicker: "font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 6px;",
  sec: "font-family:Arial,Helvetica,sans-serif;font-size:20px;color:#2C463B;margin:0 0 10px;",
  p: "font-size:16px;line-height:1.62;margin:0 0 14px;",
  rule: "height:1px;line-height:1px;background:#D8DED2;margin:24px 0;",
  sciVerse: "font-style:italic;color:#2C463B;font-size:13.5px;margin:0 0 10px;",
  sciBox: "background:#EFF3EC;border:1px solid #D8E2D4;border-radius:8px;padding:16px 18px;",
  sciP: "font-size:15px;line-height:1.62;margin:0 0 10px;color:#2B2B2B;",
  practice: "background:#2C463B;border-radius:8px;padding:14px 18px;margin:10px 0 0;color:#E9EFE6;font-size:14.5px;line-height:1.55;",
  practiceK: "font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#D8C58A;font-weight:bold;margin:0 0 6px;",
  peaceBox: "background:#EAF0E7;border:1px solid #CFDDC9;border-radius:10px;padding:18px 20px;",
  peaceIntro: "font-size:15.5px;line-height:1.62;color:#2C463B;margin:0 0 14px;font-style:italic;",
  rrr: "margin:0 0 8px;font-size:15px;line-height:1.5;color:#2B2B2B;",
  rrrK: "font-family:Arial,Helvetica,sans-serif;font-weight:bold;color:#B8902E;text-transform:uppercase;font-size:11px;letter-spacing:1px;",
  patternWrap: "border:1px solid #D8E2D4;border-radius:10px;overflow:hidden;",
  patternOld: "background:#F6EEE9;padding:13px 18px;font-size:15px;line-height:1.5;color:#7a5c4e;",
  patternNew: "background:#EFF3EC;padding:13px 18px;font-size:15px;line-height:1.5;color:#2C463B;",
  patternNote: "padding:10px 18px 14px;font-size:13.5px;font-style:italic;color:#6a7468;",
  lab: "background:#ffffff;border:1px solid #E0D6BF;border-radius:10px;padding:16px 20px;",
  labTitle: "font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#2C463B;margin:0 0 10px;",
  labLine: "margin:0 0 7px;font-size:15px;line-height:1.5;color:#2B2B2B;",
  labK: "font-family:Arial,Helvetica,sans-serif;font-weight:bold;color:#B8902E;font-size:12px;",
  labListen: "margin:10px 0 0;font-style:italic;color:#6a7468;font-size:14px;",
  question: "background:#FBF3DF;border:1px solid #EDD9A6;border-radius:10px;padding:18px 22px;font-family:Arial,Helvetica,sans-serif;color:#2C463B;font-size:16px;font-weight:bold;line-height:1.5;text-align:center;",
  questionK: "font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 8px;text-align:center;",
  closing: "font-style:italic;color:#2C463B;font-size:14px;text-align:center;padding:6px 6px 2px;line-height:1.6;",
  footer: "background:#2C463B;color:#a9bcae;font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;line-height:1.7;padding:26px 30px;",
};

function paras(s: string | undefined, style = S.p): string {
  const text = (s ?? "").trim();
  if (!text) return "";
  return text
    .split(/\n{2,}/)
    .map((p) => `<p style="${style}">${esc(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

const rule = `<div style="${S.rule}"></div>`;

export function renderWellnessHtml(issue: WellnessIssue): string {
  const d = issue.data;
  const metaBits = [weekdayLabel(issue.date), d.dayLabel?.trim()]
    .filter(Boolean)
    .join(" · ");

  const blocks: string[] = [];

  if (d.editorNote?.trim()) {
    blocks.push(`<div style="${S.note}">${esc(d.editorNote)}</div>`);
  }

  // The Science Behind It
  if (d.scienceBody?.trim()) {
    blocks.push(
      [
        `<div style="${S.kicker}">✦ The Science Behind It</div>`,
        d.scienceHeading?.trim() ? `<h2 style="${S.sec}">${esc(d.scienceHeading)}</h2>` : "",
        d.scienceVerse?.trim() ? `<div style="${S.sciVerse}">${esc(d.scienceVerse)}</div>` : "",
        `<div style="${S.sciBox}">${paras(d.scienceBody, S.sciP)}</div>`,
        d.sciencePractice?.trim()
          ? `<div style="${S.practice}"><div style="${S.practiceK}">Try this today</div>${esc(d.sciencePractice)}</div>`
          : "",
      ].join("")
    );
  }

  // The Peace Practice
  if (d.peaceIntro?.trim() || d.peaceRelease?.trim()) {
    blocks.push(
      [
        `<div style="${S.kicker}">🕊 The Peace Practice</div>`,
        `<div style="${S.peaceBox}">`,
        d.peaceIntro?.trim() ? `<p style="${S.peaceIntro}">${esc(d.peaceIntro)}</p>` : "",
        d.peaceRelease?.trim() ? `<p style="${S.rrr}"><span style="${S.rrrK}">Release · </span>${esc(d.peaceRelease)}</p>` : "",
        d.peaceReceive?.trim() ? `<p style="${S.rrr}"><span style="${S.rrrK}">Receive · </span>${esc(d.peaceReceive)}</p>` : "",
        d.peaceRespond?.trim() ? `<p style="${S.rrr}"><span style="${S.rrrK}">Respond · </span>${esc(d.peaceRespond)}</p>` : "",
        `</div>`,
      ].join("")
    );
  }

  // The Pattern Breaker
  if (d.patternOld?.trim() || d.patternNew?.trim()) {
    blocks.push(
      [
        `<div style="${S.kicker}">🔁 The Pattern Breaker</div>`,
        `<div style="${S.patternWrap}">`,
        d.patternOld?.trim() ? `<div style="${S.patternOld}"><strong>Old pattern:</strong> ${esc(d.patternOld)}</div>` : "",
        d.patternNew?.trim() ? `<div style="${S.patternNew}"><strong>New walk:</strong> ${esc(d.patternNew)}</div>` : "",
        d.patternNote?.trim() ? `<div style="${S.patternNote}">${esc(d.patternNote)}</div>` : "",
        `</div>`,
      ].join("")
    );
  }

  // The Prayer Lab
  if (d.prayerLabStart?.trim() || d.prayerLabName?.trim()) {
    blocks.push(
      [
        `<div style="${S.kicker}">🙏 The Prayer Lab</div>`,
        `<div style="${S.lab}">`,
        d.prayerLabTitle?.trim() ? `<div style="${S.labTitle}">${esc(d.prayerLabTitle)}</div>` : "",
        d.prayerLabStart?.trim() ? `<p style="${S.labLine}"><span style="${S.labK}">Start here · </span>${esc(d.prayerLabStart)}</p>` : "",
        d.prayerLabName?.trim() ? `<p style="${S.labLine}"><span style="${S.labK}">Name it · </span>${esc(d.prayerLabName)}</p>` : "",
        d.prayerLabSurrender?.trim() ? `<p style="${S.labLine}"><span style="${S.labK}">Surrender · </span>${esc(d.prayerLabSurrender)}</p>` : "",
        d.prayerLabAsk?.trim() ? `<p style="${S.labLine}"><span style="${S.labK}">Ask · </span>${esc(d.prayerLabAsk)}</p>` : "",
        `<p style="${S.labListen}">Listen · 30 seconds of stillness. Let Him have the last word.</p>`,
        `</div>`,
      ].join("")
    );
  }

  // A Question Worth Sitting With
  if (d.question?.trim()) {
    blocks.push(
      [
        `<div style="${S.questionK}">💭 A Question Worth Sitting With</div>`,
        `<div style="${S.question}">${esc(d.question)}</div>`,
      ].join("")
    );
  }

  const closingBlock = d.closingLine?.trim()
    ? `<div style="${S.pad}">${rule}<div style="${S.closing}">${esc(d.closingLine)}</div><div style="height:8px;line-height:8px;">&nbsp;</div></div>`
    : "";

  return `<div style="${S.outer}">
  <div style="${S.wrap}">
    <div style="${S.masthead}">
      <div style="${S.ribbon}">★ Founding Member · Bonus</div>
      <div style="${S.logo}">THE DAILY WALK</div>
      <div style="${S.title}">The Spiritual Wellness Guide</div>
      <div style="${S.tag}">steady your heart, mind &amp; walk with God</div>
    </div>
    ${metaBits ? `<div style="${S.meta}">${esc(metaBits)}</div>` : `<div style="height:14px;line-height:14px;">&nbsp;</div>`}
    <div style="${S.pad}">${blocks.join(rule)}</div>
    ${closingBlock}
    <div style="${S.footer}">
      <strong style="color:#D8C58A;">The Spiritual Wellness Guide</strong><br>
      A Founding-Member bonus from The Daily Walk · Mon · Wed · Fri.<br>
      ${esc(prettyDate(issue.date))}<br><br>
      You're receiving this as a Founding Member of The Daily Walk.<br>
      ${site.mailingAddress ? `${esc(site.mailingAddress)}<br>` : ""}
      <a href="${site.url}/account" style="color:#D8C58A;text-decoration:none;">Manage membership</a> · <a href="#" style="color:#D8C58A;text-decoration:none;">Unsubscribe</a>
    </div>
  </div>
</div>`;
}
