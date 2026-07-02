"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Result = {
  ok?: boolean;
  batchId?: string | null;
  wbmode?: string | null;
  wbCount?: number;
  nlCount?: number;
  nlmode?: string | null;
  wellness?: boolean;
};

/**
 * Runs right after a Library save: kicks off the background AI generation
 * (cumulative workbook + newsletter suggestions + wellness draft) so the save
 * itself stays instant. Shows a gentle progress banner, then refreshes to
 * reveal the results.
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
      Saved ✓ — suggestions rebuilt from everything you&apos;ve added.
      {res.wellness ? " · wellness draft ready 🕊" : null}
      <div className="adm-saved-links">
        {res.batchId ? (
          <Link href={`/admin/workbook#review`} className="adm-inline-link">
            See suggested workbook edits
            {typeof res.wbCount === "number" ? ` (${res.wbCount})` : ""}
            {res.wbmode === "ai" ? " ✦" : ""} →
          </Link>
        ) : null}
        {res.nlCount ? (
          <Link href={`/admin/newsletters#suggestions`} className="adm-inline-link">
            See suggested newsletter updates ({res.nlCount}) ✦ →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
