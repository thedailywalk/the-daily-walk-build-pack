import Link from "next/link";

export const metadata = { title: "Popup — Dark", robots: { index: false } };
export const dynamic = "force-static";

export default function PopDarkPage() {
  return (
    <div className="pv-dark">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.pv-dark { --navy-0:#0e1626; --navy-1:#16263f; --gold:#E3C074; --gold-2:#C9A24B; --ink-soft:#aebbcf; --line:rgba(227,192,116,.22); min-height:100vh; margin:0; font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:#fff; }
.pv-dark *, .pv-dark *::before, .pv-dark *::after { box-sizing:border-box; }

.pv-dark .pv-toolbar { position:fixed; top:16px; left:16px; z-index:60; display:flex; flex-direction:column; gap:6px; font-size:13px; }
.pv-dark .pv-toolbar a { color:var(--gold); text-decoration:none; background:rgba(14,22,38,.85); border:1px solid var(--line); padding:6px 12px; border-radius:999px; backdrop-filter:blur(4px); }
.pv-dark .pv-toolbar a:hover { background:rgba(22,38,63,.95); }
.pv-dark .pv-toolbar .pv-label { color:var(--ink-soft); background:rgba(14,22,38,.6); border:1px solid rgba(255,255,255,.08); padding:5px 12px; border-radius:999px; font-size:12px; letter-spacing:.04em; }

.pv-dark .pv-backdrop { position:fixed; inset:0; z-index:40; display:flex; align-items:center; justify-content:center; padding:24px; overflow:auto; background:radial-gradient(1200px 700px at 50% 20%, rgba(31,58,95,.55), rgba(6,10,18,.88) 70%), rgba(4,7,13,.82); }

.pv-dark .pv-card { position:relative; width:100%; max-width:440px; max-height:calc(100vh - 48px); overflow:auto; border-radius:22px; padding:30px 28px 26px; background:linear-gradient(165deg,#0e1626 0%,#16263f 100%); border:1px solid var(--line); box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.03) inset, 0 0 40px rgba(227,192,116,.06); animation:pv-pop .5s cubic-bezier(.16,1,.3,1) both; }
.pv-dark .pv-card::before { content:""; position:absolute; inset:0; border-radius:22px; pointer-events:none; background-image:radial-gradient(1.4px 1.4px at 12% 18%, rgba(227,192,116,.7), transparent), radial-gradient(1.2px 1.2px at 78% 12%, rgba(255,255,255,.55), transparent), radial-gradient(1.3px 1.3px at 30% 42%, rgba(227,192,116,.45), transparent), radial-gradient(1.1px 1.1px at 88% 60%, rgba(255,255,255,.4), transparent), radial-gradient(1.5px 1.5px at 55% 80%, rgba(227,192,116,.5), transparent), radial-gradient(1px 1px at 18% 88%, rgba(255,255,255,.4), transparent); opacity:.5; }

.pv-dark .pv-content { position:relative; z-index:1; }

.pv-dark .pv-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
.pv-dark .pv-brand { color:var(--gold); font-weight:700; font-size:13px; letter-spacing:.22em; }
.pv-dark .pv-close { color:var(--ink-soft); background:transparent; border:1px solid rgba(255,255,255,.12); width:30px; height:30px; border-radius:50%; font-size:18px; line-height:1; display:flex; align-items:center; justify-content:center; cursor:pointer; }
.pv-dark .pv-close:hover { color:#fff; border-color:var(--gold); }

.pv-dark .pv-stats { display:flex; flex-wrap:wrap; gap:6px 10px; color:var(--gold-2); font-weight:700; font-size:11px; letter-spacing:.08em; margin-bottom:18px; }
.pv-dark .pv-stats span { display:inline-flex; align-items:center; gap:8px; }
.pv-dark .pv-stats .pv-dot { color:rgba(227,192,116,.4); }

.pv-dark .pv-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:12px; color:var(--ink-soft); margin-bottom:12px; }
.pv-dark .pv-glow { width:8px; height:8px; border-radius:50%; background:var(--gold); box-shadow:0 0 8px 2px rgba(227,192,116,.7); animation:pv-glow 2.4s ease-in-out infinite; }

.pv-dark .pv-headline { font-family:"Instrument Serif",Georgia,"Playfair Display",serif; font-weight:600; font-size:30px; line-height:1.18; margin:0 0 12px; color:#fff; }
.pv-dark .pv-headline .pv-au { color:var(--gold); }

.pv-dark .pv-sub { color:var(--ink-soft); font-size:14.5px; line-height:1.6; margin:0 0 18px; }

.pv-dark .pv-verse { border:1px solid var(--line); background:linear-gradient(90deg,rgba(227,192,116,.08),rgba(227,192,116,.02)); border-left:3px solid var(--gold); border-radius:10px; padding:12px 14px; font-family:"Instrument Serif",Georgia,serif; font-style:italic; color:#e8eefb; font-size:14px; margin-bottom:20px; }
.pv-dark .pv-verse cite { display:block; font-style:normal; font-family:Inter,sans-serif; color:var(--gold-2); font-size:11.5px; letter-spacing:.04em; margin-top:6px; }

.pv-dark .pv-form { display:flex; flex-direction:column; gap:10px; margin-bottom:20px; }
.pv-dark .pv-input { width:100%; padding:13px 15px; border-radius:11px; border:1px solid rgba(255,255,255,.14); background:rgba(6,11,20,.7); color:#fff; font-size:14px; }
.pv-dark .pv-input::placeholder { color:#6c7c93; }
.pv-dark .pv-input:focus { outline:none; border-color:var(--gold); box-shadow:0 0 0 3px rgba(227,192,116,.18); }
.pv-dark .pv-btn { width:100%; padding:13px 16px; border-radius:11px; border:none; cursor:pointer; font-weight:700; font-size:14.5px; color:#16263f; background:linear-gradient(180deg,#E3C074,#C9A24B); box-shadow:0 8px 24px rgba(227,192,116,.25); }
.pv-dark .pv-btn:hover { filter:brightness(1.05); }

.pv-dark .pv-benefits { list-style:none; padding:0; margin:0 0 18px; display:flex; flex-direction:column; gap:9px; }
.pv-dark .pv-benefits li { display:flex; align-items:center; gap:10px; font-size:13.5px; color:#d8e0ee; }
.pv-dark .pv-benefits .pv-ic { font-size:15px; }

.pv-dark .pv-footer { text-align:center; font-size:11.5px; color:#6c7c93; letter-spacing:.03em; margin-bottom:14px; }

.pv-dark .pv-founding { text-align:center; }
.pv-dark .pv-founding a { color:var(--gold); text-decoration:none; font-size:12.5px; font-weight:600; border-bottom:1px solid rgba(227,192,116,.3); padding-bottom:1px; }
.pv-dark .pv-founding a:hover { border-color:var(--gold); }

@media (max-width:480px){
  .pv-dark .pv-card { padding:24px 20px 22px; }
  .pv-dark .pv-headline { font-size:26px; }
  .pv-dark .pv-toolbar { font-size:12px; }
}

@media (prefers-reduced-motion: no-preference){
  @keyframes pv-pop { from { opacity:0; transform:translateY(14px) scale(.96); } to { opacity:1; transform:none; } }
  @keyframes pv-glow { 0%,100% { opacity:1; box-shadow:0 0 8px 2px rgba(227,192,116,.7); } 50% { opacity:.55; box-shadow:0 0 4px 1px rgba(227,192,116,.4); } }
  @keyframes pv-twinkle { 0%,100% { opacity:.5; } 50% { opacity:.85; } }
  .pv-dark .pv-card::before { animation:pv-twinkle 4s ease-in-out infinite; }
}
`,
        }}
      />

      <div className="pv-toolbar">
        <Link href="/designs/popup">← All popup looks</Link>
        <span className="pv-label">Look: Dark (Inner Circle)</span>
      </div>

      <div className="pv-backdrop">
        <div className="pv-card" role="dialog" aria-label="Welcome to The Daily Walk">
          <div className="pv-content">
            <div className="pv-head">
              <span className="pv-brand">THE DAILY WALK</span>
              <button className="pv-close" aria-label="Close" type="button">×</button>
            </div>

            <div className="pv-stats">
              <span>DAILY DEVOTIONAL</span>
              <span className="pv-dot">·</span>
              <span>2 MIN READ</span>
              <span className="pv-dot">·</span>
              <span>FREE ALWAYS</span>
            </div>

            <span className="pv-eyebrow">
              <span className="pv-glow" aria-hidden="true" />
              Free every morning — before the world gets loud.
            </span>

            <h2 className="pv-headline">
              A few quiet minutes with God. <span className="pv-au">Every morning.</span>
            </h2>

            <p className="pv-sub">
              A short devotional, one honest prayer, and a little encouragement — no noise, no
              guilt, just the walk.
            </p>

            <blockquote className="pv-verse">
              “This is the day that the Lord has made…”
              <cite>— Psalm 118:24</cite>
            </blockquote>

            <form className="pv-form" action="#">
              <input className="pv-input" type="email" placeholder="your@email.com" aria-label="Email address" />
              <button className="pv-btn" type="button">Join free →</button>
            </form>

            <ul className="pv-benefits">
              <li><span className="pv-ic" aria-hidden="true">📖</span> A 2-minute devotional each morning</li>
              <li><span className="pv-ic" aria-hidden="true">🙏</span> One honest prayer</li>
              <li><span className="pv-ic" aria-hidden="true">✨</span> Encouragement &amp; good news</li>
            </ul>

            <p className="pv-footer">Free forever · No spam · Unsubscribe anytime</p>

            <p className="pv-founding">
              <Link href="#">Become a Founding Member →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
