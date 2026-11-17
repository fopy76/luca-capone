import Link from "next/link"
import { EMAIL, PERSON } from "@/lib/site"

// How each profile in PERSON.sameAs is named in the footer. The newsletter
// has its own block above, so Substack is left out here.
const SOCIAL_NAMES: Record<string, string> = {
  "x.com": "X",
  "linkedin.com": "LinkedIn",
  "youtube.com": "YouTube",
  "instagram.com": "Instagram",
  "reddit.com": "Reddit",
}

const socials = PERSON.sameAs.flatMap((href) => {
  const label = SOCIAL_NAMES[new URL(href).hostname.replace(/^www\./, "")]
  return label ? [{ label, href }] : []
})

// "Proudly Built in Italy" brand lockup (inverted tricolore). Linework and
// wordmark use currentColor so they inherit the footer text colour; the slash
// keeps the flag colours.
function BuiltInItaly({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 232 56"
      fill="none"
      role="img"
      aria-label="Proudly Built in Italy"
      className={className}
    >
      <title>Proudly Built in Italy</title>
      <path d="M18 14 8 28 18 42" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 14 56 28 46 42" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="rotate(20 32 28)">
        <clipPath id="biiSlashLockup">
          <rect x="26.5" y="11" width="11" height="34" rx="5.5" />
        </clipPath>
        <g clipPath="url(#biiSlashLockup)">
          <rect x="26.5" y="11" width="11" height="11.34" fill="#CE2B37" />
          <rect x="26.5" y="22.34" width="11" height="11.33" fill="#FFFFFF" />
          <rect x="26.5" y="33.67" width="11" height="11.33" fill="#009246" />
        </g>
        <rect x="26.5" y="11" width="11" height="34" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </g>
      <text
        x="80"
        y="26"
        fontSize="15"
        fill="currentColor"
        style={{ fontFamily: "var(--f-display-i)", fontStyle: "italic" }}
      >
        Proudly
      </text>
      <text
        x="80"
        y="46"
        fontSize="19"
        fill="currentColor"
        style={{ fontFamily: "var(--f-display)", fontWeight: 500 }}
      >
        Built in Italy
      </text>
    </svg>
  )
}

// The colophon: where to find Luca, and the small print. Server component,
// shared by every page. `inner` gives it the wider text block of the pages
// other than the home page (.leaf.inner), so its two hairlines continue theirs.
// `late` is for a page whose colophon is far below the first screen: the
// upright face in the lockup above can then wait for the first paint ("Faces
// that can wait" in styles/margins.css).
export default function Footer({
  inner = false,
  late = false,
}: {
  inner?: boolean
  late?: boolean
}) {
  return (
    <footer className={late ? "colophon late" : "colophon"} id="connect">
      <div className={inner ? "leaf inner" : "leaf"}>
        <div className="grid">
          <div className="ml side-head">
            <h2>Connect</h2>
          </div>
          <div className="tb">
            <p className="day">
              I'm always open to connecting with fellow builders and creators.
              Drop a line or find me on any of these.
            </p>
            <a className="email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
          <div className="mr">
            <ul className="socials" aria-label="Social links">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="imprint">
          <p className="mono">
            Colophon. Set in Fraunces, Newsreader, Caveat and IBM Plex Mono.
            Vibe coded with Claude Code, in the margins. The drawings are
            AI-generated.
            <span className="imprint-links">
              <Link href="/now">What I'm doing now</Link> ·{" "}
              <Link href="/field-notes">Field notes</Link>
            </span>
            © 2026 {PERSON.name}. All rights reserved.
          </p>
          <BuiltInItaly className="italy" />
        </div>
      </div>
    </footer>
  )
}
