import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";

export const metadata: Metadata = {
  title: "Holler — Alex Richards",
  description: "A private, friends-only app for sharing when you're free.",
};

export default function HollerProject() {
  return (
    <ProjectDetail
      theme={{
        bg: "#081C37",
        panel: "#0F2748",
        text: "#F7F4EE",
        muted: "#9FB0C6",
        accent: "#F2A65A",
        onAccent: "#1F2A33",
        border: "rgba(247,244,238,0.12)",
        glow: "rgba(242,166,90,0.20)",
      }}
      eyebrow="Personal Project · 2026"
      name="Holler"
      tagline="See who’s free — and turn that into hanging out. A private, friends-only app."
      status="In App Store review"
      links={[
        { label: "About Holler", href: "/holler", primary: true },
        { label: "Privacy Policy", href: "/holler/privacy" },
      ]}
      intro="Group texts are a clumsy way to figure out who's around. Holler is a private, friends-only app for sharing when you're free and turning that into real plans — there's no public feed and no followers, just the people you actually know. Built with React Native and Expo on a Supabase backend, with Postgres row-level security enforcing privacy at the data layer."
      features={[
        {
          title: "Who’s free, right now",
          body: "Share your availability with only the friends and groups you choose. Nothing is ever public.",
        },
        {
          title: "Plans, not just pings",
          body: "Turn “I’m free” into a real hang with invites and in-plan chat that disappears when it ends.",
        },
        {
          title: "Privacy by design",
          body: "Contacts are matched as salted one-way hashes — your address book is never uploaded in readable form.",
        },
        {
          title: "Sign in your way",
          body: "Email with verification, Sign in with Apple, or Google — with account deletion built in.",
        },
      ]}
      tech={["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions"]}
    />
  );
}
