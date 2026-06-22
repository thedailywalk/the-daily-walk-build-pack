import "server-only";
import type { Devotional } from "@/lib/devotionals";
import { weekdayLabel, prettyDate } from "@/lib/devotionals";

function esc(s: string | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escape, then split blank-line-separated text into <p> blocks (single \n → <br>). */
function paras(s: string | undefined, cls = ""): string {
  const text = (s ?? "").trim();
  if (!text) return "";
  const c = cls ? ` class="${cls}"` : "";
  return text
    .split(/\n{2,}/)
    .map((p) => `<p${c}>${esc(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

const STYLE = `
.tdw-issue{background:#E8E2D4;padding:24px 12px;}
.tdw-issue *{box-sizing:border-box;}
.tdw-issue .wrap{max-width:600px;margin:0 auto;background:#FAF6EE;font-family:Georgia,'Times New Roman',serif;color:#2B2B2B;border-radius:10px;overflow:hidden;}
.tdw-issue .pad{padding:0 34px;}
.tdw-issue a{color:#9A7723;}
.tdw-issue .masthead{background:#1F3A5F;text-align:center;padding:30px 20px 24px;}
.tdw-issue .logo{font-family:Arial,Helvetica,sans-serif;letter-spacing:5px;font-size:13px;color:#C9A24B;font-weight:bold;}
.tdw-issue .title{font-family:Arial,Helvetica,sans-serif;color:#fff;font-size:30px;font-weight:bold;margin:8px 0 4px;letter-spacing:1px;}
.tdw-issue .tag{font-family:Arial,Helvetica,sans-serif;color:#AFC0D6;font-size:12px;font-style:italic;}
.tdw-issue .meta{font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;color:#8a8270;letter-spacing:1px;text-transform:uppercase;padding:16px 0 4px;}
.tdw-issue .week{font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:13px;color:#1F3A5F;font-weight:bold;padding-bottom:18px;}
.tdw-issue .kicker{font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 6px;}
.tdw-issue h2.sec{font-family:Arial,Helvetica,sans-serif;font-size:20px;color:#1F3A5F;margin:0 0 10px;}
.tdw-issue p{font-size:16px;line-height:1.62;}
.tdw-issue .ref{font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6a6452;font-weight:bold;}
.tdw-issue .rule{height:1px;background:#DDD3BC;margin:26px 0;}
.tdw-issue .verse{border-left:4px solid #C9A24B;background:#F3ECDA;padding:14px 18px;margin:16px 0;font-style:italic;color:#1F3A5F;font-size:16px;line-height:1.55;}
.tdw-issue .prayer{background:#1F3A5F;color:#F3ECDA;border-radius:8px;padding:22px 24px;margin:6px 0;}
.tdw-issue .prayer p{color:#EDE6D4;font-style:italic;font-size:16px;line-height:1.6;margin:0;}
.tdw-issue .question{background:#F3ECDA;border-radius:8px;padding:16px 20px;font-family:Arial,Helvetica,sans-serif;color:#1F3A5F;font-size:15px;font-weight:bold;}
.tdw-issue .pastor{border:1px solid #E0D6BF;border-radius:8px;padding:6px 22px 18px;background:#fff;}
.tdw-issue .pastorhead{font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#fff;background:#B8902E;display:inline-block;padding:5px 12px;border-radius:0 0 6px 6px;}
.tdw-issue .byline{font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a8270;font-style:italic;}
.tdw-issue .cta{text-align:center;padding:6px 0 4px;}
.tdw-issue .btn{font-family:Arial,Helvetica,sans-serif;display:inline-block;background:#C9A24B;color:#1F3A5F;font-weight:bold;text-decoration:none;padding:13px 30px;border-radius:30px;font-size:15px;}
.tdw-issue .closing{font-style:italic;color:#1F3A5F;font-size:14px;text-align:center;padding:6px 6px 2px;}
.tdw-issue .footer{background:#1F3A5F;color:#9fb0c6;font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;line-height:1.7;padding:26px 30px;}
.tdw-issue .footer a{color:#C9A24B;text-decoration:none;}
`;

/**
 * Render a devotional as the branded "issue" HTML (matches the sample). Scoped
 * under .tdw-issue so it's safe to inject on-page and to copy into Beehiiv.
 */
export function renderDevotionalHtml(dev: Devotional): string {
  const d = dev.data;
  const metaBits = [weekdayLabel(dev.date), d.dayLabel?.trim()]
    .filter(Boolean)
    .join(" · ");

  const rule = `<div class="rule"></div>`;
  const blocks: string[] = [];

  // Today's Reading
  const readingInner = [
    `<div class="kicker">Today's Reading</div>`,
    d.readingHeading?.trim()
      ? `<h2 class="sec">${esc(d.readingHeading)}</h2>`
      : "",
    d.readingRef?.trim() ? `<p class="ref">${esc(d.readingRef)}</p>` : "",
    paras(d.readingIntro),
    d.verseText?.trim()
      ? `<div class="verse">${esc(d.verseText)}${
          d.verseRef?.trim() ? ` — ${esc(d.verseRef)}` : ""
        }</div>`
      : "",
    paras(d.readingAfter),
  ].join("");
  blocks.push(readingInner);

  // Make It Real
  if (d.makeItRealBody?.trim() || d.question?.trim()) {
    blocks.push(
      [
        rule,
        `<div class="kicker">Make It Real</div>`,
        d.makeItRealHeading?.trim()
          ? `<h2 class="sec">${esc(d.makeItRealHeading)}</h2>`
          : "",
        paras(d.makeItRealBody),
        d.question?.trim()
          ? `<div class="question">${esc(d.question)}</div>`
          : "",
      ].join("")
    );
  }

  // Prayer
  if (d.prayer?.trim()) {
    blocks.push(
      [
        rule,
        `<div class="kicker">A Prayer for Today</div>`,
        `<div class="prayer">${paras(d.prayer)}</div>`,
      ].join("")
    );
  }

  // Pastor's Take
  let pastorBlock = "";
  if (d.pastorTake?.trim()) {
    pastorBlock = `
      <div class="pad">${rule}<div class="kicker" style="text-align:center;">— Midweek —</div></div>
      <div style="text-align:center;"><span class="pastorhead">Pastor's Take</span></div>
      <div class="pad"><div class="pastor">${paras(d.pastorTake)}${
      d.pastorByline?.trim() ? `<p class="byline">${esc(d.pastorByline)}</p>` : ""
    }</div></div>`;
  }

  // Community CTA
  let ctaBlock = "";
  if (d.communityText?.trim() || d.ctaUrl?.trim()) {
    ctaBlock = `
      <div class="pad">${rule}
        <div class="kicker" style="text-align:center;">Walk together</div>
        ${d.communityText?.trim() ? `<p style="text-align:center;">${esc(d.communityText)}</p>` : ""}
        ${
          d.ctaUrl?.trim()
            ? `<div class="cta"><a href="${esc(d.ctaUrl)}" class="btn">${esc(
                d.ctaLabel || "Join the conversation →"
              )}</a></div>`
            : ""
        }
        <div style="height:18px;"></div>
      </div>`;
  }

  const closingBlock = d.closingLine?.trim()
    ? `<div class="pad">${rule}<div class="closing">${esc(d.closingLine)}</div><div style="height:8px;"></div></div>`
    : "";

  return `<div class="tdw-issue"><style>${STYLE}</style>
  <div class="wrap">
    <div class="masthead">
      <div class="logo">DAILY DEVOTIONAL</div>
      <div class="title">The Daily Walk</div>
      <div class="tag">walking with God in real life</div>
    </div>
    ${metaBits ? `<div class="meta">${esc(metaBits)}</div>` : ""}
    ${d.weekFocus?.trim() ? `<div class="week">This Week's Focus: ${esc(d.weekFocus)}</div>` : `<div style="height:8px;"></div>`}
    <div class="pad">${blocks.join("")}</div>
    ${pastorBlock}
    ${ctaBlock}
    ${closingBlock}
    <div class="footer">
      <strong style="color:#C9A24B;">The Daily Walk</strong><br>
      A daily guide for walking with God in real life.<br>
      ${esc(prettyDate(dev.date))}<br><br>
      You're receiving this because you signed up at thedailywalknewsletter.com.<br>
      <a href="#">Update preferences</a> · <a href="#">Unsubscribe</a>
    </div>
  </div>
</div>`;
}
