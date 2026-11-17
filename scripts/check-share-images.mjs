// Checks the share image of every page in the sitemap.
//
//   node scripts/check-share-images.mjs                         the live site
//   node scripts/check-share-images.mjs http://localhost:3000   a local `npm run start`
//
// For every page listed in /sitemap.xml it asks for:
// - exactly one og:image and one twitter:image, each with its width, height,
//   type and alt text
// - an absolute https address for both
// - an image that answers 200 with no redirect, as a 1200 by 630 PNG
// - on a page with Article schema (a field note), an `image` there that is
//   the same address as og:image, leaving the build hash aside
//
// It prints one line per page and exits with 1 if anything is missing. A new
// field note without its own opengraph-image.tsx shows up here as "no
// og:image". It needs no packages: Node 18 or later.

const WIDTH = 1200
const HEIGHT = 630
const TYPE = "image/png"
const PNG_SIGNATURE = "89504e470d0a1a0a"

const base = new URL(process.argv[2] ?? "https://lucacapone.io")

const decode = (text) =>
  text
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")

// Every <meta> of a page as [key, content], where key is its property or name.
function metaTags(html) {
  const tags = []
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/g)) {
    const key = tag.match(/\b(?:property|name)="([^"]*)"/)?.[1]
    const content = tag.match(/\bcontent="([^"]*)"/)?.[1]
    if (key !== undefined && content !== undefined) tags.push([key, decode(content)])
  }
  return tags
}

// Every node of the page's JSON-LD, whether it stands alone or in a @graph.
function schemaNodes(html) {
  const nodes = []
  const blocks = html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)
  for (const [, json] of blocks) {
    try {
      const data = JSON.parse(json)
      for (const item of Array.isArray(data) ? data : [data]) {
        nodes.push(...(Array.isArray(item["@graph"]) ? item["@graph"] : [item]))
      }
    } catch {
      // Not this script's business: a page's schema is checked elsewhere.
    }
  }
  return nodes
}

// The same path on the host under test. A local build prints the live host in
// its tags, so the image is asked for where the pages were.
const onBase = (url) => new URL(url.pathname + url.search, base)

const fetched = new Map()
async function checkImage(address) {
  const target = onBase(address).href
  if (!fetched.has(target)) {
    fetched.set(
      target,
      (async () => {
        const response = await fetch(target, { redirect: "manual" })
        if (response.status !== 200) {
          const to = response.headers.get("location")
          return `answers ${response.status}${to ? ` (redirect to ${to})` : ""}`
        }
        const type = response.headers.get("content-type") ?? ""
        if (!type.startsWith(TYPE)) return `is served as "${type}"`
        const bytes = Buffer.from(await response.arrayBuffer())
        if (bytes.subarray(0, 8).toString("hex") !== PNG_SIGNATURE) return "is not a PNG"
        const size = `${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`
        return size === `${WIDTH}x${HEIGHT}` ? null : `is ${size}`
      })(),
    )
  }
  return fetched.get(target)
}

async function checkPage(path, siteOrigin) {
  const problems = []
  const response = await fetch(new URL(path, base), { redirect: "manual" })
  if (response.status !== 200) return [`the page answers ${response.status}`]
  const html = await response.text()
  const tags = metaTags(html)
  const all = (key) => tags.filter(([name]) => name === key).map(([, content]) => content)
  let shared = null

  for (const kind of ["og", "twitter"]) {
    const images = all(`${kind}:image`)
    if (images.length !== 1) {
      problems.push(images.length === 0 ? `no ${kind}:image` : `${images.length} ${kind}:image tags`)
      continue
    }
    for (const [detail, wanted] of [["width", String(WIDTH)], ["height", String(HEIGHT)], ["type", TYPE]]) {
      const [value] = all(`${kind}:image:${detail}`)
      if (value !== wanted) problems.push(`${kind}:image:${detail} is ${value ?? "missing"}`)
    }
    const [alt] = all(`${kind}:image:alt`)
    if (!alt?.trim()) problems.push(`no ${kind}:image:alt`)
    else if (/[\u2012-\u2015]/.test(alt)) problems.push(`a dash in ${kind}:image:alt`)

    let address
    try {
      address = new URL(images[0])
    } catch {
      problems.push(`${kind}:image is not an absolute address: ${images[0]}`)
      continue
    }
    if (address.protocol !== "https:" && address.origin !== base.origin) {
      problems.push(`${kind}:image is not https: ${address.href}`)
    }
    if (address.origin !== siteOrigin && address.origin !== base.origin) {
      problems.push(`${kind}:image is on another host: ${address.origin}`)
    }
    const fault = await checkImage(address)
    if (fault) problems.push(`${kind}:image ${fault}`)
    if (kind === "og") shared = address
  }

  const article = schemaNodes(html).find((node) => node["@type"] === "Article")
  if (article && shared) {
    let inSchema = null
    try {
      inSchema = typeof article.image === "string" ? new URL(article.image) : null
    } catch {
      // Reported just below.
    }
    if (!inSchema) {
      problems.push("the Article schema has no image address")
    } else {
      if (inSchema.origin + inSchema.pathname !== shared.origin + shared.pathname) {
        problems.push(`the Article schema names another image: ${inSchema.href}`)
      }
      const fault = await checkImage(inSchema)
      if (fault) problems.push(`the Article schema image ${fault}`)
    }
  }
  return problems
}

const sitemap = await fetch(new URL("/sitemap.xml", base))
if (!sitemap.ok) {
  console.error(`No sitemap at ${base.origin}/sitemap.xml (${sitemap.status}).`)
  process.exit(1)
}
const pages = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(decode(loc)))
if (pages.length === 0) {
  console.error("The sitemap lists no pages.")
  process.exit(1)
}

let failed = 0
console.log(`Share images on ${base.origin}, ${pages.length} pages from the sitemap:`)
for (const page of pages) {
  const problems = await checkPage(page.pathname, page.origin)
  if (problems.length > 0) failed++
  console.log(`${problems.length === 0 ? "ok  " : "FAIL"} ${page.pathname}${problems.map((p) => `\n       ${p}`).join("")}`)
}
console.log(failed === 0 ? "All pages have their share image." : `${failed} of ${pages.length} pages have a problem.`)
process.exit(failed === 0 ? 0 : 1)
