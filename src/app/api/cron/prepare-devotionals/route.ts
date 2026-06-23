import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminEnsureWeek, upcomingDates } from "@/lib/devotionals";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily background job: keeps the next 7 days auto-saved as fully-written
 * DRAFTS so they're always ready in Devotional Prep with zero clicks. It never
 * publishes — issues only go live once you mark them "Ready" yourself.
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

  await adminEnsureWeek(7);
  revalidatePath("/admin/devotionals");

  return NextResponse.json({
    ok: true,
    ensured: upcomingDates(7),
    ranAt: new Date().toISOString(),
  });
}
