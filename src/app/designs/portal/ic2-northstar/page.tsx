import Link from "next/link";

export const metadata = { title: "Portal — North Star", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-ic2ns">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-ic2ns *{box-sizing:border-box;margin:0;padding:0}
.pf-ic2ns{
  --navy:#0b1424;--navy2:#16263f;--gold:#E3C074;--gold2:#C9A24B;--gold-dk:#B8902E;
  --ink:#e8edf6;--mut:#9fb0c8;--mut2:#6f829e;--line:rgba(227,192,116,.16);
  --card:rgba(18,32,54,.72);--card2:rgba(13,24,42,.6);
  min-height:100vh;background:
    radial-gradient(1100px 700px at 78% -8%,rgba(70,110,170,.28),transparent 60%),
    radial-gradient(900px 600px at 12% 110%,rgba(40,70,120,.22),transparent 60%),
    linear-gradient(160deg,#0b1424,#16263f);
  color:var(--ink);
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  font-feature-settings:"liga" 1;-webkit-font-smoothing:antialiased;
  padding:22px;
}
.pf-ic2ns a{color:inherit;text-decoration:none}
.pf-ic2ns .serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400;letter-spacing:.2px}
.pf-ic2ns .back{display:inline-block;color:var(--mut);font-size:13px;margin-bottom:16px;transition:color .2s}
.pf-ic2ns .back:hover{color:var(--gold)}

.pf-ic2ns .shell{max-width:1150px;margin:0 auto;display:grid;grid-template-columns:248px 1fr;gap:22px;align-items:start}

/* ===== Sidebar ===== */
.pf-ic2ns .side{
  position:sticky;top:22px;background:var(--card2);border:1px solid var(--line);
  border-radius:20px;padding:18px 16px;backdrop-filter:blur(8px);
}
.pf-ic2ns .brand{display:flex;align-items:center;gap:11px;padding:4px 4px 14px;border-bottom:1px solid var(--line)}
.pf-ic2ns .logo{
  width:42px;height:42px;border-radius:13px;display:grid;place-items:center;font-size:20px;
  background:linear-gradient(150deg,var(--gold),var(--gold-dk));
  box-shadow:0 6px 18px rgba(201,162,75,.32),inset 0 1px 0 rgba(255,255,255,.4);
}
.pf-ic2ns .brand b{font-size:14.5px;letter-spacing:.2px}
.pf-ic2ns .brand small{display:block;font-size:9.5px;letter-spacing:2.4px;color:var(--gold);margin-top:2px}
.pf-ic2ns nav{display:flex;flex-direction:column;gap:3px;margin:14px 0}
.pf-ic2ns nav a{
  display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:11px;
  font-size:13.5px;color:var(--mut);transition:.18s;border:1px solid transparent;
}
.pf-ic2ns nav a .ic{width:18px;text-align:center;font-size:14px;opacity:.85}
.pf-ic2ns nav a:hover{color:var(--ink);background:rgba(255,255,255,.03)}
.pf-ic2ns nav a.on{
  color:var(--navy);font-weight:600;
  background:linear-gradient(150deg,var(--gold),var(--gold2));
  border-color:rgba(227,192,116,.5);box-shadow:0 5px 16px rgba(201,162,75,.28);
}
.pf-ic2ns nav a.on .ic{opacity:1}
.pf-ic2ns .me{display:flex;align-items:center;gap:11px;padding-top:14px;border-top:1px solid var(--line)}
.pf-ic2ns .ring{
  width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;
  color:var(--gold);background:var(--navy);
  box-shadow:0 0 0 2px var(--navy),0 0 0 4px rgba(227,192,116,.55);
}
.pf-ic2ns .me b{font-size:13px}
.pf-ic2ns .me small{display:block;font-size:9.5px;letter-spacing:2px;color:var(--gold);margin-top:1px}

/* ===== Main ===== */
.pf-ic2ns .main{display:flex;flex-direction:column;gap:20px;min-width:0}
.pf-ic2ns .kick{font-size:11px;letter-spacing:2.6px;color:var(--gold);font-weight:600}

/* ===== HERO ===== */
.pf-ic2ns .hero{
  position:relative;overflow:hidden;border-radius:24px;padding:30px 30px 26px;
  border:1px solid var(--line);
  background:
    radial-gradient(140% 120% at 50% -30%,rgba(120,160,220,.18),transparent 55%),
    radial-gradient(80% 90% at 50% 0%,rgba(20,38,66,.9),rgba(8,16,30,.96));
}
.pf-ic2ns .sky{position:absolute;inset:0;pointer-events:none}
.pf-ic2ns .sky i{position:absolute;width:2px;height:2px;border-radius:50%;background:#dce8ff;opacity:.5}
.pf-ic2ns .sky i:nth-child(1){top:14%;left:10%}
.pf-ic2ns .sky i:nth-child(2){top:26%;left:22%;width:1.5px;height:1.5px}
.pf-ic2ns .sky i:nth-child(3){top:18%;left:68%}
.pf-ic2ns .sky i:nth-child(4){top:40%;left:84%;width:2.5px;height:2.5px}
.pf-ic2ns .sky i:nth-child(5){top:60%;left:14%}
.pf-ic2ns .sky i:nth-child(6){top:72%;left:30%;width:1.5px;height:1.5px}
.pf-ic2ns .sky i:nth-child(7){top:55%;left:60%}
.pf-ic2ns .sky i:nth-child(8){top:78%;left:78%;width:2.5px;height:2.5px}
.pf-ic2ns .sky i:nth-child(9){top:33%;left:44%}
.pf-ic2ns .sky i:nth-child(10){top:66%;left:92%;width:1.5px;height:1.5px}

.pf-ic2ns .hero-top{position:relative;display:flex;justify-content:space-between;gap:24px;align-items:flex-start}
.pf-ic2ns .hero h1{font-size:40px;line-height:1.05;margin:10px 0 8px}
.pf-ic2ns .hero .sub{color:var(--mut);font-size:14.5px;max-width:430px;line-height:1.55}
.pf-ic2ns .chips{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.pf-ic2ns .chip{
  display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:12px;font-size:13px;
  background:rgba(255,255,255,.04);border:1px solid var(--line);color:var(--ink);
}
.pf-ic2ns .chip b{color:var(--gold)}

/* North Star cluster (top-right of hero) */
.pf-ic2ns .northwrap{position:relative;width:172px;min-width:172px;height:150px;flex-shrink:0}
.pf-ic2ns .nstar{
  position:absolute;top:8px;left:50%;transform:translateX(-50%);
  width:74px;height:74px;display:grid;place-items:center;
}
.pf-ic2ns .nstar .core{
  position:relative;width:40px;height:40px;border-radius:50%;
  background:radial-gradient(circle,#fff 0%,var(--gold) 45%,rgba(227,192,116,.2) 75%,transparent);
  box-shadow:0 0 26px 8px rgba(227,192,116,.6),0 0 60px 18px rgba(227,192,116,.28);
}
/* cross-shaped flare */
.pf-ic2ns .flare{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.pf-ic2ns .flare:before,.pf-ic2ns .flare:after{
  content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  background:linear-gradient(var(--gold),transparent);
}
.pf-ic2ns .flare:before{width:2.5px;height:104px;
  background:linear-gradient(to bottom,transparent,rgba(255,247,225,.95),transparent)}
.pf-ic2ns .flare:after{width:78px;height:2.5px;top:42%;
  background:linear-gradient(to right,transparent,rgba(255,247,225,.85),transparent)}
.pf-ic2ns .nstar .num{position:relative;z-index:2;font-size:22px;font-weight:800;color:var(--navy);text-shadow:0 1px 0 rgba(255,255,255,.4)}
.pf-ic2ns .nstar-label{position:absolute;top:84px;left:0;right:0;text-align:center}
.pf-ic2ns .nstar-label .t{font-size:10px;letter-spacing:2.4px;color:var(--gold);font-weight:600}
.pf-ic2ns .nstar-label .d{font-size:11.5px;color:var(--mut);margin-top:3px;line-height:1.4}
/* dove */
.pf-ic2ns .dove{position:absolute;top:18px;left:18px;font-size:17px;opacity:.92;filter:drop-shadow(0 0 6px rgba(220,235,255,.5))}

/* star-path constellation inside hero */
.pf-ic2ns .pathwrap{position:relative;margin-top:24px;padding-top:18px;border-top:1px solid var(--line)}
.pf-ic2ns .path-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.pf-ic2ns .path-head .lbl{font-size:11px;letter-spacing:2.4px;color:var(--gold);font-weight:600}
.pf-ic2ns .path-head .ends{font-size:11px;color:var(--mut2)}
.pf-ic2ns .pathsvg{display:block;width:100%;height:96px}

/* time-of-day indicator */
.pf-ic2ns .tod{display:flex;align-items:center;gap:12px;margin-top:14px;flex-wrap:wrap}
.pf-ic2ns .tod .swatches{display:flex;gap:6px}
.pf-ic2ns .sw{width:30px;height:18px;border-radius:6px;border:1px solid var(--line)}
.pf-ic2ns .sw.m{background:linear-gradient(180deg,#f7d9a6,#bcd4ef)}
.pf-ic2ns .sw.n{background:linear-gradient(180deg,#a9d2f2,#dfeefb)}
.pf-ic2ns .sw.t{background:linear-gradient(180deg,#16263f,#0b1424);outline:1px solid rgba(227,192,116,.45)}
.pf-ic2ns .tod .cap{font-size:11.5px;color:var(--mut)}
.pf-ic2ns .tod .arc{font-size:13px;color:var(--gold);letter-spacing:1px}

/* ===== Grid below hero ===== */
.pf-ic2ns .grid{display:grid;grid-template-columns:1.35fr 1fr;gap:20px;align-items:start}
.pf-ic2ns .card{
  background:var(--card);border:1px solid var(--line);border-radius:20px;padding:22px;
  backdrop-filter:blur(8px);
}
.pf-ic2ns .crow{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.pf-ic2ns .tag{font-size:9.5px;letter-spacing:2px;font-weight:700;color:var(--navy);
  background:linear-gradient(150deg,var(--gold),var(--gold2));padding:5px 9px;border-radius:7px}
.pf-ic2ns .ctitle{font-size:21px}

/* Devotional */
.pf-ic2ns .dev .vk{font-size:11px;letter-spacing:2.2px;color:var(--gold);font-weight:600;margin:14px 0 6px}
.pf-ic2ns .dev h2{font-size:30px;line-height:1.1;margin-bottom:12px}
.pf-ic2ns .dev p{color:var(--mut);font-size:14.5px;line-height:1.65}
.pf-ic2ns .btn{
  display:inline-block;margin-top:18px;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:700;
  color:var(--navy);background:linear-gradient(150deg,var(--gold),var(--gold-dk));
  box-shadow:0 8px 22px rgba(201,162,75,.32);transition:transform .18s,box-shadow .18s;
}
.pf-ic2ns .btn:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(201,162,75,.42)}

/* Encouragement wall */
.pf-ic2ns .wall .item{
  display:flex;gap:12px;padding:13px;border-radius:14px;background:rgba(255,255,255,.025);
  border:1px solid rgba(255,255,255,.05);margin-top:11px;
}
.pf-ic2ns .av{
  width:38px;height:38px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;
  font-size:12px;font-weight:700;color:#fff;
}
.pf-ic2ns .av.blue{background:linear-gradient(150deg,#5b86c4,#3a5d96);box-shadow:0 0 0 2px rgba(91,134,196,.3)}
.pf-ic2ns .av.green{background:linear-gradient(150deg,#5aa982,#3c7d5e);box-shadow:0 0 0 2px rgba(90,169,130,.3)}
.pf-ic2ns .item b{font-size:13.5px}
.pf-ic2ns .item p{font-size:13px;color:var(--mut);line-height:1.5;margin:3px 0 8px}
.pf-ic2ns .react{display:flex;gap:8px;flex-wrap:wrap}
.pf-ic2ns .react span{font-size:11.5px;color:var(--mut2);background:rgba(255,255,255,.04);
  border:1px solid var(--line);padding:3px 8px;border-radius:20px}

/* secondary row */
.pf-ic2ns .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}
.pf-ic2ns .chart svg{display:block;width:100%;height:120px}
.pf-ic2ns .week{display:flex;justify-content:space-between;font-size:10px;color:var(--mut2);margin-top:6px}

/* leaderboard */
.pf-ic2ns .lb .lrow{display:flex;align-items:center;gap:11px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.pf-ic2ns .lb .lrow:last-child{border-bottom:none}
.pf-ic2ns .lb .rk{width:18px;text-align:center;font-size:12px;color:var(--mut2);font-weight:700}
.pf-ic2ns .lring{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;
  color:var(--gold);background:var(--navy);box-shadow:0 0 0 2px var(--navy),0 0 0 3.5px rgba(227,192,116,.5)}
.pf-ic2ns .lb .nm{flex:1;font-size:13px}
.pf-ic2ns .lb .nm small{color:var(--mut2);font-size:10.5px}
.pf-ic2ns .lb .sc{font-size:14px;font-weight:700;color:var(--gold)}
.pf-ic2ns .fchips{display:flex;gap:6px;margin-top:3px}
.pf-ic2ns .fchips span{font-size:10px;color:var(--mut2)}
.pf-ic2ns .badges{display:flex;gap:9px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line);flex-wrap:wrap}
.pf-ic2ns .bdg{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;font-size:16px;
  background:rgba(255,255,255,.04);border:1px solid var(--line)}
.pf-ic2ns .bdg.lock{opacity:.45;color:var(--mut2)}

@media (max-width:980px){
  .pf-ic2ns .shell{grid-template-columns:1fr}
  .pf-ic2ns .side{position:static}
  .pf-ic2ns .grid,.pf-ic2ns .grid2{grid-template-columns:1fr}
  .pf-ic2ns .hero h1{font-size:32px}
}

/* ===== Animations (reduced-motion safe) ===== */
@media (prefers-reduced-motion: no-preference){
  .pf-ic2ns .sky i{animation:pf-tw 4s ease-in-out infinite}
  .pf-ic2ns .sky i:nth-child(2n){animation-duration:5.5s;animation-delay:1s}
  .pf-ic2ns .sky i:nth-child(3n){animation-duration:6.5s;animation-delay:.5s}
  @keyframes pf-tw{0%,100%{opacity:.25}50%{opacity:.9}}

  .pf-ic2ns .nstar .core{animation:pf-pulse 4.5s ease-in-out infinite}
  @keyframes pf-pulse{
    0%,100%{box-shadow:0 0 26px 8px rgba(227,192,116,.55),0 0 60px 18px rgba(227,192,116,.24)}
    50%{box-shadow:0 0 34px 12px rgba(227,192,116,.8),0 0 80px 26px rgba(227,192,116,.36)}
  }
  .pf-ic2ns .flare{animation:pf-flare 4.5s ease-in-out infinite}
  @keyframes pf-flare{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(.96)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.04)}}

  .pf-ic2ns .dove{animation:pf-dove 9s ease-in-out infinite}
  @keyframes pf-dove{
    0%{transform:translate(0,0) rotate(-4deg)}
    50%{transform:translate(14px,8px) rotate(3deg)}
    100%{transform:translate(0,0) rotate(-4deg)}
  }

  .pf-ic2ns .shimmer{animation:pf-shim 5s linear infinite}
  @keyframes pf-shim{0%{stroke-dashoffset:240}100%{stroke-dashoffset:0}}

  .pf-ic2ns .wall .item{opacity:0;animation:pf-fade .8s ease forwards}
  .pf-ic2ns .wall .item:nth-child(2){animation-delay:.25s}
  .pf-ic2ns .wall .item:nth-child(3){animation-delay:.5s}
  @keyframes pf-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

  .pf-ic2ns .bar{transform-box:fill-box;transform-origin:bottom;animation:pf-bar 1s ease forwards;transform:scaleY(0)}
  .pf-ic2ns .bar:nth-child(2){animation-delay:.08s}
  .pf-ic2ns .bar:nth-child(3){animation-delay:.16s}
  .pf-ic2ns .bar:nth-child(4){animation-delay:.24s}
  .pf-ic2ns .bar:nth-child(5){animation-delay:.32s}
  .pf-ic2ns .bar:nth-child(6){animation-delay:.4s}
  .pf-ic2ns .bar:nth-child(7){animation-delay:.48s}
  @keyframes pf-bar{to{transform:scaleY(1)}}

  .pf-ic2ns .youstar{animation:pf-you 3s ease-in-out infinite}
  @keyframes pf-you{0%,100%{r:6;opacity:1}50%{r:7.5;opacity:.85}}
}
`,
        }}
      />

      <Link className="back" href="/designs/portal">← All portal designs</Link>

      <div className="shell">
        {/* ===== Sidebar ===== */}
        <aside className="side">
          <div className="brand">
            <div className="logo">👣</div>
            <div>
              <b>The Daily Walk</b>
              <small>INNER CIRCLE</small>
            </div>
          </div>
          <nav>
            <a className="on" href="#"><span className="ic">◆</span> Dashboard</a>
            <a href="#"><span className="ic">🧭</span> My Journey</a>
            <a href="#"><span className="ic">✨</span> Daily Wonders</a>
            <a href="#"><span className="ic">🙏</span> Prayer</a>
            <a href="#"><span className="ic">📖</span> Scripture Memory</a>
            <a href="#"><span className="ic">💬</span> Prayer Wall</a>
            <a href="#"><span className="ic">⚙️</span> My Settings</a>
          </nav>
          <div className="me">
            <div className="ring">LJ</div>
            <div>
              <b>Lulu</b>
              <small>PATRON</small>
            </div>
          </div>
        </aside>

        {/* ===== Main ===== */}
        <main className="main">
          {/* HERO */}
          <section className="hero">
            <div className="sky">
              <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>

            <div className="hero-top">
              <div>
                <div className="kick">SATURDAY, JUNE 25</div>
                <h1 className="serif">Good afternoon, Lulu.</h1>
                <p className="sub">
                  The sun is up and so is your faithfulness. Here's your walk with God today.
                </p>
                <div className="chips">
                  <span className="chip">📖 Day <b>47</b> of 365</span>
                  <span className="chip">⭐ Walk Score <b>340</b></span>
                </div>
              </div>

              {/* North Star cluster */}
              <div className="northwrap" aria-label="Streak: 12 day north star">
                <div className="dove" aria-hidden="true">🕊️</div>
                <div className="nstar">
                  <span className="flare" aria-hidden="true" />
                  <span className="core" />
                  <span className="num">12</span>
                </div>
                <div className="nstar-label">
                  <div className="t">YOUR NORTH STAR</div>
                  <div className="d">12-day streak · guided by His light</div>
                </div>
              </div>
            </div>

            {/* Star-path constellation */}
            <div className="pathwrap">
              <div className="path-head">
                <span className="lbl">YOUR JOURNEY</span>
                <span className="ends">Day 1 ——— Day 365</span>
              </div>
              <svg className="pathsvg" viewBox="0 0 900 96" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="pf-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="rgba(227,192,116,.25)" />
                    <stop offset="0.5" stopColor="rgba(227,192,116,.55)" />
                    <stop offset="1" stopColor="rgba(120,160,220,.35)" />
                  </linearGradient>
                </defs>
                {/* path leads UP toward the north star (right/top) */}
                <polyline
                  points="30,80 105,70 175,76 250,58 320,64 395,46 410,44 480,52 555,36 630,30 705,38 800,18 870,12"
                  fill="none" stroke="url(#pf-line)" strokeWidth="2" strokeLinecap="round"
                />
                <polyline
                  className="shimmer"
                  points="30,80 105,70 175,76 250,58 320,64 395,46 410,44 480,52 555,36 630,30 705,38 800,18 870,12"
                  fill="none" stroke="rgba(255,247,225,.9)" strokeWidth="2.2" strokeLinecap="round"
                  strokeDasharray="14 226"
                />
                {[
                  [30, 80], [105, 70], [175, 76], [250, 58], [320, 64],
                  [480, 52], [555, 36], [630, 30], [705, 38], [800, 18], [870, 12],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#cfe0ff" opacity="0.7" />
                ))}
                {/* you-are-here: Day 47 */}
                <circle className="youstar" cx="403" cy="45" r="6" fill="var(--gold)" />
                <circle cx="403" cy="45" r="11" fill="none" stroke="rgba(227,192,116,.4)" strokeWidth="1.5" />
                {/* destination north star glow */}
                <circle cx="870" cy="12" r="5" fill="#fff" />
                <circle cx="870" cy="12" r="10" fill="none" stroke="rgba(227,192,116,.5)" strokeWidth="1.5" />
                <text x="403" y="72" fill="var(--gold)" fontSize="11" textAnchor="middle">Day 47 · you are here</text>
              </svg>

              {/* time-of-day indicator */}
              <div className="tod">
                <div className="swatches" aria-hidden="true">
                  <span className="sw m" title="morning" />
                  <span className="sw n" title="noon" />
                  <span className="sw t" title="night" />
                </div>
                <span className="arc">☀ → ☾</span>
                <span className="cap">morning · noon · night — your sky shifts with the time you arrive.</span>
              </div>
            </div>
          </section>

          {/* Devotional + Wall */}
          <div className="grid">
            <section className="card dev">
              <div className="crow">
                <span className="ctitle serif">Today's Devotional</span>
                <span className="tag">EVENING</span>
              </div>
              <div className="vk">MATTHEW 27:51</div>
              <h2 className="serif">He tore the veil from His side</h2>
              <p>
                When Jesus breathed His last, the curtain of the temple split from top to bottom—
                not from the bottom up. The way to God was opened by heaven, not by us.
              </p>
              <a className="btn" href="#">Read tonight's walk →</a>
            </section>

            <section className="card wall">
              <div className="crow">
                <span className="ctitle serif">Encouragement Wall</span>
                <span className="tag">COMMUNITY</span>
              </div>
              <div className="item">
                <div className="av blue">MR</div>
                <div>
                  <b>Maria</b>
                  <p>Praying for everyone keeping their streak this week—keep walking! 🙌</p>
                  <div className="react">
                    <span>❤️ 14</span><span>🙏 9</span><span>🔥 5</span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="av green">DV</div>
                <div>
                  <b>David</b>
                  <p>That veil verse hit different tonight. Grateful for this community.</p>
                  <div className="react">
                    <span>❤️ 21</span><span>🙏 12</span><span>👏 6</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Secondary: chart + leaderboard */}
          <div className="grid2">
            <section className="card chart">
              <div className="crow">
                <span className="ctitle serif">This Week</span>
                <span className="tag">RHYTHM</span>
              </div>
              <svg viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
                {[
                  [10, 50], [54, 30], [98, 65], [142, 40], [186, 22], [230, 55], [274, 35],
                ].map(([x, h], i) => (
                  <rect key={i} className="bar" x={x} y={110 - h} width="30" height={h}
                    rx="5" fill="url(#pf-bargrad)" />
                ))}
                <defs>
                  <linearGradient id="pf-bargrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--gold)" />
                    <stop offset="1" stopColor="rgba(201,162,75,.35)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="week">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
            </section>

            <section className="card lb">
              <div className="crow">
                <span className="ctitle serif">The Inner Circle</span>
                <span className="tag">THIS WEEK</span>
              </div>
              <div className="lrow">
                <span className="rk">1</span>
                <div className="lring">LJ</div>
                <div className="nm">
                  Lulu <small>· you</small>
                  <div className="fchips"><span>🔥 12</span><span>📖 188</span><span>🙏 41</span></div>
                </div>
                <span className="sc">340</span>
              </div>
              <div className="lrow">
                <span className="rk">2</span>
                <div className="lring">MR</div>
                <div className="nm">
                  Maria
                  <div className="fchips"><span>🔥 9</span><span>📖 162</span><span>🙏 33</span></div>
                </div>
                <span className="sc">290</span>
              </div>
              <div className="lrow">
                <span className="rk">3</span>
                <div className="lring">DV</div>
                <div className="nm">
                  David
                  <div className="fchips"><span>🔥 6</span><span>📖 140</span><span>🙏 28</span></div>
                </div>
                <span className="sc">255</span>
              </div>
              <div className="badges">
                <div className="bdg">👣</div>
                <div className="bdg">🔥</div>
                <div className="bdg">💛</div>
                <div className="bdg">📖</div>
                <div className="bdg">🙏</div>
                <div className="bdg lock">✦</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
