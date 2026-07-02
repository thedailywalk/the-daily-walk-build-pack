"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/adminGuard";
import {
  applyNewsletterSuggestion,
  rejectNewsletterSuggestion,
} from "@/lib/newsletterEvolution";
import { regenerateNewsletterSuggestions } from "@/lib/cumulativeSuggestions";

export async function approveNewsletterSuggestionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await applyNewsletterSuggestion(id);
  revalidatePath("/admin/newsletters");
}

export async function rejectNewsletterSuggestionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await rejectNewsletterSuggestion(id);
  revalidatePath("/admin/newsletters");
}

/** Manually rebuild the week-ahead suggestions from your latest inspiration. */
export async function regenerateNewsletterSuggestionsAction() {
  await requireAdmin();
  await regenerateNewsletterSuggestions();
  revalidatePath("/admin/newsletters");
}
