"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  upsertLibraryItem,
  deleteLibraryItem,
  uploadLibraryMedia,
  deleteLibraryMedia,
  upsertSource,
  deleteSource,
  MEDIA_MAX_BYTES,
} from "@/lib/library";

const ALL_DEST = ["newsletter", "workbook", "wellness"];

/** Auto-name an item when the Title is left blank: prefer chosen topics, else the first line. */
function deriveTitle(text: string, topics: string[]): string {
  if (topics.length) return `Notes on ${topics.slice(0, 2).join(" & ")}`;
  const firstLine = text.split(/\n/).map((s) => s.trim()).find((s) => s.length > 0) ?? "";
  const cleaned = firstLine.replace(/^[#\d.)\-\s📖✦🙏🌍“"]+/, "").trim();
  if (cleaned) return cleaned.length > 56 ? cleaned.slice(0, 56).replace(/\s+\S*$/, "") + "…" : cleaned;
  return "Saved inspiration";
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

  // The save is instant. The AI generation (workbook suggestions + wellness
  // draft) runs AFTER, off the save path, kicked off by the Library page —
  // so saving never hangs on a slow model call.
  const needsGen =
    !!savedId && !isVoice && (destinations.includes("workbook") || destinations.includes("wellness"));

  revalidatePath("/admin/library");
  redirect(
    tooBig
      ? "/admin/library?tab=add&err=size"
      : `/admin/library?saved=1${needsGen ? `&gen=${savedId}` : ""}`
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
