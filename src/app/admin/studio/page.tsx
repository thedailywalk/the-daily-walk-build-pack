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

type CanvasMeta = { status: ModuleStatus; visible: boolean; notes: string; inspoUrl: string };
import StudioCanvas from "@/components/StudioCanvas";
import { saveOrderAction, saveModuleMetaAction, resetDashboardAction } from "./actions";

export const metadata: Metadata = { title: "Design Studio", robots: { index: false } };
export const dynamic = "force-dynamic";

const DESC = Object.fromEntries(DASHBOARD_MODULES.map((m) => [m.key, m.desc])) as Record<ModuleKey, string>;

export default async function StudioPage() {
  await requireAdmin();
  const cfg = await getDashboardConfig();

  const meta = Object.fromEntries(
    cfg.order.map((k) => {
      const m = cfg.modules[k];
      return [k, { status: m.status, visible: m.visible, notes: m.notes ?? "", inspoUrl: m.inspoUrl ?? "" }];
    })
  ) as Record<ModuleKey, CanvasMeta>;

  return (
    <section className="section">
      <div className="adm-wrap">
        <div className="adm-head">
          <div>
            <div className="sec-tag" style={{ textAlign: "left" }}>Admin · Design Studio</div>
            <p className="adm-sub">
              A living mock of the member dashboard. <strong>Drag</strong> sections to rearrange,{" "}
              <strong>click or right-click</strong> any section to say what you want changed or attach an
              inspiration image. It all flows to the live{" "}
              <Link href="/portal" className="adm-inline-link" target="_blank">member dashboard ↗</Link>.
            </p>
          </div>
          <form action={resetDashboardAction}>
            <button type="submit" className="btn btn-ghost">Reset layout</button>
          </form>
        </div>

        {!adminDbConfigured && (
          <div className="adm-notice">
            Connect the database to save: add <code>SUPABASE_SERVICE_ROLE_KEY</code> and run{" "}
            <code>supabase/dashboard-lab.sql</code>. You can still try the canvas below.
          </div>
        )}

        <StudioCanvas
          order={cfg.order}
          meta={meta}
          labels={MODULE_LABEL}
          descs={DESC}
          saveOrder={saveOrderAction}
          saveMeta={saveModuleMetaAction}
        />
      </div>
    </section>
  );
}
