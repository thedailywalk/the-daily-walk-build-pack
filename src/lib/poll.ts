import "server-only";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";

/**
 * Question-of-the-Day vote tallies. Anonymous: we record (date, choice) only,
 * then aggregate counts per option so the dashboard card can show how the
 * community answered. Reads/writes use the service client (server-side only).
 */

export async function recordVote(date: string, choice: number): Promise<void> {
  if (!adminDbConfigured) return;
  try {
    const supabase = createServiceClient();
    await supabase.from("poll_votes").insert({ poll_date: date, choice });
  } catch {
    // non-fatal — a missed tally shouldn't break the dashboard
  }
}

/** Vote counts per option index for a given day. */
export async function getCounts(date: string, optionCount: number): Promise<number[]> {
  const counts = new Array(optionCount).fill(0);
  if (!adminDbConfigured) return counts;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase.from("poll_votes").select("choice").eq("poll_date", date);
    for (const row of data ?? []) {
      const c = Number((row as { choice: number }).choice);
      if (c >= 0 && c < optionCount) counts[c] += 1;
    }
  } catch {
    // fall through to zeros
  }
  return counts;
}
