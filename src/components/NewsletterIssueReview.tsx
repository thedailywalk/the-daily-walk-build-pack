import { wordDiff, hasChange } from "@/lib/textDiff";
import {
  FIELD_LABEL,
  type NewsletterSuggestion,
  type Publication,
} from "@/lib/newsletterEvolution";
import {
  approveNewsletterSuggestionAction,
  rejectNewsletterSuggestionAction,
  lockNewsletterIssueAction,
} from "@/app/admin/newsletters/actions";

/**
 * The suggested-edits review for one newsletter issue — the same tracked-changes
 * experience as the workbook: each pending suggestion shows its field as an
 * inline before→after diff with Accept / Dismiss right there. Approving/dismissing
 * redirects back to this editor (via `backPath`) so the live preview on the right
 * updates in place.
 */

function Diff({ before, after }: { before: string; after: string }) {
  const segs = wordDiff(before, after);
  return (
    <p className="wbp-p wbp-diff">
      {segs.map((s, i) =>
        s.type === "same" ? (
          <span key={i}>{s.text}</span>
        ) : s.type === "add" ? (
          <ins key={i} className="wbp-add">{s.text}</ins>
        ) : (
          <del key={i} className="wbp-del">{s.text}</del>
        )
      )}
    </p>
  );
}

function Paras({ text }: { text: string }) {
  return (
    <>
      {(text || "").split(/\n{2,}/).map((p, i) => (
        <p key={i} className="wbp-p">{p}</p>
      ))}
    </>
  );
}

export default function NewsletterIssueReview({
  publication,
  date,
  pending,
  backPath,
}: {
  publication: Publication;
  date: string;
  pending: NewsletterSuggestion[];
  backPath: string;
}) {
  return (
    <div className="wbp">
      <div className="wbp-banner">
        <span className="wbp-kicker">Suggested edits · from your Content Library</span>
        <span className="wbp-legend">
          <del className="wbp-del">removed</del> <ins className="wbp-add">added</ins> = a suggested change
        </span>
      </div>

      {pending.length === 0 ? (
        <p className="adm-sub" style={{ padding: "6px 2px" }}>
          No suggested edits waiting for this issue. Drop content into the{" "}
          <a href="/admin/library?tab=add">Content Library</a> (routed to Newsletter) and
          they&apos;ll appear here to accept in one click.
        </p>
      ) : (
        pending.map((s) => {
          const changed = hasChange(s.currentText, s.proposedText);
          return (
            <div key={s.id} className="wbp-sec wbp-sec-sug">
              <div className="wbp-sec-h">
                {FIELD_LABEL[s.targetField] ?? s.targetField}
                <span className="wbp-flag">suggested edit</span>
              </div>

              {changed ? (
                <Diff before={s.currentText} after={s.proposedText} />
              ) : (
                <Paras text={s.proposedText} />
              )}

              <div className="wbp-sug-meta">
                <p className="wb-why"><span className="wb-tag">Why it fits</span> {s.whyFits}</p>
                {s.impact && <p className="wb-impact"><span className="wb-tag">Impact</span> {s.impact}</p>}
                {s.themes.length > 0 && (
                  <p className="wbp-src">
                    <span className="wb-themes">{s.themes.map((t) => <em key={t}>{t}</em>)}</span>
                  </p>
                )}
                <div className="wbp-actions">
                  <form action={approveNewsletterSuggestionAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="from" value={backPath} />
                    <button className="wb-btn wb-btn-yes" type="submit">✓ Accept change</button>
                  </form>
                  <form action={rejectNewsletterSuggestionAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="from" value={backPath} />
                    <button className="wb-btn wb-btn-no" type="submit">Dismiss</button>
                  </form>
                </div>
              </div>
            </div>
          );
        })
      )}

      {pending.length > 0 && (
        <form action={lockNewsletterIssueAction} className="wbp-lock">
          <input type="hidden" name="publication" value={publication} />
          <input type="hidden" name="date" value={date} />
          <input type="hidden" name="from" value={backPath} />
          <button type="submit" className="wb-btn wb-btn-ghost" title="Mark Ready & stop new suggestions">
            🔒 Lock this issue
          </button>
        </form>
      )}
    </div>
  );
}
