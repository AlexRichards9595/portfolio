"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import CopiableEmail from "@/components/CopiableEmail";

const ease = [0.22, 1, 0.36, 1] as const;
const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/projects", label: "Projects" },
];

/** Mobile-only top bar: frosted, shows where you are, and opens a full-screen menu. */
const Header = () => {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState("calc(100% - 28px) 28px");
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close on navigation and on Escape; lock page scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const toggle = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setOrigin(`${r.left + r.width / 2}px ${r.top + r.height / 2}px`);
    setOpen((o) => !o);
  };

  return (
    <>
      {/* Transparent: just the menu button, floating over the page */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex h-16 items-center justify-end px-4 pt-[env(safe-area-inset-top)] lg:hidden">
        <button
          ref={btnRef}
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="pointer-events-auto relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-deep/50 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <motion.span
            className="absolute h-[1.5px] w-[18px] rounded-full bg-cream"
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
            transition={{ duration: 0.35, ease }}
          />
          <motion.span
            className="absolute h-[1.5px] rounded-full bg-cream"
            animate={open ? { rotate: -45, y: 0, width: 18, x: 0 } : { rotate: 0, y: 3.5, width: 12, x: 3 }}
            transition={{ duration: 0.35, ease }}
          />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: `circle(0px at ${origin})` }}
            animate={{ clipPath: `circle(150vmax at ${origin})` }}
            exit={{ clipPath: `circle(0px at ${origin})`, transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-deep px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-20 lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture opacity-60" />
            <div aria-hidden className="pointer-events-none absolute inset-0 aura" />
            <Link href="/" onClick={() => setOpen(false)} className="absolute left-6 top-[calc(14px+env(safe-area-inset-top))] flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-white/5 ring-1 ring-white/10">
                <Image src="/brand/logo-mark.png" className="h-5 w-6 object-contain" width={640} height={409} alt="" />
              </span>
              <span className="font-display text-lg text-cream">Alex Richards</span>
            </Link>

            <nav className="relative flex flex-col">
              {links.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <div key={l.href} className="overflow-hidden border-b border-white/[0.07]">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease, delay: 0.18 + i * 0.06 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-3.5"
                      >
                        <span className={`font-mono text-xs ${active ? "text-accent" : "text-lightest/60"}`}>0{i + 1}</span>
                        <span className={`font-display text-[2.6rem] leading-none ${active ? "italic text-accent" : "text-cream"}`}>{l.label}</span>
                        {active && <span className="ml-auto mr-3 h-2 w-2 self-center rounded-full bg-accent shadow-[0_0_12px_#7FB7BE]" />}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="relative mt-auto pt-10"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Available for work
              </span>
              <div className="mt-5 flex items-center justify-between">
                <a
                  href="/Alexander_Richards_Resume.pdf"
                  download="Alexander_Richards_Resume.pdf"
                  className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-deep"
                >
                  Résumé ↓
                </a>
                <div className="flex items-center gap-5">
                  <CopiableEmail imgClassName="h-6 w-6" />
                  <Link href="https://www.linkedin.com/in/alexrichards9595/" target="_blank" aria-label="LinkedIn" className="opacity-70">
                    <Image className="h-6 w-6" src="/icon-linkedin.png" alt="LinkedIn" width={50} height={50} />
                  </Link>
                  <Link href="https://github.com/AlexRichards9595" target="_blank" aria-label="GitHub" className="opacity-70">
                    <Image className="h-6 w-6" src="/icon-github.png" alt="GitHub" width={50} height={50} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
