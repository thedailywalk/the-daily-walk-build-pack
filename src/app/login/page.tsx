"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";
type Step = "form" | "verify";
type VerifyType = "signup" | "email";

const configured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [step, setStep] = useState<Step>("form");
  const [verifyType, setVerifyType] = useState<VerifyType>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  function guard() {
    if (!configured) {
      setError("Sign-in isn't available yet — check back soon.");
      return false;
    }
    return true;
  }

  // Password sign-in or account creation.
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!guard()) return;
    setBusy(true);
    const supabase = createClient();

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setBusy(false);
      if (error) {
        setError(
          "That email and password didn't match. Try again, or use a sign-in code below."
        );
        return;
      }
      window.location.href = "/portal";
      return;
    }

    // signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    // Supabase returns an obfuscated user with empty identities when the email
    // already has an account — no confirmation email is sent. Route them to sign in.
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setMode("signin");
      setError(
        "You already have an account with this email. Sign in below — or use “Email me a sign-in code” if you haven't set a password yet."
      );
      return;
    }
    setVerifyType("signup");
    setStep("verify");
    setInfo("Almost there — enter the code we emailed to confirm your account.");
  }

  // Passwordless / forgot-password: email a one-time code.
  async function emailCode() {
    setError("");
    setInfo("");
    if (!guard()) return;
    if (!email) {
      setError("Enter your email first, then request a code.");
      return;
    }
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setVerifyType("email");
    setStep("verify");
    setInfo(`We emailed a sign-in code to ${email}.`);
  }

  async function verify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code.trim(),
      type: verifyType,
    });
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    window.location.href = "/account";
  }

  return (
    <section>
      <div className="wrap" style={{ maxWidth: 460 }}>
        <div className="sec-tag" style={{ textAlign: "left" }}>
          Members
        </div>
        <h1 style={{ fontSize: 32, color: "var(--navy)", margin: "8px 0 6px" }}>
          {step === "verify"
            ? "Enter your code"
            : mode === "signin"
              ? "Sign in"
              : "Create your account"}
        </h1>

        {step === "form" ? (
          <>
            <p className="muted" style={{ marginBottom: 24 }}>
              {mode === "signin"
                ? "Welcome back. Sign in with your email and password."
                : "Use your email and a password you'll remember."}
            </p>
            <form onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                placeholder={
                  mode === "signin" ? "Your password" : "Choose a password"
                }
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              <button
                type="submit"
                className="btn btn-navy btn-block"
                disabled={busy}
              >
                {busy
                  ? "Working…"
                  : mode === "signin"
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>

            <div style={{ marginTop: 16, fontSize: 14 }}>
              {mode === "signin" ? (
                <button type="button" onClick={() => setMode("signup")} style={linkBtn}>
                  New here? Create an account
                </button>
              ) : (
                <button type="button" onClick={() => setMode("signin")} style={linkBtn}>
                  Already have an account? Sign in
                </button>
              )}
            </div>

            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid var(--line2)",
              }}
            >
              <p className="muted" style={{ fontSize: 13, margin: "0 0 8px" }}>
                No password, or forgot it?
              </p>
              <button
                type="button"
                onClick={emailCode}
                className="btn btn-ghost btn-block"
                disabled={busy}
              >
                Email me a sign-in code instead
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="muted" style={{ marginBottom: 24 }}>
              {info} (Check spam if you don&apos;t see it.)
            </p>
            <form onSubmit={verify}>
              <label className="sr-only" htmlFor="code">
                Sign-in code
              </label>
              <input
                id="code"
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
                {busy ? "Verifying…" : "Verify & continue"}
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setCode("");
                setError("");
                setInfo("");
              }}
              style={{ ...linkBtn, marginTop: 14 }}
            >
              ← Back
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

const linkBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--gold-deep)",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  padding: 0,
};
