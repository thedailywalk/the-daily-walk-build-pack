import type { StudyDay } from "@/lib/studyGuide";
import {
  FIELD_LABEL,
  type EditableField,
  type Suggestion,
} from "@/lib/workbookEvolution";
import { wordDiff, hasChange } from "@/lib/textDiff";
import {
  approveSuggestionAction,
  rejectSuggestionAction,
} from "@/app/admin/workbook/actions";

/**
 * A read-only preview of how a study day actually reads on the live workbook —
 * with any pending suggestion shown inline as a tracked-changes diff (struck-out
 * "before" + highlighted "after") and Approve / Dismiss right there, so the owner
 * can see the whole page and decide in context.
 */

// The order the sections appear to a reader, with the icon each uses on /journey.
const SECTION_ORDER: { field: EditableField; icon: string }[] = [
  { field: "context", icon: "🧭" },
  { field: "plainEnglish", icon: "📖" },
  { field: "aboutGod", icon: "✨" },
  { field: "aboutPeople", icon: "❤️" },
  { field: "realLife", icon: "🌱" },
  { field: "reflection", icon: "🤔" },
  { field: "prayer", icon: "🙏" },
  { field: "step", icon: "👣" },
  { field: "sideReflection", icon: "💛" },
];

function Paras({ text }: { text: string }) {
  return (
    <>
      {(text || "").split(/\n{2,}/).map((p, i) => (
        <p key={i} className="wbp-p">
          {p.split("\n").map((line, j) => (
            <span key={j}>
              {line}
              {j < p.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

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

export default function WorkbookDayPreview({
  day,
  base,
  merged,
  pending,
  locked,
}: {
  day: number;
  base: StudyDay;
  merged: StudyDay;
  pending: Suggestion[];
  locked: boolean;
}) {
  // First pending suggestion per field (one tracked-change per section at a time).
  const byField = new Map<EditableField, Suggestion>();
  for (const s of pending) if (!byField.has(s.targetField)) byField.set(s.targetField, s);

  const val = (f: EditableField) =>
    String((merged as unknown as Record<string, unknown>)[f] ?? "");

  return (
    <div className="wbp">
      <div className="wbp-banner">
        <span className="wbp-kicker">Live preview · how readers see Day {day}</span>
        <span className="wbp-legend">
          <del className="wbp-del">removed</del> <ins className="wbp-add">added</ins> = a suggested change
        </span>
      </div>

      {/* Reading + key verse (fixed) */}
      <div className="wbp-hero">
        <div className="wbp-hero-kicker">{base.arc}</div>
        <div className="wbp-hero-title">Day {day} · {base.reading}</div>
      </div>
      <div className="wbp-verse">{base.verse}</div>

      {/* Walkthrough sections */}
      {SECTION_ORDER.map(({ field, icon }) => {
        const sug = byField.get(field);
        const current = val(field);
        if (!current && !sug) return null;
        const changed = sug && hasChange(current, sug.proposedText);
        return (
          <div key={field} className={`wbp-sec${sug ? " wbp-sec-sug" : ""}`}>
            <div className="wbp-sec-h">
              <span className="wbp-ico">{icon}</span>
              {FIELD_LABEL[field]}
              {sug && <span className="wbp-flag">suggested edit</span>}
            </div>

            {sug ? (
              changed ? (
                <Diff before={current} after={sug.proposedText} />
              ) : (
                <Paras text={sug.proposedText} />
              )
            ) : (
              <Paras text={current} />
            )}

            {sug && (
              <div className="wbp-sug-meta">
                <p className="wb-why"><span className="wb-tag">Why it fits</span> {sug.whyFits}</p>
                {sug.impact && <p className="wb-impact"><span className="wb-tag">Impact</span> {sug.impact}</p>}
                <p className="wbp-src">
                  From <strong>{sug.sourceLabel || sug.sourceType}</strong>
                  {sug.themes.length > 0 && <span className="wb-themes"> {sug.themes.map((t) => <em key={t}>{t}</em>)}</span>}
                </p>
                <div className="wbp-actions">
                  {locked ? (
                    <span className="adm-hint">🔒 Locked — unlock above to apply changes.</span>
                  ) : (
                    <>
                      <form action={approveSuggestionAction}>
                        <input type="hidden" name="id" value={sug.id} />
                        <input type="hidden" name="day" value={day} />
                        <button className="wb-btn wb-btn-yes" type="submit">✓ Accept change</button>
                      </form>
                      <form action={rejectSuggestionAction}>
                        <input type="hidden" name="id" value={sug.id} />
                        <input type="hidden" name="day" value={day} />
                        <button className="wb-btn wb-btn-no" type="submit">Dismiss</button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Side cards (Key Words, healing verses) — fixed context, shown for fidelity */}
      {(base.keyWords.length > 0 || base.verses.length > 0) && (
        <div className="wbp-side">
          {base.keyWords.map((k, i) => (
            <div key={`k${i}`} className="wbp-card">
              <div className="wbp-card-tag">🔑 Key word · {k.word}</div>
              <p className="wbp-p">{k.meaning}</p>
            </div>
          ))}
          {base.verses.map((v, i) => (
            <div key={`v${i}`} className="wbp-card wbp-card-verse">
              <div className="wbp-card-tag">✨ {v.ref}</div>
              <p className="wbp-p">&ldquo;{v.text}&rdquo;</p>
              <p className="wbp-p wbp-muted">{v.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
