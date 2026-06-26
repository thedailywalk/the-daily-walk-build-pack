import "server-only";
import type { PremiumIssue } from "@/lib/premium";
import { weekdayLabel, prettyDate } from "@/lib/premium";
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
  ref: "font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6a6452;font-weight:bold;margin:0 0 12px;",
  rule: "height:1px;line-height:1px;background:#DDD3BC;margin:26px 0;",
  verse: "border-left:4px solid #C9A24B;background:#F3ECDA;padding:14px 18px;margin:16px 0;font-style:italic;color:#1F3A5F;font-size:16px;line-height:1.55;",
  keyword: "background:#ffffff;border:1px solid #E0D6BF;border-radius:8px;padding:14px 18px;margin:0 0 12px;font-size:14.5px;line-height:1.55;color:#2B2B2B;",
  apply: "background:#EDF2F8;border:1px solid #DCE6F0;border-radius:8px;padding:14px 18px;margin:0 0 12px;font-size:15px;line-height:1.55;color:#2B2B2B;",
  applyK: "font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#B8902E;font-weight:bold;margin:0 0 6px;",
  question: "background:#F3ECDA;border-radius:8px;padding:16px 20px;font-family:Arial,Helvetica,sans-serif;color:#1F3A5F;font-size:15px;font-weight:bold;",
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

/** Render a premium (discipleship) issue as branded email HTML (inline styles). */
export function renderPremiumHtml(issue: PremiumIssue): string {
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
        d.devRef?.trim() ? `<p style="${S.ref}">${esc(d.devRef)}</p>` : "",
        paras(d.devIntro),
        d.devVerseText?.trim()
          ? `<div style="${S.verse}">${esc(d.devVerseText)}${d.devVerseRef?.trim() ? ` — ${esc(d.devVerseRef)}` : ""}</div>`
          : "",
        paras(d.devBody),
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

  // The World Through God's Lens — Thursdays
  const stories = [
    { what: d.world1What, faith: d.world1Faith, pray: d.world1Pray },
    { what: d.world2What, faith: d.world2Faith, pray: d.world2Pray },
    { what: d.world3What, faith: d.world3Faith, pray: d.world3Pray },
  ].filter((s) => s.what?.trim() || s.faith?.trim() || s.pray?.trim());

  if (stories.length || d.brightBody?.trim()) {
    const storyHtml = stories
      .map(
        (s) => `
        <div style="${S.story}">
          ${s.what?.trim() ? `<div style="${S.storyLabel}">What happened</div><p style="${S.storyP}">${esc(s.what)}</p>` : ""}
          ${s.faith?.trim() ? `<div style="${S.storyLabel}">How we see it through faith</div><p style="${S.storyP}">${esc(s.faith)}</p>` : ""}
          ${s.pray?.trim() ? `<div style="${S.storyPray}"><strong style="color:#E3C074;">How we can pray · </strong>${esc(s.pray)}</div>` : ""}
        </div>`
      )
      .join("");

    const brightHtml = d.brightBody?.trim()
      ? `<div style="${S.bright}">
          <div style="${S.brightK}">✦ ${esc(d.brightHeading || "Light Still Breaking Through")}</div>
          ${paras(d.brightBody, S.brightP)}
        </div>`
      : "";

    blocks.push(
      [
        `<div style="${S.kicker}">🌍 ${esc(d.worldHeading || "The World Through God's Lens")}</div>`,
        d.worldIntro?.trim() ? `<p style="${S.worldIntro}">${esc(d.worldIntro)}</p>` : "",
        storyHtml,
        brightHtml,
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
        d.studyKeyWord?.trim()
          ? `<div style="${S.keyword}"><strong>Key word — </strong>${esc(d.studyKeyWord)}</div>`
          : "",
        d.studyVerse?.trim() ? `<div style="${S.verse}">${esc(d.studyVerse)}</div>` : "",
        d.studyQuestion?.trim() ? `<div style="${S.question}">${esc(d.studyQuestion)}</div>` : "",
      ].join("")
    );
  }

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
      <a href="${site.url}/account" style="color:#C9A24B;text-decoration:none;">Manage membership</a> · <a href="#" style="color:#C9A24B;text-decoration:none;">Unsubscribe</a>
    </div>
  </div>
</div>`;
}
