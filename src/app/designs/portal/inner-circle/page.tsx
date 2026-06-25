import Link from "next/link";

export const metadata = { title: "Portal Design — Inner Circle", robots: { index: false } };
export const dynamic = "force-static";

export default function InnerCirclePortalDesign() {
  return (
    <div className="pf-circle">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-circle {
  --navy: #1F3A5F;
  --navy-deep: #0f1a2e;
  --abyss: #0a1220;
  --gold: #C9A24B;
  --gold-bright: #E3C074;
  --ink: #e8edf5;
  --muted: #9fb0c8;
  --line: rgba(201,162,75,0.18);
  --card: rgba(255,255,255,0.035);
  --card-hi: rgba(255,255,255,0.06);
  min-height: 100vh;
  background:
    radial-gradient(1100px 600px at 80% -10%, rgba(31,58,95,0.55), transparent 60%),
    radial-gradient(900px 500px at 0% 110%, rgba(201,162,75,0.10), transparent 55%),
    linear-gradient(160deg, #14233b 0%, var(--navy-deep) 45%, var(--abyss) 100%);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.pf-circle * { box-sizing: border-box; }
.pf-circle a { text-decoration: none; color: inherit; }

.pf-circle .pf-shell { display: flex; min-height: 100vh; max-width: 1100px; margin: 0 auto; }

/* Sidebar */
.pf-circle .pf-side {
  width: 232px; flex-shrink: 0; padding: 26px 18px;
  border-right: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(15,26,46,0.65), rgba(10,18,32,0.4));
  backdrop-filter: blur(6px);
}
.pf-circle .pf-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
.pf-circle .pf-logo {
  width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center;
  background: linear-gradient(145deg, var(--gold-bright), var(--gold));
  box-shadow: 0 6px 18px rgba(201,162,75,0.35), inset 0 1px 0 rgba(255,255,255,0.4);
  font-size: 20px;
}
.pf-circle .pf-brand b { font-size: 15px; letter-spacing: .2px; }
.pf-circle .pf-brand small { display: block; color: var(--gold-bright); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; }
.pf-circle .pf-nav { display: flex; flex-direction: column; gap: 4px; }
.pf-circle .pf-nav a {
  display: flex; align-items: center; gap: 11px; padding: 10px 12px; border-radius: 10px;
  color: var(--muted); font-size: 13.5px; font-weight: 500; transition: all .15s;
}
.pf-circle .pf-nav a:hover { color: var(--ink); background: var(--card); }
.pf-circle .pf-nav a.pf-active {
  color: #fff; background: linear-gradient(90deg, rgba(201,162,75,0.22), rgba(201,162,75,0.04));
  box-shadow: inset 0 0 0 1px var(--line);
}
.pf-circle .pf-nav a .pf-ic { width: 18px; text-align: center; }
.pf-circle .pf-side-foot { margin-top: 26px; padding-top: 18px; border-top: 1px solid var(--line); }

/* Main */
.pf-circle .pf-main { flex: 1; min-width: 0; padding: 26px 28px 48px; }
.pf-circle .pf-back { display: inline-block; color: var(--gold-bright); font-size: 12.5px; margin-bottom: 16px; opacity: .85; }
.pf-circle .pf-back:hover { opacity: 1; }

.pf-circle .pf-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
.pf-circle .pf-hello small { color: var(--gold-bright); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; }
.pf-circle .pf-hello h1 { margin: 4px 0 0; font-size: 26px; font-weight: 700; letter-spacing: -.4px; }
.pf-circle .pf-hello span { color: var(--muted); font-size: 13px; }
.pf-circle .pf-streak {
  display: flex; align-items: center; gap: 12px; padding: 12px 18px; border-radius: 14px;
  background: linear-gradient(135deg, rgba(201,162,75,0.16), rgba(201,162,75,0.03));
  border: 1px solid var(--line); box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.pf-circle .pf-streak .pf-fire { font-size: 26px; filter: drop-shadow(0 0 8px rgba(227,192,116,0.5)); }
.pf-circle .pf-streak b { font-size: 22px; }
.pf-circle .pf-streak small { display: block; color: var(--muted); font-size: 11px; }

/* Avatars */
.pf-circle .pf-av {
  border-radius: 50%; display: grid; place-items: center; color: #0f1a2e; font-weight: 800;
  background: linear-gradient(145deg, var(--gold-bright), var(--gold));
  position: relative; flex-shrink: 0;
}
.pf-circle .pf-av.pf-ring { box-shadow: 0 0 0 2px var(--abyss), 0 0 0 4px var(--gold), 0 0 14px rgba(201,162,75,0.4); }

/* Grid + cards */
.pf-circle .pf-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 18px; }
.pf-circle .pf-col { display: flex; flex-direction: column; gap: 18px; }
.pf-circle .pf-card {
  background: var(--card); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 20px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05);
}
.pf-circle .pf-card.pf-glow { border-color: var(--line); box-shadow: 0 14px 40px rgba(0,0,0,0.4), 0 0 30px rgba(201,162,75,0.07), inset 0 1px 0 rgba(255,255,255,0.06); }
.pf-circle .pf-card-h { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.pf-circle .pf-card-h h3 { margin: 0; font-size: 14px; font-weight: 700; letter-spacing: .3px; }
.pf-circle .pf-card-h .pf-tag { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-bright); }
.pf-circle .pf-hr { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: .35; margin: 14px 0; }

/* Walk score */
.pf-circle .pf-score-wrap { display: flex; align-items: center; gap: 22px; }
.pf-circle .pf-ring-wrap { position: relative; width: 132px; height: 132px; flex-shrink: 0; }
.pf-circle .pf-ring-wrap .pf-ring-mid { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; }
.pf-circle .pf-ring-wrap .pf-ring-mid b { font-size: 32px; line-height: 1; }
.pf-circle .pf-ring-wrap .pf-ring-mid small { color: var(--muted); font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; }
.pf-circle .pf-level b { font-size: 18px; color: var(--gold-bright); }
.pf-circle .pf-level p { color: var(--muted); font-size: 12.5px; margin: 6px 0 14px; }
.pf-circle .pf-prog { height: 9px; border-radius: 6px; background: rgba(255,255,255,0.08); overflow: hidden; }
.pf-circle .pf-prog i { display: block; height: 100%; width: 60%; border-radius: 6px; background: linear-gradient(90deg, var(--gold), var(--gold-bright)); box-shadow: 0 0 12px rgba(227,192,116,0.5); }
.pf-circle .pf-prog-lbl { display: flex; justify-content: space-between; margin-top: 7px; font-size: 11px; color: var(--muted); }

/* Stat chips */
.pf-circle .pf-chips { display: flex; gap: 8px; flex-wrap: wrap; }
.pf-circle .pf-chip {
  display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: var(--ink);
}
.pf-circle .pf-chip b { color: var(--gold-bright); }

/* Journey */
.pf-circle .pf-journey b { font-size: 20px; }
.pf-circle .pf-journey .pf-jp { color: var(--muted); font-size: 12.5px; margin: 4px 0 14px; }

/* Leaderboard */
.pf-circle .pf-lb-row {
  display: flex; align-items: center; gap: 14px; padding: 12px; border-radius: 14px; margin-bottom: 10px;
  border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.025);
}
.pf-circle .pf-lb-row.pf-you { border-color: var(--gold); background: linear-gradient(90deg, rgba(201,162,75,0.16), rgba(201,162,75,0.03)); }
.pf-circle .pf-medal { font-size: 22px; width: 30px; text-align: center; flex-shrink: 0; }
.pf-circle .pf-lb-name { flex: 1; min-width: 0; }
.pf-circle .pf-lb-name b { display: block; font-size: 14px; }
.pf-circle .pf-lb-name .pf-xp { color: var(--gold-bright); font-size: 11.5px; font-weight: 600; }
.pf-circle .pf-lb-chips { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
.pf-circle .pf-mini {
  display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 8px;
  background: rgba(0,0,0,0.25); font-size: 11px; color: var(--muted); border: 1px solid rgba(255,255,255,0.05);
}

/* Badges */
.pf-circle .pf-badges { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.pf-circle .pf-badge {
  aspect-ratio: 1; border-radius: 14px; display: grid; place-items: center; position: relative;
  background: linear-gradient(160deg, rgba(201,162,75,0.14), rgba(255,255,255,0.02));
  border: 1px solid var(--gold); box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 6px 16px rgba(0,0,0,0.3);
  font-size: 26px;
}
.pf-circle .pf-badge.pf-lock { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); opacity: .55; font-size: 22px; }
.pf-circle .pf-badge small { position: absolute; bottom: 5px; left: 0; right: 0; text-align: center; font-size: 8px; color: var(--muted); letter-spacing: .3px; }

/* Devotional */
.pf-circle .pf-dev .pf-ref { color: var(--gold-bright); font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
.pf-circle .pf-dev h2 { font-family: Georgia, "Playfair Display", serif; font-size: 24px; font-weight: 600; margin: 8px 0 12px; line-height: 1.3; }
.pf-circle .pf-dev p { color: var(--muted); font-size: 14px; line-height: 1.7; margin: 0 0 16px; }
.pf-circle .pf-btn {
  display: inline-block; padding: 10px 20px; border-radius: 11px; font-size: 13px; font-weight: 700;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold)); color: #15233b;
  box-shadow: 0 8px 22px rgba(201,162,75,0.35), inset 0 1px 0 rgba(255,255,255,0.4);
}

/* Encouragement wall */
.pf-circle .pf-enc { display: flex; gap: 12px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.pf-circle .pf-enc:last-child { border-bottom: 0; }
.pf-circle .pf-enc .pf-et b { font-size: 13px; }
.pf-circle .pf-enc .pf-et p { color: var(--muted); font-size: 13px; margin: 4px 0 8px; line-height: 1.5; }
.pf-circle .pf-react { display: flex; gap: 6px; }
.pf-circle .pf-react span {
  font-size: 12px; padding: 3px 9px; border-radius: 999px; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08); color: var(--muted);
}

/* Chart legend */
.pf-circle .pf-legend { display: flex; gap: 16px; font-size: 11.5px; color: var(--muted); margin-top: 10px; }
.pf-circle .pf-legend i { display: inline-block; width: 18px; height: 3px; border-radius: 2px; margin-right: 6px; vertical-align: middle; }

@media (max-width: 860px) {
  .pf-circle .pf-shell { flex-direction: column; }
  .pf-circle .pf-side { width: 100%; border-right: 0; border-bottom: 1px solid var(--line); }
  .pf-circle .pf-nav { flex-direction: row; flex-wrap: wrap; }
  .pf-circle .pf-side-foot { display: none; }
  .pf-circle .pf-grid { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .pf-circle .pf-badges { grid-template-columns: repeat(3, 1fr); }
  .pf-circle .pf-lb-chips { display: none; }
}
`,
        }}
      />

      <div className="pf-shell">
        {/* Sidebar */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-logo">👣</div>
            <div>
              <b>The Daily Walk</b>
              <small>Inner Circle</small>
            </div>
          </div>
          <nav className="pf-nav">
            <a className="pf-active" href="#"><span className="pf-ic">▣</span> Dashboard</a>
            <a href="#"><span className="pf-ic">🧭</span> My Journey</a>
            <a href="#"><span className="pf-ic">✨</span> Daily Wonders</a>
            <a href="#"><span className="pf-ic">🙏</span> Prayer</a>
            <a href="#"><span className="pf-ic">📖</span> Scripture Memory</a>
            <a href="#"><span className="pf-ic">💬</span> Prayer Wall</a>
            <a href="#"><span className="pf-ic">⚙️</span> My Settings</a>
          </nav>
          <div className="pf-side-foot">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="pf-av pf-ring" style={{ width: 40, height: 40, fontSize: 14 }}>LJ</div>
              <div>
                <b style={{ fontSize: 13 }}>Lulu</b>
                <small style={{ display: "block", color: "var(--gold-bright)", fontSize: 10, letterSpacing: 1 }}>PATRON</small>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="pf-main">
          <Link className="pf-back" href="/designs/portal">← All portal designs</Link>

          <div className="pf-top">
            <div className="pf-hello">
              <small>Saturday, June 25</small>
              <h1>Good evening, Lulu</h1>
              <span>You&rsquo;re on Day 47 of your 365-day walk.</span>
            </div>
            <div className="pf-streak">
              <span className="pf-fire">🔥</span>
              <div>
                <b>12</b> <small>day streak</small>
              </div>
            </div>
          </div>

          <div className="pf-grid">
            {/* Left column */}
            <div className="pf-col">
              {/* Walk Score */}
              <section className="pf-card pf-glow">
                <div className="pf-card-h">
                  <h3>Walk Score</h3>
                  <span className="pf-tag">Level · Growing</span>
                </div>
                <div className="pf-score-wrap">
                  <div className="pf-ring-wrap">
                    <svg width="132" height="132" viewBox="0 0 132 132">
                      <defs>
                        <linearGradient id="pfScoreG" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#E3C074" />
                          <stop offset="100%" stopColor="#C9A24B" />
                        </linearGradient>
                      </defs>
                      <circle cx="66" cy="66" r="56" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                      <circle
                        cx="66" cy="66" r="56" fill="none" stroke="url(#pfScoreG)" strokeWidth="12"
                        strokeLinecap="round" strokeDasharray="351.8" strokeDashoffset="140.7"
                        transform="rotate(-90 66 66)"
                      />
                    </svg>
                    <div className="pf-ring-mid">
                      <div>
                        <b>340</b>
                        <small>Walk Score</small>
                      </div>
                    </div>
                  </div>
                  <div className="pf-level" style={{ flex: 1 }}>
                    <b>Growing</b>
                    <p>Keep going&mdash;you&rsquo;re close to the next level.</p>
                    <div className="pf-prog"><i /></div>
                    <div className="pf-prog-lbl">
                      <span>Growing</span>
                      <span>~60% to Flourishing</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Weekly chart */}
              <section className="pf-card">
                <div className="pf-card-h">
                  <h3>This Week</h3>
                  <span className="pf-tag">vs last week</span>
                </div>
                <svg width="100%" height="160" viewBox="0 0 480 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pfFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(201,162,75,0.28)" />
                      <stop offset="100%" stopColor="rgba(201,162,75,0)" />
                    </linearGradient>
                  </defs>
                  {[30, 65, 100, 135].map((y) => (
                    <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  {/* last week (verses 2-ish, muted) */}
                  <polyline
                    points="20,120 100,108 180,118 260,95 340,105 420,98 460,110"
                    fill="none" stroke="rgba(159,176,200,0.5)" strokeWidth="2" strokeDasharray="5 5"
                  />
                  {/* this week (gold, days walked) */}
                  <polygon points="20,100 100,70 180,85 260,45 340,60 420,30 460,38 460,150 20,150" fill="url(#pfFill)" />
                  <polyline
                    points="20,100 100,70 180,85 260,45 340,60 420,30 460,38"
                    fill="none" stroke="#E3C074" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  />
                  {[
                    [20, 100], [100, 70], [180, 85], [260, 45], [340, 60], [420, 30], [460, 38],
                  ].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="#0f1a2e" stroke="#E3C074" strokeWidth="2" />
                  ))}
                </svg>
                <div className="pf-legend">
                  <span><i style={{ background: "#E3C074" }} /> This week</span>
                  <span><i style={{ background: "rgba(159,176,200,0.6)" }} /> Last week</span>
                </div>
                <div className="pf-hr" />
                <div className="pf-chips">
                  <span className="pf-chip">🚶 Days walked <b>5</b> <span style={{ color: "var(--muted)" }}>/ 4</span></span>
                  <span className="pf-chip">📖 Verses <b>3</b> <span style={{ color: "var(--muted)" }}>/ 2</span></span>
                </div>
              </section>

              {/* Leaderboard */}
              <section className="pf-card pf-glow">
                <div className="pf-card-h">
                  <h3>Weekly Leaderboard</h3>
                  <span className="pf-tag">The Inner Circle</span>
                </div>

                <div className="pf-lb-row pf-you">
                  <span className="pf-medal">🥇</span>
                  <div className="pf-av pf-ring" style={{ width: 42, height: 42, fontSize: 15 }}>LJ</div>
                  <div className="pf-lb-name">
                    <b>Lulu <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: 11 }}>(you)</span></b>
                    <span className="pf-xp">2,480 XP</span>
                  </div>
                  <div className="pf-lb-chips">
                    <span className="pf-mini">🔥 12</span>
                    <span className="pf-mini">📖 3</span>
                    <span className="pf-mini">🙏 9</span>
                  </div>
                </div>

                <div className="pf-lb-row">
                  <span className="pf-medal">🥈</span>
                  <div className="pf-av" style={{ width: 42, height: 42, fontSize: 15, background: "linear-gradient(145deg,#7fa6d4,#3f6aa3)", color: "#fff" }}>MR</div>
                  <div className="pf-lb-name">
                    <b>Maria</b>
                    <span className="pf-xp">2,210 XP</span>
                  </div>
                  <div className="pf-lb-chips">
                    <span className="pf-mini">🔥 9</span>
                    <span className="pf-mini">📖 2</span>
                    <span className="pf-mini">🙏 7</span>
                  </div>
                </div>

                <div className="pf-lb-row">
                  <span className="pf-medal">🥉</span>
                  <div className="pf-av" style={{ width: 42, height: 42, fontSize: 15, background: "linear-gradient(145deg,#9ad0b8,#3f8a6a)", color: "#fff" }}>DV</div>
                  <div className="pf-lb-name">
                    <b>David</b>
                    <span className="pf-xp">1,940 XP</span>
                  </div>
                  <div className="pf-lb-chips">
                    <span className="pf-mini">🔥 7</span>
                    <span className="pf-mini">📖 2</span>
                    <span className="pf-mini">🙏 5</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="pf-col">
              {/* Journey */}
              <section className="pf-card">
                <div className="pf-card-h">
                  <h3>Bible in a Year</h3>
                  <span className="pf-tag">Premium</span>
                </div>
                <div className="pf-journey">
                  <b>Day 47 <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: 14 }}>of 365</span></b>
                  <p className="pf-jp">Today: Exodus 19&ndash;20 &middot; Psalm 47</p>
                  <div className="pf-prog"><i style={{ width: "13%" }} /></div>
                  <div className="pf-prog-lbl">
                    <span>13% complete</span>
                    <span>318 days to go</span>
                  </div>
                </div>
              </section>

              {/* Today's devotional */}
              <section className="pf-card pf-glow pf-dev">
                <div className="pf-card-h">
                  <h3>Today&rsquo;s Devotional</h3>
                  <span className="pf-tag">Evening</span>
                </div>
                <span className="pf-ref">Matthew 27:51</span>
                <h2>He tore the veil from His side</h2>
                <p>
                  When Jesus breathed His last, the curtain of the temple split from top to bottom&mdash;
                  not from the bottom up. The way to God was opened by heaven, not by us.
                </p>
                <Link className="pf-btn" href="#">Read tonight&rsquo;s walk →</Link>
              </section>

              {/* Badges */}
              <section className="pf-card">
                <div className="pf-card-h">
                  <h3>Badges</h3>
                  <span className="pf-tag">4 earned</span>
                </div>
                <div className="pf-badges">
                  <div className="pf-badge">👣<small>First Step</small></div>
                  <div className="pf-badge">🔥<small>10 Day</small></div>
                  <div className="pf-badge">💛<small>Generous</small></div>
                  <div className="pf-badge">📖<small>Scholar</small></div>
                  <div className="pf-badge pf-lock">✦<small>Secret</small></div>
                </div>
              </section>

              {/* Encouragement wall */}
              <section className="pf-card">
                <div className="pf-card-h">
                  <h3>Encouragement Wall</h3>
                  <span className="pf-tag">Community</span>
                </div>
                <div className="pf-enc">
                  <div className="pf-av" style={{ width: 38, height: 38, fontSize: 13, background: "linear-gradient(145deg,#7fa6d4,#3f6aa3)", color: "#fff" }}>MR</div>
                  <div className="pf-et">
                    <b>Maria</b>
                    <p>&ldquo;Praying for everyone keeping their streak this week&mdash;keep walking! 🙌&rdquo;</p>
                    <div className="pf-react"><span>❤️ 14</span><span>🙏 9</span><span>🔥 5</span></div>
                  </div>
                </div>
                <div className="pf-enc">
                  <div className="pf-av" style={{ width: 38, height: 38, fontSize: 13, background: "linear-gradient(145deg,#9ad0b8,#3f8a6a)", color: "#fff" }}>DV</div>
                  <div className="pf-et">
                    <b>David</b>
                    <p>&ldquo;That veil verse hit different tonight. Grateful for this community.&rdquo;</p>
                    <div className="pf-react"><span>❤️ 21</span><span>🙏 12</span><span>👏 6</span></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
