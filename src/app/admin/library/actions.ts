"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  upsertLibraryItem,
  setLibraryItemBatch,
  setLibraryItemWellnessDraft,
  deleteLibraryItem,
  uploadLibraryMedia,
  deleteLibraryMedia,
  upsertSource,
  deleteSource,
  MEDIA_MAX_BYTES,
} from "@/lib/library";
import { analyzeInspiration } from "@/lib/workbookAnalysis";
import { draftWellnessScience } from "@/lib/wellnessAnalysis";
import { insertSuggestions, type NewSuggestion } from "@/lib/workbookEvolution";

const ALL_DEST = ["newsletter", "workbook", "wellness"];

/** Auto-name an item when the Title is left blank: prefer chosen topics, else the first line. */
function deriveTitle(text: string, topics: string[]): string {
  if (topics.length) return `Notes on ${topics.slice(0, 2).join(" & ")}`;
  const firstLine = text.split(/\n/).map((s) => s.trim()).find((s) => s.length > 0) ?? "";
  const cleaned = firstLine.replace(/^[#\d.)\-\s📖✦🙏🌍“"]+/, "").trim();
  if (cleaned) return cleaned.length > 56 ? cleaned.slice(0, 56).replace(/\s+\S*$/, "") + "…" : cleaned;
  return "Saved inspiration";
}

/**
 * Every Library item is also workbook inspiration: analyze its text and drop
 * suggested workbook edits into the Evolution queue, returning the batch id so
 * the item can deep-link to its suggestions. Inspiration-only — never verbatim.
 */
async function feedWorkbook(
  text: string,
  title: string,
  kind: string,
  link: string | null
): Promise<{ batchId: string; mode: "ai" | "heuristic" } | null> {
  if (text.trim().length < 40) return null;
  try {
    const analysis = await analyzeInspiration({
      text,
      sourceLabel: title || "Library inspiration",
      sourceType: kind || "note",
      link: link ?? "",
      maxPlacements: 6,
    });
    if (!analysis.placements.length) return null;
    const batchId = randomUUID();
    const suggestions: NewSuggestion[] = analysis.placements.map((p) => ({
      dayIndex: p.dayIndex,
      batchId,
      sourceLabel: title || "Library inspiration",
      sourceType: kind || "note",
      sourceLink: link ?? "",
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
    return n > 0 ? { batchId, mode: analysis.mode } : null;
  } catch {
    return null;
  }
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}
function list(fd: FormData, key: string): string[] {
  return fd
    .getAll(key)
    .map((v) => String(v).trim())
    .filter(Boolean);
}
/** comma/newline-separated free text → array */
function split(fd: FormData, key: string): string[] {
  return str(fd, key)
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveLibraryItemAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id") || undefined;

  // Existing media (preserved across edits unless replaced).
  let url = str(formData, "url") || null;
  let mediaPath = str(formData, "existingMediaPath") || null;
  let tooBig = false;

  const file = formData.get("file");
  if (file && typeof file === "object" && "size" in file && file.size > 0) {
    if (file.size > MEDIA_MAX_BYTES) {
      tooBig = true; // skip the upload, keep their text + any existing media
    } else {
      const up = await uploadLibraryMedia(file as File);
      if (up) {
        if (mediaPath && mediaPath !== up.path) await deleteLibraryMedia(mediaPath);
        url = up.url;
        mediaPath = up.path;
      }
    }
  }

  const caption = str(formData, "caption") || null;
  const transcript = str(formData, "transcript") || null;
  const personalTake = str(formData, "personalTake") || null;

  const isVoice = str(formData, "isVoice") === "on";
  const kind = str(formData, "kind") || "note";
  const topics = list(formData, "topics");
  const inspoText = [transcript, personalTake, str(formData, "body"), caption].filter(Boolean).join("\n\n");
  // Auto-generate a clear title when none is entered.
  const title = str(formData, "title") || deriveTitle(inspoText, topics);
  const body = personalTake || str(formData, "body") || transcript || caption || "";
  // Where this should be used (defaults to all three if nothing is checked).
  const destPicked = list(formData, "dest").filter((d) => ALL_DEST.includes(d));
  const destinations = destPicked.length ? destPicked : ALL_DEST;

  const savedId = await upsertLibraryItem({
    id,
    title,
    kind,
    // body powers the newsletter generator — prefer the owner's original rewrite.
    body,
    url,
    source: str(formData, "source") || null,
    why: str(formData, "why") || null,
    topics,
    scriptures: split(formData, "scriptures"),
    holiday: str(formData, "holiday") || null,
    emotion: str(formData, "emotion") || null,
    isOriginal: str(formData, "isOriginal") === "on",
    mediaPath,
    caption,
    transcript,
    personalTake,
    sources: str(formData, "sources") || null,
    isVoice,
    needsFinalization: str(formData, "needsFinalization") === "on",
    destinations,
  });

  // Route the inspiration to the right engines (skip "Your Voices" entries).
  let fed: { batchId: string; mode: "ai" | "heuristic" } | null = null;
  if (savedId && !isVoice) {
    if (destinations.includes("workbook")) {
      fed = await feedWorkbook(inspoText, title, kind, url);
      if (fed) await setLibraryItemBatch(savedId, fed.batchId);
    }
    if (destinations.includes("wellness")) {
      const draft = await draftWellnessScience(inspoText, title);
      if (draft) await setLibraryItemWellnessDraft(savedId, draft);
    }
  }

  revalidatePath("/admin/library");
  revalidatePath("/admin/workbook");
  revalidatePath("/admin/wellness");
  redirect(
    tooBig
      ? "/admin/library?tab=add&err=size"
      : `/admin/library?saved=1${fed ? `&wb=${fed.batchId}&wbmode=${fed.mode}` : ""}`
  );
}

export async function deleteLibraryItemAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await deleteLibraryItem(id);
  revalidatePath("/admin/library");
  redirect("/admin/library");
}

/* --------- Your Voices (inspiration sources, folded into the library) -------- */

export async function saveSourceAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id") || undefined;
  if (!str(formData, "name")) redirect("/admin/library?tab=voices");
  await upsertSource({
    id,
    name: str(formData, "name"),
    handle: str(formData, "handle") || null,
    kind: str(formData, "kind") || null,
    topics: list(formData, "topics"),
    notes: str(formData, "notes") || null,
    frequency: str(formData, "frequency") || "occasionally",
  });
  revalidatePath("/admin/library");
  redirect("/admin/library?tab=voices&saved=1");
}

export async function deleteSourceAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await deleteSource(id);
  revalidatePath("/admin/library");
  redirect("/admin/library?tab=voices");
}
