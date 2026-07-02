import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import {
  editionsForRange,
  defaultWindow,
  weekdayLabel,
  prettyDate,
  PUBLICATION_META,
  type Edition,
  type Publication,
} from "@/lib/newsletterSchedule";
import {
  adminGetByDate,
  fullDevotionalFor,
  upcomingDates,
  type Devotional,
} from "@/lib/devotionals";
import { premiumGetByDate, fullPremiumFor, type PremiumIssue } from "@/lib/premium";
import { wellnessGetByDate, fullWellnessFor, type WellnessIssue } from "@/lib/wellness";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import { renderPremiumHtml } from "@/lib/premiumHtml";
import { renderWellnessHtml } from "@/lib/wellnessHtml";
import { getDailyGoodNews } from "@/lib/goodNews";
import {
  pendingNewsletterBatches,
  appliedNewsletterSuggestions,
  FIELD_LABEL as NL_FIELD_LABEL,
  PUBLICATION_LABEL,
} from "@/lib/newsletterEvolution";
import {
  approveNewsletterSuggestionAction,
  rejectNewsletterSuggestionAction,
  regenerateNewsletterSuggestionsAction,
  prepareWeekAheadAction,
  lockNewsletterIssueAction,
} from "./actions";

export const metadata: Metadata = { title: "Newsletters", robots: { index: false } };
export const dynamic = "force-dynamic";

type SP = { view?: string; pub?: string; m?: string; preview?: string; date?: string };

export default async function NewslettersPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  // Preview mode short-circuits the tabs.
  if (sp.preview && sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date)) {
    return <PreviewView pub={sp.preview as Publication} date={sp.date} />;
  }

  const view = sp.view === "calendar" ? "calendar" : sp.view === "samples" ? "samples" : "list";

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>
              Admin · Newsletters
            </div>
            <p className="adm-sub">
              Every edition across all your newsletters in one place — the free
              Daily Devotional, the Premium <em>Deeper Walk</em>, and the
              Spiritual Wellness Guide. Track the whole schedule, preview any
              edition, or jump in to edit. <strong>Admin only.</strong>
            </p>
          </div>
        </div>

        <div className="nl-tabs">
          <Link href="/admin/newsletters" className={`nl-tab${view === "list" ? " is-on" : ""}`}>
            List
          </Link>
          <Link href="/admin/newsletters?view=calendar" className={`nl-tab${view === "calendar" ? " is-on" : ""}`}>
            Calendar
          </Link>
          <Link href="/admin/newsletters?view=samples" className={`nl-tab${view === "samples" ? " is-on" : ""}`}>
            One of each
          </Link>
        </div>

        {view === "list" && (await ListView(sp.pub))}
        {view === "calendar" && (await CalendarView(sp.m))}
        {view === "samples" && (await SamplesView())}
      </div>
    </section>
  );
}

/* --------------------- suggested updates (review) ------------------------ */
function NlSnippet({ text, n = 380 }: { text: string; n?: number }) {
  const t = (text ?? "").trim();
  const short = t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t;
  return <p className="wb-snippet">{short}</p>;
}

type NlBatch = Awaited<ReturnType<typeof pendingNewsletterBatches>>[number];

function NlBatchCard({ b, from }: { b: NlBatch; from: string }) {
  return (
    <div className="wb-batch">
      <div className="wb-batch-head">
        <span className={`nl-dot nl-dot-${b.publication}`} aria-hidden="true" />
        <strong>{weekdayLabel(b.issueDate)}, {prettyDate(b.issueDate)}</strong>
        <span className="wb-batch-count">
          {b.suggestions.length} suggested update{b.suggestions.length === 1 ? "" : "s"}
        </span>
        <form action={lockNewsletterIssueAction} style={{ marginLeft: "auto" }}>
          <input type="hidden" name="publication" value={b.publication} />
          <input type="hidden" name="date" value={b.issueDate} />
          <input type="hidden" name="from" value={from} />
          <button
            type="submit"
            className="wb-btn wb-btn-ghost"
            title="Mark this issue Ready and stop it from getting new suggested edits"
          >
            🔒 Lock this issue
          </button>
        </form>
      </div>
      {b.suggestions.map((s) => (
        <div key={s.id} className="wb-sug">
          <div className="wb-sug-top">
            <span className="wb-sug-field">→ {NL_FIELD_LABEL[s.targetField] ?? s.targetField}</span>
            <span className="wb-themes">{s.themes.map((t) => <em key={t}>{t}</em>)}</span>
          </div>
          <p className="wb-why"><span className="wb-tag">Why it fits</span> {s.whyFits}</p>
          <div className="wb-proposed">
            <span className="wb-tag">Proposed revision</span>
            <NlSnippet text={s.proposedText} />
          </div>
          {s.currentText && (
            <details className="wb-current">
              <summary>Compare with the current text</summary>
              <NlSnippet text={s.currentText} n={500} />
            </details>
          )}
          <p className="wb-impact"><span className="wb-tag">Impact</span> {s.impact}</p>
          <div className="wb-sug-actions">
            <form action={approveNewsletterSuggestionAction}>
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="from" value={from} />
              <button className="wb-btn wb-btn-yes" type="submit">Approve &amp; apply</button>
            </form>
            <form action={rejectNewsletterSuggestionAction}>
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="from" value={from} />
              <button className="wb-btn wb-btn-no" type="submit">Dismiss</button>
            </form>
            <Link href={`/admin/newsletters?preview=${b.publication}&date=${b.issueDate}`} className="wb-btn wb-btn-ghost">
              Preview issue →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function PubSection({
  id,
  title,
  blurb,
  batches,
}: {
  id: string;
  title: string;
  blurb: string;
  batches: NlBatch[];
}) {
  const count = batches.reduce((n, b) => n + b.suggestions.length, 0);
  return (
    <div id={id} style={{ scrollMarginTop: 90, marginTop: 22 }}>
      <h3 className="adm-group" style={{ marginBottom: 2 }}>
        {title} {count > 0 && <span className="wb-batch-count">· {count} waiting</span>}
      </h3>
      <p className="adm-grouphint">{blurb}</p>
      {batches.length === 0 ? (
        <p className="adm-sub" style={{ marginTop: 0 }}>Nothing waiting here right now.</p>
      ) : (
        batches.map((b) => <NlBatchCard key={b.key} b={b} from={`#${id}`} />)
      )}
    </div>
  );
}

async function SuggestionsReview() {
  const [batches, applied] = await Promise.all([
    pendingNewsletterBatches(),
    appliedNewsletterSuggestions(12),
  ]);
  const free = batches.filter((b) => b.publication === "free");
  const premium = batches.filter((b) => b.publication === "premium");
  const total = batches.reduce((n, b) => n + b.suggestions.length, 0);

  return (
    <div id="suggestions" style={{ scrollMarginTop: 90, marginBottom: 26 }}>
      <div className="adm-head" style={{ alignItems: "flex-end" }}>
        <div>
          <h2 className="adm-h2" style={{ margin: 0 }}>Suggested updates · the week ahead</h2>
          <p className="adm-sub" style={{ marginTop: 4 }}>
            Built from your Content Library (items routed to <em>Newsletter</em>). Every
            time you add inspiration, this rebuilds into the most up-to-date set for the
            next 7 days — Approve to write it straight into that issue, or Dismiss.
            Scripture is never changed. {total > 0 ? `${total} waiting.` : ""}
          </p>
        </div>
        <form action={regenerateNewsletterSuggestionsAction}>
          <button className="btn btn-ghost" type="submit">↻ Rebuild now</button>
        </form>
      </div>

      {batches.length === 0 ? (
        <p className="adm-sub">
          Nothing waiting. <Link href="/admin/library?tab=add">Add inspiration to your Content Library</Link> and
          route it to <em>Newsletter</em> — it&apos;ll suggest how to make the week ahead read fresher.
        </p>
      ) : (
        <>
          <PubSection
            id="free-suggestions"
            title="📿 Free Daily · the week ahead"
            blurb="Edits to the free devotional (Mon · Wed · Fri) that make it read fresher and more relevant to today."
            batches={free}
          />
          <PubSection
            id="premium-suggestions"
            title="✦ The Deeper Walk (Premium) · the week ahead"
            blurb="Edits to the premium edition — deeper reflection, study, and application."
            batches={premium}
          />
        </>
      )}

      {applied.length > 0 && (
        <details className="wb-applied-wrap" style={{ marginTop: 14 }}>
          <summary className="adm-sub">Recently applied ({applied.length})</summary>
          <div className="wb-archive">
            {applied.map((s) => (
              <div key={s.id} className="wb-arch-row">
                <span className="wb-day-n">{PUBLICATION_LABEL[s.publication]}</span>
                <span className="wb-arch-field">{NL_FIELD_LABEL[s.targetField] ?? s.targetField}</span>
                <span className="wb-arch-src">{prettyDate(s.issueDate)}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

/* --------------------------------- badges -------------------------------- */
function TierBadge({ tier }: { tier: "Free" | "Premium" }) {
  return <span className={`nl-tier nl-tier-${tier.toLowerCase()}`}>{tier}</span>;
}
function StatusBadge({ status }: { status: Edition["status"] }) {
  if (status === "ready")
    return <span className="adm-badge adm-badge-ready" title="Locked — publishes on its date; no new suggestions">🔒 Ready</span>;
  const label = status === "draft" ? "Draft" : "Generated";
  return <span className={`adm-badge adm-badge-${status === "draft" ? "draft" : "none"}`}>{label}</span>;
}

/* --------------------------------- LIST ---------------------------------- */
async function ListView(pubFilter?: string) {
  const { start, end } = defaultWindow();
  const all = await editionsForRange(start, end);
  const pub = (["free", "premium", "wellness"] as const).includes(pubFilter as Publication)
    ? (pubFilter as Publication)
    : null;
  const editions = (pub ? all.filter((e) => e.publication === pub) : all).reverse(); // newest first
  const today = upcomingDates(1)[0];

  const filters: { key: string; label: string }[] = [
    { key: "", label: "All" },
    { key: "free", label: "Daily (Free)" },
    { key: "premium", label: "The Deeper Walk" },
    { key: "wellness", label: "Wellness Guide" },
  ];

  return (
    <div>
      {await SuggestionsReview()}

      <div className="nl-bar">
        <div className="nl-filters">
          {filters.map((f) => (
            <Link
              key={f.key}
              href={f.key ? `/admin/newsletters?pub=${f.key}` : "/admin/newsletters"}
              className={`nl-filter${(pub ?? "") === f.key ? " is-on" : ""}`}
            >
              {f.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <form action={prepareWeekAheadAction}>
            <button className="btn btn-ghost" type="submit" title="Stage the next 7 days of every edition as drafts (they render with the current look)">
              ↻ Prepare the week ahead
            </button>
          </form>
          <span className="nl-count">{editions.length} editions</span>
        </div>
      </div>

      <div className="nl-list">
        <div className="nl-list-head">
          <span>Date</span>
          <span>Type</span>
          <span>Tier</span>
          <span>Status</span>
          <span />
        </div>
        {editions.map((e) => (
          <div key={`${e.publication}-${e.date}`} className="nl-row">
            <span className="nl-row-date">
              <strong>{weekdayLabel(e.date).slice(0, 3)}, {prettyDate(e.date)}</strong>
            </span>
            <span className="nl-row-type">
              <span className={`nl-dot nl-dot-${e.publication}`} aria-hidden="true" />
              {e.type}
              {e.extra && <em className="nl-row-extra"> · {e.extra}</em>}
              {e.headline && <span className="nl-row-headline">{e.headline}</span>}
            </span>
            <span><TierBadge tier={e.tier} /></span>
            <span><StatusBadge status={e.status} /></span>
            <span className="nl-row-actions">
              <Link href={e.previewHref} className="nl-link">Preview</Link>
              <Link href={e.editHref} className="nl-link nl-link-edit">Edit →</Link>
              {(e.publication === "free" || e.publication === "premium") &&
                e.status !== "ready" &&
                e.date >= today && (
                  <form action={lockNewsletterIssueAction} className="nl-row-lock">
                    <input type="hidden" name="publication" value={e.publication} />
                    <input type="hidden" name="date" value={e.date} />
                    <button type="submit" className="nl-link" title="Mark Ready & stop new suggestions">
                      🔒 Lock
                    </button>
                  </form>
                )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- CALENDAR ------------------------------- */
async function CalendarView(mParam?: string) {
  const today = upcomingDates(1)[0];
  const month = mParam && /^\d{4}-\d{2}$/.test(mParam) ? mParam : today.slice(0, 7);
  const [y, m] = month.split("-").map(Number);
  const first = `${month}-01`;
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const last = `${month}-${String(daysInMonth).padStart(2, "0")}`;

  const editions = await editionsForRange(first, last);
  const byDate = new Map<string, Edition[]>();
  for (const e of editions) {
    const arr = byDate.get(e.date) ?? [];
    arr.push(e);
    byDate.set(e.date, arr);
  }

  // leading blanks (Sun-first grid)
  const firstDow = new Date(`${first}T12:00:00Z`).getUTCDay();
  const cells: (string | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(`${month}-${String(d).padStart(2, "0")}`);
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = new Date(`${first}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const prevM = monthShift(month, -1);
  const nextM = monthShift(month, 1);

  return (
    <div>
      <div className="nl-cal-head">
        <Link href={`/admin/newsletters?view=calendar&m=${prevM}`} className="btn btn-ghost">←</Link>
        <h2 className="adm-h2" style={{ margin: 0 }}>{monthLabel}</h2>
        <Link href={`/admin/newsletters?view=calendar&m=${nextM}`} className="btn btn-ghost">→</Link>
        <Link href="/admin/newsletters?view=calendar" className="btn btn-ghost" style={{ marginLeft: "auto" }}>
          This month
        </Link>
      </div>

      <div className="nl-cal">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <div key={d} className="nl-cal-dow">{d}</div>
        ))}
        {cells.map((date, i) => (
          <div key={i} className={`nl-cal-cell${date === today ? " is-today" : ""}${!date ? " is-empty" : ""}`}>
            {date && (
              <>
                <div className="nl-cal-num">{Number(date.slice(-2))}</div>
                {(byDate.get(date) ?? []).map((e) => (
                  <Link key={e.publication} href={e.previewHref} className={`nl-chip nl-chip-${e.publication}`}>
                    {e.type}
                    <span className="nl-chip-tier">{e.tier === "Free" ? "F" : "P"}</span>
                  </Link>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function monthShift(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/* -------------------------------- SAMPLES -------------------------------- */
async function SamplesView() {
  // Representative dates so every segment shows: a weekday, a Thursday (World),
  // a Saturday (Weekend Study), and a Mon/Wed/Fri wellness day.
  const today = upcomingDates(1)[0];
  const gn = await getDailyGoodNews(3);
  const samples: { label: string; html: string }[] = [
    {
      label: "Free · Devotional (Mon · Wed · Fri, goes to everyone)",
      html: renderDevotionalHtml(wrapDev(today, fullDevotionalFor(today)), gn),
    },
    {
      label: "Premium · The Deeper Walk — a regular weekday",
      html: renderPremiumHtml(wrapPrem("2026-06-29", fullPremiumFor("2026-06-29"))),
    },
    {
      label: "Premium · The Deeper Walk — Thursday (adds The World Through God's Lens)",
      html: renderPremiumHtml(wrapPrem("2026-06-25", fullPremiumFor("2026-06-25"))),
    },
    {
      label: "Premium · The Deeper Walk — Saturday (adds The Weekend Study)",
      html: renderPremiumHtml(wrapPrem("2026-06-27", fullPremiumFor("2026-06-27"))),
    },
    {
      label: "Founding bonus · Spiritual Wellness Guide (Mon · Wed · Fri)",
      html: renderWellnessHtml(wrapWell("2026-06-29", fullWellnessFor("2026-06-29"))),
    },
  ];

  return (
    <div>
      <p className="adm-hintline">
        One live example of each newsletter, generated from your content. This is
        exactly what each one looks like when it sends.
      </p>
      {samples.map((s) => (
        <div key={s.label} className="nl-sample">
          <div className="nl-sample-label">{s.label}</div>
          <div className="adm-preview-frame nl-sample-frame" dangerouslySetInnerHTML={{ __html: s.html }} />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- PREVIEW -------------------------------- */
async function PreviewView({ pub, date }: { pub: Publication; date: string }) {
  let html = "";
  let label = "";
  if (pub === "premium") {
    const saved = await premiumGetByDate(date);
    html = renderPremiumHtml(wrapPrem(date, saved?.data ?? fullPremiumFor(date), saved?.status));
    label = "The Deeper Walk · Premium";
  } else if (pub === "wellness") {
    const saved = await wellnessGetByDate(date);
    html = renderWellnessHtml(wrapWell(date, saved?.data ?? fullWellnessFor(date), saved?.status));
    label = "Spiritual Wellness Guide";
  } else {
    const saved = await adminGetByDate(date);
    const gn = await getDailyGoodNews(3);
    html = renderDevotionalHtml(wrapDev(date, saved?.data ?? fullDevotionalFor(date), saved?.status), gn);
    label = "Devotional · Free (Mon · Wed · Fri)";
  }

  const editBase = PUBLICATION_META[pub].editBase;

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-bar">
          <div>
            <Link href="/admin/newsletters" className="adm-back">← All newsletters</Link>
            <h2 className="adm-h2" style={{ marginTop: 4 }}>
              {label} · {weekdayLabel(date)}, {prettyDate(date)}
            </h2>
          </div>
          <Link href={`${editBase}?date=${date}`} className="btn btn-ghost">Edit this edition →</Link>
        </div>
        <div className="adm-archview">
          <div className="adm-preview-frame adm-preview-frame-tall" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- wrappers -------------------------------- */
function wrapDev(date: string, data: Devotional["data"], status?: string): Devotional {
  return { date, status: status === "ready" ? "ready" : "draft", title: data.readingHeading ?? "", data };
}
function wrapPrem(date: string, data: PremiumIssue["data"], status?: string): PremiumIssue {
  return { date, status: status === "ready" ? "ready" : "draft", title: data.devHeading ?? "", data };
}
function wrapWell(date: string, data: WellnessIssue["data"], status?: string): WellnessIssue {
  return { date, status: status === "ready" ? "ready" : "draft", title: data.scienceHeading ?? "", data };
}
