import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Popup colors — Cream Classic", robots: { index: false } };
export const dynamic = "force-static";

/** 5 brand-color tones of the Cream Classic popup (same layout + content). */
type Theme = {
  name: string;
  note: string;
  vars: Record<string, string>;
};

const THEMES: Theme[] = [
  {
    name: "Classic",
    note: "Cream body · navy header · gold button (the original)",
    vars: {
      "--hdr": "#1F3A5F", "--hdrText": "#ffffff",
      "--body": "#FAF6EE", "--title": "#1F3A5F", "--text": "#3c4350", "--muted": "#8a8270",
      "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#e7ddc7",
      "--verseBg": "#F3ECDA", "--inputBg": "#ffffff",
      "--btnBg": "#C9A24B", "--btnText": "#1F3A5F",
    },
  },
  {
    name: "Warm Gold",
    note: "Cream body · gold header · navy button",
    vars: {
      "--hdr": "#B8902E", "--hdrText": "#ffffff",
      "--body": "#FAF6EE", "--title": "#1F3A5F", "--text": "#3c4350", "--muted": "#8a8270",
      "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#e7ddc7",
      "--verseBg": "#F3ECDA", "--inputBg": "#ffffff",
      "--btnBg": "#1F3A5F", "--btnText": "#FAF6EE",
    },
  },
  {
    name: "Ivory & Navy",
    note: "Cooler ivory body · navy header · navy button",
    vars: {
      "--hdr": "#1F3A5F", "--hdrText": "#ffffff",
      "--body": "#FBFAF6", "--title": "#1F3A5F", "--text": "#3a4250", "--muted": "#9a9486",
      "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#ece7da",
      "--verseBg": "#F4F0E6", "--inputBg": "#ffffff",
      "--btnBg": "#1F3A5F", "--btnText": "#ffffff",
    },
  },
  {
    name: "Soft Sand",
    note: "Warmer sand body · navy header · gold button (coziest)",
    vars: {
      "--hdr": "#1F3A5F", "--hdrText": "#ffffff",
      "--body": "#F3ECDA", "--title": "#1F3A5F", "--text": "#4a4434", "--muted": "#8a8270",
      "--accent": "#B8902E", "--strong": "#1F3A5F", "--border": "#e2d6b8",
      "--verseBg": "#ECE0C4", "--inputBg": "#FFFDF8",
      "--btnBg": "#C9A24B", "--btnText": "#1F3A5F",
    },
  },
  {
    name: "Navy (inverted)",
    note: "Navy body · cream text · gold accents (dark tone)",
    vars: {
      "--hdr": "#16263f", "--hdrText": "#ffffff",
      "--body": "#1F3A5F", "--title": "#ffffff", "--text": "#d9e0ea", "--muted": "#9fb0c6",
      "--accent": "#E3C074", "--strong": "#ffffff", "--border": "rgba(255,255,255,0.14)",
      "--verseBg": "rgba(255,255,255,0.06)", "--inputBg": "rgba(255,255,255,0.95)",
      "--btnBg": "#C9A24B", "--btnText": "#1F3A5F",
    },
  },
];

const BULLETS = [
  ["📖", "Hear God in His Word every morning", "a 5-minute devotional"],
  ["🙏", "Learn to talk and listen to God", "and notice when He's speaking"],
  ["🌅", "Start every day walking with God", "not just reading about Him"],
  ["🌱", "Build a real relationship with Jesus", "small steps that become a lifelong walk"],
];

function Card({ t }: { t: Theme }) {
  return (
    <div className="pc-frame">
      <div className="pc-label">{t.name}<span>{t.note}</span></div>
      <div className="pc-card" style={t.vars as React.CSSProperties}>
        <div className="pc-head">
          <span className="pc-brand">THE DAILY WALK</span>
          <span className="pc-x">×</span>
        </div>
        <div className="pc-body">
          <div className="pc-stat"><span><b>DAILY</b> DEVOTIONAL</span><span>·</span><span><b>2 MIN</b> READ</span><span>·</span><span><b>FREE</b> ALWAYS</span></div>
          <div className="pc-eyebrow"><span className="pc-dot" /> Free every morning — before the world gets loud</div>
          <h2 className="pc-title">A few quiet minutes <span>with God.</span> Every morning.</h2>
          <p className="pc-sub">A short devotional, one honest prayer, and a little encouragement to start your day — no noise, no guilt, just the walk. Free, forever.</p>
          <div className="pc-verse">
            <p>&ldquo;This is the day that the Lord has made; let us rejoice and be glad in it.&rdquo;</p>
            <cite>— Psalm 118:24 · lands at 6:30 AM PT</cite>
          </div>
          <div className="pc-form">
            <span className="pc-input">Your email address</span>
            <span className="pc-btn">Join free →</span>
          </div>
          <ul className="pc-list">
            {BULLETS.map(([e, lead, rest]) => (
              <li key={lead}><span aria-hidden="true">{e}</span><span><b>{lead}</b> — {rest}</span></li>
            ))}
          </ul>
          <div className="pc-foot">Free forever · No spam · Unsubscribe anytime</div>
          <div className="pc-more">Ready to go deeper? <span>Become a Founding Member →</span></div>
        </div>
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
  .pcwrap .lede { color:#5a5345; font-size:16px; line-height:1.6; max-width:660px; margin:0; }
  .pc-grid { max-width:1240px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit,minmax(330px,1fr)); gap:22px; }
  .pc-frame { }
  .pc-label { font-family:Georgia,serif; font-size:18px; color:#1F3A5F; margin:0 0 8px; }
  .pc-label span { display:block; font-family:Inter,sans-serif; font-size:12px; color:#8a8270; }
  .pc-card { border:1px solid var(--border); border-radius:18px; overflow:hidden; box-shadow:0 16px 40px -26px rgba(31,58,95,0.55); background:var(--body); color:var(--text); }
  .pc-head { background:var(--hdr); color:var(--hdrText); display:flex; align-items:center; justify-content:space-between; padding:15px 20px; }
  .pc-brand { font-family:Georgia,serif; font-size:17px; letter-spacing:2px; }
  .pc-x { opacity:0.7; font-size:20px; }
  .pc-body { padding:18px 22px 20px; }
  .pc-stat { display:flex; gap:8px; flex-wrap:wrap; font-size:11px; letter-spacing:0.5px; text-transform:uppercase; color:var(--muted); padding-bottom:13px; border-bottom:1px solid var(--border); }
  .pc-stat b { color:var(--strong); }
  .pc-eyebrow { display:flex; align-items:center; gap:8px; font-weight:700; font-size:12.5px; color:var(--accent); margin:14px 0 6px; }
  .pc-dot { width:9px; height:9px; border-radius:50%; background:#5a9a6b; box-shadow:0 0 0 4px rgba(90,154,107,0.18); }
  .pc-title { font-family:Georgia,serif; font-size:25px; line-height:1.15; color:var(--title); margin:0 0 8px; }
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
        <h1>Cream Classic — 5 color tones</h1>
        <p className="lede">Same popup, same words — five tones from your brand palette (navy · gold · cream). Pick the one that feels right and I&apos;ll make it the live popup. <Link href="/designs/popup">← all popup looks</Link></p>
      </div>
      <div className="pc-grid">
        {THEMES.map((t) => <Card key={t.name} t={t} />)}
      </div>
    </div>
  );
}
