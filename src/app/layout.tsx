import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luca Capone - Gen X AI Builder",
  description: "Gen X. Non-technical. Building & shipping AI products anyway. Proving that age and technical skills are no longer barriers to building in the AI era.",
  keywords: "Gen X, AI builder, non-technical founder, AI products, entrepreneur",
  authors: [{ name: "Luca Capone" }],
  robots: "index, follow",
  openGraph: {
    title: "Luca Capone - Gen X AI Builder",
    description: "Gen X. Non-technical. Building & shipping AI products anyway.",
    url: "https://lucacapone.io",
    siteName: "Luca Capone",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luca Capone - Gen X AI Builder",
    description: "Gen X. Non-technical. Building & shipping AI products anyway.",
  },
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
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
