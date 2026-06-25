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

  await upsertLibraryItem({
    id,
    title: str(formData, "title"),
    kind: str(formData, "kind") || "note",
    // body powers the newsletter generator — prefer the owner's original rewrite.
    body: personalTake || str(formData, "body") || transcript || caption || "",
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
    isVoice: str(formData, "isVoice") === "on",
  });

  revalidatePath("/admin/library");
  redirect(tooBig ? "/admin/library?tab=add&err=size" : "/admin/library?saved=1");
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
