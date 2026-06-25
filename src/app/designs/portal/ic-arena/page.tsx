import Link from "next/link";

export const metadata = { title: "Portal — The Arena", robots: { index: false } };
export const dynamic = "force-static";

export default function ArenaPortalPage() {
  return (
    <div className="pf-icarena">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-icarena{
  --bg:#0c1322; --bg2:#16263f; --panel:#101b2e; --panel2:#13233b;
  --gold:#E3C074; --gold-deep:#B8902E; --emerald:#3ECf8E; --clay:#E06A4F;
  --ink:#E8EEF7; --mute:#9DB0C9; --line:rgba(227,192,116,.18);
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(227,192,116,.10), transparent 60%),
    radial-gradient(900px 500px at -10% 110%, rgba(62,207,142,.06), transparent 60%),
    linear-gradient(160deg,#0c1322 0%, #0e1830 45%, #16263f 100%);
  color:var(--ink);
  min-height:100vh;
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.pf-icarena *{box-sizing:border-box}
.pf-icarena a{color:inherit;text-decoration:none}
.pf-icarena .pf-serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif}

.pf-icarena .pf-shell{display:flex;gap:0;max-width:1150px;margin:0 auto;min-height:100vh}

/* SIDEBAR */
.pf-icarena .pf-side{
  width:248px;flex:0 0 248px;padding:22px 18px;
  background:linear-gradient(180deg,rgba(12,19,34,.96),rgba(16,27,46,.92));
  border-right:1px solid var(--line);
  display:flex;flex-direction:column;gap:24px;position:sticky;top:0;height:100vh;
}
.pf-icarena .pf-brand{display:flex;align-items:center;gap:12px}
.pf-icarena .pf-logo{
  width:46px;height:46px;border-radius:13px;display:grid;place-items:center;font-size:24px;
  background:linear-gradient(150deg,var(--gold),var(--gold-deep));
  box-shadow:0 6px 18px rgba(227,192,116,.32),inset 0 1px 0 rgba(255,255,255,.4);
}
.pf-icarena .pf-bname{font-weight:700;font-size:15px;letter-spacing:.2px}
.pf-icarena .pf-bsub{font-size:10px;letter-spacing:.22em;color:var(--gold);font-weight:600;margin-top:2px}

.pf-icarena .pf-nav{display:flex;flex-direction:column;gap:3px}
.pf-icarena .pf-nav a{
  display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;
  font-size:14px;color:var(--mute);font-weight:500;transition:all .18s ease;
}
.pf-icarena .pf-nav a .ic{width:18px;text-align:center;font-size:15px}
.pf-icarena .pf-nav a:hover{background:rgba(227,192,116,.08);color:var(--ink);transform:translateX(2px)}
.pf-icarena .pf-nav a.active{
  color:#0c1322;font-weight:700;
  background:linear-gradient(120deg,var(--gold),var(--gold-deep));
  box-shadow:0 6px 16px rgba(227,192,116,.28);
}

.pf-icarena .pf-side-foot{margin-top:auto;display:flex;align-items:center;gap:11px;padding:10px;border-radius:12px;background:rgba(255,255,255,.03);border:1px solid var(--line)}
.pf-icarena .pf-ring{
  width:42px;height:42px;border-radius:50%;display:grid;place-items:center;
  font-weight:700;font-size:14px;color:#0c1322;flex:0 0 42px;
  background:linear-gradient(135deg,var(--gold),var(--gold-deep));
  box-shadow:0 0 0 2px var(--bg),0 0 0 4px rgba(227,192,116,.5);
}
.pf-icarena .pf-side-foot .nm{font-size:13px;font-weight:600}
.pf-icarena .pf-side-foot .tg{font-size:10px;letter-spacing:.16em;color:var(--gold);font-weight:700}

/* MAIN */
.pf-icarena .pf-main{flex:1;padding:24px 30px 60px;min-width:0}
.pf-icarena .pf-back{font-size:13px;color:var(--mute);display:inline-block;margin-bottom:18px;transition:color .15s}
.pf-icarena .pf-back:hover{color:var(--gold)}

.pf-icarena .pf-hero{margin-bottom:24px}
.pf-icarena .pf-kicker{font-size:11px;letter-spacing:.24em;color:var(--gold);font-weight:700}
.pf-icarena .pf-hero h1{font-size:40px;line-height:1.05;margin:8px 0 6px;font-weight:400}
.pf-icarena .pf-hero p{color:var(--mute);font-size:14px;max-width:560px;margin:0 0 14px}
.pf-icarena .pf-chips{display:flex;flex-wrap:wrap;gap:9px}
.pf-icarena .pf-chip{
  display:inline-flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;
  font-size:13px;font-weight:600;background:rgba(255,255,255,.04);
  border:1px solid var(--line);color:var(--ink);
}

.pf-icarena .pf-grid{display:grid;grid-template-columns:1.6fr 1fr;gap:18px;align-items:start}
.pf-icarena .pf-card{
  background:linear-gradient(180deg,var(--panel),var(--panel2));
  border:1px solid var(--line);border-radius:18px;padding:20px;
  box-shadow:0 16px 40px rgba(0,0,0,.32);
}
.pf-icarena .pf-card-h{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:16px}
.pf-icarena .pf-card-h h2{font-size:13px;letter-spacing:.2em;font-weight:700;color:var(--gold)}
.pf-icarena .pf-card-h .sub{font-size:11px;color:var(--mute)}

/* LEADERBOARD */
.pf-icarena .pf-lb{grid-column:1 / -1;background:
  radial-gradient(600px 300px at 90% 0%, rgba(227,192,116,.10), transparent 60%),
  linear-gradient(180deg,#0b1424,#10203a);}
.pf-icarena .pf-lb-row{
  position:relative;display:grid;grid-template-columns:auto auto 1fr auto;align-items:center;gap:16px;
  padding:16px 18px;border-radius:14px;margin-bottom:12px;
  background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06);
  overflow:hidden;transition:transform .2s ease,box-shadow .2s ease;
}
.pf-icarena .pf-lb-row:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,.4)}
.pf-icarena .pf-lb-row.gold{
  border-color:rgba(227,192,116,.5);
  background:linear-gradient(100deg,rgba(227,192,116,.14),rgba(184,144,46,.05));
}
.pf-icarena .pf-rank{font-family:"Instrument Serif",Georgia,serif;font-size:26px;width:26px;text-align:center;color:var(--mute)}
.pf-icarena .pf-lb-row.gold .pf-rank{color:var(--gold)}

.pf-icarena .pf-av{
  width:54px;height:54px;border-radius:50%;display:grid;place-items:center;
  font-weight:800;font-size:16px;color:#0c1322;position:relative;
}
.pf-icarena .pf-av.g1{background:linear-gradient(135deg,#F4D88A,#C9A24B);box-shadow:0 0 0 3px #0b1424,0 0 0 6px rgba(227,192,116,.7)}
.pf-icarena .pf-av.g2{background:linear-gradient(135deg,#E6E9EE,#A9B2BE);box-shadow:0 0 0 3px #0b1424,0 0 0 6px rgba(200,208,220,.6)}
.pf-icarena .pf-av.g3{background:linear-gradient(135deg,#E2A877,#B06A3A);box-shadow:0 0 0 3px #0b1424,0 0 0 6px rgba(196,120,66,.6)}

.pf-icarena .pf-who .nm{font-weight:700;font-size:16px;display:flex;align-items:center;gap:8px}
.pf-icarena .pf-you{font-size:9px;letter-spacing:.14em;background:var(--gold);color:#0c1322;padding:2px 7px;border-radius:6px;font-weight:800}
.pf-icarena .pf-who .who-sub{font-size:12px;color:var(--mute);margin-top:3px}
.pf-icarena .pf-statchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
.pf-icarena .pf-sc{
  display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;
  padding:4px 8px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
}
.pf-icarena .pf-sc b{color:var(--ink)}
.pf-icarena .pf-sc.e{border-color:rgba(62,207,142,.4);color:var(--emerald)}
.pf-icarena .pf-sc.c{border-color:rgba(224,106,79,.45);color:var(--clay)}
.pf-icarena .pf-sc.gd{border-color:rgba(227,192,116,.45);color:var(--gold)}

.pf-icarena .pf-xp{text-align:right;flex:0 0 auto}
.pf-icarena .pf-xp .n{font-family:"Instrument Serif",Georgia,serif;font-size:30px;line-height:1;color:var(--gold)}
.pf-icarena .pf-xp .l{font-size:10px;letter-spacing:.18em;color:var(--mute);margin-top:2px}
.pf-icarena .pf-lb-cap{text-align:center;font-size:12px;color:var(--mute);font-style:italic;margin-top:6px}

/* WALK SCORE + CHART */
.pf-icarena .pf-ws-num{font-family:"Instrument Serif",Georgia,serif;font-size:54px;line-height:1;color:var(--gold)}
.pf-icarena .pf-ws-lab{font-size:12px;color:var(--mute);margin:4px 0 16px}
.pf-icarena .pf-bar{height:10px;border-radius:999px;background:rgba(255,255,255,.06);overflow:hidden;margin-bottom:6px}
.pf-icarena .pf-bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--gold-deep),var(--gold));width:var(--w,70%)}
.pf-icarena .pf-bar-l{display:flex;justify-content:space-between;font-size:11px;color:var(--mute);margin-bottom:14px}
.pf-icarena .pf-chart{width:100%;height:auto;display:block}

/* BADGES */
.pf-icarena .pf-badges{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}
.pf-icarena .pf-badge{
  aspect-ratio:1;border-radius:14px;display:grid;place-items:center;font-size:24px;
  background:radial-gradient(circle at 50% 35%,rgba(227,192,116,.22),rgba(255,255,255,.03));
  border:1px solid var(--line);transition:transform .2s ease,box-shadow .2s ease;
}
.pf-icarena .pf-badge:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 22px rgba(227,192,116,.3)}
.pf-icarena .pf-badge.lock{font-size:11px;letter-spacing:.1em;color:var(--mute);background:rgba(255,255,255,.02);border-style:dashed}

/* DEVOTIONAL */
.pf-icarena .pf-dev h3{font-family:"Instrument Serif",Georgia,serif;font-size:24px;margin:0 0 8px;color:var(--ink)}
.pf-icarena .pf-dev blockquote{margin:0 0 14px;font-size:13px;color:var(--mute);font-style:italic;border-left:2px solid var(--gold);padding-left:12px}
.pf-icarena .pf-link{display:inline-flex;align-items:center;gap:6px;color:var(--gold);font-weight:700;font-size:13px}
.pf-icarena .pf-link:hover{color:#F4D88A}

/* WALL */
.pf-icarena .pf-wall .note{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px}
.pf-icarena .pf-wall .note:last-of-type{border-bottom:none}
.pf-icarena .pf-wall .wa{width:30px;height:30px;border-radius:50%;flex:0 0 30px;display:grid;place-items:center;font-size:11px;font-weight:700;color:#0c1322;background:linear-gradient(135deg,var(--gold),var(--gold-deep))}
.pf-icarena .pf-wall .note .tx{flex:1;color:var(--ink)}
.pf-icarena .pf-wall .note .tx b{color:var(--gold)}
.pf-icarena .pf-react{display:inline-flex;gap:5px}
.pf-icarena .pf-react span{font-size:11px;padding:2px 7px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid var(--line)}
.pf-icarena .pf-wall-foot{margin-top:12px}

@media (max-width:880px){
  .pf-icarena .pf-shell{flex-direction:column}
  .pf-icarena .pf-side{width:auto;flex:none;height:auto;position:static;flex-direction:row;flex-wrap:wrap;align-items:center}
  .pf-icarena .pf-nav{flex-direction:row;flex-wrap:wrap;flex:1}
  .pf-icarena .pf-side-foot{margin:0}
  .pf-icarena .pf-grid{grid-template-columns:1fr}
  .pf-icarena .pf-hero h1{font-size:32px}
  .pf-icarena .pf-lb-row{grid-template-columns:auto auto 1fr;gap:10px}
  .pf-icarena .pf-xp{grid-column:1 / -1;text-align:left}
  .pf-icarena .pf-badges{grid-template-columns:repeat(3,1fr)}
}

/* ANIMATIONS */
@media (prefers-reduced-motion: no-preference){
  .pf-icarena .pf-lb-row.gold::after{
    content:"";position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.22) 50%,transparent 70%);
    transform:translateX(-120%);animation:pf-sweep 4.5s ease-in-out infinite;
  }
  @keyframes pf-sweep{0%{transform:translateX(-120%)}55%,100%{transform:translateX(120%)}}

  .pf-icarena .pf-av.g1{animation:pf-glow 2.6s ease-in-out infinite}
  @keyframes pf-glow{
    0%,100%{box-shadow:0 0 0 3px #0b1424,0 0 0 6px rgba(227,192,116,.7),0 0 12px rgba(227,192,116,.4)}
    50%{box-shadow:0 0 0 3px #0b1424,0 0 0 6px rgba(227,192,116,.9),0 0 26px rgba(227,192,116,.75)}
  }

  .pf-icarena .pf-flame{display:inline-block;animation:pf-flame 1.4s ease-in-out infinite;transform-origin:bottom center}
  @keyframes pf-flame{0%,100%{transform:scale(1) rotate(-3deg)}50%{transform:scale(1.18) rotate(3deg)}}

  .pf-icarena .pf-bar i{width:0;animation:pf-fill 1.5s cubic-bezier(.22,1,.36,1) forwards}
  @keyframes pf-fill{to{width:var(--w,70%)}}

  .pf-icarena .pf-line{stroke-dasharray:600;stroke-dashoffset:600;animation:pf-draw 1.8s ease forwards .2s}
  @keyframes pf-draw{to{stroke-dashoffset:0}}
  .pf-icarena .pf-area{opacity:0;animation:pf-area 1s ease forwards 1.4s}
  @keyframes pf-area{to{opacity:1}}

  .pf-icarena .pf-badge:nth-child(3){animation:pf-pulse 3s ease-in-out infinite}
  @keyframes pf-pulse{0%,100%{box-shadow:0 0 0 rgba(227,192,116,0)}50%{box-shadow:0 0 18px rgba(227,192,116,.45)}}
}
`,
        }}
      />

      <div className="pf-shell">
        {/* SIDEBAR */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-logo" aria-hidden>👣</div>
            <div>
              <div className="pf-bname pf-serif">The Daily Walk</div>
              <div className="pf-bsub">INNER CIRCLE</div>
            </div>
          </div>

          <nav className="pf-nav">
            <a className="active" href="#"><span className="ic">▣</span> Dashboard</a>
            <a href="#"><span className="ic">🧭</span> My Journey</a>
            <a href="#"><span className="ic">✨</span> Daily Wonders</a>
            <a href="#"><span className="ic">🙏</span> Prayer</a>
            <a href="#"><span className="ic">📖</span> Scripture Memory</a>
            <a href="#"><span className="ic">💬</span> Prayer Wall</a>
            <a href="#"><span className="ic">⚙️</span> My Settings</a>
          </nav>

          <div className="pf-side-foot">
            <div className="pf-ring">LJ</div>
            <div>
              <div className="nm">Lulu</div>
              <div className="tg">PATRON</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="pf-main">
          <Link href="/designs/portal" className="pf-back">← All portal designs</Link>

          <section className="pf-hero">
            <div className="pf-kicker">SATURDAY, JUNE 25</div>
            <h1 className="pf-serif">Good afternoon, Lulu.</h1>
            <p>You're top of the circle this week — keep showing up. Iron sharpens iron.</p>
            <div className="pf-chips">
              <span className="pf-chip"><span className="pf-flame">🔥</span> 12-day streak</span>
              <span className="pf-chip">📖 Day 47 of 365</span>
              <span className="pf-chip">⭐ Walk Score 340</span>
            </div>
          </section>

          <div className="pf-grid">
            {/* LEADERBOARD */}
            <section className="pf-card pf-lb">
              <div className="pf-card-h">
                <h2>THE INNER CIRCLE · WEEKLY</h2>
                <span className="sub">Resets Sunday 12am</span>
              </div>

              <div className="pf-lb-row gold">
                <div className="pf-rank">1</div>
                <div className="pf-av g1">LJ</div>
                <div className="pf-who">
                  <div className="nm">Lulu Jimenez <span className="pf-you">YOU</span></div>
                  <div className="who-sub"><span className="pf-flame">🔥</span> 12-day streak · on fire</div>
                  <div className="pf-statchips">
                    <span className="pf-sc gd">✅ <b>7</b> days</span>
                    <span className="pf-sc c">🔥 <b>12</b> streak</span>
                    <span className="pf-sc">📖 <b>18</b> verses</span>
                    <span className="pf-sc e">🙏 <b>9</b> prayers</span>
                    <span className="pf-sc">🕊️ <b>6</b> reflections</span>
                  </div>
                </div>
                <div className="pf-xp">
                  <div className="n">1,240</div>
                  <div className="l">XP</div>
                </div>
              </div>

              <div className="pf-lb-row">
                <div className="pf-rank">2</div>
                <div className="pf-av g2">MR</div>
                <div className="pf-who">
                  <div className="nm">Maria Reyes</div>
                  <div className="who-sub">9-day streak · steady</div>
                  <div className="pf-statchips">
                    <span className="pf-sc gd">✅ <b>6</b> days</span>
                    <span className="pf-sc c">🔥 <b>9</b> streak</span>
                    <span className="pf-sc">📖 <b>15</b> verses</span>
                    <span className="pf-sc e">🙏 <b>11</b> prayers</span>
                    <span className="pf-sc">🕊️ <b>4</b> reflections</span>
                  </div>
                </div>
                <div className="pf-xp">
                  <div className="n">1,085</div>
                  <div className="l">XP</div>
                </div>
              </div>

              <div className="pf-lb-row">
                <div className="pf-rank">3</div>
                <div className="pf-av g3">DK</div>
                <div className="pf-who">
                  <div className="nm">David Kim</div>
                  <div className="who-sub">7-day streak · climbing</div>
                  <div className="pf-statchips">
                    <span className="pf-sc gd">✅ <b>5</b> days</span>
                    <span className="pf-sc c">🔥 <b>7</b> streak</span>
                    <span className="pf-sc">📖 <b>12</b> verses</span>
                    <span className="pf-sc e">🙏 <b>6</b> prayers</span>
                    <span className="pf-sc">🕊️ <b>3</b> reflections</span>
                  </div>
                </div>
                <div className="pf-xp">
                  <div className="n">920</div>
                  <div className="l">XP</div>
                </div>
              </div>

              <p className="pf-lb-cap">Iron sharpens iron — not a contest. We rise together.</p>
            </section>

            {/* WALK SCORE + CHART */}
            <section className="pf-card">
              <div className="pf-card-h"><h2>WALK SCORE</h2><span className="sub">This week</span></div>
              <div className="pf-ws-num">340</div>
              <div className="pf-ws-lab">+42 from last week — your best yet</div>

              <div className="pf-bar-l"><span>Consistency</span><span>86%</span></div>
              <div className="pf-bar"><i style={{ ["--w" as string]: "86%" }} /></div>
              <div className="pf-bar-l"><span>Reflection depth</span><span>72%</span></div>
              <div className="pf-bar"><i style={{ ["--w" as string]: "72%" }} /></div>
              <div className="pf-bar-l" style={{ marginTop: "4px" }}><span>Prayer rhythm</span><span>64%</span></div>
              <div className="pf-bar"><i style={{ ["--w" as string]: "64%" }} /></div>

              <svg className="pf-chart" viewBox="0 0 300 120" role="img" aria-label="Weekly score chart" style={{ marginTop: "14px" }}>
                <defs>
                  <linearGradient id="pfArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E3C074" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#E3C074" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="pfStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#B8902E" />
                    <stop offset="100%" stopColor="#F4D88A" />
                  </linearGradient>
                </defs>
                <path className="pf-area" d="M0,95 L45,80 L90,85 L135,55 L180,60 L225,35 L270,40 L300,22 L300,120 L0,120 Z" fill="url(#pfArea)" />
                <path className="pf-line" d="M0,95 L45,80 L90,85 L135,55 L180,60 L225,35 L270,40 L300,22" fill="none" stroke="url(#pfStroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </section>

            {/* BADGES */}
            <section className="pf-card">
              <div className="pf-card-h"><h2>BADGES</h2><span className="sub">5 of 24 earned</span></div>
              <div className="pf-badges">
                <div className="pf-badge" title="First steps">👣</div>
                <div className="pf-badge" title="Streak keeper">🔥</div>
                <div className="pf-badge" title="Generous heart">💛</div>
                <div className="pf-badge" title="Scripture devotion">📖</div>
                <div className="pf-badge" title="Prayer warrior">🙏</div>
                <div className="pf-badge lock" title="Locked">✦ secret</div>
              </div>
            </section>

            {/* DEVOTIONAL */}
            <section className="pf-card pf-dev">
              <div className="pf-card-h"><h2>TODAY'S DEVOTIONAL</h2><span className="sub">3 min read</span></div>
              <h3>He tore the veil from His side</h3>
              <blockquote>"The veil of the temple was torn in two…" — Matthew 27:51</blockquote>
              <Link href="#" className="pf-link">Read today's →</Link>
            </section>

            {/* WALL */}
            <section className="pf-card pf-wall" style={{ gridColumn: "1 / -1" }}>
              <div className="pf-card-h"><h2>ENCOURAGEMENT WALL</h2><span className="sub">Community</span></div>
              <div className="note">
                <div className="wa">MR</div>
                <div className="tx"><b>Maria</b> — Praying for your week, Lulu. So proud of your streak! 🔥</div>
                <div className="pf-react"><span>🙏 4</span><span>💛 7</span></div>
              </div>
              <div className="note">
                <div className="wa">DK</div>
                <div className="tx"><b>David</b> — That Matthew 27 reflection wrecked me (in a good way).</div>
                <div className="pf-react"><span>🕊️ 3</span><span>💛 5</span></div>
              </div>
              <div className="pf-wall-foot"><Link href="#" className="pf-link">Post a note →</Link></div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
