import Link from "next/link";

export const dynamic = "force-static";
export const metadata = { title: "Concept · Trailhead", robots: { index: false } };

const STOPS = [
  { icon: "📖", label: "Today's devotional", sub: "He defeats death and stays with us always", state: "now" },
  { icon: "✦", label: "Memory verse", sub: "Psalm 23:1 · tap to reveal", state: "open" },
  { icon: "✍", label: "Prayer journal", sub: "One honest prayer for today", state: "open" },
  { icon: "▶", label: "This week's video", sub: "Finding Peace in the Storm", state: "open" },
  { icon: "💬", label: "Encouragement wall", sub: "3 new from the circle", state: "open" },
];

export default function Trailhead() {
  return (
    <div className="th">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Link href="/designs/dashboard" className="th-back">← All concepts</Link>

      <main className="th-main">
        <header className="th-head">
          <span className="th-kick">FRIDAY, JUNE 26 · DAY 47</span>
          <h1>Good morning, Lulu.</h1>
          <p>One step at a time. Here&apos;s your path for today.</p>
          <div className="th-stats">
            <span><b>12</b> day streak 🔥</span>
            <span><b>340</b> Walk Score</span>
            <span><b>13%</b> of the year</span>
          </div>
        </header>

        <div className="th-trail">
          {STOPS.map((s, i) => (
            <div key={i} className={`th-stop th-${s.state}`}>
              <div className="th-node"><span>{s.icon}</span></div>
              <div className="th-stopcard">
                <b>{s.label}</b>
                <span>{s.sub}</span>
              </div>
            </div>
          ))}
          <div className="th-stop th-goal">
            <div className="th-node th-star">✦</div>
            <div className="th-stopcard th-goalcard"><b>Day 365 · The whole story</b><span>where this path is leading</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}

const CSS = `
  *{box-sizing:border-box}
  .th{--gold:#E3C074;--gold2:#c9a24b;--ink:#e9efe9;--mut:#9bb0a8;--line:rgba(227,192,116,.16);
    min-height:100vh;margin:0;padding:0 0 90px;font-family:Inter,system-ui,sans-serif;color:var(--ink);
    background:radial-gradient(900px 700px at 50% -10%,rgba(60,110,90,.2),transparent 55%),linear-gradient(170deg,#0b1714,#101d28)}
  .th a{color:inherit;text-decoration:none}
  .th h1{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400}
  .th-back{display:inline-block;color:var(--mut);font-size:13px;padding:18px 0 0 22px}.th-back:hover{color:var(--gold)}
  .th-main{max-width:600px;margin:0 auto;padding:30px 24px 0}
  .th-head{text-align:center;margin-bottom:36px}
  .th-kick{font-size:11px;letter-spacing:2.6px;color:var(--gold);font-weight:600}
  .th-head h1{font-size:40px;margin:10px 0 8px}
  .th-head p{color:var(--mut);font-size:15px;margin:0 0 18px}
  .th-stats{display:inline-flex;gap:22px;flex-wrap:wrap;justify-content:center;font-size:13px;color:var(--mut)}
  .th-stats b{color:var(--gold);font-family:"Instrument Serif",Georgia,serif;font-size:18px}
  .th-trail{position:relative;padding-left:8px}
  .th-trail:before{content:"";position:absolute;left:35px;top:20px;bottom:20px;width:2px;background:linear-gradient(to bottom,var(--gold),rgba(227,192,116,.15))}
  .th-stop{position:relative;display:flex;align-items:center;gap:20px;padding:11px 0}
  .th-node{position:relative;z-index:1;width:56px;height:56px;min-width:56px;border-radius:50%;display:grid;place-items:center;font-size:20px;background:rgba(16,29,40,.9);border:1px solid var(--line)}
  .th-now .th-node{background:radial-gradient(circle,rgba(227,192,116,.3),rgba(16,29,40,.9));border-color:var(--gold);box-shadow:0 0 22px rgba(227,192,116,.4)}
  .th-stopcard{flex:1;background:rgba(18,32,40,.6);border:1px solid var(--line);border-radius:14px;padding:16px 18px;backdrop-filter:blur(8px);transition:transform .18s,border-color .18s}
  .th-stopcard:hover{transform:translateX(4px);border-color:rgba(227,192,116,.45)}
  .th-stopcard b{display:block;font-size:16px}.th-stopcard span{font-size:13px;color:var(--mut)}
  .th-now .th-stopcard{border-color:rgba(227,192,116,.4)}
  .th-star{font-size:24px;color:#0b1714;background:linear-gradient(150deg,var(--gold),var(--gold2));border:none;box-shadow:0 0 26px rgba(227,192,116,.5)}
  .th-goalcard{background:rgba(227,192,116,.08)}.th-goalcard b{color:var(--gold)}
  @media (prefers-reduced-motion:no-preference){
    .th-now .th-node{animation:th-p 4s ease-in-out infinite}@keyframes th-p{0%,100%{box-shadow:0 0 20px rgba(227,192,116,.35)}50%{box-shadow:0 0 30px rgba(227,192,116,.55)}}
  }
`;
