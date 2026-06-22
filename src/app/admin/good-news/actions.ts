"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUser, createClient, supabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export type FeaturedInput = {
  category: string;
  headline: string;
  href: string;
  image: string;
  source: string;
};

async function requireAdmin() {
  const user = await getUser();
  if (!user?.email || !isAdminEmail(user.email)) redirect("/");
  return user;
}

export async function saveFeaturedAction(
  items: FeaturedInput[]
): Promise<{ ok: true } | { error: string }> {
  if (!supabaseConfigured) return { error: "Not available right now." };
  await requireAdmin();
  const supabase = await createClient();

  // Replace the whole set (0–3 rows).
  await supabase.from("featured_good_news").delete().gte("position", 0);

  const rows = items.slice(0, 3).map((it, i) => ({
    position: i,
    category: it.category || "Good News",
    headline: it.headline,
    href: it.href,
    image: it.image || null,
    source: it.source || "Good News Network",
  }));

  if (rows.length) {
    const { error } = await supabase.from("featured_good_news").insert(rows);
    if (error) {
      console.error("saveFeatured:", error.message);
      return { error: "Could not save your picks. Please try again." };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/good-news");
  return { ok: true };
}

export async function clearFeaturedAction(): Promise<void> {
  if (!supabaseConfigured) return;
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from("featured_good_news").delete().gte("position", 0);
  revalidatePath("/");
  revalidatePath("/admin/good-news");
}
