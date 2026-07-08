"use server";

import { requireAdmin } from "@/lib/adminGuard";
import {
  adminGetByDate,
  fullDevotionalFor,
  type Devotional,
} from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import { premiumGetByDate, fullPremiumFor, type PremiumIssue } from "@/lib/premium";
import { renderPremiumHtml } from "@/lib/premiumHtml";
import { getDailyGoodNews } from "@/lib/goodNews";
import { createBeehiivPost, type BeehiivResult } from "@/lib/beehiivSend";

/**
 * Phase 1: push a single issue into beehiiv as a DRAFT (nothing is sent).
 * Renders the exact same HTML the admin preview shows, then creates a draft
 * post via the beehiiv API so you can review it in beehiiv. Returns the result
 * (success with a link, or the beehiiv error) to the calling client component.
 */
export async function pushDraftAction(
  pub: "free" | "premium",
  date: string
): Promise<BeehiivResult> {
  await requireAdmin();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "Invalid date." };
  }

  const goodNews = await getDailyGoodNews(3);

  if (pub === "premium") {
    const existing = await premiumGetByDate(date);
    const data = existing?.data ?? fullPremiumFor(date);
    const issue: PremiumIssue = {
      date,
      status: "draft",
      title: existing?.title ?? "",
      data,
    };
    const html = renderPremiumHtml(issue, goodNews);
    const title = data.devHeading?.trim() || `The Deeper Walk · ${date}`;
    return createBeehiivPost({
      title,
      subtitle: data.devRef,
      bodyHtml: html,
      status: "draft",
    });
  }

  const existing = await adminGetByDate(date);
  const data = existing?.data ?? fullDevotionalFor(date);
  const dev: Devotional = {
    date,
    status: "draft",
    title: existing?.title ?? "",
    data,
  };
  const html = renderDevotionalHtml(dev, goodNews);
  const title = data.readingHeading?.trim() || `The Daily Walk · ${date}`;
  return createBeehiivPost({
    title,
    subtitle: data.verseRef,
    bodyHtml: html,
    status: "draft",
  });
}
