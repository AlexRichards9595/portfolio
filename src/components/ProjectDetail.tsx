import Link from "next/link";
import Image from "next/image";
import React from "react";

export type ProjectTheme = {
  bg: string; // page background
  panel: string; // card / surface
  text: string; // primary text
  muted: string; // secondary text
  accent: string; // brand accent
  onAccent: string; // text on accent
  border: string; // hairline borders
  glow: string; // radial glow (rgba)
};

export type ProjectDetailProps = {
  theme: ProjectTheme;
  eyebrow: string; // e.g. "Personal Project · 2026"
  name: string;
  tagline: string;
  logoSrc?: string;
  status?: string; // e.g. "In App Store review"
  links: { label: string; href: string; primary?: boolean }[];
  intro: string;
  features: { title: string; body: string }[];
  tech: string[];
};

export default function ProjectDetail({
  theme,
  eyebrow,
  name,
  tagline,
  logoSrc,
  status,
  links,
  intro,
  features,
  tech,
}: ProjectDetailProps) {
  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text }} className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-10 lg:py-16">
        {/* Back */}
        <Link
          href="/projects"
          style={{ color: theme.muted }}
          className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-100 opacity-80"
        >
          <span aria-hidden>&larr;</span> All projects
        </Link>

        {/* Hero */}
        <section
          className="relative mt-6 overflow-hidden rounded-3xl p-8 lg:p-12"
          style={{
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.panel,
            backgroundImage: `radial-gradient(120% 90% at 12% 0%, ${theme.glow} 0%, transparent 55%)`,
          }}
        >
          <div className="flex items-center gap-4">
            {logoSrc && (
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}` }}
              >
                <Image src={logoSrc} alt={name} width={48} height={48} className="h-10 w-10 object-contain" />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                {eyebrow}
              </p>
              {status && (
                <span
                  className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: theme.accent, color: theme.onAccent }}
                >
                  {status}
                </span>
              )}
            </div>
          </div>

          <h1 className="mt-6 font-display text-5xl leading-none lg:text-6xl">{name}</h1>
          <p className="mt-4 max-w-2xl text-lg lg:text-xl" style={{ color: theme.muted }}>
            {tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                className="rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                style={
                  l.primary
                    ? { backgroundColor: theme.accent, color: theme.onAccent }
                    : { border: `1px solid ${theme.border}`, color: theme.text }
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Overview */}
        <section className="mt-12">
          <h2 className="font-display text-2xl">Overview</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed" style={{ color: theme.muted }}>
            {intro}
          </p>
        </section>

        {/* Highlights */}
        <section className="mt-12">
          <h2 className="font-display text-2xl">Highlights</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: theme.panel, border: `1px solid ${theme.border}` }}
              >
                <div className="mb-2 h-1.5 w-8 rounded-full" style={{ backgroundColor: theme.accent }} />
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech */}
        <section className="mt-12">
          <h2 className="font-display text-2xl">Built with</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-full px-3.5 py-1.5 text-sm"
                style={{ border: `1px solid ${theme.border}`, color: theme.text }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-14">
          <Link
            href="/projects"
            style={{ color: theme.accent }}
            className="text-sm font-medium transition-opacity hover:opacity-80"
          >
            &larr; Back to all projects
          </Link>
        </div>
      </div>
    </div>
  );
}
