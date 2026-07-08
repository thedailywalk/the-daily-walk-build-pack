import { listRecentPublished } from "@/lib/devotionals";
import { renderDevotionalHtml } from "@/lib/devotionalHtml";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public RSS feed of the daily devotional — the automation hand-off to Beehiiv.
 * Point Beehiiv's "RSS-to-Send" automation at /devotional/rss.xml and it will
 * auto-email each new issue on your schedule. Each item carries the FULL issue
 * HTML in <content:encoded>, so the email is the complete devotional. Because
 * the feed reads live from the database, any edit you make before send goes out.
 */

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RFC-822 date for a YYYY-MM-DD at ~5 AM Eastern (10:00 UTC). */
function pubDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1, 10, 0, 0)).toUTCString();
}

export async function GET() {
  const issues = await listRecentPublished(30);
  const self = `${site.url}/devotional/rss.xml`;

  const items = issues
    .map((dev) => {
      const html = renderDevotionalHtml(dev);
      const summary = dev.data?.verseRef
        ? `Today's reading: ${dev.data.verseRef}`
        : "A short daily devotional from The Daily Walk.";
      return `    <item>
      <title>${xmlEscape(dev.title || "Today's Devotional")}</title>
      <link>${site.url}/devotional</link>
      <guid isPermaLink="false">tdw-devotional-${dev.date}</guid>
      <pubDate>${pubDate(dev.date)}</pubDate>
      <description>${xmlEscape(summary)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(site.name)} — Daily Devotional</title>
    <link>${site.url}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${xmlEscape(site.description)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}
