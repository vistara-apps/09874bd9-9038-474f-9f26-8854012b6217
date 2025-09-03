import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // In a real implementation, we would fetch the user from a database or the Farcaster API
    
    // Mock implementation
    const mockUser = {
      farcasterId: id,
      displayName: `User-${id.substring(0, 5)}`,
      profilePicUrl: `https://placekitten.com/10${id.length}/10${id.length}`
    };
    
    return NextResponse.json(mockUser, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

