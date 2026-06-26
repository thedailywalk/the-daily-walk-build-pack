import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Dashboard concepts — 5 directions",
  robots: { index: false },
};

const CONCEPTS = [
  { slug: "observatory", name: "Observatory", tag: "Celestial · North Star evolved", blurb: "The ic2-northstar lineage, refined. Glass rail, a constellation hero, and a calm single focus with a stats rail. Aspirational and serene." },
  { slug: "club", name: "The Club", tag: "Members-only · Apple-luxury", blurb: "No sidebar — a top bar and a centered editorial column. A metal 'membership card' hero. Charcoal + brass. Feels like walking into a private club." },
  { slug: "command", name: "Command Deck", tag: "SaaS · Bento grid", blurb: "Slim icon rail + an asymmetric bento of cards. Data-forward, crisp, tech-forward. The most 'modern SaaS' of the five." },
  { slug: "trailhead", name: "Trailhead", tag: "The Path · Duolingo-calm", blurb: "The journey is the spine — a glowing vertical trail with stops. Minimal chrome, huge breathing room. Quiet and delightful." },
  { slug: "atrium", name: "Atrium", tag: "Glass · airy & layered", blurb: "Frosted glass panels floating over a soft gradient. Generous whitespace, the most 'glassmorphism / Apple' of the set." },
];

export default function DashboardConcepts() {
  return (
    <div className="dxg">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="dxg-sky" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <header className="dxg-head">
        <div className="dxg-kick">The Daily Walk · Member Dashboard</div>
        <h1>Five concepts to build from</h1>
        <p>
          Five genuinely different directions — same premium bar, distinct personality, layout, and navigation.
          The goal isn&apos;t to ship one; it&apos;s to pick a <strong>base</strong> and pull the strongest ideas
          from the rest. Each keeps the core features (greeting &amp; streak, Walk Score, journey, memory verse,
          today&apos;s devotional, weekly video, community).
        </p>
      </header>

      <div className="dxg-grid">
        {CONCEPTS.map((c, i) => (
          <Link key={c.slug} href={`/designs/dashboard/${c.slug}`} className="dxg-card">
            <span className="dxg-n">{String(i + 1).padStart(2, "0")}</span>
            <h2>{c.name}</h2>
            <div className="dxg-tag">{c.tag}</div>
            <p>{c.blurb}</p>
            <span className="dxg-open">Open concept →</span>
          </Link>
        ))}
      </div>

      <footer className="dxg-foot">
        Pick a base (e.g. “Command Deck, but with Observatory’s hero”) and we move to step 2: a Design Lab to
        refine each component, and a drag-and-drop builder to arrange the final dashboard.
      </footer>
    </div>
  );
}

const CSS = `
  *{box-sizing:border-box}
  .dxg{position:relative;min-height:100vh;margin:0;padding:60px 22px 80px;overflow:hidden;
    font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e8edf6;
    background:radial-gradient(1100px 700px at 80% -10%,rgba(70,110,170,.28),transparent 60%),radial-gradient(900px 600px at 5% 110%,rgba(40,70,120,.2),transparent 60%),linear-gradient(160deg,#0b1424,#16263f)}
  .dxg-sky{position:absolute;inset:0;pointer-events:none}
  .dxg-sky i{position:absolute;width:2px;height:2px;border-radius:50%;background:#dce8ff;opacity:.5}
  .dxg-sky i:nth-child(1){top:8%;left:12%}.dxg-sky i:nth-child(2){top:16%;left:84%}.dxg-sky i:nth-child(3){top:30%;left:46%}
  .dxg-sky i:nth-child(4){top:60%;left:8%}.dxg-sky i:nth-child(5){top:72%;left:90%}.dxg-sky i:nth-child(6){top:40%;left:70%}
  .dxg-sky i:nth-child(7){top:84%;left:30%}.dxg-sky i:nth-child(8){top:22%;left:62%}.dxg-sky i:nth-child(9){top:54%;left:94%}.dxg-sky i:nth-child(10){top:90%;left:55%}
  .dxg-head{position:relative;max-width:760px;margin:0 auto 40px;text-align:center}
  .dxg-kick{font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;color:#E3C074}
  .dxg-head h1{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400;font-size:44px;margin:10px 0 12px}
  .dxg-head p{color:#9fb0c8;font-size:16px;line-height:1.65}
  .dxg-grid{position:relative;max-width:1080px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px}
  .dxg-card{display:block;text-decoration:none;color:inherit;position:relative;background:rgba(18,32,54,.6);border:1px solid rgba(227,192,116,.16);border-radius:18px;padding:26px 24px 22px;backdrop-filter:blur(8px);transition:transform .2s,border-color .2s,box-shadow .2s}
  .dxg-card:hover{transform:translateY(-4px);border-color:rgba(227,192,116,.5);box-shadow:0 24px 50px -28px rgba(0,0,0,.8)}
  .dxg-n{font-family:"Instrument Serif",Georgia,serif;font-size:30px;color:#E3C074;opacity:.6}
  .dxg-card h2{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400;font-size:26px;margin:4px 0 4px}
  .dxg-tag{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#E3C074;font-weight:600;margin-bottom:10px}
  .dxg-card p{color:#9fb0c8;font-size:14px;line-height:1.6;margin:0 0 16px}
  .dxg-open{font-size:13px;font-weight:700;color:#E3C074}
  .dxg-foot{position:relative;max-width:760px;margin:40px auto 0;text-align:center;color:#6f829e;font-size:13.5px;line-height:1.6}
  @media (prefers-reduced-motion:no-preference){.dxg-sky i{animation:dxg-tw 5s ease-in-out infinite}.dxg-sky i:nth-child(2n){animation-duration:6.5s;animation-delay:1s}@keyframes dxg-tw{0%,100%{opacity:.2}50%{opacity:.85}}}
`;
