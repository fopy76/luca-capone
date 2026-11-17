"use client"

import type { CSSProperties } from "react"
import { useSyncExternalStore } from "react"
import { DAY_PLAN, MARGIN_HOURS } from "@/lib/site"

// The two time-dependent pieces of the hero: the sentence that says whose
// turn the day is, and the red "now" line on the planner.
//
// Neither is server-rendered. The clock is read through useSyncExternalStore
// with a null server snapshot, so the HTML carries the static fallback, the
// first client render matches it, and the live value arrives right after
// hydration with no mismatch.

let formatter: Intl.DateTimeFormat | null = null

// Weekday and time in Luxembourg (one zone covers both cities), packed as
// "Wed|21|14" so the snapshot is a stable primitive.
// Test hook: ?t=Wed-2114 pins the clock.
function readClock(): string | null {
  try {
    const pinned = new URLSearchParams(window.location.search).get("t")
    const match = pinned?.match(/^([A-Za-z]{3})-(\d\d)(\d\d)$/)
    if (match) return `${match[1]}|${Number(match[2])}|${Number(match[3])}`

    formatter ??= new Intl.DateTimeFormat("en-GB", {
      timeZone: DAY_PLAN.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
    const parts = formatter.formatToParts(new Date())
    const part = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find((p) => p.type === type)?.value ?? ""
    return `${part("weekday")}|${Number(part("hour")) % 24}|${Number(part("minute"))}`
  } catch {
    return null
  }
}

function subscribe(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 20000)
  const onVisible = () => {
    if (!document.hidden) onChange()
  }
  document.addEventListener("visibilitychange", onVisible)
  return () => {
    window.clearInterval(timer)
    document.removeEventListener("visibilitychange", onVisible)
  }
}

const serverClock = (): string | null => null

type Clock = { weekday: string; hours: number; label: string }

function useClock(): Clock | null {
  const snapshot = useSyncExternalStore(subscribe, readClock, serverClock)
  if (!snapshot) return null
  const [weekday, hour, minute] = snapshot.split("|")
  const h = Number(hour)
  const m = Number(minute)
  if (!weekday || Number.isNaN(h) || Number.isNaN(m)) return null
  const pad = (n: number): string => String(n).padStart(2, "0")
  return { weekday, hours: h + m / 60, label: `${pad(h)}:${pad(m)}` }
}

// "It's 21:14 in Luxembourg and Rome. This is a margin."
export function LiveLine() {
  const clock = useClock()
  if (!clock) {
    return <p>Weeknights, {MARGIN_HOURS}. That's the margin.</p>
  }

  const { weekday, hours, label } = clock
  const { margin, clock: bounds, firstHour, lastHour } = DAY_PLAN
  const weekdayNow = weekday !== "Sat" && weekday !== "Sun"
  const time = <strong>{label}</strong>
  const where = " in Luxembourg and Rome. "

  if (weekdayNow && hours >= margin.start && hours < margin.end) {
    return <p>It's {time}{where}This is a margin.</p>
  }
  if (weekday === "Sat" && hours >= bounds.saturdayStart && hours < bounds.saturdayEnd) {
    return <p>It's {time} on a Saturday. If the house is quiet, this is a margin.</p>
  }
  if (weekdayNow && hours >= bounds.jobStart && hours < bounds.jobEnd) {
    return <p>It's {time}{where}The day job has the floor.</p>
  }
  if (hours >= lastHour || hours < firstHour) {
    return <p>It's {time}{where}Off the page. The next margin is on its way.</p>
  }
  return <p>It's {time}{where}The kids have the floor.</p>
}

// The red line across the planner at the current time. Nothing on the server.
export function NowMarker() {
  const clock = useClock()
  if (!clock) return null
  const at = Math.min(DAY_PLAN.lastHour, Math.max(DAY_PLAN.firstHour, clock.hours))
  return (
    <div className="now" aria-hidden="true" style={{ "--now": at.toFixed(3) } as CSSProperties}>
      <b>{clock.label}</b>
    </div>
  )
}
