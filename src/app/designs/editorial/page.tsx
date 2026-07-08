import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import { hero, rhythms, goodNews, tiers, mission } from "@/lib/content";
import s from "./editorial.module.css";

export const metadata: Metadata = {
  title: "Design A — Editorial",
  robots: { index: false },
};

export default function EditorialDesign() {
  return (
    <div className={s.page}>
      {/* HERO */}
      <header className={s.hero}>
        <div className="wrap">
          <div className={s.inner}>
            <div className={s.rule} />
            <div className={s.eyebrow}>{hero.eyebrow}</div>
            <h1>{hero.title}</h1>
            <p className={s.lead}>{hero.lead}</p>
            <div className={s.formWrap}>
              <SignupForm variant="hero" />
            </div>
            <div className={s.reassure}>{hero.reassure}</div>
          </div>
        </div>
      </header>

      {/* TWO RHYTHMS */}
      <section className={s.section}>
        <div className="wrap">
          <div className={s.kicker}>How it works</div>
          <h2 className={s.h2}>Two rhythms, one walk</h2>
          <p className={s.intro}>
            A daily dose of encouragement for everyone — and a personal, guided
            journey through Scripture for those who want to go deeper.
          </p>
          {rhythms.map((r, i) => (
            <div className={s.rhythm} key={r.title}>
              <div className={s.num}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className={s.rtag}>{r.tag}</div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <div className={s.who}>{r.who}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GOOD NEWS */}
      <section className={`${s.section} ${s.gnsec}`}>
        <div className="wrap">
          <div className={s.kicker}>In every issue</div>
          <h2 className={s.h2}>Good news from around the world</h2>
          <p className={s.intro}>
            Real, current, sourced stories of kindness, restoration, and hope.
          </p>
          <div className={s.gnlist}>
            {goodNews.map((g) => (
              <div className={s.gnrow} key={g.headline}>
                <div className={s.gncat}>{g.category}</div>
                <h4>{g.headline}</h4>
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
          <div className={s.prices}>
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`${s.price} ${t.highlighted ? s.featured : ""}`}
              >
                <div className={s.pname}>{t.name}</div>
                <div className={s.pamt}>
                  {t.price}
                  {t.per ? <small>{t.per}</small> : null}
                </div>
                <div className={s.pnote}>{t.note}</div>
                <Link className={s.plink} href={t.href}>
                  {t.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className={s.section}>
        <div className="wrap">
          <div className={s.mission}>
            <h2>{mission.heading}</h2>
            <p>{mission.body}</p>
            <div className={s.verse}>{mission.verse}</div>
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
