"use server";

import { revalidatePath } from "next/cache";
import { getUser, createClient, supabaseConfigured } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { MAX_PRAYER_LEN, MAX_NAME_LEN } from "@/lib/prayer-limits";

export type SubmitResult = { ok: true } | { error: string };

/** A signed-in member shares a prayer request. It's stored as pending until approved. */
export async function submitPrayerAction(input: {
  body: string;
  name?: string;
}): Promise<SubmitResult> {
  if (!supabaseConfigured) {
    return { error: "The prayer wall isn't available right now." };
  }
  const user = await getUser();
  if (!user?.email) {
    return { error: "Please sign in to share a prayer request." };
  }

  // Posting is a Premium/Patron feature; reading + praying stay free for all.
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") {
    return {
      error:
        "Sharing a prayer request is a Premium feature. Upgrade to post — praying is always free.",
    };
  }

  const body = (input.body ?? "").trim().slice(0, MAX_PRAYER_LEN);
  const name = (input.name ?? "").trim().slice(0, MAX_NAME_LEN) || null;

  if (body.length < 3) {
    return { error: "Please write a little more about your request." };
  }

  const supabase = await createClient();
  // status defaults to 'pending' in the table — RLS only lets members insert pending rows.
  const { error } = await supabase
    .from("prayer_requests")
    .insert({ user_id: user.id, body, name });

  if (error) {
    console.error("submitPrayer:", error.message);
    return { error: "Something went wrong. Please try again in a moment." };
  }
  return { ok: true };
}

/** Anyone can tap "Pray" — a SECURITY DEFINER function bumps the counter on approved rows only. */
export async function prayAction(id: string): Promise<void> {
  if (!supabaseConfigured || !id) return;
  const supabase = await createClient();
  const { error } = await supabase.rpc("pray_for", { request_id: id });
  if (error) console.error("pray:", error.message);
  revalidatePath("/prayer-wall");
}
