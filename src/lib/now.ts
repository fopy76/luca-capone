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
export const nowLastUpdated = "2026-11-09"
export const nowLastUpdatedDisplay = "November 9, 2026"

// Curated one-liners for the landing-page teaser.
export const nowTeaserItems: NowTeaserItem[] = [
  {
    label: "Shipping",
    text: "Two YouTube Shorts channels, started this month and eighteen videos in: Italy Did What? and Ask Placidus. Kikko and PairHabit are live and steady.",
  },
  {
    label: "Writing",
    text: "Second-Act Builders, every other Thursday on Substack. Real experiments, real numbers.",
  },
  {
    label: "Learning",
    text: "Distribution, the skill I never built — practising it on short-form video, where the feedback arrives in hours instead of months.",
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
          "AI family assistant for schedules and school communication — on the web since July, on the App Store since September 14. Both halves are live and nothing is broken, but it hasn't had my build hours this autumn. I stopped adding features to a product nobody was finding, and went to learn the finding part somewhere cheaper. The families already using it are still using it, and that's the number I check.",
        href: "https://www.kikko.ai/",
        external: true,
      },
      {
        title: "PairHabit",
        description:
          "On the App Store. A couples habit tracker with shared micro-habits and reward stakes. Still the product I have launched the most, and still waiting on the same thing Kikko is waiting on: me getting better at distribution. A parent will type \"school email calendar\" into a search box; a couple does not type the reason they would install a habit app. Easier words first, then the same lesson comes back here.",
        href: "https://apps.apple.com/app/id6759855681",
        external: true,
      },
      {
        title: "Starvling",
        description:
          "Closed on September 22. Launched September 8 as a launch directory where every listed product was a pixel creature losing HP around the clock, kept alive only by free daily feeds from real people. I wrote the kill rule before launch: a decision date and the numbers that would make me stop. It came in at 297 feeds, all fifteen listings had starved by September 16, and not one person paid. So the rule fired and I stopped. The site stays up — directory, graveyard, every tombstone — and I published the teardown instead of quietly deleting it.",
        href: "https://starvling.com",
        external: true,
      },
      {
        title: "Fatto",
        description:
          "The landing page is live and the waitlist is open. Still waiting its turn. I am not starting another product until I can reliably get people to the ones I have already shipped.",
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
        title: "Italy Did What?",
        description:
          "A YouTube Shorts channel I started this month: true, strange stories from Ancient Rome and Italian history, told as short cartoons. Fourteen Shorts up in the first week, animated in code rather than filmed — no camera, no face, nothing that needs me to be presentable at 6am. Views run from a dozen to a bit over a thousand, and that spread is the whole reason I am doing it: same channel, same effort per video, wildly different results. It teaches me more about what makes someone click than another month of planning would.",
        href: "https://www.youtube.com/@ItalyDidWhat",
        external: true,
      },
      {
        title: "Ask Placidus",
        description:
          "The second channel, four Shorts in: terrible advice for a better life, from a very calm Stoic. Same production line as Italy Did What?, pointed at a completely different shelf. Running two at once is the cheapest test I could think of for whether the format travels or the topic does — and one of the four has already out-reached everything else I made this month.",
        href: "https://www.youtube.com/@AskPlacidus",
        external: true,
      },
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
          "Daily progress on X (@LucaCaponeX), plus LinkedIn, YouTube, Instagram, and Reddit. The Starvling teardown ran there for two weeks with the numbers attached — the failure got the same airtime the launch did. The video experiment is getting the same treatment, view counts included.",
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
          "I can ship a product in a weekend. I had no idea how to get one found, and after twenty months of building I stopped pretending that was a scheduling problem. This month I moved the practice off my own products and onto two YouTube channels, because the loop there is hours instead of months: publish, read the number, publish again. I had already worked through the marketing books and the channels that hold up — this is the part where I stop reading and run the plays, on something I do not mind getting wrong. Then I bring what works back to Kikko and PairHabit.",
      },
      {
        title: "What actually makes a short get watched",
        description:
          "The first second decides it. After that it's a question you want answered before you have decided to care, and a reason to still be there at the end. Eighteen Shorts across two channels so far, and I am reading the retention on each one rather than guessing — which is the opposite of how I launched every product before this.",
      },
      {
        title: "Kill rules, and when to stop",
        description:
          "Starvling was the first thing I shipped with its stopping condition written down in advance. Writing it took ten minutes in August; on decision day it turned what could have been an argument with myself into arithmetic. The surprise is that the hard part isn't the launch — it's deciding beforehand what result would make you walk away, while you still like the idea. Both channels have one now too.",
      },
      {
        title: "Deeper agentic workflows with Claude Code",
        description:
          "Skills, subagents, and scheduled automation to ship faster in two-hour evening windows. Both Shorts channels run off a production line I built this way — the animation, the voice, and the publishing step are all code, which is the only reason one person can keep two channels fed.",
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
