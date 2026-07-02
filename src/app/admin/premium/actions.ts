"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import {
  premiumUpsert,
  premiumGetByDate,
  premiumDelete,
  premiumEnsureWeek,
  fullPremiumFor,
  type PremiumData,
  type PremiumStatus,
} from "@/lib/premium";
import { draftWorldNews } from "@/lib/worldNews";
import { findCommonsImage } from "@/lib/commonsImage";

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function savePremiumAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const status: PremiumStatus =
    str(formData, "status") === "ready" ? "ready" : "draft";

  const data: PremiumData = {
    weekFocus: str(formData, "weekFocus"),
    dayLabel: str(formData, "dayLabel"),
    editorNote: str(formData, "editorNote"),
    devHeading: str(formData, "devHeading"),
    devRef: str(formData, "devRef"),
    devIntro: str(formData, "devIntro"),
    devVerseText: str(formData, "devVerseText"),
    devVerseRef: str(formData, "devVerseRef"),
    devBody: str(formData, "devBody"),
    devKeyWord: str(formData, "devKeyWord"),
    devReflection: str(formData, "devReflection"),
    devApply: str(formData, "devApply"),
    devPrayer: str(formData, "devPrayer"),
    worldHeading: str(formData, "worldHeading"),
    worldIntro: str(formData, "worldIntro"),
    world1What: str(formData, "world1What"),
    world1Faith: str(formData, "world1Faith"),
    world1Pray: str(formData, "world1Pray"),
    world1Url: str(formData, "world1Url"),
    world1Source: str(formData, "world1Source"),
    world1Img: str(formData, "world1Img"),
    world1Credit: str(formData, "world1Credit"),
    world2What: str(formData, "world2What"),
    world2Faith: str(formData, "world2Faith"),
    world2Pray: str(formData, "world2Pray"),
    world2Url: str(formData, "world2Url"),
    world2Source: str(formData, "world2Source"),
    world2Img: str(formData, "world2Img"),
    world2Credit: str(formData, "world2Credit"),
    world3What: str(formData, "world3What"),
    world3Faith: str(formData, "world3Faith"),
    world3Pray: str(formData, "world3Pray"),
    world3Url: str(formData, "world3Url"),
    world3Source: str(formData, "world3Source"),
    world3Img: str(formData, "world3Img"),
    world3Credit: str(formData, "world3Credit"),
    brightHeading: str(formData, "brightHeading"),
    brightBody: str(formData, "brightBody"),
    studyHeading: str(formData, "studyHeading"),
    studyRef: str(formData, "studyRef"),
    studyBody: str(formData, "studyBody"),
    studyKeyWord: str(formData, "studyKeyWord"),
    studyVerse: str(formData, "studyVerse"),
    studyQuestion: str(formData, "studyQuestion"),
    circleBody: str(formData, "circleBody"),
    circleCtaLabel: str(formData, "circleCtaLabel"),
    circleCtaUrl: str(formData, "circleCtaUrl"),
    closingLine: str(formData, "closingLine"),
  };

  const title = data.devHeading || `Premium · ${date}`;
  await premiumUpsert(date, status, title, data);

  revalidatePath("/admin/premium");
  redirect(`/admin/premium?date=${date}&saved=1`);
}

/**
 * Fill "The World Through God's Lens" from REAL current headlines (paraphrased +
 * faith lens, with a source link on each). Merges into the issue, leaving every
 * other field untouched. Images stay manual — add a reshare-cleared photo + credit.
 */
export async function draftWorldNewsAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const stories = await draftWorldNews(3);
  if (!stories.length) {
    redirect(`/admin/premium?date=${date}&worldnews=empty`);
  }

  const existing = await premiumGetByDate(date);
  const base: PremiumData = existing?.data ?? fullPremiumFor(date);
  const next: PremiumData = {
    ...base,
    worldHeading: base.worldHeading || "The World Through God's Lens",
    worldIntro:
      base.worldIntro ||
      "A few of this week's headlines, held up to God's light instead of handed to our fear. Aware, but not afraid — God is still sovereign, still near, still moving.",
  };
  stories.forEach((s, i) => {
    const n = i + 1;
    const rec = next as unknown as Record<string, string>;
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

  await premiumUpsert(date, existing?.status ?? "draft", existing?.title || next.devHeading || `Premium · ${date}`, next);
  revalidatePath("/admin/premium");
  redirect(`/admin/premium?date=${date}&worldnews=1`);
}

/**
 * Find a reshare-cleared Wikimedia Commons photo for each World story that has
 * text but no image yet. Fills the photo URL + credit; never overwrites a photo
 * you already set.
 */
export async function findWorldImagesAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;

  const existing = await premiumGetByDate(date);
  const base: PremiumData = existing?.data ?? fullPremiumFor(date);
  const next: PremiumData = { ...base };
  const rec = next as unknown as Record<string, string>;

  for (let n = 1; n <= 3; n++) {
    const what = rec[`world${n}What`];
    const hasImg = rec[`world${n}Img`];
    if (!what || hasImg) continue;
    const found = await findCommonsImage(what);
    if (found) {
      rec[`world${n}Img`] = found.url;
      rec[`world${n}Credit`] = found.credit;
    }
  }

  await premiumUpsert(date, existing?.status ?? "draft", existing?.title || next.devHeading || `Premium · ${date}`, next);
  revalidatePath("/admin/premium");
  redirect(`/admin/premium?date=${date}&worldimg=1`);
}

export async function preparePremiumWeekAction() {
  await requireAdmin();
  await premiumEnsureWeek(7);
  revalidatePath("/admin/premium");
  redirect("/admin/premium");
}

export async function deletePremiumAction(formData: FormData) {
  await requireAdmin();
  const date = str(formData, "date");
  if (date) await premiumDelete(date);
  revalidatePath("/admin/premium");
  redirect("/admin/premium");
}
