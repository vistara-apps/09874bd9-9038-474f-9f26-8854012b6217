import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8B5CF6',
            background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
            fontSize: 32,
            fontWeight: 600,
            color: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#F59E0B',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
              }}
            >
              🐱
            </div>
            <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
              FurryFrame
            </div>
          </div>
          <div
            style={{
              fontSize: '24px',
              textAlign: 'center',
              opacity: 0.9,
              maxWidth: '600px',
            }}
          >
            Your Farcaster frame for crafting and sharing purrfect cat moments
          </div>
          <div
            style={{
              marginTop: '32px',
              fontSize: '18px',
              opacity: 0.8,
              display: 'flex',
              gap: '32px',
            }}
          >
            <span>📸 AI Enhancement</span>
            <span>🏆 Photo Challenges</span>
            <span>🎁 Virtual Treats</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
