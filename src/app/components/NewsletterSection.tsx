import Image from "next/image"
import { AGE, NEWSLETTER } from "@/lib/site"
import { Hand } from "./ink"
import SubstackEmbed from "./SubstackEmbed"

// The newsletter block, drawn as a subscription slip cut along a dashed
// line. Every "Get the field report" button on the site lands here, on
// Substack's own signup form.
export default function NewsletterSection() {
  return (
    <section className="slip-wrap" id="newsletter" aria-labelledby="h-news">
      <div className="slip" data-ink="">
        <Image
          className="doodle boil d-plane"
          src="/margins/doodles/airplane.webp"
          alt=""
          width={492}
          height={314}
          sizes="(max-width: 1039px) 112px, 158px"
        />
        <Image
          className="doodle boil d-envelope"
          src="/margins/doodles/envelope.webp"
          alt=""
          width={375}
          height={285}
          sizes="(max-width: 560px) 84px, 112px"
        />
        <svg
          className="scissors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="6" cy="7" r="2.6" />
          <circle cx="6" cy="17" r="2.6" />
          <path d="M8.2 8.4 20 17M8.2 15.6 20 7" />
        </svg>

        <p className="mono">
          <span>Subscription slip</span>
          <span>Free forever</span>
        </p>
        <h2 id="h-news">
          {NEWSLETTER.name},{" "}
          <mark className="hl" data-ink="">
            every other Thursday.
          </mark>
        </h2>
        <p className="pitch">
          The messy middle of building AI products at {AGE}. Real experiments,
          real numbers, no hustle-bro nonsense. Free forever.
        </p>

        <div className="slip-form">
          <SubstackEmbed
            src={`${NEWSLETTER.url}/embed`}
            title={`Subscribe to ${NEWSLETTER.name}`}
          />
          <Hand text="it runs on Substack." />
        </div>

        {/* Crawlable fallback: the iframe is invisible to non-JS crawlers. */}
        <p className="slip-alt">
          Or subscribe directly on{" "}
          <a href={NEWSLETTER.url} target="_blank" rel="noopener noreferrer">
            Substack
          </a>
          .
        </p>

        <p className="fine">
          Field report every other Thursday. No spam. Unsubscribe in one click.
        </p>
      </div>
    </section>
  )
}
