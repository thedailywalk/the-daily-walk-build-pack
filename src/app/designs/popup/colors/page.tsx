import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Popup looks — 6 options", robots: { index: false } };
export const dynamic = "force-static";

type Theme = { name: string; note: string; vars: Record<string, string> };

const THEMES: Theme[] = [
  { name: "Classic", note: "Cream body · navy header · gold button", vars: {
    "--hdr": "#1F3A5F", "--hdrText": "#ffffff", "--body": "#FAF6EE", "--title": "#1F3A5F", "--text": "#3c4350", "--muted": "#8a8270",
    "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#e7ddc7", "--verseBg": "#F3ECDA", "--inputBg": "#ffffff", "--btnBg": "#C9A24B", "--btnText": "#1F3A5F" } },
  { name: "Warm Gold", note: "Cream body · gold header · navy button", vars: {
    "--hdr": "#B8902E", "--hdrText": "#ffffff", "--body": "#FAF6EE", "--title": "#1F3A5F", "--text": "#3c4350", "--muted": "#8a8270",
    "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#e7ddc7", "--verseBg": "#F3ECDA", "--inputBg": "#ffffff", "--btnBg": "#1F3A5F", "--btnText": "#FAF6EE" } },
  { name: "Ivory & Navy", note: "Cooler ivory body · navy header · navy button", vars: {
    "--hdr": "#1F3A5F", "--hdrText": "#ffffff", "--body": "#FBFAF6", "--title": "#1F3A5F", "--text": "#3a4250", "--muted": "#9a9486",
    "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#ece7da", "--verseBg": "#F4F0E6", "--inputBg": "#ffffff", "--btnBg": "#1F3A5F", "--btnText": "#ffffff" } },
  { name: "Soft Sand", note: "Warmer sand body · navy header · gold button", vars: {
    "--hdr": "#1F3A5F", "--hdrText": "#ffffff", "--body": "#F3ECDA", "--title": "#1F3A5F", "--text": "#4a4434", "--muted": "#8a8270",
    "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#e2d6b8", "--verseBg": "#ECE0C4", "--inputBg": "#FFFDF8", "--btnBg": "#C9A24B", "--btnText": "#1F3A5F" } },
  { name: "Navy (inverted)", note: "Navy body · cream text · gold accents", vars: {
    "--hdr": "#16263f", "--hdrText": "#ffffff", "--body": "#1F3A5F", "--title": "#ffffff", "--text": "#d9e0ea", "--muted": "#9fb0c6",
    "--accent": "#E3C074", "--strong": "#ffffff", "--border": "rgba(255,255,255,0.14)", "--verseBg": "rgba(255,255,255,0.06)", "--inputBg": "rgba(255,255,255,0.95)", "--btnBg": "#C9A24B", "--btnText": "#1F3A5F" } },
];

const SUN_VARS: Record<string, string> = {
  "--hdr": "#0e1626", "--hdrText": "#E3C074", "--body": "#0e1626", "--title": "#ffffff", "--text": "#d9e0ea", "--muted": "#9fb0c6",
  "--accent": "#E3C074", "--strong": "#ffffff", "--border": "rgba(255,255,255,0.14)", "--verseBg": "rgba(255,255,255,0.05)", "--inputBg": "rgba(255,255,255,0.95)", "--btnBg": "#C9A24B", "--btnText": "#1F3A5F",
};

const BULLETS = [
  ["📖", "Hear God in His Word every morning", "a 5-minute devotional"],
  ["🙏", "Learn to talk and listen to God", "and notice when He's speaking"],
  ["🌅", "Start every day walking with God", "not just reading about Him"],
  ["🌱", "Build a real relationship with Jesus", "small steps that become a lifelong walk"],
];

function CardBody() {
  return (
    <div className="pc-body">
      <div className="pc-stat"><span><b>DAILY</b> DEVOTIONAL</span><span>·</span><span><b>5 MIN</b> READ</span><span>·</span><span><b>FREE</b> ALWAYS</span></div>
      <div className="pc-eyebrow"><span className="pc-dot" /> Free every morning — before the world gets loud</div>
      <h2 className="pc-title">A few quiet minutes <span>with God.</span> Every morning.</h2>
      <p className="pc-sub">A short devotional, one honest prayer, and a little encouragement to start your day — no noise, no guilt, just the walk. Free, forever.</p>
      <div className="pc-verse">
        <p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;</p>
        <cite>— Psalm 118:24 · lands at 6:30 AM PT</cite>
      </div>
      <div className="pc-form"><span className="pc-input">Your email address</span><span className="pc-btn">Join free →</span></div>
      <ul className="pc-list">
        {BULLETS.map(([e, lead, rest]) => (
          <li key={lead}><span aria-hidden="true">{e}</span><span><b>{lead}</b> — {rest}</span></li>
        ))}
      </ul>
      <div className="pc-foot">Free forever · No spam · Unsubscribe anytime</div>
      <div className="pc-more">Ready to go deeper? <span>Become a Founding Member →</span></div>
    </div>
  );
}

function Card({ t }: { t: Theme }) {
  return (
    <div className="pc-frame">
      <div className="pc-label">{t.name}<span>{t.note}</span></div>
      <div className="pc-card" style={t.vars as React.CSSProperties}>
        <div className="pc-head"><span className="pc-brand">THE DAILY WALK NEWSLETTER</span><span className="pc-x">×</span></div>
        <CardBody />
      </div>
    </div>
  );
}

function SunCard() {
  return (
    <div className="pc-frame">
      <div className="pc-label">Dark Sun-crest<span>Dark Inner Circle + sunrise · same info</span></div>
      <div className="pc-card pc-sun" style={SUN_VARS as React.CSSProperties}>
        <div className="pc-sunhead">
          <svg viewBox="0 0 600 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <linearGradient id="ccsky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0b1424" /><stop offset="62%" stopColor="#16273f" /><stop offset="100%" stopColor="#5a4a44" />
              </linearGradient>
              <radialGradient id="ccsun" cx="50%" cy="100%" r="62%">
                <stop offset="0%" stopColor="#fff4d6" /><stop offset="45%" stopColor="#f2cf86" /><stop offset="100%" stopColor="#e3a85a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ccray" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#f4d58c" stopOpacity="0.5" /><stop offset="100%" stopColor="#f4d58c" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="600" height="180" fill="url(#ccsky)" />
            <g fill="url(#ccray)">
              <polygon points="300,180 110,0 165,0" /><polygon points="300,180 205,0 245,0" /><polygon points="300,180 285,-10 315,-10" />
              <polygon points="300,180 355,0 395,0" /><polygon points="300,180 435,0 490,0" />
            </g>
            <circle cx="300" cy="184" r="62" fill="url(#ccsun)" />
            <path d="M238 184a62 62 0 0 1 124 0z" fill="#f6d98f" />
            <rect y="170" width="600" height="12" fill="#0b1424" opacity="0.45" />
          </svg>
          <span className="pc-brand">THE DAILY WALK NEWSLETTER</span>
          <span className="pc-x">×</span>
        </div>
        <CardBody />
      </div>
    </div>
  );
}

export default function PopupColors() {
  const css = `
  .pcwrap { min-height:100vh; background:#ece4d6; font-family:Inter,system-ui,sans-serif; padding:40px 20px 60px; }
  .pcwrap .head { max-width:1240px; margin:0 auto 26px; }
  .pcwrap h1 { font-family:Georgia,serif; font-size:34px; color:#1F3A5F; margin:8px 0 6px; }
  .pcwrap .kick { font-size:12px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:#B8902E; margin:0; }
  .pcwrap .lede { color:#5a5345; font-size:16px; line-height:1.6; max-width:680px; margin:0; }
  .pc-grid { max-width:560px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:38px; }
  .pc-frame { width:100%; max-width:520px; }
  .pc-label { font-family:Georgia,serif; font-size:19px; color:#1F3A5F; margin:0 0 10px; }
  .pc-label span { display:block; font-family:Inter,sans-serif; font-size:12.5px; color:#8a8270; }
  .pc-card { width:100%; border:1px solid var(--border); border-radius:18px; overflow:hidden; box-shadow:0 22px 50px -28px rgba(31,58,95,0.6); background:var(--body); color:var(--text); }
  .pc-head { background:var(--hdr); color:var(--hdrText); display:flex; align-items:center; justify-content:space-between; padding:15px 20px; }
  .pc-brand { font-family:Georgia,serif; font-size:16px; letter-spacing:1.6px; }
  .pc-x { opacity:0.7; font-size:20px; }
  .pc-sunhead { position:relative; height:160px; overflow:hidden; }
  .pc-sunhead svg { position:absolute; inset:0; width:100%; height:100%; display:block; }
  .pc-sunhead .pc-brand { position:absolute; top:16px; left:20px; color:#E3C074; }
  .pc-sunhead .pc-x { position:absolute; top:14px; right:20px; color:#fff; }
  .pc-body { padding:26px 32px 24px; }
  .pc-stat { display:flex; gap:8px; flex-wrap:wrap; font-size:11px; letter-spacing:0.5px; text-transform:uppercase; color:var(--muted); padding-bottom:13px; border-bottom:1px solid var(--border); }
  .pc-stat b { color:var(--strong); }
  .pc-eyebrow { display:flex; align-items:center; gap:8px; font-weight:700; font-size:12.5px; color:var(--accent); margin:14px 0 6px; }
  .pc-dot { width:9px; height:9px; border-radius:50%; background:#5a9a6b; box-shadow:0 0 0 4px rgba(90,154,107,0.18); }
  .pc-title { font-family:Georgia,serif; font-size:27px; line-height:1.15; color:var(--title); margin:0 0 8px; }
  .pc-title span { color:var(--accent); }
  .pc-sub { font-size:14px; line-height:1.6; color:var(--text); margin:0 0 14px; }
  .pc-verse { background:var(--verseBg); border-left:4px solid var(--accent); border-radius:0 10px 10px 0; padding:13px 15px; margin:0 0 16px; }
  .pc-verse p { font-family:Georgia,serif; font-style:italic; color:var(--strong); font-size:15px; line-height:1.5; margin:0 0 6px; }
  .pc-verse cite { font-style:normal; font-size:12px; color:var(--muted); }
  .pc-form { display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap; }
  .pc-input { flex:1; min-width:150px; background:var(--inputBg); border:1px solid var(--border); border-radius:10px; padding:11px 14px; color:#8a8270; font-size:14px; }
  .pc-btn { background:var(--btnBg); color:var(--btnText); font-weight:700; border-radius:10px; padding:11px 18px; font-size:14px; white-space:nowrap; }
  .pc-list { list-style:none; margin:14px 0 12px; padding:0; }
  .pc-list li { display:flex; gap:10px; align-items:flex-start; font-size:14px; color:var(--text); margin:9px 0; }
  .pc-list b { color:var(--strong); }
  .pc-foot { text-align:center; font-size:12px; color:var(--muted); padding-top:10px; border-top:1px solid var(--border); }
  .pc-more { text-align:center; font-size:13px; color:var(--text); margin-top:10px; }
  .pc-more span { color:var(--accent); font-weight:700; }
  `;
  return (
    <div className="pcwrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="head">
        <p className="kick">The Daily Walk · Welcome popup</p>
        <h1>All 6 looks — same words, full size</h1>
        <p className="lede">Five color tones of the Cream Classic plus the Dark Sun-crest — all at full size (520px) with identical wording. Scroll through, pick the one, and I&apos;ll make it the live popup. <Link href="/designs/popup">← all popup looks</Link></p>
      </div>
      <div className="pc-grid">
        {THEMES.map((t) => <Card key={t.name} t={t} />)}
        <SunCard />
      </div>
    </div>
  );
}
