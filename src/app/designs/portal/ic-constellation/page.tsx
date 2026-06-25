import Link from "next/link";

export const metadata = { title: "Portal — Constellation", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-icconst">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-icconst{
  --navy0:#0b1424; --navy1:#16263f; --navy2:#1c3354; --navy-card:#13233c;
  --gold:#E3C074; --gold-2:#caa658; --blue:#7fb0ff; --blue-soft:#9cc3ff;
  --jewel-rose:#e98fb0; --jewel-emer:#6fd6c0; --jewel-amethyst:#b79bff;
  --ink:#eef3fb; --muted:#a9bbd6; --muted2:#7c91b3; --line:rgba(255,255,255,.08);
  color:var(--ink);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  background:
    radial-gradient(1100px 700px at 78% -8%, rgba(127,176,255,.10), transparent 60%),
    radial-gradient(900px 600px at 10% 110%, rgba(227,192,116,.07), transparent 60%),
    linear-gradient(160deg,#0b1424 0%, #16263f 60%, #11203a 100%);
  min-height:100vh;
  line-height:1.55;
}
.pf-icconst *{box-sizing:border-box;}
.pf-icconst a{color:inherit;text-decoration:none;}

.pf-icconst .shell{display:flex;min-height:100vh;max-width:1380px;margin:0 auto;}

/* SIDEBAR */
.pf-icconst .side{
  width:248px;flex:0 0 248px;padding:22px 18px;
  background:linear-gradient(180deg, rgba(8,15,28,.92), rgba(10,18,34,.65));
  border-right:1px solid var(--line);
  display:flex;flex-direction:column;gap:22px;position:sticky;top:0;height:100vh;
  backdrop-filter:blur(4px);
}
.pf-icconst .brand{display:flex;align-items:center;gap:12px;}
.pf-icconst .logo{
  width:44px;height:44px;border-radius:13px;display:grid;place-items:center;font-size:22px;
  background:linear-gradient(145deg,var(--gold),var(--gold-2));
  box-shadow:0 6px 18px rgba(227,192,116,.35), inset 0 1px 0 rgba(255,255,255,.5);
}
.pf-icconst .brand .name{font-family:"Instrument Serif",Georgia,serif;font-size:20px;line-height:1.05;}
.pf-icconst .brand .ic{font-size:10px;letter-spacing:.22em;color:var(--gold);margin-top:3px;}
.pf-icconst nav{display:flex;flex-direction:column;gap:3px;margin-top:4px;}
.pf-icconst nav a{
  display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;
  color:var(--muted);font-size:14px;font-weight:500;transition:background .2s,color .2s;
}
.pf-icconst nav a .ico{width:20px;text-align:center;}
.pf-icconst nav a:hover{background:rgba(255,255,255,.05);color:var(--ink);}
.pf-icconst nav a.active{
  background:linear-gradient(90deg, rgba(227,192,116,.18), rgba(227,192,116,.04));
  color:#fff;box-shadow:inset 0 0 0 1px rgba(227,192,116,.28);
}
.pf-icconst .side-foot{margin-top:auto;display:flex;align-items:center;gap:11px;padding:10px;border-top:1px solid var(--line);}
.pf-icconst .ring{
  width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;color:#10203a;
  background:linear-gradient(145deg,var(--gold),var(--gold-2));
  box-shadow:0 0 0 2px rgba(11,20,36,1), 0 0 0 4px rgba(227,192,116,.55), 0 0 18px rgba(227,192,116,.35);
}
.pf-icconst .side-foot .who{font-size:14px;font-weight:600;}
.pf-icconst .side-foot .tier{font-size:10px;letter-spacing:.18em;color:var(--jewel-amethyst);}

/* MAIN */
.pf-icconst .main{flex:1;min-width:0;padding:24px 30px 60px;}
.pf-icconst .wrap{max-width:1150px;margin:0 auto;}
.pf-icconst .backlink{color:var(--muted);font-size:13px;display:inline-flex;gap:6px;align-items:center;}
.pf-icconst .backlink:hover{color:var(--gold);}

/* HERO */
.pf-icconst .hero{
  position:relative;overflow:hidden;margin-top:16px;border-radius:22px;padding:38px 34px 34px;
  background:linear-gradient(135deg,#102441,#0c1a30 70%);
  border:1px solid var(--line);
  box-shadow:0 20px 50px rgba(0,0,0,.4);
}
.pf-icconst .hero .kicker{font-size:11px;letter-spacing:.26em;color:var(--gold);font-weight:600;}
.pf-icconst .hero h1{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:40px;line-height:1.06;margin:10px 0 8px;}
.pf-icconst .hero p.sub{color:var(--muted);max-width:560px;margin:0;font-size:15px;}
.pf-icconst .chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;position:relative;z-index:2;}
.pf-icconst .chip{
  display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;font-size:13px;font-weight:600;
  background:rgba(255,255,255,.05);border:1px solid var(--line);backdrop-filter:blur(3px);
}
.pf-icconst .chip b{color:var(--gold);font-weight:700;}

/* starfield */
.pf-icconst .starfield{position:absolute;inset:0;z-index:1;pointer-events:none;}
.pf-icconst .star{position:absolute;border-radius:50%;background:#fff;opacity:.5;}
.pf-icconst .star.g{background:var(--gold);box-shadow:0 0 6px rgba(227,192,116,.8);}
.pf-icconst .star.b{background:var(--blue-soft);box-shadow:0 0 6px rgba(156,195,255,.8);}

/* GRID */
.pf-icconst .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:22px;}
.pf-icconst .card{
  position:relative;border-radius:18px;padding:22px;background:var(--navy-card);
  border:1px solid var(--line);box-shadow:0 10px 30px rgba(0,0,0,.28);
  transition:transform .25s, box-shadow .25s, border-color .25s;
}
.pf-icconst .card:hover{transform:translateY(-3px);border-color:rgba(227,192,116,.35);box-shadow:0 18px 44px rgba(0,0,0,.4), 0 0 30px rgba(227,192,116,.12);}
.pf-icconst .card.full{grid-column:1 / -1;}
.pf-icconst .card h3{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:21px;margin:0 0 4px;}
.pf-icconst .card .eyebrow{font-size:10px;letter-spacing:.22em;color:var(--gold);font-weight:600;text-transform:uppercase;}

/* STAR-PATH */
.pf-icconst .pathwrap{position:relative;}
.pf-icconst .pathwrap svg{display:block;width:100%;height:auto;}
.pf-icconst .pathlabel{
  display:inline-flex;align-items:center;gap:8px;margin-top:6px;font-size:13px;color:var(--muted);
}
.pf-icconst .pathlabel b{color:var(--gold);}

/* WALK SCORE */
.pf-icconst .score-num{font-family:"Instrument Serif",Georgia,serif;font-size:54px;line-height:1;color:var(--gold);}
.pf-icconst .score-row{display:flex;align-items:baseline;gap:12px;margin:8px 0 4px;}
.pf-icconst .level-pill{font-size:11px;letter-spacing:.12em;font-weight:700;color:var(--jewel-emer);background:rgba(111,214,192,.12);padding:5px 11px;border-radius:999px;border:1px solid rgba(111,214,192,.3);}
.pf-icconst .bar{height:12px;border-radius:999px;background:rgba(255,255,255,.07);overflow:hidden;margin-top:14px;border:1px solid var(--line);}
.pf-icconst .bar > i{display:block;height:100%;width:60%;border-radius:999px;
  background:linear-gradient(90deg,var(--gold),#f3deaf);box-shadow:0 0 14px rgba(227,192,116,.6);}
.pf-icconst .bar-legend{display:flex;justify-content:space-between;font-size:11px;color:var(--muted2);margin-top:8px;}

/* CHART */
.pf-icconst .chart svg{width:100%;height:auto;display:block;}

/* LEADERBOARD */
.pf-icconst .lb-row{display:flex;align-items:center;gap:14px;padding:12px 6px;border-bottom:1px solid var(--line);}
.pf-icconst .lb-row:last-child{border-bottom:none;}
.pf-icconst .lb-rank{width:18px;color:var(--muted2);font-size:13px;font-weight:700;text-align:center;}
.pf-icconst .lb-av{
  width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;color:#10203a;flex:0 0 40px;
  background:linear-gradient(145deg,#cdd9ef,#9fb4d6);box-shadow:0 0 0 2px var(--navy-card),0 0 0 4px rgba(156,195,255,.4);
}
.pf-icconst .lb-av.you{background:linear-gradient(145deg,var(--gold),var(--gold-2));box-shadow:0 0 0 2px var(--navy-card),0 0 0 4px rgba(227,192,116,.6),0 0 18px rgba(227,192,116,.5);}
.pf-icconst .lb-name{flex:1;min-width:0;}
.pf-icconst .lb-name .n{font-weight:600;font-size:14px;}
.pf-icconst .lb-name .you-tag{font-size:10px;color:var(--gold);letter-spacing:.1em;}
.pf-icconst .lb-stats{display:flex;gap:7px;flex-wrap:wrap;}
.pf-icconst .ministat{font-size:11px;color:var(--muted);background:rgba(255,255,255,.05);padding:3px 8px;border-radius:999px;}
.pf-icconst .lb-pts{font-family:"Instrument Serif",Georgia,serif;font-size:22px;color:var(--gold);width:54px;text-align:right;}

/* BADGES */
.pf-icconst .badges{display:flex;flex-wrap:wrap;gap:12px;margin-top:6px;}
.pf-icconst .badge{
  width:64px;height:64px;border-radius:16px;display:grid;place-items:center;font-size:26px;position:relative;
  background:radial-gradient(circle at 50% 38%, rgba(227,192,116,.22), rgba(255,255,255,.03));
  border:1px solid rgba(227,192,116,.28);box-shadow:0 0 18px rgba(227,192,116,.18);
}
.pf-icconst .badge.locked{background:rgba(255,255,255,.03);border:1px dashed rgba(255,255,255,.14);color:var(--muted2);box-shadow:none;font-size:13px;letter-spacing:.05em;}

/* DEVOTIONAL */
.pf-icconst .dev .verse{font-style:italic;color:var(--muted);font-size:14px;margin:6px 0 0;}
.pf-icconst .dev .ref{font-size:12px;color:var(--muted2);margin-top:4px;}
.pf-icconst .readlink{display:inline-flex;gap:6px;align-items:center;margin-top:16px;color:var(--gold);font-weight:600;font-size:14px;}
.pf-icconst .readlink:hover{color:#f3deaf;}

/* WALL */
.pf-icconst .wall-note{display:flex;gap:11px;align-items:flex-start;padding:11px 0;border-bottom:1px solid var(--line);}
.pf-icconst .wall-note:last-of-type{border-bottom:none;}
.pf-icconst .wall-av{width:30px;height:30px;border-radius:50%;flex:0 0 30px;display:grid;place-items:center;font-size:11px;font-weight:700;color:#10203a;background:linear-gradient(145deg,#cdd9ef,#9fb4d6);}
.pf-icconst .wall-txt{font-size:13px;color:var(--ink);flex:1;}
.pf-icconst .wall-txt .who{color:var(--gold);font-weight:600;}
.pf-icconst .react{display:flex;gap:6px;margin-top:6px;}
.pf-icconst .react span{font-size:11px;background:rgba(255,255,255,.05);padding:2px 8px;border-radius:999px;color:var(--muted);}
.pf-icconst .postlink{display:inline-block;margin-top:12px;color:var(--gold);font-weight:600;font-size:13px;}

/* responsive */
@media (max-width:900px){
  .pf-icconst .shell{flex-direction:column;}
  .pf-icconst .side{width:100%;height:auto;position:static;flex-direction:row;flex-wrap:wrap;align-items:center;gap:14px;}
  .pf-icconst nav{flex-direction:row;flex-wrap:wrap;margin:0;}
  .pf-icconst .side-foot{margin:0 0 0 auto;border-top:none;}
  .pf-icconst .grid{grid-template-columns:1fr;}
  .pf-icconst .hero h1{font-size:32px;}
}

/* ANIMATIONS */
@media (prefers-reduced-motion: no-preference){
  @keyframes pf-tw{0%,100%{opacity:.25;transform:scale(.8);}50%{opacity:1;transform:scale(1.25);}}
  .pf-icconst .star{animation:pf-tw 3.4s ease-in-out infinite;}
  .pf-icconst .star.d1{animation-delay:.4s;} .pf-icconst .star.d2{animation-delay:.9s;}
  .pf-icconst .star.d3{animation-delay:1.5s;} .pf-icconst .star.d4{animation-delay:2.1s;}
  .pf-icconst .star.d5{animation-delay:2.7s;} .pf-icconst .star.d6{animation-delay:1.1s;}

  @keyframes pf-shimmer{0%{stroke-dashoffset:60;}100%{stroke-dashoffset:0;}}
  .pf-icconst .pf-shimline{stroke-dasharray:6 8;animation:pf-shimmer 4s linear infinite;}

  @keyframes pf-glow{0%,100%{r:7;opacity:1;}50%{r:10;opacity:.85;}}
  .pf-icconst .pf-here-core{animation:pf-glow 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}
  @keyframes pf-halo{0%,100%{opacity:.35;r:14;}50%{opacity:.7;r:20;}}
  .pf-icconst .pf-here-halo{animation:pf-halo 2.4s ease-in-out infinite;}

  @keyframes pf-flame{0%,100%{transform:scale(1) rotate(-2deg);opacity:1;}50%{transform:scale(1.18) rotate(3deg);opacity:.85;}}
  .pf-icconst .flame{display:inline-block;animation:pf-flame 1.6s ease-in-out infinite;transform-origin:bottom center;}

  @keyframes pf-fill{from{width:0;}to{width:60%;}}
  .pf-icconst .bar > i{animation:pf-fill 1.6s cubic-bezier(.3,.8,.3,1) both;}

  @keyframes pf-draw{from{stroke-dashoffset:600;}to{stroke-dashoffset:0;}}
  .pf-icconst .chart .pf-chartline{stroke-dasharray:600;animation:pf-draw 2.2s ease-out both;}

  @keyframes pf-ringpulse{0%,100%{box-shadow:0 0 0 2px var(--navy-card),0 0 0 4px rgba(227,192,116,.6),0 0 14px rgba(227,192,116,.4);}50%{box-shadow:0 0 0 2px var(--navy-card),0 0 0 4px rgba(227,192,116,.85),0 0 26px rgba(227,192,116,.75);}}
  .pf-icconst .lb-av.you,.pf-icconst .ring{animation:pf-ringpulse 3s ease-in-out infinite;}
}
`,
        }}
      />

      <div className="shell">
        {/* SIDEBAR */}
        <aside className="side">
          <div className="brand">
            <div className="logo">👣</div>
            <div>
              <div className="name">The Daily Walk</div>
              <div className="ic">INNER CIRCLE</div>
            </div>
          </div>

          <nav>
            <a className="active" href="#"><span className="ico">🏠</span> Dashboard</a>
            <a href="#"><span className="ico">✨</span> My Journey</a>
            <a href="#"><span className="ico">🌅</span> Daily Wonders</a>
            <a href="#"><span className="ico">🙏</span> Prayer</a>
            <a href="#"><span className="ico">📖</span> Scripture Memory</a>
            <a href="#"><span className="ico">💬</span> Prayer Wall</a>
            <a href="#"><span className="ico">⚙️</span> My Settings</a>
          </nav>

          <div className="side-foot">
            <div className="ring">LJ</div>
            <div>
              <div className="who">Lulu</div>
              <div className="tier">PATRON</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          <div className="wrap">
            <Link className="backlink" href="/designs/portal">← All portal designs</Link>

            {/* HERO */}
            <section className="hero">
              <div className="starfield" aria-hidden="true">
                <i className="star g d1" style={{ top: "16%", left: "12%", width: 3, height: 3 }} />
                <i className="star b d3" style={{ top: "28%", left: "30%", width: 2, height: 2 }} />
                <i className="star d2" style={{ top: "12%", left: "48%", width: 2, height: 2 }} />
                <i className="star g d5" style={{ top: "60%", left: "20%", width: 3, height: 3 }} />
                <i className="star b d4" style={{ top: "70%", left: "44%", width: 2, height: 2 }} />
                <i className="star d6" style={{ top: "22%", left: "66%", width: 2, height: 2 }} />
                <i className="star g d2" style={{ top: "48%", left: "78%", width: 3, height: 3 }} />
                <i className="star b d1" style={{ top: "78%", left: "70%", width: 2, height: 2 }} />
                <i className="star d3" style={{ top: "38%", left: "90%", width: 2, height: 2 }} />
                <i className="star g d4" style={{ top: "84%", left: "88%", width: 3, height: 3 }} />
                <i className="star d5" style={{ top: "8%", left: "82%", width: 2, height: 2 }} />
                <i className="star b d6" style={{ top: "54%", left: "55%", width: 2, height: 2 }} />
              </div>

              <div className="kicker">SATURDAY, JUNE 25</div>
              <h1>Good afternoon, Lulu.</h1>
              <p className="sub">
                The sun is up and so is your faithfulness. Here&apos;s your walk with God today.
              </p>

              <div className="chips">
                <span className="chip"><span className="flame">🔥</span> <b>12-day</b> streak</span>
                <span className="chip">📖 Day <b>47</b> of 365</span>
                <span className="chip">⭐ Walk Score <b>340</b></span>
              </div>
            </section>

            <div className="grid">
              {/* STAR-PATH */}
              <section className="card full">
                <div className="eyebrow">Bible-in-a-Year</div>
                <h3>Your journey star-path</h3>
                <div className="pathwrap">
                  <svg viewBox="0 0 1000 200" role="img" aria-label="Constellation path, Day 47 of 365">
                    <defs>
                      <radialGradient id="pf-hereg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff5dd" />
                        <stop offset="55%" stopColor="#E3C074" />
                        <stop offset="100%" stopColor="#caa658" />
                      </radialGradient>
                      <linearGradient id="pf-lineg" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#E3C074" />
                        <stop offset="100%" stopColor="#7fb0ff" />
                      </linearGradient>
                    </defs>

                    {/* connecting lines */}
                    {(() => {
                      const pts = [
                        [40, 150], [120, 110], [200, 140], [300, 90], [380, 120],
                        [470, 150], [560, 100], [650, 130], [740, 80], [820, 120],
                        [900, 95], [965, 140],
                      ];
                      const lines = [];
                      for (let i = 0; i < pts.length - 1; i++) {
                        const a = pts[i], b = pts[i + 1];
                        const done = i < 1;
                        lines.push(
                          <line
                            key={"l" + i}
                            x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
                            stroke={done ? "url(#pf-lineg)" : "rgba(255,255,255,.18)"}
                            strokeWidth={done ? 2 : 1.2}
                            className={done ? "pf-shimline" : ""}
                          />
                        );
                      }
                      const dots = pts.map((p, i) => {
                        const here = i === 1; // "you are here" — early on the path (47/365)
                        if (here) {
                          return (
                            <g key={"d" + i}>
                              <circle className="pf-here-halo" cx={p[0]} cy={p[1]} r="14" fill="rgba(227,192,116,.4)" />
                              <circle className="pf-here-core" cx={p[0]} cy={p[1]} r="7" fill="url(#pf-hereg)" />
                            </g>
                          );
                        }
                        const past = i < 1;
                        return (
                          <circle
                            key={"d" + i}
                            cx={p[0]} cy={p[1]} r={past ? 4 : 3.2}
                            fill={past ? "#E3C074" : "#9cc3ff"}
                            opacity={past ? 1 : 0.6}
                          />
                        );
                      });
                      return [...lines, ...dots];
                    })()}

                    <text x="120" y="92" fill="#E3C074" fontSize="13" fontWeight="700" textAnchor="middle">
                      ★ You are here
                    </text>
                    <text x="40" y="178" fill="#7c91b3" fontSize="11">Day 1</text>
                    <text x="965" y="168" fill="#7c91b3" fontSize="11" textAnchor="end">Day 365</text>
                  </svg>
                </div>
                <div className="pathlabel">
                  <span>✦</span> <b>Day 47 of 365</b> — Genesis is behind you; keep following the light.
                </div>
              </section>

              {/* WALK SCORE */}
              <section className="card">
                <div className="eyebrow">Walk Score</div>
                <div className="score-row">
                  <div className="score-num">340</div>
                  <span className="level-pill">GROWING</span>
                </div>
                <div className="bar"><i /></div>
                <div className="bar-legend">
                  <span>Growing</span>
                  <span>60% to Flourishing</span>
                </div>
              </section>

              {/* WEEKLY CHART */}
              <section className="card chart">
                <div className="eyebrow">This week</div>
                <h3>Time in the Word</h3>
                <svg viewBox="0 0 320 150" role="img" aria-label="Weekly activity chart">
                  <defs>
                    <linearGradient id="pf-fillg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(227,192,116,.45)" />
                      <stop offset="100%" stopColor="rgba(127,176,255,0)" />
                    </linearGradient>
                    <linearGradient id="pf-strokeg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E3C074" />
                      <stop offset="100%" stopColor="#7fb0ff" />
                    </linearGradient>
                  </defs>
                  <path d="M10,120 L55,90 L100,100 L145,60 L190,70 L235,40 L280,55 L310,55 L310,140 L10,140 Z" fill="url(#pf-fillg)" />
                  <polyline
                    className="pf-chartline"
                    points="10,120 55,90 100,100 145,60 190,70 235,40 280,55"
                    fill="none" stroke="url(#pf-strokeg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  />
                  {[["10","M"],["55","T"],["100","W"],["145","T"],["190","F"],["235","S"],["280","S"]].map(([x, d]) => (
                    <text key={x} x={x} y="135" fill="#7c91b3" fontSize="10" textAnchor="middle">{d}</text>
                  ))}
                </svg>
              </section>

              {/* LEADERBOARD */}
              <section className="card full">
                <div className="eyebrow">The Inner Circle · this week</div>
                <h3>Leaderboard</h3>
                <div className="lb-row">
                  <div className="lb-rank">1</div>
                  <div className="lb-av you">LJ</div>
                  <div className="lb-name">
                    <div className="n">Lulu <span className="you-tag">· YOU</span></div>
                    <div className="lb-stats">
                      <span className="ministat">🔥 12</span>
                      <span className="ministat">📖 31 verses</span>
                      <span className="ministat">🙏 18 prayers</span>
                    </div>
                  </div>
                  <div className="lb-pts">340</div>
                </div>
                <div className="lb-row">
                  <div className="lb-rank">2</div>
                  <div className="lb-av">MR</div>
                  <div className="lb-name">
                    <div className="n">Maria</div>
                    <div className="lb-stats">
                      <span className="ministat">🔥 9</span>
                      <span className="ministat">📖 27 verses</span>
                      <span className="ministat">🙏 14 prayers</span>
                    </div>
                  </div>
                  <div className="lb-pts">290</div>
                </div>
                <div className="lb-row">
                  <div className="lb-rank">3</div>
                  <div className="lb-av">DV</div>
                  <div className="lb-name">
                    <div className="n">David</div>
                    <div className="lb-stats">
                      <span className="ministat">🔥 7</span>
                      <span className="ministat">📖 22 verses</span>
                      <span className="ministat">🙏 11 prayers</span>
                    </div>
                  </div>
                  <div className="lb-pts">255</div>
                </div>
              </section>

              {/* BADGES */}
              <section className="card">
                <div className="eyebrow">Constellation of grace</div>
                <h3>Your badges</h3>
                <div className="badges">
                  <div className="badge" title="First steps">👣</div>
                  <div className="badge" title="Streak keeper">🔥</div>
                  <div className="badge" title="Heart of worship">💛</div>
                  <div className="badge" title="In the Word">📖</div>
                  <div className="badge" title="Prayer warrior">🙏</div>
                  <div className="badge locked" title="Locked">✦ secret</div>
                </div>
              </section>

              {/* DEVOTIONAL */}
              <section className="card dev">
                <div className="eyebrow">Today&apos;s devotional</div>
                <h3>He tore the veil from His side</h3>
                <p className="verse">&ldquo;The veil of the temple was torn in two&hellip;&rdquo;</p>
                <p className="ref">— Matthew 27:51</p>
                <a className="readlink" href="#">Read today&apos;s →</a>
              </section>

              {/* WALL */}
              <section className="card full">
                <div className="eyebrow">Encouragement wall</div>
                <h3>A word from the circle</h3>
                <div className="wall-note">
                  <div className="wall-av">MR</div>
                  <div className="wall-txt">
                    <span className="who">Maria</span> Praying over a big decision this week — grateful for this place. 🙏
                    <div className="react"><span>🙏 6</span><span>💛 4</span></div>
                  </div>
                </div>
                <div className="wall-note">
                  <div className="wall-av">DV</div>
                  <div className="wall-txt">
                    <span className="who">David</span> Day 40 and the mornings finally feel like a gift, not a chore.
                    <div className="react"><span>✨ 9</span><span>🔥 3</span></div>
                  </div>
                </div>
                <a className="postlink" href="#">Post a note →</a>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
