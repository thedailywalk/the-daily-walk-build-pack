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
    devHeading: str(formData, "devHeading"),
    devRef: str(formData, "devRef"),
    devIntro: str(formData, "devIntro"),
    devVerseText: str(formData, "devVerseText"),
    devVerseRef: str(formData, "devVerseRef"),
    devBody: str(formData, "devBody"),
    devKeyWord: str(formData, "devKeyWord"),
    devReflection: str(formData, "devReflection"),
    devApply: str(formData, "devApply"),
    devPrayer: str(formData, "devPrayer"),
    worldHeading: str(formData, "worldHeading"),
    worldIntro: str(formData, "worldIntro"),
    world1What: str(formData, "world1What"),
    world1Faith: str(formData, "world1Faith"),
    world1Pray: str(formData, "world1Pray"),
    world2What: str(formData, "world2What"),
    world2Faith: str(formData, "world2Faith"),
    world2Pray: str(formData, "world2Pray"),
    world3What: str(formData, "world3What"),
    world3Faith: str(formData, "world3Faith"),
    world3Pray: str(formData, "world3Pray"),
    brightHeading: str(formData, "brightHeading"),
    brightBody: str(formData, "brightBody"),
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

  const title = data.devHeading || `Premium · ${date}`;
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
