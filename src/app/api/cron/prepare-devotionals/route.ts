import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminEnsureWeek, adminMarkReady, upcomingDates } from "@/lib/devotionals";
import { DEVOTIONAL_AUTO_PUBLISH } from "@/lib/flags";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily background job:
 *  1. Keeps the next 7 days auto-saved as fully-written drafts (always ready to
 *     edit in Devotional Prep with zero clicks).
 *  2. When DEVOTIONAL_AUTO_PUBLISH is on, auto-publishes TODAY's issue so it goes
 *     live on the site, in the member archive, and in the RSS feed on its own —
 *     you only step in to edit if you want to.
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

  const today = upcomingDates(1)[0];
  let published: string | null = null;
  if (DEVOTIONAL_AUTO_PUBLISH) {
    await adminMarkReady(today);
    published = today;
  }

  revalidatePath("/admin/devotionals");
  revalidatePath("/devotional");

  return NextResponse.json({
    ok: true,
    ensured: upcomingDates(7),
    published,
    ranAt: new Date().toISOString(),
  });
}
