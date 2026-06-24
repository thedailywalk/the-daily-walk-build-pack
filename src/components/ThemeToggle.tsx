"use client";

import { useEffect, useState } from "react";

const KEY = "tdw-portal-theme";

/**
 * Night-mode switch for the member portal. Toggles a `data-theme` on the portal
 * shell and remembers the choice. Default is the warm "day" reading look; "night"
 * is a calm, low-contrast dark — peaceful, not techy.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("day");

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
