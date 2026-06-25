import Link from "next/link";

export const metadata = { title: "Portal Design — Studio", robots: { index: false } };
export const dynamic = "force-static";

export default function StudioPortalDesign() {
  return (
    <div className="pf-studio">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-studio { --navy:#1F3A5F; --gold:#C9A24B; --gold-d:#B8902E; --cream:#FAF6EE; --ink:#22262B; --page:#eef1f6; --line:#e3e8f0; --muted:#6b7689; --white:#fff;
  background:var(--page); color:var(--ink); min-height:100vh; font-family:Inter,-apple-system,Segoe UI,Roboto,sans-serif; -webkit-font-smoothing:antialiased; }
.pf-studio * { box-sizing:border-box; }
.pf-studio a { color:inherit; text-decoration:none; }
.pf-studio .pf-serif { font-family:"Instrument Serif","Playfair Display",Georgia,serif; }

.pf-studio .pf-shell { display:flex; max-width:1180px; margin:0 auto; padding:18px; gap:20px; }

/* Sidebar */
.pf-studio .pf-side { width:236px; flex:0 0 236px; }
.pf-studio .pf-side-inner { position:sticky; top:18px; background:var(--white); border:1px solid var(--line); border-radius:18px; padding:18px 14px; }
.pf-studio .pf-brand { display:flex; align-items:center; gap:10px; padding:4px 8px 14px; }
.pf-studio .pf-logo { width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg,var(--navy),#34568a); display:grid; place-items:center; color:#fff; flex:0 0 34px; }
.pf-studio .pf-brand b { color:var(--navy); font-size:15px; letter-spacing:.2px; }
.pf-studio .pf-brand small { display:block; color:var(--muted); font-size:11px; }
.pf-studio .pf-nav { display:flex; flex-direction:column; gap:2px; }
.pf-studio .pf-nav a { display:flex; align-items:center; gap:11px; padding:9px 11px; border-radius:11px; color:#41506a; font-size:14px; font-weight:500; }
.pf-studio .pf-nav a:hover { background:#f3f6fb; color:var(--navy); }
.pf-studio .pf-nav a.pf-active { background:var(--navy); color:#fff; }
.pf-studio .pf-nav a.pf-active .pf-ic { color:var(--gold); }
.pf-studio .pf-ic { width:18px; height:18px; flex:0 0 18px; color:#8c98ad; }
.pf-studio .pf-side-card { margin-top:16px; background:linear-gradient(160deg,#fbf7ee,#f4ecd9); border:1px solid #ecdfc2; border-radius:14px; padding:14px; }
.pf-studio .pf-side-card h4 { margin:0 0 4px; color:var(--navy); font-size:13px; }
.pf-studio .pf-side-card p { margin:0 0 10px; color:#7a6a44; font-size:12px; line-height:1.45; }
.pf-studio .pf-mini-btn { display:inline-block; background:var(--gold-d); color:#fff; font-size:12px; font-weight:600; padding:7px 12px; border-radius:9px; }

/* Main */
.pf-studio .pf-main { flex:1; min-width:0; }
.pf-studio .pf-back { display:inline-block; color:var(--muted); font-size:13px; margin-bottom:12px; }
.pf-studio .pf-back:hover { color:var(--navy); }

.pf-studio .pf-top { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:18px; flex-wrap:wrap; }
.pf-studio .pf-hi { color:var(--gold-d); font-weight:600; font-size:13px; letter-spacing:.4px; text-transform:uppercase; }
.pf-studio .pf-top h1 { margin:2px 0 2px; color:var(--navy); font-size:30px; font-weight:400; }
.pf-studio .pf-top .pf-date { color:var(--muted); font-size:13px; }
.pf-studio .pf-topright { display:flex; align-items:center; gap:12px; }
.pf-studio .pf-streak { display:flex; align-items:center; gap:8px; background:var(--white); border:1px solid var(--line); border-radius:12px; padding:8px 13px; }
.pf-studio .pf-streak b { color:var(--navy); font-size:16px; }
.pf-studio .pf-streak span { color:var(--muted); font-size:11px; display:block; }

/* Avatars */
.pf-studio .pf-av { border-radius:50%; display:grid; place-items:center; color:#fff; font-weight:700; flex:0 0 auto; box-shadow:0 1px 2px rgba(0,0,0,.12); }
.pf-studio .pf-av.s { width:30px; height:30px; font-size:12px; }
.pf-studio .pf-av.m { width:38px; height:38px; font-size:14px; }
.pf-studio .pf-av.l { width:46px; height:46px; font-size:16px; }
.pf-studio .pf-g1 { background:linear-gradient(135deg,#1F3A5F,#3f6ea5); }
.pf-studio .pf-g2 { background:linear-gradient(135deg,#C9A24B,#e2c074); }
.pf-studio .pf-g3 { background:linear-gradient(135deg,#7c5cbf,#a98be0); }
.pf-studio .pf-g4 { background:linear-gradient(135deg,#2f9e7e,#5fc7a6); }

/* Grid */
.pf-studio .pf-grid { display:grid; grid-template-columns:repeat(12,1fr); gap:16px; }
.pf-studio .pf-card { background:var(--white); border:1px solid var(--line); border-radius:18px; padding:18px; }
.pf-studio .pf-card h3 { margin:0; color:var(--navy); font-size:15px; }
.pf-studio .pf-card .pf-sub { color:var(--muted); font-size:12px; }
.pf-studio .pf-cardhead { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
.pf-studio .pf-tag { font-size:11px; font-weight:600; color:var(--gold-d); background:#faf2df; border-radius:999px; padding:4px 10px; }

.pf-studio .c-span4 { grid-column:span 4; } .pf-studio .c-span5 { grid-column:span 5; }
.pf-studio .c-span6 { grid-column:span 6; } .pf-studio .c-span7 { grid-column:span 7; }
.pf-studio .c-span8 { grid-column:span 8; } .pf-studio .c-span12 { grid-column:span 12; }

/* Devotional */
.pf-studio .pf-dev { background:linear-gradient(150deg,#1F3A5F 0%,#284c79 60%,#34568a 100%); color:#fff; position:relative; overflow:hidden; }
.pf-studio .pf-dev .pf-sun { position:absolute; right:-50px; top:-50px; width:200px; height:200px; border-radius:50%; background:radial-gradient(circle,rgba(201,162,75,.45),transparent 70%); }
.pf-studio .pf-dev .pf-tag2 { color:#fff; background:rgba(255,255,255,.16); }
.pf-studio .pf-dev h2 { font-size:26px; margin:14px 0 6px; line-height:1.18; position:relative; }
.pf-studio .pf-dev .pf-ref { color:var(--gold); font-size:13px; font-weight:600; position:relative; }
.pf-studio .pf-dev p { color:#d7e1ef; font-size:14px; line-height:1.6; margin:12px 0 18px; max-width:520px; position:relative; }
.pf-studio .pf-read { display:inline-flex; align-items:center; gap:8px; background:var(--gold); color:#22262b; font-weight:700; font-size:14px; padding:11px 18px; border-radius:11px; position:relative; }
.pf-studio .pf-read:hover { background:var(--gold-d); color:#fff; }

/* Walk score */
.pf-studio .pf-ws { text-align:center; }
.pf-studio .pf-ring { position:relative; width:128px; height:128px; margin:6px auto 8px; }
.pf-studio .pf-ring .pf-rval { position:absolute; inset:0; display:grid; place-items:center; }
.pf-studio .pf-ring .pf-rval b { color:var(--navy); font-size:30px; line-height:1; }
.pf-studio .pf-ring .pf-rval span { color:var(--muted); font-size:11px; }
.pf-studio .pf-level { color:var(--gold-d); font-weight:700; font-size:13px; }
.pf-studio .pf-ws .pf-note { color:var(--muted); font-size:12px; margin-top:2px; }

/* Journey */
.pf-studio .pf-bar { height:10px; background:#eef1f6; border-radius:999px; overflow:hidden; }
.pf-studio .pf-bar > i { display:block; height:100%; background:linear-gradient(90deg,var(--gold),var(--gold-d)); border-radius:999px; }
.pf-studio .pf-journey .pf-jrow { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:8px; }
.pf-studio .pf-journey b { color:var(--navy); font-size:18px; }
.pf-studio .pf-journey .pf-pct { color:var(--gold-d); font-weight:700; font-size:13px; }
.pf-studio .pf-journey .pf-foot { margin-top:10px; font-size:12px; color:var(--muted); }

/* Leaderboard */
.pf-studio .pf-lb { display:flex; flex-direction:column; gap:4px; }
.pf-studio .pf-lb-row { display:flex; align-items:center; gap:11px; padding:8px 8px; border-radius:11px; }
.pf-studio .pf-lb-row.me { background:#f6f3ea; }
.pf-studio .pf-rank { width:20px; color:var(--muted); font-weight:700; font-size:13px; text-align:center; }
.pf-studio .pf-lb-name { flex:1; font-size:13px; font-weight:600; color:var(--ink); }
.pf-studio .pf-lb-name small { color:var(--muted); font-weight:500; }
.pf-studio .pf-xp { color:var(--navy); font-weight:700; font-size:13px; }

/* Badges */
.pf-studio .pf-badges { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
.pf-studio .pf-badge { aspect-ratio:1; border-radius:14px; display:grid; place-items:center; font-size:24px; background:#f6f8fc; border:1px solid var(--line); }
.pf-studio .pf-badge.lock { background:repeating-linear-gradient(45deg,#f1f3f8,#f1f3f8 6px,#eaedf4 6px,#eaedf4 12px); color:#aab3c4; font-size:18px; }

/* Chart */
.pf-studio .pf-legend { display:flex; gap:16px; font-size:12px; color:var(--muted); }
.pf-studio .pf-legend i { display:inline-block; width:10px; height:10px; border-radius:3px; margin-right:5px; vertical-align:middle; }

/* Community */
.pf-studio .pf-comm-item { display:flex; gap:11px; padding:11px 0; border-top:1px solid var(--line); }
.pf-studio .pf-comm-item:first-of-type { border-top:0; padding-top:4px; }
.pf-studio .pf-comm-item p { margin:0; font-size:13px; line-height:1.5; }
.pf-studio .pf-comm-item .pf-who { font-weight:700; color:var(--navy); }
.pf-studio .pf-react { margin-top:7px; display:flex; gap:8px; }
.pf-studio .pf-chip { font-size:12px; background:#f3f6fb; border:1px solid var(--line); border-radius:999px; padding:3px 9px; color:#52607a; }

/* Poll */
.pf-studio .pf-poll-q { font-size:14px; color:var(--ink); font-weight:600; margin:0 0 12px; }
.pf-studio .pf-poll-opt { margin-bottom:11px; }
.pf-studio .pf-poll-top { display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px; }
.pf-studio .pf-poll-top span:first-child { color:var(--ink); font-weight:500; }
.pf-studio .pf-poll-top span:last-child { color:var(--muted); }
.pf-studio .pf-pbar { height:8px; background:#eef1f6; border-radius:999px; overflow:hidden; }
.pf-studio .pf-pbar > i { display:block; height:100%; border-radius:999px; }

@media (max-width:920px) {
  .pf-studio .pf-shell { flex-direction:column; }
  .pf-studio .pf-side { width:auto; flex:none; }
  .pf-studio .pf-side-inner { position:static; }
  .pf-studio .pf-nav { flex-direction:row; flex-wrap:wrap; }
  .pf-studio .pf-side-card { display:none; }
  .pf-studio .c-span4,.pf-studio .c-span5,.pf-studio .c-span6,.pf-studio .c-span7,.pf-studio .c-span8 { grid-column:span 12; }
}
`,
        }}
      />

      <div className="pf-shell">
        {/* Sidebar */}
        <aside className="pf-side">
          <div className="pf-side-inner">
            <div className="pf-brand">
              <span className="pf-logo" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2c-1 3-3 4.5-5 6 0 4 2 7 5 9 3-2 5-5 5-9-2-1.5-4-3-5-6Z" fill="#C9A24B" />
                </svg>
              </span>
              <span>
                <b className="pf-serif">The Daily Walk</b>
                <small>Member Portal</small>
              </span>
            </div>

            <nav className="pf-nav">
              <a className="pf-active" href="#">
                <span className="pf-ic" aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                </span>
                Dashboard
              </a>
              <a href="#"><span className="pf-ic" aria-hidden><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19V6a2 2 0 0 1 2-2h12v15"/><path d="M6 17h12"/></svg></span>My Journey</a>
              <a href="#"><span className="pf-ic" aria-hidden><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></span>Daily Wonders</a>
              <a href="#"><span className="pf-ic" aria-hidden><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10Z"/></svg></span>Prayer</a>
              <a href="#"><span className="pf-ic" aria-hidden><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h11l3 3v13H5z"/><path d="M9 9h6M9 13h6"/></svg></span>Scripture Memory</a>
              <a href="#"><span className="pf-ic" aria-hidden><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8h2a2 2 0 0 1 2 2v6H3v-6a2 2 0 0 1 2-2h2"/><circle cx="12" cy="7" r="3"/></svg></span>Prayer Wall</a>
              <a href="#"><span className="pf-ic" aria-hidden><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3.9a7 7 0 0 0-1.7-1L14.5 2h-5l-.4 2.5a7 7 0 0 0-1.7 1L5.1 4.6l-2 3.4L5.1 9.5a7 7 0 0 0 0 2L3.1 13l2 3.4 2.3-.9a7 7 0 0 0 1.7 1L9.5 19h5l.4-2.5a7 7 0 0 0 1.7-1l2.3.9 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"/></svg></span>My Settings</a>
            </nav>

            <div className="pf-side-card">
              <h4>Premium Journey</h4>
              <p>You&rsquo;re on the guided Bible-in-a-Year path. Keep walking!</p>
              <a className="pf-mini-btn" href="#">Resume reading</a>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="pf-main">
          <Link className="pf-back" href="/designs/portal">&larr; All portal designs</Link>

          <div className="pf-top">
            <div>
              <div className="pf-hi">Good afternoon</div>
              <h1 className="pf-serif">Welcome back, Lulu</h1>
              <div className="pf-date">Saturday, June 25</div>
            </div>
            <div className="pf-topright">
              <div className="pf-streak">
                <span aria-hidden style={{ fontSize: "20px" }}>🔥</span>
                <span><b>12 days</b>current streak</span>
              </div>
              <span className="pf-av l pf-g1" aria-hidden>LJ</span>
            </div>
          </div>

          <div className="pf-grid">
            {/* Devotional */}
            <section className="pf-card pf-dev c-span8">
              <span className="pf-sun" aria-hidden />
              <span className="pf-tag pf-tag2">Today&rsquo;s Devotional</span>
              <h2 className="pf-serif">He tore the veil from His side</h2>
              <div className="pf-ref">Matthew 27:51</div>
              <p>
                At the moment Jesus gave up His spirit, the curtain of the temple was torn in two
                from top to bottom. The barrier between us and God came down &mdash; and the way was
                opened for everyone, no exceptions.
              </p>
              <a className="pf-read" href="#">
                Read today&rsquo;s walk
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </section>

            {/* Walk Score */}
            <section className="pf-card pf-ws c-span4">
              <div className="pf-cardhead">
                <h3>Walk Score</h3>
                <span className="pf-tag">Level</span>
              </div>
              <div className="pf-ring">
                <svg width="128" height="128" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="54" fill="none" stroke="#eef1f6" strokeWidth="12" />
                  <circle cx="64" cy="64" r="54" fill="none" stroke="#C9A24B" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray="339.3" strokeDashoffset="135.7" transform="rotate(-90 64 64)" />
                </svg>
                <div className="pf-rval">
                  <div>
                    <b>340</b>
                    <span>Walk Score</span>
                  </div>
                </div>
              </div>
              <div className="pf-level">Growing</div>
              <div className="pf-note">~60% to <strong>Flourishing</strong></div>
            </section>

            {/* Journey */}
            <section className="pf-card pf-journey c-span4">
              <div className="pf-cardhead">
                <h3>Bible-in-a-Year</h3>
                <span className="pf-tag">On track</span>
              </div>
              <div className="pf-jrow">
                <b>Day 47 <span style={{ color: "#6b7689", fontWeight: 400, fontSize: "13px" }}>of 365</span></b>
                <span className="pf-pct">13%</span>
              </div>
              <div className="pf-bar"><i style={{ width: "13%" }} /></div>
              <div className="pf-foot">Next up: Leviticus 1&ndash;3 &middot; ~12 min read</div>
            </section>

            {/* Weekly chart */}
            <section className="pf-card c-span8">
              <div className="pf-cardhead">
                <div>
                  <h3>This week</h3>
                  <span className="pf-sub">Days walked &amp; verses memorized</span>
                </div>
                <div className="pf-legend">
                  <span><i style={{ background: "#1F3A5F" }} />Days walked</span>
                  <span><i style={{ background: "#C9A24B" }} />Verses</span>
                </div>
              </div>
              <svg viewBox="0 0 560 180" width="100%" height="180" role="img" aria-label="Weekly activity chart">
                {[0, 1, 2, 3].map((g) => (
                  <line key={g} x1="36" x2="548" y1={20 + g * 40} y2={20 + g * 40} stroke="#eef1f6" strokeWidth="1" />
                ))}
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <text key={i} x={66 + i * 72} y="172" textAnchor="middle" fontSize="11" fill="#6b7689">{d}</text>
                ))}
                {/* Days walked bars (navy) */}
                {[2, 3, 3, 4, 4, 5, 4].map((v, i) => {
                  const h = v * 26;
                  return <rect key={"d" + i} x={48 + i * 72} y={140 - h} width="18" height={h} rx="4" fill="#1F3A5F" />;
                })}
                {/* Verses line (gold) */}
                <polyline
                  fill="none" stroke="#C9A24B" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"
                  points={[1, 1, 2, 2, 2, 3, 3].map((v, i) => `${75 + i * 72},${140 - v * 26}`).join(" ")}
                />
                {[1, 1, 2, 2, 2, 3, 3].map((v, i) => (
                  <circle key={"c" + i} cx={75 + i * 72} cy={140 - v * 26} r="4" fill="#fff" stroke="#C9A24B" strokeWidth="2.5" />
                ))}
              </svg>
            </section>

            {/* Leaderboard */}
            <section className="pf-card c-span4">
              <div className="pf-cardhead">
                <h3>Community Leaderboard</h3>
                <span className="pf-sub">This week</span>
              </div>
              <div className="pf-lb">
                <div className="pf-lb-row me">
                  <span className="pf-rank">1</span>
                  <span className="pf-av s pf-g1" aria-hidden>LJ</span>
                  <span className="pf-lb-name">Lulu <small>(you)</small></span>
                  <span className="pf-xp">980 XP</span>
                </div>
                <div className="pf-lb-row">
                  <span className="pf-rank">2</span>
                  <span className="pf-av s pf-g2" aria-hidden>MR</span>
                  <span className="pf-lb-name">Maria</span>
                  <span className="pf-xp">910 XP</span>
                </div>
                <div className="pf-lb-row">
                  <span className="pf-rank">3</span>
                  <span className="pf-av s pf-g3" aria-hidden>DV</span>
                  <span className="pf-lb-name">David</span>
                  <span className="pf-xp">845 XP</span>
                </div>
              </div>
            </section>

            {/* Badges */}
            <section className="pf-card c-span4">
              <div className="pf-cardhead">
                <h3>Your Badges</h3>
                <span className="pf-sub">4 earned</span>
              </div>
              <div className="pf-badges">
                <div className="pf-badge" title="First steps" aria-hidden>👣</div>
                <div className="pf-badge" title="On fire" aria-hidden>🔥</div>
                <div className="pf-badge" title="Heart of gold" aria-hidden>💛</div>
                <div className="pf-badge" title="Word reader" aria-hidden>📖</div>
                <div className="pf-badge lock" title="Secret badge — locked" aria-hidden>🔒</div>
              </div>
            </section>

            {/* Community encouragement */}
            <section className="pf-card c-span8">
              <div className="pf-cardhead">
                <h3>Encouragement Wall</h3>
                <a className="pf-sub" href="#" style={{ color: "#B8902E", fontWeight: 600 }}>View all &rarr;</a>
              </div>
              <div className="pf-comm-item">
                <span className="pf-av m pf-g2" aria-hidden>MR</span>
                <div>
                  <p><span className="pf-who">Maria</span> &middot; 2h ago</p>
                  <p>Finished Matthew today &mdash; that verse about the veil wrecked me (in the best way). So thankful for this community. 🙏</p>
                  <div className="pf-react">
                    <span className="pf-chip">❤️ 14</span>
                    <span className="pf-chip">🙏 9</span>
                    <span className="pf-chip">Amen 5</span>
                  </div>
                </div>
              </div>
              <div className="pf-comm-item">
                <span className="pf-av m pf-g4" aria-hidden>DV</span>
                <div>
                  <p><span className="pf-who">David</span> &middot; yesterday</p>
                  <p>Day 40 and the early mornings are finally becoming a habit. Praying for everyone walking with us this week.</p>
                  <div className="pf-react">
                    <span className="pf-chip">❤️ 22</span>
                    <span className="pf-chip">🔥 11</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Poll */}
            <section className="pf-card c-span4">
              <div className="pf-cardhead">
                <h3>Question of the Day</h3>
                <span className="pf-tag">Poll</span>
              </div>
              <p className="pf-poll-q">When do you do your daily walk?</p>
              <div className="pf-poll-opt">
                <div className="pf-poll-top"><span>Early morning</span><span>58%</span></div>
                <div className="pf-pbar"><i style={{ width: "58%", background: "linear-gradient(90deg,#1F3A5F,#3f6ea5)" }} /></div>
              </div>
              <div className="pf-poll-opt">
                <div className="pf-poll-top"><span>Lunch break</span><span>22%</span></div>
                <div className="pf-pbar"><i style={{ width: "22%", background: "linear-gradient(90deg,#C9A24B,#e2c074)" }} /></div>
              </div>
              <div className="pf-poll-opt">
                <div className="pf-poll-top"><span>Evening</span><span>20%</span></div>
                <div className="pf-pbar"><i style={{ width: "20%", background: "linear-gradient(90deg,#7c5cbf,#a98be0)" }} /></div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
