import Link from "next/link";

export const metadata = { title: "Portal — Sanctuary Night", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-ic2sanc">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-ic2sanc{
  --bg0:#0b1424; --bg1:#16263f; --bg2:#0e1b30;
  --gold:#E3C074; --gold2:#C9A24B; --golddim:rgba(227,192,116,.55);
  --amethyst:#9b7fd4; --teal:#5fb8b0;
  --ink:#e8edf5; --mut:#9fb0c7; --mut2:#74859e;
  --line:rgba(227,192,116,.16); --line2:rgba(255,255,255,.07);
  --card:linear-gradient(160deg,#15263f 0%,#101e34 100%);
  color:var(--ink);
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  background:
    radial-gradient(1100px 700px at 78% -8%, rgba(155,127,212,.10), transparent 60%),
    radial-gradient(900px 600px at 12% 8%, rgba(95,184,176,.07), transparent 55%),
    linear-gradient(180deg,var(--bg0),var(--bg2) 60%,var(--bg0));
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.pf-ic2sanc *{box-sizing:border-box;}
.pf-ic2sanc a{color:inherit;text-decoration:none;}
.pf-ic2sanc .pf-serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif;}

.pf-ic2sanc .pf-back{
  display:inline-block;margin:18px 0 10px 22px;font-size:13px;color:var(--mut);
  letter-spacing:.02em;
}
.pf-ic2sanc .pf-back:hover{color:var(--gold);}

.pf-ic2sanc .pf-shell{
  max-width:1150px;margin:0 auto;padding:8px 18px 56px;
  display:grid;grid-template-columns:248px 1fr;gap:22px;
}

/* ===== SIDEBAR ===== */
.pf-ic2sanc .pf-side{
  align-self:start;position:sticky;top:18px;
  background:linear-gradient(170deg,rgba(22,38,63,.85),rgba(14,27,48,.85));
  border:1px solid var(--line);border-radius:20px;padding:18px 14px;
  backdrop-filter:blur(6px);
}
.pf-ic2sanc .pf-brand{display:flex;align-items:center;gap:11px;padding:4px 6px 16px;}
.pf-ic2sanc .pf-logo{
  width:42px;height:42px;border-radius:13px;display:grid;place-items:center;font-size:21px;
  background:radial-gradient(circle at 32% 28%,#f2dca0,var(--gold2));
  box-shadow:0 4px 18px rgba(201,162,75,.4),inset 0 1px 2px rgba(255,255,255,.5);
}
.pf-ic2sanc .pf-bname{font-size:15px;font-weight:600;letter-spacing:.01em;}
.pf-ic2sanc .pf-bsub{font-size:10px;letter-spacing:.22em;color:var(--gold);margin-top:3px;}
.pf-ic2sanc .pf-nav{display:flex;flex-direction:column;gap:3px;margin-top:6px;}
.pf-ic2sanc .pf-nav a{
  display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;
  font-size:14px;color:var(--mut);transition:.2s;
}
.pf-ic2sanc .pf-nav a:hover{background:rgba(255,255,255,.04);color:var(--ink);}
.pf-ic2sanc .pf-nav a.pf-on{
  color:#1a1208;font-weight:600;
  background:linear-gradient(180deg,#f0d79f,var(--gold2));
  box-shadow:0 4px 14px rgba(201,162,75,.3);
}
.pf-ic2sanc .pf-nav .pf-ic{width:18px;text-align:center;}
.pf-ic2sanc .pf-side-foot{
  margin-top:18px;padding-top:14px;border-top:1px solid var(--line2);
  display:flex;align-items:center;gap:11px;
}
.pf-ic2sanc .pf-ring{
  width:40px;height:40px;border-radius:50%;display:grid;place-items:center;
  font-size:13px;font-weight:700;color:#1a1208;
  background:radial-gradient(circle at 32% 28%,#f2dca0,var(--gold2));
  box-shadow:0 0 0 2px rgba(11,20,36,1),0 0 0 4px var(--golddim);
}
.pf-ic2sanc .pf-fname{font-size:13px;font-weight:600;}
.pf-ic2sanc .pf-ftag{font-size:10px;letter-spacing:.2em;color:var(--gold);margin-top:2px;}

/* ===== MAIN ===== */
.pf-ic2sanc .pf-main{display:flex;flex-direction:column;gap:20px;min-width:0;}

/* ===== HERO ===== */
.pf-ic2sanc .pf-hero{
  position:relative;overflow:hidden;border-radius:24px;
  border:1px solid var(--line);
  background:
    radial-gradient(120% 90% at 50% -20%, rgba(155,127,212,.16), transparent 55%),
    radial-gradient(80% 70% at 85% 120%, rgba(95,184,176,.10), transparent 60%),
    linear-gradient(170deg,#0f1f38 0%,#0a1325 100%);
  padding:26px 28px 30px;
}
/* stained-glass shimmer veil */
.pf-ic2sanc .pf-glass{
  position:absolute;inset:0;pointer-events:none;opacity:.5;
  background:
    radial-gradient(40% 30% at 18% 18%, rgba(155,127,212,.18), transparent 70%),
    radial-gradient(38% 28% at 82% 22%, rgba(95,184,176,.16), transparent 70%),
    radial-gradient(46% 34% at 50% 90%, rgba(227,192,116,.10), transparent 70%);
}
.pf-ic2sanc .pf-stars{position:absolute;inset:0;pointer-events:none;}
.pf-ic2sanc .pf-star{
  position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:.5;
}
.pf-ic2sanc .pf-star.b{width:3px;height:3px;background:var(--gold);}
.pf-ic2sanc .pf-hero-top{
  position:relative;display:flex;justify-content:space-between;gap:20px;align-items:flex-start;
}
.pf-ic2sanc .pf-kick{font-size:11px;letter-spacing:.26em;color:var(--gold);font-weight:600;}
.pf-ic2sanc .pf-greet{font-size:40px;line-height:1.05;margin:10px 0 8px;color:#fff;}
.pf-ic2sanc .pf-sub{font-size:14.5px;color:var(--mut);max-width:430px;line-height:1.55;}
.pf-ic2sanc .pf-chips{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;}
.pf-ic2sanc .pf-chip{
  display:inline-flex;align-items:center;gap:7px;font-size:13px;
  padding:8px 14px;border-radius:999px;border:1px solid var(--line);
  background:rgba(255,255,255,.03);color:var(--ink);
}
.pf-ic2sanc .pf-chip b{color:var(--gold);font-weight:600;}

/* time-of-day indicator */
.pf-ic2sanc .pf-tod{
  position:relative;display:flex;flex-direction:column;align-items:flex-end;gap:8px;
}
.pf-ic2sanc .pf-tod-pills{display:flex;gap:5px;background:rgba(0,0,0,.25);
  border:1px solid var(--line2);border-radius:999px;padding:4px;}
.pf-ic2sanc .pf-tod-pills span{
  font-size:11px;padding:5px 11px;border-radius:999px;color:var(--mut2);letter-spacing:.04em;
}
.pf-ic2sanc .pf-tod-pills span.pf-on{
  color:#0c1322;font-weight:600;
  background:linear-gradient(180deg,#e9ce95,var(--gold2));
}
.pf-ic2sanc .pf-tod-cap{font-size:11px;color:var(--mut2);font-style:italic;max-width:180px;text-align:right;}

/* North Star streak */
.pf-ic2sanc .pf-northwrap{
  position:relative;display:flex;flex-direction:column;align-items:center;margin-top:6px;
}
.pf-ic2sanc .pf-north{position:relative;width:104px;height:104px;}
.pf-ic2sanc .pf-halo{
  position:absolute;inset:0;border-radius:50%;
  background:radial-gradient(circle,rgba(227,192,116,.42) 0%,rgba(227,192,116,.10) 45%,transparent 70%);
}
.pf-ic2sanc .pf-north svg{position:absolute;inset:0;width:100%;height:100%;}
.pf-ic2sanc .pf-streaknum{
  position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
}
.pf-ic2sanc .pf-streaknum b{font-size:26px;color:#fff;line-height:1;}
.pf-ic2sanc .pf-streaknum small{font-size:9px;letter-spacing:.22em;color:var(--gold);margin-top:3px;}
.pf-ic2sanc .pf-dove{position:absolute;top:8px;right:-6px;font-size:17px;filter:drop-shadow(0 2px 5px rgba(0,0,0,.5));}
.pf-ic2sanc .pf-streaklbl{font-size:11px;letter-spacing:.16em;color:var(--mut);margin-top:8px;}

/* star-path */
.pf-ic2sanc .pf-pathwrap{position:relative;margin-top:26px;}
.pf-ic2sanc .pf-pathlbl{display:flex;justify-content:space-between;font-size:11px;color:var(--mut2);
  letter-spacing:.16em;margin-bottom:8px;}
.pf-ic2sanc .pf-pathlbl b{color:var(--gold);font-weight:600;letter-spacing:.02em;}
.pf-ic2sanc .pf-path{position:relative;height:62px;}
.pf-ic2sanc .pf-path svg{width:100%;height:100%;display:block;overflow:visible;}
.pf-ic2sanc .pf-here{
  position:absolute;left:39%;top:-2px;transform:translateX(-50%);
  font-size:10px;color:var(--gold);letter-spacing:.1em;white-space:nowrap;
}

/* ===== ROW: devotional + wall ===== */
.pf-ic2sanc .pf-row{display:grid;grid-template-columns:1.25fr 1fr;gap:20px;}
.pf-ic2sanc .pf-card{
  background:var(--card);border:1px solid var(--line);border-radius:20px;padding:22px 22px;
}
.pf-ic2sanc .pf-cardhead{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.pf-ic2sanc .pf-cardhead h3{font-size:21px;color:#fff;}
.pf-ic2sanc .pf-tag{font-size:10px;letter-spacing:.2em;color:var(--gold);font-weight:600;}
.pf-ic2sanc .pf-tag.evening{
  padding:5px 11px;border-radius:999px;border:1px solid var(--line);background:rgba(227,192,116,.07);
}
.pf-ic2sanc .pf-dkick{font-size:11px;letter-spacing:.22em;color:var(--gold);font-weight:600;margin-bottom:6px;}
.pf-ic2sanc .pf-dtitle{font-size:25px;line-height:1.15;color:#fff;margin-bottom:12px;}
.pf-ic2sanc .pf-dbody{font-size:14.5px;line-height:1.65;color:var(--mut);}
.pf-ic2sanc .pf-btn{
  display:inline-block;margin-top:18px;padding:12px 20px;border-radius:12px;
  font-size:14px;font-weight:600;color:#1a1208;
  background:linear-gradient(180deg,#f0d79f,var(--gold2));
  box-shadow:0 6px 18px rgba(201,162,75,.32);transition:.2s;
}
.pf-ic2sanc .pf-btn:hover{filter:brightness(1.05);transform:translateY(-1px);}

/* wall */
.pf-ic2sanc .pf-wall{display:flex;flex-direction:column;gap:12px;}
.pf-ic2sanc .pf-witem{
  border:1px solid var(--line2);border-radius:15px;padding:13px 14px;
  background:rgba(255,255,255,.02);opacity:0;
}
.pf-ic2sanc .pf-wtop{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.pf-ic2sanc .pf-wav{
  width:32px;height:32px;border-radius:50%;display:grid;place-items:center;
  font-size:11px;font-weight:700;color:#0c1322;
}
.pf-ic2sanc .pf-wav.blue{background:radial-gradient(circle at 32% 28%,#bcd6ff,#7fa6e0);box-shadow:0 0 0 2px rgba(127,166,224,.35);}
.pf-ic2sanc .pf-wav.green{background:radial-gradient(circle at 32% 28%,#bfe7c8,#7cc093);box-shadow:0 0 0 2px rgba(124,192,147,.35);}
.pf-ic2sanc .pf-wname{font-size:13.5px;font-weight:600;}
.pf-ic2sanc .pf-wtext{font-size:13.5px;line-height:1.55;color:var(--mut);}
.pf-ic2sanc .pf-wreact{display:flex;gap:12px;margin-top:9px;font-size:12px;color:var(--mut2);}

/* ===== compact secondary ===== */
.pf-ic2sanc .pf-row2{display:grid;grid-template-columns:1fr 1.2fr;gap:20px;}
.pf-ic2sanc .pf-mini-h{font-size:13px;color:var(--mut);letter-spacing:.04em;margin-bottom:14px;}
.pf-ic2sanc .pf-mini-h b{color:#fff;font-weight:600;}
.pf-ic2sanc .pf-chart{display:flex;align-items:flex-end;gap:0;}
.pf-ic2sanc .pf-bars{width:100%;height:96px;}

/* leaderboard */
.pf-ic2sanc .pf-lead{display:flex;flex-direction:column;gap:9px;}
.pf-ic2sanc .pf-lrow{display:flex;align-items:center;gap:11px;font-size:13px;}
.pf-ic2sanc .pf-lrow.me{
  background:rgba(227,192,116,.07);border:1px solid var(--line);
  margin:-4px -8px;padding:7px 8px;border-radius:11px;
}
.pf-ic2sanc .pf-lav{
  width:30px;height:30px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;
  font-size:11px;font-weight:700;color:#0c1322;
}
.pf-ic2sanc .pf-lav.g{background:radial-gradient(circle at 32% 28%,#f2dca0,var(--gold2));box-shadow:0 0 0 2px var(--golddim);}
.pf-ic2sanc .pf-lav.b{background:radial-gradient(circle at 32% 28%,#bcd6ff,#7fa6e0);}
.pf-ic2sanc .pf-lav.gr{background:radial-gradient(circle at 32% 28%,#bfe7c8,#7cc093);}
.pf-ic2sanc .pf-lname{flex:1;font-weight:600;}
.pf-ic2sanc .pf-lname span{color:var(--gold);font-weight:400;font-size:11px;margin-left:4px;}
.pf-ic2sanc .pf-lchips{font-size:11px;color:var(--mut2);margin-right:8px;}
.pf-ic2sanc .pf-lscore{font-size:13px;font-weight:700;color:var(--gold);}
.pf-ic2sanc .pf-badges{display:flex;gap:8px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line2);flex-wrap:wrap;}
.pf-ic2sanc .pf-badge{
  width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-size:15px;
  background:rgba(255,255,255,.04);border:1px solid var(--line2);
}
.pf-ic2sanc .pf-badge.lock{color:var(--mut2);background:rgba(0,0,0,.2);}

@media (max-width:920px){
  .pf-ic2sanc .pf-shell{grid-template-columns:1fr;}
  .pf-ic2sanc .pf-side{position:static;}
  .pf-ic2sanc .pf-row,.pf-ic2sanc .pf-row2{grid-template-columns:1fr;}
  .pf-ic2sanc .pf-greet{font-size:32px;}
  .pf-ic2sanc .pf-hero-top{flex-direction:column;}
}

@media (prefers-reduced-motion: no-preference){
  @keyframes pf-twinkle{0%,100%{opacity:.25;}50%{opacity:.85;}}
  @keyframes pf-halo{0%,100%{opacity:.65;transform:scale(1);}50%{opacity:1;transform:scale(1.06);}}
  @keyframes pf-glint{0%,100%{opacity:.4;}50%{opacity:1;}}
  @keyframes pf-dove{0%{transform:translate(0,0) rotate(-2deg);}50%{transform:translate(-7px,-9px) rotate(2deg);}100%{transform:translate(0,0) rotate(-2deg);}}
  @keyframes pf-shimmer{0%,100%{opacity:.4;}50%{opacity:.75;}}
  @keyframes pf-pathshim{0%{stroke-dashoffset:0;}100%{stroke-dashoffset:-26;}}
  @keyframes pf-herepulse{0%,100%{opacity:.7;r:5;}50%{opacity:1;r:7;}}
  @keyframes pf-fadein{to{opacity:1;transform:translateY(0);}}
  @keyframes pf-barfill{from{transform:scaleY(0);}to{transform:scaleY(1);}}

  .pf-ic2sanc .pf-star{animation:pf-twinkle 3.4s ease-in-out infinite;}
  .pf-ic2sanc .pf-star:nth-child(2n){animation-duration:4.2s;animation-delay:.6s;}
  .pf-ic2sanc .pf-star:nth-child(3n){animation-duration:2.8s;animation-delay:1.1s;}
  .pf-ic2sanc .pf-halo{animation:pf-halo 5s ease-in-out infinite;}
  .pf-ic2sanc .pf-glint{animation:pf-glint 3.2s ease-in-out infinite;transform-origin:center;}
  .pf-ic2sanc .pf-dove{animation:pf-dove 6s ease-in-out infinite;}
  .pf-ic2sanc .pf-glass{animation:pf-shimmer 9s ease-in-out infinite;}
  .pf-ic2sanc .pf-pathline{stroke-dasharray:4 5;animation:pf-pathshim 2.4s linear infinite;}
  .pf-ic2sanc .pf-herept{animation:pf-herepulse 2.6s ease-in-out infinite;transform-origin:center;}
  .pf-ic2sanc .pf-witem{transform:translateY(8px);animation:pf-fadein .7s ease forwards;}
  .pf-ic2sanc .pf-witem:nth-child(2){animation-delay:.25s;}
  .pf-ic2sanc .pf-bar{transform-origin:bottom;animation:pf-barfill .9s ease both;}
  .pf-ic2sanc .pf-bar:nth-child(2){animation-delay:.08s;}
  .pf-ic2sanc .pf-bar:nth-child(3){animation-delay:.16s;}
  .pf-ic2sanc .pf-bar:nth-child(4){animation-delay:.24s;}
  .pf-ic2sanc .pf-bar:nth-child(5){animation-delay:.32s;}
  .pf-ic2sanc .pf-bar:nth-child(6){animation-delay:.40s;}
  .pf-ic2sanc .pf-bar:nth-child(7){animation-delay:.48s;}
}
@media (prefers-reduced-motion: no-preference){
  .pf-ic2sanc .pf-witem{opacity:0;}
}
`,
        }}
      />

      <Link className="pf-back" href="/designs/portal">
        ← All portal designs
      </Link>

      <div className="pf-shell">
        {/* ===== SIDEBAR ===== */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-logo">👣</div>
            <div>
              <div className="pf-bname">The Daily Walk</div>
              <div className="pf-bsub">INNER CIRCLE</div>
            </div>
          </div>
          <nav className="pf-nav">
            <a className="pf-on" href="#"><span className="pf-ic">◆</span> Dashboard</a>
            <a href="#"><span className="pf-ic">📖</span> My Journey</a>
            <a href="#"><span className="pf-ic">✦</span> Daily Wonders</a>
            <a href="#"><span className="pf-ic">🙏</span> Prayer</a>
            <a href="#"><span className="pf-ic">💛</span> Scripture Memory</a>
            <a href="#"><span className="pf-ic">🕊️</span> Prayer Wall</a>
            <a href="#"><span className="pf-ic">⚙️</span> My Settings</a>
          </nav>
          <div className="pf-side-foot">
            <div className="pf-ring">LJ</div>
            <div>
              <div className="pf-fname">Lulu</div>
              <div className="pf-ftag">PATRON</div>
            </div>
          </div>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="pf-main">
          {/* HERO */}
          <section className="pf-hero">
            <div className="pf-glass" />
            <div className="pf-stars">
              <span className="pf-star b" style={{ left: "8%", top: "18%" }} />
              <span className="pf-star" style={{ left: "16%", top: "40%" }} />
              <span className="pf-star" style={{ left: "23%", top: "12%" }} />
              <span className="pf-star b" style={{ left: "34%", top: "30%" }} />
              <span className="pf-star" style={{ left: "44%", top: "16%" }} />
              <span className="pf-star" style={{ left: "57%", top: "38%" }} />
              <span className="pf-star b" style={{ left: "66%", top: "20%" }} />
              <span className="pf-star" style={{ left: "73%", top: "44%" }} />
              <span className="pf-star" style={{ left: "82%", top: "14%" }} />
              <span className="pf-star" style={{ left: "90%", top: "34%" }} />
              <span className="pf-star b" style={{ left: "50%", top: "52%" }} />
              <span className="pf-star" style={{ left: "28%", top: "55%" }} />
            </div>

            <div className="pf-hero-top">
              <div>
                <div className="pf-kick">SATURDAY, JUNE 25</div>
                <h1 className="pf-greet pf-serif">Good afternoon, Lulu.</h1>
                <p className="pf-sub">
                  The sun is up and so is your faithfulness. Here&apos;s your walk with God today.
                </p>
                <div className="pf-chips">
                  <span className="pf-chip">📖 Day <b>47</b> of 365</span>
                  <span className="pf-chip">⭐ Walk Score <b>340</b></span>
                </div>
              </div>

              <div className="pf-tod">
                <div className="pf-tod-pills">
                  <span>morning</span>
                  <span>noon</span>
                  <span className="pf-on">night</span>
                </div>
                <div className="pf-tod-cap">Your sky shifts with the time you arrive.</div>

                {/* North Star streak */}
                <div className="pf-northwrap">
                  <div className="pf-north">
                    <div className="pf-halo" />
                    <span className="pf-dove">🕊️</span>
                    <svg viewBox="0 0 104 104" aria-hidden="true">
                      <defs>
                        <radialGradient id="pf-ns" cx="50%" cy="42%" r="60%">
                          <stop offset="0%" stopColor="#fff7e4" />
                          <stop offset="55%" stopColor="#E3C074" />
                          <stop offset="100%" stopColor="#B8902E" />
                        </radialGradient>
                      </defs>
                      {/* four-point north star */}
                      <path
                        d="M52 14 L58 46 L90 52 L58 58 L52 90 L46 58 L14 52 L46 46 Z"
                        fill="url(#pf-ns)"
                        opacity=".95"
                      />
                      {/* soft cross-glint inside */}
                      <g className="pf-glint" stroke="#fffdf6" strokeWidth="2" strokeLinecap="round" opacity=".85">
                        <line x1="52" y1="40" x2="52" y2="64" />
                        <line x1="42" y1="49" x2="62" y2="49" />
                      </g>
                    </svg>
                    <div className="pf-streaknum">
                      <b>12</b>
                      <small>DAY STREAK</small>
                    </div>
                  </div>
                  <div className="pf-streaklbl">YOUR NORTH STAR</div>
                </div>
              </div>
            </div>

            {/* STAR-PATH */}
            <div className="pf-pathwrap">
              <div className="pf-pathlbl">
                <span>YOUR JOURNEY · DAY 1</span>
                <b>DAY 47 — you are here</b>
                <span>DAY 365</span>
              </div>
              <div className="pf-path">
                <span className="pf-here">✦ you are here</span>
                <svg viewBox="0 0 1000 62" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="pf-aisle" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#E3C074" stopOpacity=".25" />
                      <stop offset="39%" stopColor="#E3C074" stopOpacity=".9" />
                      <stop offset="100%" stopColor="#5fb8b0" stopOpacity=".25" />
                    </linearGradient>
                  </defs>
                  {/* aisle base */}
                  <path
                    d="M10 50 C 250 50, 250 20, 500 26 C 750 32, 760 14, 990 16"
                    fill="none"
                    stroke="url(#pf-aisle)"
                    strokeWidth="2.5"
                  />
                  {/* shimmering dashed overlay */}
                  <path
                    className="pf-pathline"
                    d="M10 50 C 250 50, 250 20, 500 26 C 750 32, 760 14, 990 16"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1"
                    opacity=".35"
                  />
                  {/* milestone stars along the aisle */}
                  <circle cx="10" cy="50" r="3" fill="#E3C074" opacity=".6" />
                  <circle cx="180" cy="42" r="2.5" fill="#fff" opacity=".5" />
                  <circle cx="300" cy="32" r="2.5" fill="#fff" opacity=".5" />
                  <circle cx="660" cy="22" r="2.5" fill="#fff" opacity=".45" />
                  <circle cx="820" cy="17" r="2.5" fill="#fff" opacity=".45" />
                  <circle cx="990" cy="16" r="3" fill="#5fb8b0" opacity=".55" />
                  {/* Day 47 glowing "you are here" */}
                  <circle cx="390" cy="29" r="11" fill="#E3C074" opacity=".18" />
                  <circle className="pf-herept" cx="390" cy="29" r="6" fill="#fff7e4" stroke="#E3C074" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </section>

          {/* ROW: devotional + wall */}
          <div className="pf-row">
            <section className="pf-card">
              <div className="pf-cardhead">
                <h3 className="pf-serif">Today&apos;s Devotional</h3>
                <span className="pf-tag evening">EVENING</span>
              </div>
              <div className="pf-dkick">MATTHEW 27:51</div>
              <h2 className="pf-dtitle pf-serif">He tore the veil from His side</h2>
              <p className="pf-dbody">
                When Jesus breathed His last, the curtain of the temple split from top to bottom—
                not from the bottom up. The way to God was opened by heaven, not by us.
              </p>
              <a className="pf-btn" href="#">Read tonight&apos;s walk →</a>
            </section>

            <section className="pf-card">
              <div className="pf-cardhead">
                <h3 className="pf-serif">Encouragement Wall</h3>
                <span className="pf-tag">COMMUNITY</span>
              </div>
              <div className="pf-wall">
                <div className="pf-witem">
                  <div className="pf-wtop">
                    <div className="pf-wav blue">MR</div>
                    <div className="pf-wname">Maria</div>
                  </div>
                  <div className="pf-wtext">
                    Praying for everyone keeping their streak this week—keep walking! 🙌
                  </div>
                  <div className="pf-wreact"><span>❤️ 14</span><span>🙏 9</span><span>🔥 5</span></div>
                </div>
                <div className="pf-witem">
                  <div className="pf-wtop">
                    <div className="pf-wav green">DV</div>
                    <div className="pf-wname">David</div>
                  </div>
                  <div className="pf-wtext">
                    That veil verse hit different tonight. Grateful for this community.
                  </div>
                  <div className="pf-wreact"><span>❤️ 21</span><span>🙏 12</span><span>👏 6</span></div>
                </div>
              </div>
            </section>
          </div>

          {/* ROW2: chart + leaderboard */}
          <div className="pf-row2">
            <section className="pf-card">
              <div className="pf-mini-h">This week&apos;s <b>walk</b></div>
              <div className="pf-chart">
                <svg className="pf-bars" viewBox="0 0 220 96" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="pf-bg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f0d79f" />
                      <stop offset="100%" stopColor="#B8902E" />
                    </linearGradient>
                  </defs>
                  <rect className="pf-bar" x="6"   y="44" width="20" height="52" rx="4" fill="url(#pf-bg)" />
                  <rect className="pf-bar" x="36"  y="30" width="20" height="66" rx="4" fill="url(#pf-bg)" />
                  <rect className="pf-bar" x="66"  y="58" width="20" height="38" rx="4" fill="url(#pf-bg)" />
                  <rect className="pf-bar" x="96"  y="22" width="20" height="74" rx="4" fill="url(#pf-bg)" />
                  <rect className="pf-bar" x="126" y="40" width="20" height="56" rx="4" fill="url(#pf-bg)" />
                  <rect className="pf-bar" x="156" y="14" width="20" height="82" rx="4" fill="url(#pf-bg)" />
                  <rect className="pf-bar" x="186" y="34" width="20" height="62" rx="4" fill="url(#pf-bg)" />
                </svg>
              </div>
            </section>

            <section className="pf-card">
              <div className="pf-mini-h">The <b>Inner Circle</b> · this week</div>
              <div className="pf-lead">
                <div className="pf-lrow me">
                  <div className="pf-lav g">LJ</div>
                  <div className="pf-lname">Lulu <span>· you</span></div>
                  <div className="pf-lchips">🔥 📖 🙏</div>
                  <div className="pf-lscore">340</div>
                </div>
                <div className="pf-lrow">
                  <div className="pf-lav b">MR</div>
                  <div className="pf-lname">Maria</div>
                  <div className="pf-lchips">🔥 📖</div>
                  <div className="pf-lscore">290</div>
                </div>
                <div className="pf-lrow">
                  <div className="pf-lav gr">DV</div>
                  <div className="pf-lname">David</div>
                  <div className="pf-lchips">📖 🙏</div>
                  <div className="pf-lscore">255</div>
                </div>
              </div>
              <div className="pf-badges">
                <div className="pf-badge">👣</div>
                <div className="pf-badge">🔥</div>
                <div className="pf-badge">💛</div>
                <div className="pf-badge">📖</div>
                <div className="pf-badge">🙏</div>
                <div className="pf-badge lock">✦</div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
