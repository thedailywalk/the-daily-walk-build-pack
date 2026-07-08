import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dark Sun-crest — color tones", robots: { index: false } };
export const dynamic = "force-static";

type Theme = {
  key: string;
  name: string;
  note: string;
  card: string;
  sky: [string, string, string];
  sun: [string, string, string, string];
  ray: string;
  accent: string;
  accent2: string;
  head: string;
  body: string;
  muted: string;
  verseBg: string;
  verseBorder: string;
};

const THEMES: Theme[] = [
  {
    key: "midnight", name: "Midnight Gold", note: "Deep navy + classic gold (current live)",
    card: "#10203a", sky: ["#0b1424", "#13243f", "#1F3A5F"], sun: ["#FBEFC9", "#E3C074", "#C9A24B", "#C9A24B"],
    ray: "#E3C074", accent: "#E3C074", accent2: "#C9A24B", head: "#F4F7FC", body: "#C2CEDF", muted: "#B9C6DA",
    verseBg: "rgba(11,20,36,.6)", verseBorder: "rgba(227,192,116,.4)",
  },
  {
    key: "royal", name: "Royal Navy", note: "Brighter royal blue + gold",
    card: "#112c54", sky: ["#0c1f44", "#1a3c70", "#2b5aa0"], sun: ["#FFF3D2", "#E9C57E", "#C9A24B", "#C9A24B"],
    ray: "#EBD08A", accent: "#EBD08A", accent2: "#C9A24B", head: "#F4F8FF", body: "#CCD8EC", muted: "#B9C6DA",
    verseBg: "rgba(8,22,48,.55)", verseBorder: "rgba(235,208,138,.4)",
  },
  {
    key: "dawn", name: "Dawn Amber", note: "Warmer sunrise + amber-gold",
    card: "#15203a", sky: ["#0b1424", "#3a2e39", "#b9763f"], sun: ["#FFF0CF", "#F0B35A", "#E0883A", "#E0883A"],
    ray: "#F3C98A", accent: "#EBB872", accent2: "#D9943E", head: "#F8F2EA", body: "#D7CcC0", muted: "#C6B8A8",
    verseBg: "rgba(20,16,14,.5)", verseBorder: "rgba(235,184,114,.45)",
  },
  {
    key: "obsidian", name: "Obsidian", note: "Near-black + luminous gold (sleekest)",
    card: "#0a0f1a", sky: ["#05080f", "#0c1422", "#16263f"], sun: ["#FFF6DA", "#F0CE7E", "#D9A94B", "#D9A94B"],
    ray: "#F0D28A", accent: "#F0D28A", accent2: "#D9A94B", head: "#F6F8FC", body: "#C0CADA", muted: "#9FAcc0",
    verseBg: "rgba(6,10,18,.6)", verseBorder: "rgba(240,210,138,.4)",
  },
  {
    key: "twilight", name: "Twilight", note: "Indigo-violet navy + gold",
    card: "#141633", sky: ["#0d0f24", "#1f1f44", "#3a3a72"], sun: ["#FBEFC9", "#E3C074", "#C9A24B", "#C9A24B"],
    ray: "#E3C074", accent: "#E6C98E", accent2: "#C9A24B", head: "#F5F3FF", body: "#CcC8E4", muted: "#B5B0CE",
    verseBg: "rgba(13,15,36,.55)", verseBorder: "rgba(227,192,116,.4)",
  },
];

const BULLETS = [
  ["📖", "Hear God in His Word every morning", "a 5-minute devotional"],
  ["🙏", "Learn to talk and listen to God", "and notice when He's speaking"],
  ["🌅", "Start every day walking with God", "not just reading about Him"],
  ["🌱", "Build a real relationship with Jesus", "small steps that become a lifelong walk"],
];

function vars(t: Theme): React.CSSProperties {
  return {
    "--card": t.card, "--accent": t.accent, "--accent2": t.accent2, "--head": t.head,
    "--body": t.body, "--muted": t.muted, "--verseBg": t.verseBg, "--verseBorder": t.verseBorder,
  } as React.CSSProperties;
}

function SunCard({ t }: { t: Theme }) {
  return (
    <div className="sc-frame">
      <div className="sc-label">{t.name}<span>{t.note}</span></div>
      <div className="sc-card" style={vars(t)}>
        <div className="sc-crest">
          <svg viewBox="0 0 500 168" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <linearGradient id={`sky-${t.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.sky[0]} /><stop offset="55%" stopColor={t.sky[1]} /><stop offset="100%" stopColor={t.sky[2]} />
              </linearGradient>
              <radialGradient id={`core-${t.key}`} cx="50%" cy="100%" r="75%">
                <stop offset="0%" stopColor={t.sun[0]} /><stop offset="35%" stopColor={t.sun[1]} /><stop offset="70%" stopColor={t.sun[2]} /><stop offset="100%" stopColor={t.sun[3]} stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`ray-${t.key}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={t.ray} stopOpacity=".9" /><stop offset="100%" stopColor={t.ray} stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="500" height="168" fill={`url(#sky-${t.key})`} />
            <g className="sc-rays" fill={`url(#ray-${t.key})`}>
              <polygon points="250,168 232,30 268,30" /><polygon points="250,168 190,52 222,44" /><polygon points="250,168 310,52 278,44" />
              <polygon points="250,168 140,86 176,72" /><polygon points="250,168 360,86 324,72" /><polygon points="250,168 96,120 132,104" /><polygon points="250,168 404,120 368,104" />
            </g>
            <ellipse className="sc-core" cx="250" cy="170" rx="150" ry="120" fill={`url(#core-${t.key})`} />
            <circle className="sc-core" cx="250" cy="178" r="58" fill={t.sun[0]} opacity=".95" />
            <path d="M0,150 Q250,138 500,150 L500,168 L0,168 Z" fill={t.sky[0]} opacity=".85" />
          </svg>
          <div className="sc-head"><span className="sc-brand">The Daily Walk Newsletter</span><span className="sc-x">×</span></div>
        </div>
        <div className="sc-stats"><span>Daily Devotional</span><span className="sep">·</span><span><b>5 MIN</b> READ</span><span className="sep">·</span><span><b>FREE</b> ALWAYS</span></div>
        <div className="sc-body">
          <p className="sc-eyebrow"><span className="sc-dot" /> Free every morning — before the world gets loud.</p>
          <h2 className="sc-headline">A new morning <span className="g">with God.</span></h2>
          <p className="sc-sub">Ephesians says put on the armor every morning — and the one weapon you fight with is the Word. Start your day already armed. Free, forever.</p>
          <div className="sc-verse"><p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;<cite>— Psalm 118:24 · lands at 5 AM ET</cite></p></div>
          <div className="sc-form"><span className="sc-input">your@email.com</span><span className="sc-btn">Join free →</span></div>
          <ul className="sc-list">
            {BULLETS.map(([e, lead, rest]) => (
              <li key={lead}><span className="em" aria-hidden="true">{e}</span><span><b>{lead}</b> — {rest}</span></li>
            ))}
          </ul>
          <div className="sc-foot">
            <p className="sc-fine">Free forever · No spam · Unsubscribe anytime</p>
            <p className="sc-fine" style={{ margin: 0 }}>Ready to go deeper? <span className="sc-founding">Become a Founding Member →</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SunColors() {
  const css = `
  .scwrap { min-height:100vh; background:#0c1422; font-family:Inter,system-ui,sans-serif; padding:40px 20px 60px; }
  .scwrap .head { max-width:560px; margin:0 auto 28px; }
  .scwrap h1 { font-family:Georgia,serif; font-size:32px; color:#F4F7FC; margin:8px 0 6px; }
  .scwrap .kick { font-size:12px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:#E3C074; margin:0; }
  .scwrap .lede { color:#aebbce; font-size:15.5px; line-height:1.6; margin:0; }
  .scwrap .lede a { color:#E3C074; }
  .sc-grid { max-width:560px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:40px; }
  .sc-frame { width:100%; max-width:520px; }
  .sc-label { font-family:Georgia,serif; font-size:19px; color:#F4F7FC; margin:0 0 10px; }
  .sc-label span { display:block; font-family:Inter,sans-serif; font-size:12.5px; color:#8fa0b8; }
  .sc-card { width:100%; background:var(--card); border-radius:22px; overflow:hidden; border:1px solid var(--verseBorder); box-shadow:0 30px 70px rgba(0,0,0,.6); color:var(--body); }
  .sc-crest { position:relative; height:168px; overflow:hidden; }
  .sc-crest svg { display:block; width:100%; height:100%; }
  .sc-head { position:absolute; top:0; left:0; right:0; display:flex; align-items:center; justify-content:space-between; padding:14px 18px 0; }
  .sc-brand { font-family:Georgia,serif; font-weight:700; letter-spacing:.13em; font-size:13px; color:var(--accent); text-transform:uppercase; text-shadow:0 1px 6px rgba(0,0,0,.5); }
  .sc-x { color:#EAF0F8; opacity:.75; font-size:18px; }
  .sc-stats { display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; padding:12px 18px 14px; font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); border-bottom:1px solid rgba(255,255,255,.06); }
  .sc-stats b { color:var(--accent); font-weight:800; }
  .sc-stats .sep { color:var(--accent2); opacity:.6; }
  .sc-body { padding:18px 24px 22px; }
  .sc-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:600; color:var(--accent); margin:0 0 12px; }
  .sc-dot { width:8px; height:8px; border-radius:999px; background:var(--accent); box-shadow:0 0 8px var(--accent); }
  .sc-headline { font-family:Georgia,serif; font-weight:700; font-size:30px; line-height:1.12; margin:0 0 10px; color:var(--head); }
  .sc-headline .g { color:var(--accent); }
  .sc-sub { font-size:14.5px; line-height:1.55; color:var(--body); margin:0 0 16px; }
  .sc-verse { background:var(--verseBg); border:1px solid var(--verseBorder); border-radius:14px; padding:14px 16px; margin:0 0 18px; }
  .sc-verse p { margin:0; font-family:Georgia,serif; font-style:italic; font-size:14px; line-height:1.5; color:#EDE2C6; }
  .sc-verse cite { display:block; margin-top:8px; font-style:normal; font-size:11.5px; color:var(--accent); }
  .sc-form { display:flex; gap:8px; margin:0 0 18px; }
  .sc-input { flex:1; padding:12px 14px; border-radius:11px; border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.05); color:#8593A8; font-size:14px; }
  .sc-btn { border-radius:11px; padding:12px 18px; font-weight:800; font-size:14px; color:#2a1f06; background:linear-gradient(180deg,var(--accent),var(--accent2)); box-shadow:0 6px 18px rgba(0,0,0,.3); white-space:nowrap; }
  .sc-list { list-style:none; margin:0 0 18px; padding:0; display:grid; gap:10px; }
  .sc-list li { display:flex; align-items:flex-start; gap:10px; font-size:13.5px; line-height:1.45; color:var(--body); }
  .sc-list .em { font-size:16px; width:22px; text-align:center; flex-shrink:0; }
  .sc-list b { color:var(--head); }
  .sc-foot { text-align:center; border-top:1px solid rgba(255,255,255,.07); padding-top:14px; }
  .sc-fine { margin:0 0 8px; font-size:11.5px; color:var(--muted); }
  .sc-founding { color:var(--accent); font-weight:700; }
  @media (prefers-reduced-motion: no-preference) {
    .sc-frame { animation: sc-rise .6s ease both; }
    @keyframes sc-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:none; } }
    .sc-rays { transform-origin:250px 168px; animation: sc-shimmer 9s ease-in-out infinite; }
    @keyframes sc-shimmer { 0%,100% { opacity:.55; } 50% { opacity:.9; } }
    .sc-core { animation: sc-glow 6s ease-in-out infinite; }
    @keyframes sc-glow { 0%,100% { opacity:.9; } 50% { opacity:1; } }
    .sc-btn { animation: sc-btn 3.4s ease-in-out infinite; }
    @keyframes sc-btn { 0%,100% { box-shadow:0 6px 18px rgba(0,0,0,.3); } 50% { box-shadow:0 10px 26px rgba(227,192,116,.4); } }
  }
  `;
  return (
    <div className="scwrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="head">
        <p className="kick">The Daily Walk · Welcome popup</p>
        <h1>Dark Sun-crest — 5 tones</h1>
        <p className="lede">The live popup, in five brand-navy/gold tones. Same words, full size. Tell me which and I&apos;ll set it live. <Link href="/designs/popup">← all popup looks</Link></p>
      </div>
      <div className="sc-grid">{THEMES.map((t) => <SunCard key={t.key} t={t} />)}</div>
    </div>
  );
}
