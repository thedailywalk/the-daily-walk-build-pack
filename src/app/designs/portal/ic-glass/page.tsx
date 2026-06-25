import Link from "next/link";

export const metadata = { title: "Portal — Glasshouse", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pf-icglass">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-icglass {
  --navy0: #0e1626;
  --navy1: #16263f;
  --gold: #E3C074;
  --gold-soft: #f0d79a;
  --teal: #46d6c8;
  --amethyst: #b07cf0;
  --ink: #e8eef7;
  --muted: #9fb0c7;
  --glass-bg: rgba(28, 44, 72, 0.42);
  --glass-bg-fallback: #1a2c47;
  --glass-border: rgba(227, 192, 116, 0.22);
  --glass-glow: rgba(227, 192, 116, 0.16);
  position: relative;
  min-height: 100vh;
  color: var(--ink);
  background: var(--navy0);
  background: linear-gradient(160deg, var(--navy0) 0%, var(--navy1) 100%);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.pf-icglass *, .pf-icglass *::before, .pf-icglass *::after { box-sizing: border-box; }

/* animated color blobs */
.pf-icglass .pf-blobs { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.pf-icglass .pf-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.5; }
.pf-icglass .pf-blob.b1 { width: 460px; height: 460px; top: -120px; left: -80px; background: radial-gradient(circle, rgba(227,192,116,0.55), transparent 70%); }
.pf-icglass .pf-blob.b2 { width: 520px; height: 520px; bottom: -160px; right: -100px; background: radial-gradient(circle, rgba(70,214,200,0.45), transparent 70%); }
.pf-icglass .pf-blob.b3 { width: 400px; height: 400px; top: 40%; left: 45%; background: radial-gradient(circle, rgba(176,124,240,0.42), transparent 70%); }

.pf-icglass .pf-shell { position: relative; z-index: 1; display: flex; gap: 26px; max-width: 1150px; margin: 0 auto; padding: 26px 22px 60px; }

/* sidebar */
.pf-icglass .pf-side {
  flex: 0 0 240px; align-self: flex-start; position: sticky; top: 26px;
  background: var(--glass-bg-fallback);
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  border: 1px solid var(--glass-border);
  border-radius: 22px; padding: 20px 16px;
  box-shadow: 0 18px 50px rgba(0,0,0,0.45), 0 0 30px var(--glass-glow);
}
.pf-icglass .pf-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
.pf-icglass .pf-logo {
  width: 46px; height: 46px; border-radius: 14px; flex: 0 0 46px;
  display: grid; place-items: center; font-size: 22px;
  background: linear-gradient(145deg, var(--gold), var(--gold-soft));
  box-shadow: 0 6px 18px rgba(227,192,116,0.4), inset 0 1px 2px rgba(255,255,255,0.6);
}
.pf-icglass .pf-brand-name { font-family: "Instrument Serif", "Playfair Display", Georgia, serif; font-size: 18px; line-height: 1.1; color: #fff; }
.pf-icglass .pf-brand-sub { font-size: 9.5px; letter-spacing: 2.5px; color: var(--gold); margin-top: 3px; font-weight: 600; }
.pf-icglass .pf-nav { display: flex; flex-direction: column; gap: 4px; }
.pf-icglass .pf-nav a {
  display: flex; align-items: center; gap: 11px; padding: 10px 12px; border-radius: 12px;
  color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500;
  transition: background .25s, color .25s, box-shadow .25s; border: 1px solid transparent;
}
.pf-icglass .pf-nav a:hover { color: var(--ink); background: rgba(255,255,255,0.05); }
.pf-icglass .pf-nav a.active {
  color: #fff; background: linear-gradient(100deg, rgba(227,192,116,0.22), rgba(70,214,200,0.12));
  border-color: var(--glass-border); box-shadow: 0 0 18px var(--glass-glow);
}
.pf-icglass .pf-nav .ico { width: 18px; text-align: center; }
.pf-icglass .pf-side-foot { margin-top: 22px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 11px; }
.pf-icglass .pf-avatar {
  width: 42px; height: 42px; border-radius: 50%; flex: 0 0 42px; display: grid; place-items: center;
  font-size: 14px; font-weight: 700; color: #0e1626;
  background: linear-gradient(135deg, var(--gold), var(--amethyst));
  box-shadow: 0 0 0 2px rgba(14,22,38,1), 0 0 0 4px rgba(227,192,116,0.55), 0 0 16px var(--glass-glow);
}
.pf-icglass .pf-av-name { font-size: 14px; font-weight: 600; color: #fff; }
.pf-icglass .pf-av-tier { font-size: 9.5px; letter-spacing: 1.8px; color: var(--gold); font-weight: 700; margin-top: 2px; }

.pf-icglass .pf-main { flex: 1 1 auto; min-width: 0; }
.pf-icglass .pf-back { display: inline-block; color: var(--muted); text-decoration: none; font-size: 13px; margin-bottom: 16px; transition: color .2s; }
.pf-icglass .pf-back:hover { color: var(--gold); }

/* glass card base */
.pf-icglass .pf-card {
  background: var(--glass-bg-fallback);
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  border: 1px solid var(--glass-border);
  border-radius: 22px; padding: 22px;
  box-shadow: 0 16px 44px rgba(0,0,0,0.42), 0 0 24px var(--glass-glow), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: transform .3s ease, box-shadow .3s ease;
}
.pf-icglass .pf-card:hover { transform: translateY(-4px); box-shadow: 0 22px 56px rgba(0,0,0,0.5), 0 0 34px rgba(227,192,116,0.3); }

.pf-icglass .pf-kicker { font-size: 11px; letter-spacing: 2.5px; color: var(--gold); font-weight: 700; }
.pf-icglass .pf-serif { font-family: "Instrument Serif", "Playfair Display", Georgia, serif; }

/* hero */
.pf-icglass .pf-hero { position: relative; overflow: hidden; margin-bottom: 22px; }
.pf-icglass .pf-hero h1 {
  font-family: "Instrument Serif", "Playfair Display", Georgia, serif;
  font-size: 38px; line-height: 1.05; margin: 8px 0 10px; color: #fff;
  background: linear-gradient(90deg, #fff 20%, var(--gold-soft) 50%, #fff 80%);
  background-size: 220% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.pf-icglass .pf-hero p { color: var(--muted); font-size: 15px; max-width: 540px; margin: 0 0 18px; line-height: 1.55; }
.pf-icglass .pf-float { position: absolute; right: 24px; top: 18px; font-size: 54px; filter: drop-shadow(0 8px 18px rgba(227,192,116,0.4)); }
.pf-icglass .pf-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.pf-icglass .pf-chip {
  display: inline-flex; align-items: center; gap: 7px; padding: 8px 14px; border-radius: 999px;
  font-size: 13px; font-weight: 600; color: var(--ink);
  background: rgba(255,255,255,0.06); border: 1px solid var(--glass-border);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}

.pf-icglass .pf-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 22px; margin-bottom: 22px; }
.pf-icglass .pf-grid3 { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 22px; }
.pf-icglass .pf-h { font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold); font-weight: 700; margin: 0 0 16px; }

/* walk score */
.pf-icglass .pf-score-num { font-family: "Instrument Serif", Georgia, serif; font-size: 64px; line-height: 1; color: #fff; }
.pf-icglass .pf-score-lvl { font-size: 14px; color: var(--teal); font-weight: 700; margin-left: 8px; }
.pf-icglass .pf-bar { height: 12px; border-radius: 999px; background: rgba(255,255,255,0.08); margin: 16px 0 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
.pf-icglass .pf-bar-fill {
  height: 100%; width: 60%; border-radius: 999px;
  background: linear-gradient(90deg, var(--gold), var(--teal));
  box-shadow: 0 0 14px var(--teal);
}
.pf-icglass .pf-bar-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); }

/* chart */
.pf-icglass .pf-chart { width: 100%; height: auto; display: block; }
.pf-icglass .pf-chart .draw { stroke-dasharray: 600; stroke-dashoffset: 0; }

/* leaderboard */
.pf-icglass .pf-lb-row { display: flex; align-items: center; gap: 13px; padding: 12px; border-radius: 14px; margin-bottom: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); transition: background .25s, box-shadow .25s; }
.pf-icglass .pf-lb-row:last-child { margin-bottom: 0; }
.pf-icglass .pf-lb-row:hover { background: rgba(255,255,255,0.07); box-shadow: 0 0 16px var(--glass-glow); }
.pf-icglass .pf-lb-row.me { border-color: var(--glass-border); background: linear-gradient(100deg, rgba(227,192,116,0.16), rgba(70,214,200,0.07)); }
.pf-icglass .pf-rank { font-size: 13px; font-weight: 700; color: var(--muted); width: 16px; }
.pf-icglass .pf-ring {
  width: 38px; height: 38px; border-radius: 50%; flex: 0 0 38px; display: grid; place-items: center;
  font-size: 13px; font-weight: 700; color: #0e1626;
}
.pf-icglass .pf-ring.r1 { background: linear-gradient(135deg, var(--gold), var(--amethyst)); }
.pf-icglass .pf-ring.r2 { background: linear-gradient(135deg, var(--teal), #2f8fd6); }
.pf-icglass .pf-ring.r3 { background: linear-gradient(135deg, var(--amethyst), #7457c9); }
.pf-icglass .pf-lb-name { font-size: 14px; font-weight: 600; color: #fff; flex: 1 1 auto; }
.pf-icglass .pf-lb-stats { display: flex; gap: 6px; }
.pf-icglass .pf-mini { font-size: 11px; padding: 3px 7px; border-radius: 999px; background: rgba(255,255,255,0.06); color: var(--muted); white-space: nowrap; }
.pf-icglass .pf-lb-score { font-size: 16px; font-weight: 700; color: var(--gold); width: 38px; text-align: right; }

/* badges */
.pf-icglass .pf-badges { display: flex; flex-wrap: wrap; gap: 14px; }
.pf-icglass .pf-badge {
  width: 64px; height: 64px; border-radius: 18px; display: grid; place-items: center; font-size: 28px;
  background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
  box-shadow: 0 0 18px var(--glass-glow), inset 0 1px 0 rgba(255,255,255,0.08);
  transition: transform .25s, box-shadow .25s;
}
.pf-icglass .pf-badge:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 0 26px rgba(227,192,116,0.4); }
.pf-icglass .pf-badge.locked { font-size: 13px; color: var(--muted); opacity: 0.6; border-style: dashed; box-shadow: none; }

/* devotional */
.pf-icglass .pf-dev-title { font-family: "Instrument Serif", Georgia, serif; font-size: 22px; color: #fff; margin: 0 0 10px; line-height: 1.2; }
.pf-icglass .pf-dev-verse { font-size: 14px; color: var(--muted); font-style: italic; line-height: 1.5; margin: 0 0 16px; }
.pf-icglass .pf-link { color: var(--gold); text-decoration: none; font-weight: 700; font-size: 14px; transition: color .2s; }
.pf-icglass .pf-link:hover { color: var(--gold-soft); }

/* encouragement compact */
.pf-icglass .pf-wall { padding: 18px; }
.pf-icglass .pf-wall .pf-h { margin-bottom: 12px; }
.pf-icglass .pf-note { font-size: 13px; color: var(--ink); padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.pf-icglass .pf-note .who { color: var(--gold); font-weight: 600; }
.pf-icglass .pf-react { display: flex; gap: 6px; }
.pf-icglass .pf-react span { font-size: 11px; padding: 2px 7px; border-radius: 999px; background: rgba(255,255,255,0.06); color: var(--muted); }
.pf-icglass .pf-wall-foot { margin-top: 12px; }

@media (max-width: 860px) {
  .pf-icglass .pf-shell { flex-direction: column; }
  .pf-icglass .pf-side { position: static; flex: 1 1 auto; width: 100%; }
  .pf-icglass .pf-grid, .pf-icglass .pf-grid3 { grid-template-columns: 1fr; }
  .pf-icglass .pf-hero h1 { font-size: 30px; }
  .pf-icglass .pf-float { font-size: 40px; }
}

@media (prefers-reduced-motion: no-preference) {
  .pf-icglass .pf-blob.b1 { animation: pf-drift1 22s ease-in-out infinite; }
  .pf-icglass .pf-blob.b2 { animation: pf-drift2 28s ease-in-out infinite; }
  .pf-icglass .pf-blob.b3 { animation: pf-drift3 25s ease-in-out infinite; }
  .pf-icglass .pf-hero h1 { animation: pf-shimmer 6s linear infinite; }
  .pf-icglass .pf-float { animation: pf-float 5s ease-in-out infinite; }
  .pf-icglass .pf-chip .flame, .pf-icglass .pf-mini .flame { display: inline-block; animation: pf-flame 1.6s ease-in-out infinite; }
  .pf-icglass .pf-bar-fill { width: 0; animation: pf-fill 2s cubic-bezier(.22,1,.36,1) .3s forwards; }
  .pf-icglass .pf-chart .draw { stroke-dashoffset: 600; animation: pf-draw 2.4s ease-out .4s forwards; }
}

@keyframes pf-drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(80px,60px) scale(1.15); } }
@keyframes pf-drift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-70px,-50px) scale(1.1); } }
@keyframes pf-drift3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-60px,70px) scale(1.2); } }
@keyframes pf-shimmer { to { background-position: 220% center; } }
@keyframes pf-float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(4deg); } }
@keyframes pf-flame { 0%,100% { transform: scale(1) rotate(0); } 50% { transform: scale(1.25) rotate(-6deg); } }
@keyframes pf-fill { to { width: 60%; } }
@keyframes pf-draw { to { stroke-dashoffset: 0; } }
`,
        }}
      />

      <div className="pf-blobs" aria-hidden="true">
        <div className="pf-blob b1" />
        <div className="pf-blob b2" />
        <div className="pf-blob b3" />
      </div>

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
            <a className="active" href="#"><span className="ico">🏠</span> Dashboard</a>
            <a href="#"><span className="ico">🛤️</span> My Journey</a>
            <a href="#"><span className="ico">✨</span> Daily Wonders</a>
            <a href="#"><span className="ico">🙏</span> Prayer</a>
            <a href="#"><span className="ico">📖</span> Scripture Memory</a>
            <a href="#"><span className="ico">💬</span> Prayer Wall</a>
            <a href="#"><span className="ico">⚙️</span> My Settings</a>
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
          <Link href="/designs/portal" className="pf-back">← All portal designs</Link>

          {/* HERO */}
          <section className="pf-card pf-hero">
            <div className="pf-float" aria-hidden="true">🕊️</div>
            <div className="pf-kicker">SATURDAY, JUNE 25</div>
            <h1>Good afternoon, Lulu.</h1>
            <p>The sun is up and so is your faithfulness. Here's your walk with God today.</p>
            <div className="pf-chips">
              <span className="pf-chip"><span className="flame">🔥</span> 12-day streak</span>
              <span className="pf-chip">📖 Day 47 of 365</span>
              <span className="pf-chip">⭐ Walk Score 340</span>
            </div>
          </section>

          {/* WALK SCORE + CHART */}
          <div className="pf-grid">
            <section className="pf-card">
              <p className="pf-h">Walk Score</p>
              <div>
                <span className="pf-score-num">340</span>
                <span className="pf-score-lvl">Growing</span>
              </div>
              <div className="pf-bar"><div className="pf-bar-fill" /></div>
              <div className="pf-bar-labels"><span>Growing</span><span>Flourishing</span></div>
            </section>

            <section className="pf-card">
              <p className="pf-h">This Week</p>
              <svg className="pf-chart" viewBox="0 0 300 120" preserveAspectRatio="none" role="img" aria-label="Weekly activity chart">
                <defs>
                  <linearGradient id="pfStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E3C074" />
                    <stop offset="50%" stopColor="#46d6c8" />
                    <stop offset="100%" stopColor="#b07cf0" />
                  </linearGradient>
                  <linearGradient id="pfFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(70,214,200,0.35)" />
                    <stop offset="100%" stopColor="rgba(70,214,200,0)" />
                  </linearGradient>
                </defs>
                <path d="M0,90 L50,70 L100,80 L150,45 L200,55 L250,25 L300,35 L300,120 L0,120 Z" fill="url(#pfFill)" />
                <path className="draw" d="M0,90 L50,70 L100,80 L150,45 L200,55 L250,25 L300,35" fill="none" stroke="url(#pfStroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 6px rgba(70,214,200,0.7))" }} />
              </svg>
            </section>
          </div>

          {/* LEADERBOARD + BADGES */}
          <div className="pf-grid3">
            <section className="pf-card">
              <p className="pf-h">The Inner Circle · this week</p>
              <div className="pf-lb-row me">
                <span className="pf-rank">1</span>
                <div className="pf-ring r1">LJ</div>
                <span className="pf-lb-name">Lulu · you</span>
                <div className="pf-lb-stats">
                  <span className="pf-mini"><span className="flame">🔥</span>12</span>
                  <span className="pf-mini">📖 47</span>
                  <span className="pf-mini">🙏 9</span>
                </div>
                <span className="pf-lb-score">340</span>
              </div>
              <div className="pf-lb-row">
                <span className="pf-rank">2</span>
                <div className="pf-ring r2">MR</div>
                <span className="pf-lb-name">Maria</span>
                <div className="pf-lb-stats">
                  <span className="pf-mini">🔥 9</span>
                  <span className="pf-mini">📖 41</span>
                  <span className="pf-mini">🙏 7</span>
                </div>
                <span className="pf-lb-score">290</span>
              </div>
              <div className="pf-lb-row">
                <span className="pf-rank">3</span>
                <div className="pf-ring r3">DV</div>
                <span className="pf-lb-name">David</span>
                <div className="pf-lb-stats">
                  <span className="pf-mini">🔥 6</span>
                  <span className="pf-mini">📖 38</span>
                  <span className="pf-mini">🙏 5</span>
                </div>
                <span className="pf-lb-score">255</span>
              </div>
            </section>

            <section className="pf-card">
              <p className="pf-h">Badges</p>
              <div className="pf-badges">
                <div className="pf-badge" title="First Steps">👣</div>
                <div className="pf-badge" title="Streak Keeper">🔥</div>
                <div className="pf-badge" title="Heart of Gold">💛</div>
                <div className="pf-badge" title="Word Reader">📖</div>
                <div className="pf-badge" title="Prayer Warrior">🙏</div>
                <div className="pf-badge locked" title="Locked">✦ secret</div>
              </div>
            </section>
          </div>

          {/* DEVOTIONAL */}
          <section className="pf-card" style={{ marginBottom: "22px" }}>
            <p className="pf-h">Today's Devotional</p>
            <h2 className="pf-dev-title">He tore the veil from His side</h2>
            <p className="pf-dev-verse">“The veil of the temple was torn in two…” — Matthew 27:51</p>
            <Link href="#" className="pf-link">Read today's →</Link>
          </section>

          {/* ENCOURAGEMENT WALL — COMPACT */}
          <section className="pf-card pf-wall">
            <p className="pf-h">Encouragement Wall</p>
            <div className="pf-note">
              <span><span className="who">Maria:</span> Praying for everyone's week ahead 🙌</span>
              <div className="pf-react"><span>❤️ 8</span><span>🙏 4</span></div>
            </div>
            <div className="pf-note">
              <span><span className="who">David:</span> Day 38 done — He is faithful.</span>
              <div className="pf-react"><span>🔥 6</span><span>💛 3</span></div>
            </div>
            <div className="pf-wall-foot">
              <Link href="#" className="pf-link">Post a note →</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
