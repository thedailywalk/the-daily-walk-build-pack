import Link from "next/link";

export const metadata = { title: "Portal — Dark Dawn", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-icdawn">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-icdawn{
  --navy:#0e1626; --navy2:#16263f; --panel:#15233a; --panel2:#1b2e4a;
  --gold:#E3C074; --gold2:#C9A24B; --golddk:#B8902E;
  --ink:#e7edf6; --muted:#9fb1c9; --line:rgba(227,192,116,.16);
  --cream:#FAF6EE;
  background:
    radial-gradient(1200px 600px at 50% 105%, rgba(227,192,116,.10), transparent 60%),
    linear-gradient(160deg, var(--navy), var(--navy2));
  color:var(--ink);
  min-height:100vh;
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.pf-icdawn *{box-sizing:border-box;}
.pf-icdawn a{color:inherit;text-decoration:none;}
.pf-icdawn .pf-serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif;}

.pf-icdawn .pf-shell{
  max-width:1150px;margin:0 auto;padding:22px;
  display:grid;grid-template-columns:248px 1fr;gap:22px;align-items:start;
}
@media (max-width:880px){
  .pf-icdawn .pf-shell{grid-template-columns:1fr;}
}

/* ---------- SIDEBAR ---------- */
.pf-icdawn .pf-side{
  position:sticky;top:22px;
  background:linear-gradient(180deg, rgba(27,46,74,.85), rgba(21,35,58,.85));
  border:1px solid var(--line);border-radius:20px;padding:18px;
  backdrop-filter:blur(8px);
}
@media (max-width:880px){ .pf-icdawn .pf-side{position:static;} }
.pf-icdawn .pf-brand{display:flex;align-items:center;gap:12px;margin-bottom:6px;}
.pf-icdawn .pf-logo{
  width:46px;height:46px;border-radius:14px;display:grid;place-items:center;font-size:22px;
  background:linear-gradient(145deg,var(--gold),var(--golddk));
  box-shadow:0 6px 20px rgba(227,192,116,.35), inset 0 1px 0 rgba(255,255,255,.4);
}
.pf-icdawn .pf-brandname{font-weight:700;font-size:16px;line-height:1.1;}
.pf-icdawn .pf-ic-label{
  font-size:10px;letter-spacing:.18em;font-weight:700;color:var(--gold);margin-top:3px;
}
.pf-icdawn .pf-nav{margin-top:18px;display:flex;flex-direction:column;gap:4px;}
.pf-icdawn .pf-navitem{
  display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:12px;
  color:var(--muted);font-size:14px;font-weight:500;transition:all .2s ease;border:1px solid transparent;
}
.pf-icdawn .pf-navitem .pf-ico{width:20px;text-align:center;font-size:15px;}
.pf-icdawn .pf-navitem:hover{background:rgba(227,192,116,.07);color:var(--ink);}
.pf-icdawn .pf-navitem.pf-active{
  background:linear-gradient(90deg, rgba(227,192,116,.18), rgba(227,192,116,.04));
  color:var(--gold);border-color:var(--line);font-weight:600;
}
.pf-icdawn .pf-sidefoot{
  margin-top:18px;padding-top:16px;border-top:1px solid var(--line);
  display:flex;align-items:center;gap:11px;
}
.pf-icdawn .pf-avatar{
  width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:14px;color:#1a1208;
  background:linear-gradient(145deg,var(--gold),var(--golddk));
  box-shadow:0 0 0 2px var(--navy), 0 0 0 4px var(--gold2);
}
.pf-icdawn .pf-uname{font-weight:600;font-size:14px;}
.pf-icdawn .pf-tier{font-size:10px;letter-spacing:.14em;color:var(--gold);font-weight:700;}

/* ---------- MAIN ---------- */
.pf-icdawn .pf-main{display:flex;flex-direction:column;gap:20px;min-width:0;}
.pf-icdawn .pf-backlink{font-size:13px;color:var(--muted);transition:color .2s;}
.pf-icdawn .pf-backlink:hover{color:var(--gold);}

.pf-icdawn .pf-card{
  background:linear-gradient(180deg, rgba(27,46,74,.6), rgba(21,35,58,.6));
  border:1px solid var(--line);border-radius:20px;padding:22px;
  transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.pf-icdawn .pf-card.pf-hoverable:hover{
  transform:translateY(-3px);
  box-shadow:0 14px 40px rgba(0,0,0,.4), 0 0 0 1px rgba(227,192,116,.25);
  border-color:rgba(227,192,116,.32);
}
.pf-icdawn .pf-eyebrow{
  font-size:11px;letter-spacing:.18em;font-weight:700;color:var(--gold);text-transform:uppercase;
}
.pf-icdawn .pf-h{
  font-family:"Instrument Serif","Playfair Display",Georgia,serif;
  font-size:30px;font-weight:600;line-height:1.15;margin:6px 0 0;
  background:linear-gradient(90deg,#fff,var(--gold) 45%,#fff 60%,var(--gold) 80%);
  background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;
}
.pf-icdawn .pf-cardtitle{font-weight:700;font-size:16px;margin:0 0 14px;display:flex;align-items:center;gap:8px;}
.pf-icdawn .pf-cardtitle .pf-sub{color:var(--muted);font-weight:500;font-size:13px;}

/* ---------- HERO ---------- */
.pf-icdawn .pf-hero{
  position:relative;overflow:hidden;
  background:linear-gradient(180deg, rgba(20,33,55,.85), rgba(14,22,38,.95));
  border:1px solid var(--line);border-radius:24px;padding:26px 26px 0;
}
.pf-icdawn .pf-herotext{position:relative;z-index:3;max-width:560px;}
.pf-icdawn .pf-herosub{color:var(--muted);font-size:15px;line-height:1.5;margin:10px 0 18px;}
.pf-icdawn .pf-chips{display:flex;flex-wrap:wrap;gap:10px;position:relative;z-index:3;padding-bottom:26px;}
.pf-icdawn .pf-chip{
  display:inline-flex;align-items:center;gap:7px;padding:9px 14px;border-radius:999px;font-size:13px;font-weight:600;
  background:rgba(14,22,38,.55);border:1px solid var(--line);backdrop-filter:blur(6px);
}
.pf-icdawn .pf-chip b{color:var(--gold);}

/* sunrise visual */
.pf-icdawn .pf-sunwrap{
  position:absolute;left:0;right:0;bottom:-2px;height:240px;z-index:1;pointer-events:none;overflow:hidden;
}
.pf-icdawn .pf-sun{position:absolute;left:50%;bottom:-130px;transform:translateX(-50%);width:300px;height:300px;}
.pf-icdawn .pf-rays{transform-origin:150px 150px;}
.pf-icdawn .pf-glow{
  position:absolute;left:50%;bottom:-150px;transform:translateX(-50%);
  width:420px;height:420px;border-radius:50%;
  background:radial-gradient(circle, rgba(227,192,116,.45), rgba(227,192,116,.12) 45%, transparent 70%);
  filter:blur(6px);z-index:0;
}
.pf-icdawn .pf-ember{
  position:absolute;bottom:20px;width:5px;height:5px;border-radius:50%;
  background:radial-gradient(circle,var(--gold),rgba(227,192,116,0));opacity:0;
}
.pf-icdawn .pf-e1{left:38%;} .pf-icdawn .pf-e2{left:50%;width:4px;height:4px;}
.pf-icdawn .pf-e3{left:62%;} .pf-icdawn .pf-e4{left:46%;width:6px;height:6px;}
.pf-icdawn .pf-e5{left:56%;}

/* ---------- WALK SCORE ---------- */
.pf-icdawn .pf-bignum{font-family:"Instrument Serif",Georgia,serif;font-size:54px;line-height:1;color:var(--gold);}
.pf-icdawn .pf-level{font-size:13px;color:var(--muted);margin-top:2px;}
.pf-icdawn .pf-level b{color:var(--ink);}
.pf-icdawn .pf-bartrack{
  margin-top:16px;height:12px;border-radius:999px;background:rgba(14,22,38,.7);
  border:1px solid var(--line);overflow:hidden;position:relative;
}
.pf-icdawn .pf-barfill{
  height:100%;width:60%;border-radius:999px;
  background:linear-gradient(90deg,var(--golddk),var(--gold) 60%,#fff);
  box-shadow:0 0 14px rgba(227,192,116,.5);
}
.pf-icdawn .pf-barlabels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:8px;}

/* ---------- GRID rows ---------- */
.pf-icdawn .pf-row2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.pf-icdawn .pf-row3{display:grid;grid-template-columns:1.1fr 1fr;gap:20px;}
@media (max-width:720px){
  .pf-icdawn .pf-row2,.pf-icdawn .pf-row3{grid-template-columns:1fr;}
}

/* chart */
.pf-icdawn .pf-chart{width:100%;height:auto;display:block;}
.pf-icdawn .pf-legend{display:flex;gap:16px;font-size:12px;color:var(--muted);margin-top:10px;}
.pf-icdawn .pf-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px;vertical-align:middle;}

/* leaderboard */
.pf-icdawn .pf-lbrow{display:flex;align-items:center;gap:13px;padding:11px 0;border-bottom:1px solid rgba(227,192,116,.08);}
.pf-icdawn .pf-lbrow:last-child{border-bottom:0;}
.pf-icdawn .pf-rank{width:18px;text-align:center;font-weight:700;color:var(--muted);font-size:14px;}
.pf-icdawn .pf-lbav{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:13px;color:#1a1208;flex:none;}
.pf-icdawn .pf-gold-r{background:linear-gradient(145deg,#f3d98a,#C9A24B);box-shadow:0 0 0 2px var(--panel),0 0 0 4px #E3C074;}
.pf-icdawn .pf-silver-r{background:linear-gradient(145deg,#dfe7f0,#9fb1c9);box-shadow:0 0 0 2px var(--panel),0 0 0 4px #c7d2e0;color:#1a2230;}
.pf-icdawn .pf-bronze-r{background:linear-gradient(145deg,#e0a774,#b06f3b);box-shadow:0 0 0 2px var(--panel),0 0 0 4px #cf8c57;color:#231307;}
.pf-icdawn .pf-lbmid{flex:1;min-width:0;}
.pf-icdawn .pf-lbname{font-weight:600;font-size:14px;}
.pf-icdawn .pf-lbname .pf-you{color:var(--gold);font-size:11px;font-weight:700;margin-left:6px;}
.pf-icdawn .pf-faithchips{display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;}
.pf-icdawn .pf-fchip{font-size:11px;color:var(--muted);background:rgba(14,22,38,.6);border:1px solid var(--line);padding:2px 7px;border-radius:999px;}
.pf-icdawn .pf-lbscore{font-weight:700;color:var(--gold);font-size:15px;}

/* badges */
.pf-icdawn .pf-badges{display:flex;gap:12px;flex-wrap:wrap;}
.pf-icdawn .pf-badge{
  width:60px;height:60px;border-radius:16px;display:grid;place-items:center;font-size:26px;
  background:radial-gradient(circle at 35% 30%, rgba(227,192,116,.25), rgba(14,22,38,.6));
  border:1px solid var(--line);box-shadow:inset 0 0 16px rgba(227,192,116,.18);
  transition:transform .25s ease, box-shadow .25s ease;
}
.pf-icdawn .pf-badge:hover{transform:translateY(-4px) scale(1.05);box-shadow:0 0 22px rgba(227,192,116,.45);}
.pf-icdawn .pf-badge.pf-locked{filter:grayscale(.7);opacity:.55;font-size:18px;color:var(--muted);background:rgba(14,22,38,.55);box-shadow:none;}

/* devotional */
.pf-icdawn .pf-devtitle{font-family:"Instrument Serif",Georgia,serif;font-size:24px;line-height:1.2;margin:2px 0 10px;color:var(--ink);}
.pf-icdawn .pf-verse{font-style:italic;color:var(--muted);font-size:14px;line-height:1.5;border-left:2px solid var(--gold);padding-left:12px;margin-bottom:16px;}
.pf-icdawn .pf-btn{
  display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:12px;font-weight:700;font-size:14px;color:#1a1208;
  background:linear-gradient(145deg,var(--gold),var(--golddk));
  box-shadow:0 6px 18px rgba(227,192,116,.3);transition:transform .2s, box-shadow .2s;
}
.pf-icdawn .pf-btn:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(227,192,116,.45);}

/* encouragement wall (compact) */
.pf-icdawn .pf-wall{padding:16px 18px;}
.pf-icdawn .pf-wall .pf-cardtitle{font-size:14px;margin-bottom:10px;}
.pf-icdawn .pf-note{
  display:flex;align-items:center;gap:9px;font-size:12.5px;color:var(--ink);
  padding:7px 0;border-bottom:1px solid rgba(227,192,116,.07);
}
.pf-icdawn .pf-note:last-of-type{border-bottom:0;}
.pf-icdawn .pf-notav{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;color:#1a1208;background:linear-gradient(145deg,var(--gold),var(--golddk));flex:none;}
.pf-icdawn .pf-notetext{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.pf-icdawn .pf-notetext b{color:var(--gold);font-weight:700;}
.pf-icdawn .pf-rct{font-size:11px;color:var(--muted);flex:none;}
.pf-icdawn .pf-walllink{font-size:12px;color:var(--gold);font-weight:600;margin-top:8px;display:inline-block;}

/* ---------- ANIMATIONS (reduced-motion safe) ---------- */
@media (prefers-reduced-motion: no-preference){
  .pf-icdawn .pf-rays{animation:pf-spin 60s linear infinite;}
  @keyframes pf-spin{to{transform:rotate(360deg);}}

  .pf-icdawn .pf-glow{animation:pf-pulse 5s ease-in-out infinite;}
  @keyframes pf-pulse{0%,100%{opacity:.7;transform:translateX(-50%) scale(1);}50%{opacity:1;transform:translateX(-50%) scale(1.06);}}

  .pf-icdawn .pf-ember{animation:pf-rise 6s ease-in infinite;}
  .pf-icdawn .pf-e1{animation-delay:0s;} .pf-icdawn .pf-e2{animation-delay:1.4s;}
  .pf-icdawn .pf-e3{animation-delay:2.6s;} .pf-icdawn .pf-e4{animation-delay:3.8s;}
  .pf-icdawn .pf-e5{animation-delay:.8s;}
  @keyframes pf-rise{0%{opacity:0;transform:translateY(0) scale(.6);}15%{opacity:1;}100%{opacity:0;transform:translateY(-200px) scale(1.1);}}

  .pf-icdawn .pf-barfill{width:0;animation:pf-fill 1.8s cubic-bezier(.2,.8,.2,1) .3s forwards;}
  @keyframes pf-fill{to{width:60%;}}

  .pf-icdawn .pf-h{animation:pf-shimmer 6s linear infinite;}
  @keyframes pf-shimmer{to{background-position:-200% center;}}

  .pf-icdawn .pf-flame{animation:pf-flicker 2.4s ease-in-out infinite;transform-origin:center;}
  @keyframes pf-flicker{0%,100%{opacity:.85;filter:drop-shadow(0 0 4px rgba(227,192,116,.5));}50%{opacity:1;filter:drop-shadow(0 0 12px rgba(227,192,116,.9));}}

  .pf-icdawn .pf-draw{stroke-dasharray:600;stroke-dashoffset:600;animation:pf-drawin 2.2s ease-out .4s forwards;}
  @keyframes pf-drawin{to{stroke-dashoffset:0;}}

  .pf-icdawn .pf-area{opacity:0;animation:pf-fadein 1.5s ease-out 1.6s forwards;}
  @keyframes pf-fadein{to{opacity:1;}}
}
`,
        }}
      />

      <div className="pf-shell">
        {/* SIDEBAR */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-logo">👣</div>
            <div>
              <div className="pf-brandname">The Daily Walk</div>
              <div className="pf-ic-label">INNER CIRCLE</div>
            </div>
          </div>

          <nav className="pf-nav">
            <a className="pf-navitem pf-active"><span className="pf-ico">🏠</span>Dashboard</a>
            <a className="pf-navitem"><span className="pf-ico">🧭</span>My Journey</a>
            <a className="pf-navitem"><span className="pf-ico">✨</span>Daily Wonders</a>
            <a className="pf-navitem"><span className="pf-ico">🙏</span>Prayer</a>
            <a className="pf-navitem"><span className="pf-ico">📖</span>Scripture Memory</a>
            <a className="pf-navitem"><span className="pf-ico">🧱</span>Prayer Wall</a>
            <a className="pf-navitem"><span className="pf-ico">⚙️</span>My Settings</a>
          </nav>

          <div className="pf-sidefoot">
            <div className="pf-avatar">LJ</div>
            <div>
              <div className="pf-uname">Lulu</div>
              <div className="pf-tier">PATRON</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="pf-main">
          <Link href="/designs/portal" className="pf-backlink">← All portal designs</Link>

          {/* HERO */}
          <section className="pf-hero">
            <div className="pf-herotext">
              <div className="pf-eyebrow">SATURDAY, JUNE 25</div>
              <h1 className="pf-h">Good afternoon, Lulu.</h1>
              <p className="pf-herosub">
                The sun is up and so is your faithfulness. Here's your walk with God today.
              </p>
            </div>

            <div className="pf-chips">
              <span className="pf-chip">🔥 <b>12-day</b> streak</span>
              <span className="pf-chip">📖 Day <b>47</b> of 365</span>
              <span className="pf-chip">⭐ Walk Score <b>340</b></span>
            </div>

            {/* animated sunrise */}
            <div className="pf-sunwrap" aria-hidden="true">
              <div className="pf-glow" />
              <svg className="pf-sun" viewBox="0 0 300 300">
                <defs>
                  <radialGradient id="pf-sungrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff4d6" />
                    <stop offset="55%" stopColor="#E3C074" />
                    <stop offset="100%" stopColor="#C9A24B" />
                  </radialGradient>
                </defs>
                <g className="pf-rays" stroke="#E3C074" strokeWidth="3" strokeLinecap="round" opacity="0.55">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const a = (i * Math.PI * 2) / 16;
                    const x1 = 150 + Math.cos(a) * 95;
                    const y1 = 150 + Math.sin(a) * 95;
                    const x2 = 150 + Math.cos(a) * 135;
                    const y2 = 150 + Math.sin(a) * 135;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                  })}
                </g>
                <circle cx="150" cy="150" r="80" fill="url(#pf-sungrad)" />
                <circle cx="150" cy="150" r="80" fill="none" stroke="#fff4d6" strokeOpacity="0.4" strokeWidth="2" />
              </svg>
              <span className="pf-ember pf-e1" />
              <span className="pf-ember pf-e2" />
              <span className="pf-ember pf-e3" />
              <span className="pf-ember pf-e4" />
              <span className="pf-ember pf-e5" />
            </div>
          </section>

          {/* WALK SCORE + STREAK */}
          <div className="pf-row3">
            <section className="pf-card pf-hoverable">
              <div className="pf-cardtitle">⭐ Walk Score</div>
              <div className="pf-bignum">340</div>
              <div className="pf-level">Level: <b>Growing</b></div>
              <div className="pf-bartrack"><div className="pf-barfill" /></div>
              <div className="pf-barlabels"><span>Growing</span><span>Flourishing</span></div>
            </section>

            <section className="pf-card pf-hoverable" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <svg width="64" height="64" viewBox="0 0 48 48" className="pf-flame" aria-hidden="true">
                <defs>
                  <linearGradient id="pf-flame" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#B8902E" />
                    <stop offset="60%" stopColor="#E3C074" />
                    <stop offset="100%" stopColor="#fff4d6" />
                  </linearGradient>
                </defs>
                <path d="M24 4c4 7-3 9-1 15 1 3 4 3 5-1 3 4 5 8 5 13a13 13 0 1 1-26 0c0-7 5-11 8-16 2-3 1-7 4-11z" fill="url(#pf-flame)" />
              </svg>
              <div className="pf-bignum" style={{ fontSize: "40px" }}>12</div>
              <div className="pf-level">day streak · <b>keep it lit</b></div>
            </section>
          </div>

          {/* WEEKLY CHART */}
          <section className="pf-card pf-hoverable">
            <div className="pf-cardtitle">📈 This week<span className="pf-sub">days walked &amp; verses</span></div>
            <svg className="pf-chart" viewBox="0 0 600 200" preserveAspectRatio="none" role="img" aria-label="Weekly activity chart">
              <defs>
                <linearGradient id="pf-areagrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E3C074" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#E3C074" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(227,192,116,.08)" strokeWidth="1" />
              ))}
              {/* days walked area+line: 5 vs 4 trend */}
              <path className="pf-area" d="M0,150 L100,90 L200,110 L300,70 L400,95 L500,55 L600,80 L600,200 L0,200 Z" fill="url(#pf-areagrad)" />
              <path className="pf-draw" d="M0,150 L100,90 L200,110 L300,70 L400,95 L500,55 L600,80" fill="none" stroke="#E3C074" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {/* verses line: lower */}
              <path className="pf-draw" d="M0,175 L100,150 L200,160 L300,135 L400,150 L500,120 L600,140" fill="none" stroke="#C9A24B" strokeWidth="2" strokeDasharray="2 6" strokeOpacity="0.8" />
            </svg>
            <div className="pf-legend">
              <span><span className="pf-dot" style={{ background: "#E3C074" }} />Days walked — <b style={{ color: "#fff" }}>5</b> vs 4</span>
              <span><span className="pf-dot" style={{ background: "#C9A24B" }} />Verses — <b style={{ color: "#fff" }}>3</b> vs 2</span>
            </div>
          </section>

          {/* LEADERBOARD + BADGES */}
          <div className="pf-row2">
            <section className="pf-card pf-hoverable">
              <div className="pf-cardtitle">🏆 The Inner Circle<span className="pf-sub">this week</span></div>

              <div className="pf-lbrow">
                <div className="pf-rank">1</div>
                <div className="pf-lbav pf-gold-r">LJ</div>
                <div className="pf-lbmid">
                  <div className="pf-lbname">Lulu<span className="pf-you">YOU</span></div>
                  <div className="pf-faithchips">
                    <span className="pf-fchip">🔥 12</span>
                    <span className="pf-fchip">📖 47</span>
                    <span className="pf-fchip">🙏 23</span>
                  </div>
                </div>
                <div className="pf-lbscore">340</div>
              </div>

              <div className="pf-lbrow">
                <div className="pf-rank">2</div>
                <div className="pf-lbav pf-silver-r">M</div>
                <div className="pf-lbmid">
                  <div className="pf-lbname">Maria</div>
                  <div className="pf-faithchips">
                    <span className="pf-fchip">🔥 9</span>
                    <span className="pf-fchip">📖 41</span>
                    <span className="pf-fchip">🙏 18</span>
                  </div>
                </div>
                <div className="pf-lbscore">290</div>
              </div>

              <div className="pf-lbrow">
                <div className="pf-rank">3</div>
                <div className="pf-lbav pf-bronze-r">D</div>
                <div className="pf-lbmid">
                  <div className="pf-lbname">David</div>
                  <div className="pf-faithchips">
                    <span className="pf-fchip">🔥 7</span>
                    <span className="pf-fchip">📖 38</span>
                    <span className="pf-fchip">🙏 15</span>
                  </div>
                </div>
                <div className="pf-lbscore">255</div>
              </div>
            </section>

            <section className="pf-card pf-hoverable">
              <div className="pf-cardtitle">🎖️ Badges</div>
              <div className="pf-badges">
                <div className="pf-badge" title="First steps">👣</div>
                <div className="pf-badge" title="On fire">🔥</div>
                <div className="pf-badge" title="Heart for God">💛</div>
                <div className="pf-badge" title="Word reader">📖</div>
                <div className="pf-badge" title="Prayer warrior">🙏</div>
                <div className="pf-badge pf-locked" title="Locked">✦ secret</div>
              </div>
              <p className="pf-level" style={{ marginTop: "16px" }}>
                5 of 6 unlocked — one mystery badge awaits.
              </p>
            </section>
          </div>

          {/* DEVOTIONAL */}
          <section className="pf-card pf-hoverable">
            <div className="pf-eyebrow">TODAY'S DEVOTIONAL</div>
            <h3 className="pf-devtitle">He tore the veil from His side</h3>
            <p className="pf-verse">
              "The veil of the temple was torn in two…" — Matthew 27:51
            </p>
            <Link href="#" className="pf-btn">Read today's →</Link>
          </section>

          {/* ENCOURAGEMENT WALL — compact */}
          <section className="pf-card pf-wall pf-hoverable">
            <div className="pf-cardtitle">💬 Encouragement Wall</div>
            <div className="pf-note">
              <span className="pf-notav">M</span>
              <span className="pf-notetext"><b>Maria:</b> Praying over your week, Lulu — keep walking!</span>
              <span className="pf-rct">🙏 14 ❤️ 9 🔥 5</span>
            </div>
            <div className="pf-note">
              <span className="pf-notav">D</span>
              <span className="pf-notetext"><b>David:</b> That Matthew reading wrecked me today 🙌</span>
              <span className="pf-rct">🙏 11 ❤️ 7</span>
            </div>
            <Link href="#" className="pf-walllink">Post a note →</Link>
          </section>
        </main>
      </div>
    </div>
  );
}
