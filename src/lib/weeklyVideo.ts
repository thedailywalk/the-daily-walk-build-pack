import "server-only";
import { createServiceClient, adminDbConfigured } from "@/lib/supabase/admin";
import { fetchVideoMeta, parseYouTubeId, type VideoMeta } from "@/lib/youtube";
import { TOPICS } from "@/lib/library";
import {
  detectTopics,
  detectScriptures,
  suggestVersesForTopics,
  composeWhy,
} from "@/lib/scripture";

/**
 * Weekly Featured Video — premium "Daily Wonders" tab.
 * Candidates are inspected via the YouTube Data API, enriched heuristically
 * (themes + scriptures + a brand-voice write-up), reviewed in the admin studio,
 * and one is selected per week. It goes live on its Monday and rolls over
 * automatically. Past selections form the archive.
 */

export type SafetyStatus = "safe" | "review" | "unsafe";

export type WeeklyVideo = {
  id: string;
  weekStart: string; // YYYY-MM-DD (a Monday)
  provider: string;
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  thumbnailUrl: string;
  description: string;
  publishedAt: string | null;
  duration: string;
  embeddable: boolean;
  license: string;
  privacyStatus: string;
  topics: string[];
  scriptures: string[];
  summary: string;
  intro: string;
  theme: string;
  brandFit: string;
  safetyStatus: SafetyStatus;
  safetyNotes: string;
  isSelected: boolean;
  createdAt: string;
};

/* ---------------- week math (Pacific time) ---------------- */

/** The Monday (YYYY-MM-DD) of the week containing `base`, in Pacific time. */
export function mondayOfPT(base?: Date): string {
  const now = base ?? new Date();
  const pt = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const dow = pt.getDay(); // 0 Sun … 6 Sat
  const diff = (dow + 6) % 7; // days since Monday
  pt.setDate(pt.getDate() - diff);
  const y = pt.getFullYear();
  const m = String(pt.getMonth() + 1).padStart(2, "0");
  const d = String(pt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** This week's Monday. */
export function currentWeekStart(): string {
  return mondayOfPT();
}

/** Next week's Monday (default target for scheduling a new pick). */
export function nextWeekStart(): string {
  const pt = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  pt.setDate(pt.getDate() + 7);
  return mondayOfPT(pt);
}

/** Friendly label like "Mon, Jun 30" for a YYYY-MM-DD week start. */
export function weekLabel(weekStart: string): string {
  const [y, m, d] = weekStart.split("-").map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return dt.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* ---------------- safety + heuristic enrichment ---------------- */

/** Read the real YouTube flags and translate them into a clear verdict. */
export function assessSafety(meta: VideoMeta): { status: SafetyStatus; notes: string } {
  const notes: string[] = [];
  if (!meta.embeddable) {
    return {
      status: "unsafe",
      notes:
        "Embedding is turned OFF by the uploader — the player will refuse to load, so this can't be featured.",
    };
  }
  if (meta.privacyStatus && meta.privacyStatus !== "public") {
    return {
      status: "unsafe",
      notes: `Video is ${meta.privacyStatus}, not public — not safe to feature.`,
    };
  }
  notes.push("Embedding is allowed by the uploader.");
  let status: SafetyStatus;
  if (meta.license === "creativeCommon") {
    notes.push("Creative Commons license — clearly cleared for sharing.");
    status = "safe";
  } else {
    notes.push(
      "Standard YouTube license — embedding is permitted, but confirm this is the creator's OFFICIAL channel (not a reupload) before featuring."
    );
    status = "review";
  }
  notes.push(`Posted by “${meta.channelTitle || "unknown channel"}.”`);
  if (meta.durationSeconds && meta.durationSeconds < 45) {
    notes.push("Very short (under 45s) — check it's substantial enough to feature.");
  }
  return { status, notes: notes.join(" ") };
}

/** Trim a description down to a short, clean summary. */
function summarize(meta: VideoMeta): string {
  const desc = (meta.description || "").replace(/\s+/g, " ").trim();
  if (!desc) return meta.title;
  // First sentence(s), capped.
  const cut = desc.slice(0, 280);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return (lastStop > 80 ? cut.slice(0, lastStop + 1) : cut).trim();
}

/** A short, original, brand-voice intro for the public page. */
function draftIntro(topics: string[]): string {
  const t = topics[0];
  if (!t) {
    return "Take a few quiet minutes this week to watch, breathe, and let God meet you in it. Press play when you're ready.";
  }
  return `This week, set aside a few minutes for a deeper look at ${t.toLowerCase()}. Watch it slowly, let it settle, and ask God what He wants you to take from it.`;
}

type Enrichment = {
  topics: string[];
  scriptures: string[];
  summary: string;
  theme: string;
  brandFit: string;
  intro: string;
};

/** Heuristic write-ups built ONLY from the real video metadata. */
export function enrich(meta: VideoMeta): Enrichment {
  const text = `${meta.title}\n${meta.description}`;
  const topics = detectTopics(text, [...TOPICS]);
  const mentioned = detectScriptures(text);
  const related = suggestVersesForTopics(topics, 6).map((v) => v.ref);
  const scriptures = Array.from(new Set([...mentioned, ...related])).slice(0, 8);
  return {
    topics,
    scriptures,
    summary: summarize(meta),
    theme: topics[0] ?? "",
    brandFit: composeWhy(topics),
    intro: draftIntro(topics),
  };
}

/* ---------------- row mapping ---------------- */

type Row = Record<string, unknown>;

function toModel(r: Row): WeeklyVideo {
  return {
    id: String(r.id),
    weekStart: String(r.week_start),
    provider: String(r.provider ?? "youtube"),
    videoId: String(r.video_id ?? ""),
    title: String(r.title ?? ""),
    channelTitle: String(r.channel_title ?? ""),
    channelId: String(r.channel_id ?? ""),
    thumbnailUrl: String(r.thumbnail_url ?? ""),
    description: String(r.description ?? ""),
    publishedAt: (r.published_at as string) ?? null,
    duration: String(r.duration ?? ""),
    embeddable: Boolean(r.embeddable),
    license: String(r.license ?? ""),
    privacyStatus: String(r.privacy_status ?? ""),
    topics: (r.topics as string[]) ?? [],
    scriptures: (r.scriptures as string[]) ?? [],
    summary: String(r.summary ?? ""),
    intro: String(r.intro ?? ""),
    theme: String(r.theme ?? ""),
    brandFit: String(r.brand_fit ?? ""),
    safetyStatus: (String(r.safety_status ?? "review") as SafetyStatus),
    safetyNotes: String(r.safety_notes ?? ""),
    isSelected: Boolean(r.is_selected),
    createdAt: String(r.created_at ?? ""),
  };
}

/* ---------------- inspection + writes (admin only) ---------------- */

export type InspectResult = { added: number; skipped: string[] };

/**
 * Inspect a batch of YouTube URLs/IDs and store them as candidates for a week.
 * Each is fetched live from the YouTube Data API, safety-assessed, and enriched.
 */
export async function inspectAndStoreCandidates(
  rawUrls: string[],
  weekStart: string
): Promise<InspectResult> {
  const skipped: string[] = [];
  if (!adminDbConfigured) return { added: 0, skipped: ["Database not configured."] };
  const supabase = createServiceClient();
  let added = 0;

  for (const raw of rawUrls) {
    const url = raw.trim();
    if (!url) continue;
    const id = parseYouTubeId(url);
    if (!id) {
      skipped.push(`${url} — not a recognizable YouTube link`);
      continue;
    }
    const meta = await fetchVideoMeta(id);
    if (!meta) {
      skipped.push(`${url} — couldn't fetch (check the link, or that YOUTUBE_API_KEY is set)`);
      continue;
    }
    const safety = assessSafety(meta);
    const e = enrich(meta);
    const { error } = await supabase.from("weekly_videos").upsert(
      {
        week_start: weekStart,
        provider: "youtube",
        video_id: meta.videoId,
        title: meta.title,
        channel_title: meta.channelTitle,
        channel_id: meta.channelId,
        thumbnail_url: meta.thumbnail,
        description: meta.description,
        published_at: meta.publishedAt || null,
        duration: meta.duration,
        embeddable: meta.embeddable,
        license: meta.license,
        privacy_status: meta.privacyStatus,
        topics: e.topics,
        scriptures: e.scriptures,
        summary: e.summary,
        intro: e.intro,
        theme: e.theme,
        brand_fit: e.brandFit,
        safety_status: safety.status,
        safety_notes: safety.notes,
      },
      { onConflict: "week_start,provider,video_id" }
    );
    if (error) skipped.push(`${meta.title || id} — ${error.message}`);
    else added += 1;
  }
  return { added, skipped };
}

export async function listCandidates(weekStart: string): Promise<WeeklyVideo[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("weekly_videos")
      .select("*")
      .eq("week_start", weekStart)
      .order("is_selected", { ascending: false })
      .order("created_at", { ascending: true });
    return (data ?? []).map(toModel);
  } catch {
    return [];
  }
}

/** Make one candidate THE featured video for its week (clears any other). */
export async function selectVideo(id: string): Promise<void> {
  if (!adminDbConfigured) return;
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("weekly_videos")
    .select("week_start")
    .eq("id", id)
    .maybeSingle();
  const weekStart = data?.week_start as string | undefined;
  if (!weekStart) return;
  await supabase
    .from("weekly_videos")
    .update({ is_selected: false })
    .eq("week_start", weekStart)
    .neq("id", id);
  await supabase.from("weekly_videos").update({ is_selected: true }).eq("id", id);
}

export async function clearSelection(weekStart: string): Promise<void> {
  if (!adminDbConfigured) return;
  const supabase = createServiceClient();
  await supabase
    .from("weekly_videos")
    .update({ is_selected: false })
    .eq("week_start", weekStart);
}

/** Edit the public-facing copy of a video (intro, theme, scriptures). */
export async function updateSelectionCopy(
  id: string,
  patch: { intro?: string; theme?: string; scriptures?: string[] }
): Promise<void> {
  if (!adminDbConfigured) return;
  const supabase = createServiceClient();
  const row: Row = {};
  if (patch.intro !== undefined) row.intro = patch.intro;
  if (patch.theme !== undefined) row.theme = patch.theme;
  if (patch.scriptures !== undefined) row.scriptures = patch.scriptures;
  await supabase.from("weekly_videos").update(row).eq("id", id);
}

export async function deleteCandidate(id: string): Promise<void> {
  if (!adminDbConfigured) return;
  const supabase = createServiceClient();
  await supabase.from("weekly_videos").delete().eq("id", id);
}

/* ---------------- reads for scheduling + archive ---------------- */

/** Selected videos scheduled for a future Monday (not live yet). */
export async function listUpcoming(): Promise<WeeklyVideo[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("weekly_videos")
      .select("*")
      .eq("is_selected", true)
      .gt("week_start", currentWeekStart())
      .order("week_start", { ascending: true });
    return (data ?? []).map(toModel);
  } catch {
    return [];
  }
}

/** Past featured videos (the archive). */
export async function listArchive(): Promise<WeeklyVideo[]> {
  if (!adminDbConfigured) return [];
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("weekly_videos")
      .select("*")
      .eq("is_selected", true)
      .lt("week_start", currentWeekStart())
      .order("week_start", { ascending: false });
    return (data ?? []).map(toModel);
  } catch {
    return [];
  }
}

/**
 * The video that should be LIVE right now — the most recent selected video
 * whose Monday has arrived. Read server-side (service role) for the public tab.
 */
export async function getLiveWeeklyVideo(): Promise<WeeklyVideo | null> {
  if (!adminDbConfigured) return null;
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("weekly_videos")
      .select("*")
      .eq("is_selected", true)
      .lte("week_start", currentWeekStart())
      .order("week_start", { ascending: false })
      .limit(1)
      .maybeSingle();
    return data ? toModel(data) : null;
  } catch {
    return null;
  }
}
