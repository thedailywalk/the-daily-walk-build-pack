"use server";

import { requireAdmin } from "@/lib/adminGuard";
import { adminGetByDate, fullDevotionalFor } from "@/lib/devotionals";
import { premiumGetByDate, fullPremiumFor } from "@/lib/premium";
import { deepCheck } from "@/lib/editorialCheckAI";
import type { Finding } from "@/lib/editorialCheck";

/** Run the AI-assisted deep check (verse accuracy + tone) for a day's draft. */
export async function deepCheckAction(
  pub: "free" | "premium",
  date: string
): Promise<Finding[]> {
  await requireAdmin();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];

  if (pub === "premium") {
    const ex = await premiumGetByDate(date);
    const d = ex?.data ?? fullPremiumFor(date);
    const verses = [
      { where: "Key verse", ref: (d.devVerseRef || "").trim(), text: (d.devVerseText || "").trim() },
    ].filter((v) => v.ref || v.text);
    const body = [d.devIntro, d.devBody, d.deeperWalk, d.bibleThread, d.heartCheck, d.walkItOut, d.saveLine]
      .filter(Boolean)
      .join("\n\n");
    return deepCheck({ verses, body });
  }

  const ex = await adminGetByDate(date);
  const d = ex?.data ?? fullDevotionalFor(date);
  const verses = [
    { where: "Key verse", ref: (d.verseRef || "").trim(), text: (d.verseText || "").trim() },
  ].filter((v) => v.ref || v.text);
  const body = [d.readingIntro, d.readingAfter, d.makeItRealBody, d.question, d.pastorTake, d.closingLine]
    .filter(Boolean)
    .join("\n\n");
  return deepCheck({ verses, body });
}
