"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  applyNewsletterSuggestion,
  rejectNewsletterSuggestion,
  lockNewsletterIssue,
  type Publication,
} from "@/lib/newsletterEvolution";
import { regenerateNewsletterSuggestions } from "@/lib/cumulativeSuggestions";
import { adminEnsureWeek } from "@/lib/devotionals";
import { premiumEnsureWeek } from "@/lib/premium";
import { wellnessEnsureWeek } from "@/lib/wellness";

/** Back to where you were: a review section (#free-suggestions / …) or the list. */
function backTo(formData: FormData): string {
  const from = String(formData.get("from") ?? "").trim();
  const anchor = /^#[a-z-]+$/.test(from) ? from : "";
  return `/admin/newsletters${anchor}`;
}

export async function approveNewsletterSuggestionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await applyNewsletterSuggestion(id);
  revalidatePath("/admin/newsletters");
  redirect(backTo(formData));
}

export async function rejectNewsletterSuggestionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (id) await rejectNewsletterSuggestion(id);
  revalidatePath("/admin/newsletters");
  redirect(backTo(formData));
}

/**
 * Stage the next 7 days of every edition (free, premium, wellness) as ready-to-
 * edit drafts. They render with the current template automatically, so this also
 * "refreshes the look." Never overwrites issues you've already saved/finalized.
 */
export async function prepareWeekAheadAction() {
  await requireAdmin();
  await Promise.all([adminEnsureWeek(7), premiumEnsureWeek(7), wellnessEnsureWeek(7)]);
  revalidatePath("/admin/newsletters");
  redirect("/admin/newsletters");
}

/**
 * Lock an issue: mark it Ready and stop it from getting new suggested edits.
 * Clears anything still pending for that issue.
 */
export async function lockNewsletterIssueAction(formData: FormData) {
  await requireAdmin();
  const pub = String(formData.get("publication") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  if ((pub === "free" || pub === "premium") && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    await lockNewsletterIssue(pub as Publication, date);
  }
  revalidatePath("/admin/newsletters");
  redirect(backTo(formData));
}

/** Manually rebuild the week-ahead suggestions from your latest inspiration. */
export async function regenerateNewsletterSuggestionsAction() {
  await requireAdmin();
  await regenerateNewsletterSuggestions();
  revalidatePath("/admin/newsletters");
  redirect("/admin/newsletters#suggestions");
}
