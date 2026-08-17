import type { Metadata } from "next"
import { getNote } from "@/lib/field-notes"
import { SITE_URL, TWITTER_HANDLE } from "@/lib/site"
import { H2, Lede, NoteLayout, NoteLink, P } from "../note-components"

const note = getNote("what-is-vibe-coding")
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
        Vibe coding is building software by describing what you want in plain
        language and letting an AI coding tool, Claude Code in my case, write
        the actual code. You review, test, and steer instead of typing syntax.
        Andrej Karpathy gave the practice its name in early 2025, half as a
        joke. The joke part didn't last: it's how I've shipped six products
        since March 2025 without a CS background.
      </Lede>

      <H2>A session, start to finish</H2>
      <P>
        Mine run 9 to 11 PM, after the kids are down. I open Claude Code and
        describe the next piece in ordinary sentences — the screen, the tap,
        the one thing that must never happen. The tool writes the code, and I
        react to results instead of syntax: run it, poke at it, say what's
        wrong, go again. On a good night the loop turns over enough times to
        finish the piece. On a bad night the fix for one thing quietly breaks
        another, and the evening goes to finding out why.
      </P>

      <H2>What vibe coding is not</H2>
      <P>
        It is not zero thinking. You still hold the product in your head: what
        it's for, who it serves, what &quot;done&quot; means tonight.
      </P>
      <P>
        It is not zero responsibility. If the AI writes an insecure login and
        you ship it, that's your problem, not the model's. Coming from 25 years
        in security work, this is the part I take personally.
      </P>
      <P>
        And it is not zero learning. Every session teaches you a little more
        about how software fits together, whether you asked for the lesson or
        not.
      </P>

      <H2>Where it breaks</H2>
      <P>
        The fair criticism: code you don't fully understand accumulates risk.
        At enterprise scale (a team, a decade of maintenance ahead) my approach
        would be reckless. At my scale, small products built by one person in
        close contact with users, it's the difference between shipping and
        never starting. Know which situation you're in before you take
        anyone's advice, including mine.
      </P>

      <H2>The tools</H2>
      <P>
        Claude Code is my primary tool; Cursor shows up occasionally. Web
        products run on Next.js, Supabase, and Vercel. Mobile is React Native,
        with new iOS builds moving to Swift and SwiftUI. Stripe for payments.
        Nothing exotic — the boring stack is the point, because every hour
        spent on infrastructure novelty is an hour not spent shipping.
      </P>
      <P>
        If you're wondering whether this works without a technical background,
        that's the question I answer in{" "}
        <NoteLink href="/field-notes/build-an-app-without-coding">
          can a non-technical person really build an app with AI
        </NoteLink>
        . Short version: yes, with conditions.
      </P>
    </NoteLayout>
  )
}
