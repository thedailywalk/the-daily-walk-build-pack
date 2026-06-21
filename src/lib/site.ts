/**
 * Central site config — brand facts, nav, and external links.
 * Sourced from CLAUDE.md + context/. Keep copy/links here so pages stay in sync.
 */

export const site = {
  name: "The Daily Walk",
  wordmark: "THE DAILY WALK",
  tagline: "Walking with God in real life",
  description:
    "A daily devotional, a real prayer, and good news from around the world — every morning. Read the Bible in a year, guided. Free to start.",
  domain: "thedailywalknewsletter.com",
  url: process.env.APP_URL ?? "https://thedailywalknewsletter.com",
  replyTo: "thedailywalknewsletter@gmail.com",
  owner: "Lulu Jimenez",
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
  { href: "/#how", label: "How it works" },
  { href: "/#good", label: "Good News" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;
