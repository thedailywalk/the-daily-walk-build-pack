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
