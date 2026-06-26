"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  premiumUpsert,
  premiumDelete,
  premiumEnsureWeek,
  type PremiumData,
  type PremiumStatus,
} from "@/lib/premium";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function savePremiumAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const status: PremiumStatus =
    str(formData, "status") === "ready" ? "ready" : "draft";

  const data: PremiumData = {
    weekFocus: str(formData, "weekFocus"),
    dayLabel: str(formData, "dayLabel"),
    editorNote: str(formData, "editorNote"),
    scienceHeading: str(formData, "scienceHeading"),
    scienceVerse: str(formData, "scienceVerse"),
    scienceBody: str(formData, "scienceBody"),
    sciencePractice: str(formData, "sciencePractice"),
    worldHeading: str(formData, "worldHeading"),
    worldBody: str(formData, "worldBody"),
    worldPrayer: str(formData, "worldPrayer"),
    studyHeading: str(formData, "studyHeading"),
    studyRef: str(formData, "studyRef"),
    studyBody: str(formData, "studyBody"),
    studyKeyWord: str(formData, "studyKeyWord"),
    studyVerse: str(formData, "studyVerse"),
    studyQuestion: str(formData, "studyQuestion"),
    circleBody: str(formData, "circleBody"),
    circleCtaLabel: str(formData, "circleCtaLabel"),
    circleCtaUrl: str(formData, "circleCtaUrl"),
    closingLine: str(formData, "closingLine"),
  };

  const title = data.scienceHeading || `Premium · ${date}`;
  await premiumUpsert(date, status, title, data);

  revalidatePath("/admin/premium");
  redirect(`/admin/premium?date=${date}&saved=1`);
}

export async function preparePremiumWeekAction() {
  await requireAdmin();
  await premiumEnsureWeek(7);
  revalidatePath("/admin/premium");
  redirect("/admin/premium");
}

export async function deletePremiumAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (date) await premiumDelete(date);
  revalidatePath("/admin/premium");
  redirect("/admin/premium");
}
