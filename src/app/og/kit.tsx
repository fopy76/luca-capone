// The share images (Open Graph and Twitter cards) in the Margins look.
//
// Every opengraph-image.tsx on the site draws its card with the pieces in
// this file and hands it to render(). The cards are built once, at build
// time, by next/og: a renderer that understands flexbox, absolute positioning
// and inline SVG, and nothing else of CSS. So nothing here comes from
// styles/margins.css. The look is redrawn with the same colours, the same
// four type families and the same pen strokes.
//
// Fonts: the renderer takes TTF, OTF or WOFF, one fixed style per file. It
// rejects the site's woff2 files ("Unsupported OpenType signature wOF2") and
// has no notion of a variable font. The files in ../fonts/og are therefore
// fixed cuts of the same fonts the pages use. CLAUDE.md ("Fonts") says how
// each one was made.
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { cloneElement, isValidElement } from "react"
import type { CSSProperties, ReactElement, ReactNode } from "react"
import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// The same values as :root in styles/margins.css.
export const C = {
  paper: "#FBFAF7",
  ink: "#131729",
  ink2: "#3A3F55",
  grey: "#5E6377",
  rule: "#D3D5DF",
  rule2: "#E6E7ED",
  hl: "#FACF39",
  onHl: "#1C1C1E",
  pencil: "#C4281C",
  pen: "#1E3E9E",
} as const

// One family name per cut, so a style can never be matched to the wrong one.
// (The mono has two weights under its one name.)
export const F = {
  // Fraunces italic at its display size: headlines.
  headline: "Fraunces Display Italic",
  // Fraunces italic at a text size: the wordmark, the label on the yellow band.
  italic: "Fraunces Text Italic",
  // Fraunces upright: names, numbers.
  display: "Fraunces",
  // Newsreader: running text.
  text: "Newsreader",
  // Caveat: the handwriting.
  hand: "Caveat",
  // IBM Plex Mono, regular and medium: labels and stamps.
  mono: "IBM Plex Mono",
} as const

type Face = {
  name: string
  file: string
  weight: 400 | 500
  style: "normal" | "italic"
}

const FACES: Face[] = [
  { name: F.headline, file: "fraunces-italic-display.ttf", weight: 400, style: "italic" },
  { name: F.italic, file: "fraunces-italic-text.ttf", weight: 400, style: "italic" },
  { name: F.display, file: "fraunces-upright.ttf", weight: 400, style: "normal" },
  { name: F.text, file: "newsreader.ttf", weight: 400, style: "normal" },
  { name: F.hand, file: "caveat.ttf", weight: 400, style: "normal" },
  { name: F.mono, file: "plex-mono-regular.ttf", weight: 400, style: "normal" },
  { name: F.mono, file: "plex-mono-medium.ttf", weight: 500, style: "normal" },
]

type LoadedFace = Face & { data: Buffer }

// process.cwd() is the project root, at build time and in `next dev` alike.
let faces: Promise<LoadedFace[]> | undefined
function loadFaces(): Promise<LoadedFace[]> {
  faces ??= Promise.all(
    FACES.map(async (face) => ({
      ...face,
      data: await readFile(join(process.cwd(), "src/app/fonts/og", face.file)),
    })),
  )
  return faces
}

// --- measuring ------------------------------------------------------------
// The renderer wraps a line of text on its own, but it cannot run the
// highlighter over three words in the middle of one. A headline with a swipe
// is therefore set line by line, and to choose the breaks the card has to
// know how wide a word is. This reads the two tables of a TTF that say so:
// cmap (letter to glyph) and hmtx (glyph to width). Kerning is ignored: it
// moves a line by a pixel or two.

export type Measure = (text: string, fontSize: number, tracking?: number) => number

function measurer(font: Buffer): Measure {
  const tables = new Map<string, number>()
  const count = font.readUInt16BE(4)
  for (let i = 0; i < count; i++) {
    const at = 12 + i * 16
    tables.set(font.toString("latin1", at, at + 4), font.readUInt32BE(at + 8))
  }
  const table = (tag: string): number => {
    const offset = tables.get(tag)
    if (offset === undefined) throw new Error(`Share image font has no ${tag} table`)
    return offset
  }

  const unitsPerEm = font.readUInt16BE(table("head") + 18)
  const longMetrics = font.readUInt16BE(table("hhea") + 34)
  const hmtx = table("hmtx")
  const advance = (glyph: number): number =>
    font.readUInt16BE(hmtx + Math.min(glyph, longMetrics - 1) * 4)

  // The Unicode subtable in format 4 (every letter the site uses is in it).
  const cmap = table("cmap")
  let sub = -1
  for (let i = 0; i < font.readUInt16BE(cmap + 2); i++) {
    const record = cmap + 4 + i * 8
    const at = cmap + font.readUInt32BE(record + 4)
    if (font.readUInt16BE(at) === 4) sub = at
  }
  if (sub < 0) throw new Error("Share image font has no format 4 cmap")
  const segments = font.readUInt16BE(sub + 6) / 2
  const ends = sub + 14
  const starts = ends + segments * 2 + 2
  const deltas = starts + segments * 2
  const offsets = deltas + segments * 2

  const glyphOf = (code: number): number => {
    for (let i = 0; i < segments; i++) {
      if (font.readUInt16BE(ends + i * 2) < code) continue
      const start = font.readUInt16BE(starts + i * 2)
      if (start > code) return 0
      const delta = font.readUInt16BE(deltas + i * 2)
      const rangeAt = offsets + i * 2
      const range = font.readUInt16BE(rangeAt)
      if (range === 0) return (code + delta) & 0xffff
      const glyph = font.readUInt16BE(rangeAt + range + (code - start) * 2)
      return glyph === 0 ? 0 : (glyph + delta) & 0xffff
    }
    return 0
  }

  // tracking is letter-spacing in em, as in the stylesheet.
  return (text, fontSize, tracking = 0) => {
    let units = 0
    for (const char of text) units += advance(glyphOf(char.codePointAt(0) ?? 0))
    return (units / unitsPerEm) * fontSize + [...text].length * tracking * fontSize
  }
}

// Widths in one of the families of F.
export async function measureIn(family: string): Promise<Measure> {
  const loaded = await loadFaces()
  const face = loaded.find((f) => f.name === family)
  if (!face) throw new Error(`Share image font "${family}" is missing`)
  return measurer(face.data)
}

// Widths in the headline face, for cards that set a headline line by line.
export const headlineMeasure = (): Promise<Measure> => measureIn(F.headline)

// How many lines a paragraph takes at a given width. The renderer breaks
// lines the same greedy way, so a card can know the height of a paragraph
// before it is drawn.
export function lineCount(text: string, measure: Measure, px: number, width: number): number {
  const space = measure(" ", px)
  let lines = 1
  let used = 0
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const wide = measure(word, px)
    if (used > 0 && used + space + wide > width) {
      lines++
      used = wide
    } else {
      used += (used > 0 ? space : 0) + wide
    }
  }
  return lines
}

// The narrowest box that keeps a paragraph in the same number of lines, so
// its last line is not one stranded word. It is what `text-wrap: balance`
// does on the pages. (The renderer has that property too, but it cuts the
// text short when a line clamp is set beside it.)
export function balancedWidth(text: string, measure: Measure, px: number, width: number): number {
  const lines = lineCount(text, measure, px, width)
  let low = width / lines
  let high = width
  for (let step = 0; step < 12; step++) {
    const middle = (low + high) / 2
    if (lineCount(text, measure, px, middle) > lines) low = middle
    else high = middle
  }
  // A little slack: these widths leave kerning out.
  return Math.min(width, Math.ceil(high * 1.02) + 2)
}

// --- rendering ------------------------------------------------------------

// No em dash or en dash is ever drawn on a share image. The site's copy has
// none: a sentence that wants one is rewritten, and a dash is never swapped
// for a hyphen. This is the net under that rule, for copy that changes without
// anyone looking at the card (the /now snapshot is rewritten weekly). A dash
// between two numbers is a range and reads "to"; any other is a pause, and a
// comma takes its place. render() passes every string on a card through
// plain(), a headline is made plain before it is set, and the cards use it
// for their alt text too. The range is U+2012 to U+2015: figure dash, en
// dash, em dash and horizontal bar.
const EDGE_DASH = /^\s*[\u2012-\u2015]\s*|\s*[\u2012-\u2015]\s*$/g
const RANGE_DASH = /(\d)\s*[\u2012-\u2015]\s*(?=\d)/g
const PAUSE_DASH = /\s*[\u2012-\u2015]\s*/g
export const plain = (text: string): string =>
  text
    // one that opens or closes the text has nothing to join, and goes
    .replace(EDGE_DASH, "")
    .replace(RANGE_DASH, "$1 to ")
    .replace(PAUSE_DASH, ", ")

// Walks a card and returns it with every string made plain. It calls the
// small components in this file itself, so none of them is skipped.
function inked(node: ReactNode): ReactNode {
  if (typeof node === "string") return plain(node)
  if (Array.isArray(node)) return node.map(inked)
  if (!isValidElement(node)) return node
  const element = node as ReactElement<{ children?: ReactNode }>
  if (typeof element.type === "function") {
    const component = element.type as (props: unknown) => ReactNode
    return inked(component(element.props))
  }
  const children = element.props.children
  if (children === undefined) return element
  return Array.isArray(children)
    ? cloneElement(element, undefined, ...children.map(inked))
    : cloneElement(element, undefined, inked(children))
}

export async function render(card: ReactElement): Promise<ImageResponse> {
  const loaded = await loadFaces()
  return new ImageResponse(inked(card) as ReactElement, {
    ...size,
    fonts: loaded.map(({ name, data, weight, style }) => ({ name, data, weight, style })),
  })
}

// --- the page -------------------------------------------------------------

// The leaf: paper, and the two hairlines the text block sits between. `lines`
// is where they stand, in pixels from the left. Everything on a card is
// placed by hand (position: absolute): the canvas never changes size.
export function Leaf({
  lines,
  from = 0,
  children,
}: {
  lines: [number, number]
  // Where the hairlines start, when a running head sits above them.
  from?: number
  children: ReactNode
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: size.width,
        height: size.height,
        backgroundColor: C.paper,
        color: C.ink,
        fontFamily: F.text,
      }}
    >
      {lines.map((x) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: x,
            top: from,
            width: 1,
            height: size.height - from,
            backgroundColor: C.rule,
          }}
        />
      ))}
      {children}
    </div>
  )
}

// A box placed on the canvas. The renderer stops on a style whose value is
// undefined, so only the sides that were given are passed on.
export function At({
  x,
  y,
  w,
  h,
  right,
  bottom,
  style,
  children,
}: {
  x?: number
  y?: number
  w?: number
  h?: number
  right?: number
  bottom?: number
  style?: CSSProperties
  children?: ReactNode
}) {
  const box = { left: x, top: y, right, bottom, width: w, height: h }
  const given = Object.fromEntries(
    Object.entries(box).filter(([, value]) => value !== undefined),
  )
  return (
    <div style={{ position: "absolute", display: "flex", ...given, ...style }}>
      {children}
    </div>
  )
}

// --- the voices -----------------------------------------------------------

// Labels: small capitals in the mono face (.mono in the stylesheet).
export function Mono({
  children,
  px = 15,
  color = C.grey,
  medium = false,
  tracking = 0.09,
  style,
}: {
  children: ReactNode
  px?: number
  color?: string
  medium?: boolean
  tracking?: number
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: F.mono,
        fontWeight: medium ? 500 : 400,
        fontSize: px,
        lineHeight: 1.3,
        letterSpacing: px * tracking,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        color,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Headline type: Fraunces italic at its display cut (.hero h1, .page-head h1).
export const HEADLINE_TRACKING = -0.022
export const HEADLINE_LEADING = 0.99

export function headlineStyle(px: number): CSSProperties {
  return {
    fontFamily: F.headline,
    fontStyle: "italic",
    fontSize: px,
    lineHeight: HEADLINE_LEADING,
    letterSpacing: px * HEADLINE_TRACKING,
    color: C.ink,
    whiteSpace: "nowrap",
  }
}

// The highlighter: one swipe behind a few words of a headline (.hl). It is
// the stylesheet's gradient, linear-gradient(101deg, ...): soft at both ends
// and leaning with the italic. The renderer flattens the angle of a CSS
// gradient on a wide box, so the same gradient is drawn here as an SVG, with
// its line worked out the way CSS does it. It sits where the stylesheet puts
// it for a headline: from just under the top of the tall letters to a little
// below the baseline, so the descenders hang out of it.
//
// `width` is the width of the words, from headlineMeasure().
const SWIPE_STOPS: [number, number][] = [
  [0.006, 0],
  [0.022, 0.96],
  [0.46, 0.82],
  [0.974, 0.95],
  [0.992, 0],
]
const SWIPE_ANGLE = (101 * Math.PI) / 180
// How far the swipe reaches past the words on each side, in em.
const SWIPE_PAD = 0.12

export function Swipe({ text, px, width }: { text: string; px: number; width: number }) {
  const pad = px * SWIPE_PAD
  const w = width + pad * 2
  const h = px * 0.91
  const dx = Math.sin(SWIPE_ANGLE)
  const dy = -Math.cos(SWIPE_ANGLE)
  const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        marginLeft: -pad,
        marginRight: -pad,
        paddingLeft: pad,
        paddingRight: pad,
      }}
    >
      <div style={{ position: "absolute", display: "flex", left: 0, top: px * 0.1 }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <defs>
            <linearGradient
              id="swipe"
              gradientUnits="userSpaceOnUse"
              x1={w / 2 - half * dx}
              y1={h / 2 - half * dy}
              x2={w / 2 + half * dx}
              y2={h / 2 + half * dy}
            >
              {SWIPE_STOPS.map(([offset, opacity]) => (
                <stop key={offset} offset={offset} stopColor={C.hl} stopOpacity={opacity} />
              ))}
            </linearGradient>
          </defs>
          <rect width={w} height={h} fill="url(#swipe)" />
        </svg>
      </div>
      <div style={{ position: "relative", display: "flex" }}>{text}</div>
    </div>
  )
}

// Handwriting in the margin (.hand): blue pen, or red pencil. It wraps inside
// the box it is placed in, so a note can be any length.
export function Hand({
  text,
  px = 40,
  red = false,
  align = "left",
  tilt = -2,
}: {
  text: string
  px?: number
  red?: boolean
  align?: "left" | "right"
  tilt?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        textAlign: align,
        fontFamily: F.hand,
        fontSize: px,
        lineHeight: 1.08,
        color: red ? C.pencil : C.pen,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {text}
    </div>
  )
}

// Keeps a few words on one line ("9 to 11 PM") when the text around them wraps.
export const unbroken = (words: string): string => words.replace(/ /g, "\u00a0")

// A pen stroke: one or more SVG paths, drawn in the round nib of the site's
// own arrows and braces (.draw).
export function Stroke({
  box,
  paths,
  w,
  h,
  color = C.pen,
  weight = 2.2,
  stretch = false,
}: {
  // The viewBox the paths were drawn in.
  box: [number, number]
  paths: string[]
  w: number
  h: number
  color?: string
  // Line width in the viewBox's own units.
  weight?: number
  // Fill w by h whatever the shape of the viewBox (a ring around a label).
  stretch?: boolean
}) {
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${box[0]} ${box[1]}`}
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      fill="none"
    >
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={weight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

// The running head of the pages other than the home page: the wordmark on
// the left (.wordmark), the site's address on the right, and the rule under
// them. HEAD is where the rule sits; the hairlines of the leaf start there.
export const HEAD = 70

export function RunningHead({ name, address }: { name: string; address: string }) {
  return (
    <>
      <At x={56} y={19}>
        <div
          style={{
            display: "flex",
            fontFamily: F.italic,
            fontStyle: "italic",
            fontSize: 29,
            lineHeight: 1.1,
            color: C.ink,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
      </At>
      <At x={0} y={27} w={size.width - 56} style={{ justifyContent: "flex-end" }}>
        <Mono px={14}>{address}</Mono>
      </At>
      <At x={0} y={HEAD} w={size.width} h={1} style={{ backgroundColor: C.rule }} />
    </>
  )
}

// A rubber stamp (.stamp): medium mono in a double frame, a little crooked.
export function Stamp({
  children,
  px = 20,
  color = C.ink,
  tilt = -4,
}: {
  children: ReactNode
  px?: number
  color?: string
  tilt?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        padding: 3,
        border: `1px solid ${color}`,
        borderRadius: 5,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: `${px * 0.52}px ${px * 0.86}px ${px * 0.5}px ${px * 1.06}px`,
          border: `2px solid ${color}`,
          borderRadius: 3,
        }}
      >
        <Mono px={px} color={color} medium tracking={0.2}>
          {children}
        </Mono>
      </div>
    </div>
  )
}

// The arrow after a link that leaves the page (GoArrow in components/ink.tsx).
export function GoArrow({ px, color = C.ink }: { px: number; color?: string }) {
  return (
    <Stroke
      box={[24, 24]}
      w={px}
      h={px}
      color={color}
      weight={2}
      paths={["M7 17 17 7", "M9 7h8v8"]}
    />
  )
}
