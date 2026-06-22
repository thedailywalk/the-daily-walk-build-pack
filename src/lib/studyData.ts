import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";

/** Per-day journal blob synced to the member's account. */
export type NotesData = {
  checked?: Record<string, boolean>;
  stood?: string;
  takeaway?: string;
  notes?: string;
};

export type Favorite = { ref: string; verseText: string; day: number | null };

export async function getNotes(userId: string, day: number): Promise<NotesData> {
  if (!supabaseConfigured) return {};
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("study_notes")
      .select("data")
      .eq("user_id", userId)
      .eq("day", day)
      .maybeSingle();
    return (data?.data as NotesData) ?? {};
  } catch {
    return {};
  }
}

export async function saveNotes(userId: string, day: number, data: NotesData) {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    await supabase
      .from("study_notes")
      .upsert(
        { user_id: userId, day, data, updated_at: new Date().toISOString() },
        { onConflict: "user_id,day" }
      );
  } catch {
    /* ignore */
  }
}

/** Days the member has journaled on (for the Saved Notes tab). */
export async function listNoteDays(
  userId: string
): Promise<{ day: number; data: NotesData }[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("study_notes")
      .select("day,data")
      .eq("user_id", userId)
      .order("day", { ascending: true });
    return (data ?? [])
      .map((r) => ({ day: r.day as number, data: (r.data as NotesData) ?? {} }))
      .filter((r) => hasContent(r.data));
  } catch {
    return [];
  }
}

function hasContent(d: NotesData): boolean {
  return Boolean(
    d.notes?.trim() ||
      d.stood?.trim() ||
      d.takeaway?.trim() ||
      (d.checked && Object.values(d.checked).some(Boolean))
  );
}

export async function listFavorites(userId: string): Promise<Favorite[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("study_favorites")
      .select("ref,verse_text,day")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    return (data ?? []).map((r) => ({
      ref: r.ref as string,
      verseText: r.verse_text as string,
      day: (r.day as number) ?? null,
    }));
  } catch {
    return [];
  }
}

export async function removeFavorite(userId: string, ref: string) {
  if (!supabaseConfigured) return;
  try {
    const supabase = await createClient();
    await supabase
      .from("study_favorites")
      .delete()
      .eq("user_id", userId)
      .eq("ref", ref);
  } catch {
    /* ignore */
  }
}

/** Toggle a favorite; returns true if it's now favorited. */
export async function toggleFavorite(
  userId: string,
  ref: string,
  verseText: string,
  day: number | null
): Promise<boolean> {
  if (!supabaseConfigured) return false;
  try {
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from("study_favorites")
      .select("ref")
      .eq("user_id", userId)
      .eq("ref", ref)
      .maybeSingle();
    if (existing) {
      await supabase
        .from("study_favorites")
        .delete()
        .eq("user_id", userId)
        .eq("ref", ref);
      return false;
    }
    await supabase
      .from("study_favorites")
      .insert({ user_id: userId, ref, verse_text: verseText, day });
    return true;
  } catch {
    return false;
  }
}
