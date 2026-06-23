"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import { upsertLibraryItem, deleteLibraryItem } from "@/lib/library";

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
  await upsertLibraryItem({
    id,
    title: str(formData, "title"),
    kind: str(formData, "kind") || "note",
    body: str(formData, "body"),
    url: str(formData, "url") || null,
    source: str(formData, "source") || null,
    why: str(formData, "why") || null,
    topics: list(formData, "topics"),
    scriptures: split(formData, "scriptures"),
    holiday: str(formData, "holiday") || null,
    emotion: str(formData, "emotion") || null,
    isOriginal: str(formData, "isOriginal") === "on",
  });
  revalidatePath("/admin/library");
  redirect("/admin/library?saved=1");
}

export async function deleteLibraryItemAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await deleteLibraryItem(id);
  revalidatePath("/admin/library");
  redirect("/admin/library");
}
