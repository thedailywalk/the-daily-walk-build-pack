import Link from "next/link";

export const metadata = { title: "Popup — Verse-forward", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pv-verse">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-verse {
  --navy: #1F3A5F;
  --gold: #C9A24B;
  --gold-dark: #B8902E;
  --cream: #FAF6EE;
  --ink: #2B2B2B;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--ink);
}
.pv-verse * { box-sizing: border-box; }

.pv-verse .pv-nav {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}
.pv-verse .pv-nav a {
  color: var(--navy);
  background: rgba(255,255,255,0.92);
  padding: 6px 12px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.pv-verse .pv-nav a:hover { background: #fff; }
.pv-verse .pv-look {
  background: var(--navy);
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.pv-verse .pv-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(18, 24, 36, 0.62);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  overflow-y: auto;
  z-index: 10;
}

.pv-verse .pv-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  border-radius: 22px;
  overflow: hidden;
  background:
    radial-gradient(120% 80% at 50% 0%, rgba(201,162,75,0.45) 0%, rgba(201,162,75,0.0) 55%),
    linear-gradient(170deg, #1F3A5F 0%, #2C4A73 38%, #6E5E5A 72%, #C9A24B 130%);
  box-shadow: 0 30px 70px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25);
  color: #fff;
}

.pv-verse .pv-sky {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.9;
}

.pv-verse .pv-content {
  position: relative;
  z-index: 2;
  padding: 22px 28px 26px;
}

.pv-verse .pv-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pv-verse .pv-brand {
  font-size: 11px;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
}
.pv-verse .pv-close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.9);
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.pv-verse .pv-verse-text {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 27px;
  line-height: 1.32;
  font-weight: 400;
  margin: 6px 0 14px;
  text-shadow: 0 2px 14px rgba(0,0,0,0.35);
  letter-spacing: 0.01em;
}
.pv-verse .pv-ref {
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--gold);
  font-weight: 700;
  margin-bottom: 22px;
}

.pv-verse .pv-panel {
  background: var(--cream);
  color: var(--ink);
  border-radius: 16px;
  padding: 20px 20px 18px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

.pv-verse .pv-eyebrow {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--gold-dark);
  margin-bottom: 8px;
}
.pv-verse .pv-headline {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  color: var(--navy);
  margin: 0 0 8px;
  font-weight: 700;
}
.pv-verse .pv-sub {
  font-size: 14px;
  line-height: 1.5;
  color: #4a4a4a;
  margin: 0 0 16px;
}

.pv-verse .pv-form {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}
.pv-verse .pv-input {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #d8cfbd;
  border-radius: 10px;
  font-size: 14px;
  background: #fff;
  color: var(--ink);
}
.pv-verse .pv-btn {
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-dark) 100%);
  color: #fff;
  border: none;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  cursor: default;
  box-shadow: 0 4px 12px rgba(184,144,46,0.4);
}

.pv-verse .pv-benefits {
  list-style: none;
  margin: 0 0 14px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.pv-verse .pv-benefits li {
  font-size: 13px;
  color: #3a3a3a;
  display: flex;
  align-items: center;
  gap: 8px;
}
.pv-verse .pv-benefits .pv-emoji { font-size: 15px; }

.pv-verse .pv-footnote {
  font-size: 11.5px;
  color: #8a8170;
  text-align: center;
  margin: 0 0 10px;
  letter-spacing: 0.02em;
}
.pv-verse .pv-deeper {
  text-align: center;
}
.pv-verse .pv-deeper a {
  font-size: 12.5px;
  color: var(--navy);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid rgba(31,58,95,0.3);
}

@media (max-width: 420px) {
  .pv-verse .pv-verse-text { font-size: 23px; }
  .pv-verse .pv-form { flex-direction: column; }
  .pv-verse .pv-content { padding: 18px 20px 22px; }
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes pv-pop {
    from { opacity: 0; transform: translateY(18px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes pv-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .pv-verse .pv-backdrop { animation: pv-fade 0.4s ease both; }
  .pv-verse .pv-card { animation: pv-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
}
`,
        }}
      />

      <div className="pv-nav">
        <Link href="/designs/popup">← All popup looks</Link>
        <span className="pv-look">Look: Verse-forward</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card" role="dialog" aria-label="Welcome to The Daily Walk">
          <svg
            className="pv-sky"
            viewBox="0 0 440 560"
            preserveAspectRatio="xMidYMin slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="pv-sun" cx="50%" cy="58%" r="55%">
                <stop offset="0%" stopColor="#FCE9B8" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#E7C46A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#E7C46A" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="220" cy="320" r="240" fill="url(#pv-sun)" />
            <g fill="#ffffff">
              <circle cx="48" cy="60" r="1.3" opacity="0.8" />
              <circle cx="96" cy="38" r="0.9" opacity="0.6" />
              <circle cx="150" cy="72" r="1.1" opacity="0.7" />
              <circle cx="300" cy="46" r="1" opacity="0.65" />
              <circle cx="360" cy="80" r="1.4" opacity="0.85" />
              <circle cx="400" cy="40" r="0.9" opacity="0.55" />
              <circle cx="250" cy="96" r="0.8" opacity="0.5" />
              <circle cx="70" cy="110" r="0.8" opacity="0.5" />
              <circle cx="190" cy="40" r="1" opacity="0.6" />
              <circle cx="330" cy="120" r="0.9" opacity="0.5" />
            </g>
            <g stroke="#FCE9B8" strokeWidth="1" opacity="0.18">
              <line x1="220" y1="320" x2="220" y2="120" />
              <line x1="220" y1="320" x2="120" y2="160" />
              <line x1="220" y1="320" x2="320" y2="160" />
              <line x1="220" y1="320" x2="60" y2="240" />
              <line x1="220" y1="320" x2="380" y2="240" />
            </g>
          </svg>

          <div className="pv-content">
            <div className="pv-top">
              <span className="pv-brand">THE DAILY WALK</span>
              <span className="pv-close" aria-hidden="true">×</span>
            </div>

            <p className="pv-verse-text">
              “This is the day that the Lord has made; let us rejoice and be glad in it.”
            </p>
            <p className="pv-ref">— Psalm 118:24</p>

            <div className="pv-panel">
              <p className="pv-eyebrow">Free every morning — before the world gets loud.</p>
              <h2 className="pv-headline">Start tomorrow with God.</h2>
              <p className="pv-sub">
                A short devotional, an honest prayer, and a little encouragement — free, forever.
              </p>

              <div className="pv-form">
                <input
                  className="pv-input"
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  readOnly
                />
                <button className="pv-btn" type="button">Join free →</button>
              </div>

              <ul className="pv-benefits">
                <li><span className="pv-emoji">📖</span> A 2-minute devotional each morning</li>
                <li><span className="pv-emoji">🙏</span> One honest prayer</li>
                <li><span className="pv-emoji">✨</span> Encouragement &amp; good news</li>
              </ul>

              <p className="pv-footnote">Free forever · No spam · Unsubscribe anytime</p>
              <p className="pv-deeper">
                <a href="#">Want to go deeper? Become a Founding Member →</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
