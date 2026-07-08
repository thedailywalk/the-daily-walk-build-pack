"use client";

import { useState, useTransition } from "react";
import { pushDraftAction } from "@/app/admin/beehiivActions";

/**
 * "Push to beehiiv (draft)" — sends the current issue to beehiiv as a draft
 * post (nothing is emailed). Shows the result inline: a link to the draft on
 * success, or the beehiiv error (e.g. missing key / plan-gated) on failure.
 */
export default function BeehiivPushButton({
  pub,
  date,
}: {
  pub: "free" | "premium";
  date: string;
}) {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<
    { ok: true; msg: string; url?: string } | { ok: false; msg: string } | null
  >(null);

  function run() {
    setResult(null);
    start(async () => {
      const res = await pushDraftAction(pub, date);
      if (res.ok) {
        setResult({
          ok: true,
          msg: `Draft created in beehiiv${res.status ? ` · ${res.status}` : ""}.`,
          url: res.webUrl,
        });
      } else {
        setResult({ ok: false, msg: res.error });
      }
    });
  }

  return (
    <span className="bh-push">
      <button type="button" className="btn btn-ghost" onClick={run} disabled={pending}>
        {pending ? "Pushing…" : "↗ Push to beehiiv (draft)"}
      </button>
      {result && (
        <span className={`bh-push-res ${result.ok ? "is-ok" : "is-err"}`}>
          {result.ok ? "✓ " : "⚠ "}
          {result.msg}
          {result.ok && result.url && (
            <>
              {" · "}
              <a href={result.url} target="_blank" rel="noreferrer">
                Open in beehiiv →
              </a>
            </>
          )}
        </span>
      )}
    </span>
  );
}
