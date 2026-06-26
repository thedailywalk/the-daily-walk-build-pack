"use client";

import { useState, useTransition } from "react";
import type { ModuleKey, ModuleStatus } from "@/lib/dashboardConfig";

type Meta = { status: ModuleStatus; visible: boolean; notes: string; inspoUrl: string };

const STATUS_LABEL: Record<ModuleStatus, string> = {
  keep: "Keep",
  refine: "Refining",
  archived: "Archived",
  deleted: "Deleted",
};

/** Tiny mock of each real dashboard section, so the canvas resembles the live dash. */
function Mock({ k }: { k: ModuleKey }) {
  switch (k) {
    case "today":
      return (
        <div className="sc-mock">
          <span className="sc-eyebrow">Today&apos;s Devotional</span>
          <div className="sc-line sc-line-lg" />
          <div className="sc-line sc-line-sm" />
          <span className="sc-btn">Read today&apos;s walk →</span>
        </div>
      );
    case "continue":
      return (
        <div className="sc-mock sc-row">
          <div className="sc-col">
            <span className="sc-eyebrow">Continue · Bible in a Year</span>
            <div className="sc-bar"><span /></div>
          </div>
          <div className="sc-video">▶</div>
        </div>
      );
    case "pace":
      return (
        <div className="sc-mock sc-stats">
          <div className="sc-stat"><b>Day 47</b><i>you</i></div>
          <div className="sc-stat"><b>Day 51</b><i>avg</i></div>
          <div className="sc-stat"><b>312</b><i>walking</i></div>
        </div>
      );
    case "accountability":
      return (
        <div className="sc-mock">
          <span className="sc-eyebrow">The Inner Circle</span>
          {["🥇 Lulu — 340", "🥈 Maria — 290", "🥉 David — 255"].map((r) => (
            <div key={r} className="sc-lbrow">{r}</div>
          ))}
        </div>
      );
    case "wall":
      return (
        <div className="sc-mock">
          <span className="sc-eyebrow">Encouragement Wall</span>
          <div className="sc-wrow"><span className="sc-av" />a praise from the circle…</div>
          <div className="sc-wrow"><span className="sc-av" />an answered prayer…</div>
        </div>
      );
    case "more":
      return (
        <div className="sc-mock">
          <span className="sc-eyebrow">A little more for today</span>
          <div className="sc-chips">{["Momentum", "Badges", "Reflection", "Word of the Day", "Wonder", "Quick access"].map((c) => <span key={c}>{c}</span>)}</div>
        </div>
      );
  }
}

export default function StudioCanvas({
  order: order0,
  meta: meta0,
  labels,
  descs,
  saveOrder,
  saveMeta,
}: {
  order: ModuleKey[];
  meta: Record<ModuleKey, Meta>;
  labels: Record<ModuleKey, string>;
  descs: Record<ModuleKey, string>;
  saveOrder: (order: ModuleKey[]) => Promise<void>;
  saveMeta: (key: ModuleKey, patch: Partial<Meta>) => Promise<void>;
}) {
  const [order, setOrder] = useState<ModuleKey[]>(order0);
  const [meta, setMeta] = useState<Record<ModuleKey, Meta>>(meta0);
  const [sel, setSel] = useState<ModuleKey | null>(null);
  const [drag, setDrag] = useState<ModuleKey | null>(null);
  const [draft, setDraft] = useState({ notes: "", inspoUrl: "" });
  const [pending, start] = useTransition();

  const select = (k: ModuleKey) => {
    setSel(k);
    setDraft({ notes: meta[k].notes ?? "", inspoUrl: meta[k].inspoUrl ?? "" });
  };

  const onDrop = (target: ModuleKey) => {
    if (!drag || drag === target) return setDrag(null);
    const next = order.filter((k) => k !== drag);
    next.splice(next.indexOf(target), 0, drag);
    setOrder(next);
    setDrag(null);
    start(() => { void saveOrder(next); });
  };

  const update = (k: ModuleKey, patch: Partial<Meta>) => {
    setMeta((m) => ({ ...m, [k]: { ...m[k], ...patch } }));
    start(() => { void saveMeta(k, patch); });
  };

  const saveDraft = () => {
    if (!sel) return;
    update(sel, { notes: draft.notes, inspoUrl: draft.inspoUrl });
  };

  return (
    <div className="sc">
      <div className="sc-canvas" aria-label="Dashboard mock — drag to reorder, click to edit">
        <div className="sc-hero">
          <div className="sc-hero-in">
            <span className="sc-eyebrow">Hero · greeting · North Star · Walk Score · journey · memory verse</span>
            <span className="sc-core">core — fixed</span>
          </div>
        </div>

        {order.map((k) => {
          const m = meta[k];
          const hidden = !m.visible || m.status === "archived" || m.status === "deleted";
          return (
            <div
              key={k}
              draggable
              onDragStart={() => setDrag(k)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(k)}
              onClick={() => select(k)}
              onContextMenu={(e) => { e.preventDefault(); select(k); }}
              className={`sc-block${sel === k ? " is-sel" : ""}${hidden ? " is-hidden" : ""}${drag === k ? " is-drag" : ""}`}
              title="Drag to reorder · click or right-click to edit"
            >
              <div className="sc-bbar">
                <span className="sc-grip" aria-hidden="true">⠿</span>
                <b>{labels[k]}</b>
                <span className={`sc-stp sc-stp-${m.status}`}>{STATUS_LABEL[m.status]}</span>
                {hidden && <span className="sc-stp sc-stp-hidden">Hidden</span>}
                {m.inspoUrl && <span className="sc-flag" title="inspiration attached">📎</span>}
                {m.notes && <span className="sc-flag" title={m.notes}>💬</span>}
              </div>
              <Mock k={k} />
            </div>
          );
        })}
      </div>

      <aside className="sc-inspector">
        {sel ? (
          <>
            <div className="sc-insp-title">{labels[sel]}</div>
            <p className="sc-insp-desc">{descs[sel]}</p>

            <div className="sc-insp-label">Status</div>
            <div className="sc-insp-status">
              {(["keep", "refine", "archived", "deleted"] as ModuleStatus[]).map((s) => (
                <button key={s} type="button" className={meta[sel].status === s ? "is-on" : ""} onClick={() => update(sel, { status: s })}>
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
            <button type="button" className="sc-eye" onClick={() => update(sel, { visible: !meta[sel].visible })}>
              {meta[sel].visible ? "🙈 Hide on live dashboard" : "👁 Show on live dashboard"}
            </button>

            <div className="sc-insp-label">What do you want changed here?</div>
            <textarea
              value={draft.notes}
              onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
              placeholder="e.g. make this warmer, bigger headline, move the button, match the inspiration image…"
              rows={4}
            />

            <div className="sc-insp-label">Inspiration image (paste a link)</div>
            <input
              value={draft.inspoUrl}
              onChange={(e) => setDraft((d) => ({ ...d, inspoUrl: e.target.value }))}
              placeholder="https://…/screenshot.png"
            />
            {draft.inspoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={draft.inspoUrl} className="sc-insp-preview" alt="inspiration" referrerPolicy="no-referrer" />
            ) : null}

            <button type="button" className="btn btn-gold sc-save" onClick={saveDraft}>Save direction</button>
            <p className="sc-insp-foot">Your notes &amp; image become the brief — I&apos;ll build that section to match.</p>
          </>
        ) : (
          <div className="sc-insp-empty">
            <p><strong>Click or right-click</strong> any section to leave a change request or attach an inspiration image.</p>
            <p><strong>Drag</strong> sections up or down to rearrange the dashboard — it saves to the live portal automatically.</p>
          </div>
        )}
        <div className={`sc-saving${pending ? " on" : ""}`}>Saving…</div>
      </aside>
    </div>
  );
}
