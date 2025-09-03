import { useState } from 'react';
import { useStore } from '@/lib/store';
import { getPhotoGifts, sendGift } from '@/utils/api';
import { Gift, TreatType } from '@/types';

export const useGifts = () => {
  const { user, addGift } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [photoGifts, setPhotoGifts] = useState<Gift[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotoGifts = async (photoId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getPhotoGifts(photoId);
      
      if (response.error || !response.data) {
        setError(response.error || 'Failed to fetch photo gifts');
        setIsLoading(false);
        return [];
      }
      
      setPhotoGifts(response.data);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError('An unexpected error occurred');
      setIsLoading(false);
      return [];
    }
  };

  const sendTreatGift = async (photoId: string, treatType: TreatType) => {
    if (!user) {
      setError('You must be logged in to send gifts');
      return null;
    }

    setIsSending(true);
    setError(null);
    
    try {
      const response = await sendGift(photoId, treatType);
      
      if (response.error || !response.data) {
        setError(response.error || 'Failed to send gift');
        setIsSending(false);
        return null;
      }
      
      addGift(response.data);
      
      // Refresh photo gifts
      await fetchPhotoGifts(photoId);
      
      setIsSending(false);
      return response.data;
    } catch (err) {
      setError('An unexpected error occurred');
      setIsSending(false);
      return null;
    }
  };

  const getTreatEmoji = (treatType: TreatType): string => {
    switch (treatType) {
      case 'fish':
        return '🐟';
      case 'yarn':
        return '🧶';
      case 'mouse':
        return '🐭';
      case 'catnip':
        return '🌿';
      default:
        return '🎁';
    }
  };

  const getTreatCount = (gifts: Gift[], treatType: TreatType): number => {
    return gifts.filter(gift => gift.treatType === treatType).length;
  };

  return {
    photoGifts,
    isLoading,
    isSending,
    error,
    fetchPhotoGifts,
    sendTreatGift,
    getTreatEmoji,
    getTreatCount,
  };
};

