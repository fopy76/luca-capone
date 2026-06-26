# Proudly Built in Italy — brand mark

The little footer emblem for every Fopy Labs product and landing page. A code
bracket `</>` with a diagonal tricolore slash. The slash *is* the forward slash,
so it reads as code first, Italy second.

## What's in here

| File | Use |
|------|-----|
| `built-in-italy.svg` | Full-colour icon (tricolore slash). Default mark. |
| `built-in-italy-mono.svg` | Single-ink icon. Use at tiny sizes where the stripes would blur. |
| `built-in-italy-lockup.svg` | Icon + "Proudly Built in Italy" wordmark. For bigger placements. |
| `built-in-italy-lockup-inverted.svg` | Same lockup with the tricolore slash inverted (red top, green bottom). Used on the PairHabit footer. |
| `favicon.svg` | Square, padded version with built-in dark-mode support, for browser tabs. |
| `BuiltInItaly.tsx` | React/Next.js component. |
| `BuiltInItaly.swift` | SwiftUI view for the iOS apps. |

## Colours

- Ink: `#0B1226` (Fopy Labs ink). In the components the linework uses
  `currentColor` / `Color.primary`, so it inherits the surrounding text colour
  and works on light and dark footers automatically.
- Green: `#009246`
- White: `#FFFFFF`
- Red: `#CE2B37`

## Web (React / Next.js)

The linework is `currentColor`, so it picks up the colour of whatever it sits in.
Move `BuiltInItaly.tsx` into `packages/ui` to share it across products.

```tsx
import { BuiltInItaly } from "@/components/BuiltInItaly";

// Tiny colour icon in a footer corner
<footer className="flex items-center justify-between text-slate-500">
  <span>© 2026 PairHabit</span>
  <BuiltInItaly size={18} />
</footer>

// Mono version (inherits text colour) for the very smallest spots
<BuiltInItaly size={14} variant="mono" />

// Icon + wordmark for an about page or a bigger footer
<BuiltInItaly size={22} withText />
```

Recolour by setting `color` on a parent or via `style`/`className`:

```tsx
<div style={{ color: "#fff" }}>
  <BuiltInItaly size={18} variant="mono" /> {/* white on a dark footer */}
</div>
```

## Favicon

```html
<link rel="icon" type="image/svg+xml" href="/built-in-italy-favicon.svg" />
```

`favicon.svg` ships its own light/dark ink via `prefers-color-scheme`, so it
stays visible in both light and dark browser chrome. Keep a `favicon.ico`
fallback for old browsers if you need one.

## iOS (SwiftUI)

```swift
BuiltInItaly()                          // 24pt colour icon
BuiltInItaly(size: 16, variant: .mono)  // tiny mono
BuiltInItaly(size: 22, withText: true)  // icon + wordmark
```

## Usage notes

- Footer corner is the home for this mark. Keep it small and let it sit quietly.
- Use `color` for normal sizes, `mono` at ~16px and below and for the favicon.
- Don't stretch it. Set `size` (height) and let the width follow.
- Minimum clear space around the mark: roughly half the icon height.
