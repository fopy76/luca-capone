import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Satoshi will be imported via CSS in globals.css from Fontshare

export const metadata: Metadata = {
  metadataBase: new URL('https://lucacapone.io'),
  title: {
    default: "Luca Capone - Gen X AI Builder",
    template: "%s | Luca Capone"
  },
  description: "Gen X non-technical founder building AI products at 48. Creator of Peakblox, Kikko, AidLoom, and BizarreChat. Proving age and coding skills are no barriers in the AI era. Building with Claude, ChatGPT, and no-code tools.",
  keywords: [
    "Gen X entrepreneur",
    "AI builder",
    "non-technical founder",
    "AI products",
    "no-code development",
    "AI-first development",
    "second-act career",
    "age 48 founder",
    "building with AI",
    "Claude Code",
    "ChatGPT",
    "Peakblox",
    "Kikko",
    "AidLoom",
    "BizarreChat",
    "SaaS builder"
  ],
  authors: [{ name: "Luca Capone", url: "https://lucacapone.io" }],
  creator: "Luca Capone",
  publisher: "Luca Capone",
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
  manifest: '/site.webmanifest',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lucacapone.io",
    siteName: "Luca Capone - Gen X AI Builder",
    title: "Luca Capone - Gen X AI Builder",
    description: "Building AI products at 48 with no coding skills. Creator of Peakblox, Kikko, AidLoom, and BizarreChat.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Luca Capone - Gen X AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Capone - Gen X AI Builder",
    description: "Building AI products at 48 with no coding skills. Proving age is not a barrier.",
    creator: "@LucaCaponeX",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://lucacapone.io",
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="msapplication-TileColor" content="#2563EB" />
        <meta name="theme-color" content="#2563EB" />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
