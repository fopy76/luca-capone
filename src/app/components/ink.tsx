// Small shared pieces of the Margins design: handwriting, the pen-drawn
// arrows, and the two date formats the home page prints. No hooks and no
// state, so these render on the server and inside client components alike.
import type { CSSProperties, ReactNode } from "react"
import { Fragment } from "react"

type WrittenProps = {
  text: string
  as?: "p" | "span"
  className?: string
  // Pen strokes that belong to the note (an arrow, for example). They are
  // drawn when the note is.
  children?: ReactNode
}

// A handwritten note that writes itself when it scrolls into view. The text
// is ordinary text in the HTML. Each word is wrapped in a span and given its
// place in the queue (--t, when the pen reaches it; --u, how long it takes),
// at about 34 ms a letter and never more than 2.4 s for a whole note.
// styles/margins.css does the wipe; InkEffects.tsx only decides when.
export function Written({ text, as: Tag = "p", className, children }: WrittenProps) {
  const words = text.split(/\s+/).filter(Boolean)
  const letters = words.reduce((sum, word) => sum + word.length, 0)
  const perLetter = Math.min(0.034, 2.4 / Math.max(1, letters))
  const queue: { word: string; style: CSSProperties }[] = []
  let at = 0.1
  for (const word of words) {
    const takes = Math.max(0.06, word.length * perLetter)
    queue.push({
      word,
      style: {
        "--t": `${at.toFixed(3)}s`,
        "--u": `${takes.toFixed(3)}s`,
      } as CSSProperties,
    })
    at += takes + 0.02
  }

  return (
    <Tag className={className} data-ink="" data-write="">
      {children}
      {queue.map(({ word, style }, index) => (
        <Fragment key={index}>
          {index > 0 ? " " : null}
          <span className="wd" style={style}>
            {word}
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}

type HandProps = WrittenProps & { red?: boolean }

// Margin handwriting: blue pen by default, red pencil for corrections.
export function Hand({ red, className, ...rest }: HandProps) {
  const classes = ["hand", red ? "red" : null, className].filter(Boolean).join(" ")
  return <Written className={classes} {...rest} />
}

// The short curved arrow that ties a margin note to the line it is about.
export function MarginArrow() {
  return (
    <svg className="draw auto" viewBox="0 0 40 30" aria-hidden="true">
      <path pathLength={1} d="M38 22 C 26 24, 14 20, 4 8" />
      <path pathLength={1} d="M4 8 l 9 1" />
      <path pathLength={1} d="M4 8 l 3 9" />
    </svg>
  )
}

// Arrow inside the yellow call-to-action button.
export function CtaArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

// Arrow after an italic text link.
export function GoArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function parts(iso: string): { year: string; month: string; day: number } {
  const [year, month, day] = iso.split("-")
  return { year, month: MONTHS[Number(month) - 1] ?? month, day: Number(day) }
}

// "2026-09-08" becomes "8 Sep 2026", the way a rubber stamp prints it.
export function stampDate(iso: string): string {
  const { year, month, day } = parts(iso)
  return `${day} ${month} ${year}`
}

// "2026-09-12" becomes "Sep 12, 2026", for the date column of a list.
export function shortDate(iso: string): string {
  const { year, month, day } = parts(iso)
  return `${month} ${day}, ${year}`
}
