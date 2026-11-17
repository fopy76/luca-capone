import type { CSSProperties, ReactNode } from "react"
import { Fragment } from "react"
import Image from "next/image"
import {
  AGE,
  CREDIBILITY_ITEMS,
  DAY_PLAN,
  MARGIN_HOURS,
  PRODUCT_SUMMARY,
} from "@/lib/site"
import { CtaArrow } from "./ink"
import { LiveLine, NowMarker } from "./LiveClock"

// The first spread: headline in the left margin, a day drawn as a planner in
// the text block (fig. 1), and the three windows Luca builds in as notes in
// the right margin.
//
// Server component on purpose: the hero carries the page's H1 and primary
// copy, so it must reach crawlers as plain, visible HTML with real anchor
// links. Its entrance is CSS only (see "load-in choreography" in
// styles/margins.css). The two time-dependent pieces are client components
// that render a static fallback on the server (LiveClock.tsx).

// CSS custom properties, typed.
const vars = (values: Record<string, string | number>): CSSProperties =>
  values as CSSProperties

// One word of the headline. --i is its place in the write-in order.
function W({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className="w" style={vars({ "--i": i })}>
      {children}
    </span>
  )
}

// A highlighted word. data-w lets the CSS reserve the width of its heavier
// self, so the hover that swells the ink never reflows the line.
function Press({ i, word }: { i: number; word: string }) {
  return (
    <span className="w" style={vars({ "--i": i })} data-w={word}>
      <span>{word}</span>
    </span>
  )
}

const pad = (hour: number): string => String(hour).padStart(2, "0")

export default function HeroSection() {
  const { firstHour, lastHour, job, kids, margin, windows } = DAY_PLAN
  const hours = Array.from({ length: lastHour - firstHour + 1 }, (_, n) => firstHour + n)
  const lastKidsSpan = kids.spans[kids.spans.length - 1]

  return (
    <section
      className="hero"
      id="hero"
      aria-label="Introduction"
      style={vars({ "--h0": firstHour, "--span": lastHour - firstHour })}
    >
      <div className="grid">
        <div className="ml hero-copy">
          {/* Five phrases (.ph). On a phone each takes its own line; wider,
              they flow and the browser balances them. "of a" and "two kids."
              never split (.keep), so no word is left alone on the last line. */}
          <h1>
            <span className="ph">
              <W i={0}>I'm</W> <W i={1}>Luca</W> <W i={2}>Capone.</W>
            </span>{" "}
            <span className="ph">
              <W i={4}>I</W> <W i={5}>build</W> <W i={6}>AI</W> <W i={7}>products</W>
            </span>{" "}
            <span className="ph">
              <mark className="hl">
                <Press i={8} word="in" /> <Press i={9} word="the" />{" "}
                <Press i={10} word="margins" />
              </mark>
            </span>{" "}
            <span className="ph">
              <span className="keep">
                <W i={11}>of</W> <W i={12}>a</W>
              </span>{" "}
              <W i={13}>full-time</W> <W i={14}>job</W>
            </span>{" "}
            <span className="ph">
              <W i={15}>and</W>{" "}
              <span className="keep">
                <W i={16}>two</W> <W i={17}>kids.</W>
              </span>
            </span>
          </h1>

          <p className="lede">
            {AGE}, based in Luxembourg and Rome. Started coding in March 2025
            with zero CS background. Everything since is vibe coded with Claude
            Code. {PRODUCT_SUMMARY}
          </p>

          <div className="acts">
            <a className="cta" href="#newsletter">
              Get the field report
              <CtaArrow />
            </a>
            <a className="plain" href="#products">
              See the products
              <svg
                className="draw"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path pathLength={1} d="M2 7 C 30 2, 62 11, 96 6 S 160 3, 198 7" />
              </svg>
            </a>
          </div>

          <p className="fine">
            Field report every other Thursday. No spam. Unsubscribe in one click.
          </p>

          {/* Draws itself in almost two seconds after load: low priority, so
              it never competes with the fonts for the first paint. */}
          <Image
            className="doodle boil d-pins"
            src="/margins/doodles/pins.webp"
            alt=""
            width={465}
            height={210}
            sizes="(max-width: 1039px) 104px, (max-width: 1259px) 118px, 136px"
            fetchPriority="low"
          />
        </div>

        <div
          className="tb planner"
          role="img"
          aria-label={`A day from ${pad(firstHour)}:00 to ${pad(lastHour)}:00. The ${job.label} and ${kids.label} take most of it. Weeknights from ${MARGIN_HOURS} are highlighted: that's the build window.`}
        >
          <div className="planner-cap">
            <span className="mono">A day</span>
            <span className="mono">fig. 1</span>
          </div>
          <div className="track">
            <ol className="hours" aria-hidden="true">
              {hours.map((hour) => (
                <li key={hour} style={vars({ "--h": hour })}>
                  <span>
                    {pad(hour)}
                    <i>:00</i>
                  </span>
                </li>
              ))}
            </ol>
            <span
              className="bar job"
              style={vars({ "--s": job.start, "--e": job.end })}
              aria-hidden="true"
            />
            <span
              className="bar-label job"
              style={vars({ "--s": job.start, "--e": job.end })}
              aria-hidden="true"
            >
              {job.label}
            </span>
            {kids.spans.map((span) => (
              <span
                key={span.start}
                className="bar kids"
                style={vars({ "--s": span.start, "--e": span.end })}
                aria-hidden="true"
              />
            ))}
            <span
              className="bar-label kids"
              style={vars({ "--s": lastKidsSpan.start, "--e": lastKidsSpan.end })}
              aria-hidden="true"
            >
              {kids.label}
            </span>
            <div
              className="build"
              style={vars({ "--s": margin.start, "--e": margin.end })}
              aria-hidden="true"
            >
              <span>{margin.label}</span>
            </div>
            <NowMarker />
          </div>
          <p className="mono legend" aria-hidden="true">
            <i className="g" />
            {job.label}, {kids.label}
            {"   "}
            <i className="y" />
            {margin.label}, {MARGIN_HOURS}
          </p>
        </div>

        <aside className="mr hero-notes" aria-label="Notes in the margin">
          <div className="notes-track">
            <div className="live" aria-live="off">
              <span className="mono">Now, in Luxembourg and Rome</span>
              <LiveLine />
            </div>
            {windows.map((slot, n) => (
              <div
                key={slot.note}
                className="note"
                style={vars({ "--s": slot.start, "--e": slot.end, "--n": n })}
              >
                {slot.bracket ? (
                  <svg
                    className="draw brace auto"
                    viewBox="0 0 16 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      pathLength={1}
                      d="M13 2 C 5 3, 5 7, 6 16 L 6 84 C 5 94, 6 97, 13 98"
                    />
                  </svg>
                ) : (
                  <svg className="draw arrow auto" viewBox="0 0 80 44" aria-hidden="true">
                    <path pathLength={1} d="M77 34 C 54 38, 28 30, 6 14" />
                    <path pathLength={1} d="M6 14 l 13 1" />
                    <path pathLength={1} d="M6 14 l 5 12" />
                  </svg>
                )}
                <p className="hand">{slot.note}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="folio mono">
        <ul aria-label="Credibility">
          {CREDIBILITY_ITEMS.map((item, index) => (
            <Fragment key={item}>
              <li>{item}</li>
              {index < CREDIBILITY_ITEMS.length - 1 && (
                <li className="sep" aria-hidden="true">
                  ¶
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  )
}
