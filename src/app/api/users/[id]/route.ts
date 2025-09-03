import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, we would fetch the user from a database
    // For this demo, we'll return mock data
    
    const mockUser: User = {
      farcasterId: userId,
      displayName: `User ${userId.substring(0, 4)}`,
      profilePicUrl: 'https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/profile.jpg',
    };
    
    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

