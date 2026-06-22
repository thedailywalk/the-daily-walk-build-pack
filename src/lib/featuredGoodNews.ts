import "server-only";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import type { GoodNewsItem } from "@/lib/content";

/** The owner's hand-picked stories (0–3), in display order. Empty = automatic. */
export async function getFeaturedGoodNews(): Promise<GoodNewsItem[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("featured_good_news")
      .select("category,headline,href,image,source,position")
      .order("position", { ascending: true });
    if (error || !data) return [];
    return data.map((r) => ({
      category: r.category,
      headline: r.headline,
      href: r.href,
      image: r.image ?? "",
      source: r.source ?? "Good News Network",
    }));
  } catch {
    return [];
  }
}
