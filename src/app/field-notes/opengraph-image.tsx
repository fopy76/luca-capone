import { FIELD_NOTES, FIELD_NOTES_ASIDE } from "@/lib/field-notes"
import { PERSON, SITE_URL, countWord } from "@/lib/site"
import { Headline, setHeadline } from "../og/headline"
import {
  At,
  C,
  F,
  HEAD,
  Hand,
  Leaf,
  Mono,
  RunningHead,
  headlineMeasure,
  plain,
  render,
} from "../og/kit"

// The share image of the /field-notes index: the page's own first screen.
// The heading and its handwritten line in the left margin, and the titles of
// the notes in the text block, read from src/lib/field-notes.ts. Each note
// has its own image (app/og/note.tsx).
export { contentType, size } from "../og/kit"

// The page's <h1>, and the word the highlighter goes over.
const HEADLINE = "Field notes"
const SWIPE = "notes"

export const alt = plain(`Field notes by ${PERSON.name}, ${FIELD_NOTES_ASIDE}`)

// Where things stand on the 1200 by 630 canvas.
const LINES: [number, number] = [500, 1040]
const [colLeft, colRight] = LINES
const marginWidth = colLeft - 28 - 56
const textLeft = colLeft + 28
const textWidth = colRight - colLeft - 56

// The note that changed last dates the whole section.
const latest = FIELD_NOTES.reduce((a, b) => (b.dateModified > a.dateModified ? b : a))

export default async function Image() {
  const measure = await headlineMeasure()
  const headline = setHeadline(HEADLINE, SWIPE, measure, {
    sizes: [116, 108, 100, 92, 84],
    maxWidth: marginWidth,
    maxHeight: 230,
    maxLines: 2,
  })

  return render(
    <Leaf lines={LINES} from={HEAD}>
      <RunningHead
        name={PERSON.name}
        address={`${new URL(SITE_URL).host}/field-notes`}
      />

      <At x={56} y={112} w={marginWidth} style={{ justifyContent: "flex-end" }}>
        <Headline set={headline} measure={measure} align="right" />
      </At>
      <At x={56} y={112 + headline.height + 26} w={marginWidth} style={{ justifyContent: "flex-end" }}>
        <div style={{ display: "flex", width: 250 }}>
          <Hand text={FIELD_NOTES_ASIDE} px={42} align="right" />
        </div>
      </At>

      <At x={textLeft} y={104}>
        <Mono px={14}>
          {`${countWord(FIELD_NOTES.length)} notes · Updated ${latest.dateModifiedDisplay}`}
        </Mono>
      </At>
      <At x={textLeft} y={138} w={textWidth} style={{ flexDirection: "column" }}>
        {FIELD_NOTES.map((note) => (
          <div
            key={note.slug}
            style={{
              display: "block",
              width: "100%",
              padding: "13px 0 14px",
              borderTop: `1px solid ${C.rule}`,
              fontFamily: F.italic,
              fontStyle: "italic",
              fontSize: 29,
              lineHeight: 1.14,
              letterSpacing: -0.2,
              color: C.ink,
              textWrap: "balance",
            }}
          >
            {note.title}
          </div>
        ))}
      </At>
    </Leaf>,
  )
}
