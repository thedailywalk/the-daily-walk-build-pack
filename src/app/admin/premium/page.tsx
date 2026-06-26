import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import {
  premiumGetByDate,
  premiumListRange,
  premiumListBefore,
  upcomingDates,
  fullPremiumFor,
  weekdayLabel,
  prettyDate,
  type PremiumIssue,
  type PremiumData,
} from "@/lib/premium";
import { renderPremiumHtml } from "@/lib/premiumHtml";
import CopyButton from "../devotionals/CopyButton";
import {
  savePremiumAction,
  preparePremiumWeekAction,
  deletePremiumAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Premium Prep",
  robots: { index: false },
};

export default async function PremiumAdminPage({
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
              Admin · Premium Prep{" "}
              <span className="adm-tier-pill">★ Founding Member</span>
            </div>
            <p className="adm-sub">
              The Premium <strong>Discipleship Newsletter</strong> — the main paid
              offer. Same rhythm as the free daily; every date opens fully
              written. Read it, edit in your voice, mark it <strong>Ready</strong>,
              and it publishes on its date. Includes the{" "}
              <strong>Main Premium Devotional</strong> (daily, deeper),{" "}
              <strong>The World Through God&apos;s Lens</strong> (Thursdays), and{" "}
              <strong>The Weekend Study</strong> (Saturdays). The wellness tools
              live in the{" "}
              <Link href="/admin/wellness" className="adm-inline-link">
                Spiritual Wellness Guide →
              </Link>
            </p>
          </div>
          <Link href="/pricing" className="btn btn-ghost">
            View offer page →
          </Link>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Connect the database to save premium issues: add{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code> and
            run <code>supabase/premium-issues.sql</code>. You can still preview
            and edit every issue below.
          </div>
        )}

        <nav className="adm-subnav" aria-label="Premium sections">
          <Link
            href="/admin/premium"
            className={`adm-subtab${view !== "archive" ? " is-on" : ""}`}
          >
            The week ahead
          </Link>
          <Link
            href="/admin/premium?view=archive"
            className={`adm-subtab${view === "archive" ? " is-on" : ""}`}
          >
            Archive
          </Link>
          <Link href="/admin/devotionals" className="adm-subtab">
            ← Free daily
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
  const dates = upcomingDates(7);
  const rows = await premiumListRange(dates[0], dates[dates.length - 1]);
  const byDate = new Map(rows.map((r) => [r.date, r]));

  return (
    <div>
      <div className="adm-bar">
        <h2 className="adm-h2">The week ahead · Premium</h2>
        <form action={preparePremiumWeekAction}>
          <button type="submit" className="btn btn-gold">
            Prepare next 7 days
          </button>
        </form>
      </div>
      <p className="adm-hintline">
        Every day generates a complete <strong>Main Premium Devotional</strong>.
        Thursdays add <strong>The World Through God&apos;s Lens</strong>;
        Saturdays add <strong>The Weekend Study</strong>. Click any date to open
        the full issue, edit it, then mark it <strong>Ready</strong>.
      </p>

      <div className="adm-week">
        {dates.map((date) => {
          const d = byDate.get(date);
          const gen = fullPremiumFor(date);
          const heading = (d?.data.devHeading || gen.devHeading)?.trim();
          const wd = weekdayLabel(date);
          const extra =
            wd === "Thursday"
              ? "Devotional · + The World Through God's Lens"
              : wd === "Saturday"
                ? "Devotional · + The Weekend Study"
                : "The Main Premium Devotional";
          return (
            <Link key={date} href={`/admin/premium?date=${date}`} className="adm-day">
              <div className="adm-day-top">
                <span className="adm-day-dow">{wd}</span>
                <StatusBadge status={d?.status} saved={!!d} />
              </div>
              <div className="adm-day-date">{prettyDate(date)}</div>
              <div className="adm-day-title">{heading}</div>
              <div className="adm-day-tagline">{extra}</div>
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
  const existing = await premiumGetByDate(date);
  const data: PremiumData = existing?.data ?? fullPremiumFor(date);
  const status = existing?.status ?? "draft";
  const weekday = weekdayLabel(date);
  const previewIssue: PremiumIssue = {
    date,
    status,
    title: existing?.title ?? "",
    data,
  };

  return (
    <div className="adm-editor">
      <div className="adm-bar">
        <div>
          <Link href="/admin/premium" className="adm-back">
            ← All days
          </Link>
          <h2 className="adm-h2" style={{ marginTop: 4 }}>
            {weekday}, {prettyDate(date)}{" "}
            <span className="adm-tier-pill">Premium</span>
          </h2>
        </div>
        <form action={deletePremiumAction}>
          <input type="hidden" name="date" value={date} />
          <button type="submit" className="adm-link-danger">
            Delete
          </button>
        </form>
      </div>

      {saved && <div className="adm-saved">Saved ✓</div>}
      {!existing && (
        <div className="adm-gennote">
          ✨ This is a complete, auto-generated premium draft. Edit anything
          below, then <strong>Save</strong> to keep your version.
        </div>
      )}

      <div className="adm-cols">
        {/* form */}
        <form action={savePremiumAction} className="adm-form">
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
            <input name="weekFocus" defaultValue={data.weekFocus} className="adm-input" />
          </Field>

          <Field label="Founder's note (top of issue)">
            <textarea name="editorNote" defaultValue={data.editorNote} className="adm-textarea" rows={3} />
          </Field>

          <h3 className="adm-group">The Main Premium Devotional · daily</h3>
          <p className="adm-grouphint">
            A deeper reflection than the free daily — fuller context, a key word,
            an application step, and a deeper question.
          </p>
          <Field label="Heading">
            <input name="devHeading" defaultValue={data.devHeading} className="adm-input" />
          </Field>
          <Field label="Reading reference">
            <input name="devRef" defaultValue={data.devRef} className="adm-input" placeholder="📖 John 1" />
          </Field>
          <Field label="Intro / context">
            <textarea name="devIntro" defaultValue={data.devIntro} className="adm-textarea" rows={4} />
          </Field>
          <div className="adm-row">
            <Field label="Key verse">
              <textarea name="devVerseText" defaultValue={data.devVerseText} className="adm-textarea" rows={3} />
            </Field>
            <Field label="Verse reference">
              <input name="devVerseRef" defaultValue={data.devVerseRef} className="adm-input" />
            </Field>
          </div>
          <Field label="The deeper reflection">
            <textarea name="devBody" defaultValue={data.devBody} className="adm-textarea" rows={6} />
          </Field>
          <Field label="Key word (Word — meaning)">
            <textarea name="devKeyWord" defaultValue={data.devKeyWord} className="adm-textarea" rows={2} />
          </Field>
          <Field label="Today's walk (one faithful step)">
            <textarea name="devApply" defaultValue={data.devApply} className="adm-textarea" rows={2} />
          </Field>
          <Field label="Deeper reflection question">
            <textarea name="devReflection" defaultValue={data.devReflection} className="adm-textarea" rows={2} />
          </Field>
          <Field label="A prayer for today">
            <textarea name="devPrayer" defaultValue={data.devPrayer} className="adm-textarea" rows={3} />
          </Field>

          <h3 className="adm-group">
            🌍 The World Through God&apos;s Lens · Thursdays
            {weekday !== "Thursday" && (
              <span className="adm-hint"> · not a Thursday — leave blank to hide</span>
            )}
          </h3>
          <p className="adm-grouphint">
            2–3 world events seen through faith — informed without overwhelmed,
            never fear-based or partisan. Replace the generated examples with the
            week&apos;s actual headlines, keeping the same calm tone.
          </p>
          <div className="adm-row">
            <Field label="Section heading">
              <input name="worldHeading" defaultValue={data.worldHeading} className="adm-input" placeholder="The World Through God's Lens" />
            </Field>
            <Field label="Uplifting section name">
              <input name="brightHeading" defaultValue={data.brightHeading} className="adm-input" placeholder="Light Still Breaking Through" />
            </Field>
          </div>
          <Field label="Gentle intro line">
            <textarea name="worldIntro" defaultValue={data.worldIntro} className="adm-textarea" rows={2} />
          </Field>

          <WorldStory n={1} data={data} />
          <WorldStory n={2} data={data} />
          <WorldStory n={3} data={data} />

          <Field label="✦ Light Still Breaking Through" hint="2–3 uplifting items — kindness, healing, answered prayers, restoration">
            <textarea name="brightBody" defaultValue={data.brightBody} className="adm-textarea" rows={6} />
          </Field>

          <h3 className="adm-group">
            📖 The Weekend Study · Saturdays
            {weekday !== "Saturday" && (
              <span className="adm-hint"> · not a Saturday — leave blank to hide</span>
            )}
          </h3>
          <Field label="Heading">
            <input name="studyHeading" defaultValue={data.studyHeading} className="adm-input" />
          </Field>
          <Field label="Reading reference">
            <input name="studyRef" defaultValue={data.studyRef} className="adm-input" />
          </Field>
          <Field label="Body">
            <textarea name="studyBody" defaultValue={data.studyBody} className="adm-textarea" rows={6} />
          </Field>
          <Field label="Key word (Word — meaning)">
            <textarea name="studyKeyWord" defaultValue={data.studyKeyWord} className="adm-textarea" rows={2} />
          </Field>
          <Field label="Study verse (Ref — text)">
            <textarea name="studyVerse" defaultValue={data.studyVerse} className="adm-textarea" rows={2} />
          </Field>
          <Field label="Reflection question">
            <textarea name="studyQuestion" defaultValue={data.studyQuestion} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">Inside the Circle · live sessions</h3>
          <Field label="Invite body">
            <textarea name="circleBody" defaultValue={data.circleBody} className="adm-textarea" rows={5} />
          </Field>
          <div className="adm-row">
            <Field label="Button label">
              <input name="circleCtaLabel" defaultValue={data.circleCtaLabel} className="adm-input" />
            </Field>
            <Field label="Button link">
              <input name="circleCtaUrl" defaultValue={data.circleCtaUrl} className="adm-input" placeholder="https://…" />
            </Field>
          </div>

          <h3 className="adm-group">Closing</h3>
          <Field label="Closing line">
            <textarea name="closingLine" defaultValue={data.closingLine} className="adm-textarea" rows={2} />
          </Field>

          <div className="adm-actions">
            <button type="submit" className="btn btn-gold">
              Save
            </button>
            <CopyButton text={renderPremiumHtml(previewIssue)} />
          </div>
        </form>

        {/* live preview */}
        <div className="adm-preview">
          <div className="adm-preview-tag">
            Live preview · Premium · {weekday}, {prettyDate(date)}
          </div>
          <div
            className="adm-preview-frame"
            dangerouslySetInnerHTML={{ __html: renderPremiumHtml(previewIssue) }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- archive ------------------------------- */
async function ArchiveList() {
  const today = upcomingDates(1)[0];
  const rows = await premiumListBefore(today);

  return (
    <div>
      <div className="adm-bar">
        <h2 className="adm-h2">Premium archive</h2>
      </div>
      <p className="adm-hintline">
        Past premium issues, newest first. Open any to review the full issue —
        read-only.
      </p>

      {rows.length === 0 ? (
        <div className="sg-zone sg-zone-cool">
          <p className="muted" style={{ margin: 0 }}>
            No past premium issues yet. Once issues go live on their date,
            they&apos;ll collect here.
          </p>
        </div>
      ) : (
        <div className="adm-archlist">
          {rows.map((d) => (
            <Link
              key={d.date}
              href={`/admin/premium?view=archive&date=${d.date}`}
              className="adm-archrow"
            >
              <div className="adm-archrow-main">
                <span className="adm-archrow-date">
                  {weekdayLabel(d.date)}, {prettyDate(d.date)}
                </span>
                <span className="adm-archrow-title">
                  {d.data.devHeading?.trim() || d.title || "Untitled issue"}
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
  const issue = await premiumGetByDate(date);

  if (!issue) {
    return (
      <div>
        <Link href="/admin/premium?view=archive" className="adm-back">
          ← Archive
        </Link>
        <div className="sg-zone sg-zone-cool" style={{ marginTop: 14 }}>
          <p className="muted" style={{ margin: 0 }}>
            No saved premium issue for {prettyDate(date)}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-editor">
      <div className="adm-bar">
        <div>
          <Link href="/admin/premium?view=archive" className="adm-back">
            ← Archive
          </Link>
          <h2 className="adm-h2" style={{ marginTop: 4 }}>
            {weekdayLabel(date)}, {prettyDate(date)}
          </h2>
        </div>
        <Link href={`/admin/premium?date=${date}`} className="btn btn-ghost">
          Edit this issue
        </Link>
      </div>

      <div className="adm-readonly-banner">
        📦 Archived premium issue · read-only.
      </div>

      <div className="adm-archview">
        <div className="adm-preview-tag">Full issue · {prettyDate(date)}</div>
        <div className="adm-archview-actions">
          <CopyButton text={renderPremiumHtml(issue)} label="Copy email HTML" />
        </div>
        <div
          className="adm-preview-frame adm-preview-frame-tall"
          dangerouslySetInnerHTML={{ __html: renderPremiumHtml(issue) }}
        />
      </div>
    </div>
  );
}

function WorldStory({ n, data }: { n: 1 | 2 | 3; data: PremiumData }) {
  const what = data[`world${n}What` as keyof PremiumData] as string | undefined;
  const faith = data[`world${n}Faith` as keyof PremiumData] as string | undefined;
  const pray = data[`world${n}Pray` as keyof PremiumData] as string | undefined;
  return (
    <div className="adm-worldstory">
      <div className="adm-worldstory-num">Story {n}</div>
      <Field label="What happened">
        <textarea name={`world${n}What`} defaultValue={what} className="adm-textarea" rows={2} />
      </Field>
      <Field label="How to see it through faith">
        <textarea name={`world${n}Faith`} defaultValue={faith} className="adm-textarea" rows={3} />
      </Field>
      <Field label="How we can pray">
        <textarea name={`world${n}Pray`} defaultValue={pray} className="adm-textarea" rows={2} />
      </Field>
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
