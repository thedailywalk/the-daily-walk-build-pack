"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/supabase/server";
import { addEntry, setAnswered, deleteEntry } from "@/lib/prayerJournal";

function str(fd: FormData, k: string) {
  return String(fd.get(k) ?? "").trim();
}

export async function addPrayerAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  await addEntry(user.id, str(formData, "title"), str(formData, "body"));
  revalidatePath("/portal/prayer");
}

export async function toggleAnsweredAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  await setAnswered(user.id, str(formData, "id"), str(formData, "answered") === "1");
  revalidatePath("/portal/prayer");
}

export async function deletePrayerAction(formData: FormData) {
  const user = await getUser();
  if (!user?.id) return;
  await deleteEntry(user.id, str(formData, "id"));
  revalidatePath("/portal/prayer");
}
