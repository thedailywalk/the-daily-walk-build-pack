import Link from "next/link";

export const metadata = { title: "Popup — Cream Classic", robots: { index: false } };
export const dynamic = "force-static";

export default function PopCreamPage() {
  return (
    <div className="pv-cream">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-cream {
  --navy: #1F3A5F;
  --gold: #C9A24B;
  --gold-dark: #B8902E;
  --cream: #FAF6EE;
  --ink: #2B2B2B;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}
.pv-cream * { box-sizing: border-box; }

.pv-cream .pv-toolbar {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}
.pv-cream .pv-toolbar a {
  color: var(--navy);
  background: #fff;
  border: 1px solid rgba(31,58,95,0.18);
  border-radius: 999px;
  padding: 6px 12px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: fit-content;
}
.pv-cream .pv-toolbar a:hover { background: var(--cream); }
.pv-cream .pv-label {
  color: #4a4f57;
  font-size: 12px;
  letter-spacing: 0.04em;
  padding-left: 4px;
}

.pv-cream .pv-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(20,30,45,0.62);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: auto;
}

.pv-cream .pv-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: var(--cream);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(0,0,0,0.42), 0 2px 0 rgba(255,255,255,0.5) inset;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.pv-cream .pv-header {
  background: var(--navy);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
}
.pv-cream .pv-brand {
  font-family: "Instrument Serif", "Playfair Display", Georgia, serif;
  font-size: 17px;
  letter-spacing: 0.18em;
  font-weight: 600;
}
.pv-cream .pv-close {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.25);
  background: transparent;
  color: #fff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pv-cream .pv-close:hover { background: rgba(255,255,255,0.12); }

.pv-cream .pv-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(31,58,95,0.05);
  border-bottom: 1px solid rgba(31,58,95,0.08);
  padding: 9px 16px;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5a5f66;
}
.pv-cream .pv-stats b { color: var(--gold-dark); font-weight: 800; }
.pv-cream .pv-stats .pv-dot { color: var(--gold); }

.pv-cream .pv-body { padding: 22px 26px 26px; }

.pv-cream .pv-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 12px;
}
.pv-cream .pv-greendot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #3aaa5e;
  box-shadow: 0 0 0 3px rgba(58,170,94,0.18);
}

.pv-cream .pv-headline {
  font-family: "Instrument Serif", "Playfair Display", Georgia, serif;
  font-size: 30px;
  line-height: 1.18;
  font-weight: 600;
  color: var(--navy);
  margin: 0 0 12px;
}
.pv-cream .pv-headline .pv-gold { color: var(--gold-dark); }

.pv-cream .pv-sub {
  font-size: 15px;
  line-height: 1.55;
  color: #4a4f57;
  margin: 0 0 18px;
}

.pv-cream .pv-verse {
  background: #fff;
  border-left: 4px solid var(--gold);
  border-radius: 8px;
  padding: 13px 16px;
  margin: 0 0 20px;
  box-shadow: 0 1px 0 rgba(31,58,95,0.06);
}
.pv-cream .pv-verse .pv-quote {
  font-family: "Instrument Serif", "Playfair Display", Georgia, serif;
  font-style: italic;
  font-size: 16px;
  color: var(--navy);
  line-height: 1.45;
}
.pv-cream .pv-verse .pv-ref {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #7a7f86;
}

.pv-cream .pv-form { display: flex; gap: 9px; margin-bottom: 18px; }
.pv-cream .pv-input {
  flex: 1;
  min-width: 0;
  border: 1px solid rgba(31,58,95,0.22);
  background: #fff;
  border-radius: 9px;
  padding: 12px 14px;
  font-size: 14px;
  color: var(--ink);
}
.pv-cream .pv-input::placeholder { color: #9aa0a8; }
.pv-cream .pv-btn {
  border: none;
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-dark) 100%);
  color: #2a2208;
  font-weight: 800;
  font-size: 14px;
  border-radius: 9px;
  padding: 12px 18px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(184,144,46,0.35);
}
.pv-cream .pv-btn:hover { filter: brightness(1.04); }

.pv-cream .pv-benefits { list-style: none; margin: 0 0 20px; padding: 0; }
.pv-cream .pv-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #3f444b;
  padding: 6px 0;
  border-bottom: 1px dashed rgba(31,58,95,0.08);
}
.pv-cream .pv-benefits li:last-child { border-bottom: none; }
.pv-cream .pv-benefits .pv-ico { font-size: 17px; line-height: 1; }

.pv-cream .pv-footer {
  text-align: center;
  font-size: 11px;
  color: #8a8f96;
  letter-spacing: 0.02em;
  margin-bottom: 12px;
}

.pv-cream .pv-founding {
  display: block;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--navy);
  text-decoration: none;
  border-top: 1px solid rgba(31,58,95,0.1);
  padding-top: 14px;
}
.pv-cream .pv-founding:hover { color: var(--gold-dark); }

@media (max-width: 420px) {
  .pv-cream .pv-form { flex-direction: column; }
  .pv-cream .pv-headline { font-size: 26px; }
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes pv-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pv-pop {
    from { opacity: 0; transform: translateY(14px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .pv-cream .pv-backdrop { animation: pv-fade 0.3s ease both; }
  .pv-cream .pv-card { animation: pv-pop 0.42s cubic-bezier(0.22, 1, 0.36, 1) both; }
}
`,
        }}
      />

      <div className="pv-toolbar">
        <Link href="/designs/popup">← All popup looks</Link>
        <span className="pv-label">Look: Cream Classic</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card" role="dialog" aria-modal="true" aria-label="Subscribe to The Daily Walk">
          <div className="pv-header">
            <span className="pv-brand">THE DAILY WALK</span>
            <button className="pv-close" type="button" aria-label="Close">×</button>
          </div>

          <div className="pv-stats">
            <span>Daily Devotional</span>
            <span className="pv-dot">·</span>
            <span><b>2 min</b> read</span>
            <span className="pv-dot">·</span>
            <span><b>Free</b> always</span>
          </div>

          <div className="pv-body">
            <span className="pv-eyebrow">
              <span className="pv-greendot" aria-hidden="true" />
              Free every morning — before the world gets loud.
            </span>

            <h2 className="pv-headline">
              A few quiet minutes with God. <span className="pv-gold">Every morning.</span>
            </h2>

            <p className="pv-sub">
              A short devotional, one honest prayer, and a little encouragement to start your day — no
              noise, no guilt, just the walk.
            </p>

            <div className="pv-verse">
              <span className="pv-quote">“This is the day that the Lord has made…”</span>
              <span className="pv-ref">— Psalm 118:24 · lands at 6:30 AM PT</span>
            </div>

            <div className="pv-form">
              <input className="pv-input" type="email" placeholder="your@email.com" aria-label="Email address" />
              <button className="pv-btn" type="button">Join free →</button>
            </div>

            <ul className="pv-benefits">
              <li><span className="pv-ico" aria-hidden="true">📖</span> A 2-minute devotional each morning</li>
              <li><span className="pv-ico" aria-hidden="true">🙏</span> One honest prayer</li>
              <li><span className="pv-ico" aria-hidden="true">✨</span> Encouragement &amp; good news</li>
            </ul>

            <p className="pv-footer">Free forever · No spam · Unsubscribe anytime</p>

            <a className="pv-founding" href="#">Become a Founding Member →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
