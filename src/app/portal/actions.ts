"use server";

import { getUser } from "@/lib/supabase/server";
import { getEntitlement } from "@/lib/beehiiv";
import { getTodayQuestion } from "@/lib/questionOfTheDay";
import { recordVote, getCounts } from "@/lib/poll";

/** Record a member's Question-of-the-Day vote; return the updated tallies. */
export async function voteAction(date: string, choice: number): Promise<number[]> {
  const q = getTodayQuestion();
  const user = await getUser();
  if (!user?.email) return getCounts(date, q.options.length);
  const ent = await getEntitlement(user.email);
  if (ent.tier === "free") return getCounts(date, q.options.length);

  if (Number.isInteger(choice) && choice >= 0 && choice < q.options.length) {
    await recordVote(date, choice);
  }
  return getCounts(date, q.options.length);
}
