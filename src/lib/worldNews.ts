import "server-only";

/**
 * "The World Through God's Lens" — drafts the premium World section from REAL,
 * current headlines instead of a made-up scenario. We pull a reputable world-news
 * RSS at runtime, then (with the ANTHROPIC key) rewrite each story in our own
 * words as What happened / How we see it through faith / How we can pray — always
 * keeping a link to the original article so it reads like real, verifiable news.
 *
 * Images: breaking-news photos are almost always copyrighted, so we DON'T scrape
 * them. Each story links to its source; a reshare-cleared photo (Wikimedia
 * Commons, USGS, NASA, etc.) can be added per story with a credit line.
 */

const UA =
  "Mozilla/5.0 (compatible; TheDailyWalkBot/1.0; +https://thedailywalknewsletter.com)";

// Reputable, well-formed world feed. (Paraphrased + linked, never copied.)
const WORLD_FEED = "https://feeds.bbci.co.uk/news/world/rss.xml";
const SOURCE_NAME = "BBC News";

export type WorldStory = {
  what: string;
  faith: string;
  pray: string;
  url: string;
  source: string;
};

type RawItem = { title: string; summary: string; link: string };

function decode(s: string): string {
  return (s ?? "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function parseItems(xml: string, limit: number): RawItem[] {
  const items: RawItem[] = [];
  const blocks = xml.split(/<item[\s>]/i).slice(1);
  for (const b of blocks) {
    const title = decode((b.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? ""));
    const summary = decode((b.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ?? ""));
    const link = decode((b.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? ""));
    if (title && link) items.push({ title, summary, link });
    if (items.length >= limit) break;
  }
  return items;
}

/** Skip lightweight/soft items so the section leads with substantive world news. */
function isSubstantive(it: RawItem): boolean {
  const t = `${it.title} ${it.summary}`.toLowerCase();
  return !/\b(watch|video|in pictures|quiz|recipe|review|trailer|how to)\b/.test(t);
}

async function fetchHeadlines(limit: number): Promise<RawItem[]> {
  const res = await fetch(WORLD_FEED, {
    headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml, text/xml" },
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error(`world feed ${res.status}`);
  const xml = await res.text();
  return parseItems(xml, 20).filter(isSubstantive).slice(0, limit);
}

const AI_SYSTEM = `You are the editorial assistant for "The Daily Walk," a Christian devotional newsletter. You write the "World Through God's Lens" section: real world headlines held up to God's light — aware, but not afraid. For each real news item you're given, write THREE things in your OWN words (never copy the source wording):
- "what": a calm, factual 1–2 sentence summary of what actually happened.
- "faith": 2–3 warm sentences seeing it through faith, with ONE fitting Scripture reference; steady, hopeful, never fear-mongering, never politically partisan, never doctrinally off.
- "pray": a short 1–2 sentence prayer.
Stay accurate to the item — do not invent details. Return ONLY valid JSON.`;

async function withFaithLens(items: RawItem[]): Promise<WorldStory[] | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const user = `Here are ${items.length} real news items (title + summary). For EACH, return {"what","faith","pray"} in our own words.

${items.map((it, i) => `[${i + 1}] ${it.title}\n${it.summary}`).join("\n\n")}

Respond with JSON: { "stories": [ { "what": "...", "faith": "...", "pray": "..." }, ... ] } in the same order.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.WORLD_MODEL ?? process.env.NEWSLETTER_MODEL ?? process.env.GUIDE_MODEL ?? "claude-haiku-4-5-20251001",
        max_tokens: 2000,
        system: AI_SYSTEM,
        messages: [{ role: "user", content: user }],
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const raw = (data.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("").trim();
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as { stories?: Array<{ what?: string; faith?: string; pray?: string }> };
    const out = parsed.stories ?? [];
    return items.map((it, i) => ({
      what: out[i]?.what?.trim() || it.title,
      faith: out[i]?.faith?.trim() || "We hold this before God, who is still sovereign and still near (Psalm 46:1).",
      pray: out[i]?.pray?.trim() || "Lord, be near to everyone this touches, and keep our hope anchored in You.",
      url: it.link,
      source: SOURCE_NAME,
    }));
  } catch {
    return null;
  }
}

function heuristic(items: RawItem[]): WorldStory[] {
  return items.map((it) => ({
    what: it.summary || it.title,
    faith:
      "It's easy to carry news like this as fear. But God never asks us to hold what only He can — He is “an ever-present help in trouble” (Psalm 46:1). We can stay informed and still stay at peace.",
    pray: "Father, be near to everyone this affects. Move through every helping hand, and keep our hearts anchored in You.",
    url: it.link,
    source: SOURCE_NAME,
  }));
}

/**
 * Draft 1–3 real world stories with the faith lens. Returns [] if the feed is
 * unreachable, so callers can leave the section untouched.
 */
export async function draftWorldNews(count = 3): Promise<WorldStory[]> {
  const n = Math.min(Math.max(count, 1), 3);
  try {
    const items = await fetchHeadlines(n);
    if (!items.length) return [];
    return (await withFaithLens(items)) ?? heuristic(items);
  } catch {
    return [];
  }
}
