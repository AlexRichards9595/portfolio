"use client";
import { reviewData, type ReviewData } from "@/ExperienceData";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// The ink field + particle glyph: an opening quote mark that morphs into each reviewer's initial.
const InkCanvas = dynamic(() => import("@/components/motion/InkCanvas"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;
const OPEN_QUOTE = "“";

/** The review text with its pull-quote phrase picked out in teal. */
function ReviewText({ review }: { review: ReviewData }) {
  const at = review.review.indexOf(review.highlight);
  if (at < 0) return <>{review.review}</>;
  return (
    <>
      {review.review.slice(0, at)}
      <span className="text-accent">{review.highlight}</span>
      {review.review.slice(at + review.highlight.length)}
    </>
  );
}

function ReviewSection({ review, index, total }: { review: ReviewData; index: number; total: number }) {
  const words = `“${review.highlight}”`.split(" ");
  return (
    <div className="flex min-h-[85svh] flex-col justify-center py-16 lg:min-h-screen">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-xs tracking-[0.25em] text-accent"
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </motion.p>
      <blockquote className="mt-4 font-display text-[2rem] leading-[1.1] text-cream lg:text-5xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease, delay: 0.05 * i }}
          >
            {w}&nbsp;
          </motion.span>
        ))}
      </blockquote>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease, delay: 0.3 }}
        className="mt-7"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-accent/50 bg-accent/10 font-display text-lg text-accent">
            {review.name[0]}
          </span>
          <div>
            <p className="font-display text-xl text-cream">{review.name}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-lightest">
              {review.role} · {review.time}
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/70 lg:text-base">
          <ReviewText review={review} />
        </p>
      </motion.div>
    </div>
  );
}

export default function Reviews() {
  const [active, setActive] = useState(-1); // -1 = intro
  const sections = useRef<(HTMLElement | null)[]>([]);

  // Whichever section crosses the middle of the screen drives the glyph and the rail.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.index))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // The quote mark fizzles away as soon as the intro starts scrolling off.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const intro = sections.current[0];
    if (!intro) return;
    const io = new IntersectionObserver(([e]) => setScrolled(e.intersectionRatio < 0.92), { threshold: [0.92] });
    io.observe(intro);
    return () => io.disconnect();
  }, []);

  // Desktop paging: one wheel gesture / arrow key glides to the next review with an eased
  // animation (CSS scroll-snap felt grabby with trackpad momentum). Phones scroll freely,
  // since some reviews are taller than the screen. On desktop <main> is the scroll container.
  const goRef = useRef<(i: number) => void>(() => undefined);
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const list = () => sections.current.filter(Boolean) as HTMLElement[];
    const topOf = (el: HTMLElement) => main.scrollTop + el.getBoundingClientRect().top - main.getBoundingClientRect().top;
    const current = () => {
      let best = 0, bestD = Infinity;
      list().forEach((el, i) => { const d = Math.abs(topOf(el) - main.scrollTop); if (d < bestD) { bestD = d; best = i; } });
      return best;
    };
    let animating = false, raf = 0;
    const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const goTo = (i: number) => {
      const els = list();
      const el = els[Math.max(0, Math.min(els.length - 1, i))];
      if (!el) return;
      const from = main.scrollTop, to = Math.min(topOf(el), main.scrollHeight - main.clientHeight);
      if (Math.abs(to - from) < 2) return;
      const dur = 650 + Math.min(500, Math.abs(to - from) * 0.25), t0 = performance.now();
      cancelAnimationFrame(raf);
      animating = true;
      const frame = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        main.scrollTop = from + (to - from) * easeInOut(k);
        if (k < 1) raf = requestAnimationFrame(frame); else animating = false;
      };
      raf = requestAnimationFrame(frame);
    };
    goRef.current = (i) => {
      if (mq.matches) goTo(i);
      else sections.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    let acc: number | null = 0, lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      if (!mq.matches || e.ctrlKey) return;
      const dir = Math.sign(e.deltaY);
      if (!dir) return;
      // A section taller than the screen scrolls normally until its edge is reached.
      const el = list()[current()], r = el?.getBoundingClientRect(), mr = main.getBoundingClientRect();
      if (!animating && r && ((dir > 0 && r.bottom > mr.bottom + 4) || (dir < 0 && r.top < mr.top - 4))) return;
      e.preventDefault();
      const now = performance.now(), quiet = now - lastWheel > 200;
      lastWheel = now;
      // Ignore the rest of a gesture (trackpad momentum) once it has triggered a move.
      if (animating || (acc === null && !quiet)) return;
      if (acc === null) acc = 0;
      acc += e.deltaY;
      if (Math.abs(acc) > 30) { goTo(current() + dir); acc = null; }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!mq.matches || (e.target as Element).closest?.("input,textarea")) return;
      const step = ["ArrowDown", "PageDown", " "].includes(e.key) ? 1 : ["ArrowUp", "PageUp"].includes(e.key) ? -1 : 0;
      if (step) { e.preventDefault(); if (!animating) goTo(current() + step); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End") { e.preventDefault(); goTo(list().length - 1); }
    };
    main.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      main.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (i: number) => goRef.current(i + 1);

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0 bg-deep lg:left-[20%]">
        <InkCanvas text={OPEN_QUOTE} layout="quote" count={3200} scatter={scrolled} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-12">
        <section
          ref={(el) => { sections.current[0] = el; }}
          data-index={-1}
          className="pointer-events-none flex min-h-[100svh] flex-col items-center justify-start pb-16 pt-[46svh] text-center lg:min-h-screen lg:pt-[45vh]"
        >
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.4 }}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{"// kind words"}</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.02] text-cream lg:text-7xl">Reviews from coworkers</h1>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-cream/75">
              I&rsquo;ve had the privilege of working alongside and learning from amazing people over the
              years — and I&rsquo;ve worked hard to return the favor. Here&rsquo;s what some of them have to say.
            </p>
          </motion.div>
        </section>

        {reviewData.map((r, i) => (
          <section key={r.name} ref={(el) => { sections.current[i + 1] = el; }} data-index={i}>
            <ReviewSection review={r} index={i} total={reviewData.length} />
          </section>
        ))}
      </div>

      {/* Rail */}
      <nav aria-label="Jump to a review" className="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-[18px] lg:flex">
        <span className="absolute bottom-0 right-1 top-0 w-px bg-lightest/30" />
        {reviewData.map((r, i) => (
          <button
            key={r.name}
            onClick={() => go(i)}
            className={`relative flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${active === i ? "text-lightest" : "text-transparent hover:text-lightest"}`}
          >
            {r.name}
            <i className={`block h-[9px] w-[9px] rounded-full border transition-all ${active === i ? "border-accent bg-accent shadow-[0_0_12px_#7FB7BE]" : "border-lightest bg-deep"}`} />
          </button>
        ))}
      </nav>
    </div>
  );
}
