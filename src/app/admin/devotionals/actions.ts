"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  adminUpsert,
  adminDelete,
  adminEnsureWeek,
  type DevotionalData,
  type DevotionalStatus,
} from "@/lib/devotionals";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function saveDevotionalAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const status: DevotionalStatus =
    str(formData, "status") === "ready" ? "ready" : "draft";

  const data: DevotionalData = {
    weekFocus: str(formData, "weekFocus"),
    dayLabel: str(formData, "dayLabel"),
    readingHeading: str(formData, "readingHeading"),
    readingRef: str(formData, "readingRef"),
    readingIntro: str(formData, "readingIntro"),
    verseText: str(formData, "verseText"),
    verseRef: str(formData, "verseRef"),
    readingAfter: str(formData, "readingAfter"),
    makeItRealHeading: str(formData, "makeItRealHeading"),
    makeItRealBody: str(formData, "makeItRealBody"),
    question: str(formData, "question"),
    prayer: str(formData, "prayer"),
    pastorTake: str(formData, "pastorTake"),
    pastorByline: str(formData, "pastorByline"),
    communityText: str(formData, "communityText"),
    ctaLabel: str(formData, "ctaLabel"),
    ctaUrl: str(formData, "ctaUrl"),
    closingLine: str(formData, "closingLine"),
  };

  const title = data.readingHeading || `Devotional · ${date}`;
  await adminUpsert(date, status, title, data);

  revalidatePath("/admin/devotionals");
  revalidatePath("/devotional");
  redirect(`/admin/devotionals?date=${date}&saved=1`);
}

export async function prepareWeekAction() {
  await requireAdmin();
  await adminEnsureWeek(7);
  revalidatePath("/admin/devotionals");
  redirect("/admin/devotionals");
}

export async function deleteDevotionalAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (date) await adminDelete(date);
  revalidatePath("/admin/devotionals");
  revalidatePath("/devotional");
  redirect("/admin/devotionals");
}
