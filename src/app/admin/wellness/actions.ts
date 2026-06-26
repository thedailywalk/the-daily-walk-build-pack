"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  wellnessUpsert,
  wellnessDelete,
  wellnessEnsureWeek,
  type WellnessData,
  type WellnessStatus,
} from "@/lib/wellness";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function saveWellnessAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const status: WellnessStatus =
    str(formData, "status") === "ready" ? "ready" : "draft";

  const data: WellnessData = {
    weekFocus: str(formData, "weekFocus"),
    dayLabel: str(formData, "dayLabel"),
    editorNote: str(formData, "editorNote"),
    scienceHeading: str(formData, "scienceHeading"),
    scienceVerse: str(formData, "scienceVerse"),
    scienceBody: str(formData, "scienceBody"),
    sciencePractice: str(formData, "sciencePractice"),
    peaceIntro: str(formData, "peaceIntro"),
    peaceRelease: str(formData, "peaceRelease"),
    peaceReceive: str(formData, "peaceReceive"),
    peaceRespond: str(formData, "peaceRespond"),
    patternOld: str(formData, "patternOld"),
    patternNew: str(formData, "patternNew"),
    patternNote: str(formData, "patternNote"),
    prayerLabTitle: str(formData, "prayerLabTitle"),
    prayerLabStart: str(formData, "prayerLabStart"),
    prayerLabName: str(formData, "prayerLabName"),
    prayerLabSurrender: str(formData, "prayerLabSurrender"),
    prayerLabAsk: str(formData, "prayerLabAsk"),
    question: str(formData, "question"),
    closingLine: str(formData, "closingLine"),
  };

  const title = data.scienceHeading || `Wellness · ${date}`;
  await wellnessUpsert(date, status, title, data);

  revalidatePath("/admin/wellness");
  redirect(`/admin/wellness?date=${date}&saved=1`);
}

export async function prepareWellnessWeekAction() {
  await requireAdmin();
  await wellnessEnsureWeek(7);
  revalidatePath("/admin/wellness");
  redirect("/admin/wellness");
}

export async function deleteWellnessAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (date) await wellnessDelete(date);
  revalidatePath("/admin/wellness");
  redirect("/admin/wellness");
}
