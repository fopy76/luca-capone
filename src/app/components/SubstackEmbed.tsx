"use client"

import { useEffect, useRef } from "react"

// Substack's own signup form, in an iframe: the same embed the site has
// always used, so subscribing works exactly as before.
//
// It is a third-party page far below the fold, so it is lazy: the browser
// fetches it as the reader scrolls near. Two nudges make sure it is ready
// before anyone arrives: a few seconds after the page has finished loading,
// or as soon as the pointer or the keyboard reaches a "Get the field report"
// link, it is switched to load straight away. With JavaScript off the
// browser's own lazy loading still applies.
//
// Size: see ".slip-form" in styles/margins.css before changing width/height.
export default function SubstackEmbed({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const wake = () => {
      frame.loading = "eager"
    }
    let timer: number | undefined
    const arm = () => {
      timer = window.setTimeout(wake, 3500)
    }
    if (document.readyState === "complete") arm()
    else window.addEventListener("load", arm, { once: true })

    const onIntent = (event: Event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('a[href$="#newsletter"]')
      ) {
        wake()
      }
    }
    document.addEventListener("pointerover", onIntent, { passive: true })
    document.addEventListener("focusin", onIntent)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("load", arm)
      document.removeEventListener("pointerover", onIntent)
      document.removeEventListener("focusin", onIntent)
    }
  }, [])

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      width={384}
      height={160}
      loading="lazy"
      scrolling="no"
      frameBorder="0"
    />
  )
}
