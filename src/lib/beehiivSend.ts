import "server-only";

/**
 * Minimal beehiiv API client for pushing an issue into beehiiv as a post.
 *
 * Phase 1 uses status "draft" only — it creates a draft in your beehiiv Posts
 * so you can review it; nothing is sent. Phase 2 will switch to scheduled sends.
 *
 * Auth: the API key is read from the environment and NEVER hardcoded. Set
 *   BEEHIIV_API_KEY   — a private API key (Settings → API in beehiiv)  [secret]
 *   BEEHIIV_PUBLICATION_ID — optional; defaults to the known publication id.
 * The publication id is a non-secret identifier, so it has a safe default.
 */

const API_BASE = "https://api.beehiiv.com/v2";
const PUB_ID =
  process.env.BEEHIIV_PUBLICATION_ID || "pub_5f190d2d-b861-4c08-a421-9e30af531e41";

export type BeehiivResult =
  | { ok: true; id: string; status?: string; webUrl?: string }
  | { ok: false; error: string; code?: number };

export function beehiivConfigured(): boolean {
  return !!process.env.BEEHIIV_API_KEY;
}

export async function createBeehiivPost(opts: {
  title: string;
  subtitle?: string;
  bodyHtml: string;
  /** "draft" (default) creates a reviewable draft; "confirmed" publishes/sends. */
  status?: "draft" | "confirmed";
  /** ISO 8601; only used with status "confirmed" to schedule the send. */
  scheduledAt?: string;
}): Promise<BeehiivResult> {
  const key = process.env.BEEHIIV_API_KEY;
  if (!key) {
    return {
      ok: false,
      error:
        "BEEHIIV_API_KEY is not set. Add it in your host's environment settings, then redeploy.",
    };
  }

  const body: Record<string, unknown> = {
    title: opts.title.slice(0, 200),
    body_content: opts.bodyHtml,
    status: opts.status ?? "draft",
  };
  if (opts.subtitle) body.subtitle = opts.subtitle.slice(0, 200);
  if (opts.scheduledAt && (opts.status ?? "draft") === "confirmed") {
    body.scheduled_at = opts.scheduledAt;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/publications/${PUB_ID}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (e) {
    return { ok: false, error: `Couldn't reach beehiiv: ${(e as Error).message}` };
  }

  const text = await res.text();
  if (!res.ok) {
    let msg = text;
    try {
      const j = JSON.parse(text);
      msg = j?.errors?.[0]?.message || j?.error || j?.message || text;
    } catch {
      /* leave msg as raw text */
    }
    return { ok: false, error: (msg || `HTTP ${res.status}`).slice(0, 400), code: res.status };
  }

  let data: unknown = {};
  try {
    data = JSON.parse(text);
  } catch {
    /* ignore */
  }
  const post =
    (data as { data?: Record<string, unknown> })?.data ??
    (data as Record<string, unknown>);
  return {
    ok: true,
    id: String(post?.id ?? "(unknown)"),
    status: post?.status ? String(post.status) : undefined,
    webUrl: post?.web_url ? String(post.web_url) : undefined,
  };
}
