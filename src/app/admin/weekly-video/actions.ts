"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  inspectAndStoreCandidates,
  autoFillCandidates,
  searchAndStoreCandidates,
  selectVideo,
  clearSelection,
  updateSelectionCopy,
  deleteCandidate,
} from "@/lib/weeklyVideo";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function addCandidatesAction(formData: FormData) {
  await requireAdmin();
  const weekStart = str(formData, "weekStart");
  const urls = str(formData, "urls")
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  let added = 0;
  let skipped = 0;
  if (weekStart && urls.length) {
    const res = await inspectAndStoreCandidates(urls, weekStart);
    added = res.added;
    skipped = res.skipped.length;
  }
  revalidatePath("/admin/weekly-video");
  redirect(`/admin/weekly-video?week=${weekStart}&added=${added}&skipped=${skipped}`);
}

export async function autoFillAction(formData: FormData) {
  await requireAdmin();
  const weekStart = str(formData, "weekStart");
  let added = 0;
  if (weekStart) {
    const res = await autoFillCandidates(weekStart, 10);
    added = res.added;
  }
  revalidatePath("/admin/weekly-video");
  redirect(`/admin/weekly-video?week=${weekStart}&autofilled=${added}`);
}

export async function searchAction(formData: FormData) {
  await requireAdmin();
  const weekStart = str(formData, "weekStart");
  const query = str(formData, "query");
  let added = 0;
  if (weekStart && query) {
    const res = await searchAndStoreCandidates(query, weekStart, 10);
    added = res.added;
  }
  revalidatePath("/admin/weekly-video");
  redirect(
    `/admin/weekly-video?week=${weekStart}&searched=${added}&q=${encodeURIComponent(query)}`
  );
}

export async function selectVideoAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const weekStart = str(formData, "weekStart");
  if (id) await selectVideo(id);
  revalidatePath("/admin/weekly-video");
  revalidatePath("/portal");
  redirect(`/admin/weekly-video?week=${weekStart}&selected=1`);
}

export async function clearSelectionAction(formData: FormData) {
  await requireAdmin();
  const weekStart = str(formData, "weekStart");
  if (weekStart) await clearSelection(weekStart);
  revalidatePath("/admin/weekly-video");
  revalidatePath("/portal");
  redirect(`/admin/weekly-video?week=${weekStart}`);
}

export async function updateCopyAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const weekStart = str(formData, "weekStart");
  if (id) {
    await updateSelectionCopy(id, {
      intro: str(formData, "intro"),
      theme: str(formData, "theme"),
      scriptures: str(formData, "scriptures")
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean),
    });
  }
  revalidatePath("/admin/weekly-video");
  revalidatePath("/portal");
  redirect(`/admin/weekly-video?week=${weekStart}&saved=1`);
}

export async function deleteCandidateAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const weekStart = str(formData, "weekStart");
  if (id) await deleteCandidate(id);
  revalidatePath("/admin/weekly-video");
  redirect(`/admin/weekly-video?week=${weekStart}`);
}
