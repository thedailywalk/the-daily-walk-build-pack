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
  type PaceMode,
} from "@/lib/journey";

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
