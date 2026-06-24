/**
 * Trusted YouTube channels for the Weekly Video auto-fill.
 *
 * The "Auto-fill 10 verified picks" button pulls RECENT uploads ONLY from these
 * channels, then verifies each one live through the YouTube API (must be public
 * + embeddable) before it ever reaches your review list. Because the sources are
 * pre-vetted official ministries, you avoid random reuploads, clips, and
 * off-brand content — every pick is a real upload from a channel you trust.
 *
 * Each entry is a handle (e.g. "@bibleproject"), a full channel URL, or a raw
 * channel ID (UC…). Handles are resolved live, so a typo just gets skipped — it
 * can never surface the wrong channel's video.
 *
 * To add a channel: open its YouTube page, copy the @handle from the URL, and
 * add a line below. Keep it to official channels whose teaching fits the brand
 * (faith-filled, practical, welcoming, not divisive). You can also ask the
 * system to add specific channels for you.
 */

export type TrustedChannel = { handle: string; note?: string };

export const TRUSTED_CHANNELS: TrustedChannel[] = [
  { handle: "@bibleproject", note: "BibleProject — Creative Commons, animated Bible overviews" },
  { handle: "@SpokenGospel", note: "Spoken Gospel — every book of the Bible pointing to Jesus" },
  // Added by channel ID (verified official, most reliable identifier):
  { handle: "UC2J3xT5HNkPl-Sdx16YlFAw", note: "Johnny Chang — ex-gangster turned pastor; direct, testimony-driven (6/6 recent verified)" },
  { handle: "UCHugd0xGZLYQy3Lc-Jox_6w", note: "David Guzik (Enduring Word) — verse-by-verse Bible teaching (6/6 recent verified)" },
  { handle: "UCjp6iEjx01RUfsFjLdooC2Q", note: "Celebration Church — home of Tim Timberlake's sermons (the @ttimberlake handle is an unrelated account)" },
  // Add more trusted, official channels here, e.g.:
  // { handle: "@yourfavoriteministry", note: "why it fits the brand" },
];
