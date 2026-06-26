"use client";

import { useEffect, useState } from "react";

// Bumped to -v2 so the new Inner Circle (night) default takes effect for
// everyone — old "day" preferences saved under the previous key are ignored.
const KEY = "tdw-portal-theme-v2";

/**
 * Theme switch for the member portal. Toggles a `data-theme` on the portal
 * shell and remembers the choice. Default is the elevated "night" Inner Circle
 * look; "day" is a clean light reading mode.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("night");

  // Load saved preference on mount.
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem(KEY)) as
      | "day"
      | "night"
      | null;
    if (saved === "night" || saved === "day") setTheme(saved);
  }, []);

  // Reflect the theme on the shell + persist.
  useEffect(() => {
    const shell = document.querySelector(".member-shell");
    if (shell) shell.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {}
  }, [theme]);

  const night = theme === "night";
  return (
    <button
      type="button"
      className="m-theme"
      onClick={() => setTheme(night ? "day" : "night")}
      aria-pressed={night}
      title={night ? "Switch to day mode" : "Switch to night mode"}
    >
      <span className={`m-theme-opt${!night ? " on" : ""}`} aria-hidden="true">
        ☀ Day
      </span>
      <span className={`m-theme-opt${night ? " on" : ""}`} aria-hidden="true">
        ☾ Night
      </span>
    </button>
  );
}
