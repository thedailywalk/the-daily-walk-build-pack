import "server-only";
import {
  goodNews as FALLBACK,
  pinnedGoodNews as PINNED,
  type GoodNewsItem,
} from "@/lib/content";
import { getFeaturedGoodNews } from "@/lib/featuredGoodNews";

/**
 * Homepage "Good News" set. Priority:
 *   1. The owner's hand-picked stories (from the studio), if any.
 *   2. Otherwise an automatic daily set from the Good News Network's on-theme
 *      feeds — ranked toward faith/hope/kindness, ALWAYS trying to include one
 *      explicitly Christian faith story, then filled by relevance + recency.
 * Cached for a day (tagged "good-news" so the 5am cron can refresh it). Any
 * failure falls back to the curated list in content.ts so it never breaks.
 */

export type Mood = "faith" | "animals" | "heroes" | "wholesome";

export type Candidate = GoodNewsItem & {
  date: number;
  score: number;
  faith: boolean;
  mood: Mood;
  excerpt: string;
};

export type MagazineItem = {
  category: string;
  headline: string;
  href: string;
  image: string;
  source: string;
  faith: boolean;
  mood: Mood;
  excerpt: string;
  date: number;
  dateLabel: string;
};

const DAY = 86400;
const UA =
  "Mozilla/5.0 (compatible; TheDailyWalkBot/1.0; +https://thedailywalknewsletter.com)";

// On-theme feeds for the automatic homepage set.
const FEEDS = [
  "https://www.goodnewsnetwork.org/tag/faith/feed/",
  "https://www.goodnewsnetwork.org/category/inspiring/feed/",
  "https://www.goodnewsnetwork.org/category/heroes/feed/",
];

// Wider variety (adds animals) for the owner's picking studio.
const CANDIDATE_FEEDS = [
  "https://www.goodnewsnetwork.org/tag/faith/feed/",
  "https://www.goodnewsnetwork.org/category/inspiring/feed/",
  "https://www.goodnewsnetwork.org/category/heroes/feed/",
  "https://www.goodnewsnetwork.org/category/animals/feed/",
];

const THEME_WORDS = [
  "faith", "church", "prayer", "pray", "god", "christian", "christ", "bible",
  "pastor", "ministry", "mission", "chaplain", "gospel", "blessed", "blessing",
  "miracle", "charit", "generos", "generous", "kindness", "kind", "donat",
  "gave", "giving", "volunteer", "rescue", "saved", "save", "restore",
  "restoration", "hope", "heal", "recover", "neighbor", "neighbour", "stranger",
  "help", "forgive", "hero", "reunite", "adopt", "orphan", "homeless", "shelter",
  "fundrais", "nonprofit", "food bank", "community", "compassion", "grace",
];

const FAITH_RE =
  /\b(faith|church|christian|christ|jesus|god|gospel|prayer|pray|bible|scripture|pastor|ministry|chaplain|missionar(?:y|ies)|parish|congregation|blessing|blessed|worship|catholic|baptist|methodist|priest|nun|monk|cathedral|chapel|easter|christmas)\b/i;

const PREFERRED_CATEGORIES = [
  "Faith", "Inspiring", "Heroes", "Kindness", "Generosity", "Community",
  "Hope", "Restoration", "Compassion", "Animals", "Health", "Family",
  "Love", "Charity",
];

export async function getDailyGoodNews(count = 3): Promise<GoodNewsItem[]> {
  const featured = await getFeaturedGoodNews();
  try {
    if (featured.length >= count) return featured.slice(0, count);

    const pinned = PINNED.slice(0, count - featured.length);
    const used = new Set(
      [...featured, ...pinned].map((i) => normHref(i.href))
    );
    const need = count - featured.length - pinned.length;

    const chosen: Candidate[] = [];
    if (need > 0) {
      const pages = await Promise.all(FEEDS.map(fetchFeed));
      const pool = dedupe(pages.flat()).filter(
        (c) => !used.has(normHref(c.href))
      );
      pool.sort((a, b) => b.score - a.score || b.date - a.date);

      // Guarantee at least one explicitly-Christian story when one exists.
      const faithPick = pool.find((c) => c.faith);
      if (faithPick) {
        chosen.push(faithPick);
        used.add(normHref(faithPick.href));
      }
      for (const c of pool) {
        if (chosen.length >= need) break;
        if (used.has(normHref(c.href))) continue;
        chosen.push(c);
        used.add(normHref(c.href));
      }
    }

    const items: GoodNewsItem[] = [...featured, ...pinned, ...chosen].slice(0, count);
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
    if (featured.length) {
      const extra = FALLBACK.filter(
        (f) => !featured.some((x) => normHref(x.href) === normHref(f.href))
      );
      return [...featured, ...extra].slice(0, count);
    }
    return FALLBACK;
  }
}

/** The owner's picking pool — ~20 varied, current stories (faith flagged). */
export async function getGoodNewsCandidates(limit = 20): Promise<
  (GoodNewsItem & { faith: boolean })[]
> {
  try {
    const pages = await Promise.all(CANDIDATE_FEEDS.map(fetchFeed));
    const picked = interleave(pages, limit);
    const withImages = await Promise.all(
      picked.map(async (it) => ({
        category: it.category,
        headline: it.headline,
        href: it.href,
        source: it.source,
        faith: it.faith,
        image: (await ogImage(it.href)) ?? "",
      }))
    );
    return withImages;
  } catch (err) {
    console.error("getGoodNewsCandidates:", (err as Error).message);
    return [];
  }
}

async function fetchFeed(url: string): Promise<Candidate[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/rss+xml, text/xml" },
      next: { revalidate: DAY, tags: ["good-news"] },
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) return [];
    const fromFaithFeed = url.includes("/tag/faith/");
    return parseItems(await res.text(), fromFaithFeed);
  } catch {
    return [];
  }
}

function parseItems(xml: string, fromFaithFeed: boolean): Candidate[] {
  const out: Candidate[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) {
    const block = m[1];
    const headline = decode(readTag(block, "title"));
    const href = decode(readTag(block, "link"));
    if (!headline || !href) continue;
    const categories = readCategories(block);
    const haystack = `${headline} ${categories.join(" ")}`;
    const faith = fromFaithFeed || FAITH_RE.test(haystack);
    const category = pickCategory(categories);
    out.push({
      category,
      headline,
      href,
      image: "",
      source: "Good News Network",
      date: Date.parse(readTag(block, "pubDate")) || 0,
      score: relevance(haystack),
      faith,
      mood: moodOf(faith, category, haystack),
      excerpt: clip(decode(readTag(block, "description")), 165),
    });
  }
  return out;
}

const ANIMAL_RE =
  /\b(animal|animals|dog|dogs|puppy|puppies|cat|cats|kitten|wildlife|elephant|whale|dolphin|bird|birds|horse|panda|lion|tiger|bear|zoo|pet|pets|orangutan|turtle|penguin|fox|owl|deer|otter)\b/i;
const HERO_RE =
  /\b(rescue|rescued|rescues|saves|saved|firefighter|lifeguard|heroic|hero|police|paramedic|pulled from|risked)\b/i;

function moodOf(faith: boolean, category: string, text: string): Mood {
  if (faith) return "faith";
  if (/animal/i.test(category) || ANIMAL_RE.test(text)) return "animals";
  if (/hero/i.test(category) || HERO_RE.test(text)) return "heroes";
  return "wholesome";
}

function clip(s: string, n: number): string {
  const t = s.trim();
  if (t.length <= n) return t;
  return t.slice(0, n).replace(/\s+\S*$/, "") + "…";
}

/** A daily "magazine" of ~30 varied good-news stories for paying members. */
export async function getGoodNewsMagazine(limit = 30): Promise<MagazineItem[]> {
  try {
    const pages = await Promise.all(CANDIDATE_FEEDS.map(fetchFeed));
    const picked = interleave(pages, limit);
    return await Promise.all(
      picked.map(async (it) => ({
        category: it.category,
        headline: it.headline,
        href: it.href,
        source: it.source,
        faith: it.faith,
        mood: it.mood,
        excerpt: it.excerpt,
        date: it.date,
        dateLabel: it.date
          ? new Date(it.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "",
        image: (await ogImage(it.href)) ?? "",
      }))
    );
  } catch (err) {
    console.error("getGoodNewsMagazine:", (err as Error).message);
    return [];
  }
}

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

/** Round-robin across feeds so the pool stays varied, newest first per feed. */
function interleave(lists: Candidate[][], limit: number): Candidate[] {
  const sorted = lists.map((l) => l.slice().sort((a, b) => b.date - a.date));
  const out: Candidate[] = [];
  const seen = new Set<string>();
  let added = true;
  for (let i = 0; added && out.length < limit; i++) {
    added = false;
    for (const l of sorted) {
      if (i >= l.length) continue;
      added = true;
      const it = l[i];
      const key = normHref(it.href);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(it);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

function dedupe(items: Candidate[]): Candidate[] {
  const seen = new Set<string>();
  const out: Candidate[] = [];
  for (const it of items) {
    const key = normHref(it.href);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

function normHref(href: string): string {
  return href.replace(/\/+$/, "");
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
      next: { revalidate: DAY, tags: ["good-news"] },
      signal: AbortSignal.timeout(9000),
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
