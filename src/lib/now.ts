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
export const nowLastUpdated = "2026-10-12"
export const nowLastUpdatedDisplay = "October 12, 2026"

// Curated one-liners for the landing-page teaser.
export const nowTeaserItems: NowTeaserItem[] = [
  {
    label: "Shipping",
    text: "Kikko is the whole focus: web and iOS are live, so this stretch is about getting it found. Starvling hit its kill rule and I closed it.",
  },
  {
    label: "Writing",
    text: "Second-Act Builders, every other Thursday on Substack. Real experiments, real numbers.",
  },
  {
    label: "Learning",
    text: "Distribution, which is the skill I never built. Plus kill rules, and Claude Code agent workflows.",
  },
]

export const nowBlocks: NowBlock[] = [
  {
    id: "building",
    heading: "Building",
    items: [
      {
        title: "Kikko",
        description:
          "The whole focus right now. AI family assistant for schedules and school communication — on the web since July, on the App Store since September 14. Both halves are live, which means building is no longer the bottleneck: getting it in front of parents is. So this stretch is a distribution week, not a feature week. Store-page wording, the search phrases a parent actually types, and conversations with the families already using it.",
        href: "https://www.kikko.ai/",
        external: true,
      },
      {
        title: "PairHabit",
        description:
          "On the App Store. A couples habit tracker with shared micro-habits and reward stakes. Still the product I have launched the most, and deliberately not the one getting this stretch. A parent will type \"school email calendar\" into a search box; a couple does not type the reason they would install a habit app. Easier words first, then the same lesson comes back here.",
        href: "https://apps.apple.com/app/id6759855681",
        external: true,
      },
      {
        title: "Starvling",
        description:
          "Closed on September 22. Launched September 8 as a launch directory where every listed product was a pixel creature losing HP around the clock, kept alive only by free daily feeds from real people. I wrote the kill rule before launch: a decision date and the numbers that would make me stop. It came in at 297 feeds, all fifteen listings had starved by September 16, and not one person paid. So the rule fired and I stopped. The site stays up — directory, graveyard, every tombstone — and I spent the next two weeks publishing the teardown instead of quietly deleting it.",
        href: "https://starvling.com",
        external: true,
      },
      {
        title: "Fatto",
        description:
          "The landing page is live and the waitlist is open. Waiting its turn — Kikko gets this stretch.",
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
          "Daily progress on X (@LucaCaponeX), plus LinkedIn, YouTube, Instagram, and Reddit. The Starvling teardown ran there for two weeks with the numbers attached — the failure got the same airtime the launch did.",
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
        title: "Distribution — the skill I never built",
        description:
          "I can ship a product in a weekend. I had no idea how to get one found, and after nineteen months of building I stopped pretending that was a scheduling problem. It's a different skill and I never practised it. Kikko is where I'm practising: SEO, store-page vocabulary, and a weekly routine instead of a launch-day push. I'd already worked through the marketing books and the YouTube channels that hold up, and built my own marketing agency out of them — this is the part where I finally run those playbooks against my own products.",
      },
      {
        title: "Kill rules, and when to stop",
        description:
          "Starvling was the first thing I shipped with its stopping condition written down in advance. Writing it took ten minutes in August; on decision day it turned what could have been an argument with myself into arithmetic. The surprise is that the hard part isn't the launch — it's deciding beforehand what result would make you walk away, while you still like the idea.",
      },
      {
        title: "Deeper agentic workflows with Claude Code",
        description:
          "Skills, subagents, and scheduled automation to ship faster in two-hour evening windows.",
      },
      {
        title: "Swift and SwiftUI",
        description:
          "Moving new iOS builds native after shipping the first apps with React Native. Getting Kikko's iOS app through review and onto the App Store was the proving ground.",
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
          "Using PairHabit or Kikko? Tell me what's broken and what's working.",
      },
    ],
  },
]
