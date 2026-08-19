import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";

export const metadata: Metadata = {
  title: "Campscout — Alex Richards",
  description: "Campsite-level reviews for every State and National campground.",
};

export default function CampscoutProject() {
  return (
    <ProjectDetail
      theme={{
        bg: "#211F17",
        panel: "#2C2C20",
        text: "#F5EDD6",
        muted: "#C7C1AC",
        accent: "#D2703A",
        onAccent: "#211F17",
        border: "rgba(245,237,214,0.12)",
        glow: "rgba(232,168,56,0.18)",
      }}
      eyebrow="Personal Project · In progress"
      name="Campscout"
      tagline="Reviews for every campsite — so no trip is ruined by picking “that” one."
      status="Under construction"
      links={[{ label: "Visit campscout.org", href: "https://campscout.org/", primary: true }]}
      intro="Too many camping trips have been ruined by picking the wrong campsite, and too many hours lost poring over campground maps and satellite images trying to guess which spot is best. Campscout is a modern web app where campers share reviews and photos for specific campsites across every State and National campground — helping fellow campers pick the best site for their next trip."
      features={[
        {
          title: "Campsite-level detail",
          body: "Not just campgrounds — reviews, photos, and notes for the specific site, so you know exactly what you're booking.",
        },
        {
          title: "State & National parks",
          body: "Coverage that spans campgrounds across the country, all in one searchable place.",
        },
        {
          title: "By campers, for campers",
          body: "A community trading hard-won knowledge so everyone lands a better spot.",
        },
        {
          title: "Fast, modern stack",
          body: "A snappy Next.js front end backed by Prisma and a distributed SQL database.",
        },
      ]}
      tech={["Next.js", "React", "TypeScript", "Prisma", "CockroachDB", "RTL", "Jest"]}
    />
  );
}
