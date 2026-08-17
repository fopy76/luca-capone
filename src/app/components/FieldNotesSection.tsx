import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FIELD_NOTES } from "@/lib/field-notes"

// Slim homepage teaser for /field-notes. Server component on purpose: the
// five question-phrased links are in-content homepage links to the notes —
// they must reach crawlers as plain HTML.
export default function FieldNotesSection() {
  return (
    <section
      id="field-notes"
      aria-labelledby="field-notes-heading"
      className="py-20 bg-background border-t border-border scroll-mt-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="field-notes-heading"
          className="font-grotesk text-3xl md:text-5xl font-bold text-center mb-4 text-text tracking-tight"
        >
          Field notes
        </h2>
        <p className="text-base md:text-lg text-text-secondary text-center mb-10 max-w-xl mx-auto">
          Longer answers to the questions I get most — from the build log, not
          theory.
        </p>

        <ul className="space-y-3 mb-10">
          {FIELD_NOTES.map((note) => (
            <li key={note.slug} className="text-center">
              <Link
                href={`/field-notes/${note.slug}`}
                className="text-[17px] font-medium text-text underline decoration-accent decoration-2 underline-offset-2 hover:text-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
              >
                {note.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Link
            href="/field-notes"
            className="inline-flex items-center gap-2 bg-accent text-on-accent font-semibold text-sm px-5 py-3 rounded-md hover:bg-accent-hover motion-safe:hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
          >
            All field notes
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
