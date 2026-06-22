import type { GoodNewsItem } from "@/lib/content";

// Branded tile (no third-party image) — links out to the original article.
export default function GoodNewsCard({ item }: { item: GoodNewsItem }) {
  return (
    <a
      className="gncard"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="gnimg gntile" aria-hidden="true">
        <span className="gntile-mark">🌅</span>
      </div>
      <div className="gnbody">
        <span className="gnpill">{item.category}</span>
        <div className="gnh">{item.headline}</div>
        <span className="gnsource">Read at {item.source} →</span>
      </div>
    </a>
  );
}
