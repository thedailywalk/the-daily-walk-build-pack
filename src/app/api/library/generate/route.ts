import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { getLibraryItem, setLibraryItemWellnessDraft } from "@/lib/library";
import {
  regenerateWorkbookSuggestions,
  regenerateNewsletterSuggestions,
} from "@/lib/cumulativeSuggestions";
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
  let wbCount = 0;
  let nlFree = 0;
  let nlPremium = 0;
  let nlmode: "ai" | "none" = "none";
  let wellness = false;

  // Wellness "Science Behind It" draft — stays per-item (each is a distinct angle).
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

  // Workbook — cumulative: rebuild ONE up-to-date set from all recent inspiration.
  if (dest.includes("workbook")) {
    try {
      const r = await regenerateWorkbookSuggestions();
      wbCount = r.inserted;
      wbmode = r.mode;
      batchId = r.batchId;
    } catch {
      /* ignore */
    }
  }

  // Newsletter — cumulative: rebuild suggested updates for the week ahead.
  if (dest.includes("newsletter")) {
    try {
      const r = await regenerateNewsletterSuggestions();
      nlFree = r.free;
      nlPremium = r.premium;
      nlmode = r.mode;
    } catch {
      /* ignore */
    }
  }

  return NextResponse.json({
    ok: true,
    batchId,
    wbmode,
    wbCount,
    nlFree,
    nlPremium,
    nlmode,
    wellness,
  });
}
