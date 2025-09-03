import { NextRequest, NextResponse } from 'next/server';
import { Gift, TreatType } from '@/types';
import { generateId } from '@/utils/helpers';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const photoId = params.id;
    
    if (!photoId) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, we would fetch gifts for the photo from a database
    // For this demo, we'll return mock data
    
    const treatTypes: TreatType[] = ['fish', 'yarn', 'mouse', 'catnip'];
    
    // Generate random gifts
    const mockGifts: Gift[] = [];
    const giftCount = Math.floor(Math.random() * 10) + 1; // 1-10 gifts
    
    for (let i = 0; i < giftCount; i++) {
      const randomTreatType = treatTypes[Math.floor(Math.random() * treatTypes.length)];
      
      mockGifts.push({
        giftId: generateId(),
        senderUserId: `user${i + 1}`,
        photoId,
        treatType: randomTreatType,
        timestamp: Date.now() - 1000 * 60 * i, // i minutes ago
      });
    }
    
    return NextResponse.json(mockGifts);
  } catch (error) {
    console.error('Error fetching photo gifts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photo gifts' },
      { status: 500 }
    );
  }
}

