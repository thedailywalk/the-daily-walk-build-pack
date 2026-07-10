import "server-only";
import type { Devotional } from "@/lib/devotionals";
import type { GoodNewsItem } from "@/lib/content";
import { weekdayLabel } from "@/lib/devotionals";
import { site } from "@/lib/site";
import { verseCardImage } from "@/lib/verseCards";
import { stateChapters } from "@/lib/fullBookRefs";

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
  weekK: "font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;padding:6px 0 3px;",
  week: "font-family:Georgia,'Times New Roman',serif;font-style:italic;text-align:center;font-size:14.5px;color:#1F3A5F;padding:0 34px 18px;line-height:1.5;",
  kicker: "font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 6px;",
  sec: "font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#1F3A5F;margin:0 0 6px;",
  p: "font-size:16px;line-height:1.62;margin:0 0 14px;",
  ref: "font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6a6452;font-weight:bold;margin:0 0 12px;",
  readInvite: "font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:13.5px;color:#6a6452;line-height:1.5;margin:0 0 8px;",
  rule: "height:1px;line-height:1px;background:#DDD3BC;margin:26px 0;",
  verse: "border-left:4px solid #C9A24B;background:#F3ECDA;padding:14px 18px;margin:16px 0;font-style:italic;color:#1F3A5F;font-size:16px;line-height:1.55;",
  keyword: "background:#ffffff;border:1px solid #E0D6BF;border-radius:8px;padding:14px 18px;margin:6px 0 4px;font-size:14.5px;line-height:1.55;color:#2B2B2B;",
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

/** Good News — ONE real story of hope (mirrors the premium "Glimpse"). */
function goodNewsBlock(items: GoodNewsItem[]): string {
  const list = items ?? [];
  // Prefer a story with a verified free (Wikimedia Commons) photo so the card
  // always leads with a real, license-cleared picture.
  const g = list.find((i) => i.image?.trim()) ?? list[0];
  if (!g) return "";
  const tile = g.image
    ? `<img src="${esc(g.image)}" alt="" style="width:100%;height:150px;object-fit:cover;display:block;">`
    : `<div style="height:120px;background:linear-gradient(135deg,#1F3A5F 0%,#2E5481 55%,#C9A24B 100%);"></div>`;
  const credit = g.image && g.imageCredit
    ? `<span style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:8.5px;color:#b3ab97;margin:8px 0 0;line-height:1.35;">Photo: ${esc(g.imageCredit)}</span>`
    : "";
  const card = `<a href="${esc(g.href)}" style="display:block;border:1px solid #E4DAC4;border-radius:10px;overflow:hidden;background:#ffffff;text-decoration:none;color:inherit;">${tile}<div style="padding:14px 18px 16px;">${
    g.category
      ? `<span style="font-family:Arial,Helvetica,sans-serif;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#B8902E;border:1px solid #E3C786;padding:2px 8px;border-radius:20px;font-weight:700;">${esc(g.category)}</span>`
      : ""
  }<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1F3A5F;font-weight:700;line-height:1.32;margin:9px 0 6px;">${esc(g.headline)}</div>${
    g.summary
      ? `<p style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#5b5340;line-height:1.55;margin:0 0 8px;">${esc(g.summary)}</p>`
      : ""
  }<span style="display:block;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#8a8270;">${esc(g.source)}</span><span style="display:inline-block;margin-top:4px;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.5px;text-transform:uppercase;color:#B8902E;font-weight:700;">Read the full story →</span>${credit}</div></a>`;
  return `<div style="${S.pad}">${rule}
      <div style="${S.kicker}">Good News</div>
      <div style="${S.sec}">One reason for hope today</div>
      ${card}
      <div style="${S.closing}">One real story — a small reminder God is still moving in ordinary people.</div>
      <div style="height:14px;line-height:14px;">&nbsp;</div>
    </div>`;
}

/**
 * Render a devotional as the branded "issue" HTML using only inline styles —
 * safe to inject on-page, copy into Beehiiv, and serve in the RSS feed. Pass the
 * day's Good News stories — the issue features ONE story of hope.
 */
export function renderDevotionalHtml(
  dev: Devotional,
  goodNews: GoodNewsItem[] = [],
  // "email" keeps the list-management footer; "web" (the public /today share
  // page) swaps it for a subscribe invite so a texted link opens to no dead links.
  audience: "email" | "web" = "email"
): string {
  const d = dev.data;
  // Weekday + optional day label — but if the label already starts with the
  // weekday (e.g. "Saturday · July 4"), don't repeat it.
  const wd = weekdayLabel(dev.date);
  const dl = d.dayLabel?.trim() || "";
  const metaBits = dl
    ? dl.toLowerCase().startsWith(wd.toLowerCase())
      ? dl
      : `${wd} · ${dl}`
    : wd;
  // The focus is sometimes written as "This week: …" — strip it so the
  // rendered "This Week's Focus:" prefix doesn't double up.
  const wfRaw = (d.weekFocus ?? "").trim().replace(/^this week:\s*/i, "");
  const weekFocus = wfRaw ? wfRaw.charAt(0).toUpperCase() + wfRaw.slice(1) : "";

  const blocks: string[] = [];

  // Today's Reading
  blocks.push(
    [
      `<div style="${S.kicker}">Today's Reading</div>`,
      d.readingHeading?.trim() ? `<div style="${S.sec}">${esc(d.readingHeading)}</div>` : "",
      d.readingRef?.trim()
        ? `<div style="${S.readInvite}">Open your Bible if you can — or let today's devotional walk you through it.</div>`
        : "",
      d.readingRef?.trim() ? `<div style="${S.ref}">${esc(d.readingRef)}</div>` : "",
      paras(stateChapters(d.readingIntro, d.readingRef)),
      d.verseText?.trim()
        ? `<div style="${S.verse}">${esc(d.verseText)}${d.verseRef?.trim() ? ` — ${esc(d.verseRef)}` : ""}</div>`
        : "",
      paras(stateChapters(d.readingAfter, d.readingRef)),
      d.keyWord?.trim()
        ? `<div style="${S.kicker}margin-top:16px;">Key word</div><div style="${S.keyword}">${esc(d.keyWord)}</div>`
        : "",
    ].join("")
  );

  // Make It Real
  if (d.makeItRealBody?.trim() || d.question?.trim()) {
    blocks.push(
      [
        rule,
        `<div style="${S.kicker}">Make It Real</div>`,
        d.makeItRealHeading?.trim() ? `<div style="${S.sec}">${esc(d.makeItRealHeading)}</div>` : "",
        paras(stateChapters(d.makeItRealBody, d.readingRef)),
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

  // Save & share — a branded verse image readers can post or text to a friend.
  // Prefer the hand-made annotated card for the day; fall back to the dynamic one.
  if (d.verseText?.trim()) {
    const cardUrl =
      verseCardImage("free", dev.date, site.url) ??
      `${site.url}/api/verse-card?t=${encodeURIComponent(d.verseText)}${d.verseRef?.trim() ? `&r=${encodeURIComponent(d.verseRef)}` : ""}`;
    blocks.push(
      [
        rule,
        `<div style="${S.kicker}">Save &amp; share</div>`,
        `<div style="text-align:center;"><a href="${cardUrl}" style="text-decoration:none;"><img src="${cardUrl}" alt="${esc(d.verseText)}" width="340" style="width:340px;max-width:88%;border-radius:14px;border:1px solid #E4DAC4;display:inline-block;"></a><div style="font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#8a8270;margin-top:8px;">Tap the card to open it full-size — then save it and share it with someone who needs it.</div><div style="margin-top:12px;"><a href="${site.instagramUrl}" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#B8902E;text-decoration:none;">&#128247; Follow along on Instagram &middot; ${site.instagramHandle} &rarr;</a></div></div>`,
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
        <div style="font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:19px;font-weight:bold;line-height:1.3;margin:0 0 10px;">Want the full daily Deeper Walk?</div>
        <p style="font-family:Arial,Helvetica,sans-serif;color:#EDE6D4;font-size:15px;line-height:1.6;margin:0 0 10px;">Founding Members receive the devotional <strong style="color:#fff;">every day</strong>, plus the <strong style="color:#fff;">daily Scripture breakdown</strong>, deeper <strong style="color:#fff;">Bible teaching</strong>, <strong style="color:#fff;">Heart Check</strong>, <strong style="color:#fff;">Journal With God</strong>, <strong style="color:#fff;">Spiritual Wellness Guide</strong>, and <strong style="color:#fff;">Pray the Word</strong> sections. Lock in <strong style="color:#fff;">$5.99/mo (or $59/yr)</strong> for life.</p>
        <p style="font-family:Arial,Helvetica,sans-serif;color:#AFC0D6;font-size:13.5px;font-style:italic;line-height:1.55;margin:0 0 14px;">Free readers get The Daily Walk 3&times;/week. Founding Members walk deeper every day.</p>
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
    ${weekFocus ? `<div style="${S.weekK}">This Week&rsquo;s Focus</div><div style="${S.week}">${esc(weekFocus)}</div>` : `<div style="height:8px;line-height:8px;">&nbsp;</div>`}
    <div style="${S.pad}">${blocks.join("")}</div>
    ${pastorBlock}
    ${ctaBlock}
    ${goodNewsBlock(goodNews)}
    ${closingBlock}
    ${upsellBlock}
    <div style="${S.footer}">
      <strong style="color:#C9A24B;">The Daily Walk</strong><br>
      Encouragement three mornings a week — Monday, Wednesday &amp; Friday.<br><br>
      <a href="${site.url}" style="color:#C9A24B;text-decoration:none;">Today's full plan</a> · <a href="${site.url}/community" style="color:#C9A24B;text-decoration:none;">Community</a> · <a href="${site.url}/subscribe" style="color:#C9A24B;text-decoration:none;">Forward to a friend</a><br><br>
      ${
        audience === "web"
          ? `This is today's free issue — it lands in inboxes every morning.<br>
      <a href="${site.url}/subscribe" style="color:#C9A24B;text-decoration:none;font-weight:bold;">Get The Daily Walk in your inbox — free →</a><br><br>`
          : `You're receiving this because you signed up at thedailywalknewsletter.com.<br>
      ${site.mailingAddress ? `${esc(site.mailingAddress)}<br>` : ""}
      <a href="#" style="color:#C9A24B;text-decoration:none;">Update preferences</a> · <a href="#" style="color:#C9A24B;text-decoration:none;">Unsubscribe</a><br><br>`
      }
      <span style="color:#6f83a0;font-size:10.5px;line-height:1.6;">${esc(site.scriptureNotice)}</span>
    </div>
  </div>
</div>`;
}
