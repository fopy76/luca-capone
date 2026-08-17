import { CREDIBILITY_ITEMS } from "@/lib/site"

export default function CredibilityStrip() {
  return (
    <section
      aria-label="Credibility"
      className="py-6 border-y border-border bg-bg-subtle text-text-secondary"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-sm text-center">
          {CREDIBILITY_ITEMS.map((item, i) => (
            <li key={item} className="flex items-center gap-2 sm:gap-8">
              <span>{item}</span>
              {i < CREDIBILITY_ITEMS.length - 1 && (
                <span aria-hidden="true" className="hidden sm:inline text-border-strong">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
