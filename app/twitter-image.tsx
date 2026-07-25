import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Free Real Estate Calculators 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f2d1a 0%, #166534 50%, #15803d 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 900, color: '#86efac', marginBottom: 20, lineHeight: 1 }}>
          ⌂
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          Free Real Estate Calculators 2026
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.80)',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: 800,
          }}
        >
          Mortgage, affordability, rent vs buy, investment ROI, fix and flip, closing costs and property tax calculators. All 50 states.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', '2026 Updated', 'Private', 'No Signup'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.30)',
                borderRadius: 100,
                padding: '8px 22px',
                color: 'white',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
