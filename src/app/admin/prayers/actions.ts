"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser, createClient, supabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

async function requireAdmin() {
  const user = await getUser();
  if (!user?.email || !isAdminEmail(user.email)) redirect("/");
  return user;
}

async function setStatus(id: string, status: "approved" | "rejected") {
  if (!supabaseConfigured || !id) return;
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("prayer_requests")
    .update({ status })
    .eq("id", id);
  if (error) console.error(`setStatus(${status}):`, error.message);
  revalidatePath("/admin/prayers");
  revalidatePath("/prayer-wall");
}

export async function approvePrayerAction(formData: FormData) {
  await setStatus(String(formData.get("id") ?? ""), "approved");
}

export async function rejectPrayerAction(formData: FormData) {
  await setStatus(String(formData.get("id") ?? ""), "rejected");
}
