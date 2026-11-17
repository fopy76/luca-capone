// The share image of a field note, drawn from its entry in
// src/lib/field-notes.ts: the title set large with the highlighter over its
// `highlight` words, the byline and the description under it as on the
// index, and the section's handwritten line in the margin.
//
// Each note folder has a short opengraph-image.tsx that names its slug and
// calls this. A note page states its own openGraph in its metadata, and that
// drops the image of the /field-notes segment above it, so a note without
// that file is shared with no image at all.
import { FIELD_NOTES_ASIDE, getNote } from "@/lib/field-notes"
import { PERSON, SITE_URL } from "@/lib/site"
import { Headline, setHeadline } from "./headline"
import {
  At,
  C,
  F,
  HEAD,
  Hand,
  Leaf,
  Mono,
  RunningHead,
  Stroke,
  balancedWidth,
  headlineMeasure,
  lineCount,
  measureIn,
  plain,
  render,
  size,
} from "./kit"

// Where things stand on the 1200 by 630 canvas.
const LINES: [number, number] = [214, 950]
const [colLeft, colRight] = LINES
const textLeft = colLeft + 30
const textWidth = colRight - colLeft - 60

const BYLINE_PX = 14
const BYLINE_GAP = 20
// The description is set at the largest of these sizes that keeps it within
// BLURB_LINES lines. A longer one than that is cut off with an ellipsis.
const BLURB_SIZES = [27, 26, 25, 24]
const BLURB_LEADING = 1.36
const BLURB_GAP = 22
const BLURB_WIDTH = Math.min(textWidth, 650)
const BLURB_LINES = 3
// The lowest the text may reach. X lays the site's address over the bottom
// left corner of a shared image, so the last line stays above it.
const FLOOR = 530

export function noteAlt(slug: string): string {
  const { title } = getNote(slug)
  const sentence = /[.?!]$/.test(title) ? title : `${title}.`
  return plain(`${sentence} A field note by ${PERSON.name}.`)
}

export async function noteImage(slug: string) {
  const note = getNote(slug)
  if (!note.title.includes(note.highlight)) {
    throw new Error(
      `Field note "${note.slug}": its highlight ("${note.highlight}") is not in its title ("${note.title}"). Change "highlight" in src/lib/field-notes.ts.`,
    )
  }
  const measure = await headlineMeasure()
  const title = setHeadline(note.title, note.highlight, measure, {
    sizes: [108, 100, 92, 84, 80, 76, 72, 68, 64, 60, 56],
    maxWidth: textWidth,
    maxHeight: 254,
    maxLines: 4,
  })

  const textMeasure = await measureIn(F.text)
  const linesAt = (px: number): number =>
    lineCount(note.description, textMeasure, px, BLURB_WIDTH)
  const blurbPx =
    BLURB_SIZES.find((px) => linesAt(px) <= BLURB_LINES) ??
    BLURB_SIZES[BLURB_SIZES.length - 1]
  const blurbLines = Math.min(BLURB_LINES, linesAt(blurbPx))
  const blurbWidth = balancedWidth(note.description, textMeasure, blurbPx, BLURB_WIDTH)

  // The block (title, byline, description) sits a little above the middle of
  // the page under the running head, and never lower than FLOOR.
  const blockHeight =
    title.height +
    BYLINE_GAP +
    BYLINE_PX * 1.3 +
    BLURB_GAP +
    blurbLines * blurbPx * BLURB_LEADING
  const room = size.height - HEAD - blockHeight
  const top = Math.round(
    Math.max(HEAD + 34, Math.min(HEAD + room * 0.42, FLOOR - blockHeight)),
  )
  const bylineTop = top + title.height + BYLINE_GAP

  return render(
    <Leaf lines={LINES} from={HEAD}>
      <RunningHead
        name={PERSON.name}
        address={`${new URL(SITE_URL).host}/field-notes`}
      />

      {/* the way back, in the left margin as on the page */}
      <At
        x={56}
        y={top + 12}
        w={colLeft - 56 - 24}
        style={{ justifyContent: "flex-end", alignItems: "center" }}
      >
        <Stroke
          box={[24, 24]}
          w={17}
          h={17}
          color={C.ink2}
          weight={2}
          paths={["M20 12H5", "M11 6l-6 6 6 6"]}
        />
        <Mono px={13} color={C.ink2} style={{ marginLeft: 7 }}>
          Field notes
        </Mono>
      </At>

      <At x={textLeft} y={top}>
        <Headline set={title} measure={measure} />
      </At>

      <At x={textLeft} y={bylineTop}>
        <Mono px={BYLINE_PX}>{`By ${PERSON.name} · Updated ${note.dateModifiedDisplay}`}</Mono>
      </At>
      <At x={textLeft} y={bylineTop + BYLINE_PX * 1.3 + BLURB_GAP} w={blurbWidth}>
        <div
          style={{
            display: "block",
            lineClamp: BLURB_LINES,
            fontFamily: F.text,
            fontSize: blurbPx,
            lineHeight: BLURB_LEADING,
            color: C.ink2,
          }}
        >
          {note.description}
        </div>
      </At>

      {/* the section's line, in the right margin */}
      <At x={colRight + 14} y={top + 58}>
        <Stroke
          box={[40, 30]}
          w={44}
          h={33}
          paths={["M38 22 C 26 24, 14 20, 4 8", "M4 8 l 9 1", "M4 8 l 3 9"]}
        />
      </At>
      <At x={colRight + 50} y={top + 74} w={168}>
        <Hand text={FIELD_NOTES_ASIDE} px={38} />
      </At>
    </Leaf>,
  )
}
