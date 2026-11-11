"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";

// WebGL only on the client, and not on the critical path for first paint.
const InkCanvas = dynamic(() => import("@/components/motion/InkCanvas"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;
const tagline = "I build beautiful, valuable web & mobile apps — from fleet tools for connected cars to the little apps my friends actually use.";

export default function InkHero() {
  return (
    <section className="relative h-[100dvh] min-h-[480px] overflow-hidden bg-deep lg:h-screen">
      <InkCanvas count={7500} />
      <h1 className="sr-only">Alex Richards — software engineer</h1>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-[calc(3rem+env(safe-area-inset-bottom))] text-center lg:bottom-auto lg:top-[58%] lg:pb-0">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent lg:text-xs lg:tracking-[0.25em]"
        >
          {"// software engineer · 8 years"}<span className="hidden sm:inline">{" · columbus, oh"}</span>
        </motion.p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-cream/75 lg:mt-4 lg:text-lg">
          {tagline.split(" ").map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease, delay: 0.9 + i * 0.05 }}
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.6 }}
          className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:mt-8 lg:gap-3"
        >
          <Magnetic>
            <Link href="/work" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-deep lg:px-6 lg:py-3">
              View my work <span aria-hidden>→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-cream/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-cream backdrop-blur lg:px-6 lg:py-3"
            >
              About me
            </Link>
          </Magnetic>
          <Magnetic>
            <a
              href="/Alexander_Richards_Resume.pdf"
              download="Alexander_Richards_Resume.pdf"
              className="inline-flex rounded-full px-3 py-2.5 text-sm font-semibold text-cream/90 underline-offset-4 hover:underline lg:px-6 lg:py-3"
            >
              R&eacute;sum&eacute; &darr;
            </a>
          </Magnetic>
        </motion.div>
      </div>

    </section>
  );
}
