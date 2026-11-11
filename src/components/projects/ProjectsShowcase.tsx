"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DEFAULT_THEME, showcaseItems, type FloodTheme, type ShowcaseItem } from "./showcase";

const ShowcaseStage = dynamic(() => import("./ShowcaseStage"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;
const HOVER_DELAY = 180; // hover intent: ignore cards the cursor only sweeps across
const LEAVE_DELAY = 260;
const tabs = [
  { value: "wild", label: "In the Wild" },
  { value: "works", label: "In the Works" },
] as const;

const rgba = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};
const themeVars = (t: FloodTheme) =>
  ({
    "--pf-fg": t.fg, "--pf-muted": t.muted, "--pf-acc": t.acc, "--pf-onacc": t.onacc, "--pf-panel": t.panel, "--pf-line": rgba(t.fg, 0.2),
  }) as React.CSSProperties;

const idleCaption = (tab: "wild" | "works") => ({
  eyebrow: tab === "wild" ? `${showcaseItems.filter((i) => i.tab === "wild").length} shipped · ${showcaseItems.filter((i) => i.tab === "works").length} in the works` : "ideas on the drafting table",
  name: "Pick a project",
  tagline: "Hover one and the page takes on its colors.",
});

export default function ProjectsShowcase() {
  const [tab, setTab] = useState<"wild" | "works">("wild");
  const [active, setActiveState] = useState<ShowcaseItem | null>(null);
  const activeRef = useRef<ShowcaseItem | null>(null);
  const setActive = (item: ShowcaseItem | null) => { activeRef.current = item; setActiveState(item); };
  const [theme, setTheme] = useState<FloodTheme>(DEFAULT_THEME);
  const floodRef = useRef<HTMLDivElement>(null);
  const hoverT = useRef(0), leaveT = useRef(0);
  const reduce = useRef(false);
  useEffect(() => { reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);

  // Paint a new flood layer from (x, y); older layers are removed once it covers them.
  const flood = useCallback((t: FloodTheme, x: number, y: number) => {
    setTheme(t);
    const host = floodRef.current;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const layer = document.createElement("div");
    const at = `${x - r.left}px ${y - r.top}px`;
    layer.style.cssText = `position:absolute;inset:0;background:radial-gradient(1200px 800px at 25% 35%, ${t.panel}, ${t.bg} 70%);clip-path:circle(0px at ${at});transition:clip-path 1s cubic-bezier(.7,0,.2,1)`;
    host.appendChild(layer);
    const full = `circle(150vmax at ${at})`;
    if (reduce.current) layer.style.clipPath = full;
    else requestAnimationFrame(() => requestAnimationFrame(() => (layer.style.clipPath = full)));
    window.setTimeout(() => { while (layer.previousElementSibling) layer.previousElementSibling.remove(); }, reduce.current ? 0 : 1050);
  }, []);

  useEffect(() => {
    const host = floodRef.current;
    if (host && !host.children.length) {
      const base = document.createElement("div");
      base.style.cssText = `position:absolute;inset:0;background:radial-gradient(1200px 800px at 25% 35%, ${DEFAULT_THEME.panel}, ${DEFAULT_THEME.bg} 70%)`;
      host.appendChild(base);
    }
    return () => { window.clearTimeout(hoverT.current); window.clearTimeout(leaveT.current); };
  }, []);

  const select = (item: ShowcaseItem, el: HTMLElement) => {
    window.clearTimeout(leaveT.current);
    if (activeRef.current?.key === item.key) return;
    setActive(item);
    const r = el.getBoundingClientRect();
    flood(item.theme, r.left + r.width * 0.2, r.top + r.height / 2);
  };

  const intend = (item: ShowcaseItem, el: HTMLElement) => {
    window.clearTimeout(hoverT.current); window.clearTimeout(leaveT.current);
    hoverT.current = window.setTimeout(() => select(item, el), activeRef.current ? HOVER_DELAY * 0.8 : HOVER_DELAY);
  };
  const leave = (x: number, y: number) => {
    window.clearTimeout(hoverT.current); window.clearTimeout(leaveT.current);
    leaveT.current = window.setTimeout(() => {
      if (!activeRef.current) return;
      setActive(null);
      flood(DEFAULT_THEME, x, y);
    }, LEAVE_DELAY);
  };

  const switchTab = (next: "wild" | "works", e: React.MouseEvent) => {
    if (next === tab) return;
    window.clearTimeout(hoverT.current);
    setTab(next);
    if (activeRef.current) flood(DEFAULT_THEME, e.clientX, e.clientY);
    setActive(null);
  };

  // ── Mobile: a swipeable card rail; whichever card settles in the middle takes over the page ──
  const [isMobile, setIsMobile] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef(select);
  selectRef.current = select;
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const rail = railRef.current;
    if (!isMobile || !rail) return;
    const pickCentered = () => {
      const r = rail.getBoundingClientRect(), cx = r.left + r.width / 2;
      let best: HTMLElement | null = null, bestD = Infinity;
      rail.querySelectorAll<HTMLElement>("[data-key]").forEach((el) => {
        const b = el.getBoundingClientRect(), d = Math.abs(b.left + b.width / 2 - cx);
        if (d < bestD) { bestD = d; best = el; }
      });
      const el = best as HTMLElement | null;
      const item = el && showcaseItems.find((i) => i.key === el.dataset.key);
      if (el && item) selectRef.current(item, el);
    };
    let t = 0;
    const onScroll = () => { window.clearTimeout(t); t = window.setTimeout(pickCentered, 140); };
    rail.scrollTo({ left: 0 });
    rail.addEventListener("scroll", onScroll, { passive: true });
    const first = window.setTimeout(pickCentered, 900);
    return () => { rail.removeEventListener("scroll", onScroll); window.clearTimeout(t); window.clearTimeout(first); };
  }, [isMobile, tab]);

  const cap = active ? { eyebrow: `${active.tab === "wild" ? "In the wild" : "In the works"} · ${active.project.time}`, name: active.project.name, tagline: active.tagline } : idleCaption(tab);
  const list = showcaseItems.filter((i) => i.tab === tab);
  const activeIndex = list.findIndex((i) => i.key === active?.key);

  return (
    <div
      className="relative min-h-screen overflow-x-clip text-[color:var(--pf-fg)] lg:h-screen lg:min-h-0 lg:overflow-hidden"
      style={{ ...themeVars(theme), transition: "--pf-fg .7s, --pf-muted .7s, --pf-acc .7s, --pf-onacc .7s, --pf-panel .7s, --pf-line .7s" } as React.CSSProperties}
    >
      <div ref={floodRef} aria-hidden className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-0 lg:left-[20%] lg:top-0" />

      <div className="relative z-10 mx-auto flex h-[100dvh] min-h-[520px] max-w-6xl flex-col gap-4 px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-6 lg:grid lg:h-screen lg:min-h-0 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-6 lg:py-10">
        {/* Copy */}
        <header className="lg:col-start-2 lg:row-start-1">
          <p className="pr-14 pt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--pf-acc)] lg:pr-0 lg:pt-0 lg:text-xs">{"// personal projects"}</p>
          <h1 className="mt-2 font-display text-[2.1rem] leading-[1.02] lg:text-5xl 2xl:text-6xl">Built for the <span className="lg:block">love of it</span></h1>
          <p className="mt-3 hidden max-w-xl leading-relaxed text-[color:var(--pf-muted)] lg:block">
            Sometimes I build things for the pure love of the game — to help out some friends, or to solve one of my own problems.
          </p>
          <div className="mt-4 inline-flex rounded-full border border-[color:var(--pf-line)] bg-[color:color-mix(in_srgb,var(--pf-panel)_70%,transparent)] p-1 lg:mt-7">
            {tabs.map((t) => (
              <button
                key={t.value}
                onClick={(e) => switchTab(t.value, e)}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors ${tab === t.value ? "text-[color:var(--pf-onacc)]" : "text-[color:var(--pf-muted)] hover:text-[color:var(--pf-fg)]"}`}
              >
                {tab === t.value && (
                  <motion.span layoutId="proj-tab" className="absolute inset-0 -z-10 rounded-full bg-[color:var(--pf-acc)]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {/* Showcase */}
        <div className="relative -mx-3 flex min-h-[160px] flex-1 flex-col lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:h-full lg:flex-none">
          <div className="relative min-h-0 flex-1">
            <ShowcaseStage items={showcaseItems} tab={tab} selected={active?.key ?? null} defaultAccent={DEFAULT_THEME.acc} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.key ?? `idle-${tab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease }}
              className="hidden px-1 pt-2 lg:block lg:min-h-[112px]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--pf-acc)]">{cap.eyebrow}</p>
              <p className="mt-2 font-display text-3xl leading-tight lg:text-4xl">{cap.name}</p>
              <p className="mt-1.5 max-w-xl text-[15px] leading-normal text-[color:var(--pf-muted)]">{cap.tagline}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cards: a snap rail on mobile, a stacked list on desktop */}
        <div className="lg:no-scrollbar lg:col-start-2 lg:row-start-2 lg:-mx-4 lg:min-h-0 lg:overflow-y-auto lg:px-4 lg:py-3 lg:[mask-image:linear-gradient(to_bottom,transparent,#000_20px,#000_calc(100%-40px),transparent)]">
          <div
            ref={railRef}
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 lg:[perspective:1200px]"
          >
            <AnimatePresence mode="popLayout">
              {list.map((item, i) => (
                <motion.div
                  key={item.key}
                  data-key={item.key}
                  initial={{ opacity: 0, y: 24, rotateX: -8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease, delay: 0.06 + i * 0.1 }}
                  className="w-[86%] shrink-0 snap-center sm:w-[70%] lg:w-auto"
                >
                  <ProjectCard
                    item={item}
                    hot={active?.key === item.key}
                    onEnter={(el, pointerType) => pointerType === "mouse" && intend(item, el)}
                    onLeave={(x, y, pointerType) => pointerType === "mouse" && leave(x, y)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {/* Position dots (mobile) */}
          <div className="mt-3 flex justify-center gap-2 lg:hidden">
            {list.map((item, i) => (
              <button
                key={item.key}
                aria-label={`Show ${item.project.name}`}
                onClick={() => railRef.current?.querySelector<HTMLElement>(`[data-key="${CSS.escape(item.key)}"]`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })}
                className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex ? "w-6 bg-[color:var(--pf-acc)]" : "w-2 bg-[color:var(--pf-line)]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  item,
  hot,
  onEnter,
  onLeave,
}: {
  item: ShowcaseItem;
  hot: boolean;
  onEnter: (el: HTMLElement, pointerType: string) => void;
  onLeave: (x: number, y: number, pointerType: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLSpanElement>(null);
  const p = item.project;

  const body = (
    <div
      ref={ref}
      onPointerEnter={(e) => { if (ref.current) onEnter(ref.current, e.pointerType); }}
      onPointerLeave={(e) => {
        onLeave(e.clientX, e.clientY, e.pointerType);
        if (ref.current) ref.current.style.transform = "";
        if (glare.current) glare.current.style.background = "transparent";
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ref.current.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 9}deg) rotateY(${(px - 0.5) * 11}deg)`;
        if (glare.current) glare.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.14), transparent 55%)`;
      }}
      className={`relative h-full rounded-[20px] border bg-[color:color-mix(in_srgb,var(--pf-panel)_88%,transparent)] px-4 pb-4 pt-4 lg:px-5 lg:pt-5 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.6)] transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:duration-100 ${
        hot ? "border-[color:var(--pf-acc)]" : "border-[color:var(--pf-line)]"
      } ${item.tab === "works" ? "border-dashed" : ""}`}
    >
      <span ref={glare} aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" />
      <div className="flex flex-col-reverse items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-[1.4rem] leading-tight lg:text-2xl">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full ring-[3px] ring-[color:color-mix(in_srgb,var(--pf-fg)_12%,transparent)]" style={{ background: item.theme.acc }} />
          {p.name}
          {item.href && <span aria-hidden className="text-[color:var(--pf-acc)] transition-transform duration-300 group-hover:translate-x-1">→</span>}
        </h2>
        <span className="whitespace-nowrap font-mono text-[11px] tracking-wide text-[color:var(--pf-muted)]">{p.time}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-[14px] lg:mt-2.5 lg:line-clamp-3 lg:text-[14.5px] leading-relaxed text-[color:color-mix(in_srgb,var(--pf-fg)_80%,transparent)]">{p.description}</p>
      {p.technologies.length > 0 && (
        <div className="mt-3.5 hidden flex-wrap gap-1.5 lg:flex">
          {p.technologies.map((t) => (
            <span key={t} className="rounded-full border border-[color:var(--pf-line)] px-2.5 py-1 font-mono text-[11px] text-[color:var(--pf-muted)]">{t}</span>
          ))}
        </div>
      )}
    </div>
  );

  if (!item.href) return <div className="group h-full">{body}</div>;
  return (
    <Link
      href={item.href}
      className="group block h-full"
      data-wipe-color={item.theme.bg}
      data-wipe-accent={item.theme.acc}
    >
      {body}
    </Link>
  );
}
