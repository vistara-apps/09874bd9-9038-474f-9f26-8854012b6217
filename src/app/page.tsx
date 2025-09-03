'use client';

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Header from '@/components/Header';
import FrameContainer from '@/components/FrameContainer';
import PhotoUploader from '@/components/PhotoUploader';
import ChallengeCard from '@/components/ChallengeCard';
import SubmissionGallery from '@/components/SubmissionGallery';
import { useChallenges } from '@/hooks/useChallenges';
import { Photo } from '@/types';

export default function Home() {
  const { authenticated } = usePrivy();
  const { activeChallenge, isLoading, error } = useChallenges();
  const [showUploader, setShowUploader] = useState(false);
  const [submittedPhoto, setSubmittedPhoto] = useState<Photo | null>(null);
  
  const handleParticipate = () => {
    setShowUploader(true);
  };
  
  const handlePhotoEnhanced = (photo: Photo) => {
    setSubmittedPhoto(photo);
    setShowUploader(false);
    
    // In a real implementation, we would submit the photo to the challenge
    if (activeChallenge) {
      // submitPhotoToChallenge(activeChallenge.challengeId, photo.photoId);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <div className="mt-8 space-y-8">
        <FrameContainer>
          <div className="text-center py-4">
            <h1 className="text-2xl font-bold text-primary">FurryFrame</h1>
            <p className="text-gray-600">Your Farcaster frame for crafting and sharing purrfect cat moments.</p>
          </div>
          
          {!authenticated ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-600 mb-4">Login with Farcaster to participate in cat photo challenges!</p>
            </div>
          ) : (
            <>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading challenge...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-md">
                  {error}
                </div>
              ) : activeChallenge ? (
                <div className="space-y-6">
                  <ChallengeCard
                    challenge={activeChallenge}
                    variant={submittedPhoto ? 'submitted' : 'active'}
                    onParticipate={handleParticipate}
                  />
                  
                  {showUploader && (
                    <div className="mt-6">
                      <h2 className="text-lg font-semibold mb-4">Upload Your Cat Photo</h2>
                      <PhotoUploader onPhotoEnhanced={handlePhotoEnhanced} />
                    </div>
                  )}
                  
                  {submittedPhoto && (
                    <div className="mt-6 p-4 bg-green-50 rounded-md">
                      <p className="text-green-700">
                        Your photo has been submitted to the challenge!
                      </p>
                    </div>
                  )}
                  
                  <SubmissionGallery challengeId={activeChallenge.challengeId} />
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <p className="text-gray-600">No active challenges at the moment. Check back soon!</p>
                </div>
              )}
            </>
          )}
        </FrameContainer>
      </div>
    </div>
  );
}

