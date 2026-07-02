import "server-only";

/**
 * Find a reshare-cleared photo on Wikimedia Commons for a news story. Commons
 * images are free to reuse WITH attribution, so we only accept permissive
 * licenses (public domain / CC0 / CC BY / CC BY-SA) and always return a credit
 * line. Returns null if nothing suitable is found — callers then leave the photo
 * blank rather than risk an unlicensed image.
 */

const API = "https://commons.wikimedia.org/w/api.php";
const UA =
  "TheDailyWalkBot/1.0 (https://thedailywalknewsletter.com; devotional newsletter)";

export type CommonsImage = { url: string; credit: string; pageUrl: string };

function stripHtml(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/** Only truly reusable licenses (with credit). Everything else is rejected. */
function licenseOk(short: string): boolean {
  const s = short.toLowerCase();
  if (/non-?free|fair use|all rights|copyright/.test(s)) return false;
  return /public domain|cc0|cc[ -]?by|attribution/.test(s);
}

/** Turn a headline/summary into a compact Commons search query. */
export function toQuery(text: string): string {
  const stop = new Set([
    "the", "a", "an", "of", "in", "on", "at", "to", "and", "or", "for", "with",
    "as", "after", "amid", "over", "into", "from", "by", "is", "are", "was",
    "were", "has", "have", "had", "says", "say", "said", "new", "amid", "many",
    "its", "their", "this", "that", "who", "what", "will", "up", "out",
  ]);
  const words = (text ?? "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stop.has(w.toLowerCase()));
  // Prefer proper nouns (Capitalized) — places, people, events.
  const proper = words.filter((w) => /^[A-Z]/.test(w));
  const pick = (proper.length >= 2 ? proper : words).slice(0, 5);
  return pick.join(" ");
}

export async function findCommonsImage(rawQuery: string): Promise<CommonsImage | null> {
  const q = toQuery(rawQuery);
  if (!q) return null;
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    generator: "search",
    gsrsearch: `${q} filetype:bitmap`,
    gsrnamespace: "6", // File:
    gsrlimit: "10",
    prop: "imageinfo",
    iiprop: "url|extmetadata|mime",
    iiurlwidth: "1000",
  });
  try {
    const res = await fetch(`${API}?${params.toString()}`, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      query?: { pages?: Array<{ title?: string; imageinfo?: Array<Record<string, unknown>> }> };
    };
    const pages = data.query?.pages ?? [];
    for (const p of pages) {
      const info = p.imageinfo?.[0];
      if (!info) continue;
      const mime = String(info.mime ?? "");
      if (!/^image\/(jpe?g|png|webp)$/.test(mime)) continue;
      const meta = (info.extmetadata ?? {}) as Record<string, { value?: string }>;
      const licenseShort = stripHtml(meta.LicenseShortName?.value ?? "");
      if (!licenseOk(licenseShort)) continue;
      const url = String(info.thumburl ?? info.url ?? "");
      if (!url) continue;
      const artist = stripHtml(meta.Artist?.value ?? "") || stripHtml(meta.Credit?.value ?? "");
      const credit = [artist, "Wikimedia Commons", licenseShort ? `(${licenseShort})` : ""]
        .filter(Boolean)
        .join(" · ");
      const pageUrl = p.title
        ? `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`
        : "";
      return { url, credit, pageUrl };
    }
    return null;
  } catch {
    return null;
  }
}
