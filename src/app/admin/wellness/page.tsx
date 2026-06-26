import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import {
  wellnessGetByDate,
  wellnessListRange,
  wellnessListBefore,
  fullWellnessFor,
  isWellnessDay,
  upcomingDates,
  weekdayLabel,
  prettyDate,
  type WellnessIssue,
  type WellnessData,
} from "@/lib/wellness";
import { renderWellnessHtml } from "@/lib/wellnessHtml";
import CopyButton from "../devotionals/CopyButton";
import {
  saveWellnessAction,
  prepareWellnessWeekAction,
  deleteWellnessAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Wellness Guide Prep",
  robots: { index: false },
};

export default async function WellnessAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; saved?: string; view?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const view = sp.view === "archive" ? "archive" : "prep";
  const valid = sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) ? sp.date : null;

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>
              Admin · Wellness Guide{" "}
              <span className="adm-tier-pill">★ Founding bonus</span>
            </div>
            <p className="adm-sub">
              The <strong>Spiritual Wellness Guide</strong> — a Founding-Member
              bonus, sent <strong>3× a week (Mon · Wed · Fri)</strong>. Faith +
              neuroscience tools to steady the heart and mind: The Science Behind
              It, The Peace Practice, The Pattern Breaker, The Prayer Lab, and A
              Question Worth Sitting With.
            </p>
          </div>
          <Link href="/admin/premium" className="btn btn-ghost">
            Premium newsletter →
          </Link>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Connect the database to save: add{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code> and
            run <code>supabase/wellness-issues.sql</code>. You can still preview
            and edit every issue below.
          </div>
        )}

        <nav className="adm-subnav" aria-label="Wellness sections">
          <Link
            href="/admin/wellness"
            className={`adm-subtab${view !== "archive" ? " is-on" : ""}`}
          >
            The week ahead
          </Link>
          <Link
            href="/admin/wellness?view=archive"
            className={`adm-subtab${view === "archive" ? " is-on" : ""}`}
          >
            Archive
          </Link>
          <Link href="/admin/premium" className="adm-subtab">
            ← Premium
          </Link>
        </nav>

        {view === "archive"
          ? valid
            ? await ArchiveDetail(valid)
            : await ArchiveList()
          : valid
            ? await EditorView(valid, sp.saved === "1")
            : await WeekView()}
      </div>
    </section>
  );
}

/* ----------------------------- weekly preview ---------------------------- */
async function WeekView() {
  const dates = upcomingDates(14).filter(isWellnessDay).slice(0, 6);
  const rows = dates.length
    ? await wellnessListRange(dates[0], dates[dates.length - 1])
    : [];
  const byDate = new Map(rows.map((r) => [r.date, r]));

  return (
    <div>
      <div className="adm-bar">
        <h2 className="adm-h2">The next few · Mon · Wed · Fri</h2>
        <form action={prepareWellnessWeekAction}>
          <button type="submit" className="btn btn-gold">
            Prepare this week
          </button>
        </form>
      </div>
      <p className="adm-hintline">
        The Wellness Guide goes out <strong>Monday, Wednesday, and Friday</strong>
        . Each issue is generated complete — click any date to open it, edit, then
        mark it <strong>Ready</strong>.
      </p>

      <div className="adm-week">
        {dates.map((date) => {
          const d = byDate.get(date);
          const heading = (d?.data.scienceHeading || fullWellnessFor(date).scienceHeading)?.trim();
          return (
            <Link key={date} href={`/admin/wellness?date=${date}`} className="adm-day">
              <div className="adm-day-top">
                <span className="adm-day-dow">{weekdayLabel(date)}</span>
                <StatusBadge status={d?.status} saved={!!d} />
              </div>
              <div className="adm-day-date">{prettyDate(date)}</div>
              <div className="adm-day-title">{heading}</div>
              <div className="adm-day-tagline">Science · Peace · Pattern · Prayer · Question</div>
              <div className="adm-day-edit">Open & edit →</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status, saved }: { status?: string; saved?: boolean }) {
  if (status === "ready")
    return <span className="adm-badge adm-badge-ready">Ready</span>;
  if (saved) return <span className="adm-badge adm-badge-draft">Draft</span>;
  return <span className="adm-badge adm-badge-none">Generated</span>;
}

/* -------------------------------- editor -------------------------------- */
async function EditorView(date: string, saved: boolean) {
  const existing = await wellnessGetByDate(date);
  const data: WellnessData = existing?.data ?? fullWellnessFor(date);
  const status = existing?.status ?? "draft";
  const weekday = weekdayLabel(date);
  const previewIssue: WellnessIssue = {
    date,
    status,
    title: existing?.title ?? "",
    data,
  };

  return (
    <div className="adm-editor">
      <div className="adm-bar">
        <div>
          <Link href="/admin/wellness" className="adm-back">
            ← All days
          </Link>
          <h2 className="adm-h2" style={{ marginTop: 4 }}>
            {weekday}, {prettyDate(date)}{" "}
            <span className="adm-tier-pill">Wellness</span>
          </h2>
        </div>
        <form action={deleteWellnessAction}>
          <input type="hidden" name="date" value={date} />
          <button type="submit" className="adm-link-danger">
            Delete
          </button>
        </form>
      </div>

      {saved && <div className="adm-saved">Saved ✓</div>}
      {!isWellnessDay(date) && (
        <div className="adm-notice">
          Heads up: {weekday} isn&apos;t a normal Wellness Guide day (those are
          Mon/Wed/Fri). You can still write and publish a one-off here.
        </div>
      )}
      {!existing && (
        <div className="adm-gennote">
          ✨ This is a complete, auto-generated wellness draft. Edit anything
          below, then <strong>Save</strong> to keep your version.
        </div>
      )}

      <div className="adm-cols">
        <form action={saveWellnessAction} className="adm-form">
          <input type="hidden" name="date" value={date} />

          <div className="adm-row">
            <Field label="Status" hint="Ready = publishes on its date">
              <select name="status" defaultValue={status} className="sg-select">
                <option value="draft">Draft</option>
                <option value="ready">Ready to publish</option>
              </select>
            </Field>
            <Field label="Day label (optional)">
              <input name="dayLabel" defaultValue={data.dayLabel} className="adm-input" />
            </Field>
          </div>

          <Field label="This week's focus">
            <input name="weekFocus" defaultValue={data.weekFocus} className="adm-input" />
          </Field>
          <Field label="Founder's note (top of issue)">
            <textarea name="editorNote" defaultValue={data.editorNote} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">✦ The Science Behind It</h3>
          <Field label="Heading">
            <input name="scienceHeading" defaultValue={data.scienceHeading} className="adm-input" />
          </Field>
          <Field label="Anchor verse line">
            <input name="scienceVerse" defaultValue={data.scienceVerse} className="adm-input" />
          </Field>
          <Field label="Body" hint="Faith + neuroscience, grounded">
            <textarea name="scienceBody" defaultValue={data.scienceBody} className="adm-textarea" rows={5} />
          </Field>
          <Field label="Try this today (one tool)">
            <textarea name="sciencePractice" defaultValue={data.sciencePractice} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">🕊 The Peace Practice · 60-second reset</h3>
          <Field label="Intro (breathe + prayer)">
            <textarea name="peaceIntro" defaultValue={data.peaceIntro} className="adm-textarea" rows={3} />
          </Field>
          <Field label="Release · one thing you cannot control">
            <input name="peaceRelease" defaultValue={data.peaceRelease} className="adm-input" />
          </Field>
          <Field label="Receive · one truth from God">
            <input name="peaceReceive" defaultValue={data.peaceReceive} className="adm-input" />
          </Field>
          <Field label="Respond · one obedient next step">
            <input name="peaceRespond" defaultValue={data.peaceRespond} className="adm-input" />
          </Field>

          <h3 className="adm-group">🔁 The Pattern Breaker</h3>
          <Field label="Old pattern">
            <textarea name="patternOld" defaultValue={data.patternOld} className="adm-textarea" rows={2} />
          </Field>
          <Field label="New walk">
            <textarea name="patternNew" defaultValue={data.patternNew} className="adm-textarea" rows={2} />
          </Field>
          <Field label="A line of encouragement (optional)">
            <input name="patternNote" defaultValue={data.patternNote} className="adm-input" />
          </Field>

          <h3 className="adm-group">🙏 The Prayer Lab</h3>
          <Field label="Situation (title)" hint='e.g. "When you feel anxious"'>
            <input name="prayerLabTitle" defaultValue={data.prayerLabTitle} className="adm-input" />
          </Field>
          <Field label="Start here">
            <input name="prayerLabStart" defaultValue={data.prayerLabStart} className="adm-input" />
          </Field>
          <Field label="Name it">
            <textarea name="prayerLabName" defaultValue={data.prayerLabName} className="adm-textarea" rows={2} />
          </Field>
          <Field label="Surrender it">
            <textarea name="prayerLabSurrender" defaultValue={data.prayerLabSurrender} className="adm-textarea" rows={2} />
          </Field>
          <Field label="Ask">
            <textarea name="prayerLabAsk" defaultValue={data.prayerLabAsk} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">💭 A Question Worth Sitting With</h3>
          <Field label="The question">
            <textarea name="question" defaultValue={data.question} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">Closing</h3>
          <Field label="Closing line">
            <textarea name="closingLine" defaultValue={data.closingLine} className="adm-textarea" rows={2} />
          </Field>

          <div className="adm-actions">
            <button type="submit" className="btn btn-gold">
              Save
            </button>
            <CopyButton text={renderWellnessHtml(previewIssue)} />
          </div>
        </form>

        <div className="adm-preview">
          <div className="adm-preview-tag">
            Live preview · Wellness · {weekday}, {prettyDate(date)}
          </div>
          <div
            className="adm-preview-frame"
            dangerouslySetInnerHTML={{ __html: renderWellnessHtml(previewIssue) }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- archive ------------------------------- */
async function ArchiveList() {
  const today = upcomingDates(1)[0];
  const rows = await wellnessListBefore(today);

  return (
    <div>
      <div className="adm-bar">
        <h2 className="adm-h2">Wellness archive</h2>
      </div>
      <p className="adm-hintline">Past wellness issues, newest first — read-only.</p>

      {rows.length === 0 ? (
        <div className="sg-zone sg-zone-cool">
          <p className="muted" style={{ margin: 0 }}>
            No past wellness issues yet. Once issues go live, they&apos;ll collect
            here.
          </p>
        </div>
      ) : (
        <div className="adm-archlist">
          {rows.map((d) => (
            <Link
              key={d.date}
              href={`/admin/wellness?view=archive&date=${d.date}`}
              className="adm-archrow"
            >
              <div className="adm-archrow-main">
                <span className="adm-archrow-date">
                  {weekdayLabel(d.date)}, {prettyDate(d.date)}
                </span>
                <span className="adm-archrow-title">
                  {d.data.scienceHeading?.trim() || d.title || "Untitled issue"}
                </span>
              </div>
              <div className="adm-archrow-side">
                <StatusBadge status={d.status} saved />
                <span className="adm-archrow-open">Review →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

async function ArchiveDetail(date: string) {
  const issue = await wellnessGetByDate(date);

  if (!issue) {
    return (
      <div>
        <Link href="/admin/wellness?view=archive" className="adm-back">
          ← Archive
        </Link>
        <div className="sg-zone sg-zone-cool" style={{ marginTop: 14 }}>
          <p className="muted" style={{ margin: 0 }}>
            No saved wellness issue for {prettyDate(date)}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-editor">
      <div className="adm-bar">
        <div>
          <Link href="/admin/wellness?view=archive" className="adm-back">
            ← Archive
          </Link>
          <h2 className="adm-h2" style={{ marginTop: 4 }}>
            {weekdayLabel(date)}, {prettyDate(date)}
          </h2>
        </div>
        <Link href={`/admin/wellness?date=${date}`} className="btn btn-ghost">
          Edit this issue
        </Link>
      </div>

      <div className="adm-readonly-banner">
        📦 Archived wellness issue · read-only.
      </div>

      <div className="adm-archview">
        <div className="adm-preview-tag">Full issue · {prettyDate(date)}</div>
        <div className="adm-archview-actions">
          <CopyButton text={renderWellnessHtml(issue)} label="Copy email HTML" />
        </div>
        <div
          className="adm-preview-frame adm-preview-frame-tall"
          dangerouslySetInnerHTML={{ __html: renderWellnessHtml(issue) }}
        />
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
