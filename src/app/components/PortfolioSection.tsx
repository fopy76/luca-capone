import Image from "next/image"
import {
  PRODUCTS,
  countWord,
  type Product,
  type ProductStatus,
} from "@/lib/site"
import { GoArrow, Hand, Written, stampDate } from "./ink"

// The products, one row each: drawn mark and name in the left margin, the
// canonical tagline in the text block, the honest status stamped in the right
// margin with one handwritten note. Everything printed here comes from
// PRODUCTS in src/lib/site.ts. A product with a postmortem gets the longer
// "feature" row with its numbers.
//
// Server component: taglines and links must reach crawlers as plain HTML
// (the taglines are also the JSON-LD descriptions in HomeSchema).

const statusWord: Record<ProductStatus, string> = {
  launched: "Launched",
  beta: "Beta",
  waitlist: "Waitlist",
}

const stampClass: Record<ProductStatus, string> = {
  launched: "stamp",
  beta: "stamp beta",
  waitlist: "stamp wait",
}

// "Launched", "Launched · Web + iOS", "Launched 8 Sep 2026".
function stampText(product: Product): string {
  const word = statusWord[product.status]
  const label =
    product.statusLabel === word ? word : `${word} · ${product.statusLabel}`
  return product.launchedOn ? `${label} ${stampDate(product.launchedOn)}` : label
}

function Stamps({ product }: { product: Product }) {
  return (
    <>
      <span className={stampClass[product.status]} data-ink="">
        {stampText(product)}
      </span>
      {product.closedOn && (
        <span className="stamp closed" data-ink="">
          Closed {stampDate(product.closedOn)}
        </span>
      )}
    </>
  )
}

function Name({ product }: { product: Product }) {
  // The mark is drawn 84px tall (60px below 1040px wide, see .work-name .mark)
  // and as wide as its own proportions make it.
  const { src, width, height } = product.mark
  const drawn = (tall: number): number => Math.round((tall * width) / height)
  return (
    <div className="ml work-name" data-ink="">
      <Image
        className="mark boil"
        src={src}
        alt=""
        width={width}
        height={height}
        sizes={`(max-width: 1039px) ${drawn(60)}px, ${drawn(84)}px`}
      />
      <h3>{product.name}</h3>
    </div>
  )
}

function Body({ product }: { product: Product }) {
  return (
    <div className="tb work-body">
      <p className="tagline">{product.tagline}</p>
      <ul className="tags">
        {product.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <a
        className="go"
        href={product.cardUrl ?? product.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${product.name}: ${product.ctaText}`}
      >
        {product.ctaText}
        <GoArrow />
      </a>
      {product.postmortem && (
        <Written as="span" className="caret" text={`^ ${product.postmortem.aside}`} />
      )}
    </div>
  )
}

function Work({ product }: { product: Product }) {
  const { postmortem } = product

  if (!postmortem) {
    return (
      <article className="work grid">
        <Name product={product} />
        <Body product={product} />
        <div className="mr work-notes">
          <Stamps product={product} />
          {product.note && (
            <Hand text={product.note} red={product.status === "beta"} />
          )}
        </div>
      </article>
    )
  }

  return (
    <article className="work feature">
      <div className="grid">
        <Name product={product} />
        <Body product={product} />
        <div className="mr work-notes">
          <div className="stamps">
            <Stamps product={product} />
          </div>
          <Hand red text={postmortem.verdict} />
        </div>
      </div>
      <div className="grid">
        <div className="wide grave-host" data-ink="">
          <div className="tally">
            {postmortem.stats.map((stat) => (
              <div key={stat.label}>
                <b>{stat.value}</b>
                <span className="mono">{stat.label}</span>
              </div>
            ))}
          </div>
          <Image
            className="doodle boil d-grave"
            src="/margins/doodles/tombstone.webp"
            alt=""
            width={355}
            height={450}
            sizes="(max-width: 1039px) 69px, 107px"
          />
          <Hand red className="aftermath" text={postmortem.aftermath} />
        </div>
      </div>
    </article>
  )
}

export default function PortfolioSection() {
  return (
    <section className="sec" id="products" aria-labelledby="h-products">
      <div className="grid sec-top">
        <div className="ml side-head">
          <h2 id="h-products">Shipped and shipping</h2>
        </div>
        <div className="tb">
          <p className="day">
            Status over platform. What's live, in beta, and on the way.
          </p>
        </div>
        <div className="mr">
          <Hand
            className="aside-note"
            text={`${countWord(PRODUCTS.length)} so far. the honest status is stamped on each one.`}
          />
        </div>
      </div>

      <div className="works">
        {PRODUCTS.map((product) => (
          <Work key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}
