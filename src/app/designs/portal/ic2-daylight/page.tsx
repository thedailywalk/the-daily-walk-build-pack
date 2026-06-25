import Link from "next/link";

export const metadata = { title: "Portal — Dawn & Dusk", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-ic2day">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-ic2day{
  --navy-0:#0b1424;
  --navy-1:#101d33;
  --navy-2:#16263f;
  --gold:#E3C074;
  --gold-2:#C9A24B;
  --ink-soft:#c7d2e2;
  --ink-dim:#8fa0b8;
  --line:rgba(227,192,116,.16);
  --card:rgba(255,255,255,.035);
  --card-line:rgba(255,255,255,.08);
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(227,192,116,.06), transparent 60%),
    linear-gradient(160deg, var(--navy-0), var(--navy-2));
  color:var(--ink-soft);
  min-height:100vh;
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.pf-ic2day *{box-sizing:border-box;}
.pf-ic2day a{color:inherit;text-decoration:none;}
.pf-ic2day .pf-serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif;}

.pf-ic2day .pf-back{
  display:inline-flex;align-items:center;gap:.4rem;
  padding:.85rem 1.25rem;font-size:.82rem;color:var(--ink-dim);
}
.pf-ic2day .pf-back:hover{color:var(--gold);}

.pf-ic2day .pf-shell{
  max-width:1150px;margin:0 auto;padding:0 1rem 3rem;
  display:grid;grid-template-columns:248px 1fr;gap:1.25rem;
}

/* ---------- SIDEBAR ---------- */
.pf-ic2day .pf-side{
  align-self:start;position:sticky;top:1rem;
  background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015));
  border:1px solid var(--card-line);border-radius:20px;padding:1.1rem;
}
.pf-ic2day .pf-brand{display:flex;align-items:center;gap:.7rem;padding:.2rem .2rem 1rem;}
.pf-ic2day .pf-logo{
  width:42px;height:42px;border-radius:13px;display:grid;place-items:center;font-size:1.2rem;
  background:linear-gradient(150deg,var(--gold),var(--gold-2));
  box-shadow:0 6px 20px rgba(227,192,116,.25);
}
.pf-ic2day .pf-brand-t{font-family:"Instrument Serif",Georgia,serif;font-size:1.12rem;color:#fff;line-height:1.1;}
.pf-ic2day .pf-brand-s{font-size:.6rem;letter-spacing:.22em;color:var(--gold);margin-top:.15rem;}
.pf-ic2day .pf-nav{display:flex;flex-direction:column;gap:.15rem;margin-top:.5rem;}
.pf-ic2day .pf-nav a{
  display:flex;align-items:center;gap:.65rem;padding:.62rem .7rem;border-radius:11px;
  font-size:.86rem;color:var(--ink-dim);
}
.pf-ic2day .pf-nav a:hover{background:rgba(255,255,255,.04);color:var(--ink-soft);}
.pf-ic2day .pf-nav a.active{
  background:linear-gradient(90deg, rgba(227,192,116,.16), rgba(227,192,116,.04));
  color:#fff;border:1px solid var(--line);
}
.pf-ic2day .pf-nav .ic{width:20px;text-align:center;}
.pf-ic2day .pf-side-foot{
  margin-top:1rem;padding-top:1rem;border-top:1px solid var(--card-line);
  display:flex;align-items:center;gap:.65rem;
}
.pf-ic2day .pf-avatar{
  width:40px;height:40px;border-radius:50%;display:grid;place-items:center;
  font-size:.82rem;font-weight:600;color:var(--navy-0);
  background:linear-gradient(150deg,var(--gold),var(--gold-2));
  box-shadow:0 0 0 2px rgba(227,192,116,.25),0 0 0 4px rgba(227,192,116,.08);
}
.pf-ic2day .pf-av-name{font-size:.85rem;color:#fff;}
.pf-ic2day .pf-av-tier{font-size:.58rem;letter-spacing:.2em;color:var(--gold);}

/* ---------- MAIN ---------- */
.pf-ic2day .pf-main{display:flex;flex-direction:column;gap:1.25rem;min-width:0;}

/* ---------- HERO ---------- */
.pf-ic2day .pf-hero{
  position:relative;overflow:hidden;border-radius:24px;
  border:1px solid var(--card-line);
  background:linear-gradient(160deg,var(--navy-1),var(--navy-0));
  padding:1.4rem 1.5rem 1.6rem;
}
/* shifting sky layer behind everything */
.pf-ic2day .pf-sky{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(900px 320px at 18% -30%, rgba(227,192,116,.16), transparent 60%),
    radial-gradient(700px 300px at 82% -20%, rgba(120,160,220,.10), transparent 60%);
}

/* three time-of-day states preview strip */
.pf-ic2day .pf-states{
  position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem;margin-bottom:1.3rem;
}
.pf-ic2day .pf-state{
  position:relative;overflow:hidden;border-radius:16px;border:1px solid var(--card-line);
  padding:.85rem .9rem 1rem;min-height:118px;
}
.pf-ic2day .pf-state .lbl{
  position:relative;z-index:3;font-size:.6rem;letter-spacing:.22em;color:#fff;opacity:.92;
}
.pf-ic2day .pf-state .sub{position:relative;z-index:3;font-size:.7rem;color:rgba(255,255,255,.7);margin-top:.2rem;}
.pf-ic2day .pf-state .orb{
  position:absolute;z-index:2;border-radius:50%;
}
/* morning */
.pf-ic2day .pf-state.morning{background:linear-gradient(165deg,#15243d 10%,#1b2c46 60%,#2a3147 100%);}
.pf-ic2day .pf-state.morning::after{
  content:"";position:absolute;inset:0;z-index:1;
  background:radial-gradient(220px 130px at 30% 110%, rgba(227,192,116,.42), transparent 62%);
}
.pf-ic2day .pf-state.morning .orb{
  width:54px;height:54px;left:18%;bottom:-18px;
  background:radial-gradient(circle at 50% 40%, #ffe9b8, #E3C074 55%, rgba(227,192,116,0) 72%);
  box-shadow:0 0 36px 8px rgba(227,192,116,.4);
}
/* noon */
.pf-ic2day .pf-state.noon{background:linear-gradient(165deg,#1a3050 0%,#214066 55%,#2a567f 100%);}
.pf-ic2day .pf-state.noon::after{
  content:"";position:absolute;inset:0;z-index:1;
  background:radial-gradient(180px 120px at 78% -10%, rgba(227,192,116,.30), transparent 60%);
}
.pf-ic2day .pf-state.noon .orb{
  width:40px;height:40px;right:16%;top:14px;
  background:radial-gradient(circle at 50% 50%, #fff6df, #E3C074 60%, rgba(227,192,116,0) 76%);
  box-shadow:0 0 30px 6px rgba(255,240,200,.45);
}
/* night */
.pf-ic2day .pf-state.night{background:linear-gradient(165deg,#0a1322,#0d1a30 60%,#101f38);}
.pf-ic2day .pf-state.night::after{
  content:"";position:absolute;inset:0;z-index:1;
  background:
    radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.9), transparent),
    radial-gradient(1px 1px at 60% 50%, rgba(255,255,255,.7), transparent),
    radial-gradient(1.4px 1.4px at 80% 25%, rgba(227,192,116,.9), transparent),
    radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,.6), transparent),
    radial-gradient(1px 1px at 88% 65%, rgba(255,255,255,.7), transparent);
}
.pf-ic2day .pf-state.night .orb{
  width:34px;height:34px;right:18%;top:18px;
  background:radial-gradient(circle at 38% 38%, #eef2fb, #c7d2e2 60%, rgba(199,210,226,0) 74%);
  box-shadow:0 0 22px 4px rgba(199,210,226,.3);
}
.pf-ic2day .pf-state .star{position:absolute;z-index:3;font-size:.7rem;}

/* sun -> moon arc */
.pf-ic2day .pf-arc{position:relative;z-index:2;height:46px;margin:-.4rem 0 1.1rem;}
.pf-ic2day .pf-arc svg{width:100%;height:100%;display:block;overflow:visible;}
.pf-ic2day .pf-arc .arc-line{fill:none;stroke:rgba(227,192,116,.28);stroke-width:1.4;stroke-dasharray:4 5;}
.pf-ic2day .pf-arc .arc-sun{fill:#E3C074;filter:drop-shadow(0 0 6px rgba(227,192,116,.7));}
.pf-ic2day .pf-arc .arc-moon{fill:#c7d2e2;opacity:.85;}

/* hero copy + star figure */
.pf-ic2day .pf-hero-row{position:relative;z-index:2;display:grid;grid-template-columns:1fr 250px;gap:1.2rem;align-items:start;}
.pf-ic2day .pf-kicker{font-size:.66rem;letter-spacing:.24em;color:var(--gold);}
.pf-ic2day .pf-greet{font-family:"Instrument Serif",Georgia,serif;font-size:2.3rem;line-height:1.06;color:#fff;margin:.35rem 0 .5rem;}
.pf-ic2day .pf-greet-sub{font-size:.92rem;color:var(--ink-soft);max-width:42ch;line-height:1.5;}
.pf-ic2day .pf-chips{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1rem;}
.pf-ic2day .pf-chip{
  display:inline-flex;align-items:center;gap:.45rem;font-size:.78rem;color:var(--ink-soft);
  padding:.45rem .8rem;border-radius:999px;border:1px solid var(--card-line);background:rgba(255,255,255,.03);
}
.pf-ic2day .pf-chip b{color:#fff;font-weight:600;}

/* North Star streak + dove */
.pf-ic2day .pf-northstar{
  position:relative;border:1px solid var(--line);border-radius:18px;
  background:radial-gradient(120px 90px at 70% 20%, rgba(227,192,116,.14), transparent 70%),rgba(255,255,255,.025);
  padding:1.05rem 1rem 1rem;text-align:center;overflow:hidden;
}
.pf-ic2day .pf-ns-star{font-size:1.7rem;line-height:1;filter:drop-shadow(0 0 10px rgba(227,192,116,.8));}
.pf-ic2day .pf-ns-num{font-family:"Instrument Serif",Georgia,serif;font-size:2.5rem;color:var(--gold);line-height:1;margin:.2rem 0 .05rem;}
.pf-ic2day .pf-ns-lbl{font-size:.62rem;letter-spacing:.2em;color:var(--ink-dim);}
.pf-ic2day .pf-dove{position:absolute;top:.7rem;left:.85rem;font-size:1rem;opacity:.85;}

/* star path */
.pf-ic2day .pf-path{position:relative;z-index:2;margin-top:1.3rem;border-top:1px solid var(--card-line);padding-top:1rem;}
.pf-ic2day .pf-path-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.6rem;}
.pf-ic2day .pf-path-t{font-family:"Instrument Serif",Georgia,serif;font-size:1.05rem;color:#fff;}
.pf-ic2day .pf-path-r{font-size:.62rem;letter-spacing:.18em;color:var(--ink-dim);}
.pf-ic2day .pf-path svg{width:100%;height:64px;display:block;overflow:visible;}
.pf-ic2day .pf-path .pp-line{fill:none;stroke:rgba(255,255,255,.14);stroke-width:1.4;}
.pf-ic2day .pf-path .pp-done{fill:none;stroke:var(--gold);stroke-width:2;stroke-linecap:round;}
.pf-ic2day .pf-path .pp-dot{fill:rgba(255,255,255,.25);}
.pf-ic2day .pf-path .pp-dot.done{fill:var(--gold-2);}
.pf-ic2day .pf-path .pp-here{fill:var(--gold);filter:drop-shadow(0 0 8px rgba(227,192,116,.9));}
.pf-ic2day .pf-path .pp-here-ring{fill:none;stroke:rgba(227,192,116,.5);stroke-width:1.2;}
.pf-ic2day .pf-path .pp-cap{font-size:9px;fill:var(--gold);font-family:Inter,sans-serif;letter-spacing:.08em;}
.pf-ic2day .pf-path .pp-end{font-size:9px;fill:var(--ink-dim);font-family:Inter,sans-serif;}

/* ---------- GRID ---------- */
.pf-ic2day .pf-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:1.25rem;}
.pf-ic2day .pf-card{
  background:var(--card);border:1px solid var(--card-line);border-radius:20px;padding:1.25rem;
}
.pf-ic2day .pf-card-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.9rem;}
.pf-ic2day .pf-card-t{font-family:"Instrument Serif",Georgia,serif;font-size:1.25rem;color:#fff;}
.pf-ic2day .pf-tag{font-size:.6rem;letter-spacing:.2em;color:var(--gold);}

/* devotional */
.pf-ic2day .pf-dev-kicker{font-size:.66rem;letter-spacing:.22em;color:var(--gold);margin-top:.2rem;}
.pf-ic2day .pf-dev-title{font-family:"Instrument Serif",Georgia,serif;font-size:1.7rem;color:#fff;line-height:1.12;margin:.4rem 0 .65rem;}
.pf-ic2day .pf-dev-body{font-size:.95rem;line-height:1.62;color:var(--ink-soft);max-width:54ch;}
.pf-ic2day .pf-btn{
  display:inline-flex;align-items:center;gap:.5rem;margin-top:1.1rem;
  padding:.8rem 1.3rem;border-radius:12px;font-size:.88rem;font-weight:600;color:var(--navy-0);
  background:linear-gradient(150deg,var(--gold),var(--gold-2));
  box-shadow:0 8px 22px rgba(227,192,116,.22);
}
.pf-ic2day .pf-btn:hover{filter:brightness(1.05);}

/* encouragement wall */
.pf-ic2day .pf-wall-item{
  border:1px solid var(--card-line);border-radius:14px;padding:.8rem .85rem;margin-bottom:.7rem;
  opacity:0;animation:none;
}
.pf-ic2day .pf-wall-item:last-child{margin-bottom:0;}
.pf-ic2day .pf-wall-top{display:flex;align-items:center;gap:.55rem;margin-bottom:.45rem;}
.pf-ic2day .pf-wa{
  width:30px;height:30px;border-radius:50%;display:grid;place-items:center;
  font-size:.68rem;font-weight:600;color:var(--navy-0);
}
.pf-ic2day .pf-wa.blue{background:linear-gradient(150deg,#9cc0ec,#6f9fd6);}
.pf-ic2day .pf-wa.green{background:linear-gradient(150deg,#a9d8b6,#79bd8f);}
.pf-ic2day .pf-wa-name{font-size:.82rem;color:#fff;font-weight:600;}
.pf-ic2day .pf-wa-text{font-size:.86rem;line-height:1.5;color:var(--ink-soft);}
.pf-ic2day .pf-wa-react{display:flex;gap:.8rem;margin-top:.5rem;font-size:.72rem;color:var(--ink-dim);}

/* secondary row */
.pf-ic2day .pf-sec{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.pf-ic2day .pf-chart svg{width:100%;height:96px;display:block;overflow:visible;}
.pf-ic2day .pf-bar{fill:url(#barGrad);}
.pf-ic2day .pf-bar-l{font-size:8px;fill:var(--ink-dim);font-family:Inter,sans-serif;}
.pf-ic2day .pf-lb-row{display:flex;align-items:center;gap:.6rem;padding:.5rem 0;border-bottom:1px solid var(--card-line);}
.pf-ic2day .pf-lb-row:last-child{border-bottom:none;}
.pf-ic2day .pf-lb-rank{width:18px;font-size:.75rem;color:var(--ink-dim);}
.pf-ic2day .pf-lb-name{flex:1;font-size:.84rem;color:var(--ink-soft);}
.pf-ic2day .pf-lb-name b{color:#fff;}
.pf-ic2day .pf-lb-me{color:var(--gold);font-size:.66rem;letter-spacing:.12em;margin-left:.35rem;}
.pf-ic2day .pf-lb-score{font-family:"Instrument Serif",Georgia,serif;color:var(--gold);font-size:1.02rem;}
.pf-ic2day .pf-badges{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem;}
.pf-ic2day .pf-badge{
  width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:1.05rem;
  border:1px solid var(--card-line);background:rgba(255,255,255,.03);
}
.pf-ic2day .pf-badge.locked{color:var(--ink-dim);opacity:.55;}

@media (max-width:920px){
  .pf-ic2day .pf-shell{grid-template-columns:1fr;}
  .pf-ic2day .pf-side{position:static;}
  .pf-ic2day .pf-hero-row{grid-template-columns:1fr;}
  .pf-ic2day .pf-grid{grid-template-columns:1fr;}
  .pf-ic2day .pf-sec{grid-template-columns:1fr;}
  .pf-ic2day .pf-greet{font-size:2rem;}
}

@media (prefers-reduced-motion: no-preference){
  @keyframes pf-skyshift{
    0%{opacity:.55;transform:translateX(-2%);}
    50%{opacity:1;transform:translateX(2%);}
    100%{opacity:.55;transform:translateX(-2%);}
  }
  .pf-ic2day .pf-sky{animation:pf-skyshift 16s ease-in-out infinite;}

  @keyframes pf-arcdrift{
    0%{offset-distance:0%;}
    50%{offset-distance:100%;}
    100%{offset-distance:0%;}
  }
  .pf-ic2day .pf-arc .arc-sun{offset-path:path("M 6 40 Q 200 -18 394 40");animation:pf-arcdrift 18s ease-in-out infinite;}
  .pf-ic2day .pf-arc .arc-moon{offset-path:path("M 6 40 Q 200 -18 394 40");offset-distance:100%;animation:pf-arcdrift 18s ease-in-out infinite reverse;}

  @keyframes pf-twinkle{0%,100%{opacity:.35;}50%{opacity:1;}}
  .pf-ic2day .pf-state.night .star{animation:pf-twinkle 3.2s ease-in-out infinite;}
  .pf-ic2day .pf-state.morning .star{animation:pf-twinkle 4s ease-in-out infinite;}

  @keyframes pf-dove{
    0%{transform:translate(0,0) rotate(-3deg);opacity:.7;}
    50%{transform:translate(4px,-3px) rotate(2deg);opacity:1;}
    100%{transform:translate(0,0) rotate(-3deg);opacity:.7;}
  }
  .pf-ic2day .pf-dove{animation:pf-dove 5.5s ease-in-out infinite;}

  @keyframes pf-nsglow{0%,100%{filter:drop-shadow(0 0 8px rgba(227,192,116,.6));}50%{filter:drop-shadow(0 0 16px rgba(227,192,116,1));}}
  .pf-ic2day .pf-ns-star{animation:pf-nsglow 4s ease-in-out infinite;}

  @keyframes pf-hereglow{0%,100%{r:5;opacity:1;}50%{r:6.5;opacity:.85;}}
  .pf-ic2day .pf-path .pp-here{animation:pf-hereglow 3s ease-in-out infinite;}

  @keyframes pf-fadeup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  .pf-ic2day .pf-wall-item{animation:pf-fadeup .7s ease forwards;}
  .pf-ic2day .pf-wall-item.w2{animation-delay:.25s;}

  @keyframes pf-barfill{from{transform:scaleY(0);}to{transform:scaleY(1);}}
  .pf-ic2day .pf-bar{transform-origin:bottom;animation:pf-barfill 1s ease forwards;}
}
/* fallback when motion reduced: show wall immediately */
@media (prefers-reduced-motion: reduce){
  .pf-ic2day .pf-wall-item{opacity:1;}
}
`,
        }}
      />

      <Link className="pf-back" href="/designs/portal">← All portal designs</Link>

      <div className="pf-shell">
        {/* SIDEBAR */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-logo">👣</div>
            <div>
              <div className="pf-brand-t">The Daily Walk</div>
              <div className="pf-brand-s">INNER CIRCLE</div>
            </div>
          </div>
          <nav className="pf-nav">
            <a className="active" href="#"><span className="ic">◴</span> Dashboard</a>
            <a href="#"><span className="ic">🧭</span> My Journey</a>
            <a href="#"><span className="ic">✨</span> Daily Wonders</a>
            <a href="#"><span className="ic">🙏</span> Prayer</a>
            <a href="#"><span className="ic">📖</span> Scripture Memory</a>
            <a href="#"><span className="ic">💬</span> Prayer Wall</a>
            <a href="#"><span className="ic">⚙</span> My Settings</a>
          </nav>
          <div className="pf-side-foot">
            <div className="pf-avatar">LJ</div>
            <div>
              <div className="pf-av-name">Lulu</div>
              <div className="pf-av-tier">PATRON</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="pf-main">
          {/* HERO */}
          <section className="pf-hero">
            <div className="pf-sky" />

            {/* three states */}
            <div className="pf-states">
              <div className="pf-state morning">
                <div className="orb" />
                <span className="star" style={{ top: ".7rem", right: ".9rem" }}>✦</span>
                <div className="lbl">MORNING</div>
                <div className="sub">Soft sunrise gold rises over deep navy.</div>
              </div>
              <div className="pf-state noon">
                <div className="orb" />
                <div className="lbl">NOON</div>
                <div className="sub">Clear, bright-but-restrained blue &amp; gold.</div>
              </div>
              <div className="pf-state night">
                <div className="orb" />
                <span className="star" style={{ top: "2.2rem", left: "1.2rem" }}>✦</span>
                <div className="lbl">NIGHT</div>
                <div className="sub">A deep navy starfield welcomes you home.</div>
              </div>
            </div>

            {/* sun -> moon arc */}
            <div className="pf-arc" aria-hidden="true">
              <svg viewBox="0 0 400 46" preserveAspectRatio="none">
                <path className="arc-line" d="M 6 40 Q 200 -18 394 40" />
                <circle className="arc-sun" cx="0" cy="0" r="5" />
                <circle className="arc-moon" cx="0" cy="0" r="4" />
              </svg>
            </div>

            {/* greeting + northstar */}
            <div className="pf-hero-row">
              <div>
                <div className="pf-kicker">SATURDAY, JUNE 25</div>
                <h1 className="pf-greet pf-serif">Good afternoon, Lulu.</h1>
                <p className="pf-greet-sub">
                  The sun is up and so is your faithfulness. Here&apos;s your walk with God today.
                </p>
                <div className="pf-chips">
                  <span className="pf-chip">📖 Day <b>47</b> of 365</span>
                  <span className="pf-chip">⭐ Walk Score <b>340</b></span>
                </div>
              </div>

              <div className="pf-northstar">
                <span className="pf-dove">🕊️</span>
                <div className="pf-ns-star">✦</div>
                <div className="pf-ns-num">12</div>
                <div className="pf-ns-lbl">DAY STREAK · NORTH STAR</div>
              </div>
            </div>

            {/* star path */}
            <div className="pf-path">
              <div className="pf-path-head">
                <span className="pf-path-t pf-serif">Your Journey</span>
                <span className="pf-path-r">DAY 1 → 365</span>
              </div>
              <svg viewBox="0 0 600 64" preserveAspectRatio="none" aria-hidden="true">
                <path className="pp-line" d="M 10 50 C 110 10, 190 60, 300 34 S 500 8, 590 30" />
                <path className="pp-done" d="M 10 50 C 70 28, 110 38, 150 33" />
                <circle className="pp-dot done" cx="10" cy="50" r="3" />
                <circle className="pp-dot done" cx="80" cy="32" r="3" />
                <circle className="pp-here-ring" cx="150" cy="33" r="9" />
                <circle className="pp-here" cx="150" cy="33" r="5" />
                <circle className="pp-dot" cx="300" cy="34" r="3" />
                <circle className="pp-dot" cx="430" cy="20" r="3" />
                <circle className="pp-dot" cx="590" cy="30" r="3" />
                <text className="pp-cap" x="150" y="55" textAnchor="middle">DAY 47 · YOU ARE HERE</text>
                <text className="pp-end" x="590" y="48" textAnchor="end">DAY 365</text>
                <text className="pp-end" x="10" y="64" textAnchor="start">DAY 1</text>
              </svg>
            </div>
          </section>

          {/* GRID: devotional + wall */}
          <div className="pf-grid">
            <section className="pf-card">
              <div className="pf-card-head">
                <span className="pf-card-t pf-serif">Today&apos;s Devotional</span>
                <span className="pf-tag">EVENING</span>
              </div>
              <div className="pf-dev-kicker">MATTHEW 27:51</div>
              <h2 className="pf-dev-title pf-serif">He tore the veil from His side</h2>
              <p className="pf-dev-body">
                When Jesus breathed His last, the curtain of the temple split from top to bottom—
                not from the bottom up. The way to God was opened by heaven, not by us.
              </p>
              <a className="pf-btn" href="#">Read tonight&apos;s walk →</a>
            </section>

            <section className="pf-card">
              <div className="pf-card-head">
                <span className="pf-card-t pf-serif">Encouragement Wall</span>
                <span className="pf-tag">COMMUNITY</span>
              </div>
              <div className="pf-wall-item">
                <div className="pf-wall-top">
                  <div className="pf-wa blue">MR</div>
                  <div className="pf-wa-name">Maria</div>
                </div>
                <div className="pf-wa-text">Praying for everyone keeping their streak this week—keep walking! 🙌</div>
                <div className="pf-wa-react"><span>❤️ 14</span><span>🙏 9</span><span>🔥 5</span></div>
              </div>
              <div className="pf-wall-item w2">
                <div className="pf-wall-top">
                  <div className="pf-wa green">DV</div>
                  <div className="pf-wa-name">David</div>
                </div>
                <div className="pf-wa-text">That veil verse hit different tonight. Grateful for this community.</div>
                <div className="pf-wa-react"><span>❤️ 21</span><span>🙏 12</span><span>👏 6</span></div>
              </div>
            </section>
          </div>

          {/* SECONDARY: chart + leaderboard/badges */}
          <div className="pf-sec">
            <section className="pf-card pf-chart">
              <div className="pf-card-head">
                <span className="pf-card-t pf-serif" style={{ fontSize: "1.05rem" }}>This Week</span>
                <span className="pf-tag">WALK SCORE</span>
              </div>
              <svg viewBox="0 0 280 96" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E3C074" />
                    <stop offset="100%" stopColor="#C9A24B" />
                  </linearGradient>
                </defs>
                <rect className="pf-bar" x="8" y="48" width="24" height="38" rx="4" />
                <rect className="pf-bar" x="46" y="36" width="24" height="50" rx="4" />
                <rect className="pf-bar" x="84" y="58" width="24" height="28" rx="4" />
                <rect className="pf-bar" x="122" y="28" width="24" height="58" rx="4" />
                <rect className="pf-bar" x="160" y="42" width="24" height="44" rx="4" />
                <rect className="pf-bar" x="198" y="20" width="24" height="66" rx="4" />
                <rect className="pf-bar" x="236" y="52" width="24" height="34" rx="4" />
                <text className="pf-bar-l" x="20" y="94" textAnchor="middle">M</text>
                <text className="pf-bar-l" x="58" y="94" textAnchor="middle">T</text>
                <text className="pf-bar-l" x="96" y="94" textAnchor="middle">W</text>
                <text className="pf-bar-l" x="134" y="94" textAnchor="middle">T</text>
                <text className="pf-bar-l" x="172" y="94" textAnchor="middle">F</text>
                <text className="pf-bar-l" x="210" y="94" textAnchor="middle">S</text>
                <text className="pf-bar-l" x="248" y="94" textAnchor="middle">S</text>
              </svg>
            </section>

            <section className="pf-card">
              <div className="pf-card-head">
                <span className="pf-card-t pf-serif" style={{ fontSize: "1.05rem" }}>The Inner Circle</span>
                <span className="pf-tag">THIS WEEK</span>
              </div>
              <div className="pf-lb-row">
                <span className="pf-lb-rank">1</span>
                <span className="pf-lb-name"><b>Lulu</b><span className="pf-lb-me">YOU</span></span>
                <span className="pf-lb-score">340</span>
              </div>
              <div className="pf-lb-row">
                <span className="pf-lb-rank">2</span>
                <span className="pf-lb-name">Maria</span>
                <span className="pf-lb-score">290</span>
              </div>
              <div className="pf-lb-row">
                <span className="pf-lb-rank">3</span>
                <span className="pf-lb-name">David</span>
                <span className="pf-lb-score">255</span>
              </div>
              <div className="pf-badges">
                <span className="pf-badge">👣</span>
                <span className="pf-badge">🔥</span>
                <span className="pf-badge">💛</span>
                <span className="pf-badge">📖</span>
                <span className="pf-badge">🙏</span>
                <span className="pf-badge locked">✦</span>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
