import Link from "next/link";

export const metadata = { title: "Popup — Sunrise", robots: { index: false } };
export const dynamic = "force-static";

export default function PopSunrisePage() {
  return (
    <div className="pv-sun">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-sun {
  --navy: #1F3A5F;
  --gold: #C9A24B;
  --gold-dark: #B8902E;
  --cream: #FAF6EE;
  --ink: #2B2B2B;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ink);
}
.pv-sun *, .pv-sun *::before, .pv-sun *::after { box-sizing: border-box; }

.pv-sun .pv-nav {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
}
.pv-sun .pv-nav a {
  color: var(--navy);
  background: #fff;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 999px;
  box-shadow: 0 1px 4px rgba(0,0,0,.15);
  font-weight: 600;
  width: max-content;
}
.pv-sun .pv-nav a:hover { background: var(--cream); }
.pv-sun .pv-label {
  color: #fff;
  font-size: 12px;
  letter-spacing: .14em;
  text-transform: uppercase;
  padding-left: 4px;
  opacity: .85;
}

.pv-sun .pv-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: auto;
  background: rgba(15, 23, 40, .62);
  backdrop-filter: blur(3px);
}

.pv-sun .pv-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  background: var(--cream);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,.45);
  margin: auto;
}
.pv-sun .pv-anim { animation: pvPop .5s cubic-bezier(.2,.8,.25,1) both; }

/* ---- sunrise top ---- */
.pv-sun .pv-sky {
  position: relative;
  height: 230px;
}
.pv-sun .pv-sky svg { display: block; width: 100%; height: 100%; }

.pv-sun .pv-top-row {
  position: absolute;
  top: 16px;
  left: 20px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 4;
}
.pv-sun .pv-brand {
  color: #fff;
  font-size: 11px;
  letter-spacing: .22em;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 0 1px 6px rgba(15,23,40,.5);
}
.pv-sun .pv-close {
  color: #fff;
  background: rgba(255,255,255,.16);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pv-sun .pv-headline {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 20px;
  z-index: 4;
  margin: 0;
  font-family: "Instrument Serif", "Playfair Display", Georgia, serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.1;
  color: #fff;
  text-shadow: 0 2px 14px rgba(15,23,40,.55);
}

/* ---- body ---- */
.pv-sun .pv-body { padding: 22px 24px 26px; }
.pv-sun .pv-eyebrow {
  color: var(--gold-dark);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  margin: 0 0 8px;
}
.pv-sun .pv-sub {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 1.5;
  color: #45474b;
}
.pv-sun .pv-verse {
  margin: 0 0 18px;
  padding-left: 12px;
  border-left: 3px solid var(--gold);
  font-style: italic;
  font-size: 13px;
  color: #6a6c70;
  line-height: 1.45;
}

.pv-sun .pv-form { display: flex; gap: 8px; margin-bottom: 18px; }
.pv-sun .pv-input {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #ddd5c4;
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  color: var(--ink);
}
.pv-sun .pv-input::placeholder { color: #a7a39a; }
.pv-sun .pv-btn {
  flex-shrink: 0;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  background: var(--gold);
  color: var(--navy);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}
.pv-sun .pv-btn:hover { background: var(--gold-dark); color: #fff; }

.pv-sun .pv-benefits {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pv-sun .pv-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #3a3c40;
}
.pv-sun .pv-benefits .pv-ico { font-size: 17px; line-height: 1; }

.pv-sun .pv-footnote {
  margin: 0 0 12px;
  text-align: center;
  font-size: 12px;
  color: #8a8780;
}
.pv-sun .pv-founding {
  display: block;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--navy);
  text-decoration: none;
}
.pv-sun .pv-founding:hover { color: var(--gold-dark); text-decoration: underline; }

@media (max-width: 420px) {
  .pv-sun .pv-form { flex-direction: column; }
  .pv-sun .pv-headline { font-size: 27px; }
}

@keyframes pvPop {
  from { opacity: 0; transform: translateY(14px) scale(.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes pvShimmer {
  0%, 100% { opacity: .35; }
  50%      { opacity: .85; }
}

@media (prefers-reduced-motion: no-preference) {
  .pv-sun .pv-anim { animation: pvPop .5s cubic-bezier(.2,.8,.25,1) both; }
  .pv-sun .pv-rays { animation: pvShimmer 6s ease-in-out infinite; transform-origin: 50% 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .pv-sun .pv-anim { animation: none; }
}
`,
        }}
      />

      <div className="pv-nav">
        <Link href="/designs/popup">← All popup looks</Link>
        <span className="pv-label">Look: Sunrise</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card pv-anim" role="dialog" aria-modal="true" aria-label="Join The Daily Walk">
          <div className="pv-sky">
            <svg viewBox="0 0 440 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="pvSkyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F3A5F" />
                  <stop offset="45%" stopColor="#3a5478" />
                  <stop offset="78%" stopColor="#C9A24B" />
                  <stop offset="100%" stopColor="#F3D78A" />
                </linearGradient>
                <radialGradient id="pvGlow" cx="50%" cy="100%" r="75%">
                  <stop offset="0%" stopColor="#FFF3C8" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#F3D78A" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#F3D78A" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="440" height="230" fill="url(#pvSkyGrad)" />

              {/* soft rays */}
              <g className="pv-rays" fill="#FFF3C8" opacity="0.5">
                <polygon points="220,230 150,40 175,30" />
                <polygon points="220,230 200,18 225,18" />
                <polygon points="220,230 270,30 290,42" />
                <polygon points="220,230 110,70 135,55" />
                <polygon points="220,230 320,58 340,75" />
              </g>

              {/* horizon glow */}
              <ellipse cx="220" cy="232" rx="230" ry="120" fill="url(#pvGlow)" />

              {/* sun disc */}
              <circle cx="220" cy="226" r="46" fill="#FFF6D6" opacity="0.95" />
              <circle cx="220" cy="226" r="30" fill="#FFFCF0" />
            </svg>

            <div className="pv-top-row">
              <span className="pv-brand">The Daily Walk</span>
              <button className="pv-close" type="button" aria-label="Close">×</button>
            </div>

            <h2 className="pv-headline">A new morning with God.</h2>
          </div>

          <div className="pv-body">
            <p className="pv-eyebrow">Free every morning — before the world gets loud.</p>
            <p className="pv-sub">
              A short devotional, one honest prayer, and a little encouragement to start your day —
              free, forever.
            </p>
            <p className="pv-verse">
              “This is the day that the Lord has made…” — Psalm 118:24 · 6:30 AM PT
            </p>

            <div className="pv-form">
              <input className="pv-input" type="email" placeholder="your@email.com" aria-label="Email address" />
              <button className="pv-btn" type="button">Join free →</button>
            </div>

            <ul className="pv-benefits">
              <li><span className="pv-ico">📖</span> A 2-minute devotional each morning</li>
              <li><span className="pv-ico">🙏</span> One honest prayer</li>
              <li><span className="pv-ico">✨</span> Encouragement &amp; good news</li>
            </ul>

            <p className="pv-footnote">Free forever · No spam · Unsubscribe anytime</p>
            <a className="pv-founding" href="#">Become a Founding Member →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
