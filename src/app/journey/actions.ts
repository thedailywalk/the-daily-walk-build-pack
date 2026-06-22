"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getOrCreateProgress, saveProgress, todayPT } from "@/lib/progress";
import {
  markComplete,
  restart,
  setPace,
  jumpToDay,
  type PaceMode,
} from "@/lib/journey";
import {
  saveNotes,
  toggleFavorite,
  removeFavorite,
  type NotesData,
} from "@/lib/studyData";

/** Gate: must be signed in AND a paying subscriber. */
async function requirePaidUser() {
  const user = await getUser();
  if (!user?.email) redirect("/login");
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") redirect("/pricing");
  return user;
}

export async function markCompleteAction() {
  const user = await requirePaidUser();
  const p = await getOrCreateProgress(user.id);
  await saveProgress(user.id, markComplete(p));
  revalidatePath("/journey");
}

export async function restartAction() {
  const user = await requirePaidUser();
  const p = await getOrCreateProgress(user.id);
  await saveProgress(user.id, restart(p, todayPT()));
  revalidatePath("/journey");
}

export async function setPaceAction(formData: FormData) {
  const user = await requirePaidUser();
  const mode = (formData.get("mode") === "community"
    ? "community"
    : "self") as PaceMode;
  const p = await getOrCreateProgress(user.id);
  await saveProgress(user.id, setPace(p, mode));
  revalidatePath("/journey");
}

export async function jumpToDayAction(formData: FormData) {
  const user = await requirePaidUser();
  const day = Number(formData.get("day"));
  if (!Number.isFinite(day)) return;
  const p = await getOrCreateProgress(user.id);
  await saveProgress(user.id, jumpToDay(p, day));
  revalidatePath("/journey");
  redirect("/journey");
}

/** Save the daily journal (check-offs + notes) to the member's account. */
export async function saveStudyNotesAction(day: number, data: NotesData) {
  const user = await getUser();
  if (!user?.email) return; // signed-out: client keeps its local copy
  await saveNotes(user.id, day, data);
}

/** Toggle a favorite verse; returns whether it's now favorited. */
export async function toggleFavoriteAction(
  ref: string,
  verseText: string,
  day: number | null
): Promise<boolean> {
  const user = await getUser();
  if (!user?.email) return false;
  const now = await toggleFavorite(user.id, ref, verseText, day);
  revalidatePath("/journey");
  return now;
}

export async function removeFavoriteAction(formData: FormData) {
  const user = await requirePaidUser();
  const ref = String(formData.get("ref") ?? "");
  if (ref) await removeFavorite(user.id, ref);
  revalidatePath("/journey");
}
