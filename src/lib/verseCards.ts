/**
 * Hand-made "annotated verse" share cards.
 *
 * These are the Instagram-style cards (navy verse, gold highlight, handwritten
 * margin notes, arrows, "So what — today?") rendered to PNGs and committed under
 * `public/verse-cards/<variant>/<date>.png`. They can't be produced by the
 * dynamic /api/verse-card image engine (handwriting font + arrow layout), so we
 * ship them as static images and list the dates that have one here.
 *
 * The newsletter renderers prefer the static card when a date is listed, and
 * fall back to the dynamic /api/verse-card for any date that isn't — so future
 * issues never show a broken image.
 *
 * To add more days: render the cards, drop the PNGs in the folders above, and
 * add the dates below.
 */
export type CardVariant = "free" | "premium";

const CARD_DATES: Record<CardVariant, ReadonlySet<string>> = {
  free: new Set([
    "2026-07-09",
    "2026-07-10",
    "2026-07-11",
    "2026-07-12",
    "2026-07-13",
    "2026-07-14",
    "2026-07-15",
  ]),
  premium: new Set([
    "2026-07-09",
    "2026-07-10",
    "2026-07-11",
    "2026-07-12",
    "2026-07-13",
    "2026-07-14",
    "2026-07-15",
  ]),
};

/**
 * Returns the URL of the hand-made annotated card for this variant + date, or
 * `null` when there isn't one (caller should fall back to /api/verse-card).
 */
export function verseCardImage(
  variant: CardVariant,
  date: string | undefined,
  baseUrl: string
): string | null {
  if (!date || !CARD_DATES[variant].has(date)) return null;
  return `${baseUrl}/verse-cards/${variant}/${date}.png`;
}
