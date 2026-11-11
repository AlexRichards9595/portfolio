'use client'

import { projectData, type Project } from "@/ExperienceData";
import Card from "@/components/Card";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

// Each tab lists its project groups in display order (current work first).
const tabs = [
  { value: "wild", label: "In the Wild", groups: ["present", "past"] },
  { value: "works", label: "In the Works", groups: ["future"] },
] as const satisfies readonly { value: string; label: string; groups: readonly Project["tab"][] }[];

export default function Projects() {
  const [active, setActive] = useState(0);
  const list = tabs[active].groups.flatMap((group) => projectData.filter((p) => p.tab === group));

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-5 py-10 lg:py-16">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{"// personal projects"}</p>
        <h1 className="mt-2 font-display text-4xl text-cream lg:text-5xl">Built for the love of it</h1>
        <p className="mx-auto mt-3 max-w-xl text-cream/70">
          Sometimes I build things for the pure love of the game — to help out some friends, or to
          solve one of my own problems.
        </p>
      </motion.header>

      <div className="mx-auto mt-8 flex rounded-full border border-light/50 bg-deep/50 p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            onClick={() => setActive(i)}
            className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              active === i ? "text-deep" : "text-lightest hover:text-cream"
            }`}
          >
            {active === i && (
              <motion.span
                layoutId="proj-tab"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((project) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card
                title={project.name}
                description={project.description}
                subtitle={project.time}
                tags={project.technologies}
                {...(project.slug ? { to: `/projects/${project.slug}` } : { link: project.link })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <p className="py-16 text-center text-lightest">Nothing here yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
