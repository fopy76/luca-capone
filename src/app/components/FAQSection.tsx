import Link from "next/link"
import { FAQS } from "@/lib/faqs"
import { Hand } from "./ink"

// The FAQ, set as numbered footnotes. Content lives in src/lib/faqs.tsx (the
// single source of truth shared with the FAQPage JSON-LD in HomeSchema and
// the /llms.txt route), and every answer is in the server HTML whether its
// <details> is open or not. Server component.
export default function FAQSection() {
  return (
    <section className="sec" id="faq" aria-labelledby="h-faq">
      <div className="grid">
        <div className="ml side-head">
          <h2 id="h-faq">Frequently asked</h2>
          <Hand text="footnotes. the long versions live in the field notes." />
        </div>
        <div className="wide">
          <p className="day above">
            Short answers to what people actually want to know.
          </p>
          <div className="notes-foot">
            {FAQS.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="a">
                  <p>{faq.answerNode ?? faq.answerText}</p>
                  {faq.noteSlug && (
                    <Link className="more" href={`/field-notes/${faq.noteSlug}`}>
                      Full field note
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
