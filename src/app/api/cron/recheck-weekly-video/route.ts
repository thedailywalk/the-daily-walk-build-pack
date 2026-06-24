import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { recheckSelectedVideos } from "@/lib/weeklyVideo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily health re-check: re-verifies every selected (featured + scheduled) video
 * against YouTube. If a creator turned off embedding, made it private, or removed
 * it, the video is auto-hidden from the public page and flagged in the admin so
 * you can swap it. Note: embeds are self-enforcing anyway (YouTube stops serving
 * a pulled video instantly) — this is for a clean experience, not legal cover.
 *
 * If CRON_SECRET is set, requests must send `Authorization: Bearer <secret>`.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const result = await recheckSelectedVideos();
  if (result.flagged.length > 0) {
    revalidatePath("/admin/weekly-video");
    revalidatePath("/wonders");
  }

  return NextResponse.json({
    ok: true,
    ...result,
    ranAt: new Date().toISOString(),
  });
}
