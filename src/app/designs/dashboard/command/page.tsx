import Link from "next/link";

export const dynamic = "force-static";
export const metadata = { title: "Concept · Command Deck", robots: { index: false } };

export default function Command() {
  return (
    <div className="cd">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Link href="/designs/dashboard" className="cd-back">← All concepts</Link>
      <div className="cd-shell">
        <aside className="cd-rail">
          <span className="cd-logo">✦</span>
          <nav>
            <a className="on" title="Dashboard">◆</a>
            <a title="Journey">🧭</a>
            <a title="Pathlight">✶</a>
            <a title="Prayer">✍</a>
            <a title="Memory">📖</a>
            <a title="Wall">💬</a>
          </nav>
          <span className="cd-railme">LJ</span>
        </aside>

        <main className="cd-main">
          <div className="cd-top">
            <div><div className="cd-kick">FRIDAY · JUNE 26</div><h1>Good morning, Lulu.</h1></div>
            <span className="cd-tier">PATRON</span>
          </div>

          <div className="cd-bento">
            {/* score */}
            <div className="cd-tile cd-score">
              <span className="cd-t">WALK SCORE</span>
              <div className="cd-bignum">340</div>
              <div className="cd-level">Sprouting</div>
              <div className="cd-bar"><span style={{ width: "62%" }} /></div>
              <span className="cd-sub">60 to Rooted</span>
            </div>
            {/* streak / north star */}
            <div className="cd-tile cd-streak">
              <span className="cd-t">STREAK</span>
              <div className="cd-starwrap"><span className="cd-star" /><b>12</b></div>
              <span className="cd-sub">days · lit today 🔥</span>
            </div>
            {/* journey wide */}
            <div className="cd-tile cd-journey">
              <span className="cd-t">YOUR JOURNEY · DAY 47 OF 365</span>
              <svg viewBox="0 0 600 50" preserveAspectRatio="none">
                <line x1="14" y1="40" x2="586" y2="12" stroke="rgba(120,170,255,.2)" strokeWidth="2" />
                <line x1="14" y1="40" x2="290" y2="26" stroke="#6aa6ff" strokeWidth="3" strokeLinecap="round" />
                <circle cx="290" cy="26" r="5" fill="#6aa6ff" className="cd-you" />
                <circle cx="586" cy="12" r="4" fill="#E3C074" />
              </svg>
              <span className="cd-sub">13% of the way — pick up where you left off</span>
            </div>
            {/* devotional big */}
            <div className="cd-tile cd-dev">
              <span className="cd-t">TODAY&apos;S DEVOTIONAL</span>
              <div className="cd-vk">MATTHEW 28:6</div>
              <h2>He defeats death and stays with us always</h2>
              <p>“He is not here, for he has risen, just like he said.” The same power that emptied the grave walks with you into today.</p>
              <a className="cd-btn">Read →</a>
            </div>
            {/* memory */}
            <div className="cd-tile cd-mem">
              <span className="cd-t">📖 MEMORY VERSE</span>
              <div className="cd-memcard"><b>Psalm 23:1</b><span>tap to reveal</span></div>
            </div>
            {/* video */}
            <div className="cd-tile cd-vid">
              <span className="cd-t">▶ THIS WEEK</span>
              <div className="cd-vidthumb">▶</div>
              <b>Finding Peace in the Storm</b><span className="cd-sub">The Bible Project</span>
            </div>
            {/* wall */}
            <div className="cd-tile cd-wall">
              <span className="cd-t">♥ ENCOURAGEMENT WALL</span>
              <div className="cd-wrow"><span className="cd-av b">MR</span><p><b>Maria</b> · Keep walking, everyone! 🙌 <span>❤️ 14</span></p></div>
              <div className="cd-wrow"><span className="cd-av g">DV</span><p><b>David</b> · Grateful for this circle. <span>❤️ 21</span></p></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const CSS = `
  *{box-sizing:border-box}
  .cd{--blue:#6aa6ff;--gold:#E3C074;--ink:#e9eef7;--mut:#8fa0bb;--line:rgba(255,255,255,.08);--tile:rgba(17,26,43,.7);
    min-height:100vh;margin:0;padding:18px;font-family:Inter,system-ui,sans-serif;color:var(--ink);
    background:radial-gradient(900px 600px at 100% 0%,rgba(60,100,180,.22),transparent 55%),linear-gradient(160deg,#0a0f1a,#111a2b)}
  .cd a{color:inherit;text-decoration:none}
  .cd h1,.cd h2{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400}
  .cd-back{display:inline-block;color:var(--mut);font-size:13px;margin-bottom:14px}.cd-back:hover{color:var(--blue)}
  .cd-shell{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:72px 1fr;gap:18px}
  .cd-rail{position:sticky;top:18px;height:calc(100vh - 36px);background:rgba(13,20,34,.6);border:1px solid var(--line);border-radius:20px;padding:16px 0;display:flex;flex-direction:column;align-items:center;gap:8px;backdrop-filter:blur(10px)}
  .cd-logo{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-size:18px;color:#0a0f1a;background:linear-gradient(150deg,var(--gold),#c9a24b);margin-bottom:8px}
  .cd-rail nav{display:flex;flex-direction:column;gap:6px;flex:1}
  .cd-rail nav a{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;font-size:17px;color:var(--mut);transition:.16s}
  .cd-rail nav a:hover{background:rgba(255,255,255,.05);color:#fff}
  .cd-rail nav a.on{color:#0a0f1a;background:linear-gradient(150deg,var(--blue),#3f7fe0);box-shadow:0 6px 16px rgba(80,130,220,.4)}
  .cd-railme{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;color:var(--blue);background:#0a0f1a;box-shadow:0 0 0 2px #0a0f1a,0 0 0 4px rgba(106,166,255,.5)}
  .cd-main{min-width:0}
  .cd-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
  .cd-kick{font-size:11px;letter-spacing:2.4px;color:var(--blue);font-weight:600}
  .cd-top h1{font-size:32px;margin:6px 0 0}
  .cd-tier{font-family:Arial;font-size:10px;letter-spacing:1.5px;font-weight:800;color:var(--gold);border:1px solid rgba(227,192,116,.4);padding:5px 12px;border-radius:20px}
  .cd-bento{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;grid-auto-rows:minmax(120px,auto)}
  .cd-tile{background:var(--tile);border:1px solid var(--line);border-radius:18px;padding:18px 20px;backdrop-filter:blur(8px);transition:transform .18s,border-color .18s}
  .cd-tile:hover{transform:translateY(-3px);border-color:rgba(106,166,255,.4)}
  .cd-t{font-size:9.5px;letter-spacing:1.8px;color:var(--mut);font-weight:700}
  .cd-sub{font-size:12px;color:var(--mut)}
  .cd-score{grid-column:span 1}
  .cd-bignum{font-family:"Instrument Serif",Georgia,serif;font-size:44px;color:var(--gold);line-height:1;margin:8px 0 2px}
  .cd-level{font-size:14px;margin-bottom:8px}
  .cd-bar{height:6px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:6px}.cd-bar span{display:block;height:100%;background:linear-gradient(90deg,#c9a24b,var(--gold))}
  .cd-streak{grid-column:span 1;text-align:center}
  .cd-starwrap{position:relative;width:60px;height:60px;margin:6px auto 4px;display:grid;place-items:center}
  .cd-star{position:absolute;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle,#fff,var(--gold) 46%,transparent 74%);box-shadow:0 0 22px 6px rgba(227,192,116,.5)}
  .cd-starwrap b{position:relative;font-size:20px;font-weight:800;color:#0a0f1a}
  .cd-journey{grid-column:span 2;display:flex;flex-direction:column;justify-content:center}
  .cd-journey svg{width:100%;height:50px;margin:8px 0}
  .cd-dev{grid-column:span 2;grid-row:span 2}
  .cd-vk{font-size:11px;letter-spacing:2px;color:var(--gold);margin:8px 0 6px}
  .cd-dev h2{font-size:26px;line-height:1.12;margin-bottom:10px}.cd-dev p{color:var(--mut);font-size:14px;line-height:1.6}
  .cd-btn{display:inline-block;margin-top:14px;padding:10px 20px;border-radius:11px;font-size:13px;font-weight:700;color:#0a0f1a;background:linear-gradient(150deg,var(--blue),#3f7fe0)}
  .cd-mem{grid-column:span 2}
  .cd-memcard{margin-top:10px;border:1px solid rgba(227,192,116,.3);border-radius:12px;padding:18px;text-align:center;background:rgba(227,192,116,.05)}
  .cd-memcard b{font-family:"Instrument Serif",Georgia,serif;font-size:22px;display:block}.cd-memcard span{font-size:11px;color:var(--mut)}
  .cd-vid{grid-column:span 2}
  .cd-vidthumb{aspect-ratio:16/9;border-radius:11px;background:rgba(0,0,0,.4);display:grid;place-items:center;font-size:20px;margin:10px 0 8px}
  .cd-vid b{display:block;font-size:14.5px}
  .cd-wall{grid-column:span 4}
  .cd-wrow{display:flex;align-items:center;gap:10px;margin-top:10px}
  .cd-av{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;color:#fff;flex:none}.cd-av.b{background:linear-gradient(150deg,#5b86c4,#3a5d96)}.cd-av.g{background:linear-gradient(150deg,#5aa982,#3c7d5e)}
  .cd-wrow p{font-size:13px;color:var(--mut);margin:0}.cd-wrow b{color:var(--ink)}.cd-wrow span{color:var(--mut);margin-left:6px;font-size:11.5px}
  @media (prefers-reduced-motion:no-preference){
    .cd-star{animation:cd-p 4.5s ease-in-out infinite}@keyframes cd-p{0%,100%{box-shadow:0 0 22px 6px rgba(227,192,116,.45)}50%{box-shadow:0 0 30px 10px rgba(227,192,116,.65)}}
    .cd-you{animation:cd-y 3s ease-in-out infinite}@keyframes cd-y{0%,100%{opacity:1}50%{opacity:.5}}
  }
  @media (max-width:920px){.cd-bento{grid-template-columns:repeat(2,1fr)}.cd-dev,.cd-journey,.cd-mem,.cd-vid,.cd-wall{grid-column:span 2}}
  @media (max-width:560px){.cd-shell{grid-template-columns:1fr}.cd-rail{flex-direction:row;height:auto;position:static}.cd-rail nav{flex-direction:row}.cd-bento,.cd-dev,.cd-journey,.cd-mem,.cd-vid,.cd-wall,.cd-score,.cd-streak{grid-column:span 1!important}.cd-bento{grid-template-columns:1fr}}
`;
