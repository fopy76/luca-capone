import type { Metadata } from "next"
import { getNote } from "@/lib/field-notes"
import { SITE_URL, TWITTER_HANDLE } from "@/lib/site"
import { H2, Lede, NoteLayout, NoteLink, P } from "../note-components"

const note = getNote("build-a-side-project-with-a-full-time-job")
const url = `${SITE_URL}/field-notes/${note.slug}`

export const metadata: Metadata = {
  title: note.title,
  description: note.description,
  alternates: { canonical: url },
  openGraph: {
    type: "article",
    url,
    title: note.title,
    description: note.description,
    publishedTime: note.datePublished,
    modifiedTime: note.dateModified,
    authors: [SITE_URL],
  },
  twitter: {
    card: "summary_large_image",
    title: note.title,
    description: note.description,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
}

export default function Page() {
  return (
    <NoteLayout note={note}>
      <Lede>
        Fixed windows, not stolen hours. That's the whole system. I build from
        9 to 11 PM on weeknights, on Saturday mornings when the house is quiet,
        and on lunch breaks that aren't meetings. Six products have come out of
        those margins, alongside a full-time job in security and two kids.
        Nothing about it requires waking up at 5 AM or believing in yourself
        harder.
      </Lede>

      <H2>Why fixed windows beat motivation</H2>
      <P>
        A stolen hour needs negotiation — with your family, your sleep, your
        guilt. A fixed window needs nothing. By 9 PM the kids are down, the
        day's obligations are settled, and nobody else has a claim on the time.
        When the window opens, I don't decide whether to build. The deciding
        was done months ago. That removes the tax that kills most side
        projects: renegotiating with yourself every single night.
      </P>

      <H2>Scope like your hours are the truth</H2>
      <P>
        The windows yield around 13 hours a week. So I build small products
        that can reach users in weeks — a burnout assessment, a couples habit
        tracker, a parenting assistant — instead of one grand platform that
        would still be a prototype two years in. Six small shipped things beat
        one big unshipped thing: users, feedback, momentum, proof. If you want
        the actual timelines, they're in{" "}
        <NoteLink href="/field-notes/how-long-does-it-take-to-build-an-app-with-ai">
          how long it takes to build an app with AI
        </NoteLink>
        .
      </P>

      <H2>Let the tools fit the window</H2>
      <P>
        AI coding made two-hour windows worth something. With Claude Code I
        describe the next piece in plain language, get working code, and test
        it before the window closes —{" "}
        <NoteLink href="/field-notes/what-is-vibe-coding">
          vibe coding
        </NoteLink>
        , in practice. Two hours used to be barely enough to remember where I
        left off. Now it's enough to ship a feature. For people with jobs,
        that's the real change: the minimum useful session collapsed from an
        afternoon to an evening.
      </P>

      <H2>The family part, honestly</H2>
      <P>
        The build happens after bedtime because bedtime is non-negotiable and
        the build isn't. Saturday mornings work because the house is asleep,
        not because I'm disciplined. Some weeks produce nothing — kids get
        sick, the job eats the evenings, the tank is empty. The system
        survives those weeks because it never depended on streaks. It depends
        on the window still being there next week.
      </P>

      <H2>The consistency math</H2>
      <P>
        Two hours a night doesn't sound like much. Kept up, it adds up to
        500-plus hours a year without touching your job, family dinners, or
        weekends together. Most people don't need more time. They need the
        modest amount they already have to stop being up for debate every
        night. That's the whole premise of Second-Act Builders — and if you're
        wondering whether it works without a technical background,{" "}
        <NoteLink href="/field-notes/build-an-app-without-coding">
          that answer is here
        </NoteLink>
        .
      </P>
    </NoteLayout>
  )
}
