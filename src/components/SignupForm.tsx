"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupForm({
  variant = "default",
  buttonLabel = "Start free →",
}: {
  /** "hero" tweaks error text color for the dark hero background. */
  variant?: "default" | "hero";
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(
          data.message ??
            "🎉 You're in! Your first devotional lands on our next send morning (Mon · Wed · Fri) at 5:00 AM ET."
        );
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="signup" role="status" aria-live="polite">
        <div className="form-success">{message}</div>
      </div>
    );
  }

  return (
    <form className="signup" onSubmit={onSubmit} noValidate>
      <label className="sr-only" htmlFor={`email-${variant}`}>
        Email address
      </label>
      <input
        id={`email-${variant}`}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="Your email address"
        aria-label="Email address"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="btn btn-gold"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Joining…" : buttonLabel}
      </button>
      {status === "error" && (
        <div className="form-error" role="alert">
          {message}
        </div>
      )}
    </form>
  );
}
