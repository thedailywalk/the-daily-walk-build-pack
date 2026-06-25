"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import { analyzeInspiration } from "@/lib/workbookAnalysis";
import {
  insertSuggestions,
  applySuggestion,
  rejectSuggestion,
  setDayStatus,
  saveOverrides,
  EDITABLE_FIELDS,
  DAY_STATUSES,
  type DayStatus,
  type EditableField,
  type NewSuggestion,
} from "@/lib/workbookEvolution";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

/** Analyze pasted inspiration and drop targeted suggestions into the queue. */
export async function submitInspirationAction(formData: FormData) {
  await requireAdmin();
  const text = str(formData, "text");
  const sourceLabel = str(formData, "sourceLabel");
  const sourceType = str(formData, "sourceType") || "transcript";
  const link = str(formData, "link");
  const maxPlacements = Number(str(formData, "maxPlacements")) || 5;

  if (text.length < 40) {
    redirect("/admin/workbook/submit?err=short");
  }

  const analysis = await analyzeInspiration({
    text,
    sourceLabel,
    sourceType,
    link,
    maxPlacements,
  });

  if (!analysis.placements.length) {
    const why = analysis.themes.length ? "nofit" : "notheme";
    redirect(`/admin/workbook/submit?err=${why}`);
  }

  const batchId = randomUUID();
  const suggestions: NewSuggestion[] = analysis.placements.map((p) => ({
    dayIndex: p.dayIndex,
    batchId,
    sourceLabel: sourceLabel || `${sourceType} inspiration`,
    sourceType,
    sourceLink: link,
    sourceExcerpt: text.slice(0, 4000),
    themes: p.themes,
    tone: analysis.tone,
    techniques: analysis.techniques,
    targetField: p.targetField,
    whyFits: p.whyFits,
    proposedText: p.proposedText,
    impact: p.impact,
  }));

  const n = await insertSuggestions(suggestions);
  revalidatePath("/admin/workbook");
  redirect(`/admin/workbook?added=${n}&mode=${analysis.mode}`);
}

export async function approveSuggestionAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await applySuggestion(id);
  revalidatePath("/admin/workbook");
  const day = str(formData, "day");
  redirect(day ? `/admin/workbook/${day}?saved=1` : "/admin/workbook");
}

export async function rejectSuggestionAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await rejectSuggestion(id);
  revalidatePath("/admin/workbook");
  const day = str(formData, "day");
  redirect(day ? `/admin/workbook/${day}` : "/admin/workbook");
}

export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const day = Number(str(formData, "day"));
  const status = str(formData, "status") as DayStatus;
  if (day >= 1 && day <= 365 && (DAY_STATUSES as string[]).includes(status)) {
    await setDayStatus(day, status);
  }
  revalidatePath("/admin/workbook");
  revalidatePath(`/admin/workbook/${day}`);
  redirect(`/admin/workbook/${day}?saved=1`);
}

/** Save the owner's hand-edited field values for a day, and optionally its status. */
export async function saveDayAction(formData: FormData) {
  await requireAdmin();
  const day = Number(str(formData, "day"));
  if (!(day >= 1 && day <= 365)) redirect("/admin/workbook");

  const overrides: Partial<Record<EditableField, string>> = {};
  for (const f of EDITABLE_FIELDS) {
    if (formData.has(`f_${f}`)) overrides[f] = str(formData, `f_${f}`);
  }
  await saveOverrides(day, overrides, str(formData, "notes"));

  const status = str(formData, "status") as DayStatus;
  if ((DAY_STATUSES as string[]).includes(status)) await setDayStatus(day, status);

  revalidatePath(`/admin/workbook/${day}`);
  revalidatePath("/admin/workbook");
  redirect(`/admin/workbook/${day}?saved=1`);
}
