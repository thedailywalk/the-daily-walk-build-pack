import Link from "next/link";

export const metadata = { title: "Portal Design — Aurora", robots: { index: false } };
export const dynamic = "force-static";

const styles = `
.pf-aurora * { box-sizing: border-box; margin: 0; padding: 0; }
.pf-aurora {
  --navy: #1F3A5F;
  --navy-soft: #2c4f7c;
  --gold: #C9A24B;
  --gold-dark: #B8902E;
  --cream: #FAF6EE;
  --ink: #22262B;
  --white: #FFFFFF;
  --line: #ece3d2;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
  background: var(--cream);
  color: var(--ink);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  line-height: 1.55;
}
.pf-aurora .pf-serif { font-family: Georgia, "Times New Roman", serif; }
.pf-aurora a { color: inherit; text-decoration: none; }

/* ---- Top crumb ---- */
.pf-aurora .pf-crumb {
  max-width: 1100px; margin: 0 auto; padding: 18px 24px 0;
}
.pf-aurora .pf-crumb a {
  font-size: 13px; color: var(--navy-soft); font-weight: 600;
  letter-spacing: .02em; opacity: .8;
}
.pf-aurora .pf-crumb a:hover { opacity: 1; }

/* ---- Layout ---- */
.pf-aurora .pf-shell {
  max-width: 1100px; margin: 0 auto; padding: 16px 24px 64px;
  display: grid; grid-template-columns: 232px 1fr; gap: 28px;
  align-items: start;
}

/* ---- Sidebar ---- */
.pf-aurora .pf-side {
  position: sticky; top: 20px;
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 22px 16px;
  box-shadow: 0 8px 30px rgba(31,58,95,.06);
}
.pf-aurora .pf-brand {
  display: flex; align-items: center; gap: 10px; padding: 4px 8px 18px;
  border-bottom: 1px solid var(--line); margin-bottom: 14px;
}
.pf-aurora .pf-brand .pf-mark {
  width: 36px; height: 36px; border-radius: 11px;
  background: linear-gradient(150deg, var(--navy), var(--navy-soft));
  display: flex; align-items: center; justify-content: center;
  color: var(--gold); font-size: 18px; flex: none;
  box-shadow: inset 0 -6px 12px rgba(0,0,0,.18);
}
.pf-aurora .pf-brand b {
  font-family: Georgia, serif; font-size: 16px; color: var(--navy);
  line-height: 1.1; font-weight: 700;
}
.pf-aurora .pf-brand span { font-size: 11px; color: var(--gold-dark); letter-spacing: .04em; }
.pf-aurora .pf-nav { display: flex; flex-direction: column; gap: 2px; }
.pf-aurora .pf-nav a {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 12px;
  font-size: 14px; font-weight: 600; color: #5b6470;
  transition: all .15s ease;
}
.pf-aurora .pf-nav a .pf-ico { width: 20px; text-align: center; font-size: 15px; opacity: .9; }
.pf-aurora .pf-nav a:hover { background: var(--cream); color: var(--navy); }
.pf-aurora .pf-nav a.pf-on {
  background: linear-gradient(140deg, var(--navy), var(--navy-soft));
  color: var(--white); box-shadow: 0 6px 16px rgba(31,58,95,.25);
}
.pf-aurora .pf-nav a.pf-on .pf-ico { opacity: 1; }
.pf-aurora .pf-side-foot {
  margin-top: 16px; padding: 14px; border-radius: 14px;
  background: var(--cream); border: 1px solid var(--line);
}
.pf-aurora .pf-side-foot .pf-mini { font-size: 11px; color: var(--gold-dark); font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.pf-aurora .pf-side-foot .pf-tier { font-family: Georgia, serif; color: var(--navy); font-size: 15px; margin-top: 2px; }

/* ---- Main ---- */
.pf-aurora .pf-main { min-width: 0; }

/* Hero */
.pf-aurora .pf-hero {
  position: relative; overflow: hidden;
  border-radius: 24px; border: 1px solid var(--line);
  background: var(--navy);
  color: var(--white);
  padding: 34px 34px 30px;
  box-shadow: 0 18px 50px rgba(31,58,95,.20);
}
.pf-aurora .pf-hero-sky { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.pf-aurora .pf-hero-inner { position: relative; z-index: 2; max-width: 560px; }
.pf-aurora .pf-hero .pf-eyebrow {
  font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--gold); font-weight: 700;
}
.pf-aurora .pf-hero h1 {
  font-family: Georgia, serif; font-weight: 700;
  font-size: clamp(26px, 4vw, 38px); line-height: 1.12; margin: 8px 0 6px;
  text-shadow: 0 2px 18px rgba(0,0,0,.3);
}
.pf-aurora .pf-hero p { color: #e7ecf5; font-size: 14px; max-width: 440px; }
.pf-aurora .pf-hero-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
.pf-aurora .pf-pill {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,.12); backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,.18);
  padding: 8px 14px; border-radius: 999px; font-size: 13px; font-weight: 600;
}
.pf-aurora .pf-pill b { color: var(--gold); }

/* Grid sections */
.pf-aurora .pf-grid { display: grid; gap: 20px; margin-top: 20px; }
.pf-aurora .pf-row3 { grid-template-columns: repeat(3, 1fr); }
.pf-aurora .pf-row2 { grid-template-columns: 1.3fr 1fr; }

.pf-aurora .pf-card {
  background: var(--white); border: 1px solid var(--line);
  border-radius: 20px; padding: 22px;
  box-shadow: 0 8px 28px rgba(31,58,95,.05);
}
.pf-aurora .pf-card h3 {
  font-family: Georgia, serif; color: var(--navy);
  font-size: 17px; font-weight: 700; margin-bottom: 4px;
}
.pf-aurora .pf-card .pf-sub { font-size: 12.5px; color: #7a828d; }
.pf-aurora .pf-card-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; }
.pf-aurora .pf-card-head .pf-link { font-size: 12.5px; color: var(--gold-dark); font-weight: 700; }

/* Walk score ring */
.pf-aurora .pf-ring-wrap { display: flex; align-items: center; gap: 20px; }
.pf-aurora .pf-ring { position: relative; flex: none; width: 132px; height: 132px; }
.pf-aurora .pf-ring-num {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
}
.pf-aurora .pf-ring-num b { font-family: Georgia, serif; font-size: 32px; color: var(--navy); line-height: 1; }
.pf-aurora .pf-ring-num span { font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--gold-dark); font-weight: 700; margin-top: 3px; }
.pf-aurora .pf-level-tag {
  display: inline-block; background: var(--cream); border: 1px solid var(--line);
  color: var(--navy); font-weight: 700; font-size: 12px;
  padding: 4px 10px; border-radius: 999px;
}
.pf-aurora .pf-prog {
  height: 9px; border-radius: 999px; background: var(--cream);
  overflow: hidden; margin: 12px 0 6px; border: 1px solid var(--line);
}
.pf-aurora .pf-prog i { display: block; height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--gold), var(--gold-dark)); }
.pf-aurora .pf-prog-label { display: flex; justify-content: space-between; font-size: 11.5px; color: #7a828d; }

/* Bible day */
.pf-aurora .pf-bigday { font-family: Georgia, serif; color: var(--navy); font-size: 30px; line-height: 1; }
.pf-aurora .pf-bigday small { font-size: 14px; color: #7a828d; font-weight: 400; }

/* Streak */
.pf-aurora .pf-streak-flame { font-size: 40px; line-height: 1; }
.pf-aurora .pf-streak-num { font-family: Georgia, serif; font-size: 34px; color: var(--navy); line-height: 1; }

/* Chart */
.pf-aurora .pf-chart svg { width: 100%; height: auto; display: block; }
.pf-aurora .pf-legend { display: flex; gap: 16px; margin-top: 12px; font-size: 12px; color: #5b6470; }
.pf-aurora .pf-legend i { display: inline-block; width: 12px; height: 12px; border-radius: 4px; margin-right: 6px; vertical-align: -1px; }
.pf-aurora .pf-stat-row { display: flex; gap: 22px; margin-top: 14px; }
.pf-aurora .pf-stat { flex: 1; }
.pf-aurora .pf-stat b { font-family: Georgia, serif; font-size: 22px; color: var(--navy); }
.pf-aurora .pf-stat span { display: block; font-size: 11.5px; color: #7a828d; }
.pf-aurora .pf-delta { color: var(--gold-dark); font-weight: 700; font-size: 12px; }

/* Devotional */
.pf-aurora .pf-dev {
  background: linear-gradient(160deg, #fffaf0, var(--cream));
  border: 1px solid var(--line);
}
.pf-aurora .pf-dev h2 {
  font-family: Georgia, serif; color: var(--navy);
  font-size: clamp(20px, 2.6vw, 26px); line-height: 1.2; margin: 6px 0 12px; font-weight: 700;
}
.pf-aurora .pf-verse {
  border-left: 3px solid var(--gold); padding: 4px 0 4px 16px;
  font-family: Georgia, serif; font-style: italic; color: var(--navy-soft); font-size: 15px;
}
.pf-aurora .pf-btn {
  display: inline-flex; align-items: center; gap: 8px; margin-top: 16px;
  background: linear-gradient(140deg, var(--gold), var(--gold-dark));
  color: var(--navy); font-weight: 700; font-size: 14px;
  padding: 11px 20px; border-radius: 999px;
  box-shadow: 0 8px 18px rgba(184,144,46,.3);
}

/* Leaderboard / avatars */
.pf-aurora .pf-people { display: flex; flex-direction: column; gap: 12px; }
.pf-aurora .pf-person { display: flex; align-items: center; gap: 12px; }
.pf-aurora .pf-rank { width: 18px; font-weight: 800; color: var(--gold-dark); font-size: 13px; text-align: center; }
.pf-aurora .pf-av { width: 40px; height: 40px; border-radius: 50%; flex: none;
  display: flex; align-items: center; justify-content: center;
  color: var(--white); font-weight: 800; font-size: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,.12); }
.pf-aurora .pf-av-lg { width: 46px; height: 46px; font-size: 18px; }
.pf-aurora .pf-person .pf-pn { flex: 1; min-width: 0; }
.pf-aurora .pf-person .pf-pn b { display: block; font-size: 14px; color: var(--navy); }
.pf-aurora .pf-person .pf-pn span { font-size: 11.5px; color: #7a828d; }
.pf-aurora .pf-you-tag { font-size: 10px; background: var(--navy); color: var(--gold); padding: 1px 7px; border-radius: 999px; font-weight: 700; margin-left: 6px; vertical-align: 1px; }

/* Badges */
.pf-aurora .pf-badges { display: flex; gap: 12px; flex-wrap: wrap; }
.pf-aurora .pf-badge {
  flex: 1; min-width: 92px; text-align: center;
  background: var(--cream); border: 1px solid var(--line);
  border-radius: 16px; padding: 14px 8px;
}
.pf-aurora .pf-badge .pf-bi { font-size: 28px; line-height: 1; }
.pf-aurora .pf-badge b { display: block; font-size: 11.5px; color: var(--navy); margin-top: 8px; font-weight: 700; }
.pf-aurora .pf-badge.pf-locked { opacity: .55; filter: grayscale(.4); }
.pf-aurora .pf-badge.pf-locked .pf-bi { filter: blur(.4px); }

/* Encouragement wall */
.pf-aurora .pf-wall { display: flex; flex-direction: column; gap: 14px; }
.pf-aurora .pf-note {
  background: var(--white); border: 1px solid var(--line);
  border-radius: 16px; padding: 14px 16px;
}
.pf-aurora .pf-note .pf-nh { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.pf-aurora .pf-note .pf-nh b { font-size: 13.5px; color: var(--navy); }
.pf-aurora .pf-note .pf-nh span { font-size: 11px; color: #9aa1ab; }
.pf-aurora .pf-note p { font-size: 14px; color: #3c434c; }
.pf-aurora .pf-react { display: flex; gap: 8px; margin-top: 10px; }
.pf-aurora .pf-react button, .pf-aurora .pf-react span {
  font: inherit; background: var(--cream); border: 1px solid var(--line);
  border-radius: 999px; padding: 4px 10px; font-size: 13px; color: #5b6470; cursor: default;
}

@media (max-width: 900px) {
  .pf-aurora .pf-shell { grid-template-columns: 1fr; }
  .pf-aurora .pf-side { position: static; }
  .pf-aurora .pf-nav { flex-direction: row; flex-wrap: wrap; }
  .pf-aurora .pf-nav a { flex: 1 1 auto; }
  .pf-aurora .pf-row3, .pf-aurora .pf-row2 { grid-template-columns: 1fr; }
}
`;

const nav = [
  { label: "Dashboard", icon: "🏠", on: true },
  { label: "My Journey", icon: "🧭" },
  { label: "Daily Wonders", icon: "✨" },
  { label: "Prayer", icon: "🙏" },
  { label: "Scripture Memory", icon: "💛" },
  { label: "Prayer Wall", icon: "🕊️" },
  { label: "My Settings", icon: "⚙️" },
];

const people = [
  { rank: 1, name: "Maria", grad: "#C9A24B,#B8902E", initial: "M", stat: "18-day streak · 412 pts" },
  { rank: 2, name: "Lulu", grad: "#1F3A5F,#2c4f7c", initial: "L", stat: "12-day streak · 340 pts", you: true },
  { rank: 3, name: "David", grad: "#6a8caf,#3f6390", initial: "D", stat: "9-day streak · 280 pts" },
];

const badges = [
  { e: "👣", n: "First Step" },
  { e: "🔥", n: "Faithful Week" },
  { e: "💛", n: "Hidden in My Heart" },
  { e: "📖", n: "Word-Filled" },
  { e: "🕊️", n: "Locked", locked: true },
];

export default function AuroraPortalDesign() {
  return (
    <div className="pf-aurora">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="pf-crumb">
        <Link href="/designs/portal">← All portal designs</Link>
      </div>

      <div className="pf-shell">
        {/* Sidebar */}
        <aside className="pf-side">
          <div className="pf-brand">
            <div className="pf-mark">✝</div>
            <div>
              <b>The Daily Walk</b>
              <span>Walking with God</span>
            </div>
          </div>
          <nav className="pf-nav">
            {nav.map((n) => (
              <a key={n.label} href="#" className={n.on ? "pf-on" : ""}>
                <span className="pf-ico">{n.icon}</span> {n.label}
              </a>
            ))}
          </nav>
          <div className="pf-side-foot">
            <div className="pf-mini">Your plan</div>
            <div className="pf-tier">Premium · Bible-in-a-Year</div>
          </div>
        </aside>

        {/* Main */}
        <main className="pf-main">
          {/* Hero with sunrise */}
          <section className="pf-hero">
            <svg className="pf-hero-sky" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="auSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#13294a" />
                  <stop offset="45%" stopColor="#1F3A5F" />
                  <stop offset="78%" stopColor="#7a6a4a" />
                  <stop offset="100%" stopColor="#C9A24B" />
                </linearGradient>
                <radialGradient id="auSun" cx="50%" cy="100%" r="75%">
                  <stop offset="0%" stopColor="#ffe9b0" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#C9A24B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="800" height="320" fill="url(#auSky)" />
              <ellipse cx="400" cy="330" rx="430" ry="200" fill="url(#auSun)" />
              {/* rays */}
              <g stroke="#ffe9b0" strokeOpacity="0.18" strokeWidth="2">
                <line x1="400" y1="320" x2="150" y2="60" />
                <line x1="400" y1="320" x2="260" y2="30" />
                <line x1="400" y1="320" x2="400" y2="10" />
                <line x1="400" y1="320" x2="540" y2="30" />
                <line x1="400" y1="320" x2="650" y2="60" />
              </g>
              <circle cx="400" cy="318" r="46" fill="#ffe9b0" fillOpacity="0.9" />
              {/* faint stars */}
              <g fill="#ffffff" fillOpacity="0.55">
                <circle cx="90" cy="44" r="1.4" />
                <circle cx="170" cy="80" r="1" />
                <circle cx="620" cy="50" r="1.4" />
                <circle cx="710" cy="92" r="1" />
                <circle cx="500" cy="36" r="1" />
              </g>
            </svg>
            <div className="pf-hero-inner">
              <div className="pf-eyebrow">Saturday, June 25</div>
              <h1>Good afternoon, Lulu.</h1>
              <p>The sun is up and so is your faithfulness. Here&apos;s your walk with God today.</p>
              <div className="pf-hero-pills">
                <span className="pf-pill">🔥 <b>12-day</b> streak</span>
                <span className="pf-pill">📖 Day <b>47</b> of 365</span>
                <span className="pf-pill">⭐ Walk Score <b>340</b></span>
              </div>
            </div>
          </section>

          {/* Three stat cards */}
          <div className="pf-grid pf-row3">
            {/* Walk score ring */}
            <div className="pf-card">
              <div className="pf-card-head">
                <div><h3>Walk Score</h3><div className="pf-sub">Your spiritual momentum</div></div>
              </div>
              <div className="pf-ring-wrap">
                <div className="pf-ring">
                  <svg viewBox="0 0 120 120" width="132" height="132" aria-hidden="true">
                    <defs>
                      <linearGradient id="auRing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C9A24B" />
                        <stop offset="100%" stopColor="#B8902E" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#ece3d2" strokeWidth="12" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="url(#auRing)" strokeWidth="12"
                      strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset="130.7"
                      transform="rotate(-90 60 60)" />
                  </svg>
                  <div className="pf-ring-num"><b>340</b><span>points</span></div>
                </div>
                <div>
                  <span className="pf-level-tag">Level: Growing</span>
                  <div className="pf-prog"><i style={{ width: "60%" }} /></div>
                  <div className="pf-prog-label"><span>60% there</span><span>Flourishing</span></div>
                </div>
              </div>
            </div>

            {/* Bible in a year */}
            <div className="pf-card">
              <div className="pf-card-head">
                <div><h3>Bible-in-a-Year</h3><div className="pf-sub">Your personal journey</div></div>
                <a href="#" className="pf-link">View plan →</a>
              </div>
              <div className="pf-bigday">Day 47 <small>of 365</small></div>
              <div className="pf-prog"><i style={{ width: "13%" }} /></div>
              <div className="pf-prog-label"><span>13% complete</span><span>318 days to go</span></div>
              <p style={{ fontSize: "13px", color: "#5b6470", marginTop: "12px" }}>
                Today: <b style={{ color: "#1F3A5F" }}>Exodus 1–3</b> · ~7 min read
              </p>
            </div>

            {/* Streak */}
            <div className="pf-card">
              <div className="pf-card-head">
                <div><h3>Current Streak</h3><div className="pf-sub">Keep the flame alive</div></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "6px" }}>
                <div className="pf-streak-flame">🔥</div>
                <div>
                  <span className="pf-streak-num">12</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "18px", color: "#7a828d" }}> days</span>
                  <div style={{ fontSize: "12.5px", color: "#7a828d" }}>Your best yet — don&apos;t break it today.</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "5px", marginTop: "16px" }}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} style={{
                    flex: 1, textAlign: "center", fontSize: "10px", color: "#7a828d",
                  }}>
                    <div style={{
                      height: "26px", borderRadius: "8px", marginBottom: "4px",
                      background: i < 5 ? "linear-gradient(160deg,#C9A24B,#B8902E)" : "#ece3d2",
                    }} />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Devotional + Weekly momentum */}
          <div className="pf-grid pf-row2">
            <div className="pf-card pf-dev">
              <div className="pf-eyebrow" style={{ color: "#B8902E", fontSize: "12px", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700 }}>
                Today&apos;s Devotional
              </div>
              <h2>He tore the veil from His side</h2>
              <blockquote className="pf-verse">
                &ldquo;The veil of the temple was torn in two&rdquo; — Matthew 27:51
              </blockquote>
              <p style={{ fontSize: "14px", color: "#3c434c", marginTop: "14px" }}>
                The barrier between us and God didn&apos;t come down little by little. It was torn —
                top to bottom — the moment Jesus gave Himself. There is no waiting room anymore.
              </p>
              <a href="#" className="pf-btn">Read today&apos;s walk →</a>
            </div>

            <div className="pf-card">
              <div className="pf-card-head">
                <div><h3>Weekly Momentum</h3><div className="pf-sub">This week vs. last</div></div>
              </div>
              <div className="pf-chart">
                <svg viewBox="0 0 320 150" aria-hidden="true">
                  {/* baseline */}
                  <line x1="20" y1="120" x2="300" y2="120" stroke="#ece3d2" strokeWidth="1.5" />
                  {/* last week bars */}
                  {[
                    { x: 60, last: 60, now: 90 },
                    { x: 160, last: 40, now: 80 },
                    { x: 250, last: 30, now: 55 },
                  ].map((g, i) => (
                    <g key={i}>
                      <rect x={g.x - 26} y={120 - g.last} width="22" height={g.last} rx="5" fill="#d9cfb6" />
                      <rect x={g.x} y={120 - g.now} width="22" height={g.now} rx="5" fill="url(#auRing2)" />
                    </g>
                  ))}
                  <defs>
                    <linearGradient id="auRing2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A24B" />
                      <stop offset="100%" stopColor="#B8902E" />
                    </linearGradient>
                  </defs>
                  {/* x labels */}
                  <g fill="#7a828d" fontSize="11" fontFamily="sans-serif" textAnchor="middle">
                    <text x="60" y="140">Days walked</text>
                    <text x="160" y="140">Verses</text>
                    <text x="250" y="140">Prayers</text>
                  </g>
                </svg>
              </div>
              <div className="pf-legend">
                <span><i style={{ background: "#d9cfb6" }} />Last week</span>
                <span><i style={{ background: "#C9A24B" }} />This week</span>
              </div>
              <div className="pf-stat-row">
                <div className="pf-stat">
                  <b>5</b> <span className="pf-delta">▲ vs 4 last wk</span>
                  <span>Days walked</span>
                </div>
                <div className="pf-stat">
                  <b>3</b> <span className="pf-delta">▲ vs 2 last wk</span>
                  <span>Verses memorized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard + Badges */}
          <div className="pf-grid pf-row2">
            <div className="pf-card">
              <div className="pf-card-head">
                <div><h3>Community Leaderboard</h3><div className="pf-sub">Walking together this week</div></div>
                <a href="#" className="pf-link">Full board →</a>
              </div>
              <div className="pf-people">
                {people.map((p) => (
                  <div className="pf-person" key={p.name}>
                    <div className="pf-rank">{p.rank}</div>
                    <div className="pf-av pf-av-lg" style={{ background: `linear-gradient(150deg, ${p.grad})` }}>
                      {p.initial}
                    </div>
                    <div className="pf-pn">
                      <b>{p.name}{p.you && <span className="pf-you-tag">YOU</span>}</b>
                      <span>{p.stat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pf-card">
              <div className="pf-card-head">
                <div><h3>Your Badges</h3><div className="pf-sub">4 earned · 1 to unlock</div></div>
              </div>
              <div className="pf-badges">
                {badges.map((b, i) => (
                  <div key={i} className={"pf-badge" + (b.locked ? " pf-locked" : "")}>
                    <div className="pf-bi">{b.locked ? "🔒" : b.e}</div>
                    <b>{b.locked ? "Secret" : b.n}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Encouragement wall */}
          <div className="pf-grid">
            <div className="pf-card">
              <div className="pf-card-head">
                <div><h3>Encouragement Wall</h3><div className="pf-sub">Words from your community</div></div>
                <a href="#" className="pf-link">Post a note →</a>
              </div>
              <div className="pf-wall">
                <div className="pf-note">
                  <div className="pf-nh">
                    <div className="pf-av" style={{ background: "linear-gradient(150deg,#C9A24B,#B8902E)", width: "32px", height: "32px", fontSize: "13px" }}>M</div>
                    <b>Maria</b><span>· 2h ago</span>
                  </div>
                  <p>Hit a hard week but God met me in Exodus this morning. Don&apos;t quit, friends — the veil is already torn. 💛</p>
                  <div className="pf-react">
                    <span>🙏 14</span><span>❤️ 9</span><span>🔥 5</span><span>🕊️ 3</span>
                  </div>
                </div>
                <div className="pf-note">
                  <div className="pf-nh">
                    <div className="pf-av" style={{ background: "linear-gradient(150deg,#6a8caf,#3f6390)", width: "32px", height: "32px", fontSize: "13px" }}>D</div>
                    <b>David</b><span>· yesterday</span>
                  </div>
                  <p>Day 9 and finally feel a rhythm. Praying for everyone still building the habit. You&apos;ve got this. 🙏</p>
                  <div className="pf-react">
                    <span>🙏 21</span><span>❤️ 12</span><span>🔥 8</span><span>🕊️ 6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
