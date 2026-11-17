// The two short date formats the site prints from ISO dates. Plain string
// work, no Date object, so a date never shifts with the time zone of the
// machine that builds the site.

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function parts(iso: string): { year: string; month: string; day: number } {
  const [year, month, day] = iso.split("-")
  return { year, month: MONTHS[Number(month) - 1] ?? month, day: Number(day) }
}

// "2026-09-08" becomes "8 Sep 2026", the way a rubber stamp prints it.
export function stampDate(iso: string): string {
  const { year, month, day } = parts(iso)
  return `${day} ${month} ${year}`
}

// "2026-09-12" becomes "Sep 12, 2026", for the date column of a list.
export function shortDate(iso: string): string {
  const { year, month, day } = parts(iso)
  return `${month} ${day}, ${year}`
}
