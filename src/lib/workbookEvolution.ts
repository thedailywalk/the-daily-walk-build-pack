import "server-only";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { getStudyDay, type StudyDay } from "@/lib/studyGuide";
import { detectTopics } from "@/lib/scripture";
import { TOPICS } from "@/lib/library";

/**
 * The Workbook Evolution engine. The 365-day study library (studyGuide.ts) is
 * the base content; this layer adds a status workflow (draft → review →
 * approved → locked), approved per-field overrides, and a suggestion review
 * queue. Locked days never receive automatic suggestions.
 *
 * (Note: src/lib/workbook.ts is a SEPARATE, unrelated module — it builds the
 * printable monthly workbook. This file is the living-content/evolution layer.)
 */

export const TOTAL_DAYS = 365;

export type DayStatus = "draft" | "review" | "approved" | "locked";
export const DAY_STATUSES: DayStatus[] = ["draft", "review", "approved", "locked"];

export const STATUS_LABEL: Record<DayStatus, string> = {
  draft: "Draft",
  review: "Under Review",
  approved: "Approved",
  locked: "Approved & Locked",
};
export const STATUS_BLURB: Record<DayStatus, string> = {
  draft: "Still evolving — open to new inspiration.",
  review: "Suggested updates are waiting for your approval.",
  approved: "Finalized. Still open to new suggestions until you lock it.",
  locked: "Protected. No automatic suggestions until you unlock it.",
};

/** The study-day fields a suggestion may strengthen (and the owner may edit). */
export const EDITABLE_FIELDS = [
  "context",
  "plainEnglish",
  "aboutGod",
  "aboutPeople",
  "realLife",
  "reflection",
  "prayer",
  "step",
  "sideReflection",
] as const;
export type EditableField = (typeof EDITABLE_FIELDS)[number];

export const FIELD_LABEL: Record<EditableField, string> = {
  context: "Setting the scene",
  plainEnglish: "In plain English",
  aboutGod: "What it shows about God",
  aboutPeople: "What it shows about people",
  realLife: "Real life / application",
  reflection: "Reflection question",
  prayer: "Prayer",
  step: "One small step",
  sideReflection: "Side reflection",
};

export type SuggestionStatus = "pending" | "applied" | "rejected";

export type Suggestion = {
  id: string;
  dayIndex: number;
  batchId: string;
  sourceLabel: string;
  sourceType: string;
  sourceLink: string;
  sourceExcerpt: string;
  themes: string[];
  tone: string;
  techniques: string[];
  targetField: EditableField;
  whyFits: string;
  proposedText: string;
  impact: string;
  status: SuggestionStatus;
  createdAt?: string;
  decidedAt?: string;
};

/** The evolution state stored for one study day (status + approved overrides). */
export type DayState = {
  dayIndex: number;
  status: DayStatus;
  overrides: Partial<Record<EditableField, string>>;
  notes: string;
  lockedAt?: string | null;
  updatedAt?: string;
};

/* --------------------------- per-day theme index --------------------------- */

let _themeIndex: Map<number, string[]> | null = null;

export function dayText(s: StudyDay): string {
  return [
    s.context,
    s.plainEnglish,
    s.aboutGod,
    s.aboutPeople,
    s.realLife,
    s.reflection,
    s.prayer,
    s.step,
    s.verse,
    s.sideReflection,
  ]
    .filter(Boolean)
    .join("  ");
}

function buildThemeIndex(): Map<number, string[]> {
  const m = new Map<number, string[]>();
  for (let d = 1; d <= TOTAL_DAYS; d++) {
    m.set(d, detectTopics(dayText(getStudyDay(d)), [...TOPICS]));
  }
  return m;
}

/** Themes detected in a study day's content (cached for the process). */
export function dayThemes(dayIndex: number): string[] {
  if (!_themeIndex) _themeIndex = buildThemeIndex();
  return _themeIndex.get(dayIndex) ?? [];
}

/* ------------------------------- day status ------------------------------- */

function rowToDay(r: {
  day_index: number;
  status: string;
  overrides: unknown;
  notes?: string;
  locked_at?: string | null;
  updated_at?: string;
}): DayState {
  return {
    dayIndex: r.day_index,
    status: (DAY_STATUSES as string[]).includes(r.status)
      ? (r.status as DayStatus)
      : "draft",
    overrides: (r.overrides as Partial<Record<EditableField, string>>) ?? {},
    notes: r.notes ?? "",
    lockedAt: r.locked_at ?? null,
    updatedAt: r.updated_at,
  };
}

const DEFAULT_DAY = (dayIndex: number): DayState => ({
  dayIndex,
  status: "draft",
  overrides: {},
  notes: "",
  lockedAt: null,
});

/** Map of every TOUCHED day (has a row). Untouched days are 'draft' by default. */
export async function listDayStates(): Promise<Map<number, DayState>> {
  const map = new Map<number, DayState>();
  if (!adminDbConfigured) return map;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("workbook_days")
      .select("day_index,status,overrides,notes,locked_at,updated_at");
    for (const r of data ?? []) map.set(r.day_index, rowToDay(r));
  } catch {
    /* ignore */
  }
  return map;
}

export async function getDayState(dayIndex: number): Promise<DayState> {
  if (!adminDbConfigured) return DEFAULT_DAY(dayIndex);
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("workbook_days")
      .select("day_index,status,overrides,notes,locked_at,updated_at")
      .eq("day_index", dayIndex)
      .maybeSingle();
    return data ? rowToDay(data) : DEFAULT_DAY(dayIndex);
  } catch {
    return DEFAULT_DAY(dayIndex);
  }
}

async function upsertDay(
  dayIndex: number,
  patch: Partial<{
    status: DayStatus;
    overrides: object;
    notes: string;
    locked_at: string | null;
  }>
): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    const current = await getDayState(dayIndex);
    await supabase.from("workbook_days").upsert(
      {
        day_index: dayIndex,
        status: patch.status ?? current.status,
        overrides: patch.overrides ?? current.overrides,
        notes: patch.notes ?? current.notes,
        locked_at:
          patch.locked_at !== undefined ? patch.locked_at : current.lockedAt ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "day_index" }
    );
  } catch {
    /* ignore */
  }
}

export async function setDayStatus(dayIndex: number, status: DayStatus): Promise<void> {
  await upsertDay(dayIndex, {
    status,
    locked_at: status === "locked" ? new Date().toISOString() : null,
  });
}

/** Save the owner's edited field values (approved revisions) for a day. */
export async function saveOverrides(
  dayIndex: number,
  overrides: Partial<Record<EditableField, string>>,
  notes?: string
): Promise<void> {
  const current = await getDayState(dayIndex);
  const merged = { ...current.overrides };
  for (const [k, v] of Object.entries(overrides)) {
    if (v && v.trim()) merged[k as EditableField] = v.trim();
    else delete merged[k as EditableField];
  }
  await upsertDay(dayIndex, { overrides: merged, notes: notes ?? current.notes });
}

/** The merged study day: base content with any approved overrides applied. */
export async function mergedDay(dayIndex: number): Promise<StudyDay> {
  const base = getStudyDay(dayIndex);
  const wb = await getDayState(dayIndex);
  const out: StudyDay = { ...base };
  for (const f of EDITABLE_FIELDS) {
    const v = wb.overrides[f];
    if (v && v.trim()) (out as unknown as Record<string, unknown>)[f] = v;
  }
  return out;
}

export type DashboardCounts = Record<DayStatus, number> & { touched: number };

export async function dashboardCounts(): Promise<DashboardCounts> {
  const map = await listDayStates();
  const counts: DashboardCounts = {
    draft: 0,
    review: 0,
    approved: 0,
    locked: 0,
    touched: map.size,
  };
  for (const d of map.values()) counts[d.status]++;
  counts.draft += TOTAL_DAYS - map.size; // untouched days are implicit drafts
  return counts;
}

/* ------------------------------ suggestions ------------------------------- */

function rowToSuggestion(r: Record<string, unknown>): Suggestion {
  const tf = String(r.target_field ?? "realLife");
  const st = String(r.status ?? "pending");
  return {
    id: String(r.id),
    dayIndex: Number(r.day_index),
    batchId: String(r.batch_id ?? ""),
    sourceLabel: String(r.source_label ?? ""),
    sourceType: String(r.source_type ?? "transcript"),
    sourceLink: String(r.source_link ?? ""),
    sourceExcerpt: String(r.source_excerpt ?? ""),
    themes: (r.themes as string[]) ?? [],
    tone: String(r.tone ?? ""),
    techniques: (r.techniques as string[]) ?? [],
    targetField: (EDITABLE_FIELDS as readonly string[]).includes(tf)
      ? (tf as EditableField)
      : "realLife",
    whyFits: String(r.why_fits ?? ""),
    proposedText: String(r.proposed_text ?? ""),
    impact: String(r.impact ?? ""),
    status: (["pending", "applied", "rejected"].includes(st)
      ? st
      : "pending") as SuggestionStatus,
    createdAt: r.created_at ? String(r.created_at) : undefined,
    decidedAt: r.decided_at ? String(r.decided_at) : undefined,
  };
}

export type NewSuggestion = Omit<Suggestion, "id" | "status" | "createdAt" | "decidedAt"> & {
  sourceLink?: string;
};

export async function insertSuggestions(list: NewSuggestion[]): Promise<number> {
  if (!adminDbConfigured || list.length === 0) return 0;
  try {
    const supabase = createServiceClient();
    const rows = list.map((s) => ({
      day_index: s.dayIndex,
      batch_id: s.batchId,
      source_label: s.sourceLabel,
      source_type: s.sourceType,
      source_link: s.sourceLink ?? "",
      source_excerpt: s.sourceExcerpt,
      themes: s.themes,
      tone: s.tone,
      techniques: s.techniques,
      target_field: s.targetField,
      why_fits: s.whyFits,
      proposed_text: s.proposedText,
      impact: s.impact,
      status: "pending",
    }));
    const { data } = await supabase
      .from("workbook_suggestions")
      .insert(rows)
      .select("id");
    // Bump any draft days that now have suggestions to "Under Review".
    for (const day of new Set(list.map((s) => s.dayIndex))) {
      const wb = await getDayState(day);
      if (wb.status === "draft") await setDayStatus(day, "review");
    }
    return (data ?? []).length;
  } catch {
    return 0;
  }
}

/** Delete all still-pending suggestions — used before a cumulative regeneration. */
export async function deletePendingSuggestions(): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("workbook_suggestions").delete().eq("status", "pending");
  } catch {
    /* ignore */
  }
}

/** "day:field" pairs the owner has already rejected — never re-surface these. */
export async function rejectedFieldPairs(): Promise<Set<string>> {
  const set = new Set<string>();
  const rejected = await listSuggestions({ status: "rejected", limit: 500 });
  for (const s of rejected) set.add(`${s.dayIndex}:${s.targetField}`);
  return set;
}

/** "day:field" pairs the owner has already approved (an override exists). */
export async function approvedFieldPairs(): Promise<Set<string>> {
  const set = new Set<string>();
  const states = await listDayStates();
  for (const d of states.values()) {
    for (const f of Object.keys(d.overrides)) set.add(`${d.dayIndex}:${f}`);
  }
  return set;
}

export async function listSuggestions(opts?: {
  status?: SuggestionStatus;
  dayIndex?: number;
  limit?: number;
}): Promise<Suggestion[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    let q = supabase
      .from("workbook_suggestions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(opts?.limit ?? 200);
    if (opts?.status) q = q.eq("status", opts.status);
    if (opts?.dayIndex) q = q.eq("day_index", opts.dayIndex);
    const { data } = await q;
    return (data ?? []).map(rowToSuggestion);
  } catch {
    return [];
  }
}

export async function getSuggestion(id: string): Promise<Suggestion | null> {
  if (!adminDbConfigured) return null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("workbook_suggestions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return data ? rowToSuggestion(data) : null;
  } catch {
    return null;
  }
}

/**
 * Approve a suggestion: write its proposed text into the day's override for the
 * target field, mark it 'applied', and keep the day in review. Locked days are
 * protected and refuse the change.
 */
export async function applySuggestion(id: string): Promise<boolean> {
  const s = await getSuggestion(id);
  if (!s) return false;
  const wb = await getDayState(s.dayIndex);
  if (wb.status === "locked") return false;
  await saveOverrides(s.dayIndex, { [s.targetField]: s.proposedText });
  if (!adminDbConfigured) return false;
  try {
    const supabase = createServiceClient();
    await supabase
      .from("workbook_suggestions")
      .update({ status: "applied", decided_at: new Date().toISOString() })
      .eq("id", id);
    return true;
  } catch {
    return false;
  }
}

export async function rejectSuggestion(id: string): Promise<void> {
  if (!adminDbConfigured) return;
  const s = await getSuggestion(id);
  try {
    const supabase = createServiceClient();
    await supabase
      .from("workbook_suggestions")
      .update({ status: "rejected", decided_at: new Date().toISOString() })
      .eq("id", id);
  } catch {
    /* ignore */
  }
  // If this day was only "Under Review" because of suggestions, and nothing is
  // left pending and nothing has been approved (no overrides), send it back to
  // Draft so it stops cluttering "Study days in motion".
  if (s) await maybeResetDay(s.dayIndex);
}

/** Revert a day to draft if it has no pending suggestions and no approved edits. */
async function maybeResetDay(dayIndex: number): Promise<void> {
  const wb = await getDayState(dayIndex);
  if (wb.status !== "review") return;
  if (Object.keys(wb.overrides).length > 0) return;
  const remaining = await listSuggestions({ status: "pending", dayIndex, limit: 1 });
  if (remaining.length === 0) await setDayStatus(dayIndex, "draft");
}

/**
 * Self-heal: revert any day stuck at "Under Review" that has no pending
 * suggestions and no approved edits back to Draft, so dismissed/cleared days
 * stop lingering in "Study days in motion". Returns how many were reset.
 * (Cleans up days left over from before the dismiss→reset logic existed.)
 */
export async function resetOrphanReviewDays(): Promise<number> {
  if (!adminDbConfigured) return 0;
  const states = await listDayStates();
  const candidates = [...states.values()].filter(
    (d) => d.status === "review" && Object.keys(d.overrides).length === 0
  );
  if (candidates.length === 0) return 0;
  const pending = await listSuggestions({ status: "pending", limit: 300 });
  const daysWithPending = new Set(pending.map((s) => s.dayIndex));
  let reset = 0;
  for (const d of candidates) {
    if (!daysWithPending.has(d.dayIndex)) {
      await setDayStatus(d.dayIndex, "draft");
      reset++;
    }
  }
  return reset;
}

/** Pending suggestions grouped by submission batch — the "waiting" queue. */
export type Batch = {
  batchId: string;
  sourceLabel: string;
  sourceType: string;
  createdAt?: string;
  suggestions: Suggestion[];
};

export async function pendingBatches(): Promise<Batch[]> {
  const pending = await listSuggestions({ status: "pending", limit: 300 });
  const byBatch = new Map<string, Batch>();
  for (const s of pending) {
    let b = byBatch.get(s.batchId);
    if (!b) {
      b = {
        batchId: s.batchId,
        sourceLabel: s.sourceLabel,
        sourceType: s.sourceType,
        createdAt: s.createdAt,
        suggestions: [],
      };
      byBatch.set(s.batchId, b);
    }
    b.suggestions.push(s);
  }
  return [...byBatch.values()];
}
