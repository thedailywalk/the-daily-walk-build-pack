import "server-only";
import { goodNews as FALLBACK, type GoodNewsItem } from "@/lib/content";

/**
 * Pulls the latest "Good News" stories from the Good News Network RSS feed and
 * refreshes once a day (ISR). The feed has no images, so we read each article's
 * og:image. Any failure falls back to the curated list in content.ts.
 */

const FEED_URL = "https://www.goodnewsnetwork.org/feed/";
const DAY = 86400; // seconds
const UA =
  "Mozilla/5.0 (compatible; TheDailyWalkBot/1.0; +https://thedailywalknewsletter.com)";

export async function getDailyGoodNews(count = 3): Promise<GoodNewsItem[]> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": UA, Accept: "application/rss+xml, text/xml" },
      next: { revalidate: DAY },
    });
    if (!res.ok) throw new Error(`feed responded ${res.status}`);

    const xml = await res.text();
    const items = parseItems(xml).slice(0, count);
    if (items.length < count) throw new Error("feed returned too few items");

    const withImages = await Promise.all(
      items.map(async (it) => ({ ...it, image: (await ogImage(it.href)) ?? "" }))
    );
    return withImages;
  } catch (err) {
    console.error("getDailyGoodNews:", (err as Error).message);
    return FALLBACK;
  }
}

function parseItems(xml: string): GoodNewsItem[] {
  const out: GoodNewsItem[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) {
    const block = m[1];
    const headline = decode(readTag(block, "title"));
    const href = decode(readTag(block, "link"));
    if (!headline || !href) continue;
    out.push({
      category: firstCategory(block),
      headline,
      href,
      image: "",
      source: "Good News Network",
    });
  }
  return out;
}

function readTag(block: string, name: string): string {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`).exec(block);
  if (!m) return "";
  return stripCdata(m[1]).trim();
}

function firstCategory(block: string): string {
  const m = /<category>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/category>/.exec(block);
  return m ? decode(m[1]) : "Good News";
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
