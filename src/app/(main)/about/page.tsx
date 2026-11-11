"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import CopiableEmail from "@/components/CopiableEmail";
import Magnetic from "@/components/motion/Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;
const stack = [
  "React", "Next.js", "TypeScript", "React Native", "Expo", "GraphQL",
  "Node", "Supabase", "Prisma", "Angular", "Python", "Go",
];
const stats: { value: number; suffix: string; label: string }[] = [
  { value: 8, suffix: "+", label: "Years building" },
  { value: 5, suffix: "", label: "Companies" },
  { value: 6, suffix: "", label: "Personal projects" },
];

/** Counts up from 0 the first time it scrolls into view. */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, { duration: 1.4, ease, onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`) });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/** Portrait that tilts toward the cursor, revealed with a clip-path wipe. */
function Portrait() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  const ix = useSpring(useTransform(mx, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 18 });
  const iy = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 18 });
  return (
    <motion.div
      className="relative [perspective:1000px]"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-light/40 shadow-lift lg:aspect-[3/4]"
      >
        <motion.div style={{ x: ix, y: iy }} className="absolute -inset-6">
          <Image
            src="/landing-image.jpg"
            alt="Alex Richards in the mountains"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[82%_50%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep/50 via-transparent to-transparent" />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-12 pt-20 lg:px-12 lg:py-16">
      <section className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Portrait />
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
          >
            {"// about me"}
          </motion.p>
          <h1 className="mt-3 overflow-hidden font-display text-5xl leading-[1.02] text-cream lg:text-7xl">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.35 }}
            >
              Hi, I&rsquo;m Alex.
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="mt-6 text-lg leading-relaxed text-cream/80"
          >
            I like travelling more than working. But when I do work, I love building beautiful,
            valuable web and mobile applications — and I&rsquo;m pretty good at it, too. From private
            jets to social services, I&rsquo;ve shipped elegant products at companies like United,
            Ford, and NetJets. Poke around and see for yourself.
          </motion.p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.6 + 0.08 * i }}
                className="rounded-2xl border border-light/40 bg-secondary/60 px-4 py-4"
              >
                <p className="font-display text-3xl text-accent lg:text-4xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-lightest lg:text-[11px]">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link href="/work" className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-deep">
                See where I&rsquo;ve worked →
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="/Alexander_Richards_Resume.pdf"
                download="Alexander_Richards_Resume.pdf"
                className="inline-flex rounded-full border border-cream/25 bg-white/5 px-6 py-3 text-sm font-semibold text-cream"
              >
                Résumé ↓
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-5">
              <CopiableEmail imgClassName="h-6 w-6" />
              <Link href="https://www.linkedin.com/in/alexrichards9595/" target="_blank" aria-label="LinkedIn" className="opacity-70 transition hover:scale-110 hover:opacity-100">
                <Image className="h-6 w-6" src="/icon-linkedin.png" alt="LinkedIn" width={50} height={50} />
              </Link>
              <Link href="https://github.com/AlexRichards9595" target="_blank" aria-label="GitHub" className="opacity-70 transition hover:scale-110 hover:opacity-100">
                <Image className="h-6 w-6" src="/icon-github.png" alt="GitHub" width={50} height={50} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-light/30 bg-deep/40 py-4">
          <div className="mask-fade-x flex w-max animate-marquee gap-3 pl-3">
            {[...stack, ...stack].map((t, i) => (
              <span key={i} className="whitespace-nowrap rounded-full border border-light/50 px-4 py-1.5 font-mono text-xs text-lightest">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
