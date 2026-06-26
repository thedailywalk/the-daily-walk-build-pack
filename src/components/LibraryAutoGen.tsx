"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Result = { ok?: boolean; batchId?: string | null; wbmode?: string | null; wellness?: boolean };

/**
 * Runs right after a Library save: kicks off the background AI generation
 * (workbook suggestions + wellness draft) so the save itself stays instant.
 * Shows a gentle progress banner, then refreshes to reveal the results.
 */
export default function LibraryAutoGen({ id }: { id: string }) {
  const [status, setStatus] = useState<"working" | "done" | "error">("working");
  const [res, setRes] = useState<Result>({});
  const router = useRouter();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    (async () => {
      try {
        const r = await fetch("/api/library/generate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = (await r.json()) as Result;
        if (data.ok) {
          setRes(data);
          setStatus("done");
          // Drop ?gen= so a refresh won't re-run, and reveal the new card.
          router.replace("/admin/library?saved=1");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    })();
  }, [id, router]);

  if (status === "working") {
    return (
      <div className="adm-saved lib-gen">
        <span className="lib-gen-spin" aria-hidden="true" />
        Saved ✓ — turning it into suggestions… (a few seconds)
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="adm-saved">
        Saved ✓ — but the suggestions didn&apos;t generate. Open the item, hit{" "}
        <strong>Edit → Save</strong> to try again.
      </div>
    );
  }
  return (
    <div className="adm-saved">
      Saved ✓
      {res.wbmode ? <> — workbook edits {res.wbmode === "ai" ? "✦ written by AI" : "(quick draft)"}</> : null}
      {res.wellness ? " · wellness draft ready 🕊" : null}
      {res.batchId ? (
        <>
          {" "}
          <Link href={`/admin/workbook#batch-${res.batchId}`} className="adm-inline-link">
            See the suggested workbook edits →
          </Link>
        </>
      ) : null}
    </div>
  );
}
