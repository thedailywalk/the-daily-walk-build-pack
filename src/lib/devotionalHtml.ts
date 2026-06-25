import "server-only";
import type { Devotional } from "@/lib/devotionals";
import { weekdayLabel, prettyDate } from "@/lib/devotionals";
import { site } from "@/lib/site";

function esc(s: string | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Inline styles only — NO <style> block. Email platforms (Beehiiv, Gmail, etc.)
 * strip <style> tags, so every style must live on the element. These constants
 * keep it readable while staying email-safe.
 */
const S = {
  outer: "background:#E8E2D4;padding:24px 12px;",
  wrap: "max-width:600px;margin:0 auto;background:#FAF6EE;font-family:Georgia,'Times New Roman',serif;color:#2B2B2B;border-radius:10px;overflow:hidden;",
  pad: "padding:0 34px;",
  masthead: "background:#1F3A5F;text-align:center;padding:30px 20px 24px;",
  logo: "font-family:Arial,Helvetica,sans-serif;letter-spacing:5px;font-size:13px;color:#C9A24B;font-weight:bold;",
  title: "font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:30px;font-weight:bold;margin:8px 0 4px;letter-spacing:1px;",
  tag: "font-family:Arial,Helvetica,sans-serif;color:#AFC0D6;font-size:12px;font-style:italic;",
  meta: "font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;color:#8a8270;letter-spacing:1px;text-transform:uppercase;padding:16px 0 4px;",
  week: "font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:13px;color:#1F3A5F;font-weight:bold;padding-bottom:18px;",
  kicker: "font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 6px;",
  sec: "font-family:Arial,Helvetica,sans-serif;font-size:20px;color:#1F3A5F;margin:0 0 10px;",
  p: "font-size:16px;line-height:1.62;margin:0 0 14px;",
  ref: "font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6a6452;font-weight:bold;margin:0 0 12px;",
  rule: "height:1px;line-height:1px;background:#DDD3BC;margin:26px 0;",
  verse: "border-left:4px solid #C9A24B;background:#F3ECDA;padding:14px 18px;margin:16px 0;font-style:italic;color:#1F3A5F;font-size:16px;line-height:1.55;",
  prayerBox: "background:#1F3A5F;border-radius:8px;padding:22px 24px;margin:6px 0;",
  prayerP: "color:#EDE6D4;font-style:italic;font-size:16px;line-height:1.6;margin:0;",
  healVerse: "font-family:Georgia,'Times New Roman',serif;font-style:italic;color:#1F3A5F;font-size:13.5px;margin:0 0 10px;",
  healBox: "background:#EDF2F8;border:1px solid #DCE6F0;border-radius:8px;padding:16px 18px;",
  healP: "font-size:15px;line-height:1.62;margin:0 0 10px;color:#2B2B2B;",
  question: "background:#F3ECDA;border-radius:8px;padding:16px 20px;font-family:Arial,Helvetica,sans-serif;color:#1F3A5F;font-size:15px;font-weight:bold;",
  pastor: "border:1px solid #E0D6BF;border-radius:8px;padding:6px 22px 18px;background:#ffffff;",
  pastorhead: "font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#ffffff;background:#B8902E;display:inline-block;padding:5px 12px;border-radius:0 0 6px 6px;",
  byline: "font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a8270;font-style:italic;margin:6px 0 0;",
  cta: "text-align:center;padding:6px 0 4px;",
  btn: "font-family:Arial,Helvetica,sans-serif;display:inline-block;background:#C9A24B;color:#1F3A5F;font-weight:bold;text-decoration:none;padding:13px 30px;border-radius:30px;font-size:15px;",
  closing: "font-style:italic;color:#1F3A5F;font-size:14px;text-align:center;padding:6px 6px 2px;",
  footer: "background:#1F3A5F;color:#9fb0c6;font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;line-height:1.7;padding:26px 30px;",
};

/** Escape, then split blank-line-separated text into inline-styled <p> blocks. */
function paras(s: string | undefined, style = S.p): string {
  const text = (s ?? "").trim();
  if (!text) return "";
  return text
    .split(/\n{2,}/)
    .map((p) => `<p style="${style}">${esc(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

const rule = `<div style="${S.rule}"></div>`;

/**
 * Render a devotional as the branded "issue" HTML using only inline styles —
 * safe to inject on-page, copy into Beehiiv, and serve in the RSS feed.
 */
export function renderDevotionalHtml(dev: Devotional): string {
  const d = dev.data;
  const metaBits = [weekdayLabel(dev.date), d.dayLabel?.trim()].filter(Boolean).join(" · ");

  const blocks: string[] = [];

  // Today's Reading
  blocks.push(
    [
      `<div style="${S.kicker}">Today's Reading</div>`,
      d.readingHeading?.trim() ? `<h2 style="${S.sec}">${esc(d.readingHeading)}</h2>` : "",
      d.readingRef?.trim() ? `<p style="${S.ref}">${esc(d.readingRef)}</p>` : "",
      paras(d.readingIntro),
      d.verseText?.trim()
        ? `<div style="${S.verse}">${esc(d.verseText)}${d.verseRef?.trim() ? ` — ${esc(d.verseRef)}` : ""}</div>`
        : "",
      paras(d.readingAfter),
    ].join("")
  );

  // Make It Real
  if (d.makeItRealBody?.trim() || d.question?.trim()) {
    blocks.push(
      [
        rule,
        `<div style="${S.kicker}">Make It Real</div>`,
        d.makeItRealHeading?.trim() ? `<h2 style="${S.sec}">${esc(d.makeItRealHeading)}</h2>` : "",
        paras(d.makeItRealBody),
        d.question?.trim() ? `<div style="${S.question}">${esc(d.question)}</div>` : "",
      ].join("")
    );
  }

  // Prayer
  if (d.prayer?.trim()) {
    blocks.push(
      [
        rule,
        `<div style="${S.kicker}">A Prayer for Today</div>`,
        `<div style="${S.prayerBox}">${paras(d.prayer, S.prayerP)}</div>`,
      ].join("")
    );
  }

  // How Healing Works — neuroscience-grounded, with a permanent Romans 12:2 anchor
  if (d.healingScience?.trim()) {
    blocks.push(
      [
        rule,
        `<div style="${S.kicker}">✦ How Healing Works</div>`,
        `<div style="${S.healVerse}">&ldquo;…be transformed by the renewing of your mind.&rdquo; — Romans 12:2</div>`,
        `<div style="${S.healBox}">${paras(d.healingScience, S.healP)}</div>`,
      ].join("")
    );
  }

  // Pastor's Take
  let pastorBlock = "";
  if (d.pastorTake?.trim()) {
    pastorBlock = `
      <div style="${S.pad}">${rule}<div style="${S.kicker}text-align:center;">— Midweek —</div></div>
      <div style="text-align:center;"><span style="${S.pastorhead}">Pastor's Take</span></div>
      <div style="${S.pad}"><div style="${S.pastor}">${paras(d.pastorTake)}${
        d.pastorByline?.trim() ? `<p style="${S.byline}">${esc(d.pastorByline)}</p>` : ""
      }</div></div>`;
  }

  // Community CTA
  let ctaBlock = "";
  if (d.communityText?.trim() || d.ctaUrl?.trim()) {
    ctaBlock = `
      <div style="${S.pad}">${rule}
        <div style="${S.kicker}text-align:center;">Walk together</div>
        ${d.communityText?.trim() ? `<p style="${S.p}text-align:center;">${esc(d.communityText)}</p>` : ""}
        ${
          d.ctaUrl?.trim()
            ? `<div style="${S.cta}"><a href="${esc(d.ctaUrl)}" style="${S.btn}">${esc(d.ctaLabel || "Join the conversation →")}</a></div>`
            : ""
        }
        <div style="height:18px;line-height:18px;">&nbsp;</div>
      </div>`;
  }

  const closingBlock = d.closingLine?.trim()
    ? `<div style="${S.pad}">${rule}<div style="${S.closing}">${esc(d.closingLine)}</div><div style="height:8px;line-height:8px;">&nbsp;</div></div>`
    : "";

  // Founding-member upgrade nudge (free issue → premium). Absolute link for email.
  const upsellBlock = `
    <div style="${S.pad}">${rule}
      <div style="background:#10243f;border:1px solid #C9A24B;border-radius:10px;padding:22px 24px;text-align:center;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E3C074;font-weight:bold;margin:0 0 8px;">Go deeper · Founding Member</div>
        <p style="font-family:Arial,Helvetica,sans-serif;color:#EDE6D4;font-size:15px;line-height:1.6;margin:0 0 14px;">Premium adds <strong style="color:#fff;">The Science Behind It</strong> (daily), <strong style="color:#fff;">The World This Week</strong>, and <strong style="color:#fff;">The Weekend Study</strong> — and Founding Members lock in <strong style="color:#fff;">$5.99/mo for life</strong> and get the full platform (guided Bible-in-a-Year, audio, your dashboard &amp; community) free when it launches.</p>
        <a href="${site.url}/pricing" style="${S.btn}">Become a Founding Member →</a>
      </div>
      <div style="height:14px;line-height:14px;">&nbsp;</div>
    </div>`;

  return `<div style="${S.outer}">
  <div style="${S.wrap}">
    <div style="${S.masthead}">
      <div style="${S.logo}">DAILY DEVOTIONAL</div>
      <div style="${S.title}">The Daily Walk</div>
      <div style="${S.tag}">walking with God in real life</div>
    </div>
    ${metaBits ? `<div style="${S.meta}">${esc(metaBits)}</div>` : ""}
    ${d.weekFocus?.trim() ? `<div style="${S.week}">This Week's Focus: ${esc(d.weekFocus)}</div>` : `<div style="height:8px;line-height:8px;">&nbsp;</div>`}
    <div style="${S.pad}">${blocks.join("")}</div>
    ${pastorBlock}
    ${ctaBlock}
    ${closingBlock}
    ${upsellBlock}
    <div style="${S.footer}">
      <strong style="color:#C9A24B;">The Daily Walk</strong><br>
      A daily guide for walking with God in real life.<br>
      ${esc(prettyDate(dev.date))}<br><br>
      You're receiving this because you signed up at thedailywalknewsletter.com.<br>
      <a href="#" style="color:#C9A24B;text-decoration:none;">Update preferences</a> · <a href="#" style="color:#C9A24B;text-decoration:none;">Unsubscribe</a>
    </div>
  </div>
</div>`;
}
