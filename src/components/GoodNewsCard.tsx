import type { GoodNewsItem } from "@/lib/content";

/**
 * Branded cover art — original SVG "devotional" scenes (no third-party photos).
 * Each card deterministically gets one of several warm, faith-based, universally-
 * fitting scenes (sunrise, open Bible, candle, path, window light), tinted by the
 * story category. 100% original + legal, brand-aligned, no licensing needed.
 */

type Theme = {
  a: string; // sky top
  b: string; // sky mid
  c: string; // horizon glow
  sun: string;
  glow: string;
  h1: string; // far form
  h2: string; // near form
  ink: string; // line/detail
};

const THEMES: Record<string, Theme> = {
  warm: { a: "#21406b", b: "#3a5e8a", c: "#e6a85a", sun: "#ffd27a", glow: "#ffe7b6", h1: "#1b3050", h2: "#15304f", ink: "#0f2238" },
  cool: { a: "#1b3a64", b: "#2c6f8a", c: "#86c6c2", sun: "#ffe2a6", glow: "#dff3ef", h1: "#173a52", h2: "#102f40", ink: "#0c2433" },
  green: { a: "#1e4a55", b: "#2f7a66", c: "#a3d191", sun: "#ffe2a6", glow: "#e9f4dc", h1: "#1c4a3c", h2: "#143a2e", ink: "#0e2c22" },
  rose: { a: "#3a2750", b: "#7a4f7a", c: "#e7a6ac", sun: "#ffdcae", glow: "#f7e2e6", h1: "#392747", h2: "#291b36", ink: "#1d1228" },
};

function themeFor(category: string): Theme {
  const c = category.toLowerCase();
  if (/(communit|hero|team|neighbor|rescue|courage)/.test(c)) return THEMES.cool;
  if (/(restor|animal|health|nature|earth|environment|wildlife|green|recover)/.test(c)) return THEMES.green;
  if (/(love|family|kind|heart|compassion)/.test(c)) return THEMES.rose;
  return THEMES.warm; // faith, generosity, hope, inspiring + default
}

function hashNum(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const SCENE_COUNT = 5;

function Cover({ category, href }: { category: string; href: string }) {
  const t = themeFor(category);
  const hn = hashNum(href + category);
  const id = "gn" + hn.toString(36);
  const scene = hn % SCENE_COUNT;

  return (
    <div className="gncover" aria-hidden="true">
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={t.a} />
            <stop offset="0.62" stopColor={t.b} />
            <stop offset="1" stopColor={t.c} />
          </linearGradient>
          <radialGradient id={`${id}g`} cx="0.5" cy="0.92" r="0.62">
            <stop offset="0" stopColor={t.glow} stopOpacity="0.95" />
            <stop offset="0.5" stopColor={t.sun} stopOpacity="0.34" />
            <stop offset="1" stopColor={t.sun} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="150" fill={`url(#${id}s)`} />
        <rect width="400" height="150" fill={`url(#${id}g)`} />

        {scene === 0 && <Sunrise t={t} />}
        {scene === 1 && <OpenBible t={t} id={id} />}
        {scene === 2 && <Candle t={t} id={id} />}
        {scene === 3 && <Path t={t} />}
        {scene === 4 && <Window t={t} />}
      </svg>
    </div>
  );
}

/* ---- scenes (each ~400x150) ---- */
function Sunrise({ t }: { t: Theme }) {
  const rays = [-60, -40, -20, 0, 20, 40, 60].map((deg, i) => {
    const r = (deg * Math.PI) / 180;
    return (
      <line
        key={i}
        x1={200 + Math.sin(r) * 40}
        y1={140 - Math.cos(r) * 40}
        x2={200 + Math.sin(r) * 64}
        y2={140 - Math.cos(r) * 64}
      />
    );
  });
  return (
    <>
      <g stroke={t.sun} strokeWidth="3" strokeLinecap="round" opacity="0.55">{rays}</g>
      <circle cx="200" cy="140" r="34" fill={t.sun} opacity="0.96" />
      <path d="M0 116 C 80 94, 150 108, 232 99 S 360 90, 400 106 L400 150 L0 150 Z" fill={t.h1} opacity="0.92" />
      <path d="M0 132 C 100 116, 184 129, 284 119 S 384 123, 400 127 L400 150 L0 150 Z" fill={t.h2} />
      <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M116 44 q 7 -7 14 0" />
        <path d="M136 52 q 6 -6 12 0" />
      </g>
    </>
  );
}

function OpenBible({ t, id }: { t: Theme; id: string }) {
  return (
    <>
      <ellipse cx="200" cy="78" rx="78" ry="40" fill={`url(#${id}g)`} opacity="0.7" />
      {/* pages */}
      <path d="M200 116 L138 104 L142 82 L200 96 Z" fill="#f6efdd" stroke={t.sun} strokeWidth="1" />
      <path d="M200 116 L262 104 L258 82 L200 96 Z" fill="#fffaf0" stroke={t.sun} strokeWidth="1" />
      {/* spine + ribbon */}
      <line x1="200" y1="96" x2="200" y2="116" stroke={t.ink} strokeWidth="1.4" opacity="0.5" />
      <line x1="200" y1="100" x2="200" y2="130" stroke={t.sun} strokeWidth="2" opacity="0.85" />
      {/* page lines */}
      <g stroke={t.ink} strokeOpacity="0.18" strokeWidth="1">
        <line x1="152" y1="92" x2="192" y2="101" />
        <line x1="150" y1="98" x2="192" y2="106" />
        <line x1="208" y1="101" x2="248" y2="92" />
        <line x1="208" y1="106" x2="250" y2="98" />
      </g>
    </>
  );
}

function Candle({ t, id }: { t: Theme; id: string }) {
  return (
    <>
      <ellipse cx="200" cy="86" rx="40" ry="44" fill={`url(#${id}g)`} opacity="0.85" />
      {/* flame */}
      <path d="M200 74 C 207 84, 206 94, 200 96 C 194 94, 193 84, 200 74 Z" fill={t.sun} />
      <path d="M200 82 C 203 87, 203 92, 200 94 C 197 92, 197 87, 200 82 Z" fill="#fff7e6" />
      {/* wick + candle body */}
      <line x1="200" y1="96" x2="200" y2="100" stroke={t.ink} strokeWidth="1.5" />
      <rect x="193" y="100" width="14" height="30" rx="3" fill="#f6efdd" stroke={t.sun} strokeWidth="0.8" />
      {/* ledge */}
      <rect x="150" y="130" width="100" height="3" rx="1.5" fill={t.h2} opacity="0.7" />
    </>
  );
}

function Path({ t }: { t: Theme }) {
  return (
    <>
      <circle cx="200" cy="98" r="16" fill={t.sun} opacity="0.92" />
      <path d="M0 104 C 120 92, 150 100, 200 96 C 250 100, 300 92, 400 104 L400 150 L0 150 Z" fill={t.h1} opacity="0.9" />
      {/* winding path */}
      <path d="M176 150 C 190 128, 194 116, 200 100 C 206 116, 210 128, 224 150 Z" fill={t.glow} opacity="0.45" />
      <path d="M186 150 C 195 130, 197 118, 200 104 C 203 118, 205 130, 214 150 Z" fill="#ffffff" opacity="0.18" />
      <path d="M0 134 C 110 122, 170 132, 240 126 S 360 124, 400 130 L400 150 L0 150 Z" fill={t.h2} />
    </>
  );
}

function Window({ t }: { t: Theme }) {
  return (
    <>
      {/* light beams */}
      <g fill="#ffffff" opacity="0.1">
        <path d="M170 116 L150 150 L196 150 L196 116 Z" />
        <path d="M230 116 L250 150 L204 150 L204 116 Z" />
      </g>
      {/* window */}
      <path d="M162 116 L162 70 Q162 44 200 44 Q238 44 238 70 L238 116 Z" fill={t.glow} opacity="0.28" stroke={t.sun} strokeWidth="2.5" />
      <line x1="200" y1="46" x2="200" y2="116" stroke={t.sun} strokeWidth="2" opacity="0.9" />
      <line x1="163" y1="82" x2="237" y2="82" stroke={t.sun} strokeWidth="2" opacity="0.9" />
      {/* sill */}
      <rect x="150" y="116" width="100" height="4" rx="2" fill={t.h2} opacity="0.8" />
    </>
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
