import type { ReactNode } from "react"
import { CREDIBILITY_ITEMS, DAY_PLAN, MARGIN_HOURS, PERSON } from "@/lib/site"
import {
  At,
  C,
  F,
  HEAD,
  HEADLINE_TRACKING,
  Hand,
  Leaf,
  Mono,
  Stroke,
  Swipe,
  headlineMeasure,
  headlineStyle,
  plain,
  render,
  size,
  unbroken,
} from "./og/kit"

// The share image of the home page: its first screen in small. The headline
// with the swipe, the day drawn as a planner between the two hairlines
// (fig. 1), and the notes in the margin that say when the building happens.
export { contentType, size } from "./og/kit"

// The hero's sentence, in the hero's five phrases (HEADLINE and the <h1> in
// components/HeroSection.tsx). The name, the job and the kids come from
// site.ts. If the hero headline is reworded, reword this with it.
const PHRASES: { text: string; swipe?: boolean }[] = [
  { text: `I'm ${PERSON.name}.` },
  { text: "I build AI products" },
  { text: "in the margins", swipe: true },
  { text: `of a ${DAY_PLAN.job.label}` },
  { text: `and ${DAY_PLAN.kids.label}.` },
]

export const alt = plain(PHRASES.map((phrase) => phrase.text).join(" "))

// Where things stand on the 1200 by 630 canvas. The headline ends well above
// the bottom left corner on purpose: X lays the site's address over it.
const LINES: [number, number] = [562, 826]
const HEADLINE_PX = 84
const TRACK_TOP = 110
const TRACK_HEIGHT = 432
const NOTE_PX = 34

const { firstHour, lastHour, job, kids, margin, windows } = DAY_PLAN
const [colLeft, colRight] = LINES
const colWidth = colRight - colLeft
// The height of one hour on the planner (27 px for the 07 to 23 day).
const ROW = TRACK_HEIGHT / (lastHour - firstHour)
const yOf = (hour: number): number => TRACK_TOP + (hour - firstHour) * ROW
const pad = (hour: number): string => String(hour).padStart(2, "0")
const hours = Array.from({ length: lastHour - firstHour + 1 }, (_, n) => firstHour + n)
const onBand = (hour: number): boolean => hour >= margin.start && hour < margin.end
// The grey of the labels as it looks through the yellow band (the band is
// multiplied over the planner on the page).
const GREY_ON_BAND = "#5C501B"

// The folio is one line of mono type: every letter is 0.6 em wide plus its
// tracking, and a pilcrow with its two gaps stands between the items. It is
// set at 14 px, or smaller if site.ts ever makes it longer than the page.
const FOLIO_GAP = 16
const folioLetters = CREDIBILITY_ITEMS.join("").length + (CREDIBILITY_ITEMS.length - 1)
const folioGaps = (CREDIBILITY_ITEMS.length - 1) * FOLIO_GAP * 2
const FOLIO_PX = Math.min(
  14,
  Math.floor(((size.width - 112 - folioGaps) / (folioLetters * (0.6 + 0.09))) * 10) / 10,
)

// A hatched bar, faded at both ends: hours that are taken (.bar).
function Hatch({ x, start, end }: { x: number; start: number; end: number }) {
  const width = 7
  const height = Math.round((end - start) * ROW)
  const strokes: ReactNode[] = []
  for (let y = -width; y < height; y += 4) {
    strokes.push(<path key={y} d={`M0 ${y + width} L${width} ${y}`} />)
  }
  return (
    <At x={x} y={Math.round(yOf(start))}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.14" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.86" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="ends">
            <rect width={width} height={height} fill="url(#fade)" />
          </mask>
        </defs>
        <g mask="url(#ends)" stroke={C.grey} strokeWidth="1">
          {strokes}
        </g>
      </svg>
    </At>
  )
}

// The label that runs up a bar (.bar-label).
function BarLabel({ x, start, end, text }: { x: number; start: number; end: number; text: string }) {
  const length = 200
  const middle = (yOf(start) + yOf(end)) / 2
  return (
    <At
      x={x - length / 2}
      y={middle - 7}
      w={length}
      h={14}
      style={{ justifyContent: "center", alignItems: "center", transform: "rotate(-90deg)" }}
    >
      <Mono px={8.5} tracking={0.14}>
        {text}
      </Mono>
    </At>
  )
}

// The yellow band over the build window (.build), with the uneven printed
// edge the #rough filter gives it on the page.
function Band() {
  const overhang = 16
  const width = colWidth + overhang * 2
  const height = (margin.end - margin.start) * ROW - 3
  return (
    <At
      x={colLeft - overhang}
      y={yOf(margin.start) + 2}
      w={width}
      h={height}
      style={{ transform: "rotate(-0.35deg)", alignItems: "center" }}
    >
      <At x={-8} y={-8}>
        <svg width={width + 16} height={height + 16} viewBox={`0 0 ${width + 16} ${height + 16}`}>
          <defs>
            <filter id="rough" x="-5%" y="-20%" width="110%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <path
            filter="url(#rough)"
            fill={C.hl}
            d={`M11 8 H${width - 2} Q${width + 8} 8 ${width + 8} 11 V${height - 2} Q${width + 8} ${height + 8} ${width} ${height + 8} H12 Q8 ${height + 8} 8 ${height - 2} V17 Q8 8 11 8 Z`}
          />
        </svg>
      </At>
      <div
        style={{
          position: "relative",
          display: "flex",
          paddingLeft: 30,
          fontFamily: F.italic,
          fontStyle: "italic",
          fontSize: 27,
          letterSpacing: -0.27,
          color: C.onHl,
        }}
      >
        {margin.label}
      </div>
    </At>
  )
}

// A note in the right margin, beside the hours it is about: a brace over the
// span, or an arrow at its start (.note).
function MarginNote({ slot }: { slot: (typeof windows)[number] }) {
  const top = yOf(slot.start)
  const span = Math.round((slot.end - slot.start) * ROW)
  return (
    <>
      {slot.bracket ? (
        <At x={colRight + 10} y={top}>
          <Stroke
            box={[16, span]}
            w={16}
            h={span}
            paths={[`M13 2 C 5 3, 5 7, 6 14 L 6 ${span - 14} C 5 ${span - 7}, 6 ${span - 3}, 13 ${span - 2}`]}
          />
        </At>
      ) : (
        <At x={colRight + 24} y={top + 4}>
          <Stroke
            box={[80, 44]}
            w={54}
            h={30}
            weight={3}
            paths={["M77 34 C 54 38, 28 30, 6 14", "M6 14 l 13 1", "M6 14 l 5 12"]}
          />
        </At>
      )}
      <At x={colRight + (slot.bracket ? 44 : 90)} y={top - 3} w={slot.bracket ? 262 : 232}>
        <Hand text={slot.note.replace(MARGIN_HOURS, unbroken(MARGIN_HOURS))} px={NOTE_PX} tilt={0} />
      </At>
    </>
  )
}

export default async function Image() {
  const measure = await headlineMeasure()

  return render(
    <Leaf lines={LINES} from={HEAD}>
      {/* running head: the hero's folio */}
      <At x={56} y={27} style={{ alignItems: "center" }}>
        {CREDIBILITY_ITEMS.map((item, index) => (
          <div key={item} style={{ display: "flex", alignItems: "center" }}>
            {index > 0 && (
              <Mono
                px={FOLIO_PX}
                color={C.pencil}
                style={{ marginLeft: FOLIO_GAP, marginRight: FOLIO_GAP }}
              >
                ¶
              </Mono>
            )}
            <Mono px={FOLIO_PX}>{item}</Mono>
          </div>
        ))}
      </At>
      <At x={0} y={HEAD} w={size.width} h={1} style={{ backgroundColor: C.rule }} />

      {/* fig. 1: the day */}
      <At x={colLeft + 12} y={HEAD + 15}>
        <Mono px={11}>A day</Mono>
      </At>
      <At x={colLeft} y={HEAD + 15} w={colWidth - 12} style={{ justifyContent: "flex-end" }}>
        <Mono px={11}>fig. 1</Mono>
      </At>
      {hours.map((hour, n) => (
        <At
          key={hour}
          x={colLeft}
          y={yOf(hour)}
          w={colWidth}
          h={1}
          style={{ backgroundColor: n === 0 ? C.rule : C.rule2 }}
        />
      ))}
      {hours.slice(0, -1).map((hour) => (
        <At
          key={hour}
          x={colLeft + 1}
          y={yOf(hour + 0.5)}
          w={6}
          h={1}
          style={{ backgroundColor: C.rule2 }}
        />
      ))}
      <Hatch x={colRight - 66} start={job.start} end={job.end} />
      <BarLabel x={colRight - 75} start={job.start} end={job.end} text={job.label} />
      {kids.spans.map((span) => (
        <Hatch key={span.start} x={colRight - 92} start={span.start} end={span.end} />
      ))}
      <BarLabel
        x={colRight - 101}
        start={kids.spans[kids.spans.length - 1].start}
        end={kids.spans[kids.spans.length - 1].end}
        text={kids.label}
      />
      <Band />
      {hours.map((hour) => (
        <At
          key={hour}
          x={colLeft}
          y={yOf(hour) + 5}
          w={colWidth - 10}
          style={{ justifyContent: "flex-end" }}
        >
          <Mono px={10} tracking={0.04} color={onBand(hour) ? GREY_ON_BAND : C.grey}>
            {`${pad(hour)}:00`}
          </Mono>
        </At>
      ))}

      {/* the notes in the margin */}
      {windows.map((slot) => (
        <MarginNote key={slot.note} slot={slot} />
      ))}

      {/* the headline, up to the first hairline as on the page */}
      <At x={56} y={96} style={{ flexDirection: "column", ...headlineStyle(HEADLINE_PX) }}>
        {PHRASES.map((phrase) => (
          <div key={phrase.text} style={{ display: "flex" }}>
            {phrase.swipe ? (
              <Swipe
                text={phrase.text}
                px={HEADLINE_PX}
                width={measure(phrase.text, HEADLINE_PX, HEADLINE_TRACKING)}
              />
            ) : (
              phrase.text
            )}
          </div>
        ))}
      </At>
    </Leaf>,
  )
}
