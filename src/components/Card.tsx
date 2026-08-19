import React from "react";
import Link from "next/link";
import Image from "next/image";

type CardProps = {
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  link?: string; // external site
  to?: string; // internal project-detail route
  bullets?: string[];
};

const Card = ({ title, subtitle, description, tags, link, to, bullets }: CardProps) => {
  const clickable = !!to;

  const inner = (
    <div
      className={`flex h-full flex-col rounded-2xl border border-line bg-paper px-7 py-6 shadow-soft transition-all duration-300 ${
        clickable ? "group-hover:-translate-y-1 group-hover:shadow-lift" : ""
      }`}
    >
      <div className="mb-3 flex flex-row flex-wrap items-baseline justify-between gap-2">
        {to ? (
          <span className="flex items-center gap-1.5 font-display text-2xl text-ink">
            {title}
            <span className="text-grape transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </span>
        ) : link ? (
          <Link
            href={link}
            target="_blank"
            className="flex items-center gap-1.5 font-display text-2xl text-ink transition-colors hover:text-grape"
          >
            {title}
            <Image src={"/icon-external-link.png"} alt={"Link"} height={24} width={24} className="h-4 w-4 opacity-60" />
          </Link>
        ) : (
          <span className="font-display text-2xl text-ink">{title}</span>
        )}
        {subtitle && <span className="text-sm font-medium text-muted">{subtitle}</span>}
      </div>

      <p className="leading-relaxed text-ink/80">{description}</p>

      {bullets && bullets.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-ink/75">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grape" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {tags && tags.length > 0 && (
        <div className="mt-5 flex flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-grape-soft px-3 py-1 text-xs font-medium text-plum-deep">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link href={to} className="group block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
};

export default Card;
