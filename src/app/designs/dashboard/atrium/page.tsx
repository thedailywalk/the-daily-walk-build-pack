import Link from "next/link";

export const dynamic = "force-static";
export const metadata = { title: "Concept · Atrium", robots: { index: false } };

export default function Atrium() {
  return (
    <div className="at">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="at-orbs" aria-hidden="true"><span /><span /><span /></div>
      <Link href="/designs/dashboard" className="at-back">← All concepts</Link>

      <div className="at-shell">
        <aside className="at-side">
          <div className="at-brand"><span className="at-mark">✦</span><b>The Daily Walk</b></div>
          <nav>
            <a className="on">◆ Dashboard</a><a>🧭 My Journey</a><a>✶ Pathlight</a><a>✍ Prayer</a><a>📖 Memory</a><a>🔖 Saved</a><a>💬 Wall</a>
          </nav>
          <div className="at-me"><span className="at-ring">LJ</span><div><b>Lulu</b><small>Patron</small></div></div>
        </aside>

        <main className="at-main">
          <section className="at-hero at-glass">
            <div className="at-hero-row">
              <div>
                <span className="at-kick">Friday, June 26</span>
                <h1>Good morning, Lulu.</h1>
                <p>Take a breath. This is your time with God — no rush, no guilt.</p>
              </div>
              <div className="at-streak"><span className="at-streak-ring"><b>12</b></span><small>day streak</small></div>
            </div>
            <div className="at-metrics">
              <div><b>340</b><span>Walk Score · Sprouting</span></div>
              <div className="at-sep" />
              <div><b>Day 47</b><span>of 365 · 13%</span></div>
              <div className="at-sep" />
              <div><b>Psalm 23:1</b><span>memory verse</span></div>
            </div>
          </section>

          <div className="at-two">
            <section className="at-glass at-dev">
              <span className="at-tag">Today&apos;s Devotional</span>
              <h2>He defeats death and stays with us always</h2>
              <blockquote>“He is not here, for he has risen, just like he said.” <cite>— Matthew 28:6</cite></blockquote>
              <p>The tomb wasn&apos;t a setback; it was the plan. The same power that emptied the grave walks with you into today.</p>
              <a className="at-btn">Read today&apos;s walk →</a>
            </section>
            <div className="at-col">
              <section className="at-glass at-mem">
                <span className="at-tag">📖 Memory verse</span>
                <div className="at-memcard"><b>Psalm 23:1</b><span>tap to reveal</span></div>
              </section>
              <section className="at-glass at-vid">
                <span className="at-tag">▶ This week</span>
                <div className="at-vidthumb">▶</div>
                <b>Finding Peace in the Storm</b><span>The Bible Project</span>
              </section>
            </div>
          </div>

          <section className="at-glass at-wall">
            <span className="at-tag">♥ Encouragement wall</span>
            <div className="at-wrow"><span className="at-av b">MR</span><p><b>Maria</b> — Praying for everyone keeping their streak. 🙌</p></div>
            <div className="at-wrow"><span className="at-av g">DV</span><p><b>David</b> — Grateful for this circle tonight.</p></div>
          </section>
        </main>
      </div>
    </div>
  );
}

const CSS = `
  *{box-sizing:border-box}
  .at{--gold:#E3C074;--ink:#eaf0fb;--mut:#a7b6cf;--glass:rgba(255,255,255,.06);--line:rgba(255,255,255,.12);
    position:relative;min-height:100vh;margin:0;padding:18px;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:var(--ink);
    background:linear-gradient(160deg,#101a2e,#1a2740 55%,#13203a)}
  .at-orbs span{position:absolute;border-radius:50%;filter:blur(70px);opacity:.5}
  .at-orbs span:nth-child(1){width:420px;height:420px;background:#3a6bd6;top:-120px;right:-80px}
  .at-orbs span:nth-child(2){width:360px;height:360px;background:#c9a24b;bottom:-140px;left:-60px;opacity:.35}
  .at-orbs span:nth-child(3){width:300px;height:300px;background:#6a8fd6;top:40%;left:40%;opacity:.25}
  .at a{color:inherit;text-decoration:none}
  .at h1,.at h2{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400}
  .at-back{position:relative;display:inline-block;color:var(--mut);font-size:13px;margin-bottom:14px}.at-back:hover{color:var(--gold)}
  .at-glass{background:var(--glass);border:1px solid var(--line);border-radius:20px;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);box-shadow:0 20px 50px -30px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.08)}
  .at-shell{position:relative;max-width:1160px;margin:0 auto;display:grid;grid-template-columns:236px 1fr;gap:18px;align-items:start}
  .at-side{position:sticky;top:18px;padding:18px 14px;border-radius:20px;background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(20px)}
  .at-brand{display:flex;gap:10px;align-items:center;padding:4px 6px 14px;border-bottom:1px solid var(--line)}
  .at-mark{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#101a2e;background:linear-gradient(150deg,var(--gold),#c9a24b)}
  .at-brand b{font-size:14px}
  .at-side nav{display:flex;flex-direction:column;gap:3px;margin:14px 0}
  .at-side nav a{padding:10px 12px;border-radius:11px;font-size:13.5px;color:var(--mut);transition:.16s}
  .at-side nav a:hover{background:rgba(255,255,255,.06);color:#fff}
  .at-side nav a.on{background:rgba(227,192,116,.16);color:#fff;border:1px solid rgba(227,192,116,.3)}
  .at-me{display:flex;gap:10px;align-items:center;padding-top:14px;border-top:1px solid var(--line)}
  .at-ring{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;color:var(--gold);background:rgba(0,0,0,.3);box-shadow:0 0 0 2px rgba(227,192,116,.5)}
  .at-me b{font-size:13px}.at-me small{display:block;font-size:11px;color:var(--gold)}
  .at-main{display:flex;flex-direction:column;gap:18px;min-width:0}
  .at-hero{padding:28px 30px}
  .at-hero-row{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}
  .at-kick{font-size:11px;letter-spacing:2.4px;color:var(--gold);font-weight:600}
  .at-hero h1{font-size:38px;margin:8px 0 8px}.at-hero p{color:var(--mut);font-size:14.5px;max-width:420px;line-height:1.55}
  .at-streak{text-align:center}
  .at-streak-ring{width:62px;height:62px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--gold) 62%,rgba(255,255,255,.12) 0);position:relative}
  .at-streak-ring:before{content:"";position:absolute;inset:5px;border-radius:50%;background:#15233c}
  .at-streak-ring b{position:relative;font-family:"Instrument Serif",Georgia,serif;font-size:22px;color:var(--gold)}
  .at-streak small{display:block;font-size:10px;letter-spacing:1px;color:var(--mut);text-transform:uppercase;margin-top:5px}
  .at-metrics{display:flex;align-items:center;gap:18px;margin-top:22px;padding-top:18px;border-top:1px solid var(--line);flex-wrap:wrap}
  .at-metrics b{font-family:"Instrument Serif",Georgia,serif;font-size:22px;color:#fff;display:block}
  .at-metrics span{font-size:12px;color:var(--mut)}
  .at-sep{width:1px;align-self:stretch;background:var(--line)}
  .at-two{display:grid;grid-template-columns:1.4fr 1fr;gap:18px;align-items:start}
  .at-tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:700}
  .at-dev{padding:24px}
  .at-dev h2{font-size:26px;line-height:1.12;margin:10px 0 12px}
  .at-dev blockquote{margin:0 0 12px;padding-left:14px;border-left:3px solid var(--gold);font-style:italic;color:#cdd9ef;font-size:15.5px}.at-dev blockquote cite{color:var(--gold);font-size:13px}
  .at-dev p{color:var(--mut);font-size:14.5px;line-height:1.65}
  .at-btn{display:inline-block;margin-top:14px;padding:11px 20px;border-radius:11px;font-size:13.5px;font-weight:700;color:#101a2e;background:linear-gradient(150deg,var(--gold),#c9a24b)}
  .at-col{display:flex;flex-direction:column;gap:18px}
  .at-mem,.at-vid{padding:20px}
  .at-memcard{margin-top:10px;border:1px solid rgba(227,192,116,.3);border-radius:12px;padding:18px;text-align:center;background:rgba(227,192,116,.06)}
  .at-memcard b{font-family:"Instrument Serif",Georgia,serif;font-size:22px;display:block}.at-memcard span{font-size:11px;color:var(--mut)}
  .at-vidthumb{aspect-ratio:16/9;border-radius:11px;background:rgba(0,0,0,.35);display:grid;place-items:center;font-size:20px;margin:10px 0 8px}
  .at-vid b{display:block;font-size:14.5px}.at-vid span{font-size:12.5px;color:var(--mut)}
  .at-wall{padding:22px}
  .at-wrow{display:flex;align-items:center;gap:11px;margin-top:11px}
  .at-av{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;color:#fff;flex:none}.at-av.b{background:linear-gradient(150deg,#5b86c4,#3a5d96)}.at-av.g{background:linear-gradient(150deg,#5aa982,#3c7d5e)}
  .at-wrow p{font-size:13.5px;color:var(--mut);margin:0}.at-wrow b{color:var(--ink)}
  @media (prefers-reduced-motion:no-preference){
    .at-glass{transition:transform .2s,box-shadow .2s}.at-dev:hover,.at-mem:hover,.at-vid:hover{transform:translateY(-3px)}
    .at-orbs span{animation:at-float 14s ease-in-out infinite}.at-orbs span:nth-child(2){animation-duration:18s}@keyframes at-float{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-24px)}}
  }
  @media (max-width:920px){.at-shell{grid-template-columns:1fr}.at-side{position:static}.at-two{grid-template-columns:1fr}}
`;
