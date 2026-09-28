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
export const nowLastUpdated = "2026-09-28"
export const nowLastUpdatedDisplay = "September 28, 2026"

// Curated one-liners for the landing-page teaser.
export const nowTeaserItems: NowTeaserItem[] = [
  {
    label: "Shipping",
    text: "Starvling hit the kill rule I wrote before launch, so I shut it down in the open. Kikko is back on the front burner.",
  },
  {
    label: "Writing",
    text: "Second-Act Builders, every other Thursday on Substack. Real experiments, real numbers.",
  },
  {
    label: "Learning",
    text: "Kill rules and when to stop, Claude Code agent workflows, and marketing — books, good YouTube channels, and the agency I built out of them.",
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
          "Back to being the main thing now that Starvling is closed. AI family assistant for schedules and school communication, on the App Store and running on the web at kikko.ai. Last week's ship was the unglamorous kind: when Gmail sends the forwarding confirmation, Kikko now spots it and puts a one-tap Confirm button on the card instead of leaving a wall of link text nobody knows what to do with. Two families got stuck on that step before I understood it was a step. This stretch is about finding more parents, not adding more features.",
        href: "https://www.kikko.ai/",
        external: true,
      },
      {
        title: "PairHabit",
        description:
          "On the App Store. A couples habit tracker with shared micro-habits and reward stakes. This stretch is distribution, not features — talking to the first couples instead of shipping at them.",
        href: "https://apps.apple.com/app/id6759855681",
        external: true,
      },
      {
        title: "Starvling",
        description:
          "Closed on September 22. Launched September 8 as a launch directory where every listed product was a pixel creature losing HP around the clock, kept alive only by free daily feeds from real people. Before launch I wrote a kill rule: a decision date, a floor of 500 feeds, and the action to take if it came in under. It came in at 297, and all fifteen listed creatures had starved by the 16th. So the rule fired and I stopped. The site stays online — directory, graveyard, every tombstone — and I spent the week publishing the post-mortem in public instead of quietly deleting the thing.",
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
          "Daily progress on X (@LucaCaponeX), plus LinkedIn, YouTube, Instagram, and Reddit. The Starvling post-mortem ran there all week, numbers included — the failure gets the same airtime the launch got.",
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
        title: "Kill rules, and when to stop",
        description:
          "Starvling is the first thing I shipped with its stopping condition written down in advance. Writing it took ten minutes in August; on decision day it turned what could have been an argument with myself into arithmetic. What surprised me is that the hard part of launching isn't the launch — it's deciding beforehand what result would make you walk away, while you still like the idea.",
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
      {
        title: "Marketing",
        description:
          "Building the thing stopped being the hard part; getting anyone to see it didn't. So I'm working through the books and the YouTube channels that actually hold up, and I built my own marketing agency out of what I learned — the playbooks turned into something I can run against my own products instead of notes I never reopen.",
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
