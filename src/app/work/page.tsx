import { employerData } from "@/ExperienceData";
import React from "react";
import Card from "@/components/Card";

export default function Work() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 lg:flex-row lg:gap-12 lg:py-16">
      <div className="lg:sticky lg:top-16 lg:w-2/5 lg:self-start">
        <div className="text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-grape">Experience</p>
          <h1 className="mt-2 font-display text-4xl text-ink lg:text-5xl">Where I&rsquo;ve worked</h1>
          <p className="mt-4 text-ink/70 lg:max-w-sm">
            From private jets to social services, I&rsquo;ve built elegant web and mobile applications
            that solve real problems for real people — at some incredible companies.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:w-3/5">
        {employerData.map((company) => (
          <Card
            key={company.name}
            title={company.name}
            description={company.description}
            subtitle={company.time}
            tags={company.technologies}
            link={company.link}
            bullets={company.bullets}
          />
        ))}
      </div>
    </div>
  );
}
