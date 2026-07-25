import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #166534, #15803d)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        {/* House shape with upward arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <span style={{ fontSize: 10, color: 'white', lineHeight: 1, marginBottom: -2 }}>▲</span>
          <span style={{ fontSize: 22, color: 'white', lineHeight: 1 }}>⌂</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
