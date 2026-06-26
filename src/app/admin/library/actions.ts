"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  upsertLibraryItem,
  setLibraryItemBatch,
  deleteLibraryItem,
  uploadLibraryMedia,
  deleteLibraryMedia,
  upsertSource,
  deleteSource,
  MEDIA_MAX_BYTES,
} from "@/lib/library";
import { analyzeInspiration } from "@/lib/workbookAnalysis";
import { insertSuggestions, type NewSuggestion } from "@/lib/workbookEvolution";

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
  const title = str(formData, "title");
  const body = personalTake || str(formData, "body") || transcript || caption || "";

  const savedId = await upsertLibraryItem({
    id,
    title,
    kind,
    // body powers the newsletter generator — prefer the owner's original rewrite.
    body,
    url,
    source: str(formData, "source") || null,
    why: str(formData, "why") || null,
    topics: list(formData, "topics"),
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
  });

  // Every saved item is also workbook inspiration — generate suggested edits
  // and stamp the item with the batch (skip "Your Voices" entries, which are
  // people to follow, not source material).
  let fed: { batchId: string; mode: "ai" | "heuristic" } | null = null;
  if (savedId && !isVoice) {
    const inspoText = [transcript, personalTake, str(formData, "body"), caption].filter(Boolean).join("\n\n");
    fed = await feedWorkbook(inspoText, title, kind, url);
    if (fed) await setLibraryItemBatch(savedId, fed.batchId);
  }

  revalidatePath("/admin/library");
  revalidatePath("/admin/workbook");
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
