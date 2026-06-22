"use client";

import { useState } from "react";
import type { GoodNewsItem } from "@/lib/content";

export default function GoodNewsCard({ item }: { item: GoodNewsItem }) {
  const [imgOk, setImgOk] = useState(Boolean(item.image));

  return (
    <a
      className="gncard"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="gnimg">
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : null}
      </div>
      <div className="gnbody">
        <span className="gnpill">{item.category}</span>
        <div className="gnh">{item.headline}</div>
        <span className="gnsource">{item.source} →</span>
      </div>
    </a>
  );
}
