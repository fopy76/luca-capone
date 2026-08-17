import type { Metadata } from "next"
import { getNote } from "@/lib/field-notes"
import { AGE, SITE_URL, TWITTER_HANDLE } from "@/lib/site"
import { H2, Lede, NoteLayout, NoteLink, P, UL } from "../note-components"

const note = getNote("build-an-app-without-coding")
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
        Yes. I'm the proof, six times over. I opened Cursor for the first time
        in March 2025, at 49, with a career in security and zero computer
        science behind me. Since then I've shipped{" "}
        <NoteLink href="https://www.burnoutradar.com" external>
          BurnoutRadar
        </NoteLink>
        ,{" "}
        <NoteLink href="https://apps.apple.com/app/id6759855681" external>
          PairHabit
        </NoteLink>
        , and{" "}
        <NoteLink href="https://www.kikko.ai/" external>
          Kikko
        </NoteLink>
        , with three more in various stages behind them. The honest version of
        &quot;yes&quot; comes with conditions, though — and the conditions are
        the useful part.
      </Lede>

      <H2>What &quot;non-technical&quot; meant in my case</H2>
      <P>
        When I say zero background, I mean it literally. Twenty-five years in
        security, not one line of code. Until March 2025 I had never opened a
        code editor. Nine years as a Captain in the Italian Army Special
        Operations Forces, then humanitarian security with the UN system across
        four continents — useful training for many things. Not for reading a
        stack trace.
      </P>
      <P>
        What changed wasn't me. It was the tools. AI coding assistants crossed
        a line where describing what you want in plain language produces real,
        running software. People call it{" "}
        <NoteLink href="/field-notes/what-is-vibe-coding">vibe coding</NoteLink>
        . I call it the reason a {AGE}-year-old security guy has apps in
        production.
      </P>

      <H2>What the AI handles — and what stays on your plate</H2>
      <P>
        Claude Code writes essentially all of my code. Syntax, frameworks,
        boilerplate — the things that used to take years to learn are the
        machine's job now.
      </P>
      <P>
        What it can't supply: judgment, taste, and stubbornness. You decide
        what to build and, harder, what not to. You notice when the app
        technically works but feels wrong. You keep showing up on the evenings
        when the login flow still breaks. None of that got automated, and that
        part is the job.
      </P>

      <H2>The parts that still hurt</H2>
      <P>From my own builds:</P>
      <UL>
        <li>
          <strong className="text-text">The unglamorous 80 percent.</strong>{" "}
          The demo took evenings; accounts, payments, and polish took the weeks
          after. I wrote up the real timelines in{" "}
          <NoteLink href="/field-notes/how-long-does-it-take-to-build-an-app-with-ai">
            how long it takes to build an app with AI
          </NoteLink>
          .
        </li>
        <li>
          <strong className="text-text">App review.</strong> Getting PairHabit
          through the App Store taught me more about Apple's rules than I ever
          wanted to know.
        </li>
        <li>
          <strong className="text-text">Understanding enough.</strong> You
          don't need to write code, but you do need to slowly learn what the
          pieces are — or you'll ask for the wrong things and believe the wrong
          answers.
        </li>
      </UL>
      <P>
        None of this is a reason not to start. It's what the road looks like.
      </P>

      <H2>Who should skip it</H2>
      <P>
        If you want passive income without ever looking at an error message,
        skip this. The tools are remarkable; they are not magic. What they
        removed is the training. The work is still yours.
      </P>

      <H2>How I'd start this week</H2>
      <P>
        Pick one small annoyance from your own life. Not a startup idea — an
        annoyance. Describe it to an AI coding tool the way you'd brief a
        colleague. Ship the ugly first version to exactly one person. Everything
        I've learned came from that loop, repeated in{" "}
        <NoteLink href="/field-notes/build-a-side-project-with-a-full-time-job">
          the margins of a full-time job and two kids
        </NoteLink>
        .
      </P>
    </NoteLayout>
  )
}
