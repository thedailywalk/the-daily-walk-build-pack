/**
 * Central site config — brand facts, nav, and external links.
 * Sourced from CLAUDE.md + context/. Keep copy/links here so pages stay in sync.
 */

export const site = {
  name: "The Daily Walk",
  wordmark: "THE DAILY WALK",
  tagline: "Walking with God in real life",
  description:
    "Three mornings a week: a short, honest devotional, a real prayer, and good news from around the world — free. And when you're ready, be guided through the whole Bible in a year, starting on your Day 1.",
  domain: "thedailywalknewsletter.com",
  url: process.env.APP_URL ?? "https://thedailywalknewsletter.com",
  replyTo: "thedailywalknewsletter@gmail.com",
  founderPhone: "310-303-4580",
  // GoFundMe for the learning-center mission. Set NEXT_PUBLIC_GOFUNDME_URL when
  // the campaign is live; until then the button shows a "launching soon" note.
  gofundmeUrl: process.env.NEXT_PUBLIC_GOFUNDME_URL ?? "",
  // Givebutter donations. Fill these in after you create your Givebutter
  // campaign (see docs/GIVEBUTTER-SETUP.md). Until `url` is set, the Give
  // button shows a friendly "giving opens soon" state so nothing looks broken.
  //  - url:      your campaign's public link, e.g. https://givebutter.com/your-slug
  //  - widgetId: the embed widget ID (lets the donation form show on /give)
  //  - accountId: your Givebutter account ID (used by the embed script)
  givebutter: {
    url: process.env.NEXT_PUBLIC_GIVEBUTTER_URL ?? "",
    widgetId: process.env.NEXT_PUBLIC_GIVEBUTTER_WIDGET_ID ?? "",
    accountId: process.env.NEXT_PUBLIC_GIVEBUTTER_ACCOUNT_ID ?? "",
  },
  owner: "Lulu Jimenez",
  // Physical mailing address — legally REQUIRED in every marketing email (CAN-SPAM).
  // A USPS P.O. Box is fine. Shown in every newsletter footer; hidden if blank.
  // Set here directly, or via NEXT_PUBLIC_MAILING_ADDRESS.
  // e.g. "The Daily Walk · PO Box 1234 · Yourtown, CA 90000"
  mailingAddress:
    process.env.NEXT_PUBLIC_MAILING_ADDRESS ??
    "The Daily Walk Newsletter · PO Box 1571 · Sunset Beach, CA 90742",
  // Required attribution when quoting the NIV in emails (Biblica permission terms).
  scriptureNotice:
    "Scripture quotations taken from the Holy Bible, New International Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.® Used by permission. All rights reserved worldwide.",
  // Beehiiv-hosted destinations (filled in once the publication exists).
  // Falls back to the on-site subscribe form / pricing page when unset.
  beehiiv: {
    subscribeUrl: process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL ?? "",
    upgradePremiumUrl: process.env.NEXT_PUBLIC_BEEHIIV_PREMIUM_URL ?? "/pricing",
    upgradePatronUrl: process.env.NEXT_PUBLIC_BEEHIIV_PATRON_URL ?? "/pricing",
    archiveUrl: process.env.NEXT_PUBLIC_BEEHIIV_ARCHIVE_URL ?? "",
    manageUrl: process.env.NEXT_PUBLIC_BEEHIIV_MANAGE_URL ?? "",
  },
  community: {
    label: "Community",
    url: process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "",
  },
} as const;

export const nav = [
  { href: "/devotional", label: "Today" },
  { href: "/#how", label: "How it works" },
  { href: "/#good", label: "Good News" },
  { href: "/prayer-wall", label: "Prayer Wall" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;
