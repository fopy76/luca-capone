import { stampDate } from "@/lib/dates"
import { nowBlocks, nowLastUpdated, nowLastUpdatedDisplay, nowTeaserItems } from "@/lib/now"
import { PERSON, SITE_URL } from "@/lib/site"
import { Headline, setHeadline } from "../og/headline"
import {
  At,
  C,
  F,
  GoArrow,
  HEAD,
  Leaf,
  Mono,
  RunningHead,
  Stamp,
  Stroke,
  headlineMeasure,
  headlineStyle,
  lineCount,
  measureIn,
  plain,
  render,
} from "../og/kit"

// The share image of /now: the page's own first screen. Its headline in the
// left margin, the date of the snapshot as a stamp, the first one-liner of
// the snapshot, and the names in its first block. Everything but the
// headline is read from src/lib/now.ts, so the weekly update redraws the
// card. There is no handwriting on it, for the reason there is none on the
// page: nothing would rewrite it.
export { contentType, size } from "../og/kit"

// The page's <h1>, and the word the highlighter goes over.
const HEADLINE = "What I'm doing now"
const SWIPE = "now"

export const alt = plain(`What ${PERSON.name} is doing now. Updated ${nowLastUpdatedDisplay}.`)

// Where things stand on the 1200 by 630 canvas.
const LINES: [number, number] = [500, 1040]
const LIST_TOP = 392
const ROW = 52
// As many names as fit under the one-liner.
const MOST = 4
const LABEL_PX = 14
// The one-liner is rewritten every week and may be any length. It is set in
// the first of these (size in px, lines) that holds it: three lines of 25 px
// today. One longer than the last is cut off with an ellipsis.
const LEAD_FITS: [number, number][] = [
  [25, 3],
  [24, 3],
  [23, 3],
  [23, 4],
  [22, 4],
]
const LEAD_LEADING = 1.36

const [colLeft, colRight] = LINES
const marginWidth = colLeft - 28 - 56
const textLeft = colLeft + 28
const textWidth = colRight - colLeft - 56
// The first of the curated one-liners (the home page teaser shows all three).
const lead = nowTeaserItems[0]
// The block the page opens with.
const block = nowBlocks.find((candidate) => candidate.id === "building") ?? nowBlocks[0]

// The red pencil ring around a label, the first of the three drawn in
// components/NowSection.tsx. It stretches to the label, whatever its length.
const RING =
  "M62 5 C 26 3, 4 13, 5 26 C 6 41, 40 47, 68 46 C 99 45, 117 36, 115 22 C 113 9, 86 3, 50 7"

function Ringed({ label }: { label: string }) {
  // Mono type: every letter is 0.6 em wide, plus its tracking.
  const width = label.length * LABEL_PX * (0.6 + 0.09)
  return (
    <div style={{ position: "relative", display: "flex", padding: "11px 20px 11px 22px" }}>
      <At x={0} y={0}>
        <Stroke
          box={[120, 50]}
          w={width + 42}
          h={LABEL_PX * 1.3 + 22}
          color={C.pencil}
          paths={[RING]}
          stretch
        />
      </At>
      <Mono px={LABEL_PX} color={C.ink2}>
        {label}
      </Mono>
    </div>
  )
}

export default async function Image() {
  const measure = await headlineMeasure()
  const headline = setHeadline(HEADLINE, SWIPE, measure, {
    sizes: [108, 104, 96, 88, 80],
    maxWidth: marginWidth,
    maxHeight: 230,
    maxLines: 2,
  })
  const textMeasure = await measureIn(F.text)
  const [leadPx, leadLines] =
    LEAD_FITS.find(
      ([px, lines]) => !lead || lineCount(lead.text, textMeasure, px, textWidth) <= lines,
    ) ?? LEAD_FITS[LEAD_FITS.length - 1]

  return render(
    <Leaf lines={LINES} from={HEAD}>
      <RunningHead name={PERSON.name} address={`${new URL(SITE_URL).host}/now`} />

      <At x={56} y={106} w={marginWidth} style={{ justifyContent: "flex-end" }}>
        <Headline set={headline} measure={measure} align="right" />
      </At>

      <At x={textLeft + 2} y={112}>
        <Stamp px={19}>{`Updated ${stampDate(nowLastUpdated)}`}</Stamp>
      </At>

      {lead && (
        <>
          <At x={textLeft - 14} y={196}>
            <Ringed label={lead.label} />
          </At>
          <At x={textLeft} y={248} w={textWidth}>
            <div
              style={{
                display: "block",
                lineClamp: leadLines,
                fontFamily: F.text,
                fontSize: leadPx,
                lineHeight: LEAD_LEADING,
                color: C.ink2,
              }}
            >
              {lead.text}
            </div>
          </At>
        </>
      )}

      {block && (
        <>
          <At
            x={56}
            y={LIST_TOP + 2}
            w={marginWidth}
            style={{ justifyContent: "flex-end", ...headlineStyle(50) }}
          >
            {block.heading}
          </At>
          {block.items.slice(0, MOST).map((item, index) => (
            <At
              key={item.title}
              x={textLeft}
              y={LIST_TOP + index * ROW}
              w={textWidth}
              h={ROW}
              style={{ alignItems: "center", borderTop: `1px solid ${C.rule}` }}
            >
              <div
                style={{
                  display: "block",
                  maxWidth: textWidth - 44,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: F.display,
                  fontSize: 32,
                  lineHeight: 1.2,
                  color: C.ink,
                }}
              >
                {item.title}
              </div>
              {item.href && (
                <div style={{ display: "flex", marginLeft: 9, marginTop: 4 }}>
                  <GoArrow px={22} />
                </div>
              )}
            </At>
          ))}
        </>
      )}
    </Leaf>,
  )
}
