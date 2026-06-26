import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/adminGuard";
import { adminDbConfigured } from "@/lib/supabase/admin";
import {
  getDashboardConfig,
  DASHBOARD_MODULES,
  MODULE_LABEL,
  type ModuleKey,
  type ModuleStatus,
} from "@/lib/dashboardConfig";
import {
  moveModuleAction,
  saveModuleAction,
  toggleVisibleAction,
  setStatusAction,
  resetDashboardAction,
} from "./actions";

export const metadata: Metadata = { title: "Design Studio", robots: { index: false } };
export const dynamic = "force-dynamic";

const DESC: Record<ModuleKey, string> = Object.fromEntries(
  DASHBOARD_MODULES.map((m) => [m.key, m.desc])
) as Record<ModuleKey, string>;

const STATUS_META: Record<ModuleStatus, { label: string; cls: string }> = {
  keep: { label: "Keep", cls: "st-keep" },
  refine: { label: "Refining", cls: "st-refine" },
  archived: { label: "Archived", cls: "st-archived" },
  deleted: { label: "Deleted", cls: "st-deleted" },
};

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const cfg = await getDashboardConfig();

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>Admin · Design Studio</div>
            <p className="adm-sub">
              The collaborative workspace for the member dashboard — a <strong>Design Lab</strong> (track each
              section&apos;s status &amp; notes) and a <strong>Dashboard Builder</strong> (reorder &amp; show/hide).
              Changes here update the live <Link href="/portal" className="adm-inline-link">member dashboard →</Link> right away.
            </p>
          </div>
          <Link href="/portal" className="btn btn-ghost" target="_blank">Preview dashboard ↗</Link>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Connect the database to save layouts: add <code>SUPABASE_SERVICE_ROLE_KEY</code> and run{" "}
            <code>supabase/dashboard-lab.sql</code>. You can still preview the controls below.
          </div>
        )}
        {sp.saved === "1" && <div className="adm-saved">Saved ✓</div>}

        <div className="st-legend">
          <span className="st-pill st-keep">Keep</span>
          <span className="st-pill st-refine">Refining</span>
          <span className="st-pill st-archived">Archived</span>
          <span className="st-pill st-deleted">Deleted</span>
          <span className="st-legend-note">Archived &amp; Deleted are hidden from the live dashboard. Use ↑ ↓ to reorder.</span>
        </div>

        <div className="st-list">
          {cfg.order.map((key, idx) => {
            const m = cfg.modules[key];
            const meta = STATUS_META[m.status];
            return (
              <div key={key} className={`st-card ${m.visible ? "" : "is-hidden"} ${meta.cls}-card`}>
                <div className="st-card-main">
                  <div className="st-pos">
                    <form action={moveModuleAction}>
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="dir" value="up" />
                      <button type="submit" className="st-move" disabled={idx === 0} aria-label="Move up">↑</button>
                    </form>
                    <span className="st-posn">{idx + 1}</span>
                    <form action={moveModuleAction}>
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="dir" value="down" />
                      <button type="submit" className="st-move" disabled={idx === cfg.order.length - 1} aria-label="Move down">↓</button>
                    </form>
                  </div>

                  <div className="st-info">
                    <div className="st-title-row">
                      <h3>{MODULE_LABEL[key]}</h3>
                      <span className={`st-pill ${meta.cls}`}>{meta.label}</span>
                      {!m.visible && <span className="st-pill st-hiddenpill">Hidden</span>}
                    </div>
                    <p className="st-desc">{DESC[key]}</p>
                  </div>

                  <div className="st-quick">
                    {(["keep", "refine", "archived", "deleted"] as ModuleStatus[]).map((s) => (
                      <form action={setStatusAction} key={s}>
                        <input type="hidden" name="key" value={key} />
                        <input type="hidden" name="status" value={s} />
                        <button type="submit" className={`st-qbtn${m.status === s ? " is-on" : ""}`}>
                          {s === "keep" ? "✓ Keep" : s === "refine" ? "🔄 Refine" : s === "archived" ? "📦 Archive" : "✕ Delete"}
                        </button>
                      </form>
                    ))}
                    <form action={toggleVisibleAction}>
                      <input type="hidden" name="key" value={key} />
                      <button type="submit" className="st-qbtn st-eye">{m.visible ? "🙈 Hide" : "👁 Show"}</button>
                    </form>
                  </div>
                </div>

                {/* Design Lab notes */}
                <details className="st-lab" open={m.status === "refine" || !!m.notes}>
                  <summary>🧪 Design Lab notes {m.notes ? "· has notes" : ""}</summary>
                  <form action={saveModuleAction} className="st-labform">
                    <input type="hidden" name="key" value={key} />
                    <input type="hidden" name="status" value={m.status} />
                    {m.visible && <input type="hidden" name="visible" value="on" />}
                    <textarea
                      name="notes"
                      defaultValue={m.notes}
                      className="adm-textarea"
                      rows={3}
                      placeholder={`What do you like / want to change about "${MODULE_LABEL[key]}"? Ideas for copy, colors, layout, animation…`}
                    />
                    <button type="submit" className="btn btn-gold">Save notes</button>
                  </form>
                </details>
              </div>
            );
          })}
        </div>

        <div className="st-foot">
          <form action={resetDashboardAction}>
            <button type="submit" className="adm-link-danger">Reset to default layout</button>
          </form>
          <p className="st-foot-note">
            This is phase one of the Studio: reorder, show/hide, set status, and capture notes — all live.
            Next phases (when you want them): per-component <em>versions</em> &amp; side-by-side compare, and
            true drag-and-drop. Tell me which to build next.
          </p>
        </div>
      </div>
    </section>
  );
}
