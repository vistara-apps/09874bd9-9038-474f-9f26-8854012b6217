import { NextRequest, NextResponse } from 'next/server';
import { Gift, TreatType } from '@/types';
import { generateId } from '@/utils/helpers';

export async function POST(req: NextRequest) {
  try {
    const { photoId, treatType } = await req.json();
    
    if (!photoId || !treatType) {
      return NextResponse.json(
        { error: 'Photo ID and treat type are required' },
        { status: 400 }
      );
    }
    
    // Validate treat type
    const validTreatTypes: TreatType[] = ['fish', 'yarn', 'mouse', 'catnip'];
    if (!validTreatTypes.includes(treatType as TreatType)) {
      return NextResponse.json(
        { error: 'Invalid treat type' },
        { status: 400 }
      );
    }
    
    // In a real implementation, we would:
    // 1. Verify that the user is authenticated
    // 2. Process the payment via Privy
    // 3. Record the gift in the database
    
    // For this demo, we'll mock the response
    const mockGift: Gift = {
      giftId: generateId(),
      senderUserId: 'mock-user-id',
      photoId,
      treatType: treatType as TreatType,
      timestamp: Date.now(),
    };
    
    // Simulate a delay to mimic payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(mockGift);
  } catch (error) {
    console.error('Error sending gift:', error);
    return NextResponse.json(
      { error: 'Failed to send gift' },
      { status: 500 }
    );
  }
}

