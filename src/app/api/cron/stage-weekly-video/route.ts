import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  autoFillCandidates,
  listCandidates,
  nextWeekStart,
} from "@/lib/weeklyVideo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Weekly background job (Mondays): auto-stages ~10 verified video picks for the
 * UPCOMING week, pulled from your trusted channels and checked live (public +
 * embeddable). They simply appear in the Weekly Video studio — you pick one when
 * you're ready. It NEVER selects or publishes a video on its own.
 *
 * Idempotent: if that week already has candidates (or you've already picked
 * one), it leaves everything alone so it can't clobber your choices.
 *
 * If CRON_SECRET is set, requests must send `Authorization: Bearer <secret>`
 * (Vercel Cron sends this automatically).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const week = nextWeekStart();

  // Don't overwrite anything you've already staged or chosen for that week.
  const existing = await listCandidates(week);
  if (existing.length > 0) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      reason: "candidates already staged for this week",
      week,
      ranAt: new Date().toISOString(),
    });
  }

  const result = await autoFillCandidates(week, 10);
  revalidatePath("/admin/weekly-video");

  return NextResponse.json({
    ok: true,
    week,
    ...result,
    ranAt: new Date().toISOString(),
  });
}
