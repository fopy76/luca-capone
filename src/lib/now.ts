// Single source of truth for the /now page and the landing-page "Now" teaser.
// To refresh the snapshot: edit the items below and bump both date constants.
// Plain strings only (no JSX) so this file can be imported from server
// components and sitemap.ts alike.

export type NowItem = {
  title: string
  description: string
  href?: string
  external?: boolean
}

export type NowBlock = {
  id: "building" | "creating" | "learning" | "reading" | "open-to"
  heading: string
  items: NowItem[]
}

export type NowTeaserItem = {
  label: string
  text: string
}

// ISO date: used by <time dateTime>, JSON-LD dateModified, and sitemap lastModified.
export const nowLastUpdated = "2026-08-16"
export const nowLastUpdatedDisplay = "August 16, 2026"

// Curated one-liners for the landing-page teaser.
export const nowTeaserItems: NowTeaserItem[] = [
  {
    label: "Shipping",
    text: "PairHabit just launched on the App Store — Kikko is live on web, iOS up next.",
  },
  {
    label: "Writing",
    text: "Second-Act Builders, weekly on Substack. Real experiments, real numbers.",
  },
  {
    label: "Learning",
    text: "Going deeper on Claude Code agent workflows and native SwiftUI.",
  },
]

export const nowBlocks: NowBlock[] = [
  {
    id: "building",
    heading: "Building",
    items: [
      {
        title: "PairHabit",
        description:
          "Just launched on the App Store. A couples habit tracker with shared micro-habits and reward stakes. Now iterating on onboarding and first-week retention with the first couples.",
        href: "https://apps.apple.com/app/id6759855681",
        external: true,
      },
      {
        title: "Kikko",
        description:
          "AI parenting assistant for schedules and school communication. Live on web — the iOS app is next on the build list.",
        href: "https://www.kikko.ai/",
        external: true,
      },
      {
        title: "BizarreChat",
        description:
          "AI chat with celebrities and historical figures, genuinely weird on purpose. In iOS beta, pushing toward public launch.",
        href: "https://www.bizarrechat.app",
        external: true,
      },
      {
        title: "Fatto",
        description:
          "Next in the build-in-public cycle. Still in planning — scoping it in the open.",
      },
    ],
  },
  {
    id: "creating",
    heading: "Creating",
    items: [
      {
        title: "Second-Act Builders",
        description:
          "The weekly Substack newsletter for 40+ professionals building AI products alongside careers and families. Field reports, playbooks, honest numbers.",
        href: "https://secondactbuilders.substack.com",
        external: true,
      },
      {
        title: "Building in public",
        description:
          "Daily progress on X (@LucaCaponeX), plus LinkedIn, YouTube, Instagram, and Reddit.",
        href: "https://x.com/LucaCaponeX",
        external: true,
      },
    ],
  },
  {
    id: "learning",
    heading: "Learning",
    items: [
      {
        title: "Deeper agentic workflows with Claude Code",
        description:
          "Skills, subagents, and automation to ship faster in two-hour evening windows.",
      },
      {
        title: "Swift and SwiftUI",
        description:
          "Moving new iOS builds native after shipping the first apps with React Native. The Kikko iOS app is the proving ground.",
      },
      {
        title: "App Store launches",
        description:
          "ASO, review, and launch mechanics — learned live through the PairHabit release.",
      },
    ],
  },
  {
    id: "reading",
    heading: "Reading",
    items: [
      {
        title: "AI Demystified — Antonio Weiss",
        description:
          "Sharpening the mental models behind the tools I use every day.",
      },
      {
        title: "$100M Offers — Alex Hormozi",
        description:
          "How to make offers so good people feel stupid saying no. Applying it to how I package and price my products.",
      },
    ],
  },
  {
    id: "open-to",
    heading: "Open to",
    items: [
      {
        title: "Fellow second-act builders",
        description:
          "If you're 40+ and building in the margins, my inbox is open: hello@lucacapone.io.",
        href: "mailto:hello@lucacapone.io",
      },
      {
        title: "Podcast and newsletter collabs",
        description:
          "Happy to talk about non-technical founders shipping real software with AI.",
      },
      {
        title: "PairHabit and Kikko feedback",
        description:
          "Using them? Tell me what's broken and what's working.",
      },
    ],
  },
]
