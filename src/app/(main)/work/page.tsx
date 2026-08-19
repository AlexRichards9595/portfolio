"use client";
import { employerData } from "@/ExperienceData";
import React from "react";
import Card from "@/components/Card";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Work() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="lg:sticky lg:top-16 lg:w-2/5 lg:self-start"
      >
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{"// experience"}</p>
          <h1 className="mt-2 font-display text-4xl text-cream lg:text-5xl">Where I&rsquo;ve worked</h1>
          <p className="mt-4 text-cream/70 lg:max-w-sm">
            From private jets to social services, I&rsquo;ve built elegant web and mobile applications
            that solve real problems for real people — at some incredible companies.
          </p>
        </div>
      </motion.div>

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
