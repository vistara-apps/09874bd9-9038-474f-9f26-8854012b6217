import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { getActiveChallenge, getChallengeSubmissions, submitToChallenge } from '@/utils/api';
import { Challenge, Photo } from '@/types';

export const useChallenges = () => {
  const { activeChallenge, setActiveChallenge } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveChallenge = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getActiveChallenge();
      
      if (response.error || !response.data) {
        setError(response.error || 'Failed to fetch active challenge');
        setIsLoading(false);
        return null;
      }
      
      setActiveChallenge(response.data);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
      return null;
    }
  };

  const fetchChallengeSubmissions = async (challengeId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getChallengeSubmissions(challengeId);
      
      if (response.error || !response.data) {
        setError(response.error || 'Failed to fetch challenge submissions');
        setIsLoading(false);
        return [];
      }
      
      setSubmissions(response.data);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
      return [];
    }
  };

  const submitPhotoToChallenge = async (challengeId: string, photoId: string) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await submitToChallenge(challengeId, photoId);
      
      if (response.error || !response.data) {
        setError(response.error || 'Failed to submit photo to challenge');
        setIsSubmitting(false);
        return false;
      }
      
      // Refresh submissions after successful submission
      await fetchChallengeSubmissions(challengeId);
      
      setIsSubmitting(false);
      return true;
    } catch (err) {
      setError('An unexpected error occurred');
      setIsSubmitting(false);
      return false;
    }
  };

  // Fetch active challenge on mount
  useEffect(() => {
    if (!activeChallenge) {
      fetchActiveChallenge();
    }
  }, [activeChallenge]);

  return {
    activeChallenge,
    submissions,
    isLoading,
    isSubmitting,
    error,
    fetchActiveChallenge,
    fetchChallengeSubmissions,
    submitPhotoToChallenge,
  };
};

