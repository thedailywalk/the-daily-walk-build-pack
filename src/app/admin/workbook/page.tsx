import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import {
  dashboardCounts,
  pendingBatches,
  listSuggestions,
  listDayStates,
  STATUS_LABEL,
  FIELD_LABEL,
  DAY_STATUSES,
  type DayStatus,
} from "@/lib/workbookEvolution";
import {
  approveSuggestionAction,
  rejectSuggestionAction,
} from "./actions";

export const metadata: Metadata = { title: "Workbook Evolution", robots: { index: false } };
export const dynamic = "force-dynamic";

const STATUS_CLASS: Record<DayStatus, string> = {
  draft: "wb-pill wb-draft",
  review: "wb-pill wb-review",
  approved: "wb-pill wb-approved",
  locked: "wb-pill wb-locked",
};

function Snippet({ text, n = 260 }: { text: string; n?: number }) {
  const t = (text || "").trim();
  return <>{t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t}</>;
}

export default async function WorkbookDashboard({
  searchParams,
}: {
  searchParams: Promise<{ added?: string; mode?: string; lib?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  if (!adminDbConfigured) {
    return (
      <section className="section">
        <div className="adm-wrap">
          <div className="sec-tag" style={{ textAlign: "left" }}>Admin · Workbook Evolution</div>
          <p className="adm-sub" style={{ marginTop: 12 }}>
            Connect Supabase (service-role key) to turn on the living workbook. Run{" "}
            <code>supabase/workbook-evolution.sql</code> first, then add the admin keys.
          </p>
        </div>
      </section>
    );
  }

  const [counts, batches, applied, states] = await Promise.all([
    dashboardCounts(),
    pendingBatches(),
    listSuggestions({ status: "applied", limit: 40 }),
    listDayStates(),
  ]);

  const touchedDays = [...states.values()]
    .filter((d) => d.status !== "draft" || Object.keys(d.overrides).length)
    .sort((a, b) => a.dayIndex - b.dayIndex);

  return (
    <section className="section lib-warm wb-warm">
      <div className="adm-wrap">
        <header className="lib-hero">
          <div className="lib-hero-kicker">Admin · Workbook Evolution</div>
          <h1 className="lib-hero-title">The Living Workbook</h1>
          <p className="lib-hero-sub">
            New inspiration becomes <strong>targeted</strong> suggestions — only on study days that
            genuinely fit, never on locked ones. You approve every change; nothing edits itself.
          </p>
          <div className="lib-hero-stats">
            {(DAY_STATUSES as DayStatus[]).map((s) => (
              <div key={s} className="lib-hero-stat"><b>{counts[s]}</b><span>{STATUS_LABEL[s]}</span></div>
            ))}
          </div>
          <div className="lib-hero-cta">
            <Link href="/admin/workbook/submit" className="btn-gold">＋ Add inspiration</Link>
          </div>
        </header>

        {sp.added && Number(sp.added) > 0 && (
          <div className="wb-flash">
            ✓ Added <strong>{sp.added}</strong> suggested update{Number(sp.added) === 1 ? "" : "s"} to the
            review queue{sp.mode === "ai" ? " (written by AI)" : ""}. Review them below.
            {sp.lib && <> Also saved to your <Link href="/admin/library?final=1">Content Library</Link> as a draft.</>}
          </div>
        )}
        {sp.added === "0" && (
          <div className="wb-flash wb-flash-soft">
            Saved — but nothing landed in the queue. Try a longer transcript, or one with a clearer theme.
            {sp.lib && <> It was still saved to your <Link href="/admin/library?final=1">Content Library</Link> as a draft.</>}
          </div>
        )}

        {/* Waiting for review */}
        <h2 className="wb-h2">New inspiration waiting for review</h2>
        {batches.length === 0 ? (
          <p className="adm-sub">
            Nothing waiting. <Link href="/admin/workbook/submit">Paste a reel or sermon transcript</Link> and
            the system will suggest where it strengthens the workbook.
          </p>
        ) : (
          batches.map((b) => (
            <div key={b.batchId} className="wb-batch">
              <div className="wb-batch-head">
                <span className="wb-src-type">{b.sourceType}</span>
                <strong>{b.sourceLabel}</strong>
                <span className="wb-batch-count">{b.suggestions.length} suggested update{b.suggestions.length === 1 ? "" : "s"}</span>
              </div>
              {b.suggestions.map((s) => (
                <div key={s.id} className="wb-sug">
                  <div className="wb-sug-top">
                    <Link href={`/admin/workbook/${s.dayIndex}`} className="wb-sug-day">Day {s.dayIndex}</Link>
                    <span className="wb-sug-field">→ {FIELD_LABEL[s.targetField]}</span>
                    <span className="wb-themes">{s.themes.map((t) => <em key={t}>{t}</em>)}</span>
                  </div>
                  <p className="wb-why"><span className="wb-tag">Why it fits</span> {s.whyFits}</p>
                  <div className="wb-proposed">
                    <span className="wb-tag">Proposed revision</span>
                    <Snippet text={s.proposedText} n={400} />
                  </div>
                  <p className="wb-impact"><span className="wb-tag">Impact</span> {s.impact}</p>
                  <div className="wb-sug-actions">
                    <form action={approveSuggestionAction}>
                      <input type="hidden" name="id" value={s.id} />
                      <button className="wb-btn wb-btn-yes" type="submit">Approve &amp; apply</button>
                    </form>
                    <form action={rejectSuggestionAction}>
                      <input type="hidden" name="id" value={s.id} />
                      <button className="wb-btn wb-btn-no" type="submit">Dismiss</button>
                    </form>
                    <Link href={`/admin/workbook/${s.dayIndex}`} className="wb-btn wb-btn-ghost">Open day →</Link>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        {/* Days in motion */}
        <h2 className="wb-h2">Study days in motion</h2>
        {touchedDays.length === 0 ? (
          <p className="adm-sub">Every day is a fresh draft. As you approve updates and lock days, they’ll appear here.</p>
        ) : (
          <div className="wb-day-list">
            {touchedDays.map((d) => (
              <Link key={d.dayIndex} href={`/admin/workbook/${d.dayIndex}`} className="wb-day-row">
                <span className="wb-day-n">Day {d.dayIndex}</span>
                <span className={STATUS_CLASS[d.status]}>{STATUS_LABEL[d.status]}</span>
                {Object.keys(d.overrides).length > 0 && (
                  <span className="wb-day-edits">{Object.keys(d.overrides).length} edited section{Object.keys(d.overrides).length === 1 ? "" : "s"}</span>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Approved changes archive */}
        <h2 className="wb-h2">Approved changes</h2>
        {applied.length === 0 ? (
          <p className="adm-sub">Approved revisions are archived here so you can see how the workbook has grown.</p>
        ) : (
          <div className="wb-archive">
            {applied.map((s) => (
              <div key={s.id} className="wb-arch-row">
                <Link href={`/admin/workbook/${s.dayIndex}`} className="wb-day-n">Day {s.dayIndex}</Link>
                <span className="wb-arch-field">{FIELD_LABEL[s.targetField]}</span>
                <span className="wb-arch-src">from {s.sourceLabel}</span>
              </div>
            ))}
          </div>
        )}

        <p className="wb-foot">
          Want to add a study day directly? Open any{" "}
          <Link href="/admin/workbook/1">day editor</Link> to read, edit, set its status, or lock it.
        </p>
      </div>
    </section>
  );
}
