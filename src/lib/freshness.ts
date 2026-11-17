// When each page last changed, for the two places that tell search engines:
// the sitemap's lastmod and the dateModified in the structured data. A date
// here must be true. Google only trusts lastmod when it matches real changes,
// so nothing in this file uses the time of the build.
import { FIELD_NOTES } from "./field-notes"
import { nowLastUpdated } from "./now"
import { HOME_LAST_MODIFIED } from "./site"

// ISO dates (YYYY-MM-DD) sort correctly as plain strings.
function latest(dates: string[], fallback: string): string {
  return [...dates].sort().at(-1) ?? fallback
}

const noteDates = FIELD_NOTES.map((note) => note.dateModified)

// The /field-notes index changes when any note does.
export const notesLastModified = latest(noteDates, nowLastUpdated)

// The home page shows its own copy, the /now teaser and the list of notes,
// so it changed whenever any of the three did.
export const homeLastModified = latest(
  [HOME_LAST_MODIFIED, nowLastUpdated, ...noteDates],
  HOME_LAST_MODIFIED,
)
