"use client";

import { useEffect, useState } from "react";
import { voteAction } from "@/app/portal/actions";

export default function QuestionOfDay({
  date,
  question,
  options,
  initialCounts,
}: {
  date: string;
  question: string;
  options: string[];
  initialCounts: number[];
}) {
  const [counts, setCounts] = useState<number[]>(initialCounts);
  const [voted, setVoted] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const storeKey = `tdw-poll-${date}`;

  // Remember if they already answered today (this device).
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(storeKey) : null;
    if (saved !== null) setVoted(Number(saved));
  }, [storeKey]);

  const total = counts.reduce((a, b) => a + b, 0) || 0;

  async function choose(i: number) {
    if (voted !== null || busy) return;
    setBusy(true);
    setVoted(i);
    try {
      localStorage.setItem(storeKey, String(i));
    } catch {}
    try {
      const updated = await voteAction(date, i);
      setCounts(updated);
    } catch {
      // optimistic: bump locally if the call failed
      setCounts((c) => c.map((n, idx) => (idx === i ? n + 1 : n)));
    } finally {
      setBusy(false);
    }
  }

  const showResults = voted !== null;
  const totalForPct = showResults ? Math.max(total, 1) : 1;

  return (
    <section className="qod">
      <span className="m-card-eyebrow qod-eyebrow">✦ Question of the Day</span>
      <h3 className="qod-q">{question}</h3>

      <div className="qod-options">
        {options.map((opt, i) => {
          const pct = showResults ? Math.round((counts[i] / totalForPct) * 100) : 0;
          return (
            <button
              key={opt}
              type="button"
              className={`qod-opt${voted === i ? " mine" : ""}${showResults ? " done" : ""}`}
              onClick={() => choose(i)}
              disabled={showResults || busy}
            >
              {showResults && <span className="qod-fill" style={{ width: `${pct}%` }} />}
              <span className="qod-opt-label">{opt}</span>
              {showResults && <span className="qod-pct">{pct}%</span>}
            </button>
          );
        })}
      </div>

      <p className="qod-foot">
        {showResults
          ? `${total} ${total === 1 ? "member has" : "members have"} reflected today. Carry your answer into a moment of prayer.`
          : "Tap an answer — then take it to God for a quiet moment."}
      </p>
    </section>
  );
}
