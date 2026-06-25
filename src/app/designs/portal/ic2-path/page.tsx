import Link from "next/link";

export const metadata = { title: "Portal — Path of Light", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-ic2path">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-ic2path *{box-sizing:border-box;margin:0;padding:0}
.pf-ic2path{
  --navy:#0b1424; --navy2:#16263f; --gold:#E3C074; --gold2:#C9A24B; --golddk:#B8902E;
  --cream:#FAF6EE; --ink:#22262B; --txt:#dfe7f2; --muted:#8ea1bd; --line:rgba(227,192,116,.16);
  --card:rgba(18,32,54,.72); --blue:#7ea8e0; --green:#86d6a8;
  background:
    radial-gradient(1200px 700px at 78% -8%, rgba(126,168,224,.10), transparent 60%),
    radial-gradient(900px 600px at 8% 110%, rgba(227,192,116,.07), transparent 60%),
    linear-gradient(160deg,#0b1424 0%, #16263f 100%);
  min-height:100vh; color:var(--txt);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  font-size:15px; line-height:1.55; padding:0;
}
.pf-ic2path a{color:inherit;text-decoration:none}
.pf-ic2path .serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif;letter-spacing:.2px}
.pf-ic2path .backlink{display:inline-block;padding:14px 22px;color:var(--muted);font-size:13px}
.pf-ic2path .backlink:hover{color:var(--gold)}

.pf-ic2path .shell{display:grid;grid-template-columns:248px 1fr;max-width:1150px;margin:0 auto;gap:0;padding:0 18px 60px}

/* SIDEBAR */
.pf-ic2path .side{padding:18px 14px;position:sticky;top:0;align-self:start;height:100vh;display:flex;flex-direction:column;border-right:1px solid var(--line)}
.pf-ic2path .brand{display:flex;align-items:center;gap:11px;padding:8px 8px 18px}
.pf-ic2path .logo{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-size:20px;
  background:linear-gradient(150deg,var(--gold),var(--golddk));box-shadow:0 6px 18px rgba(227,192,116,.28)}
.pf-ic2path .brand b{font-size:15px;color:var(--cream);display:block;line-height:1.15}
.pf-ic2path .brand span{font-size:10px;letter-spacing:2.4px;color:var(--gold2);font-weight:600}
.pf-ic2path nav{display:flex;flex-direction:column;gap:3px;margin-top:4px}
.pf-ic2path nav a{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;color:var(--muted);font-size:14px}
.pf-ic2path nav a:hover{background:rgba(126,168,224,.07);color:var(--txt)}
.pf-ic2path nav a.active{background:linear-gradient(90deg,rgba(227,192,116,.15),rgba(227,192,116,.02));color:var(--cream);
  box-shadow:inset 2px 0 0 var(--gold)}
.pf-ic2path nav a .ic{width:18px;text-align:center;opacity:.92}
.pf-ic2path .side-foot{margin-top:auto;display:flex;align-items:center;gap:11px;padding:12px 8px;border-top:1px solid var(--line)}
.pf-ic2path .avring{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;color:var(--navy);
  background:linear-gradient(150deg,var(--gold),var(--golddk));box-shadow:0 0 0 2px var(--navy),0 0 0 3.5px rgba(227,192,116,.5)}
.pf-ic2path .side-foot b{font-size:13px;color:var(--cream);display:block}
.pf-ic2path .side-foot span{font-size:10px;letter-spacing:1.8px;color:var(--gold2);font-weight:600}

/* MAIN */
.pf-ic2path .main{padding:18px 4px 0 28px;min-width:0}

/* HERO */
.pf-ic2path .hero{position:relative;overflow:hidden;border-radius:22px;padding:30px 34px 26px;
  border:1px solid var(--line);
  background:
    radial-gradient(700px 320px at 20% 0%, rgba(27,40,64,.9), transparent 70%),
    linear-gradient(165deg,#0a1322 0%, #0e1c30 55%, #102740 100%);
  box-shadow:0 24px 60px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.04)}
.pf-ic2path .sky-stars{position:absolute;inset:0;pointer-events:none}
.pf-ic2path .sky-stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#cfe0ff;opacity:.5}
.pf-ic2path .sky-stars i:nth-child(1){top:14%;left:62%}
.pf-ic2path .sky-stars i:nth-child(2){top:24%;left:80%;width:3px;height:3px}
.pf-ic2path .sky-stars i:nth-child(3){top:40%;left:71%}
.pf-ic2path .sky-stars i:nth-child(4){top:18%;left:46%}
.pf-ic2path .sky-stars i:nth-child(5){top:55%;left:88%}
.pf-ic2path .sky-stars i:nth-child(6){top:9%;left:33%;width:1.5px;height:1.5px}
.pf-ic2path .sky-stars i:nth-child(7){top:62%;left:55%}
.pf-ic2path .sky-stars i:nth-child(8){top:30%;left:92%}

.pf-ic2path .hero-top{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:flex-start;gap:20px}
.pf-ic2path .kicker{font-size:11px;letter-spacing:3px;color:var(--gold2);font-weight:700}
.pf-ic2path .hero h1{font-size:40px;line-height:1.05;color:var(--cream);margin:8px 0 8px;font-weight:400}
.pf-ic2path .hero .sub{color:var(--muted);font-size:14.5px;max-width:430px}
.pf-ic2path .chips{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.pf-ic2path .chip{display:inline-flex;align-items:center;gap:7px;padding:7px 13px;border-radius:999px;font-size:12.5px;
  background:rgba(126,168,224,.08);border:1px solid var(--line);color:var(--txt)}
.pf-ic2path .chip b{color:var(--gold)}

/* time-of-day indicator */
.pf-ic2path .tod{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.pf-ic2path .tod-pills{display:inline-flex;border-radius:999px;overflow:hidden;border:1px solid var(--line);background:rgba(8,16,28,.5)}
.pf-ic2path .tod-pills span{padding:5px 11px;font-size:11px;letter-spacing:1px;color:var(--muted)}
.pf-ic2path .tod-pills span.on{background:linear-gradient(150deg,rgba(227,192,116,.22),rgba(227,192,116,.06));color:var(--gold);font-weight:600}
.pf-ic2path .tod-cap{font-size:11px;color:var(--muted);font-style:italic;max-width:180px;text-align:right}

/* THE PATH OF LIGHT — hero centerpiece */
.pf-ic2path .pathwrap{position:relative;z-index:2;margin-top:22px;border-radius:16px;overflow:hidden;
  border:1px solid rgba(227,192,116,.12);
  background:linear-gradient(180deg,rgba(8,15,28,.55),rgba(12,24,40,.35))}
.pf-ic2path .pathwrap svg{display:block;width:100%;height:auto}
.pf-ic2path .path-labels{position:absolute;inset:0;pointer-events:none}
.pf-ic2path .plab{position:absolute;font-size:11px;letter-spacing:.5px}
.pf-ic2path .plab.start{left:5%;bottom:11%;color:var(--muted)}
.pf-ic2path .plab.here{left:46%;top:8%;transform:translateX(-50%);color:var(--gold);font-weight:700;text-shadow:0 0 12px rgba(227,192,116,.6)}
.pf-ic2path .plab.end{right:4%;top:9%;color:var(--muted);text-align:right}

/* DEVOTIONAL + side column */
.pf-ic2path .grid2{display:grid;grid-template-columns:1.5fr 1fr;gap:18px;margin-top:18px}
.pf-ic2path .card{border:1px solid var(--line);border-radius:18px;background:var(--card);
  box-shadow:0 16px 40px rgba(0,0,0,.35);backdrop-filter:blur(4px)}
.pf-ic2path .dev{padding:26px 28px}
.pf-ic2path .dev .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.pf-ic2path .dev .head .t{font-size:21px;color:var(--cream)}
.pf-ic2path .dev .head .tag{font-size:10px;letter-spacing:2.5px;color:var(--gold2);font-weight:700}
.pf-ic2path .dev .vk{font-size:11px;letter-spacing:2.5px;color:var(--gold2);font-weight:700;margin-bottom:8px}
.pf-ic2path .dev h2{font-size:28px;line-height:1.15;color:var(--cream);font-weight:400;margin-bottom:14px}
.pf-ic2path .dev p{color:var(--txt);opacity:.9;font-size:15px;max-width:54ch}
.pf-ic2path .btn-gold{display:inline-flex;align-items:center;gap:8px;margin-top:20px;padding:12px 22px;border-radius:11px;
  font-size:14px;font-weight:600;color:var(--navy);background:linear-gradient(150deg,var(--gold),var(--golddk));
  box-shadow:0 8px 22px rgba(227,192,116,.28);transition:transform .15s}
.pf-ic2path .btn-gold:hover{transform:translateY(-1px)}

/* ENCOURAGEMENT WALL */
.pf-ic2path .wall{padding:22px 22px}
.pf-ic2path .wall .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.pf-ic2path .wall .head .t{font-size:18px;color:var(--cream)}
.pf-ic2path .wall .head .tag{font-size:10px;letter-spacing:2.5px;color:var(--gold2);font-weight:700}
.pf-ic2path .post{display:flex;gap:12px;padding:13px 0;border-top:1px solid rgba(126,168,224,.1)}
.pf-ic2path .post:first-of-type{border-top:none}
.pf-ic2path .pa{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-size:11px;font-weight:700;color:var(--navy)}
.pf-ic2path .pa.blue{background:linear-gradient(150deg,#9cc0ee,#5d86c2);box-shadow:0 0 0 1.5px rgba(126,168,224,.4)}
.pf-ic2path .pa.green{background:linear-gradient(150deg,#a6e6c2,#5fb888);box-shadow:0 0 0 1.5px rgba(134,214,168,.4)}
.pf-ic2path .post .nm{font-size:13.5px;color:var(--cream);font-weight:600;margin-bottom:3px}
.pf-ic2path .post .msg{font-size:13.5px;color:var(--txt);opacity:.88}
.pf-ic2path .react{display:flex;gap:12px;margin-top:7px;font-size:12px;color:var(--muted)}

/* SECONDARY ROW */
.pf-ic2path .grid3{display:grid;grid-template-columns:1fr 1.3fr;gap:18px;margin-top:18px}
.pf-ic2path .panel{padding:20px 22px}
.pf-ic2path .panel .pt{font-size:11px;letter-spacing:2px;color:var(--gold2);font-weight:700;margin-bottom:14px}
.pf-ic2path .chart-svg{width:100%;height:auto;display:block}

/* leaderboard */
.pf-ic2path .lead{display:flex;align-items:center;gap:11px;padding:9px 0;border-top:1px solid rgba(126,168,224,.1)}
.pf-ic2path .lead:first-of-type{border-top:none}
.pf-ic2path .lr{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:var(--navy);flex-shrink:0}
.pf-ic2path .lr.g{background:linear-gradient(150deg,var(--gold),var(--golddk));box-shadow:0 0 0 2px var(--navy),0 0 0 3px rgba(227,192,116,.55)}
.pf-ic2path .lr.b{background:linear-gradient(150deg,#9cc0ee,#5d86c2)}
.pf-ic2path .lr.gr{background:linear-gradient(150deg,#a6e6c2,#5fb888)}
.pf-ic2path .lead .ln{flex:1;font-size:13.5px;color:var(--cream)}
.pf-ic2path .lead .ln small{color:var(--muted);font-weight:400}
.pf-ic2path .lead .tinychips{font-size:11px;color:var(--muted);margin-right:8px}
.pf-ic2path .lead .sc{font-size:13px;color:var(--gold);font-weight:700}
.pf-ic2path .badges{display:flex;gap:9px;margin-top:16px;flex-wrap:wrap;align-items:center}
.pf-ic2path .badge{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-size:15px;
  background:rgba(126,168,224,.08);border:1px solid var(--line)}
.pf-ic2path .badge.lock{opacity:.45;color:var(--muted)}

@media (max-width:880px){
  .pf-ic2path .shell{grid-template-columns:1fr}
  .pf-ic2path .side{position:static;height:auto;flex-direction:row;flex-wrap:wrap;border-right:none;border-bottom:1px solid var(--line)}
  .pf-ic2path .side nav{flex-direction:row;flex-wrap:wrap}
  .pf-ic2path .side-foot{margin-top:0;border-top:none}
  .pf-ic2path .main{padding-left:4px}
  .pf-ic2path .grid2,.pf-ic2path .grid3{grid-template-columns:1fr}
  .pf-ic2path .hero h1{font-size:32px}
}

@media (prefers-reduced-motion: no-preference){
  @keyframes pf-twinkle{0%,100%{opacity:.25}50%{opacity:.9}}
  .pf-ic2path .sky-stars i{animation:pf-twinkle 3.4s ease-in-out infinite}
  .pf-ic2path .sky-stars i:nth-child(2){animation-delay:.6s}
  .pf-ic2path .sky-stars i:nth-child(3){animation-delay:1.2s}
  .pf-ic2path .sky-stars i:nth-child(4){animation-delay:1.8s}
  .pf-ic2path .sky-stars i:nth-child(5){animation-delay:2.4s}
  .pf-ic2path .sky-stars i:nth-child(6){animation-delay:.9s}
  .pf-ic2path .sky-stars i:nth-child(7){animation-delay:1.5s}
  .pf-ic2path .sky-stars i:nth-child(8){animation-delay:2.1s}

  @keyframes pf-shimmer{0%{stroke-dashoffset:0}100%{stroke-dashoffset:-40}}
  .pf-ic2path .trail-glow{animation:pf-shimmer 6s linear infinite}

  @keyframes pf-pulse{0%,100%{opacity:.55;r:7}50%{opacity:1;r:10}}
  .pf-ic2path .here-pulse{animation:pf-pulse 2.6s ease-in-out infinite;transform-origin:center}

  @keyframes pf-twinkle2{0%,100%{opacity:.4}50%{opacity:1}}
  .pf-ic2path .pstar{animation:pf-twinkle2 3s ease-in-out infinite}
  .pf-ic2path .pstar.d1{animation-delay:.7s}
  .pf-ic2path .pstar.d2{animation-delay:1.4s}
  .pf-ic2path .pstar.d3{animation-delay:2.1s}

  @keyframes pf-northstar{0%,100%{opacity:.7;filter:drop-shadow(0 0 4px rgba(227,192,116,.6))}50%{opacity:1;filter:drop-shadow(0 0 12px rgba(227,192,116,.95))}}
  .pf-ic2path .northstar{animation:pf-northstar 3.8s ease-in-out infinite;transform-origin:center}

  @keyframes pf-dove{0%{offset-distance:0%}100%{offset-distance:100%}}
  @keyframes pf-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  .pf-ic2path .dove{
    offset-path:path('M 60 178 C 200 150, 240 120, 360 110 S 560 80, 660 60');
    animation:pf-dove 14s ease-in-out infinite alternate;offset-rotate:0deg}
  .pf-ic2path .dove-bob{animation:pf-bob 2.4s ease-in-out infinite}
  @keyframes pf-flame{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.18)}}
  .pf-ic2path .flame{animation:pf-flame 1.3s ease-in-out infinite;transform-origin:center}

  @keyframes pf-fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .pf-ic2path .post{animation:pf-fadein .8s ease both}
  .pf-ic2path .post:nth-of-type(2){animation-delay:.25s}

  @keyframes pf-barfill{from{transform:scaleY(0)}to{transform:scaleY(1)}}
  .pf-ic2path .bar{transform-origin:bottom;animation:pf-barfill 1s ease both}
  .pf-ic2path .bar:nth-child(2){animation-delay:.08s}
  .pf-ic2path .bar:nth-child(3){animation-delay:.16s}
  .pf-ic2path .bar:nth-child(4){animation-delay:.24s}
  .pf-ic2path .bar:nth-child(5){animation-delay:.32s}
  .pf-ic2path .bar:nth-child(6){animation-delay:.4s}
  .pf-ic2path .bar:nth-child(7){animation-delay:.48s}
}
`,
        }}
      />

      <Link className="backlink" href="/designs/portal">← All portal designs</Link>

      <div className="shell">
        {/* SIDEBAR */}
        <aside className="side">
          <div className="brand">
            <div className="logo">👣</div>
            <div>
              <b className="serif">The Daily Walk</b>
              <span>INNER CIRCLE</span>
            </div>
          </div>
          <nav>
            <a className="active" href="#"><span className="ic">◆</span> Dashboard</a>
            <a href="#"><span className="ic">🛤️</span> My Journey</a>
            <a href="#"><span className="ic">✨</span> Daily Wonders</a>
            <a href="#"><span className="ic">🙏</span> Prayer</a>
            <a href="#"><span className="ic">📖</span> Scripture Memory</a>
            <a href="#"><span className="ic">💬</span> Prayer Wall</a>
            <a href="#"><span className="ic">⚙️</span> My Settings</a>
          </nav>
          <div className="side-foot">
            <div className="avring">LJ</div>
            <div>
              <b>Lulu</b>
              <span>PATRON</span>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {/* HERO */}
          <section className="hero">
            <div className="sky-stars" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>

            <div className="hero-top">
              <div>
                <div className="kicker">SATURDAY, JUNE 25</div>
                <h1 className="serif">Good afternoon, Lulu.</h1>
                <p className="sub">The sun is up and so is your faithfulness. Here's your walk with God today.</p>
                <div className="chips">
                  <span className="chip">📖 Day <b>47</b> of 365</span>
                  <span className="chip">⭐ Walk Score <b>340</b></span>
                </div>
              </div>
              <div className="tod">
                <div className="tod-pills">
                  <span>morning</span>
                  <span>noon</span>
                  <span className="on">night</span>
                </div>
                <div className="tod-cap">Your sky shifts with the time you arrive.</div>
              </div>
            </div>

            {/* PATH OF LIGHT */}
            <div className="pathwrap">
              <svg viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Your path of light from Day 1 to Day 365, you are at Day 47">
                <defs>
                  <linearGradient id="pf-trailg" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#3a4b66" stopOpacity=".6" />
                    <stop offset=".5" stopColor="#E3C074" stopOpacity=".9" />
                    <stop offset="1" stopColor="#C9A24B" stopOpacity=".55" />
                  </linearGradient>
                  <radialGradient id="pf-here" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#fff3d6" />
                    <stop offset=".4" stopColor="#E3C074" />
                    <stop offset="1" stopColor="#E3C074" stopOpacity="0" />
                  </radialGradient>
                  <filter id="pf-soft" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>

                {/* base trail */}
                <path d="M 60 178 C 200 150, 240 120, 360 110 S 560 80, 660 60"
                  fill="none" stroke="#27384f" strokeWidth="6" strokeLinecap="round" opacity=".7" />
                {/* glowing trail shimmer */}
                <path className="trail-glow" d="M 60 178 C 200 150, 240 120, 360 110 S 560 80, 660 60"
                  fill="none" stroke="url(#pf-trailg)" strokeWidth="2.4" strokeLinecap="round"
                  strokeDasharray="3 9" />

                {/* footprints along the trail */}
                <g fill="#E3C074" opacity=".5">
                  <ellipse cx="110" cy="168" rx="3.2" ry="5" transform="rotate(-18 110 168)" />
                  <ellipse cx="150" cy="158" rx="3.2" ry="5" transform="rotate(-20 150 158)" />
                  <ellipse cx="195" cy="146" rx="3.2" ry="5" transform="rotate(-22 195 146)" />
                  <ellipse cx="245" cy="133" rx="3.2" ry="5" transform="rotate(-22 245 133)" />
                  <ellipse cx="300" cy="121" rx="3.2" ry="5" transform="rotate(-20 300 121)" />
                </g>

                {/* connected stars (milestones) */}
                <circle className="pstar" cx="60" cy="178" r="3.5" fill="#cfe0ff" />
                <circle className="pstar d1" cx="200" cy="146" r="3" fill="#E3C074" />
                <circle className="pstar d2" cx="470" cy="92" r="3" fill="#cfe0ff" />
                <circle className="pstar d3" cx="560" cy="78" r="3" fill="#E3C074" />

                {/* YOU ARE HERE — glowing node at Day 47 */}
                <circle cx="360" cy="110" r="22" fill="url(#pf-here)" filter="url(#pf-soft)" opacity=".85" />
                <circle className="here-pulse" cx="360" cy="110" r="7.5" fill="#fff3d6" />
                <circle cx="360" cy="110" r="4" fill="#fff" />

                {/* NORTH STAR at trail's end (Day 365) — faith beacon carrying the streak */}
                <g className="northstar" transform="translate(660 60)">
                  <path d="M 0 -16 L 3.2 -3.2 L 16 0 L 3.2 3.2 L 0 16 L -3.2 3.2 L -16 0 L -3.2 -3.2 Z"
                    fill="#E3C074" />
                  <circle r="3" fill="#fff5dd" />
                </g>

                {/* DOVE carrying a lantern/flame = streak of 12 */}
                <g className="dove">
                  <g className="dove-bob">
                    {/* dove */}
                    <g fill="#eaf2ff" opacity=".95">
                      <path d="M 0 0 C -8 -6, -16 -4, -20 2 C -14 1, -10 3, -6 6 C -2 3, 4 3, 8 1 C 5 -2, 2 -2, 0 0 Z" />
                      <circle cx="6" cy="-1" r="2.4" />
                    </g>
                    {/* lantern line + flame */}
                    <line x1="-2" y1="6" x2="-2" y2="15" stroke="#C9A24B" strokeWidth="1" />
                    <circle className="flame" cx="-2" cy="18" r="4.5" fill="#E3C074" />
                    <circle className="flame" cx="-2" cy="18" r="2.2" fill="#fff3d6" />
                    <text x="6" y="22" fontSize="9" fontWeight="700" fill="#E3C074">🔥12</text>
                  </g>
                </g>
              </svg>

              <div className="path-labels" aria-hidden="true">
                <div className="plab start">Day 1 · where you began</div>
                <div className="plab here">★ You are here · Day 47</div>
                <div className="plab end">Day 365<br />the journey's crown</div>
              </div>
            </div>
          </section>

          {/* DEVOTIONAL + WALL */}
          <div className="grid2">
            <section className="card dev">
              <div className="head">
                <div className="t serif">Today's Devotional</div>
                <div className="tag">EVENING</div>
              </div>
              <div className="vk">MATTHEW 27:51</div>
              <h2 className="serif">He tore the veil from His side</h2>
              <p>When Jesus breathed His last, the curtain of the temple split from top to bottom— not from the bottom up. The way to God was opened by heaven, not by us.</p>
              <a className="btn-gold" href="#">Read tonight's walk →</a>
            </section>

            <section className="card wall">
              <div className="head">
                <div className="t serif">Encouragement Wall</div>
                <div className="tag">COMMUNITY</div>
              </div>
              <div className="post">
                <div className="pa blue">MR</div>
                <div>
                  <div className="nm">Maria</div>
                  <div className="msg">Praying for everyone keeping their streak this week—keep walking! 🙌</div>
                  <div className="react"><span>❤️ 14</span><span>🙏 9</span><span>🔥 5</span></div>
                </div>
              </div>
              <div className="post">
                <div className="pa green">DV</div>
                <div>
                  <div className="nm">David</div>
                  <div className="msg">That veil verse hit different tonight. Grateful for this community.</div>
                  <div className="react"><span>❤️ 21</span><span>🙏 12</span><span>👏 6</span></div>
                </div>
              </div>
            </section>
          </div>

          {/* SECONDARY: chart + leaderboard */}
          <div className="grid3">
            <section className="card panel">
              <div className="pt">THIS WEEK</div>
              <svg className="chart-svg" viewBox="0 0 240 120" role="img" aria-label="Weekly activity chart">
                <line x1="0" y1="100" x2="240" y2="100" stroke="rgba(142,161,189,.25)" strokeWidth="1" />
                <rect className="bar" x="14" y="55" width="20" height="45" rx="4" fill="#3a4b66" />
                <rect className="bar" x="46" y="40" width="20" height="60" rx="4" fill="#4a6088" />
                <rect className="bar" x="78" y="62" width="20" height="38" rx="4" fill="#3a4b66" />
                <rect className="bar" x="110" y="30" width="20" height="70" rx="4" fill="#C9A24B" />
                <rect className="bar" x="142" y="48" width="20" height="52" rx="4" fill="#4a6088" />
                <rect className="bar" x="174" y="22" width="20" height="78" rx="4" fill="#E3C074" />
                <rect className="bar" x="206" y="44" width="20" height="56" rx="4" fill="#4a6088" />
                <g fontSize="8" fill="#8ea1bd" textAnchor="middle">
                  <text x="24" y="113">M</text><text x="56" y="113">T</text><text x="88" y="113">W</text>
                  <text x="120" y="113">T</text><text x="152" y="113">F</text><text x="184" y="113">S</text>
                  <text x="216" y="113">S</text>
                </g>
              </svg>
            </section>

            <section className="card panel">
              <div className="pt">THE INNER CIRCLE · THIS WEEK</div>
              <div className="lead">
                <div className="lr g">LJ</div>
                <div className="ln">Lulu <small>· you</small></div>
                <div className="tinychips">🔥 📖 🙏</div>
                <div className="sc">340</div>
              </div>
              <div className="lead">
                <div className="lr b">MR</div>
                <div className="ln">Maria</div>
                <div className="tinychips">🔥 📖</div>
                <div className="sc">290</div>
              </div>
              <div className="lead">
                <div className="lr gr">DV</div>
                <div className="ln">David</div>
                <div className="tinychips">📖 🙏</div>
                <div className="sc">255</div>
              </div>
              <div className="badges">
                <div className="badge" title="First steps">👣</div>
                <div className="badge" title="Streak">🔥</div>
                <div className="badge" title="Generous heart">💛</div>
                <div className="badge" title="Reader">📖</div>
                <div className="badge" title="Prayer">🙏</div>
                <div className="badge lock" title="Secret badge — locked">✦</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
