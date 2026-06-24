"use client";

import { useState } from "react";
import {
  saveFeaturedAction,
  clearFeaturedAction,
  type FeaturedInput,
} from "@/app/admin/good-news/actions";

export type CandidateItem = FeaturedInput & { faith: boolean };

export default function GoodNewsCurator({
  candidates,
  initialSelected,
}: {
  candidates: CandidateItem[];
  initialSelected: string[];
}) {
  const [selected, setSelected] = useState<string[]>(
    initialSelected.slice(0, 3)
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function toggle(href: string) {
    setMsg("");
    setSelected((s) =>
      s.includes(href)
        ? s.filter((h) => h !== href)
        : s.length >= 3
          ? s
          : [...s, href]
    );
  }

  async function save() {
    setBusy(true);
    setMsg("");
    const items = selected
      .map((h) => candidates.find((c) => c.href === h))
      .filter(Boolean) as CandidateItem[];
    const res = await saveFeaturedAction(
      items.map(({ faith, ...rest }) => {
        void faith;
        return rest;
      })
    );
    setBusy(false);
    setMsg(
      "error" in res
        ? res.error
        : selected.length
          ? "Saved — your picks are now live on the homepage. 🙏"
          : "Saved — back to automatic."
    );
  }

  async function useAutomatic() {
    setBusy(true);
    setMsg("");
    await clearFeaturedAction();
    setSelected([]);
    setBusy(false);
    setMsg("Back to automatic — the homepage will show today's top stories.");
  }

  const faithChosen = selected.some(
    (h) => candidates.find((c) => c.href === h)?.faith
  );

  return (
    <>
      {/* Sticky action bar */}
      <div className="gnc-bar">
        <div className="gnc-status">
          <strong>{selected.length}/3</strong> selected
          {selected.length > 0 && !faithChosen && (
            <span className="gnc-warn"> · add a ✝ faith story?</span>
          )}
        </div>
        <div className="gnc-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={useAutomatic}
            disabled={busy}
          >
            Use automatic
          </button>
          <button
            type="button"
            className="btn btn-gold"
            onClick={save}
            disabled={busy}
          >
            {busy ? "Saving…" : selected.length ? "Show my picks" : "Save"}
          </button>
        </div>
      </div>
      {msg && (
        <p className="gnc-msg" role="status">
          {msg}
        </p>
      )}

      <div className="gnc-grid">
        {candidates.map((c) => {
          const idx = selected.indexOf(c.href);
          const on = idx !== -1;
          return (
            <button
              type="button"
              key={c.href}
              className={`gnc-card${on ? " is-on" : ""}`}
              onClick={() => toggle(c.href)}
              aria-pressed={on}
            >
              <div className={`gnc-thumb${c.image ? " has-img" : " gntile"}`}>
                {c.image ? (
                  // Admin-only reference image — helps visual selection. Never
                  // shown publicly (public cards use branded tiles).
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.image}
                    alt=""
                    className="gnc-img"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="gntile-mark" aria-hidden="true">
                    🌅
                  </span>
                )}
                {on && <span className="gnc-num">{idx + 1}</span>}
                {c.faith && (
                  <span className="gnc-faith" title="Christian faith story">
                    ✝ Faith
                  </span>
                )}
              </div>
              <div className="gnc-text">
                <span className="gnc-cat">{c.category}</span>
                <span className="gnc-head">{c.headline}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
