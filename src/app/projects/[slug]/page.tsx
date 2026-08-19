import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { projectDetails, projectSlugs } from "@/projectDetails";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = projectDetails[slug];
  if (!detail) return {};
  return {
    title: `${detail.name} — Alex Richards`,
    description: detail.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = projectDetails[slug];
  if (!detail) notFound();
  return <ProjectDetail {...detail} />;
}
