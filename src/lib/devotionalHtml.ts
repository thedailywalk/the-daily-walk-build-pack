import "server-only";
import type { Devotional } from "@/lib/devotionals";
import type { GoodNewsItem } from "@/lib/content";
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
  ref: "font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6a6452;font-weight:bold;margin:0 0 8px;",
  readInvite: "font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:14.5px;color:#3f3a2c;line-height:1.55;margin:0 0 14px;",
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

/** The "Good News · 3 reasons for hope" grid — branded, email-safe cards. */
function goodNewsBlock(items: GoodNewsItem[]): string {
  const list = (items ?? []).slice(0, 3);
  if (!list.length) return "";
  const cards = list
    .map((g) => {
      const tile = g.image
        ? `<img src="${esc(g.image)}" alt="" style="width:100%;height:96px;object-fit:cover;display:block;">`
        : `<div style="height:96px;background:linear-gradient(135deg,#1F3A5F 0%,#2E5481 55%,#C9A24B 100%);"></div>`;
      const credit = g.image && g.imageCredit
        ? `<span style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:8px;color:#b3ab97;margin:6px 0 0;line-height:1.35;">Photo: ${esc(g.imageCredit)}</span>`
        : "";
      return `<a href="${esc(g.href)}" style="display:inline-block;vertical-align:top;width:31%;margin:0 1% 10px;border:1px solid #E4DAC4;border-radius:10px;overflow:hidden;background:#ffffff;text-decoration:none;color:inherit;">${tile}<div style="padding:10px 11px 11px;">${
        g.category
          ? `<span style="font-family:Arial,Helvetica,sans-serif;font-size:8.5px;letter-spacing:1px;text-transform:uppercase;color:#B8902E;border:1px solid #E3C786;padding:2px 7px;border-radius:20px;font-weight:700;">${esc(g.category)}</span>`
          : ""
      }<div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1F3A5F;font-weight:700;line-height:1.28;margin:8px 0 6px;">${esc(g.headline)}</div>${
        g.summary
          ? `<p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#5b5340;line-height:1.5;margin:0 0 7px;">${esc(g.summary)}</p>`
          : ""
      }<span style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;color:#8a8270;">${esc(g.source)}</span><span style="display:inline-block;margin-top:3px;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:.5px;text-transform:uppercase;color:#B8902E;font-weight:700;">Read more →</span>${credit}</div></a>`;
    })
    .join("");
  return `<div style="${S.pad}">${rule}
      <div style="${S.kicker}">Good News</div>
      <h2 style="${S.sec}">3 reasons for hope from around the world</h2>
      <p style="${S.ref}">Real stories · real sources · tap any headline for the full article.</p>
      <div style="text-align:center;font-size:0;">${cards}</div>
      <div style="${S.closing}">Even when the world feels heavy, God is still moving. Keep your eyes open today.</div>
      <div style="height:14px;line-height:14px;">&nbsp;</div>
    </div>`;
}

/**
 * Render a devotional as the branded "issue" HTML using only inline styles —
 * safe to inject on-page, copy into Beehiiv, and serve in the RSS feed. Pass the
 * day's Good News stories to include the "3 reasons for hope" grid.
 */
export function renderDevotionalHtml(dev: Devotional, goodNews: GoodNewsItem[] = []): string {
  const d = dev.data;
  const metaBits = [weekdayLabel(dev.date), d.dayLabel?.trim()].filter(Boolean).join(" · ");

  const blocks: string[] = [];

  // Today's Reading
  blocks.push(
    [
      `<div style="${S.kicker}">Today's Reading</div>`,
      d.readingHeading?.trim() ? `<h2 style="${S.sec}">${esc(d.readingHeading)}</h2>` : "",
      d.readingRef?.trim()
        ? `<p style="${S.readInvite}">Open your Bible if you can — or let today's devotional walk you through it.</p>`
        : "",
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

  // Founding-member upgrade nudge (free issue → the one paid tier). Absolute link for email.
  const upsellBlock = `
    <div style="${S.pad}">${rule}
      <div style="background:#10243f;border:1px solid #C9A24B;border-radius:10px;padding:22px 24px;text-align:center;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E3C074;font-weight:bold;margin:0 0 8px;">Go deeper · Founding Member</div>
        <p style="font-family:Arial,Helvetica,sans-serif;color:#EDE6D4;font-size:15px;line-height:1.6;margin:0 0 14px;">You&apos;re reading the free edition (Mon · Wed · Fri). Founding Members get <strong style="color:#fff;">the devotional every day</strong>, the deeper <strong style="color:#fff;">Deeper Walk</strong> discipleship newsletter, and the full <strong style="color:#fff;">Spiritual Wellness Guide</strong> — everything, in one membership. Lock in <strong style="color:#fff;">$5.99/mo (or $59/yr)</strong> for life.</p>
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
    ${goodNewsBlock(goodNews)}
    ${closingBlock}
    ${upsellBlock}
    <div style="${S.footer}">
      <strong style="color:#C9A24B;">The Daily Walk</strong><br>
      Encouragement three mornings a week — Monday, Wednesday &amp; Friday.<br>
      Missed one? Don't restart — just pick up where you left off.<br>
      ${esc(prettyDate(dev.date))}<br><br>
      <a href="${site.url}" style="color:#C9A24B;text-decoration:none;">Today's full plan</a> · <a href="${site.url}/community" style="color:#C9A24B;text-decoration:none;">Community</a> · <a href="${site.url}/subscribe" style="color:#C9A24B;text-decoration:none;">Forward to a friend</a><br><br>
      You're receiving this because you signed up at thedailywalknewsletter.com.<br>
      ${site.mailingAddress ? `${esc(site.mailingAddress)}<br>` : ""}
      <a href="#" style="color:#C9A24B;text-decoration:none;">Update preferences</a> · <a href="#" style="color:#C9A24B;text-decoration:none;">Unsubscribe</a><br><br>
      <span style="color:#6f83a0;font-size:10.5px;line-height:1.6;">${esc(site.scriptureNotice)}</span>
    </div>
  </div>
</div>`;
}
