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
export const nowLastUpdated = "2026-09-12"
export const nowLastUpdatedDisplay = "September 12, 2026"

// Curated one-liners for the landing-page teaser.
export const nowTeaserItems: NowTeaserItem[] = [
  {
    label: "Shipping",
    text: "Starvling just launched — and Kikko's iOS app cleared App Store review.",
  },
  {
    label: "Writing",
    text: "Second-Act Builders, every other Thursday on Substack. Real experiments, real numbers.",
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
        title: "Starvling",
        description:
          "Just launched (September 8). A launch directory where every listed product is a pixel creature that loses HP around the clock — only free daily feeds from real people keep it alive, and the ones that starve end up in a public graveyard. Rank can't be bought. Watching the first launches live and die in real time.",
        href: "https://starvling.com",
        external: true,
      },
      {
        title: "PairHabit",
        description:
          "On the App Store. A couples habit tracker with shared micro-habits and reward stakes. Iterating with the first couples and shipping a weekly blog on the science of habits for two.",
        href: "https://apps.apple.com/app/id6759855681",
        external: true,
      },
      {
        title: "Kikko",
        description:
          "AI family assistant for schedules and school communication. Live on web — and the iOS app just cleared App Store review. Releasing soon.",
        href: "https://www.kikko.ai/",
        external: true,
      },
      {
        title: "Fatto",
        description:
          "Next in the build-in-public cycle. The landing page is live and the waitlist is open — scoping it in the open.",
        href: "https://getfatto.com",
        external: true,
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
          "The Substack newsletter for 40+ professionals building AI products alongside careers and families. Field reports, playbooks, honest numbers — every other Thursday.",
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
      {
        title: "Field Notes",
        description:
          "Evergreen notes on this site answering the questions second-act builders actually search for.",
        href: "/field-notes",
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
          "Moving new iOS builds native after shipping the first apps with React Native. The Kikko iOS app — just through App Store review — was the proving ground.",
      },
      {
        title: "Launch mechanics",
        description:
          "ASO, review, and launch-day dynamics — learned live through the PairHabit App Store release and the Starvling launch.",
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
        title: "Product feedback",
        description:
          "Using PairHabit, Kikko, or Starvling? Tell me what's broken and what's working.",
      },
    ],
  },
]
