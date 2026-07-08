import Link from "next/link";

export const metadata = { title: "Popup — Dark Halo", robots: { index: false } };
export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="pv-halo">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-halo *{box-sizing:border-box;margin:0;padding:0;}
.pv-halo{
  --navy:#1F3A5F;
  --navy-deep:#0b1424;
  --gold:#E3C074;
  --gold-deep:#C9A24B;
  --ink:#22262B;
  --cream:#FAF6EE;
  min-height:100vh;
  background:radial-gradient(circle at 50% 0%, #16243b 0%, #0b1424 55%, #060c18 100%);
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  color:#e9eef6;
  position:relative;
}
.pv-halo a{color:inherit;text-decoration:none;}

.pv-halo .pv-topbar{
  position:fixed;top:0;left:0;right:0;z-index:40;
  display:flex;align-items:center;gap:14px;
  padding:14px 18px;
  font-size:13px;color:#aebbcf;
}
.pv-halo .pv-back{color:var(--gold);font-weight:600;}
.pv-halo .pv-back:hover{text-decoration:underline;}
.pv-halo .pv-look{
  padding:4px 10px;border:1px solid rgba(227,192,116,.35);border-radius:999px;
  color:var(--gold);font-size:12px;letter-spacing:.04em;
}

/* dimmed backdrop */
.pv-halo .pv-backdrop{
  position:fixed;inset:0;z-index:10;
  background:rgba(4,8,16,.72);
  backdrop-filter:blur(2px);
  display:flex;align-items:center;justify-content:center;
  padding:64px 18px 32px;
  overflow:auto;
}

/* card */
.pv-halo .pv-card{
  position:relative;z-index:1;
  width:100%;max-width:520px;
  max-height:calc(100vh - 88px);
  overflow:auto;
  background:linear-gradient(180deg,#101d31 0%,#0a1322 100%);
  border:1px solid rgba(227,192,116,.22);
  border-radius:22px;
  box-shadow:0 30px 80px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04);
  padding:30px 28px 26px;
  animation:pv-pop .5s cubic-bezier(.2,.8,.25,1) both;
}

/* halo glow behind brand + headline */
.pv-halo .pv-halo-glow{
  position:absolute;z-index:0;pointer-events:none;
  top:-40px;left:50%;transform:translateX(-50%);
  width:360px;height:360px;
  background:radial-gradient(circle at 50% 40%,
    rgba(227,192,116,.55) 0%,
    rgba(227,192,116,.28) 26%,
    rgba(201,162,75,.12) 46%,
    rgba(11,20,36,0) 70%);
  filter:blur(2px);
}
.pv-halo .pv-stars{position:absolute;z-index:0;inset:0;pointer-events:none;opacity:.5;}

.pv-halo .pv-inner{position:relative;z-index:2;}

.pv-halo .pv-head{
  display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;
}
.pv-halo .pv-brand{
  font-size:13px;letter-spacing:.22em;font-weight:700;color:var(--gold);
}
.pv-halo .pv-close{
  width:30px;height:30px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  border:1px solid rgba(255,255,255,.14);
  color:#cdd7e6;font-size:18px;line-height:1;background:transparent;
}

.pv-halo .pv-stats{
  display:flex;justify-content:center;gap:8px;flex-wrap:wrap;
  font-size:10.5px;letter-spacing:.12em;color:#9fb0c8;
  text-transform:uppercase;margin-bottom:22px;
}
.pv-halo .pv-stats span{white-space:nowrap;}
.pv-halo .pv-stats em{color:rgba(227,192,116,.6);font-style:normal;}

.pv-halo .pv-eyebrow{
  display:flex;align-items:center;justify-content:center;gap:8px;
  font-size:12.5px;color:#cdd7e6;margin-bottom:14px;text-align:center;
}
.pv-halo .pv-dot{
  width:7px;height:7px;border-radius:50%;
  background:var(--gold);box-shadow:0 0 10px rgba(227,192,116,.9);flex:0 0 auto;
}

.pv-halo .pv-h1{
  font-family:"Instrument Serif","Playfair Display",Georgia,serif;
  font-size:38px;line-height:1.08;text-align:center;
  font-weight:500;color:#fff;margin-bottom:14px;
}
.pv-halo .pv-h1 .accent{color:var(--gold);}

.pv-halo .pv-sub{
  text-align:center;font-size:14.5px;line-height:1.6;
  color:#b9c5d8;margin-bottom:20px;
}

.pv-halo .pv-verse{
  background:rgba(7,13,24,.6);
  border:1px solid rgba(227,192,116,.3);
  border-radius:14px;padding:14px 16px;margin-bottom:20px;
  text-align:center;
}
.pv-halo .pv-verse p{
  font-family:"Instrument Serif",Georgia,serif;
  font-size:15px;line-height:1.5;color:#e9eef6;font-style:italic;
}
.pv-halo .pv-verse small{
  display:block;margin-top:8px;font-size:11px;letter-spacing:.06em;
  color:var(--gold);font-style:normal;
}

.pv-halo .pv-form{display:flex;gap:8px;margin-bottom:20px;}
.pv-halo .pv-form input{
  flex:1;min-width:0;
  padding:13px 14px;border-radius:11px;
  border:1px solid rgba(255,255,255,.16);
  background:rgba(255,255,255,.04);color:#fff;font-size:14px;
}
.pv-halo .pv-form input::placeholder{color:#8493a8;}
.pv-halo .pv-btn{
  flex:0 0 auto;
  padding:13px 18px;border-radius:11px;border:none;cursor:pointer;
  background:linear-gradient(180deg,var(--gold) 0%,var(--gold-deep) 100%);
  color:#1a1306;font-weight:700;font-size:14px;white-space:nowrap;
  box-shadow:0 6px 18px rgba(227,192,116,.3);
}

.pv-halo .pv-benefits{list-style:none;margin-bottom:20px;}
.pv-halo .pv-benefits li{
  display:flex;align-items:center;gap:10px;
  font-size:13.5px;color:#c6d1e2;padding:7px 0;
  border-top:1px solid rgba(255,255,255,.06);
}
.pv-halo .pv-benefits li:first-child{border-top:none;}
.pv-halo .pv-benefits .ic{font-size:16px;flex:0 0 auto;}

.pv-halo .pv-foot{
  text-align:center;font-size:11.5px;color:#8493a8;
}
.pv-halo .pv-foot .founding{
  display:inline-block;margin-top:10px;color:var(--gold);font-weight:600;
}
.pv-halo .pv-foot .founding:hover{text-decoration:underline;}

@keyframes pv-pop{
  0%{opacity:0;transform:translateY(14px) scale(.96);}
  100%{opacity:1;transform:translateY(0) scale(1);}
}
@keyframes pv-breathe{
  0%,100%{opacity:.85;transform:translateX(-50%) scale(1);}
  50%{opacity:1;transform:translateX(-50%) scale(1.08);}
}
@media (prefers-reduced-motion: no-preference){
  .pv-halo .pv-halo-glow{animation:pv-breathe 6s ease-in-out infinite;}
}
@media (prefers-reduced-motion: reduce){
  .pv-halo .pv-card{animation:none;}
}

@media (max-width:480px){
  .pv-halo .pv-card{padding:26px 20px 22px;border-radius:18px;}
  .pv-halo .pv-h1{font-size:32px;}
  .pv-halo .pv-form{flex-direction:column;}
  .pv-halo .pv-btn{width:100%;}
}
`,
        }}
      />

      <div className="pv-topbar">
        <Link href="/designs/popup" className="pv-back">
          ← All popup looks
        </Link>
        <span className="pv-look">Look: Dark Halo</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card">
          <div className="pv-halo-glow" aria-hidden="true" />
          <svg
            className="pv-stars"
            aria-hidden="true"
            viewBox="0 0 440 440"
            preserveAspectRatio="xMidYMid slice"
          >
            <g fill="#E3C074">
              <circle cx="48" cy="60" r="1.1" opacity=".7" />
              <circle cx="380" cy="44" r="1.4" opacity=".6" />
              <circle cx="410" cy="120" r="1" opacity=".5" />
              <circle cx="30" cy="150" r="1.2" opacity=".55" />
              <circle cx="220" cy="22" r="1" opacity=".5" />
              <circle cx="120" cy="34" r="0.9" opacity=".45" />
              <circle cx="320" cy="90" r="1.1" opacity=".5" />
            </g>
          </svg>

          <div className="pv-inner">
            <div className="pv-head">
              <span className="pv-brand">THE DAILY WALK</span>
              <span className="pv-close" aria-hidden="true">
                ×
              </span>
            </div>

            <div className="pv-stats">
              <span>DAILY DEVOTIONAL</span>
              <em>·</em>
              <span>2 MIN READ</span>
              <em>·</em>
              <span>FREE ALWAYS</span>
            </div>

            <div className="pv-eyebrow">
              <span className="pv-dot" />
              Free every morning — before the world gets loud.
            </div>

            <h1 className="pv-h1">
              A new morning <span className="accent">with God.</span>
            </h1>

            <p className="pv-sub">
              A short devotional, one honest prayer, and a little encouragement
              to start your day — free, forever.
            </p>

            <div className="pv-verse">
              <p>“This is the day that the Lord has made…”</p>
              <small>— Psalm 118:24 · 5 AM ET</small>
            </div>

            <div className="pv-form">
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <button type="button" className="pv-btn">
                Join free →
              </button>
            </div>

            <ul className="pv-benefits">
              <li>
                <span className="ic">📖</span> A 2-minute devotional each morning
              </li>
              <li>
                <span className="ic">🙏</span> One honest prayer
              </li>
              <li>
                <span className="ic">✨</span> Encouragement &amp; good news
              </li>
            </ul>

            <div className="pv-foot">
              Free forever · No spam · Unsubscribe anytime
              <br />
              <Link href="/designs/popup" className="founding">
                Become a Founding Member →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
