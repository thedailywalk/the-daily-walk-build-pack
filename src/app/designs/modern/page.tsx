import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import { hero, rhythms, features, goodNews, tiers } from "@/lib/content";
import s from "./modern.module.css";

export const metadata: Metadata = {
  title: "Design B — Modern",
  robots: { index: false },
};

export default function ModernDesign() {
  return (
    <div className={s.page}>
      {/* SPLIT HERO */}
      <header className={s.hero}>
        <div className="wrap">
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <span className={s.pill}>{hero.eyebrow}</span>
              <h1>{hero.title}</h1>
              <p className={s.lead}>{hero.lead}</p>
              <SignupForm />
              <div className={s.reassure}>
                Free forever · No card required ·{" "}
                <b>Welcoming wherever you are.</b>
              </div>
            </div>

            {/* Email preview mockup */}
            <div className={s.preview} aria-hidden="true">
              <div className={s.pvBar}>
                <span className={s.pvBrand}>THE DAILY WALK</span>
                <span className={s.pvDate}>Today · 5 AM ET</span>
              </div>
              <div className={s.pvBody}>
                <div className={s.pvLabel}>Today&apos;s Reading</div>
                <div className={s.pvVerse}>
                  &ldquo;Come to me, all who are weary, and I will give you
                  rest.&rdquo;
                </div>
                <div className={s.pvRef}>Matthew 11:28 · Make It Real</div>
                <p className={s.pvText}>
                  Rest isn&apos;t a reward you earn at the end of a productive
                  day — it&apos;s an invitation you can accept right now, in the
                  middle of the mess…
                </p>
                <div className={s.pvLabel}>Good News</div>
                <div className={s.pvGn} style={{ marginTop: 8 }}>
                  {goodNews.map((g) => (
                    <div className={s.pvCard} key={g.headline}>
                      <div className={s.pvImg} />
                      <div className={s.pvCap}>{g.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className={s.section}>
        <div className="wrap">
          <div className={s.kicker}>Why people love it</div>
          <h2 className={s.h2}>Encouragement that meets real life</h2>
          <p className={s.intro}>
            Small enough to read with your coffee. Real enough to carry into
            your day.
          </p>
          <div className={s.feats}>
            {features.map((f) => (
              <div className={s.feat} key={f.title}>
                <div className={s.chip} aria-hidden="true">
                  {f.icon}
                </div>
                <h4>{f.title}</h4>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO RHYTHMS BAND */}
      <section className={`${s.section} ${s.band}`}>
        <div className="wrap">
          <div className={s.kicker}>How it works</div>
          <h2 className={s.h2}>Two rhythms, one walk</h2>
          <p className={s.intro}>
            A daily dose of encouragement for everyone — and a personal, guided
            journey for those who want to go deeper.
          </p>
          <div className={s.rgrid}>
            {rhythms.map((r) => (
              <div className={s.rcard} key={r.title}>
                <div className={s.rtag}>{r.tag}</div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <div className={s.who}>{r.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className={s.section}>
        <div className="wrap">
          <div className={s.kicker}>Simple pricing</div>
          <h2 className={s.h2}>Start free. Go deeper when you&apos;re ready.</h2>
          <p className={s.intro}>
            The daily walk is free. Premium guides you through the Bible in a
            year. Patron helps keep it free for everyone.
          </p>
          <div className={s.cards}>
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`${s.card} ${t.highlighted ? s.hot : ""}`}
              >
                {t.highlighted ? (
                  <span className={s.badge}>MOST POPULAR</span>
                ) : null}
                <div className={s.cname}>{t.name}</div>
                <div className={s.camt}>
                  {t.price}
                  {t.per ? <small>{t.per}</small> : null}
                </div>
                <div className={s.cnote}>{t.note}</div>
                <ul className={s.clist}>
                  {t.features.map((feat) => (
                    <li key={feat}>{feat}</li>
                  ))}
                </ul>
                <Link
                  href={t.href}
                  className={`btn btn-block ${
                    t.highlighted ? "btn-gold" : "btn-ghost"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className="wrap">
          <h2>Tomorrow morning could start a little differently.</h2>
          <p>Join free — your first devotional lands tomorrow at 5 AM ET.</p>
          <div className={s.ctaForm}>
            <SignupForm />
          </div>
        </div>
      </section>
    </div>
  );
}
