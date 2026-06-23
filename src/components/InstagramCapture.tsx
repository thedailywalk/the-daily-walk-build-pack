"use client";

import { useMemo, useState } from "react";
import { saveLibraryItemAction } from "@/app/admin/library/actions";

/** Live topic hints from pasted text (client-side, no external calls). */
const TOPIC_HINTS: Record<string, RegExp> = {
  Faith: /\bfaith|believe|trust god|gospel\b/i,
  Prayer: /\bpray|prayer|interced/i,
  Healing: /\bheal|healing|wound|restore|broken\b/i,
  Anger: /\banger|angry|rage|wrath\b/i,
  Love: /\blove|loved|loving|beloved\b/i,
  Forgiveness: /\bforgiv|mercy|pardon|grace\b/i,
  Discipline: /\bdiscipline|self-control|habit|consistent\b/i,
  Identity: /\bidentity|who you are|child of god|image of god|your worth\b/i,
  "Spiritual Warfare": /\barmor|the enemy|devil|satan|temptation|warfare|spiritual battle\b/i,
  Wisdom: /\bwisdom|wise|discern|foolish\b/i,
  Relationships: /\bfriend|marriage|relationship|family|community\b/i,
  Anxiety: /\banxi|worry|worried|afraid|fear|peace\b/i,
  Grief: /\bgrief|griev|mourn|loss|weep|sorrow|tears\b/i,
  Purpose: /\bpurpose|calling|called|mission|destiny\b/i,
  Obedience: /\bobey|obedience|surrender|submit\b/i,
  Confidence: /\bconfidence|courage|bold|strength|fearless\b/i,
  "Bible Study": /\bverse|scripture|chapter|passage|study the word\b/i,
  Testimonies: /\btestimony|my story|saved me|set me free|turned my life|delivered\b/i,
  Holidays: /\bchristmas|easter|thanksgiving|good friday|advent|lent|resurrection\b/i,
  "Visual Inspiration": /\bart|design|aesthetic|visual\b/i,
};

const SCRIPTURE_RE =
  /\b(?:[1-3]\s)?[A-Z][a-z]+(?:\sof\s[A-Z][a-z]+)?\s\d{1,3}:\d{1,3}(?:[-–]\d{1,3})?\b/g;

export default function InstagramCapture({ topics }: { topics: string[] }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [transcript, setTranscript] = useState("");
  const [why, setWhy] = useState("");
  const [scriptures, setScriptures] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const text = `${caption}\n${transcript}`;

  const suggestions = useMemo(() => {
    const t = topics.filter((topic) => TOPIC_HINTS[topic]?.test(text));
    const refs = Array.from(new Set(text.match(SCRIPTURE_RE) ?? []));
    return { topics: t, refs };
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
