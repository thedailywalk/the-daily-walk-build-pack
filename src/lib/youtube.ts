import "server-only";

/**
 * YouTube Data API inspection — the ONLY honest way to know whether a video is
 * actually safe to embed. We read the real `status.embeddable` flag, the
 * license, the privacy status, and the channel straight from YouTube. We never
 * guess these from the URL. Needs a free YOUTUBE_API_KEY (Google Cloud →
 * "YouTube Data API v3" → create an API key).
 */

export const youtubeConfigured = !!process.env.YOUTUBE_API_KEY;

export type VideoMeta = {
  provider: "youtube";
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  thumbnail: string;
  description: string;
  publishedAt: string;
  duration: string; // human, e.g. "8:42"
  durationSeconds: number;
  embeddable: boolean;
  license: string; // "youtube" | "creativeCommon"
  privacyStatus: string; // "public" | "unlisted" | "private"
};

/** Pull a YouTube video ID from a watch / share / embed / shorts URL, or a raw ID. */
export function parseYouTubeId(input: string): string | null {
  const s = (input || "").trim();
  if (!s) return null;
  // Raw 11-char id
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  try {
    const u = new URL(s);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const m = u.pathname.match(/\/(embed|shorts|v)\/([a-zA-Z0-9_-]{11})/);
      if (m) return m[2];
    }
  } catch {
    // not a URL
  }
  return null;
}

/** Turn an ISO-8601 duration (PT#H#M#S) into seconds + a human label. */
function parseDuration(iso: string): { seconds: number; label: string } {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso || "");
  if (!m) return { seconds: 0, label: "" };
  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const s = Number(m[3] ?? 0);
  const seconds = h * 3600 + min * 60 + s;
  const pad = (n: number) => String(n).padStart(2, "0");
  const label = h > 0 ? `${h}:${pad(min)}:${pad(s)}` : `${min}:${pad(s)}`;
  return { seconds, label };
}

/** Fetch real metadata + safety fields for one video. Null on any failure. */
export async function fetchVideoMeta(videoId: string): Promise<VideoMeta | null> {
  if (!youtubeConfigured || !videoId) return null;
  try {
    const url =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=" +
      encodeURIComponent(videoId) +
      "&key=" +
      encodeURIComponent(process.env.YOUTUBE_API_KEY!);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      items?: Array<{
        snippet?: {
          title?: string;
          description?: string;
          channelTitle?: string;
          channelId?: string;
          publishedAt?: string;
          thumbnails?: Record<string, { url?: string }>;
        };
        contentDetails?: { duration?: string };
        status?: { embeddable?: boolean; license?: string; privacyStatus?: string };
      }>;
    };
    const item = data.items?.[0];
    if (!item) return null;
    const sn = item.snippet ?? {};
    const th = sn.thumbnails ?? {};
    const thumbnail =
      th.maxres?.url ?? th.standard?.url ?? th.high?.url ?? th.medium?.url ?? th.default?.url ?? "";
    const { seconds, label } = parseDuration(item.contentDetails?.duration ?? "");
    return {
      provider: "youtube",
      videoId,
      title: sn.title ?? "",
      channelTitle: sn.channelTitle ?? "",
      channelId: sn.channelId ?? "",
      thumbnail,
      description: sn.description ?? "",
      publishedAt: sn.publishedAt ?? "",
      duration: label,
      durationSeconds: seconds,
      embeddable: item.status?.embeddable ?? false,
      license: item.status?.license ?? "",
      privacyStatus: item.status?.privacyStatus ?? "",
    };
  } catch {
    return null;
  }
}
