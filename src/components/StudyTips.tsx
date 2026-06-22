"use client";

import { useEffect, useState } from "react";
import { studyTips } from "@/lib/studyTips";

/** Compact rotating "how to study" carousel for the member portal. */
export default function StudyTips() {
  const n = studyTips.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % n), 8000);
    return () => clearInterval(id);
  }, [paused, n]);

  const go = (d: number) => setI((p) => (p + d + n) % n);
  const t = studyTips[i];

  return (
    <div
      className="tipx"
      aria-roledescription="carousel"
      aria-label="How to study"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="tipx-head">
        <span className="tipx-tag">📖 How to study</span>
        <div className="tipx-ctrls">
          <button
            type="button"
            className="tipx-arrow"
            onClick={() => go(-1)}
            aria-label="Previous tip"
          >
            ‹
          </button>
          <div className="tipx-dots">
            {studyTips.map((_, k) => (
              <button
                key={k}
                type="button"
                className={`tipx-dot${k === i ? " on" : ""}`}
                onClick={() => setI(k)}
                aria-label={`Tip ${k + 1} of ${n}`}
                aria-current={k === i}
              />
            ))}
          </div>
          <button
            type="button"
            className="tipx-arrow"
            onClick={() => go(1)}
            aria-label="Next tip"
          >
            ›
          </button>
        </div>
      </div>
      <div className="tipx-body">
        <span className="tipx-ic" aria-hidden="true">
          {t.icon}
        </span>
        <p className="tipx-text">
          <strong>{t.title}.</strong> {t.body}
          {t.link && (
            <>
              {" "}
              <a href={t.link.href} target="_blank" rel="noopener noreferrer">
                {t.link.label}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </div>
  );
}
