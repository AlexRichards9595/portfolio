"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CopiableEmail from "@/components/CopiableEmail";

const ease = [0.22, 1, 0.36, 1] as const;
const stack = [
  "React", "Next.js", "TypeScript", "React Native", "Expo", "GraphQL",
  "Node", "Supabase", "Prisma", "Angular", "Python", "Go",
];
const stats: [string, string][] = [
  ["8+", "Years building"],
  ["5", "Companies"],
  ["5", "Personal projects"],
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12 px-6 py-8 lg:px-14 lg:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-light/40 shadow-lift">
        <Image
          src="/landing-image.jpg"
          alt="Alex Richards in the mountains"
          width={1600}
          height={900}
          priority
          className="h-[46vh] min-h-[320px] w-full object-cover object-center lg:h-[56vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
          >
            {"// software engineer · 8 years"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] text-cream lg:text-6xl"
          >
            I build beautiful, valuable web &amp; mobile apps.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link
              href="/work"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-deep transition-transform duration-200 hover:-translate-y-0.5"
            >
              View my work
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-cream/25 bg-white/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur transition-transform duration-200 hover:-translate-y-0.5"
            >
              Projects
            </Link>
            <Link
              href="/Alexander_Richards_Resume.pdf"
              download="Alexander_Richards_Resume.pdf"
              className="rounded-full px-6 py-3 text-sm font-semibold text-cream/90 underline-offset-4 hover:underline"
            >
              R&eacute;sum&eacute; &darr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro + stats */}
      <section className="grid gap-8 lg:grid-cols-3">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="text-lg leading-relaxed text-cream/80 lg:col-span-2"
        >
          I like travelling more than working. But when I do work, I love building beautiful,
          valuable web and mobile applications — and I&rsquo;m pretty good at it, too. From private
          jets to social services, I&rsquo;ve shipped elegant products at companies like United,
          Ford, and NetJets. Poke around and see for yourself.
        </motion.p>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-1 lg:gap-3">
          {stats.map(([n, l], i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.25 + 0.06 * i }}
              className="rounded-2xl border border-light/40 bg-secondary/60 px-5 py-4"
            >
              <p className="font-display text-3xl text-accent">{n}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-lightest">{l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech marquee */}
      <section className="relative overflow-hidden rounded-2xl border border-light/30 bg-deep/40 py-4">
        <div className="mask-fade-x flex w-max animate-marquee gap-3 pl-3">
          {[...stack, ...stack].map((t, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-light/50 px-4 py-1.5 font-mono text-xs text-lightest"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Mobile socials */}
      <div className="flex items-center justify-center gap-6 lg:hidden">
        <div className="rounded-full bg-deep p-3">
          <CopiableEmail imgClassName="h-5 w-5" />
        </div>
        <Link
          href="https://www.linkedin.com/in/alexrichards9595/"
          target="_blank"
          className="rounded-full bg-deep p-3 transition-transform hover:scale-110"
          aria-label="LinkedIn"
        >
          <Image className="h-5 w-5" src="/icon-linkedin.png" alt="LinkedIn" width={50} height={50} />
        </Link>
        <Link
          href="https://github.com/AlexRichards9595"
          target="_blank"
          className="rounded-full bg-deep p-3 transition-transform hover:scale-110"
          aria-label="GitHub"
        >
          <Image className="h-5 w-5" src="/icon-github.png" alt="GitHub" width={50} height={50} />
        </Link>
      </div>
    </div>
  );
}
