"use client";

import { useMemo, useState } from "react";
import { saveLibraryItemAction } from "@/app/admin/library/actions";
import {
  detectTopics,
  detectScriptures,
  suggestVersesForTopics,
  composeWhy,
} from "@/lib/scripture";

export default function InstagramCapture({ topics }: { topics: string[] }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [transcript, setTranscript] = useState("");
  const [why, setWhy] = useState("");
  const [scriptures, setScriptures] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const text = `${title}\n${caption}\n${transcript}`;

  const suggestions = useMemo(() => {
    const t = detectTopics(text, topics);
    const refs = detectScriptures(text);
    const verses = suggestVersesForTopics(t, 10);
    return { topics: t, refs, verses };
  }, [text, topics]);

  function applySuggestions() {
    setSelected((prev) => {
      const next = new Set(prev);
      suggestions.topics.forEach((t) => next.add(t));
      return next;
    });
    if (!scriptures.trim() && suggestions.refs.length) {
      setScriptures(suggestions.refs.join(", "));
    }
    if (!title.trim() && caption.trim()) {
      setTitle(caption.trim().split(/[\n.!?]/)[0].slice(0, 70));
    }
    if (!why.trim()) setWhy(composeWhy(suggestions.topics));
  }

  function addScripture(ref: string) {
    setScriptures((s) => {
      const arr = s.split(/[,\n]+/).map((x) => x.trim()).filter(Boolean);
      if (!arr.includes(ref)) arr.push(ref);
      return arr.join(", ");
    });
  }

  function toggle(topic: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }

  const body = [
    link.trim() && `Instagram: ${link.trim()}`,
    caption.trim() && `Caption:\n${caption.trim()}`,
    transcript.trim() && `Transcript:\n${transcript.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return (
    <form action={saveLibraryItemAction} className="adm-form ig-capture">
      {/* fields the existing save action expects */}
      <input type="hidden" name="kind" value="newsletter inspiration" />
      <input type="hidden" name="source" value="Instagram" />
      <input type="hidden" name="existingMediaPath" value="" />
      <input type="hidden" name="body" value={body} />
      {Array.from(selected).map((t) => (
        <input key={t} type="hidden" name="topics" value={t} />
      ))}
      <input type="hidden" name="scriptures" value={scriptures} />

      <label className="adm-field">
        <span className="adm-label">Instagram link</span>
        <input
          name="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="adm-input"
          placeholder="https://www.instagram.com/reel/…"
        />
      </label>

      <div className="ig-two">
        <label className="adm-field">
          <span className="adm-label">Caption (paste from the post)</span>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="adm-textarea"
            rows={5}
          />
        </label>
        <label className="adm-field">
          <span className="adm-label">
            Transcript (paste — reels have built-in auto-captions you can copy)
          </span>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="adm-textarea"
            rows={5}
          />
        </label>
      </div>

      <label className="adm-field">
        <span className="adm-label">
          Screenshot / image (optional · up to 4MB)
        </span>
        <input
          name="file"
          type="file"
          accept="image/*"
          className="adm-input lib-file"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setImgPreview(f ? URL.createObjectURL(f) : null);
          }}
        />
      </label>
      {imgPreview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgPreview} alt="Screenshot preview" className="lib-media-img" />
      )}

      <div className="ig-suggest">
        <button type="button" className="btn btn-gold" onClick={applySuggestions}>
          ✨ Suggest category &amp; tags
        </button>
        {suggestions.topics.length > 0 && (
          <span className="ig-suggest-hint">
            Detected: {suggestions.topics.join(", ")}
            {suggestions.refs.length ? ` · ${suggestions.refs.join(", ")}` : ""}
          </span>
        )}
      </div>

      <label className="adm-field">
        <span className="adm-label">Title</span>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="adm-input"
          placeholder="A line that names this clip"
        />
      </label>

      <label className="adm-field">
        <span className="adm-label">Categories (accept, add, or remove)</span>
        <div className="lib-checks">
          {topics.map((t) => (
            <label key={t} className={`lib-check${selected.has(t) ? " ig-on" : ""}`}>
              <input
                type="checkbox"
                checked={selected.has(t)}
                onChange={() => toggle(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </label>

      <label className="adm-field">
        <span className="adm-label">Scriptures (auto-detected; edit freely)</span>
        <input
          value={scriptures}
          onChange={(e) => setScriptures(e.target.value)}
          className="adm-input"
          placeholder="John 3:16, Psalm 23"
        />
      </label>

      {suggestions.verses.length > 0 && (
        <div className="smart-verses">
          <span className="adm-label" style={{ display: "block", marginBottom: 6 }}>
            {suggestions.refs.length
              ? "More related verses — tap to add:"
              : "No verse mentioned — related verses you can attach:"}
          </span>
          <div className="lib-tags">
            {suggestions.verses.map((v) => (
              <button
                key={v.ref}
                type="button"
                className="smart-chip"
                title={v.text}
                onClick={() => addScripture(v.ref)}
              >
                + {v.ref}
              </button>
            ))}
          </div>
        </div>
      )}

      <label className="adm-field">
        <span className="adm-label">Why I saved it / how it might inspire a devotional</span>
        <textarea
          name="why"
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          className="adm-textarea"
          rows={3}
        />
      </label>

      <div className="adm-actions">
        <button type="submit" className="btn btn-gold">
          Save to library
        </button>
      </div>
      <p className="adm-refs-foot">
        Saved for backend research + inspiration only — never auto-published. If a
        clip shapes a devotional, it&apos;s written in original wording and shows
        in the issue&apos;s &ldquo;References Used&rdquo; panel.
      </p>
    </form>
  );
}
