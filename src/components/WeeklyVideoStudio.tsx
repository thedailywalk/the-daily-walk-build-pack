"use client";

import { useState } from "react";
import {
  selectVideoAction,
  deleteCandidateAction,
  updateCopyAction,
} from "@/app/admin/weekly-video/actions";

export type StudioVideo = {
  id: string;
  videoId: string;
  title: string;
  channelTitle: string;
  duration: string;
  publishedAt: string | null;
  thumbnailUrl: string;
  summary: string;
  topics: string[];
  scriptures: string[];
  theme: string;
  intro: string;
  brandFit: string;
  embeddable: boolean;
  license: string;
  privacyStatus: string;
  safetyStatus: "safe" | "review" | "unsafe";
  safetyNotes: string;
  isSelected: boolean;
};

const SAFETY_LABEL: Record<string, string> = {
  safe: "✓ Safe to embed",
  review: "⚠ Review first",
  unsafe: "✕ Not safe",
};

function watchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
function embedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}

export default function WeeklyVideoStudio({
  candidates,
  weekStart,
}: {
  candidates: StudioVideo[];
  weekStart: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  if (candidates.length === 0) {
    return (
      <p className="muted" style={{ marginTop: 14 }}>
        No candidates for this week yet. Paste a few YouTube links above and
        they&apos;ll be inspected and listed here.
      </p>
    );
  }

  return (
    <div className="wv-grid">
      {candidates.map((v) => (
        <div
          key={v.id}
          className={`wv-card${v.isSelected ? " is-selected" : ""}`}
        >
          {v.isSelected && <div className="wv-feat">★ Featured this week</div>}

          <div className="wv-media">
            {open === v.id ? (
              <div className="wv-frame">
                <iframe
                  src={embedUrl(v.videoId)}
                  title={v.title}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                type="button"
                className="wv-thumb"
                onClick={() => setOpen(v.id)}
                aria-label={`Preview ${v.title}`}
              >
                {v.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnailUrl} alt="" />
                ) : (
                  <span className="wv-thumb-fallback">▶</span>
                )}
                <span className="wv-play">▶ Preview</span>
                {v.duration && <span className="wv-dur">{v.duration}</span>}
              </button>
            )}
          </div>

          <div className="wv-body">
            <div className={`wv-safety wv-${v.safetyStatus}`}>
              {SAFETY_LABEL[v.safetyStatus]}
            </div>
            <h3 className="wv-title">{v.title}</h3>
            <div className="wv-channel">
              {v.channelTitle}
              {v.publishedAt
                ? ` · ${new Date(v.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}`
                : ""}
            </div>

            {v.summary && <p className="wv-summary">{v.summary}</p>}

            {v.topics.length > 0 && (
              <div className="wv-tags">
                {v.topics.map((t) => (
                  <span key={t} className="wv-tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
            {v.scriptures.length > 0 && (
              <div className="wv-scrips">
                {v.scriptures.join(" · ")}
              </div>
            )}
            {v.brandFit && <p className="wv-fit">{v.brandFit}</p>}

            <ul className="wv-signals">
              <li className={v.embeddable ? "ok" : "bad"}>
                {v.embeddable ? "Embedding allowed" : "Embedding disabled"}
              </li>
              <li className={v.privacyStatus === "public" ? "ok" : "bad"}>
                {v.privacyStatus || "unknown"} video
              </li>
              <li className={v.license === "creativeCommon" ? "ok" : "warn"}>
                {v.license === "creativeCommon"
                  ? "Creative Commons"
                  : "Standard YouTube license"}
              </li>
            </ul>
            {v.safetyNotes && <p className="wv-notes">{v.safetyNotes}</p>}

            <div className="wv-actions">
              <a
                href={watchUrl(v.videoId)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm"
              >
                Open ↗
              </a>
              {!v.isSelected && v.safetyStatus !== "unsafe" && (
                <form action={selectVideoAction}>
                  <input type="hidden" name="id" value={v.id} />
                  <input type="hidden" name="weekStart" value={weekStart} />
                  <button type="submit" className="btn btn-gold btn-sm">
                    Feature this week
                  </button>
                </form>
              )}
              <form action={deleteCandidateAction}>
                <input type="hidden" name="id" value={v.id} />
                <input type="hidden" name="weekStart" value={weekStart} />
                <button type="submit" className="btn btn-ghost btn-sm wv-del">
                  Remove
                </button>
              </form>
            </div>

            {v.isSelected && (
              <form action={updateCopyAction} className="wv-edit">
                <input type="hidden" name="id" value={v.id} />
                <input type="hidden" name="weekStart" value={weekStart} />
                <span className="wv-edit-h">Public copy (shown to members)</span>
                <label className="adm-field">
                  <span className="adm-label">Devotional intro</span>
                  <textarea
                    name="intro"
                    defaultValue={v.intro}
                    className="adm-textarea"
                    rows={3}
                  />
                </label>
                <div className="adm-row">
                  <label className="adm-field">
                    <span className="adm-label">Theme</span>
                    <input name="theme" defaultValue={v.theme} className="adm-input" />
                  </label>
                  <label className="adm-field">
                    <span className="adm-label">Scriptures</span>
                    <input
                      name="scriptures"
                      defaultValue={v.scriptures.join(", ")}
                      className="adm-input"
                    />
                  </label>
                </div>
                <button type="submit" className="btn btn-navy btn-sm">
                  Save public copy
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
