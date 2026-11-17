import Image from "next/image"
import { AGE, PERSON } from "@/lib/site"
import { CtaArrow, Hand, MarginArrow } from "./ink"

// My Story. The text block carries the story; the right margin answers back
// in handwriting, and a few small drawings sit beside the lines they are
// about. Server component: the copy is plain HTML.
export default function AboutSection() {
  return (
    <section className="sec story" id="my-story" aria-labelledby="h-story">
      <div className="grid">
        <div className="ml side-head">
          <h2 id="h-story">My Story</h2>
          <div className="photo-hold">
            <figure className="photo">
              <Image
                src={PERSON.imagePath}
                alt={`Portrait of Luca Capone, non-technical founder building AI products at ${AGE}`}
                width={800}
                height={800}
                sizes="228px"
              />
              <figcaption>Luca, {AGE}.</figcaption>
            </figure>
          </div>
        </div>
        <div className="tb">
          {/* The struck number is a proofreader's joke. It is drawn by CSS
              from data-struck, so it is not in the page text: read aloud,
              copied or crawled, the line is exactly "Started coding at 49." */}
          <p className="lead">
            Former Italian Army Special Ops. UN security across four continents.
            Two kids. One full-time job.{" "}
            <mark className="hl" data-ink="">
              Started coding at{" "}
              <span className="nb">
                <span className="struck" data-struck="19" aria-hidden="true" /> 49.
              </span>
            </mark>
          </p>
        </div>
        <div className="mr" data-ink="">
          <Image
            className="doodle boil d-crayons"
            src="/margins/doodles/crayons.webp"
            alt=""
            width={361}
            height={312}
            sizes="(max-width: 1039px) 84px, 112px"
          />
        </div>
      </div>

      <div className="grid">
        <div className="tb">
          <p className="first">
            I'm Luca. I've spent 25+ years in international security. Nine of
            them as a Captain in the Italian Army Special Operations Forces,
            deployed to Bosnia, Iraq, and Afghanistan. Then humanitarian
            security with the UN system took me from South Sudan to Pakistan to
            Somalia, with field missions across another ten countries. These
            days I run security programs for a European institution.
          </p>
        </div>
      </div>

      <div className="grid" data-ink="">
        <div className="tb">
          <p>
            In March 2025 I opened Cursor for the first time. Something had
            changed. AI had finally made it possible for a non-technical person
            to{" "}
            <mark className="hl" data-ink="">
              ship real software
            </mark>
            .
          </p>
        </div>
        <div className="mr">
          <Hand text="I was 49. zero CS background.">
            <MarginArrow />
          </Hand>
        </div>
      </div>

      <div className="grid" data-ink="">
        <div className="tb">
          <p>
            In my 25 years in security, I've watched three technology shifts
            land: the internet, mobile, and the cloud. Every time, half my
            peers said &ldquo;I'm fine with what I have.&rdquo;{" "}
            <mark className="hl" data-ink="">
              The curious ones are mostly still here.
            </mark>
          </p>
        </div>
        <div className="mr">
          <Hand text="internet. mobile. cloud. this one's the fourth.">
            <MarginArrow />
          </Hand>
          <Image
            className="doodle boil d-shifts"
            src="/margins/doodles/shifts.webp"
            alt=""
            width={520}
            height={171}
            sizes="(max-width: 1039px) 150px, 172px"
          />
        </div>
      </div>

      <div className="grid">
        <div className="full quote">
          <span className="open" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote>
            <p>
              25 years of pattern recognition is screaming at me that this
              shift is bigger than the previous three combined.{" "}
              <mark className="hl" data-ink="">
                Sitting it out is not a neutral choice.
              </mark>
            </p>
          </blockquote>
        </div>
      </div>

      <div className="grid" data-ink="">
        <div className="ml d-cell">
          <Image
            className="doodle boil d-moka"
            src="/margins/doodles/moka.webp"
            alt=""
            width={398}
            height={492}
            sizes="(max-width: 1039px) 70px, 107px"
          />
        </div>
        <div className="tb">
          <p>
            I build{" "}
            <mark className="hl" data-ink="">
              between 9 and 11 PM on weeknights
            </mark>
            , on Saturday mornings when the house is quiet, and on lunch breaks
            that aren't meetings. Claude Code is my primary tool. Cursor shows
            up occasionally. The approach is vibe coding: describe what you
            want, ship it, iterate.
          </p>
        </div>
        <div className="mr">
          <Hand text="fixed windows, not stolen ones. the margins are enough if you show up.">
            <MarginArrow />
          </Hand>
        </div>
      </div>

      <div className="grid" data-ink="">
        <div className="tb">
          <p>
            If a {AGE}-year-old Italian guy with a full-time job, two kids, and
            zero CS background can build AI products in the margins of his
            life,{" "}
            <mark className="hl" data-ink="">
              what's your excuse?
            </mark>{" "}
            That's what Second-Act Builders is about. Welcome.
          </p>
          <div className="acts">
            <a className="cta" href="#newsletter">
              Get the field report
              <CtaArrow />
            </a>
          </div>
        </div>
        <div className="mr">
          <Hand red text="a real question, by the way.">
            <MarginArrow />
          </Hand>
        </div>
      </div>
    </section>
  )
}
