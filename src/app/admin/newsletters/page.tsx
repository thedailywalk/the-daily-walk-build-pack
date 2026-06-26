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

/* --------------------------------- badges -------------------------------- */
function TierBadge({ tier }: { tier: "Free" | "Premium" }) {
  return <span className={`nl-tier nl-tier-${tier.toLowerCase()}`}>{tier}</span>;
}
function StatusBadge({ status }: { status: Edition["status"] }) {
  const label = status === "ready" ? "Ready" : status === "draft" ? "Draft" : "Generated";
  return <span className={`adm-badge adm-badge-${status === "ready" ? "ready" : status === "draft" ? "draft" : "none"}`}>{label}</span>;
}

/* --------------------------------- LIST ---------------------------------- */
async function ListView(pubFilter?: string) {
  const { start, end } = defaultWindow();
  const all = await editionsForRange(start, end);
  const pub = (["free", "premium", "wellness"] as const).includes(pubFilter as Publication)
    ? (pubFilter as Publication)
    : null;
  const editions = (pub ? all.filter((e) => e.publication === pub) : all).reverse(); // newest first

  const filters: { key: string; label: string }[] = [
    { key: "", label: "All" },
    { key: "free", label: "Daily (Free)" },
    { key: "premium", label: "The Deeper Walk" },
    { key: "wellness", label: "Wellness Guide" },
  ];

  return (
    <div>
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
        <span className="nl-count">{editions.length} editions</span>
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
  const samples: { label: string; html: string }[] = [
    {
      label: "Free · Daily Devotional (goes to everyone)",
      html: renderDevotionalHtml(wrapDev(today, fullDevotionalFor(today))),
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
    html = renderDevotionalHtml(wrapDev(date, saved?.data ?? fullDevotionalFor(date), saved?.status));
    label = "Daily Devotional · Free";
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
