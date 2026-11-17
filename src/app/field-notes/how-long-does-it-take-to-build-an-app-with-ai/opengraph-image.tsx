import { noteAlt, noteImage } from "../../og/note"

// This note's share image: its title on the card that app/og/note.tsx draws.
// The slug is the same one page.tsx reads.
const SLUG = "how-long-does-it-take-to-build-an-app-with-ai"

export { contentType, size } from "../../og/kit"
export const alt = noteAlt(SLUG)

export default function Image() {
  return noteImage(SLUG)
}
