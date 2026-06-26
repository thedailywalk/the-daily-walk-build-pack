import "server-only";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";

/**
 * Member-dashboard layout config — the shared source of truth for both the
 * admin Studio (Design Lab + Dashboard Builder) and the live /portal. It holds
 * the ORDER of the dashboard modules, whether each is shown, its design status,
 * and the owner's notes. The live portal reads it to render; the Studio writes
 * it. Stored as a single jsonb row; falls back to sensible defaults with no DB.
 */

export const DASHBOARD_MODULES = [
  { key: "today", label: "Today's Walk", desc: "The day's devotional with the read button." },
  { key: "continue", label: "Continue + Weekly Video", desc: "Bible-in-a-Year progress and the embedded weekly video." },
  { key: "pace", label: "Where everyone's at", desc: "Grace-first community pace + invite a friend." },
  { key: "accountability", label: "Iron sharpens iron", desc: "Optional streak & memory leaderboards (collapsed)." },
  { key: "wall", label: "Encouragement wall", desc: "Community praises, reactions, and sharing." },
  { key: "more", label: "A little more for today", desc: "Momentum, badges, reflection, Word of the Day, wonder & quick access." },
] as const;

export type ModuleKey = (typeof DASHBOARD_MODULES)[number]["key"];
export type ModuleStatus = "keep" | "refine" | "archived" | "deleted";

export type ModuleState = { status: ModuleStatus; visible: boolean; notes: string };
export type DashboardConfig = { order: ModuleKey[]; modules: Record<ModuleKey, ModuleState> };

export const MODULE_LABEL: Record<ModuleKey, string> = Object.fromEntries(
  DASHBOARD_MODULES.map((m) => [m.key, m.label])
) as Record<ModuleKey, string>;

const ALL_KEYS = DASHBOARD_MODULES.map((m) => m.key) as ModuleKey[];

export function defaultConfig(): DashboardConfig {
  const modules = {} as Record<ModuleKey, ModuleState>;
  for (const k of ALL_KEYS) modules[k] = { status: "keep", visible: true, notes: "" };
  return { order: [...ALL_KEYS], modules };
}

/** Merge a stored (possibly partial / stale) config with the current defaults. */
function normalize(raw: Partial<DashboardConfig> | null | undefined): DashboardConfig {
  const base = defaultConfig();
  if (!raw) return base;
  const modules = { ...base.modules };
  if (raw.modules) {
    for (const k of ALL_KEYS) {
      const m = raw.modules[k];
      if (m) modules[k] = { status: m.status ?? "keep", visible: m.visible !== false, notes: m.notes ?? "" };
    }
  }
  // order: keep stored keys that still exist, then append any new modules.
  const storedOrder = (raw.order ?? []).filter((k): k is ModuleKey => ALL_KEYS.includes(k as ModuleKey));
  const order = [...storedOrder, ...ALL_KEYS.filter((k) => !storedOrder.includes(k))];
  return { order, modules };
}

const TABLE = "dashboard_config";

export async function getDashboardConfig(): Promise<DashboardConfig> {
  if (!adminDbConfigured) return defaultConfig();
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from(TABLE).select("data").eq("id", 1).maybeSingle();
    return normalize((data?.data as Partial<DashboardConfig>) ?? null);
  } catch {
    return defaultConfig();
  }
}

export async function saveDashboardConfig(config: DashboardConfig): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase
      .from(TABLE)
      .upsert({ id: 1, data: normalize(config), updated_at: new Date().toISOString() }, { onConflict: "id" });
  } catch {
    /* ignore */
  }
}

/** The module keys the live portal should render, in order (visible + not archived/deleted). */
export function liveModuleOrder(config: DashboardConfig): ModuleKey[] {
  return config.order.filter((k) => {
    const m = config.modules[k];
    return m && m.visible && m.status !== "archived" && m.status !== "deleted";
  });
}
