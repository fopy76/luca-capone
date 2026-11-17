import type { CSSProperties } from "react";
import type { Metadata, Viewport } from "next";
import { Caveat, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import GlobalSchema from "./components/GlobalSchema";
import InkDefs from "./components/InkDefs";
import {
  KEYWORDS,
  PERSON,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/site";
import "./globals.css";

// The four voices of the page (see styles/margins.css). Each is exposed as a
// CSS variable on <html>; margins.css builds its font stacks from them.
//
// Font bytes are most of what a first visit downloads before it can show
// anything finished, so each file carries only what the design uses, and the
// order they arrive in is deliberate:
//
// 1. Preloaded: the faces every first screen is set in. The italic display
//    face (headlines), the text face (the paragraph under them) and the
//    regular mono (labels).
// 2. Fetched when a page first lays out text in them: the upright display
//    face and the medium mono.
// 3. The handwriting, which is never preloaded. On the home page it and the
//    upright display face are held back until the first paint is on screen:
//    see "Faces that can wait" in styles/margins.css and FACES_AFTER_PAINT
//    below.
//
// The three files in ./fonts are Google's latin files for Fraunces and
// Newsreader, cut down with fonttools to the part of each design space the
// site uses. Same glyphs and same outlines, fewer bytes. CLAUDE.md has the
// commands and the limits to respect ("Fonts").

// Display, italic: the headline, section titles, the buttons and links.
// Optical size 9 to 144, weight 320 to 500 (the design uses 330 to 480).
// The file's resting instance is the display cut at its lightest, which is
// what next/font sizes the stand-in from: it then matches the headline.
const frauncesItalic = localFont({
  src: "./fonts/fraunces-italic-latin.woff2",
  variable: "--font-fraunces-italic",
  weight: "320 500",
  style: "italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Display, upright: product names, numbers, FAQ questions, article ledes.
// Its own family, so it can load on its own schedule. Optical size 9 to 144,
// weight 300 to 500.
const fraunces = localFont({
  src: "./fonts/fraunces-latin.woff2",
  variable: "--font-fraunces",
  weight: "300 500",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  preload: false,
});

// Text: running copy. Upright only: nothing on the site is set in its italic.
// Optical size 6 to 19.2 (the site sets it between 15.2 and 19.2 px; the low
// end is the original's own, which keeps every advance width identical),
// weight 400 to 700.
const newsreader = localFont({
  src: "./fonts/newsreader-latin.woff2",
  variable: "--font-newsreader",
  weight: "400 700",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Handwriting: the notes in the margins.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Labels, captions, stamps. Two weights of one family, declared apart so
// that only the regular one, which every first screen uses, is preloaded.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// The medium: stamps, FAQ numbers, the planner's "now" tag. The stylesheet
// never reads its variable (both weights answer to the one family name);
// its class sits on <html> only so the face is part of the page's CSS.
const plexMonoMedium = IBM_Plex_Mono({
  variable: "--font-plex-mono-medium",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  preload: false,
});

// next/font returns each face as a two-family stack: the face itself, then a
// stand-in it generates (a local font resized to the same average width).
// margins.css needs the two halves apart in two cases:
// - the stand-ins of the two faces the home page holds back, to set text in
//   while they are held;
// - the mono without its stand-in. That stand-in is a resized Arial, a
//   quarter too wide for the capital labels and too narrow for the rest,
//   while the system monospace next in the stack already has the same
//   advance width.
type Face = { style: { fontFamily: string } };
const families = (face: Face): string[] =>
  face.style.fontFamily.split(",").map((family) => family.trim());
const faceAlone = (face: Face): string => families(face)[0] ?? "";
const standIn = (face: Face): string => families(face).slice(1).join(", ");

const faceParts = Object.fromEntries(
  [
    ["--font-fraunces-standin", standIn(fraunces)],
    ["--font-caveat-standin", standIn(caveat)],
    ["--font-plex-mono-face", faceAlone(plexMono)],
  ].filter(([, family]) => family !== ""),
) as CSSProperties;

// Lets the held faces go (.faces on <html>) the moment the browser reports
// the largest paint so far, or the first contentful paint where it cannot
// report that, and after 2.5 seconds whatever happens. It is the last thing
// in <body>, so it never stands between the parser and the page. margins.css
// has its own three-second release for the case where this never runs.
const FACES_AFTER_PAINT = `(function(d,w){var h=d.documentElement;function go(){h.classList.add("faces")}try{var t=(w.PerformanceObserver.supportedEntryTypes||[]).indexOf("largest-contentful-paint")>-1?"largest-contentful-paint":"paint",o=new PerformanceObserver(function(l){for(var e=l.getEntries(),i=0;i<e.length;i++)if(t!=="paint"||e[i].name==="first-contentful-paint"){o.disconnect();go();return}});o.observe({type:t,buffered:true})}catch(e){w.setTimeout(go,300)}w.setTimeout(go,2500)})(document,window)`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Luca Capone"
  },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  // OG/Twitter images intentionally omitted: the file-convention
  // opengraph-image.tsx files supply per-route, cache-busted image URLs.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  other: {
    "msapplication-TileColor": "#FACF39",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The paper colour (--paper in styles/margins.css), so the browser chrome
  // continues the page instead of capping it in yellow.
  themeColor: "#FBFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: FACES_AFTER_PAINT may have put .faces on this
    // element before React hydrates it.
    // data-scroll-behavior: the stylesheet scrolls smoothly, and with this
    // attribute Next switches that off while it moves to a new page, so a
    // link clicked far down one page doesn't glide down the next.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${frauncesItalic.variable} ${fraunces.variable} ${newsreader.variable} ${caveat.variable} ${plexMono.variable} ${plexMonoMedium.variable}`}
      style={faceParts}
      suppressHydrationWarning
    >
      <head>
        <GlobalSchema />
      </head>
      <body>
        <InkDefs />
        {children}
        <Analytics />
        <script dangerouslySetInnerHTML={{ __html: FACES_AFTER_PAINT }} />
      </body>
    </html>
  );
}
