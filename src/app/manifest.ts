import type { MetadataRoute } from "next"
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site"

// Generated from the site source of truth (replaces the old static
// public/site.webmanifest, which had drifted stale). Next.js serves this at
// /manifest.webmanifest and links it automatically.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: SITE_NAME,
    short_name: "Luca Capone",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    lang: "en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FACF39",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
