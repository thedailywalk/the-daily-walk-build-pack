"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label = "Copy email HTML",
}: {
  text: string;
  label?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard blocked */
        }
      }}
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}
