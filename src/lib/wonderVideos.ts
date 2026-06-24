/**
 * Daily Wonders — curated video shelf (premium tab only).
 *
 * LEGAL RULES (read before adding anything):
 * ------------------------------------------------------------------
 * We only ever *embed* videos through the platform's own official player
 * (YouTube / Vimeo). We never download, re-host, or copy a video file. Embedding
 * via the official player is how YouTube & Vimeo are designed to be shared and is
 * allowed by their Terms — the view is still counted on the original platform and
 * the creator keeps their credit, ads, and analytics.
 *
 * Only add a video if ONE of these is true:
 *   1. It's YOUR OWN video (you uploaded it), OR
 *   2. The uploader has left embedding ENABLED *and* you have a fair reason to
 *      feature it (e.g. a public sermon/ministry that wants to be shared), OR
 *   3. It's released under a license that permits sharing (e.g. BibleProject
 *      videos are Creative Commons and explicitly free to use in ministry).
 *
 * Do NOT add: movies/TV clips, music videos with licensed songs, anything marked
 * "embedding disabled", or anything you're unsure about. If embedding is off, the
 * player will simply refuse to load — that's the platform enforcing the creator's
 * choice, and we respect it.
 *
 * For YouTube we use the privacy-enhanced domain (youtube-nocookie.com) so no
 * tracking cookies are set until the viewer actually presses play.
 * ------------------------------------------------------------------
 *
 * To add a video: copy its watch URL, grab the ID, and add an entry below.
 *   YouTube  https://www.youtube.com/watch?v=ABC123  → provider "youtube", id "ABC123"
 *   Vimeo    https://vimeo.com/123456789             → provider "vimeo",   id "123456789"
 */

export type WonderVideo = {
  provider: "youtube" | "vimeo";
  id: string;
  title: string;
  /** Who made it — always shown, as credit. */
  creator: string;
  /** One line: why it's here / what it's about. */
  note: string;
  /** Loose topic tag for grouping (matches Content Library topics where it helps). */
  topic?: string;
};

/**
 * Curated shelf. Starts empty on purpose — add videos you own or that are
 * cleared for sharing (see rules above), or ask the system to add links you send.
 */
export const WONDER_VIDEOS: WonderVideo[] = [];

/** Build the safe, official embed URL for a video. */
export function embedUrl(v: WonderVideo): string {
  if (v.provider === "vimeo") {
    return `https://player.vimeo.com/video/${encodeURIComponent(v.id)}`;
  }
  // Privacy-enhanced YouTube — no cookies until the viewer presses play.
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}?rel=0`;
}

/** The public watch page, for an "open on YouTube/Vimeo" credit link. */
export function watchUrl(v: WonderVideo): string {
  return v.provider === "vimeo"
    ? `https://vimeo.com/${encodeURIComponent(v.id)}`
    : `https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}`;
}
