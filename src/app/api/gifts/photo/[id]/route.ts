import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // In a real implementation, we would fetch gifts for the photo from a database
    
    // Mock implementation
    const mockGifts = [
      {
        giftId: 'gift-1',
        senderUserId: 'user-1',
        photoId: id,
        treatType: 'fish',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
      },
      {
        giftId: 'gift-2',
        senderUserId: 'user-2',
        photoId: id,
        treatType: 'yarn',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 hour ago
      },
      {
        giftId: 'gift-3',
        senderUserId: 'user-3',
        photoId: id,
        treatType: 'milk',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
      }
    ];
    
    return NextResponse.json(mockGifts, { status: 200 });
  } catch (error) {
    console.error('Error fetching photo gifts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photo gifts' },
      { status: 500 }
    );
  }
}

