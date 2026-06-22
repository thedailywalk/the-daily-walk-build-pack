import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import {
  adminGetByDate,
  adminListRange,
  upcomingDates,
  templateFor,
  weekdayLabel,
  prettyDate,
  type Devotional,
  type DevotionalData,
} from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import {
  saveDevotionalAction,
  prepareWeekAction,
  deleteDevotionalAction,
} from "./actions";
import CopyButton from "./CopyButton";

export const metadata: Metadata = {
  title: "Devotional Prep",
  robots: { index: false },
};

export default async function DevotionalAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; saved?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const valid = sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) ? sp.date : null;

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>
              Admin · Devotional Prep
            </div>
            <p className="adm-sub">
              Plan, draft, and schedule the daily devotional. Each issue goes
              live on its own date once it&apos;s marked <strong>Ready</strong>.
            </p>
          </div>
          <Link href="/devotional" className="btn btn-ghost">
            View live page →
          </Link>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Connect the database to save devotionals: add{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code> and
            run <code>supabase/devotionals.sql</code>. You can still preview the
            editor below.
          </div>
        )}

        {valid ? await EditorView(valid, sp.saved === "1") : await WeekView()}
      </div>
    </section>
  );
}

/* ----------------------------- weekly preview ---------------------------- */
async function WeekView() {
  const dates = upcomingDates(7);
  const rows = await adminListRange(dates[0], dates[dates.length - 1]);
  const byDate = new Map(rows.map((r) => [r.date, r]));

  return (
    <div>
      <div className="adm-bar">
        <h2 className="adm-h2">The week ahead</h2>
        <form action={prepareWeekAction}>
          <button type="submit" className="btn btn-gold">
            Prepare next 7 days
          </button>
        </form>
      </div>

      <div className="adm-week">
        {dates.map((date) => {
          const d = byDate.get(date);
          const status = d?.status;
          const heading = d?.data.readingHeading?.trim();
          return (
            <Link key={date} href={`/admin/devotionals?date=${date}`} className="adm-day">
              <div className="adm-day-top">
                <span className="adm-day-dow">{weekdayLabel(date)}</span>
                <StatusBadge status={status} />
              </div>
              <div className="adm-day-date">{prettyDate(date)}</div>
              <div className="adm-day-title">
                {heading || <span className="adm-muted">Not prepared yet</span>}
              </div>
              <div className="adm-day-edit">
                {d ? "Open & edit →" : "Start draft →"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (status === "ready")
    return <span className="adm-badge adm-badge-ready">Ready</span>;
  if (status === "draft")
    return <span className="adm-badge adm-badge-draft">Draft</span>;
  return <span className="adm-badge adm-badge-none">—</span>;
}

/* -------------------------------- editor -------------------------------- */
async function EditorView(date: string, saved: boolean) {
  const existing = await adminGetByDate(date);
  const data: DevotionalData = existing?.data ?? templateFor(date);
  const status = existing?.status ?? "draft";
  const previewDev: Devotional = {
    date,
    status,
    title: existing?.title ?? "",
    data,
  };

  return (
    <div className="adm-editor">
      <div className="adm-bar">
        <div>
          <Link href="/admin/devotionals" className="adm-back">
            ← All days
          </Link>
          <h2 className="adm-h2" style={{ marginTop: 4 }}>
            {weekdayLabel(date)}, {prettyDate(date)}
          </h2>
        </div>
        <form action={deleteDevotionalAction}>
          <input type="hidden" name="date" value={date} />
          <button type="submit" className="adm-link-danger">
            Delete
          </button>
        </form>
      </div>

      {saved && <div className="adm-saved">Saved ✓</div>}

      <div className="adm-cols">
        {/* form */}
        <form action={saveDevotionalAction} className="adm-form">
          <input type="hidden" name="date" value={date} />

          <div className="adm-row">
            <Field label="Status" hint="Ready = publishes on its date">
              <select name="status" defaultValue={status} className="sg-select">
                <option value="draft">Draft</option>
                <option value="ready">Ready to publish</option>
              </select>
            </Field>
            <Field label="Day label (optional)">
              <input name="dayLabel" defaultValue={data.dayLabel} className="adm-input" placeholder="Day 10" />
            </Field>
          </div>

          <Field label="This week's focus">
            <input name="weekFocus" defaultValue={data.weekFocus} className="adm-input" placeholder="Meet Jesus — who He really is" />
          </Field>

          <h3 className="adm-group">Today&apos;s Reading</h3>
          <Field label="Heading">
            <input name="readingHeading" defaultValue={data.readingHeading} className="adm-input" placeholder="The whole reason it was written down" />
          </Field>
          <Field label="Reading reference line">
            <input name="readingRef" defaultValue={data.readingRef} className="adm-input" placeholder="📖 Main: John 19–20 · Be real with God: Psalm 27" />
          </Field>
          <Field label="Intro (before the verse)">
            <textarea name="readingIntro" defaultValue={data.readingIntro} className="adm-textarea" rows={4} />
          </Field>
          <div className="adm-row">
            <Field label="Key verse">
              <textarea name="verseText" defaultValue={data.verseText} className="adm-textarea" rows={3} />
            </Field>
            <Field label="Verse reference">
              <input name="verseRef" defaultValue={data.verseRef} className="adm-input" placeholder="John 20:31" />
            </Field>
          </div>
          <Field label="After the verse (optional)">
            <textarea name="readingAfter" defaultValue={data.readingAfter} className="adm-textarea" rows={3} />
          </Field>

          <h3 className="adm-group">Make It Real</h3>
          <Field label="Heading">
            <input name="makeItRealHeading" defaultValue={data.makeItRealHeading} className="adm-input" />
          </Field>
          <Field label="Body">
            <textarea name="makeItRealBody" defaultValue={data.makeItRealBody} className="adm-textarea" rows={3} />
          </Field>
          <Field label="Reflection question">
            <textarea name="question" defaultValue={data.question} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">Prayer</h3>
          <Field label="A prayer for today">
            <textarea name="prayer" defaultValue={data.prayer} className="adm-textarea" rows={3} />
          </Field>

          <h3 className="adm-group">Pastor&apos;s Take (optional · Wednesdays)</h3>
          <Field label="Quote">
            <textarea name="pastorTake" defaultValue={data.pastorTake} className="adm-textarea" rows={3} />
          </Field>
          <Field label="Byline">
            <input name="pastorByline" defaultValue={data.pastorByline} className="adm-input" />
          </Field>

          <h3 className="adm-group">Community &amp; closing</h3>
          <Field label="Community blurb">
            <textarea name="communityText" defaultValue={data.communityText} className="adm-textarea" rows={2} />
          </Field>
          <div className="adm-row">
            <Field label="Button label">
              <input name="ctaLabel" defaultValue={data.ctaLabel} className="adm-input" />
            </Field>
            <Field label="Button link">
              <input name="ctaUrl" defaultValue={data.ctaUrl} className="adm-input" placeholder="https://…" />
            </Field>
          </div>
          <Field label="Closing line">
            <input name="closingLine" defaultValue={data.closingLine} className="adm-input" placeholder="Even when the world feels heavy, God is still moving." />
          </Field>

          <div className="adm-actions">
            <button type="submit" className="btn btn-gold">
              Save
            </button>
            <CopyButton text={renderDevotionalHtml(previewDev)} />
          </div>
        </form>

        {/* live preview of the last-saved version */}
        <div className="adm-preview">
          <div className="adm-preview-tag">Preview (last saved)</div>
          <div
            className="adm-preview-frame"
            dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(previewDev) }}
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="adm-field">
      <span className="adm-label">
        {label}
        {hint ? <span className="adm-hint"> · {hint}</span> : null}
      </span>
      {children}
    </label>
  );
}
