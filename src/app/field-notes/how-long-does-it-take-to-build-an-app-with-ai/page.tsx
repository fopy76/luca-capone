import type { Metadata } from "next"
import { getNote } from "@/lib/field-notes"
import { SITE_URL, TWITTER_HANDLE } from "@/lib/site"
import { H2, Lede, NoteLayout, NoteLink, P } from "../note-components"

const note = getNote("how-long-does-it-take-to-build-an-app-with-ai")
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
        Weeks of evenings, not years — but not a weekend either. Working two
        hours on weeknights plus Saturday mornings, a real product takes me a
        few weeks to reach launch, and longer to reach the version I'm not
        embarrassed by. Anyone promising a serious app in a day is selling
        something. Here's where the time goes.
      </Lede>

      <H2>The demo comes fast</H2>
      <P>
        The first working version is genuinely quick now. A screen, a flow,
        data being saved — with{" "}
        <NoteLink href="/field-notes/what-is-vibe-coding">vibe coding</NoteLink>{" "}
        that can exist within the first few sessions. This is the part the hype
        videos show, and the part that makes &quot;I built an app in 24
        hours&quot; technically true and practically misleading: nobody's data
        is in a demo.
      </P>

      <H2>The last 20 percent is most of the calendar</H2>
      <P>
        What stands between demo and product, launch after launch: accounts and
        login. Payments. The empty states nobody plans for. What happens when
        the network drops mid-save. What happens when a user does the thing you
        never imagined.
      </P>
      <P>
        If you're shipping to phones, add store review. PairHabit's App Store
        release was its own education — guidelines, review cycles, launch
        mechanics I learned live, on the clock.
      </P>

      <H2>Scope moves the number. Skill doesn't.</H2>
      <P>
        Scope, more than skill. A single-purpose web tool is weeks. A two-sided
        app that syncs between people is months of margins. Platform matters
        too: web ships in one step; iOS adds Apple to your schedule.
      </P>
      <P>
        And your hours. My math is simple: two hours a night, five nights, plus
        a Saturday morning is around 13 hours a week. So a &quot;three
        month&quot; project is really a 150-hour project. Count your hours, not
        your months — it's the only estimate that survives contact with a
        full-time job.
      </P>

      <H2>Where that leaves you</H2>
      <P>
        The tools removed the years of training. They didn't remove the work.
        And if you're building around a job and a family, the schedule itself
        becomes the skill — that one gets{" "}
        <NoteLink href="/field-notes/build-a-side-project-with-a-full-time-job">
          its own field note
        </NoteLink>
        .
      </P>
    </NoteLayout>
  )
}
