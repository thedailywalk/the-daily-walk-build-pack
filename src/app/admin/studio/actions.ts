"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  getDashboardConfig,
  saveDashboardConfig,
  defaultConfig,
  type ModuleKey,
  type ModuleStatus,
} from "@/lib/dashboardConfig";

function str(fd: FormData, k: string): string {
  return String(fd.get(k) ?? "").trim();
}

const STATUSES: ModuleStatus[] = ["keep", "refine", "archived", "deleted"];

function refresh() {
  revalidatePath("/admin/studio");
  revalidatePath("/portal");
}

/** Move a module up/down in the dashboard order. */
export async function moveModuleAction(formData: FormData) {
  await requireAdmin();
  const key = str(formData, "key") as ModuleKey;
  const dir = str(formData, "dir");
  const cfg = await getDashboardConfig();
  const i = cfg.order.indexOf(key);
  if (i === -1) return;
  const j = dir === "up" ? i - 1 : i + 1;
  if (j < 0 || j >= cfg.order.length) return;
  [cfg.order[i], cfg.order[j]] = [cfg.order[j], cfg.order[i]];
  await saveDashboardConfig(cfg);
  refresh();
  redirect("/admin/studio");
}

/** Save a module's status, visibility, and Design-Lab notes. */
export async function saveModuleAction(formData: FormData) {
  await requireAdmin();
  const key = str(formData, "key") as ModuleKey;
  const cfg = await getDashboardConfig();
  if (!cfg.modules[key]) return;
  const status = str(formData, "status") as ModuleStatus;
  cfg.modules[key] = {
    status: STATUSES.includes(status) ? status : "keep",
    visible: str(formData, "visible") === "on",
    notes: str(formData, "notes"),
  };
  await saveDashboardConfig(cfg);
  refresh();
  redirect("/admin/studio?saved=1");
}

/** Quick visibility toggle (show/hide on the live dashboard). */
export async function toggleVisibleAction(formData: FormData) {
  await requireAdmin();
  const key = str(formData, "key") as ModuleKey;
  const cfg = await getDashboardConfig();
  if (!cfg.modules[key]) return;
  cfg.modules[key].visible = !cfg.modules[key].visible;
  await saveDashboardConfig(cfg);
  refresh();
  redirect("/admin/studio");
}

/** Set a module's design status quickly (Keep / Refine / Archive / Delete). */
export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const key = str(formData, "key") as ModuleKey;
  const status = str(formData, "status") as ModuleStatus;
  const cfg = await getDashboardConfig();
  if (!cfg.modules[key] || !STATUSES.includes(status)) return;
  cfg.modules[key].status = status;
  // Archiving/deleting also hides it from the live dashboard.
  if (status === "archived" || status === "deleted") cfg.modules[key].visible = false;
  if (status === "keep" || status === "refine") cfg.modules[key].visible = true;
  await saveDashboardConfig(cfg);
  refresh();
  redirect("/admin/studio");
}

export async function resetDashboardAction() {
  await requireAdmin();
  await saveDashboardConfig(defaultConfig());
  refresh();
  redirect("/admin/studio?saved=1");
}
