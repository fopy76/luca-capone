import Link from "next/link"
import { nowLastUpdated, nowLastUpdatedDisplay, nowTeaserItems } from "@/lib/now"
import { GoArrow, Hand } from "./ink"

// Three hand-drawn rings, so neighbouring labels are never circled the same
// way twice.
const RINGS = [
  "M62 5 C 26 3, 4 13, 5 26 C 6 41, 40 47, 68 46 C 99 45, 117 36, 115 22 C 113 9, 86 3, 50 7",
  "M58 6 C 24 5, 5 15, 6 27 C 7 42, 44 46, 70 45 C 100 44, 116 34, 114 21 C 112 8, 82 4, 48 8",
  "M64 4 C 28 4, 3 12, 5 25 C 7 40, 38 47, 66 46 C 97 45, 118 37, 115 23 C 112 10, 88 2, 52 6",
]

// The homepage teaser for /now: the three one-liners from src/lib/now.ts,
// each with its label circled in red pencil. Server component.
export default function NowSection() {
  return (
    <section className="sec" id="now" aria-labelledby="h-now">
      <div className="grid">
        <div className="ml side-head">
          <h2 id="h-now">What I'm doing now</h2>
          {/* Evergreen on purpose: the teaser beside it is rewritten weekly
              and nothing rewrites this note. The words are the /now page's
              own promise. */}
          <Hand text="updated whenever my focus genuinely changes." />
        </div>
        <div className="wide">
          <p className="day above">
            The current snapshot. Updated{" "}
            <time dateTime={nowLastUpdated}>{nowLastUpdatedDisplay}</time>.
          </p>
          <ul className="now-list">
            {nowTeaserItems.map((item, index) => (
              <li key={item.label}>
                <span className="label">
                  {item.label}
                  <svg
                    className="draw"
                    data-ink=""
                    viewBox="0 0 120 50"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path pathLength={1} d={RINGS[index % RINGS.length]} />
                  </svg>
                </span>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <Link className="go after" href="/now">
            Read the full now page
            <GoArrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
