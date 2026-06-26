import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Popup subtext options", robots: { index: false } };
export const dynamic = "force-static";

const OPTIONS: { label: string; note: string; text: string }[] = [
  {
    label: "A · Blended (currently live)",
    note: "Relationship + ten-minutes + armor",
    text: "You’ll never grow close to someone you never actually talk to — not even God. This is where the conversation starts: ten honest minutes in His Word each morning that quietly change the other twenty-three hours. Ephesians calls it putting on your armor — so start your day already armed. Free, forever.",
  },
  {
    label: "B · Armor only",
    note: "Short + bold",
    text: "Ephesians says put on the armor every morning — and the one weapon you fight with is the Word. Start your day already armed. Free, forever.",
  },
  {
    label: "C · Ten minutes",
    note: "Habit + payoff",
    text: "A short devotional — no noise, no guilt, just the walk. Because ten honest minutes with God changes the other twenty-three hours. Free, forever.",
  },
  {
    label: "D · Relationship",
    note: "Warm + simple",
    text: "You’ll never grow close to someone you never actually talk to — not your best friend, not God. This is where the conversation starts. Free, forever.",
  },
];

const BULLETS = [
  ["📖", "Hear God in His Word every morning", "a 5-minute devotional"],
  ["🙏", "Learn to talk and listen to God", "and notice when He's speaking"],
  ["🌅", "Start every day walking with God", "not just reading about Him"],
  ["🌱", "Build a real relationship with Jesus", "small steps that become a lifelong walk"],
];

function Card({ o }: { o: { label: string; note: string; text: string } }) {
  return (
    <div className="st-frame">
      <div className="st-label">{o.label}<span>{o.note}</span></div>
      <div className="st-card">
        <div className="st-crest">
          <svg viewBox="0 0 500 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0b1424" /><stop offset="55%" stopColor="#13243f" /><stop offset="100%" stopColor="#1F3A5F" /></linearGradient>
              <radialGradient id="st-core" cx="50%" cy="100%" r="80%"><stop offset="0%" stopColor="#FBEFC9" /><stop offset="38%" stopColor="#E3C074" /><stop offset="72%" stopColor="#C9A24B" /><stop offset="100%" stopColor="#C9A24B" stopOpacity="0" /></radialGradient>
              <linearGradient id="st-ray" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#E3C074" stopOpacity=".9" /><stop offset="100%" stopColor="#E3C074" stopOpacity="0" /></linearGradient>
            </defs>
            <rect x="0" y="0" width="500" height="150" fill="url(#st-sky)" />
            <g className="st-rays" fill="url(#st-ray)">
              <polygon points="250,150 232,18 268,18" /><polygon points="250,150 188,42 220,34" /><polygon points="250,150 312,42 280,34" /><polygon points="250,150 138,76 174,62" /><polygon points="250,150 362,76 326,62" /><polygon points="250,150 96,108 132,92" /><polygon points="250,150 404,108 368,92" />
            </g>
            <ellipse className="st-coreel" cx="250" cy="150" rx="150" ry="120" fill="url(#st-core)" />
            <circle className="st-coreel" cx="250" cy="156" r="52" fill="#FBEFC9" opacity=".97" />
            <path d="M0,128 Q250,116 500,128 L500,150 L0,150 Z" fill="#FAF6EE" />
          </svg>
          <div className="st-head"><span className="st-brand">The Daily Walk Newsletter</span><span className="st-x">×</span></div>
        </div>
        <div className="st-body">
          <div className="st-stats"><span><b>DAILY</b> DEVOTIONAL</span><span>·</span><span><b>5 MIN</b> READ</span><span>·</span><span><b>FREE</b> ALWAYS</span></div>
          <p className="st-eyebrow"><span className="st-dot" /> Free every morning — before the world gets loud</p>
          <h2 className="st-headline">A few quiet minutes <span className="g">with God.</span> Every morning.</h2>
          <p className="st-sub">{o.text}</p>
          <div className="st-verse"><p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;<cite>— Psalm 118:24 · lands at 6:30 AM PT</cite></p></div>
          <div className="st-form"><span className="st-input">Your email address</span><span className="st-btn">Join free →</span></div>
          <ul className="st-list">
            {BULLETS.map(([e, lead, rest]) => (
              <li key={lead}><span className="em" aria-hidden="true">{e}</span><span><b>{lead}</b> — {rest}</span></li>
            ))}
          </ul>
          <div className="st-foot">
            <p className="st-fine">Free forever · No spam · Unsubscribe anytime</p>
            <p className="st-fine" style={{ margin: 0 }}>Ready to go deeper? <span className="st-founding">Become a Founding Member →</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubtextOptions() {
  const css = `
  .stwrap { min-height:100vh; background:#ece4d6; font-family:Inter,system-ui,sans-serif; padding:40px 20px 60px; }
  .stwrap .head { max-width:560px; margin:0 auto 28px; }
  .stwrap h1 { font-family:Georgia,serif; font-size:32px; color:#1F3A5F; margin:8px 0 6px; }
  .stwrap .kick { font-size:12px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:#B8902E; margin:0; }
  .stwrap .lede { color:#5a5345; font-size:15.5px; line-height:1.6; margin:0; }
  .stwrap .lede a { color:#B8902E; }
  .st-grid { max-width:560px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:40px; }
  .st-frame { width:100%; max-width:520px; }
  .st-label { font-family:Georgia,serif; font-size:19px; color:#1F3A5F; margin:0 0 10px; }
  .st-label span { display:block; font-family:Inter,sans-serif; font-size:12.5px; color:#8a8270; }
  .st-card { width:100%; background:#FAF6EE; border-radius:20px; overflow:hidden; border:1px solid #e7ddc7; box-shadow:0 26px 56px -28px rgba(31,58,95,.6); }
  .st-crest { position:relative; height:150px; overflow:hidden; }
  .st-crest svg { display:block; width:100%; height:100%; }
  .st-head { position:absolute; top:0; left:0; right:0; display:flex; align-items:center; justify-content:space-between; padding:15px 20px 0; }
  .st-brand { font-family:Georgia,serif; font-weight:700; letter-spacing:.13em; font-size:13px; color:#E3C074; text-transform:uppercase; text-shadow:0 1px 6px rgba(0,0,0,.5); }
  .st-x { color:#EAF0F8; opacity:.8; font-size:19px; }
  .st-body { padding:18px 26px 22px; color:#3c4350; }
  .st-stats { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; font-size:11px; letter-spacing:.5px; text-transform:uppercase; color:#8a8270; padding-bottom:14px; border-bottom:1px solid #e7ddc7; }
  .st-stats b { color:#1F3A5F; }
  .st-eyebrow { display:inline-flex; align-items:center; gap:8px; font-weight:700; font-size:12.5px; color:#B8902E; margin:16px 0 6px; }
  .st-dot { width:9px; height:9px; border-radius:50%; background:#5a9a6b; box-shadow:0 0 0 4px rgba(90,154,107,.18); }
  .st-headline { font-family:Georgia,serif; font-size:27px; line-height:1.15; color:#1F3A5F; margin:0 0 8px; }
  .st-headline .g { color:#B8902E; }
  .st-sub { font-size:14px; line-height:1.6; color:#3c4350; margin:0 0 16px; }
  .st-verse { background:#F3ECDA; border-left:4px solid #C9A24B; border-radius:0 10px 10px 0; padding:13px 16px; margin:0 0 16px; }
  .st-verse p { margin:0; font-family:Georgia,serif; font-style:italic; font-size:15px; line-height:1.5; color:#1F3A5F; }
  .st-verse cite { display:block; margin-top:8px; font-style:normal; font-size:12px; color:#8a8270; }
  .st-form { display:flex; gap:8px; margin:0 0 16px; }
  .st-input { flex:1; background:#fff; border:1px solid #e7ddc7; border-radius:10px; padding:11px 14px; color:#8a8270; font-size:14px; }
  .st-btn { background:#C9A24B; color:#1F3A5F; font-weight:700; border-radius:10px; padding:11px 18px; font-size:14px; white-space:nowrap; }
  .st-list { list-style:none; margin:14px 0 12px; padding:0; display:grid; gap:10px; }
  .st-list li { display:flex; align-items:flex-start; gap:10px; font-size:14px; line-height:1.45; color:#3c4350; }
  .st-list .em { font-size:16px; width:22px; text-align:center; flex-shrink:0; }
  .st-list b { color:#1F3A5F; }
  .st-foot { text-align:center; border-top:1px solid #e7ddc7; padding-top:12px; margin-top:4px; }
  .st-fine { margin:0 0 8px; font-size:12px; color:#8a8270; }
  .st-founding { color:#B8902E; font-weight:700; }
  @media (prefers-reduced-motion: no-preference) {
    .st-frame { animation: st-rise .6s ease both; }
    @keyframes st-rise { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:none; } }
    .st-rays { transform-origin:250px 150px; animation: st-shimmer 9s ease-in-out infinite; }
    @keyframes st-shimmer { 0%,100% { opacity:.55;} 50% { opacity:.9; } }
    .st-coreel { animation: st-glow 6s ease-in-out infinite; }
    @keyframes st-glow { 0%,100% { opacity:.92;} 50% { opacity:1; } }
  }
  `;
  return (
    <div className="stwrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="head">
        <p className="kick">The Daily Walk · Welcome popup</p>
        <h1>Same popup — 4 subtext options</h1>
        <p className="lede">The Golden Dawn popup with four different middle lines. Read them in context, then tell me the letter and I&apos;ll set it live. <Link href="/designs/popup">← all popup looks</Link></p>
      </div>
      <div className="st-grid">{OPTIONS.map((o) => <Card key={o.label} o={o} />)}</div>
    </div>
  );
}
