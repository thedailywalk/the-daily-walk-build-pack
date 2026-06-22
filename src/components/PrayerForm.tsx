"use client";

import { useState, type FormEvent } from "react";
import { submitPrayerAction } from "@/app/prayer-wall/actions";
import { MAX_PRAYER_LEN, MAX_NAME_LEN } from "@/lib/prayer-limits";

export default function PrayerForm() {
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    setError("");
    const res = await submitPrayerAction({ body: body.trim(), name: name.trim() });
    setBusy(false);
    if ("error" in res) {
      setError(res.error);
      return;
    }
    setBody("");
    setName("");
    setDone(true);
  }

  if (done) {
    return (
      <div className="prayer-thanks" role="status">
        <div className="prayer-thanks-emoji" aria-hidden="true">
          🙏
        </div>
        <h3>Thank you — your request has been received.</h3>
        <p>
          We read every request before it goes up, so the wall stays kind and
          safe. It&apos;ll appear shortly for the community to pray over.
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setDone(false)}
        >
          Share another request
        </button>
      </div>
    );
  }

  return (
    <form className="prayer-form" onSubmit={onSubmit}>
      <label className="prayer-label" htmlFor="prayer-body">
        What can the community pray for?
      </label>
      <textarea
        id="prayer-body"
        value={body}
        onChange={(e) => setBody(e.target.value.slice(0, MAX_PRAYER_LEN))}
        placeholder="Share what's on your heart…"
        rows={4}
        required
        className="prayer-textarea"
      />
      <div className="prayer-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LEN))}
          placeholder="Your first name (optional)"
          className="prayer-name"
          aria-label="Your first name (optional)"
        />
        <span className="prayer-count-left">
          {MAX_PRAYER_LEN - body.length}
        </span>
        <button type="submit" className="btn btn-gold" disabled={busy}>
          {busy ? "Sharing…" : "Share request"}
        </button>
      </div>
      <p className="prayer-note">
        Leave your name blank to post anonymously. Reviewed before it goes live.
      </p>
      {error && (
        <p className="form-error" role="alert" style={{ color: "#c0392b" }}>
          {error}
        </p>
      )}
    </form>
  );
}
