import type { Metadata } from "next"
import { getNote } from "@/lib/field-notes"
import { AGE, SITE_URL, TWITTER_HANDLE } from "@/lib/site"
import { H2, Lede, NoteLayout, NoteLink, P } from "../note-components"

const note = getNote("too-old-to-learn-to-code")
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
        No — and I'm not saying that to be kind. I started at 49, with zero
        computer science background, and shipped my first product within
        months. The question that matters is different: can you stand being a
        beginner again for a while? That part has nothing to do with age.
      </Lede>

      <H2>What age costs</H2>
      <P>
        Let me be straight about the debit side. Energy is real: after a full
        workday and two kids, the 9-to-11 PM window is what's left, and some
        evenings simply don't happen. And being bad at something new stings
        more at {AGE} than at 20, because you've spent decades being good at
        your job. That sting is the barrier. Not your brain.
      </P>

      <H2>What age buys you</H2>
      <P>
        In 25 years of security work I watched three technology shifts land:
        the internet, mobile, the cloud. Every time, half my peers said
        &quot;I'm fine with what I have.&quot; The curious ones are mostly
        still here. You can't buy that pattern recognition at 25.
      </P>
      <P>
        Add the rest of the ledger. You know a real problem when you see one,
        because you've lived a few. You can tell when someone is selling you
        something. And you finish things, because at some point in your career
        you had no choice but to learn how. Now that AI handles the syntax,
        what's left is exactly the part experience is good at: judgment.
      </P>

      <H2>The research agrees, for what it's worth</H2>
      <P>
        Researchers at MIT and Northwestern{" "}
        <NoteLink href="https://www.nber.org/papers/w24489" external>
          ran U.S. Census data on startup founders
        </NoteLink>{" "}
        across the country. The average age of the founders behind the
        fastest-growing new companies: 45. A 50-year-old founder is roughly
        twice as likely as a 30-year-old to build one of them. I didn't know
        any of that when I opened Cursor for the first time in March 2025. It
        matches what I've seen since.
      </P>

      <H2>If you start at {AGE}, start like this</H2>
      <P>
        Don't enroll in a bootcamp built to make you employable — you're not
        trying to get hired. Pick a real problem from your own life, put an AI
        coding tool in front of it, and aim for one shipped, ugly thing within
        a month. The approach is called{" "}
        <NoteLink href="/field-notes/what-is-vibe-coding">vibe coding</NoteLink>
        .
      </P>
      <P>
        Evenings are enough. Mine are 9 to 11 PM, plus Saturday mornings when
        the house is quiet — I laid the whole system out in{" "}
        <NoteLink href="/field-notes/build-a-side-project-with-a-full-time-job">
          how to build a side project with a full-time job
        </NoteLink>
        . Six products came out of those two-hour windows. The margins are
        enough.
      </P>
    </NoteLayout>
  )
}
