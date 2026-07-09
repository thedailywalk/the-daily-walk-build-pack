import "server-only";
import {
  goodNews as FALLBACK,
  pinnedGoodNews as PINNED,
  type GoodNewsItem,
} from "@/lib/content";
import { getFeaturedGoodNews } from "@/lib/featuredGoodNews";
import { findCommonsImage } from "@/lib/commonsImage";

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

/**
 * Broad, hopeful search terms that reliably have permissively-licensed photos on
 * Wikimedia Commons — used only as a last resort so every Good News story still
 * shows a real, credited, free-to-reuse picture instead of a blank tile.
 */
const GOOD_NEWS_IMAGE_FALLBACKS = [
  "sunrise sky",
  "volunteers community",
  "helping hands",
  "mountain dawn landscape",
  "open field sunlight",
  "people gardening together",
];

export async function getDailyGoodNews(count = 3): Promise<GoodNewsItem[]> {
  const featured = await getFeaturedGoodNews();
  try {
    // Code-pinned stories always lead, then the owner's studio picks.
    const curated = [...PINNED, ...featured].slice(0, count);
    const used = new Set(curated.map((i) => normHref(i.href)));
    const need = count - curated.length;

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

    // Photos: a provided photo is KEPT as-is. Curated stories (pinned/studio)
    // without one use the article's own cover photo; auto-pulled feed stories
    // get a FREE, license-cleared Wikimedia Commons photo (credited).
    const base = [...curated, ...chosen].slice(0, count);
    const curatedCount = Math.min(curated.length, base.length);
    const items: GoodNewsItem[] = await Promise.all(
      base.map(async (it, idx) => {
        if (it.image?.trim()) return it; // real photo already chosen — keep it
        if (idx < curatedCount) {
          const og = await fetchOgImage(it.href);
          if (og) return { ...it, image: og, imageCredit: "" };
        }
        // Try the headline first; if Commons has no match, fall back to the
        // category and then to broad, hopeful terms — so every story still
        // gets a FREE, license-cleared (credited) photo rather than a blank tile.
        let found = await findCommonsImage(it.headline).catch(() => null);
        if (!found && it.category) {
          found = await findCommonsImage(it.category).catch(() => null);
        }
        if (!found) {
          for (const term of GOOD_NEWS_IMAGE_FALLBACKS) {
            found = await findCommonsImage(term).catch(() => null);
            if (found) break;
          }
        }
        return { ...it, image: found?.url ?? "", imageCredit: found?.credit ?? "" };
      })
    );
    if (items.length < count) throw new Error("too few stories");
    // Add a short "in our own words" summary per story (newsletter only) —
    // paraphrased from the real headline/excerpt, never the publisher's wording.
    const summaries = await draftGoodNewsSummaries(
      base.map((it) => ({
        headline: it.headline,
        excerpt: (it as Candidate).excerpt ?? "",
      }))
    );
    return items.map((it, i) =>
      it.summary?.trim() ? it : summaries[i] ? { ...it, summary: summaries[i] } : it
    );
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

/**
 * Rewrite each real story into a short, warm 1–2 sentence summary in OUR OWN
 * words — so it reads like a described news piece, not just a headline. Uses
 * Claude when ANTHROPIC_API_KEY is set; returns "" per item otherwise (the
 * newsletter then just shows the headline). Never copies the source wording.
 */
async function draftGoodNewsSummaries(
  stories: { headline: string; excerpt: string }[]
): Promise<string[]> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !stories.length) return stories.map(() => "");
  const user = `Here are ${stories.length} real good-news stories (headline + excerpt). For EACH, write ONE warm, factual 1–2 sentence summary IN YOUR OWN WORDS — never copy the excerpt's wording. Plain, hopeful, no hype, no invented details.

${stories.map((s, i) => `[${i + 1}] ${s.headline}\n${s.excerpt}`).join("\n\n")}

Respond with JSON only: { "summaries": ["…", "…"] } in the same order.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model:
          process.env.NEWSLETTER_MODEL ?? process.env.GUIDE_MODEL ?? "claude-haiku-4-5-20251001",
        max_tokens: 900,
        messages: [{ role: "user", content: user }],
      }),
      cache: "no-store",
    });
    if (!res.ok) return stories.map(() => "");
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const raw = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("").trim();
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as { summaries?: string[] };
    const out = parsed.summaries ?? [];
    return stories.map((_, i) => (out[i] ?? "").trim());
  } catch {
    return stories.map(() => "");
  }
}

/** The owner's picking pool — ~20 varied, current stories (faith flagged). */
export async function getGoodNewsCandidates(limit = 20): Promise<
  (GoodNewsItem & { faith: boolean })[]
> {
  try {
    const pages = await Promise.all(CANDIDATE_FEEDS.map(fetchFeed));
    const picked = interleave(pages, limit);
    // Admin-only: pull each story's cover photo so they're easy to pick visually.
    // These are never shown publicly (the homepage uses branded tiles).
    const images = await Promise.all(picked.map((it) => fetchOgImage(it.href)));
    return picked.map((it, i) => ({
      category: it.category,
      headline: it.headline,
      href: it.href,
      source: it.source,
      faith: it.faith,
      image: images[i],
    }));
  } catch (err) {
    console.error("getGoodNewsCandidates:", (err as Error).message);
    return [];
  }
}

/**
 * Admin-only helper: the article's Open Graph cover image, for visual selection
 * in the picking studio. Cached for a day; failures fall back to "" (a branded
 * tile). Never used on public pages.
 */
async function fetchOgImage(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      next: { revalidate: DAY, tags: ["good-news"] },
      signal: AbortSignal.timeout(7000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const m =
      html.match(/<meta[^>]+(?:property|name)=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']og:image["']/i);
    return m ? m[1] : "";
  } catch {
    return "";
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
