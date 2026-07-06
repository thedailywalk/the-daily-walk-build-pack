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
import { getDailyGoodNews } from "@/lib/goodNews";
import { pendingForIssue } from "@/lib/newsletterEvolution";
import NewsletterIssueReview from "@/components/NewsletterIssueReview";
import CopyButton from "../devotionals/CopyButton";
import EditorialCheck from "@/components/EditorialCheck";
import { checkPremium } from "@/lib/editorialCheck";
import {
  savePremiumAction,
  preparePremiumWeekAction,
  deletePremiumAction,
  importPremiumAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Premium Prep",
  robots: { index: false },
};

export default async function PremiumAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    date?: string;
    saved?: string;
    view?: string;
    imported?: string;
    skipped?: string;
    source?: string;
  }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const view = sp.view === "archive" ? "archive" : "prep";
  const valid = sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) ? sp.date : null;
  const importResult =
    sp.imported != null
      ? { created: Number(sp.imported) || 0, skipped: Number(sp.skipped) || 0 }
      : null;

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
              <strong>Main Premium Devotional</strong> (daily, deeper) and{" "}
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
            ? await EditorView(valid, sp.saved === "1", sp.source === "platform")
            : await WeekView(importResult)}
      </div>
    </section>
  );
}

/* ----------------------------- weekly preview ---------------------------- */
async function WeekView(
  importResult: { created: number; skipped: number } | null
) {
  const dates = upcomingDates(7);
  const rows = await premiumListRange(dates[0], dates[dates.length - 1]);
  const byDate = new Map(rows.map((r) => [r.date, r]));

  return (
    <div>
      {importResult && (
        <div className="adm-saved" style={{ marginBottom: 14 }}>
          Imported {importResult.created} premium issue
          {importResult.created === 1 ? "" : "s"} as draft
          {importResult.created === 1 ? "" : "s"}.
          {importResult.skipped > 0 && (
            <> {importResult.skipped} block(s) skipped (missing a valid date).</>
          )}{" "}
          Click a day below to review, then mark it <strong>Ready</strong>.
        </div>
      )}

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
        Saturdays add <strong>The Weekend Study</strong>. Click any date to open
        the full issue, edit it, then mark it <strong>Ready</strong>.
      </p>

      {/* Quick paste → create premium issues from labeled text */}
      <details className="adm-paste">
        <summary className="adm-paste-sum">
          📋 Quick paste — create premium issues from text
        </summary>
        <form action={importPremiumAction} className="adm-paste-form">
          <p className="adm-paste-help">
            Paste one or more days in the labeled format. Separate each day with a
            line of three dashes (<code>---</code>), and give each day a{" "}
            <code>date: YYYY-MM-DD</code> line. Recognized fields:{" "}
            <code>
              editorNote, devHeading, devRef, devIntro, devVerseText, devVerseRef,
              devBody, devKeyWord, devReflection, devApply, devPause, devPrayer,
              studyHeading, studyRef, studyBody, studyVerse, studyQuestion,
              closingLine
            </code>{" "}
            (and more). Anything it doesn&apos;t recognize is ignored.
          </p>
          <textarea
            name="paste"
            className="adm-textarea"
            rows={12}
            placeholder={
              "date: 2026-07-06\n" +
              "devHeading: You don't need perfect faith — just look up\n" +
              "devRef: Numbers 21–23 · Mark 9\n" +
              "devVerseText: I do believe; help me overcome my unbelief!\n" +
              "devVerseRef: Mark 9:24\n" +
              "devPrayer: Jesus, I believe; help my unbelief...\n" +
              "---\n" +
              "date: 2026-07-08\n" +
              "devHeading: ...\n"
            }
          />
          <label className="adm-paste-check">
            <input type="checkbox" name="publish" value="1" /> Publish immediately
            (mark Ready). Leave unchecked to create drafts you preview first.
          </label>
          <button type="submit" className="btn btn-gold">
            Create premium issues
          </button>
        </form>
      </details>

      {/* The platform's own auto-written premium version for each day */}
      <h3 className="adm-group">🤖 The platform&apos;s auto-written version</h3>
      <p className="adm-hintline">
        What the app writes on its own for each day. Tap any day to preview it —
        and <strong>Save</strong> to use it instead of your pasted draft.
      </p>
      <div className="adm-week">
        {dates.map((date) => {
          const gen = fullPremiumFor(date);
          const wd = weekdayLabel(date);
          const extra =
            wd === "Saturday"
              ? "Devotional · + The Weekend Study"
              : "The Main Premium Devotional";
          return (
            <Link
              key={`platform-${date}`}
              href={`/admin/premium?date=${date}&source=platform`}
              className="adm-day"
            >
              <div className="adm-day-top">
                <span className="adm-day-dow">{wd}</span>
                <span className="adm-badge adm-badge-none">Auto</span>
              </div>
              <div className="adm-day-date">{prettyDate(date)}</div>
              <div className="adm-day-title">{gen.devHeading?.trim()}</div>
              <div className="adm-day-tagline">{extra}</div>
              <div className="adm-day-edit">Preview &amp; use →</div>
            </Link>
          );
        })}
      </div>

      {/* The versions you pasted / saved — these are what will publish */}
      {rows.length > 0 && (
        <>
          <h3 className="adm-group" style={{ marginTop: 28 }}>
            ✍️ Your pasted drafts
          </h3>
          <p className="adm-hintline">
            The versions you pasted in. <strong>These are what will publish</strong>{" "}
            once you mark them Ready. Open one to edit — or compare it with the
            platform&apos;s version above.
          </p>
          <div className="adm-week">
            {rows.map((d) => (
              <Link
                key={`saved-${d.date}`}
                href={`/admin/premium?date=${d.date}`}
                className="adm-day"
              >
                <div className="adm-day-top">
                  <span className="adm-day-dow">{weekdayLabel(d.date)}</span>
                  <StatusBadge status={d.status} saved />
                </div>
                <div className="adm-day-date">{prettyDate(d.date)}</div>
                <div className="adm-day-title">{d.data.devHeading?.trim()}</div>
                <div className="adm-day-edit">Open &amp; edit →</div>
              </Link>
            ))}
          </div>
        </>
      )}
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
async function EditorView(date: string, saved: boolean, usePlatform = false) {
  const existing = await premiumGetByDate(date);
  const platformData = fullPremiumFor(date);
  const data: PremiumData = usePlatform
    ? platformData
    : (existing?.data ?? platformData);
  const status = usePlatform ? "draft" : (existing?.status ?? "draft");
  const weekday = weekdayLabel(date);
  const pending = await pendingForIssue("premium", date);
  const goodNews = await getDailyGoodNews(3);
  const previewIssue: PremiumIssue = {
    date,
    status,
    title: existing?.title ?? "",
    data,
  };
  const previewHtml = renderPremiumHtml(previewIssue, goodNews);

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

      {/* Version switcher — your pasted draft vs the platform's auto-written one */}
      {usePlatform ? (
        <div className="adm-gennote">
          🤖 You&apos;re viewing{" "}
          <strong>the platform&apos;s auto-written version</strong>. Edit anything,
          then <strong>Save</strong> to use it for this day
          {existing ? " (this replaces your pasted draft)" : ""}.{" "}
          {existing && (
            <Link href={`/admin/premium?date=${date}`}>
              ← Back to your pasted draft
            </Link>
          )}
        </div>
      ) : (
        existing && (
          <div className="adm-gennote">
            ✍️ This is <strong>your pasted draft</strong> (what will publish).{" "}
            <Link href={`/admin/premium?date=${date}&source=platform`}>
              Compare with the platform&apos;s auto-written version →
            </Link>
          </div>
        )
      )}

      {!usePlatform && !existing && (
        <div className="adm-gennote">
          ✨ This is a complete, auto-generated premium draft. Edit anything
          below, then <strong>Save</strong> to keep your version.
        </div>
      )}

      {/* Editorial safety net — quick checks + optional AI deep check */}
      <EditorialCheck findings={checkPremium(data)} pub="premium" date={date} />

      {/* Suggested edits (inline diffs) + live preview, side by side */}
      <div className="adm-review-cols">
        <div className="adm-review-left">
          <NewsletterIssueReview
            publication="premium"
            date={date}
            pending={pending}
            backPath={`/admin/premium?date=${date}`}
          />
        </div>
        <div className="adm-preview adm-preview-sticky">
          <div className="adm-preview-tag">
            Live preview · Premium · {weekday}, {prettyDate(date)}
          </div>
          <div
            className="adm-preview-frame"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>

      {/* Hand-edit form — at the bottom */}
      <h3 className="adm-group" id="edit" style={{ marginTop: 28 }}>✏️ Edit this issue by hand</h3>
      <div className="adm-cols-single">
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

          <h3 className="adm-group">The Word for Today · daily</h3>
          <p className="adm-grouphint">
            The approachable main devotional — context, the key verse, an
            encouraging reflection, and a key word. The deeper sections come next.
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
          <Field label="Pause & reflect (a quiet line mid-read)" hint="Premium touch — an italic pause inside the main devotional">
            <textarea name="devPause" defaultValue={data.devPause} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">✨ The Daily Discipleship Rhythm</h3>
          <p className="adm-grouphint">
            The sections that make premium worth paying for — deeper Bible
            teaching, personal formation, prayer, and a real next step.
          </p>
          <Field label="Deeper Walk (fuller Bible teaching & context)">
            <textarea name="deeperWalk" defaultValue={data.deeperWalk} className="adm-textarea" rows={5} />
          </Field>
          <Field label="The Bible Thread (how today's passage points to Jesus)">
            <textarea name="bibleThread" defaultValue={data.bibleThread} className="adm-textarea" rows={4} />
          </Field>
          <Field label="Heart Check (2–3 questions — one per line)" hint="Each line becomes its own question">
            <textarea name="heartCheck" defaultValue={data.heartCheck} className="adm-textarea" rows={4} />
          </Field>
          <Field label="Journal With God (one deeper journaling prompt)">
            <textarea name="journalPrompt" defaultValue={data.journalPrompt} className="adm-textarea" rows={3} />
          </Field>
          <Field label="Spiritual Wellness Guide (one grounding practice)" hint="Keep it practical — a slow prayer + a breath, not medical advice">
            <textarea name="wellnessPractice" defaultValue={data.wellnessPractice} className="adm-textarea" rows={4} />
          </Field>
          <Field label="Pray the Word (a Scripture-shaped prayer)">
            <textarea name="devPrayer" defaultValue={data.devPrayer} className="adm-textarea" rows={3} />
          </Field>
          <Field label="Walk It Out (one real act of obedience today)">
            <textarea name="walkItOut" defaultValue={data.walkItOut} className="adm-textarea" rows={3} />
          </Field>
          <Field label="Save This Line (a short, shareable pull-quote)" hint="Falls back to the Closing line if left blank">
            <input name="saveLine" defaultValue={data.saveLine} className="adm-input" />
          </Field>
          <Field label="Tomorrow's Thread (a one-line teaser for tomorrow)">
            <textarea name="tomorrowThread" defaultValue={data.tomorrowThread} className="adm-textarea" rows={2} />
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
          <Field label="Pause & reflect (a quiet line mid-read)" hint="Premium touch — an italic pause inside the weekend study">
            <textarea name="studyPause" defaultValue={data.studyPause} className="adm-textarea" rows={2} />
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
            <CopyButton text={previewHtml} />
          </div>
        </form>
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
  const goodNews = await getDailyGoodNews(3);

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
          <CopyButton text={renderPremiumHtml(issue, goodNews)} label="Copy email HTML" />
        </div>
        <div
          className="adm-preview-frame adm-preview-frame-tall"
          dangerouslySetInnerHTML={{ __html: renderPremiumHtml(issue, goodNews) }}
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
