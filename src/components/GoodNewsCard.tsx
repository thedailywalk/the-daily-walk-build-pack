import type { GoodNewsItem } from "@/lib/content";

/**
 * Good News card — shows the story's FREE, license-cleared photo (Wikimedia
 * Commons, properly credited). When no free photo was found, a plain brand-tinted
 * tile stands in so the card never looks broken. Headline + source link only
 * (summaries are newsletter-only). Real photos, real sources — no scraped or
 * copyrighted imagery.
 */
export default function GoodNewsCard({ item }: { item: GoodNewsItem }) {
  return (
    <a
      className="gncard"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.image ? (
        <div className="gncover gncover-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt="" loading="lazy" />
          {item.imageCredit ? (
            <span className="gncredit">Photo: {item.imageCredit}</span>
          ) : null}
        </div>
      ) : (
        <div className="gncover gncover-tile" aria-hidden="true" />
      )}
      <div className="gnbody">
        <span className="gnpill">{item.category}</span>
        <div className="gnh">{item.headline}</div>
        <span className="gnsource">Read at {item.source} →</span>
      </div>
    </a>
  );
}
