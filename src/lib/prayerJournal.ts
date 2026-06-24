import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

/** A member's private prayer. Only ever readable by its owner (RLS). */
export type PrayerEntry = {
  id: string;
  title: string;
  body: string;
  answered: boolean;
  createdAt: string;
};

export async function listEntries(userId: string): Promise<PrayerEntry[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("prayer_journal")
      .select("id,title,body,answered,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return (data ?? []).map((r) => ({
      id: String(r.id),
      title: String(r.title ?? ""),
      body: String(r.body ?? ""),
      answered: Boolean(r.answered),
      createdAt: String(r.created_at ?? ""),
    }));
  } catch {
    return [];
  }
}

export async function addEntry(userId: string, title: string, body: string): Promise<void> {
  if (!supabaseConfigured || !body.trim()) return;
  try {
    const supabase = await createClient();
    await supabase.from("prayer_journal").insert({ user_id: userId, title, body });
  } catch {
    /* ignore */
  }
}

export async function setAnswered(userId: string, id: string, answered: boolean): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    await supabase
      .from("prayer_journal")
      .update({ answered, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId);
  } catch {
    /* ignore */
  }
}

export async function deleteEntry(userId: string, id: string): Promise<void> {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    await supabase.from("prayer_journal").delete().eq("id", id).eq("user_id", userId);
  } catch {
    /* ignore */
  }
}
