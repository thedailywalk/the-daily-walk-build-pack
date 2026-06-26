import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sunrise + Cream — tones", robots: { index: false } };
export const dynamic = "force-static";

const CREAM = "#FAF6EE";

type Theme = {
  key: string; name: string; note: string;
  sky: [string, string, string]; sun: [string, string, string, string]; ray: string; crestAccent: string;
};

const THEMES: Theme[] = [
  { key: "golden", name: "Golden Dawn", note: "Navy sky · classic gold sun · cream body",
    sky: ["#0b1424", "#13243f", "#1F3A5F"], sun: ["#FBEFC9", "#E3C074", "#C9A24B", "#C9A24B"], ray: "#E3C074", crestAccent: "#E3C074" },
  { key: "amber", name: "Amber Sunrise", note: "Warmer sky · amber-gold sun · cream body",
    sky: ["#0b1424", "#33283a", "#7a4a3a"], sun: ["#FFF0CF", "#F0B35A", "#E0883A", "#E0883A"], ray: "#F3C98A", crestAccent: "#EBB872" },
  { key: "blush", name: "Blush Gold", note: "Soft mauve sky · warm gold sun · cream body",
    sky: ["#141226", "#33283f", "#6b4a63"], sun: ["#FFF0CF", "#F0C77E", "#D9A94B", "#D9A94B"], ray: "#F0CE8C", crestAccent: "#E6C58A" },
  { key: "royal", name: "Royal Dawn", note: "Royal-blue sky · gold sun · cream body",
    sky: ["#0c1f44", "#1a3c70", "#2b5aa0"], sun: ["#FFF3D2", "#E9C57E", "#C9A24B", "#C9A24B"], ray: "#EBD08A", crestAccent: "#EBD08A" },
  { key: "twilight", name: "Twilight Dawn", note: "Indigo sky · gold sun · cream body",
    sky: ["#0d0f24", "#1f1f44", "#3a3a72"], sun: ["#FBEFC9", "#E3C074", "#C9A24B", "#C9A24B"], ray: "#E3C074", crestAccent: "#E6C98E" },
];

const BULLETS = [
  ["📖", "Hear God in His Word every morning", "a 5-minute devotional"],
  ["🙏", "Learn to talk and listen to God", "and notice when He's speaking"],
  ["🌅", "Start every day walking with God", "not just reading about Him"],
  ["🌱", "Build a real relationship with Jesus", "small steps that become a lifelong walk"],
];

function DawnCard({ t }: { t: Theme }) {
  return (
    <div className="dw-frame">
      <div className="dw-label">{t.name}<span>{t.note}</span></div>
      <div className="dw-card" style={{ "--crestAccent": t.crestAccent } as React.CSSProperties}>
        <div className="dw-crest">
          <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <linearGradient id={`dsky-${t.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.sky[0]} /><stop offset="55%" stopColor={t.sky[1]} /><stop offset="100%" stopColor={t.sky[2]} />
              </linearGradient>
              <radialGradient id={`dcore-${t.key}`} cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor={t.sun[0]} /><stop offset="38%" stopColor={t.sun[1]} /><stop offset="72%" stopColor={t.sun[2]} /><stop offset="100%" stopColor={t.sun[3]} stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`dray-${t.key}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={t.ray} stopOpacity=".9" /><stop offset="100%" stopColor={t.ray} stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="500" height="150" fill={`url(#dsky-${t.key})`} />
            <g className="dw-rays" fill={`url(#dray-${t.key})`}>
              <polygon points="250,150 232,18 268,18" /><polygon points="250,150 188,42 220,34" /><polygon points="250,150 312,42 280,34" />
              <polygon points="250,150 138,76 174,62" /><polygon points="250,150 362,76 326,62" /><polygon points="250,150 96,108 132,92" /><polygon points="250,150 404,108 368,92" />
            </g>
            <ellipse className="dw-core" cx="250" cy="150" rx="150" ry="120" fill={`url(#dcore-${t.key})`} />
            <circle className="dw-core" cx="250" cy="156" r="52" fill={t.sun[0]} opacity=".97" />
            {/* cream horizon — the sun rises into the cream body for a seamless blend */}
            <path d="M0,128 Q250,116 500,128 L500,150 L0,150 Z" fill={CREAM} />
          </svg>
          <div className="dw-head"><span className="dw-brand">The Daily Walk Newsletter</span><span className="dw-x">×</span></div>
        </div>

        <div className="dw-body">
          <div className="dw-stats"><span><b>DAILY</b> DEVOTIONAL</span><span>·</span><span><b>5 MIN</b> READ</span><span>·</span><span><b>FREE</b> ALWAYS</span></div>
          <p className="dw-eyebrow"><span className="dw-dot" /> Free every morning — before the world gets loud</p>
          <h2 className="dw-headline">A few quiet minutes <span className="g">with God.</span> Every morning.</h2>
          <p className="dw-sub">Five honest minutes in His Word each morning quietly change the other twenty-three hours. Ephesians calls it putting on your armor — and the Word is the one weapon you fight with. Start your day already armed. Free, forever.</p>
          <div className="dw-verse"><p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;<cite>— Psalm 118:24 · lands at 6:30 AM PT</cite></p></div>
          <div className="dw-form"><span className="dw-input">Your email address</span><span className="dw-btn">Join free →</span></div>
          <ul className="dw-list">
            {BULLETS.map(([e, lead, rest]) => (
              <li key={lead}><span className="em" aria-hidden="true">{e}</span><span><b>{lead}</b> — {rest}</span></li>
            ))}
          </ul>
          <div className="dw-foot">
            <p className="dw-fine">Free forever · No spam · Unsubscribe anytime</p>
            <p className="dw-fine" style={{ margin: 0 }}>Ready to go deeper? <span className="dw-founding">Become a Founding Member →</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DawnColors() {
  const css = `
  .dwwrap { min-height:100vh; background:#ece4d6; font-family:Inter,system-ui,sans-serif; padding:40px 20px 60px; }
  .dwwrap .head { max-width:560px; margin:0 auto 28px; }
  .dwwrap h1 { font-family:Georgia,serif; font-size:32px; color:#1F3A5F; margin:8px 0 6px; }
  .dwwrap .kick { font-size:12px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:#B8902E; margin:0; }
  .dwwrap .lede { color:#5a5345; font-size:15.5px; line-height:1.6; margin:0; }
  .dwwrap .lede a { color:#B8902E; }
  .dw-grid { max-width:560px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:40px; }
  .dw-frame { width:100%; max-width:520px; }
  .dw-label { font-family:Georgia,serif; font-size:19px; color:#1F3A5F; margin:0 0 10px; }
  .dw-label span { display:block; font-family:Inter,sans-serif; font-size:12.5px; color:#8a8270; }
  .dw-card { width:100%; background:${CREAM}; border-radius:20px; overflow:hidden; border:1px solid #e7ddc7; box-shadow:0 26px 56px -28px rgba(31,58,95,.6); }
  .dw-crest { position:relative; height:150px; overflow:hidden; }
  .dw-crest svg { display:block; width:100%; height:100%; }
  .dw-head { position:absolute; top:0; left:0; right:0; display:flex; align-items:center; justify-content:space-between; padding:15px 20px 0; }
  .dw-brand { font-family:Georgia,serif; font-weight:700; letter-spacing:.13em; font-size:13px; color:var(--crestAccent); text-transform:uppercase; text-shadow:0 1px 6px rgba(0,0,0,.5); }
  .dw-x { color:#EAF0F8; opacity:.8; font-size:19px; }
  .dw-body { padding:18px 26px 22px; color:#3c4350; }
  .dw-stats { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; font-size:11px; letter-spacing:.5px; text-transform:uppercase; color:#8a8270; padding-bottom:14px; border-bottom:1px solid #e7ddc7; }
  .dw-stats b { color:#1F3A5F; }
  .dw-eyebrow { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:12.5px; color:#B8902E; margin:16px 0 6px; }
  .dw-dot { width:9px; height:9px; border-radius:50%; background:#5a9a6b; box-shadow:0 0 0 4px rgba(90,154,107,.18); }
  .dw-headline { font-family:Georgia,serif; font-size:27px; line-height:1.15; color:#1F3A5F; margin:0 0 8px; }
  .dw-headline .g { color:#B8902E; }
  .dw-sub { font-size:14px; line-height:1.6; color:#3c4350; margin:0 0 16px; }
  .dw-verse { background:#F3ECDA; border-left:4px solid #C9A24B; border-radius:0 10px 10px 0; padding:13px 16px; margin:0 0 16px; }
  .dw-verse p { margin:0; font-family:Georgia,serif; font-style:italic; font-size:15px; line-height:1.5; color:#1F3A5F; }
  .dw-verse cite { display:block; margin-top:8px; font-style:normal; font-size:12px; color:#8a8270; }
  .dw-form { display:flex; gap:8px; margin:0 0 16px; }
  .dw-input { flex:1; background:#fff; border:1px solid #e7ddc7; border-radius:10px; padding:11px 14px; color:#8a8270; font-size:14px; }
  .dw-btn { background:#C9A24B; color:#1F3A5F; font-weight:700; border-radius:10px; padding:11px 18px; font-size:14px; white-space:nowrap; }
  .dw-list { list-style:none; margin:14px 0 12px; padding:0; display:grid; gap:10px; }
  .dw-list li { display:flex; align-items:flex-start; gap:10px; font-size:14px; line-height:1.45; color:#3c4350; }
  .dw-list .em { font-size:16px; width:22px; text-align:center; flex-shrink:0; }
  .dw-list b { color:#1F3A5F; }
  .dw-foot { text-align:center; border-top:1px solid #e7ddc7; padding-top:12px; margin-top:4px; }
  .dw-fine { margin:0 0 8px; font-size:12px; color:#8a8270; }
  .dw-founding { color:#B8902E; font-weight:700; }
  @media (prefers-reduced-motion: no-preference) {
    .dw-frame { animation: dw-rise .6s ease both; }
    @keyframes dw-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:none; } }
    .dw-rays { transform-origin:250px 150px; animation: dw-shimmer 9s ease-in-out infinite; }
    @keyframes dw-shimmer { 0%,100% { opacity:.55; } 50% { opacity:.9; } }
    .dw-core { animation: dw-glow 6s ease-in-out infinite; }
    @keyframes dw-glow { 0%,100% { opacity:.92; } 50% { opacity:1; } }
    .dw-dot { animation: dw-dot 2.8s ease-in-out infinite; }
    @keyframes dw-dot { 0%,100% { box-shadow:0 0 0 4px rgba(90,154,107,.18);} 50% { box-shadow:0 0 0 8px rgba(90,154,107,.06);} }
  }
  `;
  return (
    <div className="dwwrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="head">
        <p className="kick">The Daily Walk · Welcome popup</p>
        <h1>Sunrise crest + cream body — 5 tones</h1>
        <p className="lede">The sunrise rises into the cream section you love — clean and elevated. Same words, full size. Tell me your favorite and I&apos;ll set it live. <Link href="/designs/popup">← all popup looks</Link></p>
      </div>
      <div className="dw-grid">{THEMES.map((t) => <DawnCard key={t.key} t={t} />)}</div>
    </div>
  );
}
