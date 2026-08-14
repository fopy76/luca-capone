import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'What Luca Capone is doing now'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FACF39',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1C1C1E',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.75,
              marginBottom: 28,
            }}
          >
            Luca Capone · Now
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 980,
              marginBottom: 28,
            }}
          >
            What I&apos;m building, creating, and learning right now.
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              opacity: 0.85,
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            PairHabit launched · Kikko live on web · Updated August 2026
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
