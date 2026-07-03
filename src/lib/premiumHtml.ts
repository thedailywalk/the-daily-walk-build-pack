import "server-only";
import type { PremiumIssue } from "@/lib/premium";
import { weekdayLabel, prettyDate } from "@/lib/premium";
import type { GoodNewsItem } from "@/lib/content";
import { site } from "@/lib/site";

function esc(s: string | undefined): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * The Deeper Walk (Premium Discipleship Newsletter) — inline styles only
 * (email-safe). Shares The Daily Walk palette with a "Founding Member" crown.
 */
const S = {
  outer: "background:#10243f;padding:24px 12px;",
  wrap: "max-width:600px;margin:0 auto;background:#FAF6EE;font-family:Georgia,'Times New Roman',serif;color:#2B2B2B;border-radius:10px;overflow:hidden;border:1px solid #C9A24B;",
  pad: "padding:0 34px;",
  masthead: "background:#1F3A5F;text-align:center;padding:28px 20px 22px;border-bottom:3px solid #C9A24B;",
  ribbon: "font-family:Arial,Helvetica,sans-serif;display:inline-block;background:#C9A24B;color:#1F3A5F;font-weight:bold;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:20px;margin-bottom:10px;",
  logo: "font-family:Arial,Helvetica,sans-serif;letter-spacing:5px;font-size:12px;color:#C9A24B;font-weight:bold;",
  title: "font-family:Arial,Helvetica,sans-serif;color:#ffffff;font-size:28px;font-weight:bold;margin:8px 0 4px;letter-spacing:1px;",
  tag: "font-family:Arial,Helvetica,sans-serif;color:#AFC0D6;font-size:12px;font-style:italic;",
  meta: "font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;color:#8a8270;letter-spacing:1px;text-transform:uppercase;padding:16px 0 4px;",
  week: "font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:13px;color:#1F3A5F;font-weight:bold;padding-bottom:18px;",
  note: "background:#F3ECDA;border-radius:8px;padding:14px 18px;margin:4px 0 6px;font-style:italic;color:#5b5340;font-size:14.5px;line-height:1.6;",
  kicker: "font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 6px;",
  sec: "font-family:Arial,Helvetica,sans-serif;font-size:21px;color:#1F3A5F;margin:0 0 10px;",
  p: "font-size:16px;line-height:1.62;margin:0 0 14px;",
  ref: "font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6a6452;font-weight:bold;margin:0 0 8px;",
  readInvite: "font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:14.5px;color:#3f3a2c;line-height:1.55;margin:0 0 14px;",
  rule: "height:1px;line-height:1px;background:#DDD3BC;margin:26px 0;",
  verse: "border-left:4px solid #C9A24B;background:#F3ECDA;padding:14px 18px;margin:16px 0;font-style:italic;color:#1F3A5F;font-size:16px;line-height:1.55;",
  keyword: "background:#ffffff;border:1px solid #E0D6BF;border-radius:8px;padding:14px 18px;margin:0 0 12px;font-size:14.5px;line-height:1.55;color:#2B2B2B;",
  apply: "background:#EDF2F8;border:1px solid #DCE6F0;border-radius:8px;padding:14px 18px;margin:0 0 12px;font-size:15px;line-height:1.55;color:#2B2B2B;",
  applyK: "font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 6px;",
  question: "background:#F3ECDA;border-radius:8px;padding:16px 20px;font-family:Arial,Helvetica,sans-serif;color:#1F3A5F;font-size:15px;font-weight:bold;",
  reflect: "text-align:center;font-style:italic;color:#5b5340;font-size:15.5px;line-height:1.62;border-top:1px solid #E4DAC4;border-bottom:1px solid #E4DAC4;padding:15px 14px;margin:18px 0;",
  reflectK: "font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;display:block;margin:0 0 6px;",
  share: "background:#F3ECDA;border-radius:10px;padding:20px 24px;text-align:center;",
  shareP: "font-size:15px;line-height:1.6;color:#4a4636;margin:0 0 14px;",
  founder: "background:#ffffff;border:1px solid #E0D6BF;border-radius:10px;padding:18px 22px;",
  founderP: "font-size:14.5px;line-height:1.6;color:#3c3830;margin:0;",
  prayerBox: "background:#1F3A5F;border-radius:8px;padding:20px 22px;margin:6px 0;",
  prayerP: "color:#EDE6D4;font-style:italic;font-size:16px;line-height:1.6;margin:0;",
  worldIntro: "font-size:15px;line-height:1.6;color:#5b5340;font-style:italic;margin:0 0 16px;",
  story: "background:#ffffff;border:1px solid #E6DECB;border-left:4px solid #C9A24B;border-radius:8px;padding:14px 18px 4px;margin:0 0 14px;",
  storyLabel: "font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 4px;",
  storyP: "font-size:15px;line-height:1.6;margin:0 0 12px;color:#2B2B2B;",
  storyPray: "background:#1F3A5F;border-radius:6px;padding:11px 15px;margin:2px 0 12px;color:#EDE6D4;font-size:14px;line-height:1.55;",
  bright: "background:#FBF3DF;border:1px solid #EDD9A6;border-radius:10px;padding:16px 20px 6px;margin:6px 0 0;",
  brightK: "font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 8px;",
  brightP: "font-size:14.5px;line-height:1.6;margin:0 0 10px;color:#4a4636;",
  circle: "background:#10243f;border:1px solid #C9A24B;border-radius:10px;padding:22px 24px;",
  circleK: "font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E3C074;font-weight:bold;margin:0 0 8px;",
  circleP: "font-family:Arial,Helvetica,sans-serif;color:#EDE6D4;font-size:15px;line-height:1.62;margin:0 0 14px;",
  cta: "text-align:center;padding:6px 0 4px;",
  btn: "font-family:Arial,Helvetica,sans-serif;display:inline-block;background:#C9A24B;color:#1F3A5F;font-weight:bold;text-decoration:none;padding:13px 30px;border-radius:30px;font-size:15px;",
  closing: "font-style:italic;color:#1F3A5F;font-size:14px;text-align:center;padding:6px 6px 2px;line-height:1.6;",
  footer: "background:#1F3A5F;color:#9fb0c6;font-family:Arial,Helvetica,sans-serif;text-align:center;font-size:12px;line-height:1.7;padding:26px 30px;",
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

/** The 3 Good News cards — free, license-cleared photos, summaries, and links. */
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
  return [
    `<div style="${S.kicker}">Good News</div>`,
    `<h2 style="${S.sec}">3 reasons for hope from around the world</h2>`,
    `<p style="${S.ref}">Real stories · real sources · tap any headline for the full article.</p>`,
    `<div style="text-align:center;font-size:0;">${cards}</div>`,
    `<div style="${S.closing}">Even when the world feels heavy, God is still moving. Keep your eyes open today.</div>`,
  ].join("");
}

/** A reflective "pause & reflect" pull-line to sit with mid-read (premium only). */
function pauseLine(text?: string): string {
  if (!text?.trim()) return "";
  return `<div style="${S.reflect}"><span style="${S.reflectK}">Pause &amp; reflect</span>${esc(text)}</div>`;
}

/**
 * Render a premium (discipleship) issue as branded email HTML (inline styles).
 * Pass the day's Good News so the premium issue carries the same 3-story
 * briefing (with free photos + links) as the free daily.
 */
export function renderPremiumHtml(issue: PremiumIssue, goodNews: GoodNewsItem[] = []): string {
  const d = issue.data;
  const metaBits = [weekdayLabel(issue.date), d.dayLabel?.trim()]
    .filter(Boolean)
    .join(" · ");

  const blocks: string[] = [];

  // Founder's note
  if (d.editorNote?.trim()) {
    blocks.push(`<div style="${S.note}">${esc(d.editorNote)}</div>`);
  }

  // The Main Premium Devotional — daily, deeper
  if (d.devBody?.trim() || d.devIntro?.trim() || d.devHeading?.trim()) {
    blocks.push(
      [
        `<div style="${S.kicker}">Today's Deeper Walk</div>`,
        d.devHeading?.trim() ? `<h2 style="${S.sec}">${esc(d.devHeading)}</h2>` : "",
        d.devRef?.trim()
          ? `<p style="${S.readInvite}">Open your Bible if you can — or let today's reflection walk you through it.</p>`
          : "",
        d.devRef?.trim() ? `<p style="${S.ref}">${esc(d.devRef)}</p>` : "",
        paras(d.devIntro),
        d.devVerseText?.trim()
          ? `<div style="${S.verse}">${esc(d.devVerseText)}${d.devVerseRef?.trim() ? ` — ${esc(d.devVerseRef)}` : ""}</div>`
          : "",
        paras(d.devBody),
        pauseLine(d.devPause),
        d.devKeyWord?.trim()
          ? `<div style="${S.keyword}"><strong>Key word — </strong>${esc(d.devKeyWord)}</div>`
          : "",
        d.devApply?.trim()
          ? `<div style="${S.apply}"><div style="${S.applyK}">Today's walk</div>${esc(d.devApply)}</div>`
          : "",
        d.devReflection?.trim()
          ? `<div style="${S.question}">${esc(d.devReflection.startsWith("👉") ? d.devReflection : `👉 ${d.devReflection}`)}</div>`
          : "",
      ].join("")
    );
  }

  // Prayer
  if (d.devPrayer?.trim()) {
    blocks.push(
      [
        `<div style="${S.kicker}">A Prayer for Today</div>`,
        `<div style="${S.prayerBox}">${paras(d.devPrayer, S.prayerP)}</div>`,
      ].join("")
    );
  }

  // The Weekend Study — Saturdays
  if (d.studyBody?.trim()) {
    blocks.push(
      [
        `<div style="${S.kicker}">📖 The Weekend Study</div>`,
        d.studyHeading?.trim() ? `<h2 style="${S.sec}">${esc(d.studyHeading)}</h2>` : "",
        d.studyRef?.trim() ? `<p style="${S.ref}">${esc(d.studyRef)}</p>` : "",
        paras(d.studyBody),
        pauseLine(d.studyPause),
        d.studyKeyWord?.trim()
          ? `<div style="${S.keyword}"><strong>Key word — </strong>${esc(d.studyKeyWord)}</div>`
          : "",
        d.studyVerse?.trim() ? `<div style="${S.verse}">${esc(d.studyVerse)}</div>` : "",
        d.studyQuestion?.trim() ? `<div style="${S.question}">${esc(d.studyQuestion)}</div>` : "",
      ].join("")
    );
  }

  // Good News — the same 3-story briefing (photos + links) as the free daily.
  const gn = goodNewsBlock(goodNews);
  if (gn) blocks.push(gn);

  // Walk together — the community platform isn't live yet, so the best way to
  // walk together right now is to bring someone with you: share it, free.
  const shareUrl = site.beehiiv?.subscribeUrl?.trim() || `${site.url}/subscribe`;
  blocks.push(
    [
      `<div style="${S.kicker}" >Walk together</div>`,
      `<div style="${S.share}">`,
      `<p style="${S.shareP}">You weren't meant to do this alone. The community space is still being built — so for now, the best way to walk together is to bring someone with you. Know someone who could use a little hope each morning? Send them today's issue — it's completely free to start.</p>`,
      `<div style="${S.cta}"><a href="${esc(shareUrl)}" style="${S.btn}">Share it free with a friend →</a></div>`,
      `</div>`,
    ].join("")
  );

  // From the founders — a real, personal way to reach the family behind this.
  blocks.push(
    [
      `<div style="${S.kicker}">From the founders</div>`,
      `<div style="${S.founder}">`,
      `<p style="${S.founderP}">The Daily Walk is built by a small family who love Jesus and want to help others find Him. If this is walking with you — or you'd like to partner, give toward the mission, or just say hello — we'd genuinely love to hear from you. Call or text <a href="tel:+1${site.founderPhone.replace(/[^0-9]/g, "")}" style="color:#B8902E;font-weight:bold;text-decoration:none;">${esc(site.founderPhone)}</a>, or email <a href="mailto:${esc(site.replyTo)}" style="color:#B8902E;font-weight:bold;text-decoration:none;">${esc(site.replyTo)}</a>.<br><span style="font-style:italic;color:#6a6452;">— Lulu &amp; the founding family</span></p>`,
      `</div>`,
    ].join("")
  );

  // Inside the Circle — live sessions
  let circleBlock = "";
  if (d.circleBody?.trim()) {
    circleBlock = `
      <div style="${S.pad}">${rule}
        <div style="${S.circle}">
          <div style="${S.circleK}">Inside the Circle · Live</div>
          ${paras(d.circleBody, S.circleP)}
          ${
            d.circleCtaUrl?.trim()
              ? `<div style="${S.cta}"><a href="${esc(d.circleCtaUrl)}" style="${S.btn}">${esc(d.circleCtaLabel || "See what's coming →")}</a></div>`
              : ""
          }
        </div>
        <div style="height:14px;line-height:14px;">&nbsp;</div>
      </div>`;
  }

  const closingBlock = d.closingLine?.trim()
    ? `<div style="${S.pad}">${rule}<div style="${S.closing}">${esc(d.closingLine)}</div><div style="height:8px;line-height:8px;">&nbsp;</div></div>`
    : "";

  return `<div style="${S.outer}">
  <div style="${S.wrap}">
    <div style="${S.masthead}">
      <div style="${S.ribbon}">★ Founding Member</div>
      <div style="${S.logo}">THE DAILY WALK · PREMIUM</div>
      <div style="${S.title}">The Deeper Walk</div>
      <div style="${S.tag}">deeper study · real discipleship</div>
    </div>
    ${metaBits ? `<div style="${S.meta}">${esc(metaBits)}</div>` : ""}
    ${d.weekFocus?.trim() ? `<div style="${S.week}">This Week's Focus: ${esc(d.weekFocus)}</div>` : `<div style="height:8px;line-height:8px;">&nbsp;</div>`}
    <div style="${S.pad}">${blocks.join(rule)}</div>
    ${circleBlock}
    ${closingBlock}
    <div style="${S.footer}">
      <strong style="color:#C9A24B;">The Daily Walk · Premium</strong><br>
      Deeper Bible study &amp; discipleship for Founding Members.<br>
      ${esc(prettyDate(issue.date))}<br><br>
      You're receiving this as a Founding Member of The Daily Walk.<br>
      ${site.mailingAddress ? `${esc(site.mailingAddress)}<br>` : ""}
      <a href="${site.url}/account" style="color:#C9A24B;text-decoration:none;">Manage membership</a> · <a href="#" style="color:#C9A24B;text-decoration:none;">Unsubscribe</a><br><br>
      <span style="color:#7185a1;font-size:10.5px;line-height:1.6;">${esc(site.scriptureNotice)}</span>
    </div>
  </div>
</div>`;
}
