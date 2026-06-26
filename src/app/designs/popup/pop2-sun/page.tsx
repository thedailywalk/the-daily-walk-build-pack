import Link from "next/link";

export const metadata = { title: "Popup — Dark Sun-crest", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pv-sun2">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-sun2 {
  --navy: #1F3A5F;
  --navy-deep: #0b1424;
  --navy-card: #10203a;
  --gold: #E3C074;
  --gold-2: #C9A24B;
  --cream: #FAF6EE;
  --ink: #22262B;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #EAF0F8;
}
.pv-sun2 * { box-sizing: border-box; }

.pv-sun2 .pv-toplabel {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 60;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  font-size: 13px;
}
.pv-sun2 .pv-toplabel a {
  color: var(--navy);
  background: var(--cream);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,.25);
}
.pv-sun2 .pv-toplabel a:hover { background: #fff; }
.pv-sun2 .pv-toplabel .pv-look {
  color: #EAF0F8;
  background: rgba(11,20,36,.7);
  border: 1px solid rgba(227,192,116,.4);
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: .02em;
}

.pv-sun2 .pv-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: auto;
  background:
    radial-gradient(120% 90% at 50% 0%, rgba(31,58,95,.55), transparent 60%),
    rgba(4,8,16,.78);
  backdrop-filter: blur(3px);
}

.pv-sun2 .pv-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: var(--navy-card);
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(227,192,116,.22);
  box-shadow: 0 30px 70px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.03) inset;
  color: #EAF0F8;
}

.pv-sun2 .pv-suncrest {
  position: relative;
  height: 168px;
  overflow: hidden;
}
.pv-sun2 .pv-suncrest svg { display: block; width: 100%; height: 100%; }

.pv-sun2 .pv-header {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 0;
}
.pv-sun2 .pv-brand {
  font-family: Georgia, "Playfair Display", "Instrument Serif", serif;
  font-weight: 700;
  letter-spacing: .14em;
  font-size: 13px;
  color: var(--gold);
  text-transform: uppercase;
  text-shadow: 0 1px 6px rgba(0,0,0,.5);
}
.pv-sun2 .pv-close {
  width: 30px; height: 30px;
  border-radius: 999px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(11,20,36,.55);
  border: 1px solid rgba(227,192,116,.35);
  color: #EAF0F8;
  font-size: 18px;
  line-height: 1;
  text-decoration: none;
  cursor: default;
}

.pv-sun2 .pv-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 12px 18px 14px;
  font-size: 10.5px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #B9C6DA;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.pv-sun2 .pv-stats b { color: var(--gold); font-weight: 800; }
.pv-sun2 .pv-stats .pv-sep { color: rgba(227,192,116,.5); }

.pv-sun2 .pv-body { padding: 18px 22px 22px; }

.pv-sun2 .pv-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #D7C9A6;
  margin: 0 0 12px;
}
.pv-sun2 .pv-dot {
  width: 8px; height: 8px;
  border-radius: 999px;
  background: var(--gold);
  box-shadow: 0 0 8px rgba(227,192,116,.8);
}

.pv-sun2 .pv-headline {
  font-family: Georgia, "Playfair Display", "Instrument Serif", serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.12;
  margin: 0 0 10px;
  color: #F4F7FC;
}
.pv-sun2 .pv-headline .pv-gold { color: var(--gold); }

.pv-sun2 .pv-sub {
  font-size: 14.5px;
  line-height: 1.55;
  color: #C2CEDF;
  margin: 0 0 16px;
}

.pv-sun2 .pv-verse {
  background: linear-gradient(180deg, rgba(11,20,36,.9), rgba(31,58,95,.35));
  border: 1px solid rgba(227,192,116,.4);
  border-radius: 14px;
  padding: 14px 16px;
  margin: 0 0 18px;
}
.pv-sun2 .pv-verse p {
  margin: 0;
  font-family: Georgia, serif;
  font-style: italic;
  font-size: 14px;
  line-height: 1.5;
  color: #EDE2C6;
}
.pv-sun2 .pv-verse .pv-cite {
  display: block;
  margin-top: 8px;
  font-style: normal;
  font-size: 11.5px;
  letter-spacing: .04em;
  color: var(--gold);
}

.pv-sun2 .pv-form {
  display: flex;
  gap: 8px;
  margin: 0 0 18px;
}
.pv-sun2 .pv-input {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border-radius: 11px;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.04);
  color: #EAF0F8;
  font-size: 14px;
}
.pv-sun2 .pv-input::placeholder { color: #8593A8; }
.pv-sun2 .pv-btn {
  border: none;
  border-radius: 11px;
  padding: 12px 18px;
  font-weight: 800;
  font-size: 14px;
  white-space: nowrap;
  color: #2a1f06;
  background: linear-gradient(180deg, var(--gold), var(--gold-2));
  box-shadow: 0 6px 18px rgba(227,192,116,.3);
  cursor: default;
}

.pv-sun2 .pv-benefits {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: grid;
  gap: 10px;
}
.pv-sun2 .pv-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: #CDD8E8;
}
.pv-sun2 .pv-benefits .pv-emoji {
  font-size: 16px;
  width: 22px;
  text-align: center;
}

.pv-sun2 .pv-footer {
  text-align: center;
  border-top: 1px solid rgba(255,255,255,.07);
  padding-top: 14px;
}
.pv-sun2 .pv-footer .pv-fine {
  margin: 0 0 8px;
  font-size: 11.5px;
  color: #8C9AAE;
  letter-spacing: .02em;
}
.pv-sun2 .pv-founding {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--gold);
  text-decoration: none;
  cursor: default;
}
.pv-sun2 .pv-founding:hover { text-decoration: underline; }

@media (prefers-reduced-motion: no-preference) {
  .pv-sun2 .pv-card {
    animation: pv-sun2-pop .45s cubic-bezier(.2,.8,.25,1) both;
  }
  @keyframes pv-sun2-pop {
    from { opacity: 0; transform: translateY(14px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .pv-sun2 .pv-rays {
    transform-origin: 250px 168px;
    animation: pv-sun2-shimmer 9s ease-in-out infinite;
  }
  @keyframes pv-sun2-shimmer {
    0%, 100% { opacity: .55; }
    50%      { opacity: .9; }
  }
  .pv-sun2 .pv-suncore {
    animation: pv-sun2-glow 6s ease-in-out infinite;
  }
  @keyframes pv-sun2-glow {
    0%, 100% { opacity: .9; }
    50%      { opacity: 1; }
  }
}

@media (max-width: 480px) {
  .pv-sun2 .pv-headline { font-size: 26px; }
  .pv-sun2 .pv-form { flex-direction: column; }
  .pv-sun2 .pv-btn { width: 100%; }
}
`,
        }}
      />

      <div className="pv-toplabel">
        <Link href="/designs/popup">&larr; All popup looks</Link>
        <span className="pv-look">Look: Dark Sun-crest</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card" role="dialog" aria-modal="true" aria-label="Join The Daily Walk">
          <div className="pv-suncrest">
            <svg viewBox="0 0 500 168" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
              <defs>
                <linearGradient id="pv-sun2-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0b1424" />
                  <stop offset="55%" stopColor="#13243f" />
                  <stop offset="100%" stopColor="#1F3A5F" />
                </linearGradient>
                <radialGradient id="pv-sun2-core" cx="50%" cy="100%" r="75%">
                  <stop offset="0%" stopColor="#FBEFC9" />
                  <stop offset="35%" stopColor="#E3C074" />
                  <stop offset="70%" stopColor="#C9A24B" />
                  <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="pv-sun2-ray" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#E3C074" stopOpacity=".9" />
                  <stop offset="100%" stopColor="#E3C074" stopOpacity="0" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="500" height="168" fill="url(#pv-sun2-sky)" />

              <g className="pv-rays" fill="url(#pv-sun2-ray)">
                <polygon points="250,168 232,30 268,30" />
                <polygon points="250,168 190,52 222,44" />
                <polygon points="250,168 310,52 278,44" />
                <polygon points="250,168 140,86 176,72" />
                <polygon points="250,168 360,86 324,72" />
                <polygon points="250,168 96,120 132,104" />
                <polygon points="250,168 404,120 368,104" />
              </g>

              <ellipse className="pv-suncore" cx="250" cy="170" rx="150" ry="120" fill="url(#pv-sun2-core)" />
              <circle className="pv-suncore" cx="250" cy="178" r="58" fill="#FBEFC9" opacity=".95" />

              <path d="M0,150 Q250,138 500,150 L500,168 L0,168 Z" fill="#0b1424" opacity=".85" />
            </svg>

            <div className="pv-header">
              <span className="pv-brand">The Daily Walk</span>
              <a className="pv-close" aria-label="Close" role="button">&times;</a>
            </div>
          </div>

          <div className="pv-stats">
            <span>Daily Devotional</span>
            <span className="pv-sep">&middot;</span>
            <span><b>2 MIN</b> READ</span>
            <span className="pv-sep">&middot;</span>
            <span><b>FREE</b> ALWAYS</span>
          </div>

          <div className="pv-body">
            <p className="pv-eyebrow">
              <span className="pv-dot" />
              Free every morning &mdash; before the world gets loud.
            </p>

            <h2 className="pv-headline">
              A new morning <span className="pv-gold">with God.</span>
            </h2>

            <p className="pv-sub">
              A short devotional, one honest prayer, and a little encouragement to start your
              day &mdash; free, forever.
            </p>

            <div className="pv-verse">
              <p>
                &ldquo;This is the day that the Lord has made&hellip;&rdquo;
                <span className="pv-cite">&mdash; Psalm 118:24 &middot; 6:30 AM PT</span>
              </p>
            </div>

            <div className="pv-form">
              <input className="pv-input" type="email" placeholder="your@email.com" readOnly />
              <button className="pv-btn" type="button">Join free &rarr;</button>
            </div>

            <ul className="pv-benefits">
              <li><span className="pv-emoji">📖</span> A 2-minute devotional each morning</li>
              <li><span className="pv-emoji">🙏</span> One honest prayer</li>
              <li><span className="pv-emoji">✨</span> Encouragement &amp; good news</li>
            </ul>

            <div className="pv-footer">
              <p className="pv-fine">Free forever &middot; No spam &middot; Unsubscribe anytime</p>
              <a className="pv-founding" role="button">Become a Founding Member &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
