"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Two kinds of nav items: "section" jumps to an anchor on the home page
// (a /#id link from any other route), "route" links to a page.
type MenuItem =
  | { kind: "section"; label: string; id: string }
  | { kind: "route"; label: string; href: string }

const menuItems: MenuItem[] = [
  { kind: "section", label: "Products", id: "products" },
  { kind: "section", label: "My Story", id: "my-story" },
  { kind: "route", label: "Now", href: "/now" },
  { kind: "route", label: "Field Notes", href: "/field-notes" },
  { kind: "section", label: "FAQ", id: "faq" },
  { kind: "section", label: "Newsletter", id: "newsletter" },
]

// The running head of every page. Client component only because it needs the
// current path; it is still rendered on the server, so every link reaches
// crawlers as a plain <a href>.
//
// The small-screen menu is a <details> element: it opens and closes with
// JavaScript off. The script only adds manners (close after a choice, on
// Escape, on a press outside, and when the route changes).
export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const menuRef = useRef<HTMLDetailsElement>(null)

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false
  }

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.open) {
        menu.open = false
        menu.querySelector("summary")?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (menu.open && event.target instanceof Node && !menu.contains(event.target)) {
        menu.open = false
      }
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [])

  // A route change leaves this component mounted on some pages: shut the menu.
  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false
  }, [pathname])

  // Section links are plain <a href="#…"> on the home page, so the browser
  // scrolls natively (smooth scrolling and the offset under the sticky head
  // are CSS: html { scroll-behavior } and section { scroll-margin-top }).
  const renderItem = (item: MenuItem) => {
    if (item.kind === "route") {
      const current =
        pathname === item.href
          ? "page"
          : pathname.startsWith(`${item.href}/`)
            ? "true"
            : undefined
      return (
        <Link key={item.href} href={item.href} aria-current={current} onClick={closeMenu}>
          {item.label}
        </Link>
      )
    }
    return isHome ? (
      <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
        {item.label}
      </a>
    ) : (
      <Link key={item.id} href={`/#${item.id}`} onClick={closeMenu}>
        {item.label}
      </Link>
    )
  }

  // The wordmark shortens to initials on a phone. Its accessible name is built
  // from the text it shows plus a hidden tail, never from an aria-label, so the
  // name always contains what is on screen ("L. C., Luca Capone, back to top").
  const wordmark = (tail: string) => (
    <>
      <span className="long">Luca Capone</span>
      <span className="short">
        L. C.<span className="sr">, Luca Capone</span>
      </span>
      <span className="sr">, {tail}</span>
    </>
  )

  return (
    <>
      <a className="skip" href="#main">
        Skip to the page
      </a>
      <header className="head">
        <div className="head-in">
          {isHome ? (
            <a className="wordmark" href="#hero">
              {wordmark("back to top")}
            </a>
          ) : (
            <Link className="wordmark" href="/">
              {wordmark("home")}
            </Link>
          )}

          <nav className="toc" aria-label="Contents">
            {menuItems.map(renderItem)}
          </nav>

          <details className="menu" ref={menuRef}>
            <summary>Contents</summary>
            <nav aria-label="Contents, small screens">{menuItems.map(renderItem)}</nav>
          </details>

          {isHome ? (
            <a className="cta small" href="#newsletter">
              Get the field report
            </a>
          ) : (
            <Link className="cta small" href="/#newsletter">
              Get the field report
            </Link>
          )}
        </div>
      </header>
    </>
  )
}
