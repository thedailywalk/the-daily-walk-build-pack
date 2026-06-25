import Link from "next/link";

export const metadata = { title: "Portal Design — Trailhead", robots: { index: false } };
export const dynamic = "force-static";

export default function TrailheadPortalDesign() {
  return (
    <div className="pf-trail">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-trail {
  --navy: #1F3A5F;
  --navy-deep: #16293f;
  --gold: #C9A24B;
  --gold-dark: #B8902E;
  --cream: #FAF6EE;
  --ink: #22262B;
  --teal: #2DBFA8;
  --green: #46B86A;
  --coral: #F2734D;
  --purple: #8B6CD9;
  --white: #FFFFFF;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--ink);
  background:
    radial-gradient(1200px 500px at 10% -10%, rgba(45,191,168,.18), transparent 60%),
    radial-gradient(1000px 500px at 100% 0%, rgba(201,162,75,.20), transparent 55%),
    var(--cream);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.pf-trail * { box-sizing: border-box; }
.pf-trail a { text-decoration: none; color: inherit; }

.pf-trail .pf-back {
  display: inline-flex; align-items: center; gap: 6px;
  margin: 18px 0 0 22px; font-weight: 700; font-size: 14px;
  color: var(--navy); background: var(--white);
  padding: 8px 14px; border-radius: 999px;
  box-shadow: 0 4px 14px rgba(31,58,95,.12);
  border: 2px solid rgba(31,58,95,.08);
}
.pf-trail .pf-back:hover { transform: translateY(-1px); }

.pf-trail .pf-shell {
  max-width: 1100px; margin: 0 auto; padding: 16px 22px 60px;
  display: grid; grid-template-columns: 240px 1fr; gap: 22px;
}

/* Sidebar */
.pf-trail .pf-side {
  background: linear-gradient(160deg, var(--navy), var(--navy-deep));
  color: var(--white); border-radius: 26px; padding: 22px 16px;
  box-shadow: 0 16px 40px rgba(31,58,95,.30);
  align-self: start; position: sticky; top: 16px;
}
.pf-trail .pf-brand {
  display: flex; align-items: center; gap: 10px;
  font-weight: 800; font-size: 18px; padding: 6px 8px 18px;
}
.pf-trail .pf-brand .pf-logo {
  width: 38px; height: 38px; border-radius: 12px;
  background: linear-gradient(135deg, var(--gold), var(--coral));
  display: grid; place-items: center; font-size: 20px;
  box-shadow: 0 6px 14px rgba(0,0,0,.25);
}
.pf-trail .pf-nav { display: flex; flex-direction: column; gap: 6px; }
.pf-trail .pf-nav a {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 14px; border-radius: 14px;
  font-weight: 600; font-size: 14.5px; color: rgba(255,255,255,.82);
}
.pf-trail .pf-nav a .pf-ico { font-size: 18px; width: 22px; text-align: center; }
.pf-trail .pf-nav a:hover { background: rgba(255,255,255,.10); color: #fff; }
.pf-trail .pf-nav a.pf-active {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: var(--navy-deep); font-weight: 800;
  box-shadow: 0 8px 18px rgba(201,162,75,.35);
}

/* Main */
.pf-trail .pf-main { display: flex; flex-direction: column; gap: 18px; min-width: 0; }

.pf-trail .pf-hero {
  background: linear-gradient(135deg, var(--navy), #2a4f7a);
  color: var(--white); border-radius: 26px; padding: 26px 28px;
  display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
  box-shadow: 0 16px 40px rgba(31,58,95,.28); position: relative; overflow: hidden;
}
.pf-trail .pf-hero::after {
  content: ""; position: absolute; right: -40px; bottom: -60px;
  width: 220px; height: 220px; border-radius: 50%;
  background: radial-gradient(circle, rgba(201,162,75,.35), transparent 70%);
}
.pf-trail .pf-avatar {
  width: 88px; height: 88px; border-radius: 50%;
  display: grid; place-items: center; font-weight: 800; font-size: 30px;
  color: #fff; flex: none; border: 4px solid rgba(255,255,255,.25);
  box-shadow: 0 10px 24px rgba(0,0,0,.25);
}
.pf-trail .pf-hero-txt { flex: 1; min-width: 200px; z-index: 1; }
.pf-trail .pf-hero-txt .pf-eyebrow { font-size: 13px; font-weight: 700; color: var(--gold); letter-spacing: .04em; }
.pf-trail .pf-hero-txt h1 { margin: 4px 0 4px; font-size: 30px; font-weight: 800; font-family: Georgia, "Playfair Display", serif; }
.pf-trail .pf-hero-txt p { margin: 0; color: rgba(255,255,255,.82); font-size: 14.5px; }

.pf-trail .pf-flame {
  z-index: 1; text-align: center; background: rgba(255,255,255,.10);
  border-radius: 22px; padding: 14px 22px; border: 2px solid rgba(255,255,255,.18);
}
.pf-trail .pf-flame .pf-fire { font-size: 46px; line-height: 1; filter: drop-shadow(0 4px 8px rgba(242,115,77,.5)); }
.pf-trail .pf-flame .pf-num { font-size: 34px; font-weight: 900; color: var(--gold); line-height: 1; }
.pf-trail .pf-flame .pf-lbl { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.8); text-transform: uppercase; letter-spacing: .05em; }

/* generic cards */
.pf-trail .pf-card {
  background: var(--white); border-radius: 22px; padding: 22px;
  box-shadow: 0 10px 28px rgba(31,58,95,.10); border: 2px solid rgba(31,58,95,.05);
}
.pf-trail .pf-card h2 {
  margin: 0 0 4px; font-size: 18px; font-weight: 800; color: var(--navy);
  display: flex; align-items: center; gap: 8px;
}
.pf-trail .pf-card .pf-sub { margin: 0 0 16px; font-size: 13px; color: #6b7280; }

.pf-trail .pf-row { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; }
.pf-trail .pf-row3 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

/* XP bar */
.pf-trail .pf-xp-top { display: flex; justify-content: space-between; align-items: baseline; }
.pf-trail .pf-xp-score { font-size: 40px; font-weight: 900; color: var(--navy); line-height: 1; }
.pf-trail .pf-xp-score small { font-size: 15px; font-weight: 700; color: var(--gold-dark); }
.pf-trail .pf-level-pill {
  background: linear-gradient(135deg, var(--teal), var(--green)); color: #fff;
  font-weight: 800; font-size: 12.5px; padding: 7px 14px; border-radius: 999px;
  box-shadow: 0 6px 14px rgba(45,191,168,.35);
}
.pf-trail .pf-bar-labels { display: flex; justify-content: space-between; margin: 16px 0 6px; font-size: 12.5px; font-weight: 700; color: #6b7280; }
.pf-trail .pf-bar-svg { width: 100%; display: block; }
.pf-trail .pf-bar-cap { margin-top: 8px; font-size: 13px; color: #6b7280; }
.pf-trail .pf-bar-cap b { color: var(--coral); }

/* day badge */
.pf-trail .pf-day {
  display: flex; align-items: center; gap: 14px; margin-top: 18px;
  background: var(--cream); border-radius: 16px; padding: 14px 16px;
  border: 2px dashed rgba(201,162,75,.5);
}
.pf-trail .pf-day .pf-day-ico { font-size: 28px; }
.pf-trail .pf-day .pf-day-n { font-weight: 900; color: var(--navy); font-size: 17px; }
.pf-trail .pf-day .pf-day-t { font-size: 13px; color: #6b7280; }

/* weekly chart */
.pf-trail .pf-stats { display: flex; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
.pf-trail .pf-stat {
  flex: 1; min-width: 120px; background: var(--cream); border-radius: 14px; padding: 10px 12px;
}
.pf-trail .pf-stat .pf-stat-v { font-weight: 900; color: var(--navy); font-size: 20px; }
.pf-trail .pf-stat .pf-stat-v .pf-up { color: var(--green); font-size: 13px; font-weight: 800; }
.pf-trail .pf-stat .pf-stat-l { font-size: 12px; color: #6b7280; font-weight: 600; }

/* leaderboard */
.pf-trail .pf-lead { display: flex; flex-direction: column; gap: 10px; }
.pf-trail .pf-lead-row {
  display: flex; align-items: center; gap: 12px;
  background: var(--cream); border-radius: 16px; padding: 10px 14px;
}
.pf-trail .pf-lead-row.pf-me { background: linear-gradient(135deg, rgba(201,162,75,.18), rgba(45,191,168,.14)); border: 2px solid rgba(201,162,75,.4); }
.pf-trail .pf-medal { font-size: 22px; width: 26px; text-align: center; }
.pf-trail .pf-mini-av {
  width: 40px; height: 40px; border-radius: 50%; flex: none;
  display: grid; place-items: center; color: #fff; font-weight: 800; font-size: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,.15);
}
.pf-trail .pf-lead-name { font-weight: 800; color: var(--navy); flex: 1; }
.pf-trail .pf-lead-name span { display: block; font-size: 11.5px; color: #6b7280; font-weight: 600; }
.pf-trail .pf-lead-xp { font-weight: 900; color: var(--gold-dark); font-size: 15px; }

/* badges */
.pf-trail .pf-badges { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.pf-trail .pf-badge {
  border-radius: 18px; padding: 16px 8px; text-align: center; color: #fff;
  box-shadow: 0 8px 18px rgba(0,0,0,.12);
}
.pf-trail .pf-badge .pf-b-emoji { font-size: 30px; }
.pf-trail .pf-badge .pf-b-name { font-size: 11.5px; font-weight: 800; margin-top: 4px; }
.pf-trail .pf-b1 { background: linear-gradient(135deg, var(--teal), #1f9f8c); }
.pf-trail .pf-b2 { background: linear-gradient(135deg, var(--coral), #d85a36); }
.pf-trail .pf-b3 { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); }
.pf-trail .pf-b4 { background: linear-gradient(135deg, var(--navy), #2a4f7a); }
.pf-trail .pf-b5 { background: linear-gradient(135deg, var(--purple), #6b4fc0); }
.pf-trail .pf-b6 { background: linear-gradient(135deg, var(--green), #2f9650); }
.pf-trail .pf-locked { background: repeating-linear-gradient(45deg, #d7d2c7, #d7d2c7 10px, #cfc9bc 10px, #cfc9bc 20px); color: #7a7468; }
.pf-trail .pf-locked .pf-b-name { color: #7a7468; }

/* devotional */
.pf-trail .pf-devo { background: linear-gradient(135deg, #fff, var(--cream)); }
.pf-trail .pf-devo .pf-verse-ref { font-weight: 800; color: var(--gold-dark); font-size: 13px; }
.pf-trail .pf-devo .pf-devo-title { font-family: Georgia, serif; font-size: 22px; color: var(--navy); font-weight: 800; margin: 4px 0 8px; }
.pf-trail .pf-devo p { font-size: 14.5px; color: #4b5563; line-height: 1.6; margin: 0 0 16px; }
.pf-trail .pf-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: var(--navy-deep);
  font-weight: 800; font-size: 15px; padding: 13px 24px; border-radius: 16px;
  box-shadow: 0 6px 0 var(--gold-dark), 0 12px 20px rgba(201,162,75,.35);
  border: none; transition: transform .08s ease, box-shadow .08s ease;
}
.pf-trail .pf-btn:hover { transform: translateY(2px); box-shadow: 0 4px 0 var(--gold-dark), 0 8px 14px rgba(201,162,75,.3); }

/* encouragement wall */
.pf-trail .pf-enc { display: flex; flex-direction: column; gap: 12px; }
.pf-trail .pf-enc-item {
  display: flex; gap: 12px; background: var(--cream); border-radius: 16px; padding: 14px;
}
.pf-trail .pf-enc-item .pf-mini-av { width: 44px; height: 44px; }
.pf-trail .pf-enc-body { flex: 1; }
.pf-trail .pf-enc-body .pf-enc-name { font-weight: 800; color: var(--navy); font-size: 14px; }
.pf-trail .pf-enc-body .pf-enc-name span { color: #9ca3af; font-weight: 600; font-size: 12px; }
.pf-trail .pf-enc-body p { margin: 4px 0 10px; font-size: 14px; color: #4b5563; line-height: 1.5; }
.pf-trail .pf-react { display: flex; gap: 8px; flex-wrap: wrap; }
.pf-trail .pf-react button {
  font-family: inherit; cursor: default; background: #fff; border: 2px solid rgba(31,58,95,.10);
  border-radius: 999px; padding: 6px 12px; font-size: 13px; font-weight: 700; color: var(--navy);
  box-shadow: 0 3px 8px rgba(31,58,95,.08);
}
.pf-trail .pf-react button:hover { transform: translateY(-1px); border-color: var(--gold); }

@media (max-width: 880px) {
  .pf-trail .pf-shell { grid-template-columns: 1fr; }
  .pf-trail .pf-side { position: static; }
  .pf-trail .pf-nav { flex-direction: row; flex-wrap: wrap; }
  .pf-trail .pf-nav a { flex: 1 1 auto; }
  .pf-trail .pf-row, .pf-trail .pf-row3 { grid-template-columns: 1fr; }
  .pf-trail .pf-badges { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 480px) {
  .pf-trail .pf-badges { grid-template-columns: repeat(2, 1fr); }
  .pf-trail .pf-hero-txt h1 { font-size: 24px; }
}
        `,
        }}
      />

      <Link href="/designs/portal" className="pf-back">← All portal designs</Link>

      <div className="pf-shell">
        {/* Sidebar */}
        <aside className="pf-side">
          <div className="pf-brand">
            <span className="pf-logo">🥾</span>
            The Daily Walk
          </div>
          <nav className="pf-nav">
            <a href="#" className="pf-active"><span className="pf-ico">🏠</span> Dashboard</a>
            <a href="#"><span className="pf-ico">🧭</span> My Journey</a>
            <a href="#"><span className="pf-ico">✨</span> Daily Wonders</a>
            <a href="#"><span className="pf-ico">🙏</span> Prayer</a>
            <a href="#"><span className="pf-ico">📖</span> Scripture Memory</a>
            <a href="#"><span className="pf-ico">💬</span> Prayer Wall</a>
            <a href="#"><span className="pf-ico">⚙️</span> My Settings</a>
          </nav>
        </aside>

        {/* Main */}
        <main className="pf-main">
          {/* Hero */}
          <section className="pf-hero">
            <div className="pf-avatar" style={{ background: "linear-gradient(135deg, #C9A24B, #F2734D)" }}>LJ</div>
            <div className="pf-hero-txt">
              <div className="pf-eyebrow">SATURDAY, JUNE 25</div>
              <h1>Good afternoon, Lulu! 👋</h1>
              <p>You&apos;re on fire this week — keep walking, one step at a time.</p>
            </div>
            <div className="pf-flame">
              <div className="pf-fire">🔥</div>
              <div className="pf-num">12</div>
              <div className="pf-lbl">Day Streak</div>
            </div>
          </section>

          {/* XP + Day */}
          <section className="pf-card">
            <div className="pf-xp-top">
              <div>
                <h2>🏆 Walk Score</h2>
                <div className="pf-xp-score">340 <small>XP</small></div>
              </div>
              <span className="pf-level-pill">Level: Growing 🌱</span>
            </div>

            <div className="pf-bar-labels">
              <span>Growing</span>
              <span>60% to Flourishing 🌳</span>
            </div>
            <svg className="pf-bar-svg" viewBox="0 0 600 34" preserveAspectRatio="none" role="img" aria-label="XP progress 60 percent">
              <defs>
                <linearGradient id="pfBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#2DBFA8" />
                  <stop offset="0.55" stopColor="#46B86A" />
                  <stop offset="1" stopColor="#C9A24B" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="600" height="34" rx="17" fill="#ECE6D8" />
              <rect x="0" y="0" width="360" height="34" rx="17" fill="url(#pfBar)" />
              <circle cx="345" cy="17" r="11" fill="#fff" stroke="#C9A24B" strokeWidth="3" />
            </svg>
            <div className="pf-bar-cap">Just <b>60 XP</b> to reach the next level. Today&apos;s reading earns +20!</div>

            <div className="pf-day">
              <span className="pf-day-ico">🧭</span>
              <div>
                <div className="pf-day-n">Day 47 of 365</div>
                <div className="pf-day-t">Your Bible-in-a-Year journey</div>
              </div>
            </div>
          </section>

          {/* Weekly chart + leaderboard */}
          <div className="pf-row">
            <section className="pf-card">
              <h2>📊 This Week</h2>
              <p className="pf-sub">You&apos;re ahead of last week — nice momentum!</p>
              <div className="pf-stats">
                <div className="pf-stat">
                  <div className="pf-stat-v">5 <span className="pf-up">▲ vs 4</span></div>
                  <div className="pf-stat-l">Days walked</div>
                </div>
                <div className="pf-stat">
                  <div className="pf-stat-v">3 <span className="pf-up">▲ vs 2</span></div>
                  <div className="pf-stat-l">Verses memorized</div>
                </div>
              </div>
              <svg viewBox="0 0 320 160" width="100%" role="img" aria-label="Weekly days walked chart">
                <line x1="28" y1="130" x2="312" y2="130" stroke="#E6E0D2" strokeWidth="2" />
                {[
                  { d: "M", h: 70, c: "#2DBFA8" },
                  { d: "T", h: 95, c: "#46B86A" },
                  { d: "W", h: 50, c: "#C9A24B" },
                  { d: "T", h: 0, c: "#E6E0D2" },
                  { d: "F", h: 110, c: "#F2734D" },
                  { d: "S", h: 88, c: "#8B6CD9" },
                  { d: "S", h: 0, c: "#E6E0D2" },
                ].map((b, i) => {
                  const x = 34 + i * 40;
                  const y = 130 - b.h;
                  return (
                    <g key={i}>
                      <rect x={x} y={b.h === 0 ? 122 : y} width="26" height={b.h === 0 ? 8 : b.h} rx="7" fill={b.c} />
                      <text x={x + 13} y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6b7280">{b.d}</text>
                    </g>
                  );
                })}
              </svg>
            </section>

            <section className="pf-card">
              <h2>🏅 Leaderboard</h2>
              <p className="pf-sub">Your walking circle this week</p>
              <div className="pf-lead">
                <div className="pf-lead-row pf-me">
                  <span className="pf-medal">🥇</span>
                  <span className="pf-mini-av" style={{ background: "linear-gradient(135deg,#C9A24B,#F2734D)" }}>LJ</span>
                  <span className="pf-lead-name">Lulu <span>That&apos;s you!</span></span>
                  <span className="pf-lead-xp">340 XP</span>
                </div>
                <div className="pf-lead-row">
                  <span className="pf-medal">🥈</span>
                  <span className="pf-mini-av" style={{ background: "linear-gradient(135deg,#2DBFA8,#46B86A)" }}>M</span>
                  <span className="pf-lead-name">Maria <span>+15 today</span></span>
                  <span className="pf-lead-xp">315 XP</span>
                </div>
                <div className="pf-lead-row">
                  <span className="pf-medal">🥉</span>
                  <span className="pf-mini-av" style={{ background: "linear-gradient(135deg,#8B6CD9,#6b4fc0)" }}>D</span>
                  <span className="pf-lead-name">David <span>Catching up!</span></span>
                  <span className="pf-lead-xp">298 XP</span>
                </div>
              </div>
            </section>
          </div>

          {/* Badges */}
          <section className="pf-card">
            <h2>🎖️ Your Badges</h2>
            <p className="pf-sub">6 earned · 1 secret badge waiting to be unlocked</p>
            <div className="pf-badges">
              <div className="pf-badge pf-b1"><div className="pf-b-emoji">👣</div><div className="pf-b-name">First Steps</div></div>
              <div className="pf-badge pf-b2"><div className="pf-b-emoji">🔥</div><div className="pf-b-name">Streak Star</div></div>
              <div className="pf-badge pf-b3"><div className="pf-b-emoji">💛</div><div className="pf-b-name">Kind Heart</div></div>
              <div className="pf-badge pf-b4"><div className="pf-b-emoji">📖</div><div className="pf-b-name">Word Lover</div></div>
              <div className="pf-badge pf-b5"><div className="pf-b-emoji">🙏</div><div className="pf-b-name">Prayer Warrior</div></div>
              <div className="pf-badge pf-b6"><div className="pf-b-emoji">⭐</div><div className="pf-b-name">Rising Star</div></div>
              <div className="pf-badge pf-locked"><div className="pf-b-emoji">❓</div><div className="pf-b-name">Secret Badge</div></div>
            </div>
          </section>

          {/* Devotional + Encouragement */}
          <div className="pf-row3">
            <section className="pf-card pf-devo">
              <h2>🌅 Today&apos;s Devotional</h2>
              <div className="pf-verse-ref">MATTHEW 27:51</div>
              <div className="pf-devo-title">He tore the veil from His side</div>
              <p>
                At the moment Jesus breathed His last, the temple curtain ripped in two — top to
                bottom. The barrier between us and God is gone for good. Today, walk straight into
                His presence; you&apos;re always welcome.
              </p>
              <button className="pf-btn" type="button">Read &amp; earn +20 XP 🌟</button>
            </section>

            <section className="pf-card">
              <h2>💬 Encouragement Wall</h2>
              <p className="pf-sub">Cheer each other on</p>
              <div className="pf-enc">
                <div className="pf-enc-item">
                  <span className="pf-mini-av" style={{ background: "linear-gradient(135deg,#2DBFA8,#46B86A)" }}>M</span>
                  <div className="pf-enc-body">
                    <div className="pf-enc-name">Maria <span>· 2h ago</span></div>
                    <p>12-day streak Lulu?! You&apos;re inspiring me to keep going. 🙌</p>
                    <div className="pf-react">
                      <button type="button">❤️ 8</button>
                      <button type="button">🙏 4</button>
                      <button type="button">🔥 6</button>
                    </div>
                  </div>
                </div>
                <div className="pf-enc-item">
                  <span className="pf-mini-av" style={{ background: "linear-gradient(135deg,#8B6CD9,#6b4fc0)" }}>D</span>
                  <div className="pf-enc-body">
                    <div className="pf-enc-name">David <span>· yesterday</span></div>
                    <p>That verse about the veil hit different today. Grateful for this group. 💛</p>
                    <div className="pf-react">
                      <button type="button">❤️ 11</button>
                      <button type="button">🙏 7</button>
                      <button type="button">👏 3</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
