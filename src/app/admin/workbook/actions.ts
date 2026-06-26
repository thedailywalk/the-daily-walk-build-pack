"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import { analyzeInspiration } from "@/lib/workbookAnalysis";
import { upsertLibraryItem, TOPICS } from "@/lib/library";
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

/** Auto-name an inspiration when "What is this?" is left blank: prefer the
 *  detected themes ("Notes on Generosity & Money"), else the first real line. */
function deriveLabel(text: string, themes: string[], type: string): string {
  if (themes.length) return `Notes on ${themes.slice(0, 2).join(" & ")}`;
  const firstLine =
    text.split(/\n/).map((s) => s.trim()).find((s) => s.length > 0) ?? "";
  const cleaned = firstLine.replace(/^[#\d.)\-\s📖✦🙏🌍“"]+/, "").trim();
  if (cleaned) return cleaned.length > 52 ? cleaned.slice(0, 52).replace(/\s+\S*$/, "") + "…" : cleaned;
  return `${type} inspiration`;
}

/** Analyze pasted inspiration and drop targeted suggestions into the queue. */
export async function submitInspirationAction(formData: FormData) {
  await requireAdmin();
  const text = str(formData, "text");
  const sourceLabel = str(formData, "sourceLabel");
  const sourceType = str(formData, "sourceType") || "transcript";
  const link = str(formData, "link");
  const maxPlacements = Number(str(formData, "maxPlacements")) || 5;
  const toLibrary = str(formData, "toLibrary") === "on";

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

  // Auto-fill "What is this?" with a fitting name when it was left blank.
  const label = sourceLabel || deriveLabel(text, analysis.themes, sourceType);

  // Optionally forward the same inspiration to the Content Library as an
  // unfinished draft — so research captured once feeds both the workbook AND
  // the newsletter without re-typing it.
  let savedToLibrary = false;
  if (toLibrary) {
    const topics = Array.from(new Set([...analysis.themes, "Newsletter Ideas"])).filter((t) =>
      (TOPICS as readonly string[]).includes(t)
    );
    await upsertLibraryItem({
      title: label,
      kind: sourceType === "note" ? "note" : "newsletter inspiration",
      body: text,
      transcript: text,
      url: link || null,
      source: label,
      topics,
      why: "Forwarded from the Workbook — finish in the Content Library when you have time.",
      isOriginal: false,
      needsFinalization: true,
    });
    savedToLibrary = true;
  }

  const libQ = savedToLibrary ? "&lib=1" : "";

  if (!analysis.placements.length) {
    const why = analysis.themes.length ? "nofit" : "notheme";
    redirect(`/admin/workbook/submit?err=${why}${libQ}`);
  }

  const batchId = randomUUID();
  const suggestions: NewSuggestion[] = analysis.placements.map((p) => ({
    dayIndex: p.dayIndex,
    batchId,
    sourceLabel: label,
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
  if (savedToLibrary) revalidatePath("/admin/library");
  redirect(`/admin/workbook?added=${n}&mode=${analysis.mode}${libQ}#review`);
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
