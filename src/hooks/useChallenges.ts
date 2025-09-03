'use client';

import { useState, useEffect } from 'react';
import { Challenge } from '@/types';
import { fetchActiveChallenge } from '@/utils/api';

export function useChallenges() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getActiveChallenge = async () => {
      try {
        setIsLoading(true);
        const challenge = await fetchActiveChallenge();
        setActiveChallenge(challenge);
        setError(null);
      } catch (err) {
        console.error('Error fetching active challenge:', err);
        setError('Failed to load active challenge');
      } finally {
        setIsLoading(false);
      }
    };
    
    getActiveChallenge();
  }, []);
  
  const submitPhotoToChallenge = async (challengeId: string, photoId: string) => {
    try {
      // In a real implementation, we would call an API to submit the photo
      console.log(`Submitting photo ${photoId} to challenge ${challengeId}`);
      // await submitPhoto(challengeId, photoId);
      return true;
    } catch (err) {
      console.error('Error submitting photo to challenge:', err);
      throw err;
    }
  };
  
  return {
    activeChallenge,
    isLoading,
    error,
    submitPhotoToChallenge
  };
}

