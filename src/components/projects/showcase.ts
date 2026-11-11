import { projectData, type Project } from "@/ExperienceData";
import { projectDetails } from "@/projectDetails";

export type FloodTheme = { bg: string; panel: string; fg: string; muted: string; acc: string; onacc: string };

export type ShowcaseVisual =
  | { kind: "web"; src: string; url: string }
  | { kind: "phones"; srcs: string[]; icon?: string }
  | { kind: "sketch"; title: string; note: string; caption: string; nodes: string[] };

export type ShowcaseItem = {
  key: string;
  project: Project;
  tab: "wild" | "works";
  href: string | null;
  tagline: string;
  theme: FloodTheme;
  visual: ShowcaseVisual;
};

/** The portfolio's own palette — what the page returns to when nothing is hovered. */
export const DEFAULT_THEME: FloodTheme = {
  bg: "#472D2D", panel: "#553939", fg: "#F4E7DF", muted: "#A77979", acc: "#7FB7BE", onacc: "#2E1C1C",
};

// Per-project visuals, plus themes/taglines for projects without a detail entry in projectDetails.
const extras: Record<string, { visual: ShowcaseVisual; theme?: FloodTheme; tagline?: string; href?: string | null }> = {
  campscout: { visual: { kind: "web", src: "/projects/campscout.jpg", url: "campscout.org" } },
  holler: {
    visual: { kind: "phones", srcs: ["/projects/holler/02_groups.jpg", "/projects/holler/01_home.jpg", "/projects/holler/03_status.jpg"], icon: "/projects/holler/icon.png" },
  },
  acacia: { visual: { kind: "web", src: "/projects/acacia.jpg", url: "acaciahc.com" } },
  dwell: { visual: { kind: "web", src: "/projects/dwell.jpg", url: "dwellcc.org/teachings" } },
  gymmie: {
    visual: { kind: "web", src: "/projects/gymmie.jpg", url: "gymmie.io" },
    // Sampled from gymmie.io
    theme: { bg: "#F1EDE3", panel: "#F8F4EC", fg: "#1C1813", muted: "#5E574C", acc: "#82162A", onacc: "#F7F0E6" },
    tagline: "A workout tracker so good you'd use it alone — with friends built in.",
  },
  "Classmates?": {
    visual: { kind: "sketch", title: "Classmates?", note: "idea · maybe sometime", caption: "same school · same faith → actually meet?", nodes: ["parents", "class", "parents"] },
    theme: { bg: "#E9E1CF", panel: "#F3EDDF", fg: "#2B3140", muted: "#5D6475", acc: "#C0522E", onacc: "#F3EDDF" },
    tagline: "Just a sketch in the notebook for now.",
    href: null,
  },
};

const order = { present: 0, past: 1, future: 2 } as const;

export const showcaseItems: ShowcaseItem[] = [...projectData]
  .sort((a, b) => order[a.tab] - order[b.tab])
  .flatMap((project) => {
    const key = project.slug ?? project.name;
    const extra = extras[key];
    if (!extra) return [];
    const detail = project.slug ? projectDetails[project.slug] : undefined;
    const theme: FloodTheme = extra.theme ?? (detail
      ? { bg: detail.theme.bg, panel: detail.theme.panel, fg: detail.theme.text, muted: detail.theme.muted, acc: detail.theme.accent, onacc: detail.theme.onAccent }
      : DEFAULT_THEME);
    return [{
      key,
      project,
      tab: project.tab === "future" ? "works" : "wild",
      href: extra.href !== undefined ? extra.href : project.slug ? `/projects/${project.slug}` : null,
      tagline: extra.tagline ?? detail?.tagline ?? project.description,
      theme,
      visual: extra.visual,
    }];
  });
