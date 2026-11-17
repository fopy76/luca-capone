import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"
import InkEffects from "./components/InkEffects"
import { CtaArrow } from "./components/ink"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main">
        <div className="leaf inner">
          <section className="grid page-head lost">
            <div className="ml side-head" data-ink="">
              <Image
                className="doodle boil d-side grave"
                src="/margins/doodles/tombstone.webp"
                alt=""
                width={355}
                height={450}
                sizes="(max-width: 1039px) 84px, 118px"
              />
            </div>
            <div className="tb">
              <p>
                <span className="stamp closed">404</span>
              </p>
              <h1>Page not found</h1>
              <p className="standfirst">
                This page doesn't exist, or it shipped, broke, and got rolled
                back. Either way, the good stuff is a click away.
              </p>
              <div className="acts">
                <Link className="cta" href="/">
                  Back to the homepage
                  <CtaArrow />
                </Link>
                <Link className="plain" href="/now">
                  See what I'm doing now
                  <svg
                    className="draw"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path pathLength={1} d="M2 7 C 30 2, 62 11, 96 6 S 160 3, 198 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer inner />
      <InkEffects />
    </>
  )
}
