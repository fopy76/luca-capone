import Image from "next/image"
import Link from "next/link"
import { shortDate } from "@/lib/dates"
import { FIELD_NOTES } from "@/lib/field-notes"
import { GoArrow, Hand } from "./ink"

// Homepage teaser for /field-notes, set as a reading list. Server component
// on purpose: the question-phrased links are in-content homepage links to the
// notes, and they must reach crawlers as plain HTML.
export default function FieldNotesSection() {
  return (
    <section className="sec" id="field-notes" aria-labelledby="h-notes">
      <div className="grid">
        <div className="ml side-head" data-ink="">
          <h2 id="h-notes">Field notes</h2>
          <Hand text="from the build log, not theory." />
          <Image
            className="doodle boil d-notebook"
            src="/margins/doodles/notebook.webp"
            alt=""
            width={510}
            height={289}
            sizes="(max-width: 1039px) 120px, 156px"
          />
        </div>
        <div className="wide">
          <p className="day above">
            Longer answers to the questions I get most, from the build log, not
            theory.
          </p>
          <ol className="reading">
            {FIELD_NOTES.map((note) => (
              <li key={note.slug}>
                <Link href={`/field-notes/${note.slug}`}>
                  <span className="t">
                    <span>{note.title}</span>
                  </span>
                  <time className="mono" dateTime={note.dateModified}>
                    {shortDate(note.dateModified)}
                  </time>
                </Link>
              </li>
            ))}
          </ol>
          <Link className="go after" href="/field-notes">
            All field notes
            <GoArrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
