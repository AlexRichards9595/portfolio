"use client";
import { employerData } from "@/ExperienceData";
import React from "react";
import dynamic from "next/dynamic";
import Card from "@/components/Card";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
// Oldest first, so the flight moves forward in time.
const chronological = [...employerData].reverse();

const WorkFlythrough = dynamic(() => import("@/components/work/WorkFlythrough"), {
  ssr: false,
  loading: () => <div className="h-[100svh] bg-deep lg:h-screen" />,
});

/** Static card list — used when the visitor prefers reduced motion. */
function WorkList() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-12 lg:py-16">
      <div className="lg:sticky lg:top-16 lg:w-2/5 lg:self-start">
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{"// experience"}</p>
          <h1 className="mt-2 font-display text-4xl text-cream lg:text-5xl">Where I&rsquo;ve worked</h1>
          <p className="mt-4 text-cream/70 lg:max-w-sm">
            From private jets to social services, I&rsquo;ve built elegant web and mobile applications
            that solve real problems for real people — at some incredible companies.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 lg:w-3/5">
        {employerData.map((company, i) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.08 * i }}
          >
            <Card
              title={company.name}
              description={company.description}
              subtitle={company.time}
              tags={company.technologies}
              link={company.link}
              bullets={company.bullets}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const reduce = useReducedMotion();
  return (
    <>
      {/* Full history for screen readers and crawlers; the flythrough is visual. */}
      <section className={reduce ? "hidden" : "sr-only"}>
        <h1>Where I&rsquo;ve worked</h1>
        {employerData.map((c) => (
          <article key={c.name}>
            <h2>
              {c.name} — {c.role} ({c.time})
            </h2>
            <p>{c.description}</p>
            <ul>
              {c.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      {reduce ? <WorkList /> : <WorkFlythrough jobs={chronological} />}
    </>
  );
}
