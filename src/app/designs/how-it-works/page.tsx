import type { Metadata } from "next";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "How it works — 5 fresh approaches",
  robots: { index: false },
};

/* Shared, up-to-date product copy used across every sample. */
const FREE = {
  kicker: "Every day · Free",
  title: "The Daily Walk newsletter",
  body: "A 5-minute devotional, one honest prayer, an uplifting Good News story, the Wednesday Pastor's Take, and a Sunday Rest & Reflect.",
  foot: "For anyone who wants daily encouragement, prayer, and hope.",
  bullets: ["A prayer every day", "A Good News story", "Wednesday Pastor's Take", "Sunday Rest & Reflect"],
};
const PREMIUM = {
  kicker: "Go deeper · Premium $5.99",
  title: "The Deeper Walk",
  body: "The discipleship newsletter: a richer daily devotional, The World Through God's Lens on Thursdays, The Weekend Study on Saturdays, and Inside the Circle — live sessions with a licensed Christian therapist and guest pastors.",
  foot: "For readers who want to go deeper and be discipled through the week.",
  bullets: ["A deeper daily devotional", "The World Through God's Lens (Thu)", "The Weekend Study (Sat)", "Inside the Circle · live sessions"],
};
const WELLNESS = {
  kicker: "Founding bonus · 3× a week",
  title: "The Spiritual Wellness Guide",
  body: "Faith + neuroscience tools to steady your heart and mind — The Science Behind It, The Peace Practice, The Pattern Breaker, The Prayer Lab, and A Question Worth Sitting With.",
  foot: "Mon · Wed · Fri — free for a full year for Founding Members.",
  bullets: ["The Science Behind It", "The Peace Practice", "The Pattern Breaker", "The Prayer Lab"],
};
const JOURNEY = {
  kicker: "Your Day 1 · Premium",
  title: "The Bible-in-a-Year journey",
  body: "Read the whole Bible in a year — starting with Jesus, not Genesis. Each day: the reading, a clear breakdown made simple, what it shows about God, real-life application, and a question. Begins the day you join.",
  foot: "For readers who want to be personally guided through the Bible.",
  bullets: ["Start with Jesus", "Never feel behind — your Day 1", "Plain-English breakdowns", "A question worth sitting with"],
};

const FAQ = [
  { q: "Is it really free?", a: "Yes — completely. The daily devotional, the prayer, the Good News story, the Wednesday Pastor's Take, and the Sunday Rest & Reflect are free forever, with no card required. Premium is an option, never a wall." },
  { q: "What do I get with Premium?", a: "The Deeper Walk — a richer daily devotional plus The World Through God's Lens (Thursdays), The Weekend Study (Saturdays), and Inside the Circle live sessions with a licensed Christian therapist and guest pastors. You also get the guided Bible-in-a-Year journey and your member dashboard. $5.99/mo or $59/yr." },
  { q: "What's a Founding Member?", a: "Early supporters who help build this. You lock in $5.99/mo for life, get a full year of The Spiritual Wellness Guide free, and are grandfathered into the whole platform as it grows — guided journey, dashboard, and community." },
  { q: "What is the Spiritual Wellness Guide?", a: "A Founding-Member bonus sent three times a week (Mon · Wed · Fri). It pairs faith with grounded neuroscience: a 60-second Peace Practice, the Pattern Breaker, the Prayer Lab, and a question worth sitting with — practical calm, not just inspiration." },
  { q: "Do I have to start on January 1? What if I miss a day?", a: "No. The Bible-in-a-Year begins on your Day 1, whenever that is. Miss a day? You simply pick up where you left off — nothing resets, and there's no guilt here." },
  { q: "I'm new to faith — or not sure I believe. Is this for me?", a: "Absolutely. It's written simply and clearly, with no church jargon and no guilt — welcoming to believers and seekers alike. It starts with Jesus: who He is and how He treats people." },
  { q: "How do I receive it, and can I cancel anytime?", a: "It arrives by email every morning, and everything also lives in your member portal. You can cancel anytime in a click — no guilt there either." },
];

export default function HowItWorksSamples() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hw-page">
        <header className="hw-pagehead">
          <div className="hw-eyebrow">The Daily Walk · Design samples</div>
          <h1>“How it works” — 5 fresh approaches</h1>
          <p>
            Five completely different looks for the section, all updated to reflect everything we&apos;ve built —
            plus a Frequently Asked Questions section at the bottom. Tell me which one to make live (and I can
            theme the FAQ to match).
          </p>
        </header>

        <Sample n={1} name="Editorial Split" note="Light & refined — two columns with a gold spine, bonus ribbon">
          {Sample1()}
        </Sample>
        <Sample n={2} name="Inner Circle" note="Dark, elevated — matches the new member portal, glass + starfield">
          {Sample2()}
        </Sample>
        <Sample n={3} name="Your Week" note="A weekly rhythm calendar — shows exactly what lands each day">
          {Sample3()}
        </Sample>
        <Sample n={4} name="Tiered Cards" note="Clean, Duolingo-style tiers with checklists">
          {Sample4()}
        </Sample>
        <Sample n={5} name="The Path" note="A numbered story — four steps, warm and human">
          {Sample5()}
        </Sample>

        {/* FAQ */}
        <section className="faq">
          <div className="faq-in">
            <div className="hw-eyebrow" style={{ textAlign: "center" }}>Before you start</div>
            <h2 className="faq-h">Frequently asked questions</h2>
            <div className="faq-list">
              {FAQ.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary>
                    <span>{f.q}</span>
                    <span className="faq-plus" aria-hidden="true">+</span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Sample({ n, name, note, children }: { n: number; name: string; note: string; children: React.ReactNode }) {
  return (
    <section className="hw-frame">
      <div className="hw-frame-label">
        <span className="hw-frame-n">{n}</span>
        <span className="hw-frame-name">{name}</span>
        <span className="hw-frame-note">{note}</span>
      </div>
      {children}
    </section>
  );
}

/* ============================ 1 · Editorial Split ============================ */
function Sample1() {
  return (
    <div className="s1">
      <div className="s1-head">
        <div className="s1-kick">How it works</div>
        <h2>Two rhythms, one walk</h2>
        <p>A daily dose of encouragement for everyone — and a deeper, guided walk for those who want to go further.</p>
      </div>
      <div className="s1-split">
        <div className="s1-col">
          <span className="s1-tag s1-tag-free">{FREE.kicker}</span>
          <h3>{FREE.title}</h3>
          <p>{FREE.body}</p>
          <ul>{FREE.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <span className="s1-foot">{FREE.foot}</span>
        </div>
        <div className="s1-spine" aria-hidden="true"><span>＋</span></div>
        <div className="s1-col s1-col-prem">
          <span className="s1-tag s1-tag-prem">{PREMIUM.kicker}</span>
          <h3>{PREMIUM.title}</h3>
          <p>{PREMIUM.body}</p>
          <ul>{PREMIUM.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <span className="s1-foot">{PREMIUM.foot}</span>
        </div>
      </div>
      <div className="s1-ribbon">
        <strong>Founding bonus:</strong> {WELLNESS.title} — {WELLNESS.foot} &nbsp;·&nbsp; Plus the guided Bible-in-a-Year journey.
      </div>
    </div>
  );
}

/* ============================ 2 · Inner Circle ============================ */
function Sample2() {
  const cards = [FREE, PREMIUM, WELLNESS];
  return (
    <div className="s2">
      <div className="s2-sky" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="s2-in">
        <div className="s2-kick">How it works · Inner Circle</div>
        <h2>Two rhythms, one walk</h2>
        <p className="s2-sub">Encouragement for everyone — and a deeper, guided walk for those who step inside.</p>
        <div className="s2-grid">
          {cards.map((c, i) => (
            <div key={c.title} className={`s2-card${i === 1 ? " s2-card-feat" : ""}`}>
              <div className="s2-tag">{c.kicker}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <ul>{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="s2-journey">
          <span className="s2-jstar" aria-hidden="true">✦</span>
          <div>
            <strong>{JOURNEY.title}</strong>
            <span>{JOURNEY.body}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ 3 · Your Week ============================ */
function Sample3() {
  const week = [
    { d: "Sun", items: [["Free", "Daily + Rest & Reflect"]] },
    { d: "Mon", items: [["Free", "Daily devotional"], ["Bonus", "Wellness Guide"]] },
    { d: "Tue", items: [["Free", "Daily devotional"]] },
    { d: "Wed", items: [["Free", "Daily + Pastor's Take"], ["Bonus", "Wellness Guide"]] },
    { d: "Thu", items: [["Free", "Daily devotional"], ["Prem", "World Through God's Lens"]] },
    { d: "Fri", items: [["Free", "Daily devotional"], ["Bonus", "Wellness Guide"]] },
    { d: "Sat", items: [["Free", "Daily devotional"], ["Prem", "The Weekend Study"]] },
  ];
  return (
    <div className="s3">
      <div className="s3-head">
        <div className="s3-kick">How it works</div>
        <h2>Your week with God</h2>
        <p>Something lands every morning — and a little more for the ones going deeper.</p>
      </div>
      <div className="s3-week">
        {week.map((day) => (
          <div key={day.d} className="s3-day">
            <div className="s3-dow">{day.d}</div>
            {day.items.map(([tier, label], i) => (
              <div key={i} className={`s3-chip s3-${tier.toLowerCase()}`}>
                <span className="s3-chip-tier">{tier}</span>
                {label}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="s3-legend">
        <span><i className="s3-dot s3-free" /> Free — everyone</span>
        <span><i className="s3-dot s3-prem" /> Premium — The Deeper Walk</span>
        <span><i className="s3-dot s3-bonus" /> Founding bonus — Wellness Guide</span>
      </div>
    </div>
  );
}

/* ============================ 4 · Tiered Cards ============================ */
function Sample4() {
  const tiers = [
    { emoji: "🌅", label: "Free", price: "$0", tagline: "Daily encouragement for everyone", points: FREE.bullets, cta: "Start free" },
    { emoji: "📖", label: "Premium", price: "$5.99/mo", tagline: "The Deeper Walk + Bible-in-a-Year", points: [...PREMIUM.bullets, "Guided Bible-in-a-Year, from your Day 1"], cta: "Become a Founding Member", feat: true },
    { emoji: "🕊️", label: "Founding bonus", price: "Included", tagline: "The Spiritual Wellness Guide, 3×/week", points: WELLNESS.bullets, cta: "Free for a year" },
  ];
  return (
    <div className="s4">
      <div className="s4-head">
        <div className="s4-kick">How it works</div>
        <h2>Pick your pace</h2>
        <p>Start free and stay free — or go deeper whenever you&apos;re ready.</p>
      </div>
      <div className="s4-grid">
        {tiers.map((t) => (
          <div key={t.label} className={`s4-card${t.feat ? " s4-card-feat" : ""}`}>
            {t.feat && <div className="s4-flag">Most loved</div>}
            <div className="s4-emoji">{t.emoji}</div>
            <div className="s4-label">{t.label}</div>
            <div className="s4-price">{t.price}</div>
            <div className="s4-tagline">{t.tagline}</div>
            <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <div className="s4-cta">{t.cta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ 5 · The Path ============================ */
function Sample5() {
  const steps = [
    { n: "01", title: "Start free, every morning", body: FREE.body },
    { n: "02", title: "Go deeper with The Deeper Walk", body: PREMIUM.body },
    { n: "03", title: "Be guided through the whole Bible", body: JOURNEY.body },
    { n: "04", title: "Steady your heart & mind", body: WELLNESS.body },
  ];
  return (
    <div className="s5">
      <div className="s5-head">
        <div className="s5-kick">How it works</div>
        <h2>Four steps, one walk</h2>
        <p>However far you want to go, it starts the same way — with a few honest minutes today.</p>
      </div>
      <div className="s5-steps">
        {steps.map((s) => (
          <div key={s.n} className="s5-step">
            <div className="s5-num">{s.n}</div>
            <div className="s5-body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CSS = `
  :root{--navy:#1F3A5F;--gold:#C9A24B;--gold2:#B8902E;--cream:#FAF6EE;--ink:#22262B}
  *{box-sizing:border-box}
  .hw-page{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:var(--ink);background:#EFEADD;margin:0;padding:0 0 80px}
  .hw-page h1,.hw-page h2,.hw-page h3{font-family:"Instrument Serif","Playfair Display",Georgia,serif;font-weight:400}
  .hw-pagehead{max-width:760px;margin:0 auto;padding:44px 20px 8px;text-align:center}
  .hw-pagehead h1{font-size:38px;color:var(--navy);margin:8px 0 10px;line-height:1.1}
  .hw-pagehead p{color:#5b5340;font-size:16px;line-height:1.6;max-width:600px;margin:0 auto}
  .hw-eyebrow{font-family:Arial,Helvetica,sans-serif;letter-spacing:3px;text-transform:uppercase;font-size:11px;font-weight:700;color:var(--gold2)}

  .hw-frame{max-width:1080px;margin:34px auto 0;padding:0 20px}
  .hw-frame-label{display:flex;align-items:center;gap:12px;margin:0 0 12px;flex-wrap:wrap}
  .hw-frame-n{width:30px;height:30px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-weight:800;font-size:14px;font-family:Arial}
  .hw-frame-name{font-family:Arial;font-weight:800;font-size:15px;color:var(--navy)}
  .hw-frame-note{font-family:Arial;font-size:13px;color:#8a7d5c}

  /* shared sample shell */
  .s1,.s2,.s3,.s4,.s5{border-radius:20px;overflow:hidden;box-shadow:0 20px 50px -30px rgba(31,58,95,.5)}

  /* ---- 1 Editorial Split ---- */
  .s1{background:var(--cream);padding:40px 36px}
  .s1-head{text-align:center;max-width:620px;margin:0 auto 30px}
  .s1-kick{font-family:Arial;letter-spacing:3px;text-transform:uppercase;font-size:11px;font-weight:700;color:var(--gold2)}
  .s1-head h2{font-size:34px;color:var(--navy);margin:8px 0 8px}
  .s1-head p{color:#5b5340;font-size:16px;line-height:1.6;margin:0}
  .s1-split{display:grid;grid-template-columns:1fr 60px 1fr;align-items:stretch;gap:0}
  .s1-col{padding:8px 26px}
  .s1-col h3{font-size:26px;color:var(--navy);margin:8px 0 10px}
  .s1-col p{color:#4a4636;font-size:15px;line-height:1.6}
  .s1-col ul{list-style:none;padding:0;margin:14px 0 12px}
  .s1-col li{font-size:14px;color:#3a3a3a;padding:5px 0 5px 22px;position:relative}
  .s1-col li:before{content:"✓";position:absolute;left:0;color:var(--gold2);font-weight:800}
  .s1-tag{display:inline-block;font-family:Arial;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:4px 11px;border-radius:999px}
  .s1-tag-free{color:#5a6573;background:#eef1f6}
  .s1-tag-prem{color:#8a6a1e;background:linear-gradient(180deg,#f6e7c2,#ecd6a3)}
  .s1-foot{display:block;font-style:italic;color:#8a7d5c;font-size:13.5px;margin-top:6px}
  .s1-spine{position:relative;display:grid;place-items:center}
  .s1-spine:before{content:"";position:absolute;top:6px;bottom:6px;width:1px;background:linear-gradient(to bottom,transparent,var(--gold),transparent)}
  .s1-spine span{position:relative;z-index:1;width:34px;height:34px;border-radius:50%;background:var(--gold);color:var(--navy);display:grid;place-items:center;font-weight:800;box-shadow:0 6px 16px -8px var(--gold2)}
  .s1-ribbon{margin-top:24px;text-align:center;background:#10243f;color:#EDE6D4;border-radius:12px;padding:14px 20px;font-size:14px;line-height:1.5}
  .s1-ribbon strong{color:#E3C074}

  /* ---- 2 Inner Circle ---- */
  .s2{position:relative;background:radial-gradient(1000px 600px at 80% -10%,rgba(70,110,170,.28),transparent 60%),linear-gradient(160deg,#0b1424,#16263f);color:#e8edf6;padding:42px 34px}
  .s2-sky{position:absolute;inset:0;pointer-events:none}
  .s2-sky i{position:absolute;width:2px;height:2px;border-radius:50%;background:#dce8ff;opacity:.5}
  .s2-sky i:nth-child(1){top:12%;left:14%}.s2-sky i:nth-child(2){top:24%;left:80%}.s2-sky i:nth-child(3){top:60%;left:8%}
  .s2-sky i:nth-child(4){top:72%;left:88%}.s2-sky i:nth-child(5){top:38%;left:46%}.s2-sky i:nth-child(6){top:18%;left:62%}
  .s2-sky i:nth-child(7){top:82%;left:34%}.s2-sky i:nth-child(8){top:50%;left:94%}
  .s2-in{position:relative;text-align:center}
  .s2-kick{font-family:Arial;letter-spacing:3px;text-transform:uppercase;font-size:11px;font-weight:700;color:#E3C074}
  .s2 h2{font-size:34px;margin:8px 0 6px}
  .s2-sub{color:#9fb0c8;font-size:15.5px;margin:0 auto 26px;max-width:560px;line-height:1.55}
  .s2-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:left}
  .s2-card{background:rgba(20,33,56,.6);border:1px solid rgba(227,192,116,.16);border-radius:16px;padding:20px;backdrop-filter:blur(8px)}
  .s2-card-feat{border-color:rgba(227,192,116,.55);box-shadow:0 0 0 1px rgba(227,192,116,.25),0 16px 40px -24px rgba(0,0,0,.7)}
  .s2-tag{font-family:Arial;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#E3C074;margin-bottom:8px}
  .s2-card h3{font-size:21px;margin:0 0 8px;color:#fff}
  .s2-card p{color:#9fb0c8;font-size:13.5px;line-height:1.55;margin:0 0 12px}
  .s2-card ul{list-style:none;padding:0;margin:0}
  .s2-card li{font-size:13px;color:#cdd7e6;padding:4px 0 4px 20px;position:relative}
  .s2-card li:before{content:"✦";position:absolute;left:0;color:#E3C074;font-size:11px}
  .s2-journey{display:flex;align-items:center;gap:14px;text-align:left;margin-top:18px;background:rgba(8,16,30,.5);border:1px solid rgba(227,192,116,.2);border-radius:14px;padding:16px 20px}
  .s2-jstar{font-size:26px;color:#E3C074}
  .s2-journey strong{display:block;color:#fff;font-size:16px}
  .s2-journey span{color:#9fb0c8;font-size:13.5px;line-height:1.5}

  /* ---- 3 Your Week ---- */
  .s3{background:#fff;padding:40px 30px}
  .s3-head{text-align:center;margin-bottom:26px}
  .s3-kick{font-family:Arial;letter-spacing:3px;text-transform:uppercase;font-size:11px;font-weight:700;color:var(--gold2)}
  .s3-head h2{font-size:32px;color:var(--navy);margin:8px 0 6px}
  .s3-head p{color:#5b5340;font-size:15.5px;margin:0}
  .s3-week{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
  .s3-day{background:#faf7f0;border:1px solid #ece3d3;border-radius:12px;padding:10px 8px;min-height:120px}
  .s3-dow{font-family:Arial;font-weight:800;font-size:12px;color:var(--navy);margin-bottom:8px}
  .s3-chip{font-size:11px;line-height:1.3;color:#3a3a3a;border-radius:7px;padding:6px 7px;margin-bottom:6px;border-left:3px solid #ccc;background:#fff}
  .s3-chip-tier{display:block;font-family:Arial;font-weight:800;font-size:8.5px;letter-spacing:.5px;text-transform:uppercase;color:#8a7d5c;margin-bottom:2px}
  .s3-free{border-left-color:#9aa6b8}.s3-prem{border-left-color:var(--gold)}.s3-bonus{border-left-color:#6f9b7e}
  .s3-legend{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-top:18px;font-size:13px;color:#5b5340}
  .s3-legend span{display:inline-flex;align-items:center;gap:7px}
  .s3-dot{width:11px;height:11px;border-radius:3px;display:inline-block}
  .s3-dot.s3-free{background:#9aa6b8}.s3-dot.s3-prem{background:var(--gold)}.s3-dot.s3-bonus{background:#6f9b7e}

  /* ---- 4 Tiered Cards ---- */
  .s4{background:linear-gradient(180deg,#fff8ea,#f5ead2);padding:40px 30px}
  .s4-head{text-align:center;margin-bottom:26px}
  .s4-kick{font-family:Arial;letter-spacing:3px;text-transform:uppercase;font-size:11px;font-weight:700;color:var(--gold2)}
  .s4-head h2{font-size:32px;color:var(--navy);margin:8px 0 6px}
  .s4-head p{color:#5b5340;font-size:15.5px;margin:0}
  .s4-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:start}
  .s4-card{position:relative;background:#fff;border:1px solid #ece3d3;border-radius:18px;padding:24px 20px;text-align:center;box-shadow:0 14px 34px -24px rgba(31,58,95,.4)}
  .s4-card-feat{border:2px solid var(--gold);transform:translateY(-6px)}
  .s4-flag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--gold);color:var(--navy);font-family:Arial;font-weight:800;font-size:10px;letter-spacing:.5px;text-transform:uppercase;padding:4px 12px;border-radius:999px}
  .s4-emoji{font-size:34px}
  .s4-label{font-family:Arial;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--gold2);margin-top:6px}
  .s4-price{font-family:Georgia,serif;font-size:30px;color:var(--navy);margin:2px 0}
  .s4-tagline{font-size:13.5px;color:#5b5340;margin-bottom:12px}
  .s4-card ul{list-style:none;padding:0;margin:0 0 16px;text-align:left}
  .s4-card li{font-size:13.5px;color:#3a3a3a;padding:6px 0 6px 22px;position:relative}
  .s4-card li:before{content:"✓";position:absolute;left:0;color:var(--gold2);font-weight:800}
  .s4-cta{font-family:Arial;font-weight:700;font-size:13.5px;color:var(--navy);background:linear-gradient(180deg,#f6e7c2,#e8cd86);border-radius:10px;padding:11px;}

  /* ---- 5 The Path ---- */
  .s5{background:var(--cream);padding:42px 36px}
  .s5-head{text-align:center;max-width:600px;margin:0 auto 26px}
  .s5-kick{font-family:Arial;letter-spacing:3px;text-transform:uppercase;font-size:11px;font-weight:700;color:var(--gold2)}
  .s5-head h2{font-size:32px;color:var(--navy);margin:8px 0 6px}
  .s5-head p{color:#5b5340;font-size:15.5px;margin:0}
  .s5-steps{max-width:760px;margin:0 auto;display:flex;flex-direction:column;gap:4px}
  .s5-step{display:flex;gap:22px;align-items:flex-start;padding:20px 0;border-bottom:1px solid #e6dcc6}
  .s5-step:last-child{border-bottom:none}
  .s5-num{font-family:Georgia,serif;font-size:42px;color:var(--gold);line-height:1;min-width:64px}
  .s5-body h3{font-size:21px;color:var(--navy);margin:2px 0 6px}
  .s5-body p{color:#4a4636;font-size:14.5px;line-height:1.6;margin:0}

  /* ---- FAQ ---- */
  .faq{margin:46px auto 0;max-width:760px;padding:0 20px}
  .faq-h{text-align:center;font-size:32px;color:var(--navy);margin:8px 0 22px}
  .faq-list{display:flex;flex-direction:column;gap:10px}
  .faq-item{background:#fff;border:1px solid #ece3d3;border-radius:12px;padding:0 18px;box-shadow:0 8px 22px -18px rgba(31,58,95,.4)}
  .faq-item summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:14px;padding:16px 0;font-family:Arial;font-weight:700;font-size:15.5px;color:var(--navy)}
  .faq-item summary::-webkit-details-marker{display:none}
  .faq-plus{font-size:22px;color:var(--gold2);transition:transform .2s}
  .faq-item[open] .faq-plus{transform:rotate(45deg)}
  .faq-item p{margin:0 0 16px;color:#4a4636;font-size:14.5px;line-height:1.65}

  @media (prefers-reduced-motion:no-preference){
    .s2-sky i{animation:hw-tw 4.5s ease-in-out infinite}
    .s2-sky i:nth-child(2n){animation-duration:6s;animation-delay:1s}
    @keyframes hw-tw{0%,100%{opacity:.2}50%{opacity:.85}}
  }
  @media (max-width:860px){
    .s1-split{grid-template-columns:1fr}.s1-spine{height:40px}
    .s2-grid,.s4-grid{grid-template-columns:1fr}
    .s3-week{grid-template-columns:repeat(2,1fr)}
    .s4-card-feat{transform:none}
  }
`;
