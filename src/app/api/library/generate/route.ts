import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/adminGuard";
import {
  getLibraryItem,
  setLibraryItemBatch,
  setLibraryItemWellnessDraft,
} from "@/lib/library";
import { analyzeInspiration } from "@/lib/workbookAnalysis";
import { insertSuggestions, type NewSuggestion } from "@/lib/workbookEvolution";
import { draftWellnessScience } from "@/lib/wellnessAnalysis";

// AI generation can take 10–20s — keep it off the save path and give it room.
export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Background processing for a saved Library item: turn it into Workbook
 * suggestions and/or a Wellness "Science Behind It" draft, based on its chosen
 * destinations. Called by the Library page right after a save, so the save
 * itself stays instant.
 */
export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let id = "";
  try {
    const body = (await req.json()) as { id?: string };
    id = String(body.id ?? "").trim();
  } catch {
    /* ignore */
  }
  if (!id) return NextResponse.json({ ok: false, error: "missing id" }, { status: 400 });

  const item = await getLibraryItem(id);
  if (!item) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  if (item.isVoice) return NextResponse.json({ ok: true, skipped: "voice" });

  const text = [item.transcript, item.personalTake, item.body, item.caption]
    .filter(Boolean)
    .join("\n\n");
  const dest = item.destinations ?? ["newsletter", "workbook", "wellness"];

  let batchId: string | null = null;
  let wbmode: "ai" | "heuristic" | null = null;
  let wellness = false;

  // Workbook suggestions
  if (dest.includes("workbook") && text.trim().length >= 40) {
    try {
      const analysis = await analyzeInspiration({
        text,
        sourceLabel: item.title || "Library inspiration",
        sourceType: item.kind || "note",
        link: item.url ?? "",
        maxPlacements: 6,
      });
      if (analysis.placements.length) {
        const bid = randomUUID();
        const suggestions: NewSuggestion[] = analysis.placements.map((p) => ({
          dayIndex: p.dayIndex,
          batchId: bid,
          sourceLabel: item.title || "Library inspiration",
          sourceType: item.kind || "note",
          sourceLink: item.url ?? "",
          sourceExcerpt: text.slice(0, 4000),
          themes: p.themes,
          tone: analysis.tone,
          techniques: analysis.techniques,
          targetField: p.targetField,
          whyFits: p.whyFits,
          proposedText: p.proposedText,
          impact: p.impact,
        }));
        const n = await insertSuggestions(suggestions);
        if (n > 0) {
          batchId = bid;
          wbmode = analysis.mode;
          await setLibraryItemBatch(id, bid);
        }
      }
    } catch {
      /* ignore — leave unprocessed */
    }
  }

  // Wellness "Science Behind It" draft
  if (dest.includes("wellness") && text.trim().length >= 40) {
    try {
      const draft = await draftWellnessScience(text, item.title);
      if (draft) {
        await setLibraryItemWellnessDraft(id, draft);
        wellness = true;
      }
    } catch {
      /* ignore */
    }
  }

  return NextResponse.json({ ok: true, batchId, wbmode, wellness });
}
