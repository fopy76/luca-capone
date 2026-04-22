import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Luca Capone - Second-Act Builders'
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
            Luca Capone · Second-Act Builders
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
            Building AI products in the margins of a full-time job and two kids.
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
            Started coding in March 2025 with zero CS background. Field reports, playbooks, honest numbers.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
