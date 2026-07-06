"use client";

import { useState } from "react";
import type { Finding } from "@/lib/editorialCheck";
import { deepCheckAction } from "@/app/admin/editorialActions";

/**
 * The editorial safety-net panel shown at the top of a draft. `findings` are the
 * fast rule-based checks (computed server-side); the button runs the optional
 * AI deep check (verse accuracy + tone) and appends its findings.
 */
export default function EditorialCheck({
  findings,
  pub,
  date,
}: {
  findings: Finding[];
  pub: "free" | "premium";
  date: string;
}) {
  const [deep, setDeep] = useState<Finding[] | null>(null);
  const [loading, setLoading] = useState(false);

  const all = [...findings, ...(deep ?? [])];
  const warns = all.filter((f) => f.level === "warn").length;

  async function runDeep() {
    setLoading(true);
    try {
      setDeep(await deepCheckAction(pub, date));
    } catch {
      setDeep([{ level: "info", label: "Deep check couldn’t run — try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`edcheck${warns ? " edcheck-hasflags" : ""}`}>
      <div className="edcheck-head">
        <span className="edcheck-title">
          🛡️ Editorial check
          {all.length > 0 && (
            <span className="edcheck-count">
              {warns > 0 ? `${warns} to review` : `${all.length} note${all.length === 1 ? "" : "s"}`}
            </span>
          )}
        </span>
        <button
          type="button"
          className="edcheck-deep"
          onClick={runDeep}
          disabled={loading}
        >
          {loading
            ? "Checking verses & tone…"
            : deep
              ? "Re-run deep check"
              : "Run deep check (verses + tone)"}
        </button>
      </div>

      {all.length === 0 ? (
        <div className="edcheck-clear">
          All clear ✓ — no issues in the quick check.
          {deep === null && (
            <span className="edcheck-hint">
              {" "}
              Run the deep check to verify each verse matches its reference.
            </span>
          )}
        </div>
      ) : (
        <ul className="edcheck-list">
          {all.map((f, i) => (
            <li key={i} className={`edcheck-item edcheck-${f.level}`}>
              <span className="edcheck-ic" aria-hidden="true">
                {f.level === "warn" ? "⚠" : "•"}
              </span>
              <span>
                {f.label}
                {f.detail && <span className="edcheck-detail"> — {f.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      )}
      {deep === null && all.length > 0 && (
        <div className="edcheck-hint edcheck-hint-pad">
          These are quick rule checks. Run the deep check to verify verse accuracy.
        </div>
      )}
    </div>
  );
}
