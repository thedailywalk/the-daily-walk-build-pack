import Link from "next/link";

export const metadata = { title: "Portal Design — Sanctuary", robots: { index: false } };
export const dynamic = "force-static";

const navItems = [
  { label: "Dashboard", icon: "🏠", active: true },
  { label: "My Journey", icon: "🗺️" },
  { label: "Daily Wonders", icon: "✨" },
  { label: "Prayer", icon: "🙏" },
  { label: "Scripture Memory", icon: "📖" },
  { label: "Prayer Wall", icon: "🕊️" },
  { label: "My Settings", icon: "⚙️" },
];

const leaderboard = [
  { name: "Lulu", you: true, xp: 340, ring: "gold", initials: "LJ" },
  { name: "Maria", you: false, xp: 312, ring: "teal", initials: "MR" },
  { name: "David", you: false, xp: 287, ring: "amethyst", initials: "DV" },
];

const badges = [
  { icon: "👣", label: "First Steps", tone: "gold" },
  { icon: "🔥", label: "12-Day Streak", tone: "rose" },
  { icon: "💛", label: "Generous Heart", tone: "amber" },
  { icon: "📖", label: "Scripture Scholar", tone: "teal" },
  { icon: "🙏", label: "Faithful Prayer", tone: "amethyst" },
  { icon: "✦", label: "Secret Badge", tone: "locked", locked: true },
];

const wall = [
  {
    name: "Maria",
    ring: "teal",
    initials: "MR",
    text: "Praying through Day 47 too — that veil verse wrecked me this morning in the best way. 💛",
    time: "2h ago",
    reactions: [
      { emoji: "🙏", count: 14 },
      { emoji: "💛", count: 9 },
      { emoji: "🔥", count: 4 },
    ],
  },
  {
    name: "David",
    ring: "amethyst",
    initials: "DV",
    text: "Showed up at 5am again. The streak is keeping me honest. Who else is walking before sunrise?",
    time: "5h ago",
    reactions: [
      { emoji: "👣", count: 21 },
      { emoji: "🔥", count: 12 },
    ],
  },
];

export default function SanctuaryPortalDesign() {
  return (
    <div className="pf-sanc">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pf-sanc{
  --navy:#1F3A5F; --navy-deep:#16263f; --navy-deeper:#0f1c2e;
  --gold:#C9A24B; --gold-2:#B8902E;
  --teal:#2f8f83; --amethyst:#7b5ea7; --rose:#c97b8b; --amber:#d9a24b;
  --cream:#FAF6EE; --ink:#22262B;
  --line:rgba(201,162,75,.22);
  --glass:rgba(255,255,255,.05);
  --glass-2:rgba(255,255,255,.08);
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  color:#eef2f7;
  background:
    radial-gradient(1200px 700px at 12% -10%, rgba(123,94,167,.28), transparent 55%),
    radial-gradient(1000px 600px at 95% 0%, rgba(47,143,131,.22), transparent 55%),
    radial-gradient(900px 700px at 70% 110%, rgba(201,162,75,.16), transparent 55%),
    linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 45%, var(--navy-deeper) 100%);
  min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.pf-sanc *{box-sizing:border-box;}
.pf-sanc a{color:inherit;text-decoration:none;}
.pf-sanc .serif{font-family:"Instrument Serif","Playfair Display",Georgia,serif;}

.pf-sanc .shell{max-width:1100px;margin:0 auto;padding:22px 20px 60px;}
.pf-sanc .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;gap:14px;flex-wrap:wrap;}
.pf-sanc .back{font-size:13px;color:rgba(238,242,247,.72);border:1px solid var(--line);padding:7px 13px;border-radius:999px;transition:.2s;}
.pf-sanc .back:hover{color:#fff;border-color:var(--gold);background:var(--glass);}
.pf-sanc .brand{display:flex;align-items:center;gap:10px;font-weight:600;letter-spacing:.3px;}
.pf-sanc .brand .mark{width:30px;height:30px;}

.pf-sanc .layout{display:grid;grid-template-columns:230px 1fr;gap:22px;align-items:start;}

/* nav */
.pf-sanc .nav{
  background:linear-gradient(180deg, var(--glass-2), var(--glass));
  border:1px solid var(--line);border-radius:20px;padding:14px;position:sticky;top:18px;
  backdrop-filter:blur(6px);
}
.pf-sanc .nav .nlink{
  display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:12px;
  font-size:14px;color:rgba(238,242,247,.78);margin-bottom:3px;transition:.18s;border:1px solid transparent;
}
.pf-sanc .nav .nlink .ic{font-size:15px;width:20px;text-align:center;}
.pf-sanc .nav .nlink:hover{background:var(--glass);color:#fff;}
.pf-sanc .nav .nlink.active{
  color:#fff;font-weight:600;
  background:linear-gradient(100deg, rgba(201,162,75,.22), rgba(123,94,167,.16));
  border-color:rgba(201,162,75,.45);
  box-shadow:0 0 22px rgba(201,162,75,.12) inset;
}

/* hero */
.pf-sanc .hero{
  position:relative;overflow:hidden;border-radius:24px;padding:30px 30px 28px;
  border:1px solid var(--line);
  background:linear-gradient(120deg, rgba(123,94,167,.28), rgba(31,58,95,.5) 45%, rgba(47,143,131,.26));
  box-shadow:0 18px 50px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.03) inset;
}
.pf-sanc .hero .glass-svg{position:absolute;inset:0;width:100%;height:100%;opacity:.5;pointer-events:none;}
.pf-sanc .hero .hero-inner{position:relative;z-index:1;display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;}
.pf-sanc .greet{font-size:14px;letter-spacing:.4px;color:var(--gold);text-transform:uppercase;font-weight:600;}
.pf-sanc .hero h1{font-size:clamp(30px,5vw,46px);line-height:1.05;margin:8px 0 6px;color:#fff;}
.pf-sanc .hero .date{color:rgba(238,242,247,.78);font-size:14px;}
.pf-sanc .streak-pill{
  display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:8px 14px;border-radius:999px;
  background:linear-gradient(100deg, rgba(201,162,75,.25), rgba(201,123,139,.22));
  border:1px solid rgba(201,162,75,.5);font-weight:600;font-size:14px;
}
.pf-sanc .hero-score{
  text-align:center;min-width:180px;border:1px solid rgba(255,255,255,.12);border-radius:20px;
  padding:16px 18px;background:rgba(15,28,46,.4);backdrop-filter:blur(4px);
}
.pf-sanc .hero-score .num{font-size:42px;line-height:1;color:var(--gold);font-weight:700;}
.pf-sanc .hero-score .lbl{font-size:12px;letter-spacing:.6px;text-transform:uppercase;color:rgba(238,242,247,.7);margin-top:4px;}
.pf-sanc .level-row{display:flex;justify-content:space-between;font-size:12px;margin:14px 0 6px;color:rgba(238,242,247,.8);}
.pf-sanc .bar{height:9px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden;}
.pf-sanc .bar > span{display:block;height:100%;width:60%;border-radius:999px;
  background:linear-gradient(90deg,var(--teal),var(--gold) 70%);box-shadow:0 0 14px rgba(201,162,75,.5);}

/* grid */
.pf-sanc .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px;}
.pf-sanc .card{
  background:linear-gradient(180deg, var(--glass-2), var(--glass));
  border:1px solid var(--line);border-radius:20px;padding:20px;backdrop-filter:blur(6px);
}
.pf-sanc .card h3{margin:0 0 14px;font-size:18px;color:#fff;display:flex;align-items:center;gap:9px;}
.pf-sanc .card h3 .dot{width:9px;height:9px;border-radius:50%;box-shadow:0 0 10px currentColor;}
.pf-sanc .span2{grid-column:1 / -1;}

/* devotional */
.pf-sanc .devo{position:relative;overflow:hidden;}
.pf-sanc .devo .frame{position:absolute;inset:0;opacity:.85;pointer-events:none;}
.pf-sanc .devo .devo-body{position:relative;z-index:1;}
.pf-sanc .devo .day-tag{font-size:12px;letter-spacing:.5px;text-transform:uppercase;color:var(--gold);font-weight:600;}
.pf-sanc .devo h2{font-size:clamp(24px,3.4vw,34px);line-height:1.12;margin:8px 0 10px;color:#fff;max-width:30ch;}
.pf-sanc .devo .ref{display:inline-block;font-size:13px;color:rgba(238,242,247,.8);border:1px solid var(--line);padding:5px 11px;border-radius:999px;margin-bottom:12px;}
.pf-sanc .devo p{color:rgba(238,242,247,.84);line-height:1.6;font-size:15px;margin:0 0 16px;max-width:62ch;}
.pf-sanc .btn{
  display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:14px;padding:11px 20px;border-radius:999px;
  background:linear-gradient(100deg,var(--gold),var(--gold-2));color:#1a1305;
  box-shadow:0 8px 22px rgba(201,162,75,.3);transition:.2s;
}
.pf-sanc .btn:hover{transform:translateY(-1px);box-shadow:0 12px 28px rgba(201,162,75,.45);}

/* chart */
.pf-sanc .chart-wrap{display:flex;gap:18px;flex-wrap:wrap;}
.pf-sanc .chart-svg{flex:1;min-width:240px;}
.pf-sanc .legend{display:flex;gap:16px;font-size:12px;color:rgba(238,242,247,.78);margin-top:8px;flex-wrap:wrap;}
.pf-sanc .legend span{display:inline-flex;align-items:center;gap:6px;}
.pf-sanc .swatch{width:11px;height:11px;border-radius:3px;}
.pf-sanc .stat-mini{display:flex;gap:14px;margin-top:12px;}
.pf-sanc .stat-mini .b{flex:1;border:1px solid var(--line);border-radius:14px;padding:12px;text-align:center;background:rgba(15,28,46,.35);}
.pf-sanc .stat-mini .b .v{font-size:22px;font-weight:700;color:#fff;}
.pf-sanc .stat-mini .b .k{font-size:11px;letter-spacing:.4px;text-transform:uppercase;color:rgba(238,242,247,.65);margin-top:2px;}

/* avatars */
.pf-sanc .avatar{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;font-weight:700;color:#fff;position:relative;flex:none;}
.pf-sanc .avatar .inner{display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--navy-deep);width:calc(100% - 6px);height:calc(100% - 6px);font-size:.42em;letter-spacing:.5px;}
.pf-sanc .ring-gold{background:conic-gradient(from 200deg,var(--gold),#f3d785,var(--gold-2),var(--gold));box-shadow:0 0 16px rgba(201,162,75,.45);}
.pf-sanc .ring-teal{background:conic-gradient(from 200deg,var(--teal),#5fd3c4,#1d6b62,var(--teal));box-shadow:0 0 16px rgba(47,143,131,.45);}
.pf-sanc .ring-amethyst{background:conic-gradient(from 200deg,var(--amethyst),#b89bdc,#523a78,var(--amethyst));box-shadow:0 0 16px rgba(123,94,167,.45);}

/* leaderboard */
.pf-sanc .lb-row{display:flex;align-items:center;gap:13px;padding:11px 12px;border-radius:14px;margin-bottom:8px;border:1px solid transparent;transition:.15s;}
.pf-sanc .lb-row:hover{background:var(--glass);}
.pf-sanc .lb-row.you{background:linear-gradient(100deg, rgba(201,162,75,.18), transparent);border-color:rgba(201,162,75,.4);}
.pf-sanc .lb-rank{width:22px;text-align:center;font-weight:700;color:var(--gold);font-size:15px;}
.pf-sanc .lb-name{flex:1;font-weight:600;font-size:15px;}
.pf-sanc .lb-name small{display:block;font-weight:500;font-size:11px;color:rgba(238,242,247,.6);}
.pf-sanc .lb-xp{font-weight:700;color:#fff;font-size:14px;}
.pf-sanc .lb-xp small{color:rgba(238,242,247,.6);font-weight:500;}

/* badges */
.pf-sanc .badge-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.pf-sanc .badge{
  border:1px solid var(--line);border-radius:16px;padding:14px 10px;text-align:center;
  background:rgba(15,28,46,.35);transition:.18s;
}
.pf-sanc .badge:hover{transform:translateY(-2px);}
.pf-sanc .badge .em{font-size:26px;display:block;margin-bottom:6px;filter:drop-shadow(0 0 8px currentColor);}
.pf-sanc .badge .nm{font-size:12px;font-weight:600;color:#fff;line-height:1.25;}
.pf-sanc .badge.gold{box-shadow:0 0 0 1px rgba(201,162,75,.4) inset;color:var(--gold);}
.pf-sanc .badge.rose{box-shadow:0 0 0 1px rgba(201,123,139,.4) inset;color:var(--rose);}
.pf-sanc .badge.amber{box-shadow:0 0 0 1px rgba(217,162,75,.4) inset;color:var(--amber);}
.pf-sanc .badge.teal{box-shadow:0 0 0 1px rgba(47,143,131,.4) inset;color:var(--teal);}
.pf-sanc .badge.amethyst{box-shadow:0 0 0 1px rgba(123,94,167,.4) inset;color:var(--amethyst);}
.pf-sanc .badge.locked{opacity:.55;color:rgba(238,242,247,.5);}
.pf-sanc .badge.locked .em{filter:none;}

/* wall */
.pf-sanc .wall-item{display:flex;gap:13px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07);}
.pf-sanc .wall-item:last-child{border-bottom:0;padding-bottom:0;}
.pf-sanc .wall-meta{display:flex;justify-content:space-between;align-items:baseline;gap:8px;}
.pf-sanc .wall-name{font-weight:600;color:#fff;font-size:14px;}
.pf-sanc .wall-time{font-size:11px;color:rgba(238,242,247,.55);}
.pf-sanc .wall-text{font-size:14px;line-height:1.5;color:rgba(238,242,247,.85);margin:5px 0 9px;}
.pf-sanc .reacts{display:flex;gap:8px;flex-wrap:wrap;}
.pf-sanc .react{
  display:inline-flex;align-items:center;gap:5px;font-size:13px;padding:4px 10px;border-radius:999px;
  border:1px solid var(--line);background:var(--glass);color:rgba(238,242,247,.85);
}
.pf-sanc .react b{color:var(--gold);font-weight:700;}
.pf-sanc .wall-add{
  width:100%;margin-top:16px;padding:11px 16px;border-radius:14px;border:1px dashed var(--line);
  background:transparent;color:rgba(238,242,247,.7);font-size:13px;text-align:left;cursor:text;
}

@media(max-width:860px){
  .pf-sanc .layout{grid-template-columns:1fr;}
  .pf-sanc .nav{position:static;display:flex;gap:6px;overflow-x:auto;padding:10px;}
  .pf-sanc .nav .nlink{margin-bottom:0;white-space:nowrap;}
  .pf-sanc .grid{grid-template-columns:1fr;}
}
`,
        }}
      />

      <div className="shell">
        <div className="topbar">
          <Link href="/designs/portal" className="back">
            ← All portal designs
          </Link>
          <div className="brand">
            <svg className="mark" viewBox="0 0 48 48" aria-hidden="true">
              <defs>
                <linearGradient id="sancMark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#C9A24B" />
                  <stop offset=".5" stopColor="#7b5ea7" />
                  <stop offset="1" stopColor="#2f8f83" />
                </linearGradient>
              </defs>
              <path
                d="M24 3 L43 14 V34 L24 45 L5 34 V14 Z"
                fill="none"
                stroke="url(#sancMark)"
                strokeWidth="2.4"
              />
              <path d="M24 12 V36 M16 24 H32" stroke="#C9A24B" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
            <span>The Daily Walk</span>
          </div>
        </div>

        <div className="layout">
          {/* NAV */}
          <nav className="nav" aria-label="Portal">
            {navItems.map((n) => (
              <Link
                key={n.label}
                href="#"
                className={`nlink${n.active ? " active" : ""}`}
              >
                <span className="ic" aria-hidden="true">
                  {n.icon}
                </span>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* MAIN */}
          <main>
            {/* HERO */}
            <section className="hero">
              <svg className="glass-svg" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#7b5ea7" stopOpacity=".9" />
                    <stop offset="1" stopColor="#2f8f83" stopOpacity=".4" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#C9A24B" stopOpacity=".7" />
                    <stop offset="1" stopColor="#c97b8b" stopOpacity=".35" />
                  </linearGradient>
                  <radialGradient id="glow" cx=".7" cy=".2" r=".8">
                    <stop offset="0" stopColor="#fff" stopOpacity=".25" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g stroke="rgba(15,20,32,.45)" strokeWidth="2">
                  <polygon points="0,0 200,0 130,150 0,120" fill="url(#g1)" />
                  <polygon points="200,0 420,0 360,150 130,150" fill="url(#g2)" />
                  <polygon points="420,0 640,0 600,140 360,150" fill="#2f8f83" fillOpacity=".5" />
                  <polygon points="640,0 800,0 800,130 600,140" fill="#7b5ea7" fillOpacity=".55" />
                  <polygon points="0,120 130,150 90,320 0,320" fill="#C9A24B" fillOpacity=".28" />
                  <polygon points="130,150 360,150 320,320 90,320" fill="#7b5ea7" fillOpacity=".4" />
                  <polygon points="360,150 600,140 560,320 320,320" fill="#2f8f83" fillOpacity=".35" />
                  <polygon points="600,140 800,130 800,320 560,320" fill="#c97b8b" fillOpacity=".3" />
                </g>
                <circle cx="560" cy="70" r="120" fill="url(#glow)" />
              </svg>
              <div className="hero-inner">
                <div>
                  <div className="greet">Good evening, Lulu ✦</div>
                  <h1 className="serif">Welcome back to the Sanctuary</h1>
                  <div className="date">Saturday, June 25 · Day 47 of 365</div>
                  <span className="streak-pill">🔥 12-day streak — keep walking</span>
                </div>
                <div className="hero-score">
                  <div className="num">340</div>
                  <div className="lbl">Walk Score</div>
                  <div className="level-row">
                    <span>Growing</span>
                    <span>Flourishing</span>
                  </div>
                  <div className="bar">
                    <span />
                  </div>
                  <div className="lbl" style={{ marginTop: "8px" }}>
                    ~60% to next level
                  </div>
                </div>
              </div>
            </section>

            {/* DEVOTIONAL */}
            <section className="card devo span2" style={{ marginTop: "18px" }}>
              <svg className="frame" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="frame1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#C9A24B" stopOpacity=".5" />
                    <stop offset="1" stopColor="#7b5ea7" stopOpacity=".25" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#frame1)" strokeWidth="1.4">
                  <path d="M0 28 H600 M0 172 H600" />
                  <path d="M30 0 V200 M570 0 V200" stroke="rgba(47,143,131,.3)" />
                  <path d="M30 28 L0 0 M570 28 L600 0 M30 172 L0 200 M570 172 L600 200" />
                </g>
              </svg>
              <div className="devo-body">
                <div className="day-tag">Today&apos;s Devotional · Day 47</div>
                <h2 className="serif">He tore the veil from His side</h2>
                <span className="ref">Matthew 27:51</span>
                <p>
                  At the moment Jesus breathed His last, the temple curtain split from top to bottom —
                  torn by heaven, not by hands. The barrier that kept people at a distance from God&apos;s
                  presence was finished. Today, you don&apos;t have to earn your way in. The way is open.
                  Walk through it.
                </p>
                <Link href="#" className="btn">
                  Read &amp; reflect ✦
                </Link>
              </div>
            </section>

            {/* GRID */}
            <div className="grid">
              {/* WEEKLY CHART */}
              <section className="card span2">
                <h3>
                  <span className="dot" style={{ background: "var(--teal)", color: "var(--teal)" }} />
                  This Week&apos;s Walk
                </h3>
                <div className="chart-wrap">
                  <svg className="chart-svg" viewBox="0 0 360 180" role="img" aria-label="Weekly activity chart">
                    <defs>
                      <linearGradient id="barWalk" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0" stopColor="#1d6b62" />
                        <stop offset="1" stopColor="#5fd3c4" />
                      </linearGradient>
                      <linearGradient id="barVerse" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0" stopColor="#B8902E" />
                        <stop offset="1" stopColor="#f3d785" />
                      </linearGradient>
                    </defs>
                    {/* gridlines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="34"
                        x2="352"
                        y1={20 + i * 30}
                        y2={20 + i * 30}
                        stroke="rgba(255,255,255,.08)"
                        strokeWidth="1"
                      />
                    ))}
                    {/* y labels */}
                    {[5, 4, 3, 2, 1].map((v, i) => (
                      <text key={v} x="26" y={24 + i * 30} fill="rgba(238,242,247,.55)" fontSize="9" textAnchor="end">
                        {v}
                      </text>
                    ))}
                    {[
                      { d: "Mon", w: 4, v: 2 },
                      { d: "Tue", w: 5, v: 3 },
                      { d: "Wed", w: 4, v: 2 },
                      { d: "Thu", w: 5, v: 3 },
                      { d: "Fri", w: 4, v: 2 },
                      { d: "Sat", w: 5, v: 3 },
                      { d: "Sun", w: 4, v: 2 },
                    ].map((p, i) => {
                      const x = 44 + i * 44;
                      const base = 140;
                      const wh = p.w * 24;
                      const vh = p.v * 24;
                      return (
                        <g key={p.d}>
                          <rect x={x} y={base - wh} width="13" height={wh} rx="3" fill="url(#barWalk)" />
                          <rect x={x + 16} y={base - vh} width="13" height={vh} rx="3" fill="url(#barVerse)" />
                          <text x={x + 14} y="154" fill="rgba(238,242,247,.65)" fontSize="9" textAnchor="middle">
                            {p.d}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  <div>
                    <div className="legend">
                      <span>
                        <i className="swatch" style={{ background: "#5fd3c4" }} /> Days walked
                      </span>
                      <span>
                        <i className="swatch" style={{ background: "#f3d785" }} /> Verses learned
                      </span>
                    </div>
                    <div className="stat-mini">
                      <div className="b">
                        <div className="v">
                          5 <small style={{ fontSize: "12px", color: "rgba(238,242,247,.5)" }}>vs 4</small>
                        </div>
                        <div className="k">Days walked</div>
                      </div>
                      <div className="b">
                        <div className="v">
                          3 <small style={{ fontSize: "12px", color: "rgba(238,242,247,.5)" }}>vs 2</small>
                        </div>
                        <div className="k">Verses learned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* LEADERBOARD */}
              <section className="card">
                <h3>
                  <span className="dot" style={{ background: "var(--gold)", color: "var(--gold)" }} />
                  Community Leaderboard
                </h3>
                {leaderboard
                  .slice()
                  .sort((a, b) => b.xp - a.xp)
                  .map((p, i) => (
                    <div key={p.name} className={`lb-row${p.you ? " you" : ""}`}>
                      <span className="lb-rank">{i + 1}</span>
                      <span
                        className={`avatar ring-${p.ring}`}
                        style={{ width: "40px", height: "40px", fontSize: "40px" }}
                      >
                        <span className="inner">{p.initials}</span>
                      </span>
                      <span className="lb-name">
                        {p.name}
                        {p.you && <small>That&apos;s you ✦</small>}
                      </span>
                      <span className="lb-xp">
                        {p.xp} <small>XP</small>
                      </span>
                    </div>
                  ))}
              </section>

              {/* BADGES */}
              <section className="card">
                <h3>
                  <span className="dot" style={{ background: "var(--amethyst)", color: "var(--amethyst)" }} />
                  Your Badges
                </h3>
                <div className="badge-grid">
                  {badges.map((b) => (
                    <div key={b.label} className={`badge ${b.tone}`}>
                      <span className="em" aria-hidden="true">
                        {b.icon}
                      </span>
                      <span className="nm">{b.locked ? "Locked" : b.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ENCOURAGEMENT WALL */}
              <section className="card span2">
                <h3>
                  <span className="dot" style={{ background: "var(--rose)", color: "var(--rose)" }} />
                  Encouragement Wall
                </h3>
                {wall.map((w) => (
                  <div key={w.name} className="wall-item">
                    <span
                      className={`avatar ring-${w.ring}`}
                      style={{ width: "42px", height: "42px", fontSize: "42px" }}
                    >
                      <span className="inner">{w.initials}</span>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div className="wall-meta">
                        <span className="wall-name">{w.name}</span>
                        <span className="wall-time">{w.time}</span>
                      </div>
                      <p className="wall-text">{w.text}</p>
                      <div className="reacts">
                        {w.reactions.map((r) => (
                          <span key={r.emoji} className="react">
                            {r.emoji} <b>{r.count}</b>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" className="wall-add">
                  💬 Share an encouragement with the community…
                </button>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
