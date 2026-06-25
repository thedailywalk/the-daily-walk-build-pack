import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import { getStudyDay } from "@/lib/studyGuide";
import {
  getDayState,
  mergedDay,
  listSuggestions,
  dayThemes,
  EDITABLE_FIELDS,
  FIELD_LABEL,
  STATUS_LABEL,
  STATUS_BLURB,
  DAY_STATUSES,
  type DayStatus,
} from "@/lib/workbookEvolution";
import { saveDayAction, setStatusAction } from "../actions";
import WorkbookDayPreview from "@/components/WorkbookDayPreview";

export const metadata: Metadata = { title: "Study day", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function DayEditor({
  params,
  searchParams,
}: {
  params: Promise<{ day: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const { day: dayParam } = await params;
  const sp = await searchParams;
  const day = Number(dayParam);
  if (!Number.isInteger(day) || day < 1 || day > 365) notFound();

  const [base, merged, state, suggestions] = await Promise.all([
    getStudyDay(day),
    mergedDay(day),
    getDayState(day),
    listSuggestions({ dayIndex: day, limit: 50 }),
  ]);
  const pending = suggestions.filter((s) => s.status === "pending");
  const themes = dayThemes(day);
  const locked = state.status === "locked";

  return (
    <section className="section">
      <div className="adm-wrap" style={{ maxWidth: 820 }}>
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>Admin · Workbook · Day {day}</div>
            <h1 className="h">{base.reading}</h1>
            <p className="adm-sub">
              <span className={`wb-pill wb-${state.status}`}>{STATUS_LABEL[state.status]}</span>{" "}
              {STATUS_BLURB[state.status]}
              {themes.length > 0 && (
                <span className="wb-themes" style={{ marginLeft: 8 }}>
                  {themes.map((t) => <em key={t}>{t}</em>)}
                </span>
              )}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href={day > 1 ? `/admin/workbook/${day - 1}` : "/admin/workbook"} className="wb-btn wb-btn-ghost">←</Link>
            <Link href="/admin/workbook" className="wb-btn wb-btn-ghost">Dashboard</Link>
            <Link href={day < 365 ? `/admin/workbook/${day + 1}` : "/admin/workbook"} className="wb-btn wb-btn-ghost">→</Link>
          </div>
        </div>

        {sp.saved && <div className="wb-flash">✓ Saved.</div>}

        {/* Status & lock controls */}
        <div className="wb-statusbar">
          {(DAY_STATUSES as DayStatus[]).map((s) => (
            <form action={setStatusAction} key={s}>
              <input type="hidden" name="day" value={day} />
              <input type="hidden" name="status" value={s} />
              <button
                type="submit"
                className={`wb-status-btn${state.status === s ? " is-on" : ""} wb-${s}`}
              >
                {STATUS_LABEL[s]}
              </button>
            </form>
          ))}
        </div>
        {locked && (
          <p className="wb-locked-note">
            🔒 This day is locked — it won’t receive automatic suggestions. Switch it back to Draft to let it
            evolve again.
          </p>
        )}

        {/* Live preview — the whole page as readers see it, with suggested edits
            shown inline as tracked changes you can Accept or Dismiss in context. */}
        {pending.length > 0 && (
          <p className="adm-hint" style={{ marginTop: 4 }}>
            <strong>{pending.length}</strong> suggested edit{pending.length === 1 ? "" : "s"} waiting — shown
            inline below. Accept or dismiss each one right where it lands.
          </p>
        )}
        <WorkbookDayPreview
          day={day}
          base={base}
          merged={merged}
          pending={pending}
          locked={locked}
        />

        {/* Editable content */}
        <h2 className="wb-h2">Edit by hand</h2>
        <p className="adm-hint" style={{ marginTop: -6 }}>
          Prefer to write it yourself? Edit any section in your own voice. Edited sections show on the live
          workbook; blank ones fall back to the original. Reading &amp; verse stay fixed.
        </p>
        <form action={saveDayAction} className="wb-form">
          <input type="hidden" name="day" value={day} />
          <div className="wb-verse-fixed">
            <strong>Verse:</strong> {base.verse}
          </div>
          {EDITABLE_FIELDS.map((f) => {
            const edited = !!state.overrides[f];
            return (
              <label key={f} className="adm-field">
                <span>
                  {FIELD_LABEL[f]}
                  {edited && <em className="wb-edited">edited</em>}
                </span>
                <textarea
                  name={`f_${f}`}
                  rows={f === "context" || f === "plainEnglish" ? 6 : 3}
                  defaultValue={String((merged as unknown as Record<string, unknown>)[f] ?? "")}
                />
              </label>
            );
          })}

          <label className="adm-field">
            <span>Private notes (just for you)</span>
            <textarea name="notes" rows={2} defaultValue={state.notes} />
          </label>

          <label className="adm-field">
            <span>Status after saving</span>
            <select name="status" defaultValue={state.status}>
              {(DAY_STATUSES as DayStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
              ))}
            </select>
          </label>

          <div className="wb-form-actions">
            <button type="submit" className="btn-gold">Save day</button>
            <span className="adm-hint">Your edits override the original for this day.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
