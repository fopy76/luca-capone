import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Luca Capone - Gen X AI Builder'
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
          fontSize: 60,
          background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
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
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 20,
              letterSpacing: '-0.02em',
            }}
          >
            Luca Capone
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 'normal',
              opacity: 0.95,
              marginBottom: 30,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Gen X. Non-technical. Building AI products anyway.
          </div>
          <div
            style={{
              display: 'flex',
              gap: 30,
              fontSize: 28,
              opacity: 0.9,
            }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: '8px'
            }}>
              48 years old
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: '8px'
            }}>
              4 AI Products
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: '8px'
            }}>
              Zero Code
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
