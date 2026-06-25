import Link from "next/link";

export const metadata = { title: "Popup — Dark Star + Sun", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pv-starsun">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-starsun {
  --navy-1: #0b1424;
  --navy-2: #16263f;
  --navy-deep: #1F3A5F;
  --gold: #E3C074;
  --gold-2: #C9A24B;
  --cream: #FAF6EE;
  --ink: #22262B;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--cream);
}
.pv-starsun *, .pv-starsun *::before, .pv-starsun *::after { box-sizing: border-box; }

.pv-starsun .pv-nav {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 13px;
}
.pv-starsun .pv-nav a {
  color: #1F3A5F;
  background: #FAF6EE;
  padding: 6px 12px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid rgba(31,58,95,.25);
  box-shadow: 0 1px 4px rgba(0,0,0,.15);
}
.pv-starsun .pv-nav a:hover { background: #fff; }
.pv-starsun .pv-label {
  color: #FAF6EE;
  background: rgba(11,20,36,.7);
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(227,192,116,.4);
  font-weight: 600;
}

.pv-starsun .pv-backdrop {
  position: fixed;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 0%, rgba(31,58,95,.55), rgba(0,0,0,.78) 70%);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  overflow: auto;
  z-index: 40;
}

.pv-starsun .pv-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  max-height: calc(100vh - 48px);
  overflow: hidden auto;
  border-radius: 22px;
  background: linear-gradient(180deg, var(--navy-1) 0%, var(--navy-2) 100%);
  border: 1px solid rgba(227,192,116,.28);
  box-shadow: 0 30px 80px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04);
  animation: pv-pop .5s cubic-bezier(.16,1,.3,1) both;
}

/* ---- celestial header ---- */
.pv-starsun .pv-sky {
  position: relative;
  height: 132px;
  overflow: hidden;
}
.pv-starsun .pv-stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.pv-starsun .pv-star { fill: #fff; }
.pv-starsun .pv-sun-wrap {
  position: absolute;
  left: 50%;
  top: -86px;
  transform: translateX(-50%);
  width: 220px;
  height: 220px;
  pointer-events: none;
}
.pv-starsun .pv-sun-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 60%, rgba(227,192,116,.85) 0%, rgba(227,192,116,.35) 32%, rgba(227,192,116,0) 62%);
}
.pv-starsun .pv-sun-core {
  position: absolute;
  left: 50%;
  top: 56px;
  transform: translateX(-50%);
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 38%, #fff5dc 0%, #f1d588 38%, #E3C074 64%, #C9A24B 100%);
  box-shadow: 0 0 32px 8px rgba(227,192,116,.55);
}
.pv-starsun .pv-rays {
  position: absolute;
  left: 50%;
  top: 56px;
  transform: translateX(-50%);
  width: 220px;
  height: 220px;
}
.pv-starsun .pv-rays line {
  stroke: rgba(227,192,116,.5);
  stroke-width: 2;
  stroke-linecap: round;
}

.pv-starsun .pv-body { padding: 4px 26px 26px; }

.pv-starsun .pv-toprow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 0;
  position: relative;
  z-index: 3;
}
.pv-starsun .pv-brand {
  font-size: 11px;
  letter-spacing: .22em;
  font-weight: 700;
  color: var(--gold);
}
.pv-starsun .pv-close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(250,246,238,.25);
  background: rgba(11,20,36,.5);
  color: var(--cream);
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
}
.pv-starsun .pv-close:hover { background: rgba(227,192,116,.18); }

.pv-starsun .pv-stats {
  display: flex;
  justify-content: center;
  gap: 14px;
  font-size: 10px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(250,246,238,.7);
  margin: 2px 0 18px;
  flex-wrap: wrap;
}
.pv-starsun .pv-stats b { color: var(--gold); font-weight: 800; }
.pv-starsun .pv-stats .sep { color: rgba(227,192,116,.5); }

.pv-starsun .pv-eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  font-size: 12.5px;
  color: rgba(250,246,238,.85);
  margin-bottom: 12px;
}
.pv-starsun .pv-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 8px rgba(227,192,116,.9);
  flex: none;
}

.pv-starsun .pv-head {
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  font-size: 31px;
  line-height: 1.15;
  text-align: center;
  color: #fff;
  margin: 0 0 12px;
}
.pv-starsun .pv-head .accent { color: var(--gold); font-style: italic; }

.pv-starsun .pv-sub {
  text-align: center;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(250,246,238,.78);
  margin: 0 auto 20px;
  max-width: 360px;
}

.pv-starsun .pv-verse {
  background: rgba(31,58,95,.35);
  border-left: 3px solid var(--gold);
  border-radius: 8px;
  padding: 12px 14px;
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--cream);
  margin-bottom: 20px;
}
.pv-starsun .pv-verse .ref { display: block; font-style: normal; font-size: 11px; color: rgba(227,192,116,.85); margin-top: 6px; letter-spacing: .04em; }

.pv-starsun .pv-form {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}
.pv-starsun .pv-input {
  flex: 1;
  min-width: 0;
  background: rgba(11,20,36,.7);
  border: 1px solid rgba(250,246,238,.2);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--cream);
  font-size: 14px;
}
.pv-starsun .pv-input::placeholder { color: rgba(250,246,238,.45); }
.pv-starsun .pv-input:focus { outline: none; border-color: var(--gold); }
.pv-starsun .pv-btn {
  flex: none;
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-2) 100%);
  color: #2a1f08;
  font-weight: 800;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  padding: 12px 18px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(201,162,75,.35);
}
.pv-starsun .pv-btn:hover { filter: brightness(1.05); }

.pv-starsun .pv-benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  display: grid;
  gap: 9px;
}
.pv-starsun .pv-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(250,246,238,.82);
}
.pv-starsun .pv-benefits .ico { font-size: 15px; flex: none; }

.pv-starsun .pv-footnote {
  text-align: center;
  font-size: 11px;
  color: rgba(250,246,238,.55);
  margin-bottom: 12px;
}
.pv-starsun .pv-deeper {
  text-align: center;
  font-size: 12.5px;
}
.pv-starsun .pv-deeper a {
  color: var(--gold);
  text-decoration: none;
  font-weight: 600;
}
.pv-starsun .pv-deeper a:hover { text-decoration: underline; }

@keyframes pv-pop {
  from { opacity: 0; transform: translateY(14px) scale(.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes pv-glow {
  0%, 100% { opacity: .85; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.06); }
}
@keyframes pv-shimmer {
  0%, 100% { opacity: .35; }
  50%      { opacity: .7; }
}
@keyframes pv-twinkle {
  0%, 100% { opacity: .25; }
  50%      { opacity: 1; }
}

@media (prefers-reduced-motion: no-preference) {
  .pv-starsun .pv-card { animation: pv-pop .5s cubic-bezier(.16,1,.3,1) both; }
  .pv-starsun .pv-sun-glow { animation: pv-glow 6s ease-in-out infinite; }
  .pv-starsun .pv-rays { animation: pv-shimmer 5s ease-in-out infinite; transform-origin: 50% 50%; }
  .pv-starsun .pv-star { animation: pv-twinkle 4s ease-in-out infinite; }
  .pv-starsun .pv-star.s2 { animation-duration: 5.5s; animation-delay: .8s; }
  .pv-starsun .pv-star.s3 { animation-duration: 3.2s; animation-delay: 1.6s; }
  .pv-starsun .pv-star.s4 { animation-duration: 6s; animation-delay: 2.2s; }
}

@media (max-width: 420px) {
  .pv-starsun .pv-body { padding: 4px 18px 22px; }
  .pv-starsun .pv-head { font-size: 27px; }
  .pv-starsun .pv-form { flex-direction: column; }
  .pv-starsun .pv-btn { padding: 12px; }
}
`,
        }}
      />

      <div className="pv-nav">
        <Link href="/designs/popup">← All popup looks</Link>
        <span className="pv-label">Look: Dark Star + Sun</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card" role="dialog" aria-modal="true" aria-label="Welcome to The Daily Walk">
          {/* sky header */}
          <div className="pv-sky">
            <svg className="pv-stars" viewBox="0 0 440 132" preserveAspectRatio="none" aria-hidden="true">
              <circle className="pv-star s1" cx="40" cy="30" r="1.3" />
              <circle className="pv-star s2" cx="92" cy="62" r="1" />
              <circle className="pv-star s3" cx="150" cy="22" r="1.4" />
              <circle className="pv-star s4" cx="300" cy="40" r="1.1" />
              <circle className="pv-star s2" cx="362" cy="70" r="1.3" />
              <circle className="pv-star s3" cx="400" cy="28" r="1" />
              <circle className="pv-star s1" cx="258" cy="78" r="1" />
              <circle className="pv-star s4" cx="20" cy="84" r="1.2" />
              <circle className="pv-star s2" cx="420" cy="100" r="1" />
              <circle className="pv-star s3" cx="120" cy="98" r="1.1" />
            </svg>

            <div className="pv-sun-wrap">
              <div className="pv-sun-glow" />
              <svg className="pv-rays" viewBox="0 0 220 220" aria-hidden="true">
                <g stroke="rgba(227,192,116,.5)">
                  <line x1="110" y1="110" x2="110" y2="6" />
                  <line x1="110" y1="110" x2="38" y2="38" />
                  <line x1="110" y1="110" x2="182" y2="38" />
                  <line x1="110" y1="110" x2="6" y2="110" />
                  <line x1="110" y1="110" x2="214" y2="110" />
                  <line x1="110" y1="110" x2="60" y2="20" />
                  <line x1="110" y1="110" x2="160" y2="20" />
                </g>
              </svg>
              <div className="pv-sun-core" />
            </div>
          </div>

          {/* top row */}
          <div className="pv-toprow">
            <span className="pv-brand">THE DAILY WALK</span>
            <Link href="/designs/popup" className="pv-close" aria-label="Close">×</Link>
          </div>

          <div className="pv-body">
            <div className="pv-stats">
              <span><b>DAILY</b> DEVOTIONAL</span>
              <span className="sep">·</span>
              <span><b>2</b> MIN READ</span>
              <span className="sep">·</span>
              <span><b>FREE</b> ALWAYS</span>
            </div>

            <div className="pv-eyebrow">
              <span className="pv-dot" />
              Free every morning — before the world gets loud.
            </div>

            <h2 className="pv-head">
              A new morning <span className="accent">with God.</span>
            </h2>

            <p className="pv-sub">
              A short devotional, one honest prayer, and a little encouragement to start your
              day — free, forever.
            </p>

            <div className="pv-verse">
              “This is the day that the Lord has made…”
              <span className="ref">— Psalm 118:24 · 6:30 AM PT</span>
            </div>

            <div className="pv-form">
              <input
                className="pv-input"
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
              />
              <button className="pv-btn" type="button">Join free →</button>
            </div>

            <ul className="pv-benefits">
              <li><span className="ico">📖</span> A 2-minute devotional each morning</li>
              <li><span className="ico">🙏</span> One honest prayer</li>
              <li><span className="ico">✨</span> Encouragement &amp; good news</li>
            </ul>

            <p className="pv-footnote">Free forever · No spam · Unsubscribe anytime</p>

            <p className="pv-deeper">
              <Link href="/designs/popup">Want to go deeper? Become a Founding Member →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
