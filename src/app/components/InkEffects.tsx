"use client"

import { useEffect } from "react"

// The motion of the Margins design that needs a script. Renders nothing.
// Mount it once on any page that uses [data-ink] or the drawn layer.
//
// Two jobs, both progressive enhancement over a page that is complete
// without them:
//
// 1. Ink. Highlighter swipes, pen strokes, stamps, drawings and handwriting
//    land as they scroll into view. The server sends every one of them in its
//    final, visible state. On mount, only the [data-ink] elements that are
//    still below the viewport get .ink-wait (the "not drawn yet" state in
//    styles/margins.css); it comes off when they scroll in. Anything already
//    on screen is never hidden. Nothing waits under reduced motion.
//
// 2. Boil. The drawn layer is re-traced about six times a second by cycling
//    b1/b2/b3 on <html> (the three filters are in InkDefs.tsx). Only while
//    the tab is visible and the page is still: it rests during a scroll and
//    picks up about 200 ms after the last scroll event, so a filter repaint
//    never competes with scrolling. Never under reduced motion.
export default function InkEffects() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const undo: (() => void)[] = []

    if (!reduce) {
      let frame = 0
      let timer: number | null = null
      const retrace = () => {
        frame = (frame % 3) + 1
        root.classList.remove("b1", "b2", "b3")
        root.classList.add(`b${frame}`)
      }
      const start = () => {
        if (timer === null) timer = window.setInterval(retrace, 160)
      }
      const stop = () => {
        if (timer !== null) window.clearInterval(timer)
        timer = null
      }
      const onVisibility = () => {
        if (document.hidden) stop()
        else start()
      }
      let resume: number | undefined
      const onScroll = () => {
        stop()
        window.clearTimeout(resume)
        resume = window.setTimeout(() => {
          if (!document.hidden) start()
        }, 200)
      }
      if (!document.hidden) start()
      document.addEventListener("visibilitychange", onVisibility)
      window.addEventListener("scroll", onScroll, { passive: true })
      undo.push(() => {
        stop()
        window.clearTimeout(resume)
        document.removeEventListener("visibilitychange", onVisibility)
        window.removeEventListener("scroll", onScroll)
        root.classList.remove("b1", "b2", "b3")
      })
    }

    if (!reduce && "IntersectionObserver" in window) {
      const inked = Array.from(document.querySelectorAll<HTMLElement | SVGElement>("[data-ink]"))
      const waiting = new Set<Element>()
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) land(entry.target)
          }
        },
        { rootMargin: "0px 0px -14% 0px", threshold: 0.2 },
      )
      // .in marks "drawn"; the scissors on the slip take their snips from it.
      function land(element: Element) {
        element.classList.remove("ink-wait")
        element.classList.add("in")
        waiting.delete(element)
        observer.unobserve(element)
      }

      const fold = window.innerHeight
      for (const element of inked) {
        if (element.getBoundingClientRect().top >= fold) {
          element.classList.add("ink-wait")
          waiting.add(element)
          observer.observe(element)
        } else {
          element.classList.add("in")
        }
      }

      // Paper has no scroll position: draw everything before printing.
      const landAll = () => Array.from(waiting).forEach(land)
      window.addEventListener("beforeprint", landAll)

      undo.push(() => {
        observer.disconnect()
        window.removeEventListener("beforeprint", landAll)
        for (const element of inked) element.classList.remove("ink-wait", "in")
      })
    }

    return () => undo.forEach((fn) => fn())
  }, [])

  return null
}
