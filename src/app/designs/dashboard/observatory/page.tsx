import Link from "next/link";

export const dynamic = "force-static";
export const metadata = { title: "Concept · Observatory", robots: { index: false } };

export default function Observatory() {
  return (
    <div className="ob">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Link href="/designs/dashboard" className="ob-back">← All concepts</Link>
      <div className="ob-shell">
        {/* rail */}
        <aside className="ob-rail">
          <div className="ob-brand"><span className="ob-mark">✦</span><div><b>The Daily Walk</b><small>INNER CIRCLE</small></div></div>
          <nav>
            <a className="on">◆ <span>Dashboard</span></a>
            <a>✶ <span>Pathlight</span></a>
            <a>🧭 <span>My Journey</span></a>
            <a>✍ <span>Prayer Journal</span></a>
            <a>📖 <span>Scripture Memory</span></a>
            <a>🔖 <span>Saved &amp; Notes</span></a>
            <a>🗄 <span>Archive</span></a>
            <a>💬 <span>Prayer Wall</span></a>
          </nav>
          <div className="ob-me"><span className="ob-ring">LJ</span><div><b>Lulu</b><small>PATRON</small></div></div>
        </aside>

        {/* main */}
        <main className="ob-main">
          <section className="ob-hero">
            <div className="ob-sky" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="ob-hero-top">
              <div>
                <div className="ob-kick">FRIDAY, JUNE 26</div>
                <h1>Good morning, Lulu.</h1>
                <p>Before the noise of the day, give God the first few minutes. Everything you need is gathered here.</p>
              </div>
              <div className="ob-north">
                <span className="ob-dove">🕊️</span>
                <span className="ob-star"><span className="ob-flare" /><span className="ob-core" /><b>12</b></span>
                <span className="ob-north-l">YOUR NORTH STAR<br /><em>12-day streak · lit today</em></span>
              </div>
            </div>
            <div className="ob-score">
              <div className="ob-score-n"><b>340</b><span>Walk Score</span></div>
              <div className="ob-score-body">
                <div className="ob-level">Sprouting</div>
                <div className="ob-bar"><span style={{ width: "62%" }} /></div>
                <div className="ob-hint">60 to Rooted — reading, prayer &amp; memorized verses all add up.</div>
              </div>
            </div>
            <div className="ob-journey">
              <div className="ob-jhead"><span>YOUR JOURNEY</span><span>Day 1 — Day 365</span></div>
              <svg viewBox="0 0 900 70" preserveAspectRatio="none">
                <line x1="30" y1="58" x2="870" y2="14" stroke="rgba(227,192,116,.18)" strokeWidth="2" />
                <line x1="30" y1="58" x2="430" y2="37" stroke="#E3C074" strokeWidth="3" strokeLinecap="round" />
                <circle cx="870" cy="14" r="5" fill="#fff" /><circle cx="870" cy="14" r="10" fill="none" stroke="rgba(227,192,116,.5)" strokeWidth="1.5" />
                <circle className="ob-you" cx="430" cy="37" r="6" fill="#E3C074" />
              </svg>
              <div className="ob-jcap">Day 47 · you are here — 13% of the way</div>
            </div>
          </section>

          <div className="ob-grid">
            <section className="ob-card ob-dev">
              <div className="ob-tag">TODAY&apos;S DEVOTIONAL</div>
              <div className="ob-vk">MATTHEW 28:6</div>
              <h2>He defeats death and stays with us always</h2>
              <p>“He is not here, for he has risen, just like he said.” The tomb wasn&apos;t a setback — it was the plan. The same power that emptied that grave walks with you into today.</p>
              <a className="ob-btn">Read today&apos;s walk →</a>
            </section>
            <div className="ob-side">
              <section className="ob-card ob-mem">
                <div className="ob-tag">📖 YOUR MEMORY VERSE</div>
                <div className="ob-mem-card"><b>Psalm 23:1</b><span>tap to reveal the verse</span></div>
              </section>
              <section className="ob-card ob-vid">
                <div className="ob-tag">▶ THIS WEEK&apos;S VIDEO</div>
                <div className="ob-vid-thumb">▶</div>
                <b>Finding Peace in the Storm</b><span>The Bible Project</span>
              </section>
            </div>
          </div>

          <section className="ob-card ob-wall">
            <div className="ob-tag">♥ ENCOURAGEMENT WALL</div>
            <div className="ob-wrow"><span className="ob-av blue">MR</span><div><b>Maria</b><p>Praying for everyone keeping their streak this week — keep walking! 🙌</p><div className="ob-react"><span>❤️ 14</span><span>🙏 9</span></div></div></div>
            <div className="ob-wrow"><span className="ob-av green">DV</span><div><b>David</b><p>That verse hit different this morning. Grateful for this circle.</p><div className="ob-react"><span>❤️ 21</span><span>👏 6</span></div></div></div>
          </section>
        </main>
      </div>
    </div>
  );
}

const CSS = `
  *{box-sizing:border-box}
  .ob{--gold:#E3C074;--gold2:#C9A24B;--ink:#e8edf6;--mut:#9fb0c8;--line:rgba(227,192,116,.16);--card:rgba(18,32,54,.62);
    min-height:100vh;margin:0;padding:18px;font-family:Inter,system-ui,sans-serif;color:var(--ink);
    background:radial-gradient(1100px 720px at 85% -12%,rgba(70,110,170,.24),transparent 60%),linear-gradient(160deg,#0b1424,#16263f)}
  .ob a{color:inherit;text-decoration:none}
  .ob h1,.ob h2{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400}
  .ob-back{display:inline-block;color:var(--mut);font-size:13px;margin-bottom:14px}.ob-back:hover{color:var(--gold)}
  .ob-shell{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:240px 1fr;gap:20px;align-items:start}
  .ob-rail{position:sticky;top:18px;background:rgba(13,24,42,.55);border:1px solid var(--line);border-radius:20px;padding:18px 14px;backdrop-filter:blur(10px)}
  .ob-brand{display:flex;gap:11px;align-items:center;padding:4px 6px 14px;border-bottom:1px solid var(--line)}
  .ob-mark{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:18px;color:#0b1424;background:linear-gradient(150deg,var(--gold),var(--gold2));box-shadow:0 6px 16px rgba(201,162,75,.3)}
  .ob-brand b{font-size:14px}.ob-brand small{display:block;font-size:9px;letter-spacing:2.4px;color:var(--gold);margin-top:2px}
  .ob-rail nav{display:flex;flex-direction:column;gap:2px;margin:14px 0}
  .ob-rail nav a{display:flex;gap:11px;align-items:center;padding:10px 12px;border-radius:11px;font-size:13.5px;color:var(--mut);transition:.16s}
  .ob-rail nav a:hover{color:#fff;background:rgba(255,255,255,.04)}
  .ob-rail nav a.on{color:#0b1424;font-weight:600;background:linear-gradient(150deg,var(--gold),var(--gold2));box-shadow:0 6px 16px rgba(201,162,75,.28)}
  .ob-me{display:flex;gap:11px;align-items:center;padding-top:14px;border-top:1px solid var(--line)}
  .ob-ring{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;color:var(--gold);background:#0b1424;box-shadow:0 0 0 2px #0b1424,0 0 0 4px rgba(227,192,116,.5)}
  .ob-me b{font-size:13px}.ob-me small{display:block;font-size:9px;letter-spacing:2px;color:var(--gold)}
  .ob-main{display:flex;flex-direction:column;gap:18px;min-width:0}
  .ob-hero{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:22px;padding:28px 30px;background:radial-gradient(140% 120% at 50% -30%,rgba(120,160,220,.18),transparent 55%),radial-gradient(80% 90% at 50% 0%,rgba(20,38,66,.92),rgba(8,16,30,.96))}
  .ob-sky{position:absolute;inset:0}.ob-sky i{position:absolute;width:2px;height:2px;border-radius:50%;background:#dce8ff;opacity:.5}
  .ob-sky i:nth-child(1){top:14%;left:12%}.ob-sky i:nth-child(2){top:26%;left:30%}.ob-sky i:nth-child(3){top:20%;left:62%}.ob-sky i:nth-child(4){top:48%;left:84%}.ob-sky i:nth-child(5){top:64%;left:18%}.ob-sky i:nth-child(6){top:72%;left:48%}.ob-sky i:nth-child(7){top:40%;left:70%}.ob-sky i:nth-child(8){top:80%;left:88%}
  .ob-hero-top{position:relative;display:flex;justify-content:space-between;gap:20px}
  .ob-kick{font-size:11px;letter-spacing:2.6px;color:var(--gold);font-weight:600}
  .ob-hero h1{font-size:38px;margin:8px 0 8px}.ob-hero p{color:var(--mut);font-size:14.5px;max-width:430px;line-height:1.55}
  .ob-north{position:relative;width:150px;min-width:150px;text-align:center}
  .ob-dove{position:absolute;top:0;left:8px;font-size:15px;opacity:.9}
  .ob-star{position:relative;width:64px;height:64px;margin:6px auto 0;display:grid;place-items:center}
  .ob-core{width:42px;height:42px;border-radius:50%;background:radial-gradient(circle,#fff,var(--gold) 46%,transparent 74%);box-shadow:0 0 24px 7px rgba(227,192,116,.5)}
  .ob-flare{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
  .ob-flare:before,.ob-flare:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
  .ob-flare:before{width:2px;height:92px;background:linear-gradient(transparent,rgba(255,247,225,.9),transparent)}
  .ob-flare:after{width:70px;height:2px;background:linear-gradient(90deg,transparent,rgba(255,247,225,.8),transparent)}
  .ob-star b{position:absolute;font-size:20px;font-weight:800;color:#0b1424}
  .ob-north-l{display:block;margin-top:8px;font-size:9px;letter-spacing:2px;color:var(--gold)}.ob-north-l em{font-style:normal;font-size:11px;color:var(--mut);letter-spacing:0}
  .ob-score{position:relative;display:flex;gap:18px;align-items:center;margin-top:22px;padding-top:18px;border-top:1px solid var(--line)}
  .ob-score-n{text-align:center}.ob-score-n b{font-family:"Instrument Serif",Georgia,serif;font-size:34px;color:var(--gold)}.ob-score-n span{display:block;font-size:9px;letter-spacing:1.5px;color:var(--mut);text-transform:uppercase}
  .ob-score-body{flex:1}.ob-level{font-family:"Instrument Serif",Georgia,serif;font-size:18px}.ob-bar{height:7px;border-radius:99px;background:rgba(255,255,255,.08);margin:7px 0;overflow:hidden}.ob-bar span{display:block;height:100%;background:linear-gradient(90deg,var(--gold2),var(--gold))}.ob-hint{font-size:12px;color:var(--mut)}
  .ob-journey{position:relative;margin-top:20px;padding-top:16px;border-top:1px solid var(--line)}
  .ob-jhead{display:flex;justify-content:space-between;font-size:10.5px;letter-spacing:2px;color:var(--gold);font-weight:600;margin-bottom:4px}
  .ob-journey svg{display:block;width:100%;height:62px}
  .ob-jcap{font-size:12px;color:var(--mut);margin-top:2px}
  .ob-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:18px;align-items:start}
  .ob-card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:22px;backdrop-filter:blur(8px)}
  .ob-tag{font-size:9.5px;letter-spacing:2px;color:var(--gold);font-weight:700;margin-bottom:10px}
  .ob-vk{font-size:11px;letter-spacing:2px;color:var(--gold);margin-bottom:6px}
  .ob-dev h2{font-size:27px;line-height:1.12;margin-bottom:10px}.ob-dev p{color:var(--mut);font-size:14.5px;line-height:1.6}
  .ob-btn{display:inline-block;margin-top:16px;padding:11px 20px;border-radius:11px;font-size:13.5px;font-weight:700;color:#0b1424;background:linear-gradient(150deg,var(--gold),var(--gold2));transition:transform .16s}
  .ob-btn:hover{transform:translateY(-2px)}
  .ob-side{display:flex;flex-direction:column;gap:18px}
  .ob-mem-card{border:1px solid rgba(227,192,116,.35);border-radius:12px;padding:20px;text-align:center;background:linear-gradient(150deg,rgba(28,44,72,.6),rgba(16,28,48,.6))}
  .ob-mem-card b{font-family:"Instrument Serif",Georgia,serif;font-size:24px;display:block}.ob-mem-card span{font-size:11px;color:var(--mut)}
  .ob-vid-thumb{aspect-ratio:16/9;border-radius:11px;background:rgba(8,16,30,.6);display:grid;place-items:center;font-size:22px;margin-bottom:10px}
  .ob-vid b{display:block;font-size:15px}.ob-vid span{font-size:12.5px;color:var(--mut)}
  .ob-wrow{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05)}.ob-wrow:last-child{border:none}
  .ob-av{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:#fff;flex:none}
  .ob-av.blue{background:linear-gradient(150deg,#5b86c4,#3a5d96)}.ob-av.green{background:linear-gradient(150deg,#5aa982,#3c7d5e)}
  .ob-wrow b{font-size:13.5px}.ob-wrow p{font-size:13px;color:var(--mut);line-height:1.5;margin:3px 0 7px}
  .ob-react span{font-size:11.5px;color:var(--mut);background:rgba(255,255,255,.04);border:1px solid var(--line);padding:3px 8px;border-radius:20px;margin-right:6px}
  @media (prefers-reduced-motion:no-preference){
    .ob-sky i{animation:ob-tw 4.5s ease-in-out infinite}.ob-sky i:nth-child(2n){animation-duration:6s;animation-delay:1s}@keyframes ob-tw{0%,100%{opacity:.2}50%{opacity:.85}}
    .ob-core{animation:ob-p 4.5s ease-in-out infinite}@keyframes ob-p{0%,100%{box-shadow:0 0 24px 7px rgba(227,192,116,.45)}50%{box-shadow:0 0 32px 11px rgba(227,192,116,.65)}}
    .ob-you{animation:ob-y 3s ease-in-out infinite}@keyframes ob-y{0%,100%{opacity:1}50%{opacity:.55}}
    .ob-card{transition:transform .18s,border-color .18s}.ob-card:hover{transform:translateY(-3px);border-color:rgba(227,192,116,.4)}
  }
  @media (max-width:920px){.ob-shell{grid-template-columns:1fr}.ob-rail{position:static}.ob-grid{grid-template-columns:1fr}}
`;
