import type { ProjectDetailProps } from "@/components/ProjectDetail";

// Content + brand theme for each project's standalone detail page. Colors are
// pulled from each product's own brand so the page feels like the project, not
// the portfolio.
export const projectDetails: Record<string, ProjectDetailProps> = {
  campscout: {
    theme: {
      bg: "#211F17",
      panel: "#2C2C20",
      text: "#F5EDD6",
      muted: "#C7C1AC",
      accent: "#D2703A",
      onAccent: "#211F17",
      border: "rgba(245,237,214,0.12)",
      glow: "rgba(232,168,56,0.18)",
    },
    eyebrow: "Personal Project · In progress",
    name: "Campscout",
    tagline: "Reviews for every campsite — so no trip is ruined by picking “that” one.",
    status: "Under construction",
    links: [{ label: "Visit campscout.org", href: "https://campscout.org/", primary: true }],
    intro:
      "Too many camping trips have been ruined by picking the wrong campsite, and too many hours lost poring over campground maps and satellite images trying to guess which spot is best. Campscout is a modern web app where campers share reviews and photos for specific campsites across every State and National campground — helping fellow campers pick the best site for their next trip.",
    features: [
      { title: "Campsite-level detail", body: "Not just campgrounds — reviews, photos, and notes for the specific site, so you know exactly what you're booking." },
      { title: "State & National parks", body: "Coverage that spans campgrounds across the country, all in one searchable place." },
      { title: "By campers, for campers", body: "A community trading hard-won knowledge so everyone lands a better spot." },
      { title: "Fast, modern stack", body: "A snappy Next.js front end backed by Prisma and a distributed SQL database." },
    ],
    tech: ["Next.js", "React", "TypeScript", "Prisma", "CockroachDB", "RTL", "Jest"],
  },

  holler: {
    theme: {
      bg: "#081C37",
      panel: "#0F2748",
      text: "#F7F4EE",
      muted: "#9FB0C6",
      accent: "#F2A65A",
      onAccent: "#1F2A33",
      border: "rgba(247,244,238,0.12)",
      glow: "rgba(242,166,90,0.20)",
    },
    eyebrow: "Personal Project · 2026",
    name: "Holler",
    tagline: "See who’s free — and turn that into hanging out. A private, friends-only app.",
    status: "In App Store review",
    links: [
      { label: "About Holler", href: "/holler", primary: true },
      { label: "Privacy Policy", href: "/holler/privacy" },
    ],
    intro:
      "Group texts are a clumsy way to figure out who's around. Holler is a private, friends-only app for sharing when you're free and turning that into real plans — there's no public feed and no followers, just the people you actually know. Built with React Native and Expo on a Supabase backend, with Postgres row-level security enforcing privacy at the data layer.",
    features: [
      { title: "Who’s free, right now", body: "Share your availability with only the friends and groups you choose. Nothing is ever public." },
      { title: "Plans, not just pings", body: "Turn “I’m free” into a real hang with invites and in-plan chat that disappears when it ends." },
      { title: "Privacy by design", body: "Contacts are matched as salted one-way hashes — your address book is never uploaded in readable form." },
      { title: "Sign in your way", body: "Email with verification, Sign in with Apple, or Google — with account deletion built in." },
    ],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Edge Functions"],
  },

  acacia: {
    theme: {
      bg: "#16211F",
      panel: "#20302D",
      text: "#F7F6F2",
      muted: "#B9C4BC",
      accent: "#C6AC57",
      onAccent: "#16211F",
      border: "rgba(247,246,242,0.12)",
      glow: "rgba(196,224,210,0.14)",
    },
    eyebrow: "Personal Project · 2023",
    name: "Acacia House Churches",
    tagline: "A warm, modern home on the web for a new church in Orlando.",
    status: "Live",
    links: [{ label: "Visit acaciahc.com", href: "https://acaciahc.com/", primary: true }],
    intro:
      "When some friends set out to start a church in Orlando, FL, they needed a real web presence — fast. I rapidly prototyped, built, and deployed a modern “business card” website that introduces the church, shares the essentials, and makes it easy for newcomers to reach out.",
    features: [
      { title: "Launched in days", body: "Rapidly prototyped, built, and deployed so the church had a polished presence almost immediately." },
      { title: "Everything that matters", body: "Who they are, what they believe, when they meet, and where — clear and easy to find." },
      { title: "Get in touch", body: "A contact form that routes messages straight to the team for quick follow-up." },
      { title: "Warm & modern", body: "A calm, welcoming design that reflects the community's character." },
    ],
    tech: ["Next.js", "React", "TypeScript", "RTL", "Jest"],
  },

  dwell: {
    theme: {
      bg: "#F6F7F9",
      panel: "#FFFFFF",
      text: "#1B2A45",
      muted: "#5A6A82",
      accent: "#2F4C86",
      onAccent: "#FFFFFF",
      border: "rgba(27,42,69,0.12)",
      glow: "rgba(47,76,134,0.10)",
    },
    eyebrow: "Client Work · 2021",
    name: "Dwell Community Church",
    tagline: "A smarter teachings search — filters that never hit a dead end.",
    status: "Live",
    links: [
      { label: "Open Teachings Search", href: "https://www.dwellcc.org/teachings", primary: true },
      { label: "dwellcc.org", href: "https://www.dwellcc.org/" },
    ],
    intro:
      "Dwell has a deep archive of Bible teachings, searchable by book, series, and teacher. I built the filter sidebar for the Teachings Search — a fast, reload-free experience with one hard requirement from the client: a user should never be able to filter their way to zero results.",
    features: [
      { title: "No dead-end filters", body: "The filter bar dynamically limits options to only those that still return results — you can never filter down to nothing." },
      { title: "No page reloads", body: "Adjust filters and watch results update instantly, without a full-page refresh." },
      { title: "A deep archive", body: "Thousands of teachings, browsable by book, series, and teacher." },
      { title: "Built to last", body: "Straightforward, well-tested JavaScript running on the church's existing platform." },
    ],
    tech: ["JavaScript", "Jest"],
  },
};

export const projectSlugs = Object.keys(projectDetails);
