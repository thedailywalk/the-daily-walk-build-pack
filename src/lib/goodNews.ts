import "server-only";
import {
  goodNews as FALLBACK,
  pinnedGoodNews as PINNED,
  type GoodNewsItem,
} from "@/lib/content";

/**
 * Builds the homepage "Good News" set: any manually pinned stories first, then
 * the most relevant + recent stories from the Good News Network's on-theme
 * feeds (Faith, Inspiring, Heroes), ranked toward the devotional's themes of
 * faith, hope, kindness and restoration. Refreshes once a day (ISR). Any failure
 * falls back to the curated list in content.ts so the section never breaks.
 */

const FEEDS = [
  "https://www.goodnewsnetwork.org/tag/faith/feed/",
  "https://www.goodnewsnetwork.org/category/inspiring/feed/",
  "https://www.goodnewsnetwork.org/category/heroes/feed/",
];
const DAY = 86400; // seconds
const UA =
  "Mozilla/5.0 (compatible; TheDailyWalkBot/1.0; +https://thedailywalknewsletter.com)";

// Themes that make a story on-topic for The Daily Walk.
const THEME_WORDS = [
  "faith", "church", "prayer", "pray", "god", "christian", "christ", "bible",
  "pastor", "ministry", "mission", "chaplain", "gospel", "blessed", "blessing",
  "miracle", "charit", "generos", "generous", "kindness", "kind", "donat",
  "gave", "giving", "volunteer", "rescue", "saved", "save", "restore",
  "restoration", "hope", "heal", "recover", "neighbor", "neighbour", "stranger",
  "help", "forgive", "hero", "reunite", "adopt", "orphan", "homeless", "shelter",
  "fundrais", "nonprofit", "food bank", "community", "compassion", "grace",
];

type Candidate = GoodNewsItem & { date: number; score: number };

export async function getDailyGoodNews(count = 3): Promise<GoodNewsItem[]> {
  try {
    const pinned = PINNED.slice(0, count);
    const need = count - pinned.length;

    let chosen: GoodNewsItem[] = [];
    if (need > 0) {
      const pages = await Promise.all(FEEDS.map(fetchFeed));
      const pool = dedupe(pages.flat());
      if (pool.length === 0 && pinned.length === 0) throw new Error("empty pool");

      // Most relevant first, then most recent.
      pool.sort((a, b) => b.score - a.score || b.date - a.date);
      const pinnedHrefs = new Set(pinned.map((p) => p.href));
      chosen = pool.filter((c) => !pinnedHrefs.has(c.href)).slice(0, need);
    }

    const items = [...pinned, ...chosen].slice(0, count);
    // Make sure every card has an image (pinned items may already have one).
    const withImages = await Promise.all(
      items.map(async (it) => ({
        ...it,
        image: it.image || (await ogImage(it.href)) || "",
      }))
    );

    if (withImages.length < count) throw new Error("too few stories");
    return withImages;
  } catch (err) {
    console.error("getDailyGoodNews:", (err as Error).message);
    return FALLBACK;
  }
}

async function fetchFeed(url: string): Promise<Candidate[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/rss+xml, text/xml" },
      next: { revalidate: DAY },
    });
    if (!res.ok) return [];
    return parseItems(await res.text());
  } catch {
    return [];
  }
}

function parseItems(xml: string): Candidate[] {
  const out: Candidate[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) {
    const block = m[1];
    const headline = decode(readTag(block, "title"));
    const href = decode(readTag(block, "link"));
    if (!headline || !href) continue;
    const categories = readCategories(block);
    const date = Date.parse(readTag(block, "pubDate")) || 0;
    out.push({
      category: pickCategory(categories),
      headline,
      href,
      image: "",
      source: "Good News Network",
      date,
      score: relevance(`${headline} ${categories.join(" ")}`),
    });
  }
  return out;
}

// Prefer a warm, thematic chip label over geographic/section tags.
const PREFERRED_CATEGORIES = [
  "Faith", "Inspiring", "Heroes", "Kindness", "Generosity", "Community",
  "Hope", "Restoration", "Compassion", "Animals", "Health", "Family",
  "Love", "Charity",
];

function pickCategory(categories: string[]): string {
  const pref = categories.find((c) =>
    PREFERRED_CATEGORIES.some((p) => p.toLowerCase() === c.toLowerCase())
  );
  return pref ?? categories[0] ?? "Good News";
}

function relevance(text: string): number {
  const t = text.toLowerCase();
  let score = 0;
  for (const w of THEME_WORDS) if (t.includes(w)) score++;
  return score;
}

function dedupe(items: Candidate[]): Candidate[] {
  const seen = new Set<string>();
  const out: Candidate[] = [];
  for (const it of items) {
    const key = it.href.replace(/\/+$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

function readTag(block: string, name: string): string {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`).exec(block);
  return m ? stripCdata(m[1]).trim() : "";
}

function readCategories(block: string): string[] {
  const re = /<category>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/category>/g;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(block))) out.push(decode(m[1]));
  return out;
}

async function ogImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      next: { revalidate: DAY },
    });
    if (!res.ok) return null;
    const html = await res.text();
    const m =
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(
        html
      ) ||
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i.exec(
        html
      );
    return m ? decode(m[1]) : null;
  } catch {
    return null;
  }
}

function stripCdata(s: string): string {
  const m = /^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/.exec(s);
  return m ? m[1] : s;
}

function decode(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeCp(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => safeCp(parseInt(n, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function safeCp(code: number): string {
  try {
    return String.fromCodePoint(code);
  } catch {
    return "";
  }
}
