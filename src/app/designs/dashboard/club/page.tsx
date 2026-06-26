import Link from "next/link";

export const dynamic = "force-static";
export const metadata = { title: "Concept · The Club", robots: { index: false } };

export default function Club() {
  return (
    <div className="cl">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Link href="/designs/dashboard" className="cl-back">← All concepts</Link>

      <header className="cl-nav">
        <div className="cl-brand">THE DAILY WALK <span>· INNER CIRCLE</span></div>
        <nav>
          <a className="on">Dashboard</a><a>Journey</a><a>Pathlight</a><a>Prayer</a><a>Memory</a><a>Wall</a>
        </nav>
        <span className="cl-avatar">LJ</span>
      </header>

      <main className="cl-main">
        {/* membership card hero */}
        <section className="cl-card">
          <div className="cl-card-grain" aria-hidden="true" />
          <div className="cl-card-top">
            <span className="cl-card-label">MEMBER SINCE JUNE 2026</span>
            <span className="cl-card-tier">PATRON</span>
          </div>
          <div className="cl-card-name">Lulu Jimenez</div>
          <div className="cl-card-row">
            <div><b>12</b><span>day streak</span></div>
            <div><b>340</b><span>Walk Score</span></div>
            <div><b>Day 47</b><span>of 365</span></div>
          </div>
        </section>

        <p className="cl-greet">Good morning, Lulu. Before the noise of the day, give God the first few minutes — everything you need is below.</p>

        {/* editorial devotional */}
        <article className="cl-dev">
          <div className="cl-eyebrow">Today&apos;s Devotional · June 26</div>
          <h1>He defeats death and stays with us always.</h1>
          <blockquote>“He is not here, for he has risen, just like he said.” <cite>— Matthew 28:6</cite></blockquote>
          <p>The tomb wasn&apos;t a setback; it was the plan. The same power that emptied that grave is the power that walks with you into an ordinary Friday. You don&apos;t have to manufacture the strength — you have to lean on the One who already won.</p>
          <a className="cl-btn">Read the full walk →</a>
        </article>

        <div className="cl-rule" />

        {/* memory + video */}
        <div className="cl-two">
          <section className="cl-mod">
            <div className="cl-eyebrow">Your Memory Verse</div>
            <div className="cl-mem"><b>Psalm 23:1</b><span>tap to reveal the verse</span></div>
            <a className="cl-link">Change verse</a>
          </section>
          <section className="cl-mod">
            <div className="cl-eyebrow">This Week&apos;s Video</div>
            <div className="cl-vid">▶</div>
            <b className="cl-vid-t">Finding Peace in the Storm</b>
            <span className="cl-vid-c">The Bible Project</span>
          </section>
        </div>

        <div className="cl-rule" />

        {/* the circle */}
        <section className="cl-circle">
          <div className="cl-eyebrow">The Inner Circle · this week</div>
          <div className="cl-lb">
            <div className="cl-lrow"><span className="cl-rk">1</span><span className="cl-lring">LJ</span><span className="cl-nm">Lulu <em>· you</em></span><span className="cl-sc">340</span></div>
            <div className="cl-lrow"><span className="cl-rk">2</span><span className="cl-lring">MR</span><span className="cl-nm">Maria</span><span className="cl-sc">290</span></div>
            <div className="cl-lrow"><span className="cl-rk">3</span><span className="cl-lring">DV</span><span className="cl-nm">David</span><span className="cl-sc">255</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}

const CSS = `
  *{box-sizing:border-box}
  .cl{--gold:#d8b06a;--gold2:#b8902e;--ink:#ece8df;--mut:#9a9384;--line:rgba(216,176,106,.16);
    min-height:100vh;margin:0;padding:0 0 80px;font-family:Inter,system-ui,sans-serif;color:var(--ink);
    background:linear-gradient(180deg,#14161a,#1b1f26 40%,#14161a)}
  .cl a{color:inherit;text-decoration:none}
  .cl h1{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400}
  .cl-back{display:inline-block;color:var(--mut);font-size:13px;padding:16px 0 0 22px}.cl-back:hover{color:var(--gold)}
  .cl-nav{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:16px 30px;background:rgba(18,21,26,.8);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
  .cl-brand{font-family:Arial;font-weight:800;letter-spacing:2px;font-size:14px}.cl-brand span{color:var(--gold);font-weight:600}
  .cl-nav nav{display:flex;gap:6px}
  .cl-nav nav a{font-size:13.5px;color:var(--mut);padding:8px 14px;border-radius:9px;transition:.16s}
  .cl-nav nav a:hover{color:#fff}.cl-nav nav a.on{color:var(--gold);background:rgba(216,176,106,.1)}
  .cl-avatar{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;color:#14161a;background:linear-gradient(150deg,var(--gold),var(--gold2))}
  .cl-main{max-width:760px;margin:0 auto;padding:34px 24px 0}
  .cl-card{position:relative;overflow:hidden;border-radius:18px;padding:26px 28px;color:#1a1a1a;
    background:linear-gradient(135deg,#e9d6a8,#c9a24b 45%,#9c7a2e);box-shadow:0 22px 50px -26px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.4)}
  .cl-card-grain{position:absolute;inset:0;background:radial-gradient(120% 120% at 0% 0%,rgba(255,255,255,.35),transparent 40%),radial-gradient(120% 120% at 100% 100%,rgba(0,0,0,.18),transparent 45%);pointer-events:none}
  .cl-card-top{position:relative;display:flex;justify-content:space-between;font-family:Arial;font-size:10px;letter-spacing:2px;font-weight:700}
  .cl-card-tier{background:#1a1a1a;color:var(--gold);padding:3px 10px;border-radius:20px;letter-spacing:1.5px}
  .cl-card-name{position:relative;font-family:"Instrument Serif",Georgia,serif;font-size:30px;margin:14px 0 18px}
  .cl-card-row{position:relative;display:flex;gap:30px}
  .cl-card-row b{font-family:"Instrument Serif",Georgia,serif;font-size:24px}.cl-card-row span{display:block;font-size:10px;letter-spacing:1px;text-transform:uppercase;opacity:.75}
  .cl-greet{color:var(--mut);font-size:15px;line-height:1.6;margin:24px 0 30px;text-align:center}
  .cl-eyebrow{font-family:Arial;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px}
  .cl-dev h1{font-size:34px;line-height:1.1;margin:0 0 14px}
  .cl-dev blockquote{margin:0 0 14px;padding-left:16px;border-left:3px solid var(--gold);font-style:italic;color:#d8cdb6;font-size:16px}
  .cl-dev blockquote cite{color:var(--gold);font-size:13px}
  .cl-dev p{color:var(--mut);font-size:15px;line-height:1.7}
  .cl-btn{display:inline-block;margin-top:16px;padding:11px 22px;border-radius:11px;font-size:13.5px;font-weight:700;color:#14161a;background:linear-gradient(150deg,var(--gold),var(--gold2));transition:transform .16s}.cl-btn:hover{transform:translateY(-2px)}
  .cl-rule{height:1px;background:linear-gradient(90deg,transparent,var(--line),transparent);margin:34px 0}
  .cl-two{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .cl-mod{background:rgba(255,255,255,.025);border:1px solid var(--line);border-radius:16px;padding:20px}
  .cl-mem{border:1px solid var(--line);border-radius:12px;padding:18px;text-align:center;background:rgba(216,176,106,.06)}
  .cl-mem b{font-family:"Instrument Serif",Georgia,serif;font-size:22px;display:block}.cl-mem span{font-size:11px;color:var(--mut)}
  .cl-link{display:inline-block;margin-top:10px;font-size:12.5px;font-weight:600;color:var(--gold)}
  .cl-vid{aspect-ratio:16/9;border-radius:11px;background:rgba(0,0,0,.35);display:grid;place-items:center;font-size:22px;margin-bottom:10px}
  .cl-vid-t{display:block;font-size:15px}.cl-vid-c{font-size:12.5px;color:var(--mut)}
  .cl-lb{margin-top:4px}
  .cl-lrow{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.05)}.cl-lrow:last-child{border:none}
  .cl-rk{width:16px;text-align:center;font-size:12px;color:var(--mut);font-weight:700}
  .cl-lring{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:11px;font-weight:700;color:var(--gold);background:#14161a;box-shadow:0 0 0 2px #14161a,0 0 0 3.5px rgba(216,176,106,.5)}
  .cl-nm{flex:1;font-size:13.5px}.cl-nm em{color:var(--mut);font-style:normal;font-size:11px}
  .cl-sc{font-size:14px;font-weight:700;color:var(--gold)}
  @media (prefers-reduced-motion:no-preference){.cl-mod,.cl-card{transition:transform .18s}.cl-mod:hover{transform:translateY(-3px)}}
  @media (max-width:680px){.cl-nav nav{display:none}.cl-two{grid-template-columns:1fr}}
`;
