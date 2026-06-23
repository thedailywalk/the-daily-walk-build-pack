"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import { upsertSource, deleteSource } from "@/lib/library";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}
function list(fd: FormData, key: string): string[] {
  return fd.getAll(key).map((v) => String(v).trim()).filter(Boolean);
}

export async function saveSourceAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id") || undefined;
  if (!str(formData, "name")) {
    redirect("/admin/inspiration");
  }
  await upsertSource({
    id,
    name: str(formData, "name"),
    handle: str(formData, "handle") || null,
    kind: str(formData, "kind") || null,
    topics: list(formData, "topics"),
    notes: str(formData, "notes") || null,
    frequency: str(formData, "frequency") || "occasionally",
  });
  revalidatePath("/admin/inspiration");
  redirect("/admin/inspiration?saved=1");
}

export async function deleteSourceAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await deleteSource(id);
  revalidatePath("/admin/inspiration");
  redirect("/admin/inspiration");
}
