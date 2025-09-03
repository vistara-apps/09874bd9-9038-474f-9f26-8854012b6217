import { NextRequest, NextResponse } from 'next/server';
import { Challenge } from '@/types';
import { generateId } from '@/utils/helpers';

export async function GET(req: NextRequest) {
  try {
    // In a real implementation, we would fetch the active challenge from a database
    // For this demo, we'll return mock data
    
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    const mockChallenge: Challenge = {
      challengeId: generateId(),
      title: 'Cats in Boxes',
      description: 'Share your feline friends enjoying their favorite boxes, bags, or containers!',
      startDate: now - oneDayMs, // Started yesterday
      endDate: now + oneDayMs * 6, // Ends in 6 days
      prompt: 'Show us your cat\'s favorite hiding spot',
    };
    
    return NextResponse.json(mockChallenge);
  } catch (error) {
    console.error('Error fetching active challenge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active challenge' },
      { status: 500 }
    );
  }
}

