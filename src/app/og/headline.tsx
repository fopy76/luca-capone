// A headline with the highlighter over a few of its words, set line by line.
//
// The renderer behind the share images breaks a line of text on its own, but
// it cannot break a sentence that has a swipe in the middle of it. So the
// card chooses the breaks: the words are measured (headlineMeasure in
// kit.tsx), the lines are balanced the way `text-wrap: balance` balances the
// headlines on the pages, and the type is set as large as the space allows.
import { HEADLINE_LEADING, HEADLINE_TRACKING, Swipe, headlineStyle } from "./kit"
import type { Measure } from "./kit"

// A run of letters with no break in it. `swipe` marks the highlighted words.
type Piece = { text: string; swipe: boolean }
// One or more pieces that stay together on a line ("coding" + swipe end "?").
type Unit = Piece[]
type Segment = Piece & { spaceBefore: boolean }
type Line = { segments: Segment[]; width: number }

export type SetHeadline = { px: number; lines: Line[]; width: number; height: number }

// Splits a headline into the units a line may break between. The swiped
// words are one unit, and so is anything written tight against them.
function unitsOf(text: string, swipe: string): Unit[] {
  const at = text.indexOf(swipe)
  if (swipe === "" || at < 0) {
    throw new Error(
      `Share image: the words to highlight ("${swipe}") are not in the headline "${text}".`,
    )
  }
  const before = text.slice(0, at)
  const after = text.slice(at + swipe.length)
  const words = (run: string): string[] => run.split(/\s+/).filter(Boolean)

  const units: Unit[] = words(before).map((word) => [{ text: word, swipe: false }])
  const marked: Piece = { text: swipe, swipe: true }
  // "(swipe": no space before the swipe, so it joins the word before it.
  if (before !== "" && !/\s$/.test(before) && units.length > 0) {
    units[units.length - 1].push(marked)
  } else {
    units.push([marked])
  }
  const rest = words(after)
  // "swipe?": no space after the swipe, so what follows joins it.
  if (after !== "" && !/^\s/.test(after) && rest.length > 0) {
    units[units.length - 1].push({ text: rest.shift() as string, swipe: false })
  }
  for (const word of rest) units.push([{ text: word, swipe: false }])
  return units
}

// Every way to cut `count` units into `lines` consecutive groups.
function* cuts(count: number, lines: number, from = 0): Generator<number[]> {
  if (lines === 1) {
    yield [count]
    return
  }
  for (let end = from + 1; end <= count - (lines - 1); end++) {
    for (const rest of cuts(count, lines - 1, end)) yield [end, ...rest]
  }
}

// A line that ends on a stranded little word ("a", "of", "to") reads badly.
const STRANDED = /^[A-Za-z]{1,2}$/

function balance(units: Unit[], lineCount: number, px: number, measure: Measure): Line[] | null {
  if (units.length < lineCount) return null
  const space = measure(" ", px, HEADLINE_TRACKING)
  const widths = units.map((unit) =>
    unit.reduce((sum, piece) => sum + measure(piece.text, px, HEADLINE_TRACKING), 0),
  )

  let best: { ends: number[]; cost: number } | null = null
  for (const ends of cuts(units.length, lineCount)) {
    let start = 0
    let widest = 0
    let spread = 0
    let stranded = 0
    ends.forEach((end, index) => {
      let width = (end - start - 1) * space
      for (let i = start; i < end; i++) width += widths[i]
      widest = Math.max(widest, width)
      spread += width * width
      const last = units[end - 1][units[end - 1].length - 1]
      if (index < ends.length - 1 && !last.swipe && STRANDED.test(last.text)) stranded++
      start = end
    })
    // The widest line decides. Between equals: fewer stranded words, then
    // the more even set.
    const cost = widest * (1 + stranded * 0.12) + Math.sqrt(spread) / 1000
    if (!best || cost < best.cost) best = { ends, cost }
  }
  if (!best) return null

  const lines: Line[] = []
  let start = 0
  for (const end of best.ends) {
    const segments: Segment[] = []
    let width = 0
    for (let i = start; i < end; i++) {
      units[i].forEach((piece, n) => {
        const spaceBefore = n === 0 && i > start
        const previous = segments[segments.length - 1]
        // Plain words that follow each other are one run of text.
        if (previous && !previous.swipe && !piece.swipe) {
          previous.text += (spaceBefore ? " " : "") + piece.text
        } else {
          segments.push({ ...piece, spaceBefore })
        }
      })
      width += widths[i] + (i > start ? space : 0)
    }
    lines.push({ segments, width })
    start = end
  }
  return lines
}

// Sets `text` as large as it goes inside `maxWidth` by `maxHeight`, in at
// most `maxLines` lines, trying `sizes` from the largest down. A third line
// has to buy clearly larger type to be worth it.
export function setHeadline(
  text: string,
  swipe: string,
  measure: Measure,
  {
    sizes,
    maxWidth,
    maxHeight,
    maxLines = 3,
  }: { sizes: number[]; maxWidth: number; maxHeight: number; maxLines?: number },
): SetHeadline {
  const units = unitsOf(text, swipe)
  let best: (SetHeadline & { score: number }) | null = null
  let fallback: SetHeadline | null = null

  for (const px of [...sizes].sort((a, b) => b - a)) {
    for (let lineCount = 1; lineCount <= maxLines; lineCount++) {
      const lines = balance(units, lineCount, px, measure)
      if (!lines) continue
      const width = Math.max(...lines.map((line) => line.width))
      const height = lineCount * px * HEADLINE_LEADING
      const set = { px, lines, width, height }
      // The smallest size in the most lines, in case nothing fits.
      fallback = set
      if (width > maxWidth || height > maxHeight) continue
      const score = px * (lineCount > 2 ? 0.9 : 1)
      if (!best || score > best.score) best = { ...set, score }
      break
    }
  }
  const chosen = best ?? fallback
  if (!chosen) throw new Error(`Share image: no way to set the headline "${text}".`)
  return chosen
}

// Draws a set headline. `align` is the edge its lines share.
export function Headline({
  set,
  measure,
  align = "left",
}: {
  set: SetHeadline
  measure: Measure
  align?: "left" | "right"
}) {
  const space = measure(" ", set.px, HEADLINE_TRACKING)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "right" ? "flex-end" : "flex-start",
        ...headlineStyle(set.px),
      }}
    >
      {set.lines.map((line, index) => (
        <div key={index} style={{ display: "flex" }}>
          {line.segments.map((segment, n) => (
            <div
              key={n}
              style={{ display: "flex", marginLeft: segment.spaceBefore ? space : 0 }}
            >
              {segment.swipe ? (
                <Swipe
                  text={segment.text}
                  px={set.px}
                  width={measure(segment.text, set.px, HEADLINE_TRACKING)}
                />
              ) : (
                segment.text
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
