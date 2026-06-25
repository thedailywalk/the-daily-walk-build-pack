import Link from "next/link";

export const metadata = { title: "Popup — Dark Rays", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pv-rays">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-rays {
  --navy: #1F3A5F;
  --navy-deep: #0b1424;
  --gold: #E3C074;
  --gold-2: #C9A24B;
  --ink: #22262B;
  --cream: #FAF6EE;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: #EAF0F8;
  min-height: 100vh;
}
.pv-rays *, .pv-rays *::before, .pv-rays *::after { box-sizing: border-box; }

.pv-rays .pv-page {
  position: relative;
  min-height: 100vh;
  background:
    radial-gradient(120% 90% at 80% 10%, #16294a 0%, #0b1424 55%, #060c17 100%);
}

.pv-rays .pv-topbar {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 30;
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
}
.pv-rays .pv-topbar a {
  color: #EAF0F8;
  text-decoration: none;
  background: rgba(20, 32, 56, 0.7);
  border: 1px solid rgba(227, 192, 116, 0.3);
  padding: 7px 12px;
  border-radius: 999px;
  backdrop-filter: blur(6px);
}
.pv-rays .pv-topbar a:hover { border-color: var(--gold); }
.pv-rays .pv-look {
  color: #C8D4E6;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
}

/* Backdrop */
.pv-rays .pv-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(4, 8, 16, 0.72);
  backdrop-filter: blur(3px);
  overflow: auto;
}

/* Card */
.pv-rays .pv-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  max-height: calc(100vh - 48px);
  overflow: auto;
  border-radius: 22px;
  background:
    linear-gradient(165deg, #16294a 0%, #0d1a31 48%, #0a1326 100%);
  border: 1px solid rgba(227, 192, 116, 0.22);
  box-shadow:
    0 40px 90px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.02) inset;
  animation: pv-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* Rays layer */
.pv-rays .pv-rays-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  mix-blend-mode: screen;
}
.pv-rays .pv-ray-group {
  transform-origin: 18% 118%;
  animation: pv-drift 22s ease-in-out infinite alternate;
}
.pv-rays .pv-sun {
  position: absolute;
  left: 6%;
  bottom: -70px;
  width: 220px;
  height: 220px;
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(227, 192, 116, 0.45) 0%, rgba(227, 192, 116, 0.12) 38%, rgba(227, 192, 116, 0) 70%);
  filter: blur(2px);
  animation: pv-shimmer 6s ease-in-out infinite;
}

.pv-rays .pv-inner {
  position: relative;
  z-index: 2;
  padding: 26px 26px 22px;
}

/* Header */
.pv-rays .pv-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.pv-rays .pv-brand {
  font-size: 12px;
  letter-spacing: 0.26em;
  font-weight: 700;
  color: var(--gold);
  text-transform: uppercase;
}
.pv-rays .pv-close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(227, 192, 116, 0.3);
  background: rgba(255, 255, 255, 0.04);
  color: #D9E2F0;
  font-size: 17px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
}
.pv-rays .pv-close:hover { border-color: var(--gold); color: #fff; }

.pv-rays .pv-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
  font-size: 10px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #A9BAD2;
  margin-bottom: 18px;
}
.pv-rays .pv-stats span { white-space: nowrap; }
.pv-rays .pv-stats .pv-sep { color: rgba(227, 192, 116, 0.55); }

.pv-rays .pv-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #D7E0EE;
  margin-bottom: 12px;
}
.pv-rays .pv-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 10px rgba(227, 192, 116, 0.8);
  flex: none;
}

.pv-rays .pv-h1 {
  font-family: "Instrument Serif", "Playfair Display", Georgia, serif;
  font-weight: 400;
  font-size: 34px;
  line-height: 1.12;
  margin: 0 0 12px;
  color: #F4F8FF;
}
.pv-rays .pv-h1 .pv-accent {
  color: var(--gold);
  font-style: italic;
}

.pv-rays .pv-sub {
  font-size: 14.5px;
  line-height: 1.55;
  color: #C3D0E2;
  margin: 0 0 18px;
}

/* Verse panel */
.pv-rays .pv-verse {
  position: relative;
  border: 1px solid rgba(227, 192, 116, 0.4);
  background: rgba(7, 14, 28, 0.55);
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 18px;
}
.pv-rays .pv-verse-q {
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 16px;
  line-height: 1.4;
  color: #EDE2C7;
  margin: 0 0 6px;
}
.pv-rays .pv-verse-cite {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #A9BAD2;
  text-transform: uppercase;
}

/* Form */
.pv-rays .pv-form {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}
.pv-rays .pv-input {
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(227, 192, 116, 0.28);
  border-radius: 11px;
  padding: 12px 14px;
  font-size: 14px;
  color: #EAF0F8;
}
.pv-rays .pv-input::placeholder { color: #8fa0bb; }
.pv-rays .pv-btn {
  flex: none;
  border: none;
  border-radius: 11px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 700;
  color: #1a1206;
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-2) 100%);
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 8px 20px rgba(201, 162, 75, 0.3);
}
.pv-rays .pv-btn:hover { filter: brightness(1.05); }

/* Benefits */
.pv-rays .pv-benefits {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: grid;
  gap: 9px;
}
.pv-rays .pv-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #CBD7E8;
}
.pv-rays .pv-benefits .pv-emoji {
  font-size: 15px;
  flex: none;
  width: 22px;
  text-align: center;
}

/* Footer */
.pv-rays .pv-foot {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 14px;
  text-align: center;
}
.pv-rays .pv-foot-fine {
  font-size: 11px;
  letter-spacing: 0.05em;
  color: #93A4BE;
  margin: 0 0 8px;
}
.pv-rays .pv-founder {
  font-size: 12.5px;
  color: var(--gold);
  text-decoration: none;
  font-weight: 600;
}
.pv-rays .pv-founder:hover { text-decoration: underline; }

@keyframes pv-pop {
  from { opacity: 0; transform: translateY(14px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes pv-drift {
  from { transform: rotate(-3deg); opacity: 0.85; }
  to   { transform: rotate(3deg); opacity: 1; }
}
@keyframes pv-shimmer {
  0%, 100% { opacity: 0.8; }
  50%      { opacity: 1; }
}

.pv-rays .pv-card { animation: none; }
.pv-rays .pv-ray-group { animation: none; }
.pv-rays .pv-sun { animation: none; }

@media (prefers-reduced-motion: no-preference) {
  .pv-rays .pv-card { animation: pv-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .pv-rays .pv-ray-group { animation: pv-drift 22s ease-in-out infinite alternate; }
  .pv-rays .pv-sun { animation: pv-shimmer 6s ease-in-out infinite; }
}

@media (max-width: 480px) {
  .pv-rays .pv-h1 { font-size: 29px; }
  .pv-rays .pv-form { flex-direction: column; }
  .pv-rays .pv-btn { width: 100%; }
  .pv-rays .pv-inner { padding: 22px 18px 18px; }
}
`,
        }}
      />

      <div className="pv-page">
        <div className="pv-topbar">
          <Link href="/designs/popup">← All popup looks</Link>
          <span className="pv-look">Look: Dark Rays</span>
        </div>

        <div className="pv-backdrop">
          <div className="pv-card" role="dialog" aria-label="Welcome to The Daily Walk">
            {/* Light rays */}
            <svg
              className="pv-rays-svg"
              viewBox="0 0 440 620"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pvRayGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E3C074" stopOpacity="0.42" />
                  <stop offset="45%" stopColor="#E3C074" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#E3C074" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="pv-ray-group" fill="url(#pvRayGrad)">
                <polygon points="80,730 60,720 560,-40 640,-20" />
                <polygon points="80,730 70,725 700,80 800,140" />
                <polygon points="80,730 76,728 760,300 880,400" />
                <polygon points="80,730 64,724 360,-120 420,-110" />
                <polygon points="80,730 72,727 720,-10 820,40" />
                <polygon points="80,730 78,729 800,460 920,580" />
              </g>
            </svg>

            {/* Sun glow */}
            <div className="pv-sun" aria-hidden="true" />

            <div className="pv-inner">
              <div className="pv-head">
                <span className="pv-brand">The Daily Walk</span>
                <Link href="/designs/popup" className="pv-close" aria-label="Close">
                  ×
                </Link>
              </div>

              <div className="pv-stats">
                <span>Daily Devotional</span>
                <span className="pv-sep">·</span>
                <span>2 Min Read</span>
                <span className="pv-sep">·</span>
                <span>Free Always</span>
              </div>

              <div className="pv-eyebrow">
                <span className="pv-dot" />
                Free every morning — before the world gets loud.
              </div>

              <h1 className="pv-h1">
                A new morning <span className="pv-accent">with God.</span>
              </h1>

              <p className="pv-sub">
                A short devotional, one honest prayer, and a little encouragement
                to start your day — free, forever.
              </p>

              <div className="pv-verse">
                <p className="pv-verse-q">
                  “This is the day that the Lord has made…”
                </p>
                <div className="pv-verse-cite">Psalm 118:24 · 6:30 AM PT</div>
              </div>

              <div className="pv-form">
                <input
                  className="pv-input"
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  readOnly
                  value=""
                />
                <button className="pv-btn" type="button">
                  Join free →
                </button>
              </div>

              <ul className="pv-benefits">
                <li>
                  <span className="pv-emoji">📖</span> A 2-minute devotional each morning
                </li>
                <li>
                  <span className="pv-emoji">🙏</span> One honest prayer
                </li>
                <li>
                  <span className="pv-emoji">✨</span> Encouragement & good news
                </li>
              </ul>

              <div className="pv-foot">
                <p className="pv-foot-fine">Free forever · No spam · Unsubscribe anytime</p>
                <Link href="/designs/popup" className="pv-founder">
                  Become a Founding Member →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
