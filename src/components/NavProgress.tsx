"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A slim top progress bar that gives instant feedback on navigation: it appears
 * the moment you click an internal link (or hit back/forward), creeps forward
 * while the next page loads, then completes and fades out once the route
 * actually changes. Purely CSS-animated; respects prefers-reduced-motion.
 */
function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = `${pathname}?${searchParams.toString()}`;
  const prevKey = useRef(key);
  const started = useRef(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  // Start on an internal link click (capture phase, before Next handles it) or
  // on browser back/forward.
  useEffect(() => {
    function begin() {
      started.current = true;
      setState("loading");
    }
    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        a.target === "_blank" ||
        a.hasAttribute("download")
      )
        return;
      let dest: URL;
      try {
        dest = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (dest.origin !== window.location.origin) return;
      // Same page (only a hash change) — no navigation, no bar.
      if (
        dest.pathname === window.location.pathname &&
        dest.search === window.location.search
      )
        return;
      begin();
    }
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", begin);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", begin);
    };
  }, []);

  // Complete when the route actually changes.
  useEffect(() => {
    if (key === prevKey.current) return;
    prevKey.current = key;
    if (!started.current) return;
    started.current = false;
    setState("done");
    const t = window.setTimeout(() => setState("idle"), 450);
    return () => window.clearTimeout(t);
  }, [key]);

  return <div className={`navprog navprog-${state}`} aria-hidden="true" />;
}

export default function NavProgress() {
  return (
    <Suspense fallback={null}>
      <ProgressBar />
    </Suspense>
  );
}
