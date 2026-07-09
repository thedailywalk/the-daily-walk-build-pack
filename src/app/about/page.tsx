import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Daily Walk helps people find and follow Jesus in a way that feels real, practical, and welcoming — to believers and the curious alike.",
};

const values = [
  {
    title: "Start with Jesus, not Genesis",
    body: "The reading plan opens with who Jesus actually is, then what it means, then how it's lived out — so Scripture clicks before anyone hits the hard parts.",
  },
  {
    title: "Real, not religious",
    body: "Plain English, no jargon, no guilt. Honest prayer and practical application for an ordinary, modern day.",
  },
  {
    title: "Hope built in",
    body: "A daily Good News briefing reminds you that even when the world feels heavy, good is still happening and God is still moving.",
  },
  {
    title: "Never feel behind",
    body: "The Bible-in-a-Year journey starts on your own Day 1. Miss a day? Pick up where you left off — nothing resets on you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="hero sunrise about-hero">
        <div className="wrap">
          <div className="inner">
            <div className="rule" />
            <div className="eyebrow">About</div>
            <h1>Walking with God in real life.</h1>
            <p className="lead">
              The Daily Walk is a daily Christian newsletter that helps people
              strengthen their relationship with Jesus in a way that feels real,
              practical, and relatable to modern life. It&apos;s meant to be
              welcoming and encouraging for both believers and the curious —
              easy to understand wherever you are on the journey.
            </p>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap prose">
          <blockquote>The north star: help people find and follow Jesus.</blockquote>

        <h2>What makes it different</h2>
        <div className="values">
          {values.map((v) => (
            <div className="value" key={v.title}>
              <h4>{v.title}</h4>
              <p>{v.body}</p>
            </div>
          ))}
        </div>

        <h2>The two rhythms</h2>
        <p>
          Everything runs on two rhythms. The <strong>free newsletter</strong>{" "}
          goes out three mornings a week — Monday, Wednesday &amp; Friday — with a
          short devotional, one honest prayer, a Good News story, and the
          Wednesday Pastor&apos;s Take. The{" "}
          <strong>Bible-in-a-Year journey</strong> (for Founding Members) is
          personal and guided: it starts on your Day 1 and walks you through
          Scripture beginning with Jesus, with a plain-English breakdown,
          real-life application, and a reflection question for every day.
        </p>

        <h2>Who&apos;s behind it</h2>
        <p>
          The Daily Walk is created by a small family who love Jesus, with a
          simple goal: to make faith feel clear, honest, and close — and to keep
          the core experience free and accessible for anyone who can&apos;t pay.
          Community access is free for everyone, because no one should have to pay
          to belong.
        </p>

        <h2>Start this week</h2>
        <p>
          Join free and get your first devotional on the next send morning — Mon,
          Wed, or Fri — at 5 AM ET.
        </p>
        <SignupForm />
        </div>
      </section>
    </>
  );
}
