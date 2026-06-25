import Link from "next/link";

export const metadata = { title: "Portal — Aurora Lights", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-icaur">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-icaur *, .pf-icaur *::before, .pf-icaur *::after { box-sizing: border-box; }
.pf-icaur {
  --navy: #0e1626;
  --navy2: #16263f;
  --teal: #36c7b8;
  --amethyst: #9b7ad0;
  --gold: #E3C074;
  --gold-deep: #B8902E;
  --ink: #dfe7f3;
  --muted: #9fb0c7;
  --line: rgba(159,176,199,0.16);
  --card: rgba(255,255,255,0.045);
  --card-line: rgba(255,255,255,0.09);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--ink);
  background: radial-gradient(1200px 700px at 80% -10%, rgba(155,122,208,0.10), transparent 60%),
              radial-gradient(1100px 650px at 0% 110%, rgba(54,199,184,0.08), transparent 55%),
              linear-gradient(160deg, var(--navy), var(--navy2));
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.pf-icaur a { color: inherit; text-decoration: none; }

/* faint page-wide aurora */
.pf-icaur .pf-bgaurora {
  position: fixed; inset: -20% -10% auto -10%; height: 60vh; z-index: 0; pointer-events: none;
  background:
    radial-gradient(40% 60% at 20% 30%, rgba(54,199,184,0.16), transparent 70%),
    radial-gradient(45% 55% at 70% 40%, rgba(155,122,208,0.16), transparent 70%),
    radial-gradient(35% 50% at 50% 60%, rgba(227,192,116,0.10), transparent 70%);
  filter: blur(40px); opacity: 0.55;
}

.pf-icaur .pf-shell {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 260px 1fr; gap: 0;
  max-width: 1150px; margin: 0 auto; min-height: 100vh;
}

/* ---------- SIDEBAR ---------- */
.pf-icaur .pf-side {
  border-right: 1px solid var(--line);
  padding: 26px 18px; display: flex; flex-direction: column; gap: 26px;
  background: linear-gradient(180deg, rgba(255,255,255,0.025), transparent);
}
.pf-icaur .pf-brand { display: flex; align-items: center; gap: 12px; }
.pf-icaur .pf-logo {
  width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; font-size: 22px;
  background: linear-gradient(140deg, var(--gold), var(--gold-deep));
  box-shadow: 0 6px 18px rgba(227,192,116,0.28); flex: none;
}
.pf-icaur .pf-brand-name { font-family: Georgia, "Playfair Display", serif; font-size: 18px; letter-spacing: .2px; }
.pf-icaur .pf-brand-sub { font-size: 10px; letter-spacing: 2.2px; color: var(--gold); margin-top: 2px; font-weight: 600; }

.pf-icaur .pf-nav { display: flex; flex-direction: column; gap: 4px; }
.pf-icaur .pf-nav a {
  display: flex; align-items: center; gap: 12px; padding: 11px 13px; border-radius: 11px;
  color: var(--muted); font-size: 14px; font-weight: 500; transition: all .18s ease;
  border: 1px solid transparent;
}
.pf-icaur .pf-nav a .pf-ic { width: 20px; text-align: center; font-size: 15px; }
.pf-icaur .pf-nav a:hover { color: var(--ink); background: rgba(255,255,255,0.04); }
.pf-icaur .pf-nav a.active {
  color: #fff; border-color: rgba(54,199,184,0.4);
  background: linear-gradient(100deg, rgba(54,199,184,0.16), rgba(155,122,208,0.14));
  box-shadow: 0 4px 16px rgba(54,199,184,0.14);
}
.pf-icaur .pf-side-foot { margin-top: auto; display: flex; align-items: center; gap: 11px; padding-top: 18px; border-top: 1px solid var(--line); }
.pf-icaur .pf-avatar {
  width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-size: 13px; font-weight: 700; color: #0e1626;
  background: linear-gradient(140deg, var(--teal), var(--amethyst)); flex: none;
  box-shadow: 0 0 0 2px var(--navy), 0 0 0 4px rgba(227,192,116,0.55);
}
.pf-icaur .pf-side-foot .pf-uname { font-size: 14px; font-weight: 600; }
.pf-icaur .pf-side-foot .pf-utier { font-size: 10px; letter-spacing: 1.6px; color: var(--gold); font-weight: 700; }

/* ---------- MAIN ---------- */
.pf-icaur .pf-main { padding: 26px 32px 56px; min-width: 0; }
.pf-icaur .pf-back { font-size: 13px; color: var(--muted); display: inline-block; margin-bottom: 20px; transition: color .18s; }
.pf-icaur .pf-back:hover { color: var(--teal); }

/* HERO */
.pf-icaur .pf-hero {
  position: relative; overflow: hidden; border-radius: 22px; padding: 36px 34px;
  border: 1px solid var(--card-line);
  background: linear-gradient(150deg, rgba(22,38,63,0.7), rgba(14,22,38,0.7));
}
.pf-icaur .pf-hero-aurora {
  position: absolute; inset: -40%; z-index: 0; pointer-events: none; opacity: .9;
  background:
    radial-gradient(35% 45% at 25% 35%, rgba(54,199,184,0.55), transparent 60%),
    radial-gradient(40% 50% at 65% 30%, rgba(155,122,208,0.5), transparent 62%),
    radial-gradient(30% 40% at 80% 70%, rgba(227,192,116,0.4), transparent 60%),
    radial-gradient(35% 45% at 40% 80%, rgba(54,199,184,0.35), transparent 62%);
  filter: blur(34px);
  background-size: 200% 200%;
}
.pf-icaur .pf-hero-inner { position: relative; z-index: 1; }
.pf-icaur .pf-kicker { font-size: 11px; letter-spacing: 2.6px; color: var(--gold); font-weight: 700; }
.pf-icaur .pf-hero h1 {
  font-family: Georgia, "Playfair Display", serif; font-weight: 500; margin: 10px 0 8px;
  font-size: 38px; line-height: 1.08; color: #fff;
}
.pf-icaur .pf-hero p { color: var(--ink); opacity: .9; max-width: 540px; font-size: 15px; line-height: 1.55; }
.pf-icaur .pf-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.pf-icaur .pf-chip {
  font-size: 13px; font-weight: 600; padding: 9px 14px; border-radius: 999px;
  background: rgba(14,22,38,0.55); border: 1px solid var(--card-line); backdrop-filter: blur(6px);
}

/* GRID */
.pf-icaur .pf-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; margin-top: 18px; }
.pf-icaur .pf-card {
  border-radius: 18px; padding: 22px; border: 1px solid var(--card-line);
  background: var(--card); transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.pf-icaur .pf-card:hover {
  transform: translateY(-3px); border-color: rgba(54,199,184,0.35);
  box-shadow: 0 14px 34px rgba(0,0,0,0.35), 0 0 0 1px rgba(54,199,184,0.12);
}
.pf-icaur .pf-card-h { font-size: 12px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--muted); font-weight: 700; margin-bottom: 16px; }

/* WALK SCORE */
.pf-icaur .pf-score-num { font-family: Georgia, serif; font-size: 56px; line-height: 1; color: #fff; }
.pf-icaur .pf-score-num small { font-size: 16px; color: var(--muted); font-family: Inter, sans-serif; margin-left: 6px; }
.pf-icaur .pf-level { display: inline-block; margin: 12px 0 18px; font-size: 12px; font-weight: 700; letter-spacing: 1px; padding: 5px 12px; border-radius: 999px;
  color: var(--teal); background: rgba(54,199,184,0.12); border: 1px solid rgba(54,199,184,0.3); }
.pf-icaur .pf-bartrack { height: 12px; border-radius: 999px; background: rgba(255,255,255,0.07); overflow: hidden; }
.pf-icaur .pf-barfill {
  height: 100%; width: 60%; border-radius: 999px;
  background: linear-gradient(90deg, var(--teal), var(--amethyst), var(--gold));
  background-size: 200% 100%;
  box-shadow: 0 0 14px rgba(54,199,184,0.5);
}
.pf-icaur .pf-bar-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); margin-top: 8px; }

/* CHART */
.pf-icaur .pf-chart { width: 100%; height: auto; display: block; }
.pf-icaur .pf-chart-line { stroke-dasharray: 600; stroke-dashoffset: 0; }

/* LEADERBOARD */
.pf-icaur .pf-lb { display: flex; flex-direction: column; gap: 10px; }
.pf-icaur .pf-lbrow { display: flex; align-items: center; gap: 13px; padding: 11px; border-radius: 13px; background: rgba(255,255,255,0.03); border: 1px solid transparent; transition: all .18s; }
.pf-icaur .pf-lbrow:hover { border-color: var(--card-line); background: rgba(255,255,255,0.05); }
.pf-icaur .pf-lbrow.me { background: linear-gradient(100deg, rgba(227,192,116,0.12), rgba(155,122,208,0.08)); border-color: rgba(227,192,116,0.32); }
.pf-icaur .pf-rank { width: 18px; font-size: 13px; font-weight: 700; color: var(--gold); text-align: center; flex: none; }
.pf-icaur .pf-lbav { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 700; color: #0e1626; flex: none;
  box-shadow: 0 0 0 2px var(--navy), 0 0 0 4px rgba(54,199,184,0.5); }
.pf-icaur .pf-lbav.a { background: linear-gradient(140deg, var(--teal), var(--amethyst)); }
.pf-icaur .pf-lbav.b { background: linear-gradient(140deg, var(--amethyst), var(--gold)); box-shadow: 0 0 0 2px var(--navy), 0 0 0 4px rgba(155,122,208,0.5); }
.pf-icaur .pf-lbav.c { background: linear-gradient(140deg, var(--gold), var(--teal)); box-shadow: 0 0 0 2px var(--navy), 0 0 0 4px rgba(227,192,116,0.5); }
.pf-icaur .pf-lbname { font-size: 14px; font-weight: 600; flex: 1; min-width: 0; }
.pf-icaur .pf-lbname span { font-size: 11px; color: var(--muted); font-weight: 500; }
.pf-icaur .pf-lbstats { display: flex; gap: 6px; }
.pf-icaur .pf-mini { font-size: 10.5px; padding: 3px 7px; border-radius: 999px; background: rgba(255,255,255,0.06); color: var(--muted); white-space: nowrap; }
.pf-icaur .pf-lbscore { font-family: Georgia, serif; font-size: 18px; color: #fff; flex: none; }

/* BADGES */
.pf-icaur .pf-badges { display: flex; flex-wrap: wrap; gap: 12px; }
.pf-icaur .pf-badge {
  width: 58px; height: 58px; border-radius: 16px; display: grid; place-items: center; font-size: 26px;
  background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.1), rgba(255,255,255,0.03));
  border: 1px solid var(--card-line);
}
.pf-icaur .pf-badge.locked { font-size: 12px; color: var(--muted); letter-spacing: .5px; background: rgba(255,255,255,0.02); border-style: dashed; }

/* DEVOTIONAL */
.pf-icaur .pf-dev h3 { font-family: Georgia, serif; font-weight: 500; font-size: 22px; color: #fff; margin: 0 0 10px; line-height: 1.2; }
.pf-icaur .pf-dev blockquote { margin: 0 0 18px; padding-left: 14px; border-left: 3px solid var(--gold); color: var(--ink); opacity: .88; font-style: italic; font-size: 14px; line-height: 1.5; }
.pf-icaur .pf-readbtn { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 700; color: var(--gold); }
.pf-icaur .pf-readbtn:hover { color: #fff; }

/* ENCOURAGEMENT WALL — compact */
.pf-icaur .pf-wall { padding: 16px 18px; }
.pf-icaur .pf-wall .pf-card-h { margin-bottom: 11px; }
.pf-icaur .pf-note { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--ink); opacity: .9; padding: 7px 0; border-bottom: 1px solid var(--line); }
.pf-icaur .pf-note .pf-who { font-weight: 700; color: var(--teal); flex: none; }
.pf-icaur .pf-note .pf-react { font-size: 11px; padding: 2px 7px; border-radius: 999px; background: rgba(255,255,255,0.06); flex: none; }
.pf-icaur .pf-wall-foot { margin-top: 11px; font-size: 12.5px; font-weight: 700; color: var(--gold); }
.pf-icaur .pf-wall-foot:hover { color: #fff; }

.pf-icaur .pf-twinkle { color: var(--gold); }

/* ---------- ANIMATIONS ---------- */
@media (prefers-reduced-motion: no-preference) {
  @keyframes pf-drift {
    0%   { transform: translate(0,0) rotate(0deg); background-position: 0% 50%; }
    50%  { transform: translate(3%, -2%) rotate(4deg); background-position: 100% 50%; }
    100% { transform: translate(0,0) rotate(0deg); background-position: 0% 50%; }
  }
  @keyframes pf-bgflow { 0%{transform:translateX(-3%);} 50%{transform:translateX(3%);} 100%{transform:translateX(-3%);} }
  @keyframes pf-fill { from { width: 0; } to { width: 60%; } }
  @keyframes pf-sheen { 0%{background-position:0% 50%;} 100%{background-position:200% 50%;} }
  @keyframes pf-flame { 0%,100%{ text-shadow: 0 0 6px rgba(227,192,116,0.0);} 50%{ text-shadow: 0 0 14px rgba(227,192,116,0.85);} }
  @keyframes pf-twinkle { 0%,100%{ opacity:.35; transform: scale(.9);} 50%{ opacity:1; transform: scale(1.15);} }
  @keyframes pf-shimmer { 0%{ background-position: 0% 50%;} 100%{ background-position: 200% 50%;} }
  @keyframes pf-draw { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }

  .pf-icaur .pf-hero-aurora { animation: pf-drift 18s ease-in-out infinite; }
  .pf-icaur .pf-bgaurora { animation: pf-bgflow 26s ease-in-out infinite; }
  .pf-icaur .pf-barfill { width: 0; animation: pf-fill 1.6s .3s ease-out forwards, pf-sheen 4s linear infinite; }
  .pf-icaur .pf-chip:first-child { animation: pf-flame 2.6s ease-in-out infinite; }
  .pf-icaur .pf-twinkle { animation: pf-twinkle 2.4s ease-in-out infinite; }
  .pf-icaur .pf-hero h1 {
    background: linear-gradient(90deg, #fff 0%, var(--gold) 50%, #fff 100%);
    background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    animation: pf-shimmer 6s linear infinite;
  }
  .pf-icaur .pf-chart-line { stroke-dashoffset: 600; animation: pf-draw 2s 0.4s ease-out forwards; }
}
.pf-icaur .pf-hero h1 { -webkit-text-fill-color: #fff; }

/* ---------- RESPONSIVE ---------- */
@media (max-width: 860px) {
  .pf-icaur .pf-shell { grid-template-columns: 1fr; }
  .pf-icaur .pf-side { flex-direction: row; flex-wrap: wrap; align-items: center; border-right: none; border-bottom: 1px solid var(--line); gap: 14px; }
  .pf-icaur .pf-nav { flex-direction: row; flex-wrap: wrap; flex: 1; }
  .pf-icaur .pf-side-foot { margin-top: 0; border-top: none; padding-top: 0; }
  .pf-icaur .pf-grid { grid-template-columns: 1fr; }
  .pf-icaur .pf-main { padding: 20px; }
  .pf-icaur .pf-hero h1 { font-size: 30px; }
}
`,
        }}
      />

      <div className="pf-bgaurora" />

      <div className="pf-shell">
        {/* SIDEBAR */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-logo">👣</div>
            <div>
              <div className="pf-brand-name">The Daily Walk</div>
              <div className="pf-brand-sub">INNER CIRCLE</div>
            </div>
          </div>

          <nav className="pf-nav">
            <Link href="#" className="active"><span className="pf-ic">🏠</span> Dashboard</Link>
            <Link href="#"><span className="pf-ic">🧭</span> My Journey</Link>
            <Link href="#"><span className="pf-ic">✨</span> Daily Wonders</Link>
            <Link href="#"><span className="pf-ic">🙏</span> Prayer</Link>
            <Link href="#"><span className="pf-ic">📖</span> Scripture Memory</Link>
            <Link href="#"><span className="pf-ic">🧱</span> Prayer Wall</Link>
            <Link href="#"><span className="pf-ic">⚙️</span> My Settings</Link>
          </nav>

          <div className="pf-side-foot">
            <div className="pf-avatar">LJ</div>
            <div>
              <div className="pf-uname">Lulu</div>
              <div className="pf-utier">PATRON</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="pf-main">
          <Link href="/designs/portal" className="pf-back">← All portal designs</Link>

          {/* HERO */}
          <section className="pf-hero">
            <div className="pf-hero-aurora" />
            <div className="pf-hero-inner">
              <div className="pf-kicker">SATURDAY, JUNE 25</div>
              <h1>Good afternoon, Lulu.</h1>
              <p>The sun is up and so is your faithfulness. Here&apos;s your walk with God today.</p>
              <div className="pf-chips">
                <span className="pf-chip">🔥 12-day streak</span>
                <span className="pf-chip">📖 Day 47 of 365</span>
                <span className="pf-chip">⭐ Walk Score 340</span>
              </div>
            </div>
          </section>

          {/* ROW 1: Walk Score + Chart */}
          <div className="pf-grid">
            <section className="pf-card">
              <div className="pf-card-h">Walk Score</div>
              <div className="pf-score-num">340<small>pts</small></div>
              <span className="pf-level">● Growing</span>
              <div className="pf-bartrack"><div className="pf-barfill" /></div>
              <div className="pf-bar-labels">
                <span>Growing</span>
                <span>Flourishing →</span>
              </div>
            </section>

            <section className="pf-card">
              <div className="pf-card-h">This Week</div>
              <svg className="pf-chart" viewBox="0 0 320 120" preserveAspectRatio="none" role="img" aria-label="Weekly walk score chart">
                <defs>
                  <linearGradient id="pfChartG" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#36c7b8" />
                    <stop offset="55%" stopColor="#9b7ad0" />
                    <stop offset="100%" stopColor="#E3C074" />
                  </linearGradient>
                  <linearGradient id="pfChartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(155,122,208,0.28)" />
                    <stop offset="100%" stopColor="rgba(155,122,208,0)" />
                  </linearGradient>
                </defs>
                <path d="M0,100 L48,82 L96,88 L144,60 L192,66 L240,40 L300,28 L320,24 L320,120 L0,120 Z" fill="url(#pfChartFill)" />
                <path className="pf-chart-line" d="M0,100 L48,82 L96,88 L144,60 L192,66 L240,40 L300,28 L320,24" fill="none" stroke="url(#pfChartG)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {[[0,100],[48,82],[96,88],[144,60],[192,66],[240,40],[300,28]].map(([x,y],i)=>(
                  <circle key={i} cx={x} cy={y} r="3.2" fill="#0e1626" stroke="#E3C074" strokeWidth="2" />
                ))}
              </svg>
            </section>
          </div>

          {/* ROW 2: Leaderboard + Badges */}
          <div className="pf-grid">
            <section className="pf-card">
              <div className="pf-card-h">The Inner Circle · this week</div>
              <div className="pf-lb">
                <div className="pf-lbrow me">
                  <div className="pf-rank">1</div>
                  <div className="pf-lbav a">LJ</div>
                  <div className="pf-lbname">Lulu <span>· you</span>
                    <div className="pf-lbstats" style={{ marginTop: 5 }}>
                      <span className="pf-mini">🔥 12</span><span className="pf-mini">📖 9</span><span className="pf-mini">🙏 6</span>
                    </div>
                  </div>
                  <div className="pf-lbscore">340</div>
                </div>
                <div className="pf-lbrow">
                  <div className="pf-rank">2</div>
                  <div className="pf-lbav b">MR</div>
                  <div className="pf-lbname">Maria
                    <div className="pf-lbstats" style={{ marginTop: 5 }}>
                      <span className="pf-mini">🔥 9</span><span className="pf-mini">📖 7</span><span className="pf-mini">🙏 5</span>
                    </div>
                  </div>
                  <div className="pf-lbscore">290</div>
                </div>
                <div className="pf-lbrow">
                  <div className="pf-rank">3</div>
                  <div className="pf-lbav c">DV</div>
                  <div className="pf-lbname">David
                    <div className="pf-lbstats" style={{ marginTop: 5 }}>
                      <span className="pf-mini">🔥 7</span><span className="pf-mini">📖 6</span><span className="pf-mini">🙏 4</span>
                    </div>
                  </div>
                  <div className="pf-lbscore">255</div>
                </div>
              </div>
            </section>

            <section className="pf-card">
              <div className="pf-card-h">Badges</div>
              <div className="pf-badges">
                <div className="pf-badge">👣</div>
                <div className="pf-badge">🔥</div>
                <div className="pf-badge">💛</div>
                <div className="pf-badge">📖</div>
                <div className="pf-badge">🙏</div>
                <div className="pf-badge locked">✦ secret</div>
              </div>
            </section>
          </div>

          {/* ROW 3: Devotional + Wall */}
          <div className="pf-grid">
            <section className="pf-card pf-dev">
              <div className="pf-card-h">Today&apos;s Devotional</div>
              <h3>He tore the veil from His side</h3>
              <blockquote>&ldquo;The veil of the temple was torn in two&hellip;&rdquo; — Matthew 27:51</blockquote>
              <Link href="#" className="pf-readbtn">Read today&apos;s →</Link>
            </section>

            <section className="pf-card pf-wall">
              <div className="pf-card-h">Encouragement Wall</div>
              <div className="pf-note">
                <span className="pf-who">Maria</span>
                <span>Praying for your week, friend!</span>
                <span className="pf-react">💛 4</span>
              </div>
              <div className="pf-note" style={{ borderBottom: "none" }}>
                <span className="pf-who">David</span>
                <span>That streak is inspiring 🔥</span>
                <span className="pf-react">🙏 3</span>
              </div>
              <Link href="#" className="pf-wall-foot">Post a note →</Link>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
