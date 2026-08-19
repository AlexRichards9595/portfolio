'use client'

import { projectData } from "@/ExperienceData";
import Card from "@/components/Card";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const tabs = [
  { value: "past", label: "Past" },
  { value: "present", label: "Present" },
  { value: "future", label: "Future" },
] as const;

export default function Projects() {
  const [active, setActive] = useState(1);
  const list = projectData.filter((p) => p.tab === tabs[active].value);

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-5 py-10 lg:py-16">
      <header className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-grape">Personal Projects</p>
        <h1 className="mt-2 font-display text-4xl text-ink lg:text-5xl">Built for the love of it</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          Sometimes you build things for the pure love of the game — to help out some friends, or
          to solve one of my own problems.
        </p>
      </header>

      <div className="mx-auto mt-8 flex rounded-full border border-line bg-paper p-1 shadow-soft">
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            onClick={() => setActive(i)}
            className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              active === i ? "text-white" : "text-muted hover:text-ink"
            }`}
          >
            {active === i && (
              <motion.span
                layoutId="proj-tab"
                className="absolute inset-0 -z-10 rounded-full bg-plum"
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
              initial={{ opacity: 0, y: 12 }}
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
          <p className="py-16 text-center text-muted">Nothing here yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
