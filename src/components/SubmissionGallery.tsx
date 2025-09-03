'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ChallengeSubmission from './ChallengeSubmission';
import { useGifts } from '@/hooks/useGifts';
import { Photo, Gift } from '@/types';

interface SubmissionGalleryProps {
  challengeId: string;
}

export default function SubmissionGallery({ challengeId }: SubmissionGalleryProps) {
  const [submissions, setSubmissions] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { sendGift } = useGifts();
  
  useEffect(() => {
    // In a real implementation, we would fetch submissions from the API
    const fetchSubmissions = async () => {
      try {
        setIsLoading(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockSubmissions: Photo[] = [
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
        
        setSubmissions(mockSubmissions);
        setError(null);
      } catch (err) {
        setError('Failed to load submissions');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubmissions();
  }, [challengeId]);
  
  const handleSendGift = async (photoId: string, treatType: string) => {
    try {
      await sendGift(photoId, treatType);
      // In a real implementation, we would update the UI to show the gift
    } catch (error) {
      console.error('Error sending gift:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-sm text-gray-600">Loading submissions...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-4 px-6 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }
  
  if (submissions.length === 0) {
    return (
      <div className="py-8 text-center bg-gray-50 rounded-md">
        <p className="text-gray-600">No submissions yet. Be the first to participate!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Challenge Submissions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {submissions.map(submission => (
          <ChallengeSubmission
            key={submission.photoId}
            photo={submission}
            onSendGift={handleSendGift}
          />
        ))}
      </div>
    </div>
  );
}

