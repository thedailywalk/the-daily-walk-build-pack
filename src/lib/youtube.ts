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
  viewCount: number;
  likeCount: number;
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

type VideoItem = {
  id?: string;
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
  statistics?: { viewCount?: string; likeCount?: string };
};

function toMeta(item: VideoItem, fallbackId: string): VideoMeta {
  const sn = item.snippet ?? {};
  const th = sn.thumbnails ?? {};
  const thumbnail =
    th.maxres?.url ?? th.standard?.url ?? th.high?.url ?? th.medium?.url ?? th.default?.url ?? "";
  const { seconds, label } = parseDuration(item.contentDetails?.duration ?? "");
  return {
    provider: "youtube",
    videoId: item.id ?? fallbackId,
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
    viewCount: Number(item.statistics?.viewCount ?? 0),
    likeCount: Number(item.statistics?.likeCount ?? 0),
  };
}

/** Fetch real metadata + safety fields for one video. Null on any failure. */
export async function fetchVideoMeta(videoId: string): Promise<VideoMeta | null> {
  const [m] = await fetchVideoMetaBatch([videoId]);
  return m ?? null;
}

/** Fetch metadata for up to 50 videos in one call (1 quota unit). */
export async function fetchVideoMetaBatch(ids: string[]): Promise<VideoMeta[]> {
  const clean = ids.map((s) => s.trim()).filter(Boolean).slice(0, 50);
  if (!youtubeConfigured || clean.length === 0) return [];
  try {
    const url =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status,statistics&id=" +
      encodeURIComponent(clean.join(",")) +
      "&key=" +
      encodeURIComponent(process.env.YOUTUBE_API_KEY!);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: VideoItem[] };
    return (data.items ?? []).map((it) => toMeta(it, ""));
  } catch {
    return [];
  }
}

/**
 * Search across all of YouTube for embeddable videos matching a query. Returns
 * video IDs only (costs ~100 quota units, so use sparingly). safeSearch=strict
 * and videoEmbeddable=true are enforced; order defaults to most-viewed.
 *
 * NOTE: results are open-web, so they may include reuploads/clips — callers
 * must treat them as "review first," not automatically safe.
 */
export async function searchVideos(
  query: string,
  max = 20,
  order: "viewCount" | "relevance" | "rating" = "viewCount"
): Promise<string[]> {
  if (!youtubeConfigured || !query.trim()) return [];
  try {
    const url =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video" +
      "&videoEmbeddable=true&safeSearch=strict&maxResults=" +
      Math.min(Math.max(max, 1), 50) +
      "&order=" +
      order +
      "&q=" +
      encodeURIComponent(query.trim()) +
      "&key=" +
      encodeURIComponent(process.env.YOUTUBE_API_KEY!);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      items?: Array<{ id?: { videoId?: string } }>;
    };
    return (data.items ?? []).map((i) => i.id?.videoId ?? "").filter(Boolean);
  } catch {
    return [];
  }
}

export type VideoHealth = {
  status: "ok" | "gone" | "blocked" | "unknown";
  embeddable?: boolean;
  privacyStatus?: string;
};

/**
 * Re-check a single video's current status. Distinguishes a definitive problem
 * ("gone" = deleted/unavailable, "blocked" = embedding off or no longer public)
 * from a transient API hiccup ("unknown"), so callers never act on a false alarm.
 */
export async function videoHealth(videoId: string): Promise<VideoHealth> {
  if (!youtubeConfigured || !videoId) return { status: "unknown" };
  try {
    const url =
      "https://www.googleapis.com/youtube/v3/videos?part=status&id=" +
      encodeURIComponent(videoId) +
      "&key=" +
      encodeURIComponent(process.env.YOUTUBE_API_KEY!);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return { status: "unknown" };
    const data = (await res.json()) as {
      items?: Array<{ status?: { embeddable?: boolean; privacyStatus?: string } }>;
    };
    const item = data.items?.[0];
    if (!item) return { status: "gone" }; // request succeeded but video isn't there
    const embeddable = item.status?.embeddable ?? false;
    const privacyStatus = item.status?.privacyStatus ?? "";
    if (!embeddable || privacyStatus !== "public") {
      return { status: "blocked", embeddable, privacyStatus };
    }
    return { status: "ok", embeddable: true, privacyStatus };
  } catch {
    return { status: "unknown" };
  }
}

/** Normalize a handle / channel ID / channel URL into a lookup query. */
function channelQuery(input: string): { param: "id" | "forHandle"; value: string } | null {
  const s = (input || "").trim();
  if (!s) return null;
  try {
    const u = new URL(s);
    const byId = u.pathname.match(/\/channel\/(UC[\w-]{22})/);
    if (byId) return { param: "id", value: byId[1] };
    const byHandle = u.pathname.match(/\/@([\w.-]+)/);
    if (byHandle) return { param: "forHandle", value: byHandle[1] };
  } catch {
    // not a URL
  }
  if (/^UC[\w-]{22}$/.test(s)) return { param: "id", value: s };
  return { param: "forHandle", value: s.replace(/^@/, "") };
}

export type ChannelRef = { channelId: string; uploads: string; title: string };

/** Resolve a channel handle/ID/URL to its ID + uploads playlist (1 quota unit). */
export async function resolveChannel(input: string): Promise<ChannelRef | null> {
  const q = channelQuery(input);
  if (!youtubeConfigured || !q) return null;
  try {
    const url =
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&" +
      `${q.param}=${encodeURIComponent(q.value)}` +
      "&key=" +
      encodeURIComponent(process.env.YOUTUBE_API_KEY!);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      items?: Array<{
        id?: string;
        snippet?: { title?: string };
        contentDetails?: { relatedPlaylists?: { uploads?: string } };
      }>;
    };
    const item = data.items?.[0];
    const uploads = item?.contentDetails?.relatedPlaylists?.uploads;
    if (!item?.id || !uploads) return null;
    return { channelId: item.id, uploads, title: item.snippet?.title ?? "" };
  } catch {
    return null;
  }
}

/** Recent video IDs from a channel's uploads playlist, newest first (1 unit). */
export async function recentUploadIds(uploadsPlaylistId: string, max = 12): Promise<string[]> {
  if (!youtubeConfigured || !uploadsPlaylistId) return [];
  try {
    const url =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=" +
      Math.min(Math.max(max, 1), 50) +
      "&playlistId=" +
      encodeURIComponent(uploadsPlaylistId) +
      "&key=" +
      encodeURIComponent(process.env.YOUTUBE_API_KEY!);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      items?: Array<{ contentDetails?: { videoId?: string } }>;
    };
    return (data.items ?? [])
      .map((i) => i.contentDetails?.videoId ?? "")
      .filter(Boolean);
  } catch {
    return [];
  }
}
