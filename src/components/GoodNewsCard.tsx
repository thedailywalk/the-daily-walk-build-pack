import type { GoodNewsItem } from "@/lib/content";

/**
 * Branded cover art (no third-party photos — see legal review). Each card gets
 * an original SVG "sunrise" scene whose palette shifts with the story category,
 * so it feels like a designed cover without touching anyone's licensed images.
 */

type Theme = {
  a: string; // sky top
  b: string; // sky mid
  c: string; // horizon
  sun: string;
  glow: string;
  h1: string; // far hills
  h2: string; // near hills
};

const THEMES: Record<string, Theme> = {
  warm: { a: "#21406b", b: "#3a5e8a", c: "#e6a85a", sun: "#ffd27a", glow: "#ffe7b6", h1: "#1b3050", h2: "#15304f" },
  cool: { a: "#1b3a64", b: "#2c6f8a", c: "#86c6c2", sun: "#ffe2a6", glow: "#dff3ef", h1: "#173a52", h2: "#102f40" },
  green: { a: "#1e4a55", b: "#2f7a66", c: "#a3d191", sun: "#ffe2a6", glow: "#e9f4dc", h1: "#1c4a3c", h2: "#143a2e" },
  rose: { a: "#3a2750", b: "#7a4f7a", c: "#e7a6ac", sun: "#ffdcae", glow: "#f7e2e6", h1: "#392747", h2: "#291b36" },
};

function themeFor(category: string): Theme {
  const c = category.toLowerCase();
  if (/(communit|hero|team|neighbor|rescue|courage)/.test(c)) return THEMES.cool;
  if (/(restor|animal|health|nature|earth|environment|wildlife|green|recover)/.test(c)) return THEMES.green;
  if (/(love|family|kind|heart|compassion)/.test(c)) return THEMES.rose;
  return THEMES.warm; // faith, generosity, hope, inspiring + default
}

function hashId(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return "gn" + Math.abs(h).toString(36);
}

function Cover({ category, href }: { category: string; href: string }) {
  const t = themeFor(category);
  const id = hashId(href + category);
  // rays radiating up from the sun
  const rays = [-60, -40, -20, 0, 20, 40, 60].map((deg, i) => {
    const r = (deg * Math.PI) / 180;
    const x1 = 200 + Math.sin(r) * 40;
    const y1 = 140 - Math.cos(r) * 40;
    const x2 = 200 + Math.sin(r) * 64;
    const y2 = 140 - Math.cos(r) * 64;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  return (
    <div className="gncover" aria-hidden="true">
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={t.a} />
            <stop offset="0.62" stopColor={t.b} />
            <stop offset="1" stopColor={t.c} />
          </linearGradient>
          <radialGradient id={`${id}g`} cx="0.5" cy="0.95" r="0.62">
            <stop offset="0" stopColor={t.glow} stopOpacity="0.95" />
            <stop offset="0.5" stopColor={t.sun} stopOpacity="0.32" />
            <stop offset="1" stopColor={t.sun} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="150" fill={`url(#${id}s)`} />
        <rect width="400" height="150" fill={`url(#${id}g)`} />

        {/* rays + sun */}
        <g stroke={t.sun} strokeWidth="3" strokeLinecap="round" opacity="0.55">
          {rays}
        </g>
        <circle cx="200" cy="140" r="34" fill={t.sun} opacity="0.96" />

        {/* layered hills */}
        <path
          d="M0 116 C 80 94, 150 108, 232 99 S 360 90, 400 106 L400 150 L0 150 Z"
          fill={t.h1}
          opacity="0.92"
        />
        <path
          d="M0 132 C 100 116, 184 129, 284 119 S 384 123, 400 127 L400 150 L0 150 Z"
          fill={t.h2}
        />

        {/* a couple of birds for life */}
        <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M116 44 q 7 -7 14 0" />
          <path d="M136 52 q 6 -6 12 0" />
        </g>
      </svg>
    </div>
  );
}

export default function GoodNewsCard({ item }: { item: GoodNewsItem }) {
  return (
    <a
      className="gncard"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Cover category={item.category} href={item.href} />
      <div className="gnbody">
        <span className="gnpill">{item.category}</span>
        <div className="gnh">{item.headline}</div>
        <span className="gnsource">Read at {item.source} →</span>
      </div>
    </a>
  );
}
