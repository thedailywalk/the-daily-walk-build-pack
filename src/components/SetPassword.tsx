"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

/** Lets a signed-in member set or change their password (for password login). */
export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("saving");
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }
    setStatus("done");
    setMessage("Password saved — you can now sign in with it next time.");
    setPassword("");
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-ghost"
      >
        Set a password (skip the code next time)
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="new-password">
        New password
      </label>
      <input
        id="new-password"
        type="password"
        autoComplete="new-password"
        placeholder="Choose a password (8+ characters)"
        required
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 360,
          padding: "12px 14px",
          borderRadius: 9,
          border: "1px solid var(--line)",
          fontSize: 15,
          fontFamily: "inherit",
          marginBottom: 10,
        }}
      />
      <div>
        <button
          type="submit"
          className="btn btn-gold"
          disabled={status === "saving"}
        >
          {status === "saving" ? "Saving…" : "Save password"}
        </button>
      </div>
      {message && (
        <p
          style={{
            marginTop: 10,
            fontSize: 13,
            color: status === "error" ? "#c0392b" : "var(--green)",
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
