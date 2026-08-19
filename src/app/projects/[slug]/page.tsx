import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { projectDetails, projectSlugs } from "@/projectDetails";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const detail = projectDetails[params.slug];
  if (!detail) return {};
  return {
    title: `${detail.name} — Alex Richards`,
    description: detail.tagline,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const detail = projectDetails[params.slug];
  if (!detail) notFound();
  return <ProjectDetail {...detail} />;
}
