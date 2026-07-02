import "server-only";
import { randomUUID } from "crypto";
import { listInspirationForDestination, type LibraryItem } from "@/lib/library";
import { randomUUID as uuid2 } from "crypto";
import { analyzeInspiration } from "@/lib/workbookAnalysis";
import { analyzeNewsletters } from "@/lib/newsletterAnalysis";
import {
  insertSuggestions,
  deletePendingSuggestions,
  rejectedFieldPairs,
  approvedFieldPairs,
  resetOrphanReviewDays,
  type NewSuggestion,
} from "@/lib/workbookEvolution";
import {
  insertNewsletterSuggestions,
  deletePendingNewsletterSuggestions,
  rejectedNewsletterSpots,
  type NewNewsletterSuggestion,
} from "@/lib/newsletterEvolution";

/**
 * Cumulative Workbook suggestions.
 *
 * Every time you add workbook-routed inspiration, we DON'T pile a new isolated
 * batch on top of the old ones. Instead we re-read the most recent window of
 * inspiration, consider it ALL together, and rebuild ONE living set of pending
 * suggestions — the most up-to-date overall rendition for you to review.
 *
 * Guardrails so it never undoes your decisions:
 *   • Edits you already APPROVED stay applied (we skip those day+field spots).
 *   • Ideas you already REJECTED never come back (we skip those day+field spots).
 *   • LOCKED days are never touched (the analyzer already protects them).
 */

/** How many recent inspiration items feed one regeneration. */
export const INSPIRATION_WINDOW = 12;
/** Cap on combined text so token cost stays bounded. */
const MAX_COMBINED_CHARS = 7000;

function combineText(items: LibraryItem[]): { text: string; used: LibraryItem[]; dropped: number } {
  const used: LibraryItem[] = [];
  const chunks: string[] = [];
  let total = 0;
  for (const it of items) {
    const body = [it.transcript, it.personalTake, it.body, it.caption]
      .filter(Boolean)
      .join("\n")
      .trim();
    if (body.length < 20) continue;
    const chunk = `— ${it.title || "Untitled"} —\n${body}`;
    if (total + chunk.length > MAX_COMBINED_CHARS && used.length > 0) break;
    chunks.push(chunk);
    used.push(it);
    total += chunk.length + 2;
  }
  const dropped = items.filter((i) => body(i).length >= 20).length - used.length;
  return { text: chunks.join("\n\n"), used, dropped: Math.max(0, dropped) };
}
function body(it: LibraryItem): string {
  return [it.transcript, it.personalTake, it.body, it.caption].filter(Boolean).join("\n").trim();
}

export type RegenResult = {
  ok: boolean;
  inserted: number;
  considered: number;
  dropped: number;
  mode: "ai" | "heuristic" | null;
  batchId: string | null;
};

export async function regenerateWorkbookSuggestions(): Promise<RegenResult> {
  const items = await listInspirationForDestination("workbook", INSPIRATION_WINDOW);
  const { text, used, dropped } = combineText(items);
  if (!text.trim()) {
    // Nothing to build from — clear the stale pending queue so it stays honest.
    await deletePendingSuggestions();
    await resetOrphanReviewDays();
    return { ok: true, inserted: 0, considered: 0, dropped: 0, mode: null, batchId: null };
  }

  const analysis = await analyzeInspiration({
    text,
    sourceLabel: `Your library — ${used.length} recent item${used.length === 1 ? "" : "s"}`,
    sourceType: "library",
    maxPlacements: 8,
  });

  const [rejected, approved] = await Promise.all([rejectedFieldPairs(), approvedFieldPairs()]);

  const bid = randomUUID();
  const fresh: NewSuggestion[] = [];
  for (const p of analysis.placements) {
    const pair = `${p.dayIndex}:${p.targetField}`;
    if (rejected.has(pair) || approved.has(pair)) continue; // keep decisions
    fresh.push({
      dayIndex: p.dayIndex,
      batchId: bid,
      sourceLabel: `Your library — cumulative (${used.length} item${used.length === 1 ? "" : "s"})`,
      sourceType: "library",
      sourceLink: "",
      sourceExcerpt: text.slice(0, 4000),
      themes: p.themes,
      tone: analysis.tone,
      techniques: analysis.techniques,
      targetField: p.targetField,
      whyFits: p.whyFits,
      proposedText: p.proposedText,
      impact: p.impact,
    });
  }

  // Replace the pending queue with the fresh, everything-considered rendition.
  await deletePendingSuggestions();
  const inserted = fresh.length ? await insertSuggestions(fresh) : 0;
  await resetOrphanReviewDays();

  return {
    ok: true,
    inserted,
    considered: used.length,
    dropped,
    mode: inserted ? analysis.mode : null,
    batchId: inserted ? bid : null,
  };
}

export type NewsletterRegenResult = {
  ok: boolean;
  inserted: number;
  considered: number;
  mode: "ai" | "none";
};

/**
 * Cumulative Newsletter suggestions — same idea as the workbook, aimed at the
 * upcoming week of the free daily + premium editions. Rebuilds one living set
 * from the recent newsletter-routed inspiration; never re-surfaces dismissed
 * spots. (Needs ANTHROPIC_API_KEY; without it, nothing is proposed.)
 */
export async function regenerateNewsletterSuggestions(): Promise<NewsletterRegenResult> {
  const items = await listInspirationForDestination("newsletter", INSPIRATION_WINDOW);
  const { text, used } = combineText(items);
  if (!text.trim()) {
    await deletePendingNewsletterSuggestions();
    return { ok: true, inserted: 0, considered: 0, mode: "none" };
  }

  const analysis = await analyzeNewsletters({
    text,
    sourceLabel: `Your library — ${used.length} recent item${used.length === 1 ? "" : "s"}`,
    days: 7,
  });

  const rejected = await rejectedNewsletterSpots();
  const bid = uuid2();
  const fresh: NewNewsletterSuggestion[] = [];
  for (const p of analysis.placements) {
    const spot = `${p.publication}:${p.issueDate}:${p.targetField}`;
    if (rejected.has(spot)) continue;
    fresh.push({
      publication: p.publication,
      issueDate: p.issueDate,
      batchId: bid,
      sourceLabel: `Your library — cumulative (${used.length} item${used.length === 1 ? "" : "s"})`,
      sourceType: "library",
      targetField: p.targetField,
      currentText: p.currentText,
      proposedText: p.proposedText,
      whyFits: p.whyFits,
      impact: p.impact,
      themes: p.themes,
      tone: p.tone,
    });
  }

  await deletePendingNewsletterSuggestions();
  const inserted = fresh.length ? await insertNewsletterSuggestions(fresh) : 0;
  return { ok: true, inserted, considered: used.length, mode: analysis.mode };
}
