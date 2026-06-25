/**
 * Beehiiv integration — server-only.
 *
 * Beehiiv owns the subscriber list, sending, and the Bible-in-a-Year automation
 * (see plan). This helper creates a subscription via Beehiiv's API. If the API
 * key / publication id are not configured, `isConfigured` is false and callers
 * should treat the signup as a local/dev success (no real list write).
 *
 * Docs: https://developers.beehiiv.com  (POST /publications/{id}/subscriptions)
 */

const API_BASE = "https://api.beehiiv.com/v2";

export const beehiivConfigured =
  !!process.env.BEEHIIV_API_KEY && !!process.env.BEEHIIV_PUBLICATION_ID;

export type SubscribeResult = {
  ok: boolean;
  /** true when the address already existed on the list */
  alreadySubscribed?: boolean;
  message: string;
};

export async function createBeehiivSubscription(
  email: string
): Promise<SubscribeResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;

  // Not configured: simulate success so the form is usable in local/dev.
  if (!apiKey || !pubId) {
    return {
      ok: true,
      message:
        "🎉 You're in! (dev mode — add Beehiiv keys to write to the real list.)",
    };
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/publications/${pubId}/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "website",
        referring_site: process.env.APP_URL ?? "thedailywalknewsletter.com",
      }),
    });
  } catch {
    return { ok: false, message: "Couldn't reach Beehiiv. Please try again." };
  }

  if (res.ok) {
    const data = (await res.json().catch(() => null)) as {
      data?: { status?: string };
    } | null;
    const status = data?.data?.status;
    if (status === "validating" || status === "active") {
      return {
        ok: true,
        message:
          "🎉 You're in! Your first devotional lands tomorrow at 6:30 AM PT.",
      };
    }
    return {
      ok: true,
      message: "🎉 You're in! Check your inbox to confirm.",
    };
  }

  // 409-ish: already on the list. Treat as a friendly success.
  if (res.status === 409) {
    return {
      ok: true,
      alreadySubscribed: true,
      message: "You're already subscribed — welcome back! 🙏",
    };
  }

  return {
    ok: false,
    message: "Something went wrong signing you up. Please try again.",
  };
}

export type Tier = "free" | "premium" | "patron";

export type Entitlement = {
  tier: Tier;
  status: string | null; // active, inactive, validating, …
  /** raw premium tier names from Beehiiv, for display/debugging */
  tierNames: string[];
  onList: boolean; // is this email a subscriber at all?
};

/**
 * Owner / comp access. These emails get full Patron access regardless of
 * Beehiiv billing — for the owner testing the product, staff, or free grants.
 * Edit this list, or add a comma-separated COMP_PATRON_EMAILS env var.
 */
const COMP_PATRON_EMAILS = new Set(
  [
    "thedailywalknewsletter@gmail.com",
    "delatorre.ucla@gmail.com", // test member — see the member (non-admin) experience
  ]
    .concat((process.env.COMP_PATRON_EMAILS ?? "").split(","))
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
);

/**
 * Look up a subscriber by email and map their Beehiiv premium tiers to our
 * Free/Premium/Patron model. Beehiiv is the source of truth for "who paid".
 * Tier names are matched case-insensitively against "patron"/"premium".
 */
export async function getEntitlement(email: string): Promise<Entitlement> {
  // Owner / comp access wins over Beehiiv billing.
  if (COMP_PATRON_EMAILS.has(email.trim().toLowerCase())) {
    return { tier: "patron", status: "active", tierNames: ["patron (comp)"], onList: true };
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  const fallback: Entitlement = {
    tier: "free",
    status: null,
    tierNames: [],
    onList: false,
  };

  if (!apiKey || !pubId) return fallback;

  const url =
    `${API_BASE}/publications/${pubId}/subscriptions/by_email/` +
    `${encodeURIComponent(email)}?expand[]=subscription_premium_tiers`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
  } catch {
    return fallback;
  }

  if (res.status === 404) return fallback; // not on the list
  if (!res.ok) return fallback;

  const json = (await res.json().catch(() => null)) as {
    data?: {
      status?: string;
      subscription_premium_tier_names?: string[];
      subscription_premium_tiers?: Array<{ name?: string }>;
    };
  } | null;

  const data = json?.data;
  if (!data) return fallback;

  const names = (
    data.subscription_premium_tier_names ??
    data.subscription_premium_tiers?.map((t) => t?.name ?? "") ??
    []
  )
    .filter(Boolean)
    .map((n) => n.toLowerCase());

  let tier: Tier = "free";
  if (names.some((n) => n.includes("patron"))) tier = "patron";
  else if (names.some((n) => n.includes("premium"))) tier = "premium";

  return {
    tier,
    status: data.status ?? null,
    tierNames: names,
    onList: true,
  };
}
