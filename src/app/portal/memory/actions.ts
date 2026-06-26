"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/supabase/server";
import {
  addMemoryVerse,
  setSingleMemoryVerse,
  markMemorized,
  deleteMemoryVerse,
  reactToAchievement,
  awardNewBadges,
  getStreak,
  memorizedCounts,
  reactionsGivenCount,
  sharesPostedCount,
  displayNameFromEmail,
  shareToWall,
  REACTIONS,
  type ReactionKind,
} from "@/lib/community";
import { listEntries } from "@/lib/prayerJournal";
import { listFavorites, listNoteDays } from "@/lib/studyData";
import { getOrCreateProgress } from "@/lib/progress";
import { daysCompleted } from "@/lib/journey";

function str(fd: FormData, k: string) {
  return String(fd.get(k) ?? "").trim();
}

/** Recompute the member's stats and post any newly-earned badges to the wall. */
async function refreshBadges(userId: string, name: string) {
  const [streak, mem, prayers, favorites, notes, progress, reactionsGiven, sharesPosted] =
    await Promise.all([
      getStreak(userId),
      memorizedCounts(userId),
      listEntries(userId),
      listFavorites(userId),
      listNoteDays(userId),
      getOrCreateProgress(userId),
      reactionsGivenCount(userId),
      sharesPostedCount(userId),
    ]);
  await awardNewBadges(userId, name, {
    longestStreak: streak.longest,
    currentStreak: streak.current,
    memorizedTotal: mem.total,
    prayerCount: prayers.length,
    favoritesCount: favorites.length,
    notesCount: notes.length,
    daysCompleted: daysCompleted(progress),
    reactionsGiven,
    sharesPosted,
  });
}

export async function addVerseAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  const name = displayNameFromEmail(user.email);
  await addMemoryVerse(user.id, name, str(formData, "ref"), str(formData, "verseText"));
  revalidatePath("/portal/memory");
}

/** Dashboard flashcard: set the single active memory verse (replaces any other). */
export async function setDashVerseAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  const name = displayNameFromEmail(user.email);
  await setSingleMemoryVerse(user.id, name, str(formData, "ref"), str(formData, "verseText"));
  revalidatePath("/portal");
  revalidatePath("/portal/memory");
}

/** Dashboard flashcard: clear the current verse so a new one can be chosen. */
export async function clearDashVerseAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  await deleteMemoryVerse(user.id, str(formData, "id"));
  revalidatePath("/portal");
  revalidatePath("/portal/memory");
}

export async function markMemorizedAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  const name = displayNameFromEmail(user.email);
  await markMemorized(user.id, name, str(formData, "id"));
  await refreshBadges(user.id, name);
  revalidatePath("/portal/memory");
  revalidatePath("/portal");
}

export async function deleteVerseAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  await deleteMemoryVerse(user.id, str(formData, "id"));
  revalidatePath("/portal/memory");
}

export async function reactAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  const kind = str(formData, "kind") as ReactionKind;
  if (!REACTIONS.some((r) => r.kind === kind)) return;
  await reactToAchievement(user.id, str(formData, "achievementId"), kind);
  revalidatePath(str(formData, "from") || "/portal");
}

export async function shareToWallAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  const name = displayNameFromEmail(user.email);
  await shareToWall(user.id, name, str(formData, "text"));
  revalidatePath("/portal");
}
