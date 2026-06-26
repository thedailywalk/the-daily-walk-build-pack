import Link from "next/link";

export const metadata = { title: "Popup — Dark Horizon", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pv-horizon">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-horizon {
  --navy: #1F3A5F;
  --navy-deep: #0b1424;
  --gold: #E3C074;
  --gold-deep: #C9A24B;
  --ink-on-dark: #e8edf5;
  --muted: #9fb0c8;
  position: fixed;
  inset: 0;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--ink-on-dark);
}
.pv-horizon * { box-sizing: border-box; }

.pv-horizon .pv-pagelabel {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #cdd6e4;
}
.pv-horizon .pv-pagelabel a {
  color: #fff;
  text-decoration: none;
  background: rgba(11,20,36,.7);
  border: 1px solid rgba(227,192,116,.35);
  padding: 6px 10px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
}
.pv-horizon .pv-pagelabel a:hover { border-color: var(--gold); }
.pv-horizon .pv-pagelabel .pv-look {
  padding-left: 4px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
}

.pv-horizon .pv-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(6,11,20,.72);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  z-index: 20;
}

.pv-horizon .pv-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  border-radius: 22px;
  background: var(--navy-deep);
  border: 1px solid rgba(227,192,116,.22);
  box-shadow: 0 30px 80px rgba(0,0,0,.6);
  isolation: isolate;
  animation: pv-pop .5s ease both;
}

/* Dark Horizon glow: navy top melting into a gold horizon line lower-third */
.pv-horizon .pv-sky {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 70% at 50% 72%, rgba(227,192,116,.55) 0%, rgba(227,192,116,.18) 18%, rgba(227,192,116,0) 42%),
    linear-gradient(180deg, #0a1322 0%, #0c1a30 46%, #16314f 64%, #7a5a22 78%, #0a1322 100%);
}
.pv-horizon .pv-sky::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  top: 73%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold) 18%, #fff1cf 50%, var(--gold) 82%, transparent);
  box-shadow: 0 0 18px 3px rgba(227,192,116,.55);
}
.pv-horizon .pv-sun {
  position: absolute;
  left: 50%;
  top: 73%;
  width: 180px;
  height: 180px;
  transform: translate(-50%, -55%);
  z-index: 0;
  pointer-events: none;
  opacity: .9;
}

.pv-horizon .pv-inner {
  position: relative;
  z-index: 2;
  padding: 22px 24px 24px;
}

.pv-horizon .pv-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pv-horizon .pv-brand {
  font-size: 12px;
  letter-spacing: .22em;
  font-weight: 700;
  color: var(--gold);
}
.pv-horizon .pv-close {
  width: 30px; height: 30px;
  border-radius: 999px;
  border: 1px solid rgba(227,192,116,.3);
  background: rgba(255,255,255,.04);
  color: #d8e0ec;
  font-size: 17px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}
.pv-horizon .pv-close:hover { border-color: var(--gold); color: #fff; }

.pv-horizon .pv-stats {
  margin-top: 12px;
  font-size: 10.5px;
  letter-spacing: .12em;
  color: var(--muted);
  text-transform: uppercase;
}

.pv-horizon .pv-eyebrow {
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #d6c79a;
}
.pv-horizon .pv-dot {
  width: 7px; height: 7px;
  border-radius: 999px;
  background: var(--gold);
  box-shadow: 0 0 10px 1px rgba(227,192,116,.8);
}

.pv-horizon .pv-headline {
  margin: 12px 0 0;
  font-family: "Instrument Serif", Georgia, "Playfair Display", serif;
  font-weight: 400;
  font-size: 34px;
  line-height: 1.12;
  color: #fff;
}
.pv-horizon .pv-headline .pv-accent { color: var(--gold); }

.pv-horizon .pv-sub {
  margin: 12px 0 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: #c3cfdf;
}

.pv-horizon .pv-verse {
  margin-top: 18px;
  padding: 14px 16px;
  border: 1px solid rgba(227,192,116,.4);
  border-radius: 14px;
  background: rgba(6,11,20,.55);
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 15px;
  line-height: 1.5;
  color: #ecdfc0;
}
.pv-horizon .pv-verse .pv-ref {
  display: block;
  margin-top: 6px;
  font-family: Inter, sans-serif;
  font-size: 11.5px;
  letter-spacing: .06em;
  color: var(--muted);
}

.pv-horizon .pv-form {
  margin-top: 18px;
  display: flex;
  gap: 8px;
}
.pv-horizon .pv-input {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border-radius: 11px;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.05);
  color: #fff;
  font-size: 14px;
}
.pv-horizon .pv-input::placeholder { color: #8fa0b8; }
.pv-horizon .pv-btn {
  flex: none;
  padding: 12px 16px;
  border-radius: 11px;
  border: none;
  background: linear-gradient(180deg, var(--gold), var(--gold-deep));
  color: #221a07;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(227,192,116,.28);
}

.pv-horizon .pv-benefits {
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 9px;
}
.pv-horizon .pv-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: #cdd9e8;
}
.pv-horizon .pv-benefits .pv-emoji { font-size: 15px; }

.pv-horizon .pv-footer {
  margin-top: 20px;
  text-align: center;
}
.pv-horizon .pv-footer .pv-fine {
  font-size: 11.5px;
  color: #8294ad;
}
.pv-horizon .pv-footer .pv-founding {
  display: inline-block;
  margin-top: 10px;
  font-size: 12.5px;
  color: var(--gold);
  text-decoration: none;
  border-bottom: 1px dashed rgba(227,192,116,.5);
  padding-bottom: 1px;
}
.pv-horizon .pv-footer .pv-founding:hover { color: #fff; }

@media (max-width: 420px) {
  .pv-horizon .pv-form { flex-direction: column; }
  .pv-horizon .pv-headline { font-size: 30px; }
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes pv-pop {
    from { opacity: 0; transform: translateY(14px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes pv-glow {
    0%, 100% { opacity: .82; }
    50%      { opacity: 1; }
  }
  .pv-horizon .pv-sky { animation: pv-glow 7s ease-in-out infinite; }
  .pv-horizon .pv-sun { animation: pv-glow 7s ease-in-out infinite; }
}
`,
        }}
      />

      <div className="pv-pagelabel">
        <Link href="/designs/popup">← All popup looks</Link>
        <span className="pv-look">Look: Dark Horizon</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card" role="dialog" aria-modal="true" aria-label="Subscribe to The Daily Walk">
          <div className="pv-sky" aria-hidden="true" />
          <svg className="pv-sun" viewBox="0 0 180 180" aria-hidden="true">
            <defs>
              <radialGradient id="pvSunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff4d6" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#E3C074" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#C9A24B" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="90" cy="90" r="90" fill="url(#pvSunGlow)" />
            <circle cx="90" cy="90" r="26" fill="#fff3cf" opacity="0.9" />
          </svg>

          <div className="pv-inner">
            <div className="pv-top">
              <span className="pv-brand">THE DAILY WALK</span>
              <a className="pv-close" href="#" aria-label="Close">×</a>
            </div>

            <div className="pv-stats">DAILY DEVOTIONAL · 2 MIN READ · FREE ALWAYS</div>

            <div className="pv-eyebrow">
              <span className="pv-dot" aria-hidden="true" />
              Free every morning — before the world gets loud.
            </div>

            <h2 className="pv-headline">
              A new morning <span className="pv-accent">with God.</span>
            </h2>

            <p className="pv-sub">
              A short devotional, one honest prayer, and a little encouragement to start your
              day — free, forever.
            </p>

            <div className="pv-verse">
              “This is the day that the Lord has made…”
              <span className="pv-ref">— Psalm 118:24 · 6:30 AM PT</span>
            </div>

            <div className="pv-form">
              <input
                className="pv-input"
                type="email"
                placeholder="you@email.com"
                aria-label="Email address"
              />
              <button className="pv-btn" type="button">Join free →</button>
            </div>

            <ul className="pv-benefits">
              <li><span className="pv-emoji" aria-hidden="true">📖</span> A 2-minute devotional each morning</li>
              <li><span className="pv-emoji" aria-hidden="true">🙏</span> One honest prayer</li>
              <li><span className="pv-emoji" aria-hidden="true">✨</span> Encouragement &amp; good news</li>
            </ul>

            <div className="pv-footer">
              <div className="pv-fine">Free forever · No spam · Unsubscribe anytime</div>
              <a className="pv-founding" href="#">Become a Founding Member →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
