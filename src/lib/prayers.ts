import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export { MAX_PRAYER_LEN, MAX_NAME_LEN } from "@/lib/prayer-limits";

export type Prayer = {
  id: string;
  name: string | null;
  body: string;
  prayCount: number;
  createdAt: string;
};

export type PendingPrayer = {
  id: string;
  name: string | null;
  body: string;
  createdAt: string;
};

type Row = {
  id: string;
  name: string | null;
  body: string;
  pray_count: number;
  created_at: string;
};

/** Approved prayers, newest first — shown publicly on the wall. */
export async function listApprovedPrayers(limit = 60): Promise<Prayer[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prayer_requests")
    .select("id,name,body,pray_count,created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("listApprovedPrayers:", error.message);
    return [];
  }
  return (data ?? []).map(toPrayer);
}

/** Pending prayers, oldest first — for the owner's approval queue (RLS gates this to admins). */
export async function listPendingPrayers(): Promise<PendingPrayer[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prayer_requests")
    .select("id,name,body,created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("listPendingPrayers:", error.message);
    return [];
  }
  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    body: r.body,
    createdAt: r.created_at,
  }));
}

function toPrayer(r: Row): Prayer {
  return {
    id: r.id,
    name: r.name,
    body: r.body,
    prayCount: r.pray_count ?? 0,
    createdAt: r.created_at,
  };
}
