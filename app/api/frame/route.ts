import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle frame interactions
    const buttonIndex = body.untrustedData?.buttonIndex;
    
    if (buttonIndex === 1) {
      // Launch FurryFrame button clicked
      return NextResponse.json({
        type: 'frame',
        frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
      });
    }

    return NextResponse.json({ message: 'Invalid frame interaction' }, { status: 400 });
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'FurryFrame Frame API' });
}
