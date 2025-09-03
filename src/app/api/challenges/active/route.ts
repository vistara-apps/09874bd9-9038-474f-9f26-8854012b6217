import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real implementation, we would fetch the active challenge from a database
    
    // Mock implementation
    const activeChallenge = {
      challengeId: 'challenge-1',
      title: 'Cats in Boxes',
      description: 'Share photos of your cats in boxes, bags, or any container they love to squeeze into!',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      prompt: 'If it fits, I sits!'
    };
    
    return NextResponse.json(activeChallenge, { status: 200 });
  } catch (error) {
    console.error('Error fetching active challenge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active challenge' },
      { status: 500 }
    );
  }
}

