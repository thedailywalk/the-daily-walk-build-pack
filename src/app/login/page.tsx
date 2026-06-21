"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Step = "email" | "code";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const configured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function sendCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!configured) {
      setError("Sign-in isn't available yet — check back soon.");
      return;
    }
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setStep("code");
  }

  async function verifyCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code.trim(),
      type: "email",
    });
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    // Full navigation so the server reads the new session cookie.
    window.location.href = "/account";
  }

  return (
    <section>
      <div className="wrap" style={{ maxWidth: 460 }}>
        <div className="sec-tag" style={{ textAlign: "left" }}>
          Members
        </div>
        <h1 style={{ fontSize: 32, color: "var(--navy)", margin: "8px 0 6px" }}>
          Sign in
        </h1>

        {step === "email" ? (
          <>
            <p className="muted" style={{ marginBottom: 24 }}>
              Enter your email and we&apos;ll send you a 6-digit sign-in code —
              no password needed.
            </p>
            <form onSubmit={sendCode}>
              <label className="sr-only" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <button
                type="submit"
                className="btn btn-navy btn-block"
                disabled={busy}
              >
                {busy ? "Sending…" : "Email me a sign-in code"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="muted" style={{ marginBottom: 24 }}>
              We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
              (Check spam if you don&apos;t see it.)
            </p>
            <form onSubmit={verifyCode}>
              <label className="sr-only" htmlFor="login-code">
                6-digit code
              </label>
              <input
                id="login-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="Enter code"
                required
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                style={{
                  ...inputStyle,
                  letterSpacing: "6px",
                  fontSize: 22,
                  textAlign: "center",
                }}
              />
              <button
                type="submit"
                className="btn btn-navy btn-block"
                disabled={busy || code.length < 6}
              >
                {busy ? "Verifying…" : "Verify & sign in"}
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setError("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--gold-deep)",
                fontWeight: 600,
                fontSize: 13,
                marginTop: 14,
                cursor: "pointer",
                padding: 0,
              }}
            >
              ← Use a different email
            </button>
          </>
        )}

        {error && (
          <p className="form-error" role="alert" style={{ color: "#c0392b" }}>
            {error}
          </p>
        )}

        <p className="muted" style={{ marginTop: 22, fontSize: 13 }}>
          New here? <a href="/subscribe">Start free</a> — Premium unlocks the
          guided Bible-in-a-Year journey.
        </p>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 9,
  border: "1px solid var(--line)",
  fontSize: 15,
  fontFamily: "inherit",
  marginBottom: 12,
};
