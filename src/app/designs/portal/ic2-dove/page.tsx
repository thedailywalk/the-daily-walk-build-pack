import Link from "next/link";

export const metadata = { title: "Portal — Dove's Gift", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-ic2dove">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-ic2dove{
  --navy:#0b1424; --navy2:#16263f; --gold:#E3C074; --gold2:#C9A24B;
  --ink:#dfe7f3; --muted:#94a6c2; --line:rgba(227,192,116,.16);
  --blue:#7fa8e0; --green:#86c9a4; --jewel:rgba(80,120,200,.18);
  background:#070d18; color:var(--ink);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  min-height:100vh; -webkit-font-smoothing:antialiased;
}
.pf-ic2dove *{box-sizing:border-box;}
.pf-ic2dove a{color:inherit;text-decoration:none;}
.pf-ic2dove .pf-serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif;}

.pf-ic2dove .pf-back{
  display:inline-block;margin:18px 0 6px 22px;font-size:13px;color:var(--muted);
  letter-spacing:.02em;
}
.pf-ic2dove .pf-back:hover{color:var(--gold);}

.pf-ic2dove .pf-shell{
  display:grid;grid-template-columns:236px 1fr;gap:24px;
  max-width:1150px;margin:0 auto;padding:14px 22px 60px;
}

/* ---------- SIDEBAR ---------- */
.pf-ic2dove .pf-side{
  position:relative;border-radius:20px;padding:20px 16px;
  background:linear-gradient(180deg,#0d1a2e,#0a1424);
  border:1px solid rgba(227,192,116,.12);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.03);
  display:flex;flex-direction:column;gap:24px;height:max-content;
}
.pf-ic2dove .pf-brand{display:flex;align-items:center;gap:12px;}
.pf-ic2dove .pf-logo{
  width:42px;height:42px;border-radius:13px;display:grid;place-items:center;font-size:20px;
  background:linear-gradient(150deg,var(--gold),var(--gold2));
  box-shadow:0 6px 18px rgba(201,162,75,.32);
}
.pf-ic2dove .pf-brand b{font-size:15px;letter-spacing:.01em;display:block;}
.pf-ic2dove .pf-brand span{font-size:10px;letter-spacing:.22em;color:var(--gold);display:block;margin-top:2px;}

.pf-ic2dove .pf-nav{display:flex;flex-direction:column;gap:3px;}
.pf-ic2dove .pf-nav a{
  display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;
  font-size:13.5px;color:var(--muted);transition:.18s;
}
.pf-ic2dove .pf-nav a:hover{color:var(--ink);background:rgba(255,255,255,.03);}
.pf-ic2dove .pf-nav a.pf-active{
  color:#0b1424;font-weight:600;
  background:linear-gradient(150deg,var(--gold),var(--gold2));
  box-shadow:0 6px 16px rgba(201,162,75,.28);
}
.pf-ic2dove .pf-nav .pf-ico{width:18px;text-align:center;opacity:.92;}

.pf-ic2dove .pf-userfoot{
  display:flex;align-items:center;gap:11px;padding-top:16px;
  border-top:1px solid rgba(255,255,255,.06);
}
.pf-ic2dove .pf-ring{
  width:38px;height:38px;border-radius:50%;display:grid;place-items:center;
  font-size:12px;font-weight:700;color:var(--gold);
  background:#0b1424;
  box-shadow:0 0 0 2px var(--gold),0 0 0 4px rgba(227,192,116,.18);
}
.pf-ic2dove .pf-userfoot b{font-size:13px;display:block;}
.pf-ic2dove .pf-userfoot span{font-size:9.5px;letter-spacing:.2em;color:var(--gold);}

/* ---------- MAIN ---------- */
.pf-ic2dove .pf-main{display:flex;flex-direction:column;gap:22px;min-width:0;}

/* ---------- HERO ---------- */
.pf-ic2dove .pf-hero{
  position:relative;overflow:hidden;border-radius:24px;padding:30px 32px 34px;
  background:
    radial-gradient(120% 90% at 78% -10%, rgba(80,120,200,.22), transparent 55%),
    radial-gradient(90% 80% at 10% 0%, rgba(227,192,116,.10), transparent 50%),
    linear-gradient(160deg,#0b1424,#16263f 70%,#0e1c30);
  border:1px solid rgba(227,192,116,.14);
  box-shadow:0 24px 60px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.04);
}
.pf-ic2dove .pf-stars{position:absolute;inset:0;pointer-events:none;}
.pf-ic2dove .pf-tw{
  position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:.5;
  box-shadow:0 0 6px 1px rgba(255,255,255,.5);
}
.pf-ic2dove .pf-tw.s1{top:18%;left:22%;}
.pf-ic2dove .pf-tw.s2{top:30%;left:62%;}
.pf-ic2dove .pf-tw.s3{top:12%;left:84%;}
.pf-ic2dove .pf-tw.s4{top:46%;left:40%;}
.pf-ic2dove .pf-tw.s5{top:60%;left:78%;width:3px;height:3px;}
.pf-ic2dove .pf-tw.s6{top:24%;left:8%;}
.pf-ic2dove .pf-tw.s7{top:54%;left:14%;}

/* time-of-day indicator */
.pf-ic2dove .pf-tod{
  position:absolute;top:20px;right:24px;text-align:right;z-index:3;
}
.pf-ic2dove .pf-tod-pills{display:inline-flex;gap:6px;align-items:center;}
.pf-ic2dove .pf-tod-pills span{
  font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);
  padding:4px 9px;border-radius:999px;border:1px solid rgba(255,255,255,.08);
}
.pf-ic2dove .pf-tod-pills span.on{
  color:#0b1424;font-weight:700;background:linear-gradient(150deg,var(--gold),var(--gold2));
  border-color:transparent;
}
.pf-ic2dove .pf-tod-cap{display:block;font-size:10.5px;color:var(--muted);margin-top:7px;font-style:italic;}

/* DOVE + STREAK */
.pf-ic2dove .pf-dovewrap{
  position:absolute;top:14px;left:50%;transform:translateX(-50%);
  z-index:4;display:flex;flex-direction:column;align-items:center;
}
.pf-ic2dove .pf-dovefloat{animation:none;display:flex;flex-direction:column;align-items:center;}
.pf-ic2dove .pf-dove{width:78px;height:48px;display:block;filter:drop-shadow(0 6px 14px rgba(180,200,255,.35));}
.pf-ic2dove .pf-wing{transform-box:fill-box;transform-origin:60% 65%;}
.pf-ic2dove .pf-ribbon{
  margin-top:-4px;position:relative;
  padding:5px 14px 5px 12px;border-radius:999px;
  background:linear-gradient(150deg,rgba(227,192,116,.95),rgba(201,162,75,.92));
  color:#0b1424;font-size:12px;font-weight:700;letter-spacing:.03em;
  display:flex;align-items:center;gap:6px;
  box-shadow:0 8px 22px rgba(227,192,116,.35),0 0 0 1px rgba(255,255,255,.25) inset;
}
.pf-ic2dove .pf-ribbon .pf-rnum{font-size:14px;}
.pf-ic2dove .pf-ribbon::after{
  content:"";position:absolute;inset:-6px;border-radius:999px;
  box-shadow:0 0 24px 6px rgba(227,192,116,.35);opacity:.7;z-index:-1;
}
.pf-ic2dove .pf-rcap{
  margin-top:6px;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold);opacity:.9;
}

.pf-ic2dove .pf-kick{
  font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);
  margin:60px 0 8px;font-weight:600;position:relative;z-index:2;
}
.pf-ic2dove .pf-greet{
  font-size:40px;line-height:1.05;margin:0 0 8px;font-weight:400;
  position:relative;z-index:2;
}
.pf-ic2dove .pf-sub{
  font-size:14px;color:var(--muted);max-width:520px;line-height:1.55;
  position:relative;z-index:2;margin:0 0 18px;
}
.pf-ic2dove .pf-chips{display:flex;gap:10px;flex-wrap:wrap;position:relative;z-index:2;margin-bottom:24px;}
.pf-ic2dove .pf-chip{
  display:inline-flex;align-items:center;gap:7px;font-size:12.5px;
  padding:7px 13px;border-radius:999px;color:var(--ink);
  background:rgba(255,255,255,.04);border:1px solid rgba(227,192,116,.18);
}
.pf-ic2dove .pf-chip b{color:var(--gold);font-weight:700;}

/* STAR PATH */
.pf-ic2dove .pf-path{
  position:relative;z-index:2;border-radius:18px;padding:18px 18px 14px;
  background:linear-gradient(180deg,rgba(8,14,26,.55),rgba(8,14,26,.25));
  border:1px solid rgba(255,255,255,.06);
}
.pf-ic2dove .pf-path-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;}
.pf-ic2dove .pf-path-head b{font-size:13.5px;}
.pf-ic2dove .pf-path-head span{font-size:10px;letter-spacing:.18em;color:var(--gold);text-transform:uppercase;}
.pf-ic2dove .pf-pathsvg{width:100%;height:88px;display:block;overflow:visible;}
.pf-ic2dove .pf-pdash{stroke-dasharray:3 7;}
.pf-ic2dove .pf-here{filter:drop-shadow(0 0 6px var(--gold));}
.pf-ic2dove .pf-shimmer{}
.pf-ic2dove .pf-path-foot{font-size:11px;color:var(--muted);margin-top:6px;font-style:italic;}

/* ---------- CARD COMMON ---------- */
.pf-ic2dove .pf-card{
  border-radius:20px;padding:24px;
  background:linear-gradient(160deg,#0d1a2e,#0b1424);
  border:1px solid rgba(227,192,116,.13);
  box-shadow:0 16px 40px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.03);
}

/* DEVOTIONAL */
.pf-ic2dove .pf-dev-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.pf-ic2dove .pf-dev-top h2{font-size:22px;margin:0;font-weight:400;}
.pf-ic2dove .pf-tag{
  font-size:10px;letter-spacing:.2em;color:var(--gold);font-weight:700;
  padding:4px 11px;border-radius:999px;border:1px solid rgba(227,192,116,.3);
}
.pf-ic2dove .pf-dev-kick{font-size:11px;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;font-weight:600;margin-bottom:6px;}
.pf-ic2dove .pf-dev-title{font-size:26px;margin:0 0 12px;font-weight:400;line-height:1.15;}
.pf-ic2dove .pf-dev-body{font-size:14.5px;line-height:1.65;color:#cbd6e8;margin:0 0 20px;max-width:600px;}
.pf-ic2dove .pf-btn{
  display:inline-block;padding:12px 22px;border-radius:12px;font-size:13.5px;font-weight:700;
  color:#0b1424;background:linear-gradient(150deg,var(--gold),var(--gold2));
  box-shadow:0 10px 24px rgba(201,162,75,.32);transition:.18s;
}
.pf-ic2dove .pf-btn:hover{transform:translateY(-1px);box-shadow:0 14px 30px rgba(201,162,75,.42);}

/* ENCOURAGEMENT WALL */
.pf-ic2dove .pf-wall-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
.pf-ic2dove .pf-wall-top h3{font-size:19px;margin:0;font-weight:400;}
.pf-ic2dove .pf-wall-top span{font-size:10px;letter-spacing:.2em;color:var(--gold);font-weight:700;}
.pf-ic2dove .pf-w-item{
  display:flex;gap:13px;padding:13px 0;border-top:1px solid rgba(255,255,255,.06);
  opacity:1;
}
.pf-ic2dove .pf-w-item:first-of-type{border-top:none;padding-top:0;}
.pf-ic2dove .pf-wav{
  width:36px;height:36px;border-radius:50%;flex:0 0 36px;display:grid;place-items:center;
  font-size:12px;font-weight:700;color:#0b1424;
}
.pf-ic2dove .pf-wav.b{background:linear-gradient(150deg,#9cc0f0,#6f9ce0);box-shadow:0 0 0 2px rgba(127,168,224,.4);}
.pf-ic2dove .pf-wav.g{background:linear-gradient(150deg,#a4e0c0,#74c89a);box-shadow:0 0 0 2px rgba(134,201,164,.4);}
.pf-ic2dove .pf-w-name{font-size:13px;font-weight:700;margin-bottom:3px;}
.pf-ic2dove .pf-w-text{font-size:13px;color:#c4d0e4;line-height:1.5;margin-bottom:7px;}
.pf-ic2dove .pf-w-chips{display:flex;gap:8px;flex-wrap:wrap;}
.pf-ic2dove .pf-w-chips span{
  font-size:11px;color:var(--muted);padding:3px 9px;border-radius:999px;
  background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);
}

/* SECONDARY ROW */
.pf-ic2dove .pf-grid2{display:grid;grid-template-columns:1fr 1.15fr;gap:22px;}
.pf-ic2dove .pf-mini-h{font-size:13px;font-weight:700;margin:0 0 12px;}
.pf-ic2dove .pf-mini-h span{font-weight:400;color:var(--muted);font-size:11px;letter-spacing:.08em;}
.pf-ic2dove .pf-chartsvg{width:100%;height:90px;display:block;overflow:visible;}
.pf-ic2dove .pf-bar{transform-box:fill-box;transform-origin:bottom;}

.pf-ic2dove .pf-lb-row{
  display:flex;align-items:center;gap:11px;padding:9px 0;
  border-top:1px solid rgba(255,255,255,.06);
}
.pf-ic2dove .pf-lb-row:first-of-type{border-top:none;}
.pf-ic2dove .pf-lb-ring{
  width:30px;height:30px;border-radius:50%;display:grid;place-items:center;
  font-size:10.5px;font-weight:700;color:var(--gold);flex:0 0 30px;background:#0b1424;
  box-shadow:0 0 0 2px var(--gold2);
}
.pf-ic2dove .pf-lb-ring.you{box-shadow:0 0 0 2px var(--gold),0 0 12px rgba(227,192,116,.5);}
.pf-ic2dove .pf-lb-name{font-size:12.5px;font-weight:600;flex:1;}
.pf-ic2dove .pf-lb-name small{color:var(--gold);font-weight:700;}
.pf-ic2dove .pf-lb-score{font-size:13px;font-weight:700;color:var(--gold);}
.pf-ic2dove .pf-lb-chips{display:flex;gap:6px;margin-left:2px;}
.pf-ic2dove .pf-lb-chips span{font-size:10.5px;color:var(--muted);}
.pf-ic2dove .pf-badges{
  display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;padding-top:14px;
  border-top:1px solid rgba(255,255,255,.06);
}
.pf-ic2dove .pf-badge{
  width:34px;height:34px;border-radius:11px;display:grid;place-items:center;font-size:15px;
  background:rgba(227,192,116,.08);border:1px solid rgba(227,192,116,.2);
}
.pf-ic2dove .pf-badge.lock{opacity:.45;background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.08);}

@media (max-width:900px){
  .pf-ic2dove .pf-shell{grid-template-columns:1fr;}
  .pf-ic2dove .pf-grid2{grid-template-columns:1fr;}
  .pf-ic2dove .pf-greet{font-size:32px;}
}

@media (prefers-reduced-motion: no-preference){
  .pf-ic2dove .pf-dovefloat{animation:pf-drift 7s ease-in-out infinite;}
  .pf-ic2dove .pf-wing{animation:pf-flap 2.6s ease-in-out infinite;}
  .pf-ic2dove .pf-ribbon::after{animation:pf-rglow 3.2s ease-in-out infinite;}
  .pf-ic2dove .pf-tw{animation:pf-twinkle 3.4s ease-in-out infinite;}
  .pf-ic2dove .pf-tw.s2{animation-delay:.6s;}
  .pf-ic2dove .pf-tw.s3{animation-delay:1.1s;}
  .pf-ic2dove .pf-tw.s4{animation-delay:1.7s;}
  .pf-ic2dove .pf-tw.s5{animation-delay:2.2s;}
  .pf-ic2dove .pf-tw.s6{animation-delay:.9s;}
  .pf-ic2dove .pf-tw.s7{animation-delay:1.4s;}
  .pf-ic2dove .pf-shimmer{animation:pf-shim 4.5s linear infinite;}
  .pf-ic2dove .pf-w-item{animation:pf-fadein .9s ease both;}
  .pf-ic2dove .pf-w-item:nth-of-type(2){animation-delay:.25s;}
  .pf-ic2dove .pf-bar{animation:pf-fill 1.1s ease both;}
  .pf-ic2dove .pf-bar:nth-child(2){animation-delay:.08s;}
  .pf-ic2dove .pf-bar:nth-child(3){animation-delay:.16s;}
  .pf-ic2dove .pf-bar:nth-child(4){animation-delay:.24s;}
  .pf-ic2dove .pf-bar:nth-child(5){animation-delay:.32s;}
  .pf-ic2dove .pf-bar:nth-child(6){animation-delay:.4s;}
  .pf-ic2dove .pf-bar:nth-child(7){animation-delay:.48s;}
}
@keyframes pf-drift{0%,100%{transform:translateY(0) translateX(-6px);}50%{transform:translateY(7px) translateX(6px);}}
@keyframes pf-flap{0%,100%{transform:rotate(0deg);}50%{transform:rotate(-14deg);}}
@keyframes pf-rglow{0%,100%{opacity:.45;}50%{opacity:.9;}}
@keyframes pf-twinkle{0%,100%{opacity:.25;}50%{opacity:.9;}}
@keyframes pf-shim{0%{offset-distance:0%;opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{offset-distance:100%;opacity:0;}}
@keyframes pf-fadein{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
@keyframes pf-fill{from{transform:scaleY(0);}to{transform:scaleY(1);}}
`,
        }}
      />

      <Link href="/designs/portal" className="pf-back">← All portal designs</Link>

      <div className="pf-shell">
        {/* SIDEBAR */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-logo">👣</div>
            <div>
              <b>The Daily Walk</b>
              <span>INNER CIRCLE</span>
            </div>
          </div>

          <nav className="pf-nav">
            <Link href="#" className="pf-active"><span className="pf-ico">◇</span> Dashboard</Link>
            <Link href="#"><span className="pf-ico">📖</span> My Journey</Link>
            <Link href="#"><span className="pf-ico">✦</span> Daily Wonders</Link>
            <Link href="#"><span className="pf-ico">🙏</span> Prayer</Link>
            <Link href="#"><span className="pf-ico">📜</span> Scripture Memory</Link>
            <Link href="#"><span className="pf-ico">💬</span> Prayer Wall</Link>
            <Link href="#"><span className="pf-ico">⚙</span> My Settings</Link>
          </nav>

          <div className="pf-userfoot">
            <div className="pf-ring">LJ</div>
            <div>
              <b>Lulu</b>
              <span>PATRON</span>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="pf-main">
          {/* HERO */}
          <section className="pf-hero">
            <div className="pf-stars">
              <i className="pf-tw s1" /><i className="pf-tw s2" /><i className="pf-tw s3" />
              <i className="pf-tw s4" /><i className="pf-tw s5" /><i className="pf-tw s6" /><i className="pf-tw s7" />
            </div>

            {/* time-of-day */}
            <div className="pf-tod">
              <div className="pf-tod-pills">
                <span>morning</span><span>noon</span><span className="on">night</span>
              </div>
              <span className="pf-tod-cap">Your sky shifts with the time you arrive.</span>
            </div>

            {/* DOVE carrying streak */}
            <div className="pf-dovewrap">
              <div className="pf-dovefloat">
                <svg className="pf-dove" viewBox="0 0 120 72" aria-hidden="true">
                  <defs>
                    <linearGradient id="pfDoveG" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#ffffff" />
                      <stop offset="1" stopColor="#cdd9f2" />
                    </linearGradient>
                  </defs>
                  {/* body */}
                  <path d="M30 44 C40 38 56 36 70 40 C82 43 92 40 100 32 C96 44 86 52 72 53 C60 54 44 54 34 50 Z"
                        fill="url(#pfDoveG)" />
                  {/* head */}
                  <circle cx="98" cy="33" r="6.5" fill="url(#pfDoveG)" />
                  <path d="M104 32 l8 -2 -6 5 z" fill="#E3C074" />
                  {/* tail */}
                  <path d="M30 44 L14 50 L24 44 L12 44 L28 40 Z" fill="#dbe4f6" />
                  {/* wing (animated) */}
                  <path className="pf-wing"
                        d="M58 42 C64 24 78 16 92 14 C84 28 76 40 64 46 Z"
                        fill="#ffffff" opacity=".96" />
                </svg>
                <div className="pf-ribbon">
                  <span>🔥</span><span className="pf-rnum">12</span><span>day streak</span>
                </div>
                <div className="pf-rcap">carried in peace</div>
              </div>
            </div>

            <p className="pf-kick">SATURDAY, JUNE 25</p>
            <h1 className="pf-greet pf-serif">Good afternoon, Lulu.</h1>
            <p className="pf-sub">The sun is up and so is your faithfulness. Here's your walk with God today.</p>

            <div className="pf-chips">
              <span className="pf-chip">📖 Day <b>47</b> of 365</span>
              <span className="pf-chip">⭐ Walk Score <b>340</b></span>
            </div>

            {/* STAR PATH */}
            <div className="pf-path">
              <div className="pf-path-head">
                <b className="pf-serif">Your Journey</b>
                <span>Day 1 → 365</span>
              </div>
              <svg className="pf-pathsvg" viewBox="0 0 760 80" preserveAspectRatio="none" aria-hidden="true">
                <path id="pfTrail" className="pf-pdash"
                      d="M16 60 C120 18 200 64 300 40 C400 18 470 66 560 38 C640 16 700 50 744 28"
                      fill="none" stroke="rgba(227,192,116,.45)" strokeWidth="1.6" />
                {/* milestone stars */}
                <g fill="#fff" opacity=".5">
                  <circle cx="16" cy="60" r="2.4" />
                  <circle cx="155" cy="40" r="2" />
                  <circle cx="300" cy="40" r="2" />
                  <circle cx="430" cy="36" r="2" />
                  <circle cx="560" cy="38" r="2" />
                  <circle cx="660" cy="34" r="2" />
                  <circle cx="744" cy="28" r="2.4" />
                </g>
                {/* "you are here" Day 47 */}
                <g className="pf-here">
                  <circle cx="120" cy="46" r="6" fill="#E3C074" />
                  <circle cx="120" cy="46" r="11" fill="none" stroke="rgba(227,192,116,.5)" strokeWidth="1" />
                  <text x="120" y="22" textAnchor="middle" fontSize="10" fill="#E3C074" fontWeight="700">Day 47 · you are here</text>
                </g>
                {/* traveling shimmer */}
                <circle className="pf-shimmer" r="3.2" fill="#fff"
                        style={{ offsetPath: "path('M16 60 C120 18 200 64 300 40 C400 18 470 66 560 38 C640 16 700 50 744 28')" } as React.CSSProperties} />
              </svg>
              <p className="pf-path-foot">Walking the year with God, one glowing star at a time.</p>
            </div>
          </section>

          {/* DEVOTIONAL */}
          <section className="pf-card">
            <div className="pf-dev-top">
              <h2 className="pf-serif">Today's Devotional</h2>
              <span className="pf-tag">EVENING</span>
            </div>
            <p className="pf-dev-kick">MATTHEW 27:51</p>
            <h3 className="pf-dev-title pf-serif">He tore the veil from His side</h3>
            <p className="pf-dev-body">When Jesus breathed His last, the curtain of the temple split from top to bottom— not from the bottom up. The way to God was opened by heaven, not by us.</p>
            <Link href="#" className="pf-btn">Read tonight's walk →</Link>
          </section>

          {/* ENCOURAGEMENT WALL */}
          <section className="pf-card">
            <div className="pf-wall-top">
              <h3 className="pf-serif">Encouragement Wall</h3>
              <span>COMMUNITY</span>
            </div>
            <div className="pf-w-item">
              <div className="pf-wav b">MR</div>
              <div>
                <div className="pf-w-name">Maria</div>
                <div className="pf-w-text">Praying for everyone keeping their streak this week—keep walking! 🙌</div>
                <div className="pf-w-chips"><span>❤️ 14</span><span>🙏 9</span><span>🔥 5</span></div>
              </div>
            </div>
            <div className="pf-w-item">
              <div className="pf-wav g">DV</div>
              <div>
                <div className="pf-w-name">David</div>
                <div className="pf-w-text">That veil verse hit different tonight. Grateful for this community.</div>
                <div className="pf-w-chips"><span>❤️ 21</span><span>🙏 12</span><span>👏 6</span></div>
              </div>
            </div>
          </section>

          {/* SECONDARY ROW */}
          <div className="pf-grid2">
            {/* weekly chart */}
            <section className="pf-card">
              <p className="pf-mini-h">This week <span>· walk score</span></p>
              <svg className="pf-chartsvg" viewBox="0 0 280 90" aria-hidden="true">
                <g fill="#E3C074">
                  <rect className="pf-bar" x="6"   y="40" width="26" height="40" rx="4" opacity=".75" />
                  <rect className="pf-bar" x="44"  y="28" width="26" height="52" rx="4" opacity=".8" />
                  <rect className="pf-bar" x="82"  y="50" width="26" height="30" rx="4" opacity=".7" />
                  <rect className="pf-bar" x="120" y="18" width="26" height="62" rx="4" opacity=".9" />
                  <rect className="pf-bar" x="158" y="34" width="26" height="46" rx="4" opacity=".8" />
                  <rect className="pf-bar" x="196" y="10" width="26" height="70" rx="4" />
                  <rect className="pf-bar" x="234" y="44" width="26" height="36" rx="4" opacity=".72" />
                </g>
                <line x1="2" y1="80" x2="272" y2="80" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
              </svg>
            </section>

            {/* leaderboard */}
            <section className="pf-card">
              <p className="pf-mini-h">The Inner Circle <span>· this week</span></p>

              <div className="pf-lb-row">
                <div className="pf-lb-ring you">LJ</div>
                <div className="pf-lb-name">Lulu <small>· you</small>
                  <div className="pf-lb-chips"><span>🔥 12</span><span>📖 8</span><span>🙏 5</span></div>
                </div>
                <div className="pf-lb-score">340</div>
              </div>
              <div className="pf-lb-row">
                <div className="pf-lb-ring">MR</div>
                <div className="pf-lb-name">Maria
                  <div className="pf-lb-chips"><span>🔥 9</span><span>📖 6</span><span>🙏 7</span></div>
                </div>
                <div className="pf-lb-score">290</div>
              </div>
              <div className="pf-lb-row">
                <div className="pf-lb-ring">DV</div>
                <div className="pf-lb-name">David
                  <div className="pf-lb-chips"><span>🔥 5</span><span>📖 7</span><span>🙏 4</span></div>
                </div>
                <div className="pf-lb-score">255</div>
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
