"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const COVER_MS = 700;
// Routes that share the desktop sidebar layout. Between two of these the curtain
// covers only the content area so the nav stays put.
const SIDEBAR_ROUTES = new Set(["/", "/about", "/work", "/reviews", "/projects"]);
const hasSidebar = (path: string) => SIDEBAR_ROUTES.has(path.replace(/\/$/, "") || "/");

/**
 * Full-screen "drench" wipe between routes. Intercepts same-origin link clicks
 * (in the capture phase, so next/link sees the event as handled), slides a curtain
 * up over the page, navigates, then slides it away once the new route renders.
 *
 * A link can tint the curtain with `data-wipe-color` / `data-wipe-accent`, or opt
 * out with `data-no-wipe`.
 */
export default function PageWipe() {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (reduce.matches || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download") || "noWipe" in a.dataset) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      e.preventDefault();
      const keepNav = window.matchMedia("(min-width: 1024px)").matches && hasSidebar(window.location.pathname) && hasSidebar(url.pathname);
      el.style.left = keepNav ? "20%" : "0";
      el.style.setProperty("--wipe", a.dataset.wipeColor ?? "#472D2D");
      el.style.setProperty("--wipe-accent", a.dataset.wipeAccent ?? "#7FB7BE");
      el.classList.add("notrans");
      el.dataset.state = "idle";
      void el.offsetWidth;
      el.classList.remove("notrans");
      el.dataset.state = "cover";
      pending.current = true;
      window.setTimeout(() => router.push(url.pathname + url.search + url.hash), COVER_MS);
      // Never leave the curtain stuck if navigation fails.
      window.setTimeout(() => {
        if (pending.current) reveal();
      }, COVER_MS + 4000);
    };

    const reveal = () => {
      pending.current = false;
      el.dataset.state = "out";
    };
    const onEnd = () => {
      if (el.dataset.state === "out") {
        el.classList.add("notrans");
        el.dataset.state = "idle";
      }
    };

    document.addEventListener("click", onClick, true);
    el.addEventListener("transitionend", onEnd);
    (el as HTMLDivElement & { reveal?: () => void }).reveal = reveal;
    return () => {
      document.removeEventListener("click", onClick, true);
      el.removeEventListener("transitionend", onEnd);
    };
  }, [router]);

  // The new route has rendered: pull the curtain away.
  useEffect(() => {
    const el = ref.current as (HTMLDivElement & { reveal?: () => void }) | null;
    if (!el || !pending.current) return;
    const id = window.requestAnimationFrame(() => window.requestAnimationFrame(() => el.reveal?.()));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div ref={ref} className="page-wipe" data-state="idle" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-mark.png" alt="" className="h-auto w-24 opacity-90" />
    </div>
  );
}
