import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import {
  adminGetByDate,
  adminListRange,
  adminListBefore,
  upcomingDates,
  fullDevotionalFor,
  weekdayLabel,
  prettyDate,
  type Devotional,
  type DevotionalData,
} from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import { getDevotionalReferences } from "@/lib/library";
import { getDailyGoodNews } from "@/lib/goodNews";
import { pendingForIssue } from "@/lib/newsletterEvolution";
import NewsletterIssueReview from "@/components/NewsletterIssueReview";
import AdminNav from "@/components/AdminNav";
import {
  saveDevotionalAction,
  prepareWeekAction,
  deleteDevotionalAction,
  importDevotionalsAction,
} from "./actions";
import CopyButton from "./CopyButton";
import EditorialCheck from "@/components/EditorialCheck";
import { checkFree } from "@/lib/editorialCheck";

export const metadata: Metadata = {
  title: "Devotional Prep",
  robots: { index: false },
};

export default async function DevotionalAdminPage({
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
              Admin · Devotional Prep{" "}
              <span className="adm-tier-pill adm-tier-pill-free">Free Daily</span>
            </div>
            <p className="adm-sub">
              Plan, write, and schedule the free daily devotional that goes to
              everyone. Every date opens fully written — read it, edit in your
              voice, mark it <strong>Ready</strong>, and it publishes on its own
              date. Looking for the paid newsletter?{" "}
              <Link href="/admin/premium" className="adm-inline-link">
                Open Premium Prep →
              </Link>
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

        <AdminNav active={view === "archive" ? "archive" : "week"} />

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
  const rows = await adminListRange(dates[0], dates[dates.length - 1]);
  const byDate = new Map(rows.map((r) => [r.date, r]));

  return (
    <div>
      {importResult && (
        <div className="adm-saved" style={{ marginBottom: 14 }}>
          Imported {importResult.created} devotional
          {importResult.created === 1 ? "" : "s"} as draft
          {importResult.created === 1 ? "" : "s"}.
          {importResult.skipped > 0 && (
            <> {importResult.skipped} block(s) skipped (missing a valid date).</>
          )}{" "}
          Click a day below to review, then mark it <strong>Ready</strong>.
        </div>
      )}

      <div className="adm-bar">
        <h2 className="adm-h2">The week ahead</h2>
        <form action={prepareWeekAction}>
          <button type="submit" className="btn btn-gold">
            Prepare next 7 days
          </button>
        </form>
      </div>
      <p className="adm-hintline">
        Every day is generated complete and ready to read. Click any date to open
        the full issue, edit it, then mark it <strong>Ready</strong>.
      </p>

      {/* Quick paste → create devotionals from labeled text */}
      <details className="adm-paste">
        <summary className="adm-paste-sum">
          📋 Quick paste — create devotionals from text
        </summary>
        <form action={importDevotionalsAction} className="adm-paste-form">
          <p className="adm-paste-help">
            Paste one or more days in the labeled format. Separate each day with a
            line of three dashes (<code>---</code>), and give each day a{" "}
            <code>date: YYYY-MM-DD</code> line. Recognized fields:{" "}
            <code>
              readingHeading, readingRef, readingIntro, verseText, verseRef,
              readingAfter, keyWord, makeItRealHeading, makeItRealBody, question,
              prayer, pastorTake, closingLine
            </code>{" "}
            (and more). Anything it doesn&apos;t recognize is ignored, so you can
            paste a whole draft file as-is.
          </p>
          <textarea
            name="paste"
            className="adm-textarea"
            rows={12}
            placeholder={
              "date: 2026-07-06\n" +
              "readingHeading: You don't need perfect faith — just look up\n" +
              "readingRef: Numbers 21–23 · Mark 9\n" +
              "verseText: I do believe; help me overcome my unbelief!\n" +
              "verseRef: Mark 9:24\n" +
              "prayer: Jesus, I believe; help my unbelief...\n" +
              "---\n" +
              "date: 2026-07-08\n" +
              "readingHeading: ...\n"
            }
          />
          <label className="adm-paste-check">
            <input type="checkbox" name="publish" value="1" /> Publish immediately
            (mark Ready). Leave unchecked to create drafts you preview first.
          </label>
          <button type="submit" className="btn btn-gold">
            Create devotionals
          </button>
        </form>
      </details>

      {/* The platform's own auto-written version for each day (always available) */}
      <h3 className="adm-group">🤖 The platform&apos;s auto-written version</h3>
      <p className="adm-hintline">
        What the app writes on its own for each day. Tap any day to preview it —
        and <strong>Save</strong> to use it instead of your pasted draft.
      </p>
      <div className="adm-week">
        {dates.map((date) => {
          const heading = fullDevotionalFor(date).readingHeading?.trim();
          return (
            <Link
              key={`platform-${date}`}
              href={`/admin/devotionals?date=${date}&source=platform`}
              className="adm-day"
            >
              <div className="adm-day-top">
                <span className="adm-day-dow">{weekdayLabel(date)}</span>
                <span className="adm-badge adm-badge-none">Auto</span>
              </div>
              <div className="adm-day-date">{prettyDate(date)}</div>
              <div className="adm-day-title">{heading}</div>
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
                href={`/admin/devotionals?date=${d.date}`}
                className="adm-day"
              >
                <div className="adm-day-top">
                  <span className="adm-day-dow">{weekdayLabel(d.date)}</span>
                  <StatusBadge status={d.status} saved />
                </div>
                <div className="adm-day-date">{prettyDate(d.date)}</div>
                <div className="adm-day-title">
                  {d.data.readingHeading?.trim()}
                </div>
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
  const [existing, refs, pending, goodNews] = await Promise.all([
    adminGetByDate(date),
    getDevotionalReferences(date),
    pendingForIssue("free", date),
    getDailyGoodNews(3),
  ]);
  // When ?source=platform, show the app's own auto-written version even if a
  // pasted draft is saved — so you can compare the two and pick either.
  const platformData = fullDevotionalFor(date);
  const data: DevotionalData = usePlatform
    ? platformData
    : (existing?.data ?? platformData);
  const status = usePlatform ? "draft" : (existing?.status ?? "draft");
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

      {/* Version switcher — your pasted draft vs the platform's auto-written one */}
      {usePlatform ? (
        <div className="adm-gennote">
          🤖 You&apos;re viewing <strong>the platform&apos;s auto-written version</strong>.
          Edit anything, then <strong>Save</strong> to use it for this day
          {existing ? " (this replaces your pasted draft)" : ""}.{" "}
          {existing && (
            <Link href={`/admin/devotionals?date=${date}`}>
              ← Back to your pasted draft
            </Link>
          )}
        </div>
      ) : (
        existing && (
          <div className="adm-gennote">
            ✍️ This is <strong>your pasted draft</strong> (what will publish).{" "}
            <Link href={`/admin/devotionals?date=${date}&source=platform`}>
              Compare with the platform&apos;s auto-written version →
            </Link>
          </div>
        )
      )}

      {!usePlatform && !existing && (
        <div className="adm-gennote">
          ✨ This is a complete, auto-generated draft. Edit anything below, then{" "}
          <strong>Save</strong> to keep your version.
        </div>
      )}

      {/* Editorial safety net — quick checks + optional AI deep check */}
      <EditorialCheck findings={checkFree(data)} pub="free" date={date} />

      {/* Suggested edits (inline diffs) + live preview, side by side */}
      <div className="adm-review-cols">
        <div className="adm-review-left">
          <NewsletterIssueReview
            publication="free"
            date={date}
            pending={pending}
            backPath={`/admin/devotionals?date=${date}`}
          />
        </div>
        <div className="adm-preview adm-preview-sticky">
          <div className="adm-preview-tag">
            Live preview · {weekdayLabel(date)}, {prettyDate(date)}
          </div>
          <div
            className="adm-preview-frame"
            dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(previewDev, goodNews) }}
          />
        </div>
      </div>

      {/* Hand-edit form — at the bottom */}
      <h3 className="adm-group" id="edit" style={{ marginTop: 28 }}>✏️ Edit this issue by hand</h3>
      <div className="adm-cols-single">
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
          <Field label="Key word (Word — plain-English meaning)" hint="One term from the passage, unpacked">
            <textarea name="keyWord" defaultValue={data.keyWord} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">Make It Real</h3>
          <Field label="Heading">
            <input name="makeItRealHeading" defaultValue={data.makeItRealHeading} className="adm-input" />
          </Field>
          <Field label="Body">
            <textarea name="makeItRealBody" defaultValue={data.makeItRealBody} className="adm-textarea" rows={4} />
          </Field>
          <Field label="Reflection question">
            <textarea name="question" defaultValue={data.question} className="adm-textarea" rows={2} />
          </Field>

          <h3 className="adm-group">Prayer</h3>
          <Field label="A prayer for today">
            <textarea name="prayer" defaultValue={data.prayer} className="adm-textarea" rows={3} />
          </Field>

          <h3 className="adm-group">How Healing Works (optional · neuroscience)</h3>
          <Field
            label="The science blurb"
            hint="Neuroscience-grounded only. Romans 12:2 is added under the title automatically. Leave blank to hide this section that day."
          >
            <textarea name="healingScience" defaultValue={data.healingScience} className="adm-textarea" rows={4} />
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
            <CopyButton text={renderDevotionalHtml(previewDev, goodNews)} />
          </div>
        </form>
      </div>

      <ReferencesPanel refs={refs} />
    </div>
  );
}

/* ---------------------- behind the devotional (admin only) -------------- */
function ReferencesPanel({
  refs,
}: {
  refs: Awaited<ReturnType<typeof getDevotionalReferences>>;
}) {
  return (
    <details className="adm-refs" open>
      <summary className="adm-refs-sum">
        🔎 Behind the Devotional — admin only{" "}
        <span className="adm-refs-note">(subscribers never see this)</span>
      </summary>
      <p className="adm-refs-expl">{refs.explanation}</p>

      {refs.thinTopics.length > 0 && (
        <div className="adm-refs-warn">
          ⚠ Your library is thin on: <strong>{refs.thinTopics.join(", ")}</strong>.
          This day leaned more on outside inspiration than on your own saved
          material. <Link href="/admin/library">Add material →</Link>
        </div>
      )}

      <div className="adm-refs-grid">
        <div className="adm-refs-col">
          <h4>Topic tags</h4>
          <div className="lib-tags">
            {refs.topics.map((t) => (
              <Link key={t} href={`/admin/library?topic=${encodeURIComponent(t)}`} className="lib-tag">
                {t}
              </Link>
            ))}
          </div>
        </div>
        <div className="adm-refs-col">
          <h4>Scripture influences</h4>
          <div className="lib-tags">
            {refs.scriptures.map((s) => (
              <span key={s} className="lib-tag lib-tag-verse">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="adm-refs-col">
          <h4>Library items used ({refs.items.length})</h4>
          {refs.items.length === 0 ? (
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>
              None saved on these themes yet.
            </p>
          ) : (
            <ul className="adm-refs-list">
              {refs.items.slice(0, 8).map((it) => (
                <li key={it.id}>
                  <Link href={`/admin/library?edit=${it.id}`}>
                    {it.title || it.body.slice(0, 60) || "(untitled)"}
                  </Link>{" "}
                  <span className="adm-refs-kind">· {it.kind}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="adm-refs-col">
          <h4>Inspiration sources considered ({refs.sources.length})</h4>
          {refs.sources.length === 0 ? (
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>
              None matched. <Link href="/admin/inspiration">Manage sources →</Link>
            </p>
          ) : (
            <ul className="adm-refs-list">
              {refs.sources.map((s) => (
                <li key={s.id}>
                  {s.name}
                  {s.handle && <span className="adm-refs-kind"> · {s.handle}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className="adm-refs-foot">
        Inspiration sources are used for theme, tone, and direction only — every
        devotional is written original and in your voice.
      </p>
    </details>
  );
}

/* -------------------------------- archive ------------------------------- */
async function ArchiveList() {
  const today = upcomingDates(1)[0];
  const rows = await adminListBefore(today);

  return (
    <div>
      <div className="adm-bar">
        <h2 className="adm-h2">Archive</h2>
      </div>
      <p className="adm-hintline">
        Past devotionals, newest first. Open any to review the full issue —
        read-only, so you can&apos;t change something already sent.
      </p>

      {rows.length === 0 ? (
        <div className="sg-zone sg-zone-cool">
          <p className="muted" style={{ margin: 0 }}>
            No past devotionals yet. Once issues go live on their date, they&apos;ll
            collect here.
          </p>
        </div>
      ) : (
        <div className="adm-archlist">
          {rows.map((d) => (
            <Link
              key={d.date}
              href={`/admin/devotionals?view=archive&date=${d.date}`}
              className="adm-archrow"
            >
              <div className="adm-archrow-main">
                <span className="adm-archrow-date">
                  {weekdayLabel(d.date)}, {prettyDate(d.date)}
                </span>
                <span className="adm-archrow-title">
                  {d.data.readingHeading?.trim() || d.title || "Untitled issue"}
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
  const dev = await adminGetByDate(date);

  if (!dev) {
    return (
      <div>
        <Link href="/admin/devotionals?view=archive" className="adm-back">
          ← Archive
        </Link>
        <div className="sg-zone sg-zone-cool" style={{ marginTop: 14 }}>
          <p className="muted" style={{ margin: 0 }}>
            No saved devotional for {prettyDate(date)}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-editor">
      <div className="adm-bar">
        <div>
          <Link href="/admin/devotionals?view=archive" className="adm-back">
            ← Archive
          </Link>
          <h2 className="adm-h2" style={{ marginTop: 4 }}>
            {weekdayLabel(date)}, {prettyDate(date)}
          </h2>
        </div>
        <Link href={`/admin/devotionals?date=${date}`} className="btn btn-ghost">
          Edit this issue
        </Link>
      </div>

      <div className="adm-readonly-banner">
        📦 Archived issue · read-only. Use <strong>Edit this issue</strong> only
        if you mean to change something already published.
      </div>

      <div className="adm-archview">
        <div className="adm-preview-tag">Full issue · {prettyDate(date)}</div>
        <div className="adm-archview-actions">
          <CopyButton text={renderDevotionalHtml(dev)} label="Copy email HTML" />
        </div>
        <div
          className="adm-preview-frame adm-preview-frame-tall"
          dangerouslySetInnerHTML={{ __html: renderDevotionalHtml(dev) }}
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
