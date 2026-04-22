import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lucacapone.io'),
  title: {
    default: "Luca Capone - Second-Act Builders",
    template: "%s | Luca Capone"
  },
  description: "I'm Luca, 49. Building AI products in life's margins with no CS background. Field reports, playbooks, and honest numbers for 40+ professionals.",
  keywords: [
    "Second-Act Builders",
    "AI builder",
    "non-technical founder",
    "AI products",
    "vibe coding",
    "second-act career",
    "building with AI",
    "Claude Code",
    "BurnoutRadar",
    "PairHabit",
    "BizarreChat",
    "Kikko",
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
    siteName: "Luca Capone - Second-Act Builders",
    title: "Luca Capone - Second-Act Builders",
    description: "Building AI products in the margins of a full-time job and two kids. Field reports, playbooks, honest numbers.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Luca Capone - Second-Act Builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Capone - Second-Act Builders",
    description: "Building AI products in the margins of a full-time job and two kids.",
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
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="msapplication-TileColor" content="#FACF39" />
        <meta name="theme-color" content="#FACF39" />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
