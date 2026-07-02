import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  premiumEnsureWeek,
  premiumGetByDate,
  premiumUpsert,
  fullPremiumFor,
  weekdayLabel,
  upcomingDates,
  type PremiumData,
} from "@/lib/premium";
import { draftWorldNews } from "@/lib/worldNews";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Thursday-morning job: fill "The World Through God's Lens" in that day's premium
 * issue from REAL current headlines (paraphrased + faith lens + a source link),
 * with a reshare-cleared Wikimedia Commons photo when one is found. Skips issues
 * already marked "ready" so it never clobbers a version you finalized.
 *
 * Scheduled Thursdays only; also safe to hit any day (returns skipped).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const today = upcomingDates(1)[0];
  if (weekdayLabel(today) !== "Thursday") {
    return NextResponse.json({ ok: true, skipped: "not Thursday", date: today });
  }

  await premiumEnsureWeek(7);
  const existing = await premiumGetByDate(today);
  if (existing?.status === "ready") {
    return NextResponse.json({ ok: true, skipped: "already finalized", date: today });
  }

  const stories = await draftWorldNews(3);
  if (!stories.length) {
    return NextResponse.json({ ok: false, error: "no headlines", date: today });
  }

  const base: PremiumData = existing?.data ?? fullPremiumFor(today);
  const next: PremiumData = {
    ...base,
    worldHeading: base.worldHeading || "The World Through God's Lens",
    worldIntro:
      base.worldIntro ||
      "A few of this week's headlines, held up to God's light instead of handed to our fear. Aware, but not afraid — God is still sovereign, still near, still moving.",
  };
  const rec = next as unknown as Record<string, string>;
  stories.forEach((s, i) => {
    const n = i + 1;
    rec[`world${n}What`] = s.what;
    rec[`world${n}Faith`] = s.faith;
    rec[`world${n}Pray`] = s.pray;
    rec[`world${n}Url`] = s.url;
    rec[`world${n}Source`] = s.source;
    if (s.img) {
      rec[`world${n}Img`] = s.img;
      rec[`world${n}Credit`] = s.credit ?? "Wikimedia Commons";
    }
  });

  await premiumUpsert(
    today,
    existing?.status ?? "draft",
    existing?.title || next.devHeading || `Premium · ${today}`,
    next
  );
  revalidatePath("/admin/premium");

  return NextResponse.json({
    ok: true,
    date: today,
    stories: stories.length,
    withPhotos: stories.filter((s) => s.img).length,
    ranAt: new Date().toISOString(),
  });
}
