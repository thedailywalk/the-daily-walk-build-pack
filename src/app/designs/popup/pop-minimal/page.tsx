import Link from "next/link";

export const metadata = { title: "Popup — Minimal", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pv-min">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-min {
  --navy: #1F3A5F;
  --gold: #C9A24B;
  --gold-dark: #B8902E;
  --ink: #2B2B2B;
  --serif: Georgia, "Times New Roman", serif;
  --sans: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  font-family: var(--sans);
  color: var(--ink);
  min-height: 100vh;
}
.pv-min .pv-nav {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}
.pv-min .pv-nav a {
  color: var(--navy);
  text-decoration: none;
  background: #fff;
  border: 1px solid rgba(31,58,95,0.15);
  padding: 7px 12px;
  border-radius: 999px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.pv-min .pv-nav a:hover { border-color: var(--gold); }
.pv-min .pv-label {
  color: #6b6b6b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 11px;
}
.pv-min .pv-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20,30,45,0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 10;
}
.pv-min .pv-card {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(15,25,40,0.30);
  padding: 44px 40px 32px;
  text-align: center;
}
.pv-min .pv-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.pv-min .pv-brand {
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--navy);
  font-weight: 600;
}
.pv-min .pv-close {
  font-size: 22px;
  line-height: 1;
  color: #b7b7b7;
  cursor: default;
  user-select: none;
}
.pv-min .pv-head {
  font-family: var(--serif);
  font-weight: 400;
  color: var(--navy);
  font-size: 32px;
  line-height: 1.15;
  margin: 0 0 16px;
  letter-spacing: -0.01em;
}
.pv-min .pv-sub {
  font-size: 15px;
  line-height: 1.55;
  color: #555;
  margin: 0 auto 24px;
  max-width: 320px;
}
.pv-min .pv-divider {
  width: 48px;
  height: 1px;
  background: var(--gold);
  margin: 0 auto 26px;
  border: 0;
}
.pv-min .pv-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto 18px;
  max-width: 320px;
}
.pv-min .pv-input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 15px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 15px;
  color: var(--ink);
  font-family: var(--sans);
  background: #fff;
}
.pv-min .pv-input::placeholder { color: #aaa; }
.pv-min .pv-btn {
  width: 100%;
  padding: 13px 16px;
  border: 0;
  border-radius: 10px;
  background: var(--gold);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: default;
  box-shadow: 0 4px 14px rgba(184,144,46,0.30);
}
.pv-min .pv-btn:hover { background: var(--gold-dark); }
.pv-min .pv-benefits {
  font-size: 12.5px;
  color: #777;
  margin: 0 auto 22px;
  max-width: 320px;
}
.pv-min .pv-foot {
  font-size: 11.5px;
  color: #9a9a9a;
  margin: 0 0 14px;
}
.pv-min .pv-deeper {
  font-size: 12.5px;
  color: var(--navy);
  text-decoration: none;
  border-bottom: 1px solid rgba(201,162,75,0.5);
  padding-bottom: 1px;
}
.pv-min .pv-deeper:hover { color: var(--gold-dark); border-color: var(--gold-dark); }
@media (max-width: 460px) {
  .pv-min .pv-card { padding: 36px 26px 28px; }
  .pv-min .pv-head { font-size: 27px; }
}
@media (prefers-reduced-motion: no-preference) {
  @keyframes pvFade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pvPop {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .pv-min .pv-backdrop { animation: pvFade 0.4s ease both; }
  .pv-min .pv-card { animation: pvPop 0.5s cubic-bezier(0.16,0.84,0.44,1) both; }
}
`,
        }}
      />

      <div className="pv-nav">
        <Link href="/designs/popup">← All popup looks</Link>
        <span className="pv-label">Look: Minimal</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card">
          <div className="pv-top">
            <span className="pv-brand">THE DAILY WALK</span>
            <span className="pv-close" aria-hidden="true">×</span>
          </div>

          <h1 className="pv-head">Begin tomorrow with God.</h1>
          <p className="pv-sub">
            A short devotional and an honest prayer, every morning. Free, forever.
          </p>

          <hr className="pv-divider" />

          <div className="pv-form">
            <input
              className="pv-input"
              type="email"
              placeholder="your@email.com"
              readOnly
            />
            <button className="pv-btn" type="button">Join free →</button>
          </div>

          <p className="pv-benefits">
            Devotional · Prayer · Encouragement — 2 minutes, 5 AM ET
          </p>

          <p className="pv-foot">Free forever · No spam · Unsubscribe anytime</p>

          <Link href="#" className="pv-deeper">Go deeper → Founding Member</Link>
        </div>
      </div>
    </div>
  );
}
