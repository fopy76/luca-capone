"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MARGIN_HOURS, MARGIN_OPENS } from "@/lib/site"
import { Hand } from "./ink"

// fig. 2: the desk at nine in the evening, drawn in pen, and the one picture
// on the page that moves. The drawing is a button that switches its lamp.
//
// The server sends it lit, as a still, with no video requested. After
// hydration, and only if the plate is still below the viewport, the lamp goes
// off (the scene drops back to a line drawing) and comes on with a flicker
// once the plate is half in view. The loop is fetched the first time it is
// needed, plays only while the plate is on screen and the lamp is on, and is
// never requested under reduced motion.

const POSTER = "/margins/plate-desk-poster.webp"
const LOOP_WIDE = "/margins/plate-desk.mp4"
const LOOP_SMALL = "/margins/plate-desk-1280.mp4"

function drive(video: HTMLVideoElement | null, on: boolean): void {
  if (!video) return
  if (on) {
    if (!video.getAttribute("src")) {
      video.src = window.innerWidth < 900 ? LOOP_SMALL : LOOP_WIDE
    }
    const started = video.play()
    if (started) started.catch(() => {})
  } else if (!video.paused) {
    video.pause()
  }
}

export default function Plate() {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [lit, setLit] = useState(true)
  const [flick, setFlick] = useState(false)
  const [playing, setPlaying] = useState(false)

  const litRef = useRef(true)
  // Is the plate on screen?
  const nearRef = useRef(false)
  // True until the lamp has come on by itself or been touched.
  const autoRef = useRef(true)
  const dimmedRef = useRef(false)
  const reduceRef = useRef(false)

  useEffect(() => {
    litRef.current = lit
    drive(videoRef.current, !reduceRef.current && lit && nearRef.current)
  }, [lit])

  useEffect(() => {
    const frame = frameRef.current
    const video = videoRef.current
    if (!frame) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    reduceRef.current = reduce
    if (reduce || !("IntersectionObserver" in window)) return

    let first = true
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          nearRef.current = entry.isIntersecting
          if (autoRef.current) {
            if (entry.intersectionRatio >= 0.5) {
              autoRef.current = false
              setFlick(dimmedRef.current)
              setLit(true)
            } else if (first && !entry.isIntersecting && entry.boundingClientRect.top > 0) {
              // Still below the fold when the page woke up: lamp off, unseen.
              dimmedRef.current = true
              setLit(false)
            }
          }
          first = false
        }
        drive(video, litRef.current && nearRef.current)
      },
      { threshold: [0, 0.5] },
    )
    observer.observe(frame)
    return () => {
      observer.disconnect()
      if (video && !video.paused) video.pause()
    }
  }, [])

  const toggle = () => {
    autoRef.current = false
    setFlick(!lit && !reduceRef.current)
    setLit(!lit)
  }

  const classes = [
    "plate",
    lit ? null : "unlit",
    lit && flick ? "flick" : null,
    playing ? "playing" : null,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className="plate-sec" aria-label="The margin, drawn">
      <figure className={classes}>
        <div className="plate-cap">
          <span className="mono">fig. 2</span>
          <span className="mono">The margin, {MARGIN_HOURS}</span>
        </div>
        <div className="plate-frame" ref={frameRef}>
          <button
            className="plate-btn"
            type="button"
            aria-pressed={lit}
            aria-label="The lamp in the drawing"
            onClick={toggle}
          >
            <span className="plate-media">
              <Image
                src={POSTER}
                alt=""
                width={1920}
                height={818}
                // Wide screens show it at 120% of the frame. On a phone it is cropped
                // to 4:3 and drawn about 1.76 times the frame wide; 100vw still gives a
                // phone screen more than one image pixel per CSS pixel, at half the bytes.
                sizes="(max-width: 1039px) 100vw, (max-width: 1440px) 110vw, 1580px"
              />
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                width={1920}
                height={818}
                aria-hidden="true"
                tabIndex={-1}
                onPlaying={() => setPlaying(true)}
              />
            </span>
          </button>
          <Hand className="plate-note" text={`${MARGIN_OPENS}. the lamp goes on.`}>
            <svg className="draw auto to-lamp" viewBox="0 0 200 70" aria-hidden="true">
              <path pathLength={1} d="M4 12 C 58 0, 132 10, 192 54" />
              <path pathLength={1} d="M192 54 l -17 -2" />
              <path pathLength={1} d="M192 54 l -5 -16" />
            </svg>
            <svg className="draw auto to-up" viewBox="0 0 40 34" aria-hidden="true">
              <path pathLength={1} d="M34 30 C 20 28, 10 18, 9 4" />
              <path pathLength={1} d="M9 4 l -6 9" />
              <path pathLength={1} d="M9 4 l 8 7" />
            </svg>
          </Hand>
        </div>
        <figcaption className="sr">
          A pen-and-ink drawing of a small desk at night. A desk lamp throws a
          cone of yellow light over a laptop, an open notebook and an espresso.
          A child's drawing is taped to the wall, and the window shows the moon
          over a few lit houses.
        </figcaption>
      </figure>
    </section>
  )
}
