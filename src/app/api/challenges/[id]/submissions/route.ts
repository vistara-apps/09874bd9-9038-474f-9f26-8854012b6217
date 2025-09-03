import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // In a real implementation, we would fetch submissions for the challenge from a database
    
    // Mock implementation
    const mockSubmissions = [
      {
        photoId: 'photo-1',
        userId: 'user-1',
        imageUrl: 'https://placekitten.com/400/400',
        enhancedImageUrl: 'https://placekitten.com/400/400',
        tags: ['cute', 'fluffy'],
        uploadTimestamp: new Date().toISOString(),
        user: {
          farcasterId: 'farcaster-1',
          displayName: 'CatLover42',
          profilePicUrl: 'https://placekitten.com/100/100'
        }
      },
      {
        photoId: 'photo-2',
        userId: 'user-2',
        imageUrl: 'https://placekitten.com/401/401',
        enhancedImageUrl: 'https://placekitten.com/401/401',
        tags: ['sleepy', 'orange'],
        uploadTimestamp: new Date().toISOString(),
        user: {
          farcasterId: 'farcaster-2',
          displayName: 'MeowMaster',
          profilePicUrl: 'https://placekitten.com/101/101'
        }
      },
      {
        photoId: 'photo-3',
        userId: 'user-3',
        imageUrl: 'https://placekitten.com/402/402',
        enhancedImageUrl: 'https://placekitten.com/402/402',
        tags: ['playful', 'kitten'],
        uploadTimestamp: new Date().toISOString(),
        user: {
          farcasterId: 'farcaster-3',
          displayName: 'PurrfectPics',
          profilePicUrl: 'https://placekitten.com/102/102'
        }
      }
    ];
    
    return NextResponse.json(mockSubmissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching challenge submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenge submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const { photoId } = await request.json();
    
    if (!photoId) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }
    
    // In a real implementation, we would submit the photo to the challenge in a database
    
    // Mock implementation
    return NextResponse.json(
      { 
        success: true,
        message: `Photo ${photoId} submitted to challenge ${id} successfully` 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting photo to challenge:', error);
    return NextResponse.json(
      { error: 'Failed to submit photo to challenge' },
      { status: 500 }
    );
  }
}

