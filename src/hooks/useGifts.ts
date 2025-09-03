'use client';

import { useState } from 'react';
import { Gift } from '@/types';
import { sendGiftToPhoto } from '@/utils/api';

export function useGifts() {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sendGift = async (photoId: string, treatType: string): Promise<Gift> => {
    try {
      setIsSending(true);
      setError(null);
      
      // In a real implementation, we would call an API to send the gift
      // const gift = await sendGiftToPhoto(photoId, treatType);
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock gift
      const mockGift: Gift = {
        giftId: `gift-${Math.random().toString(36).substring(2, 10)}`,
        senderUserId: 'current-user-id', // In a real app, this would be the actual user ID
        photoId,
        treatType,
        timestamp: new Date().toISOString()
      };
      
      return mockGift;
    } catch (err) {
      console.error('Error sending gift:', err);
      setError('Failed to send gift');
      throw err;
    } finally {
      setIsSending(false);
    }
  };
  
  return {
    sendGift,
    isSending,
    error
  };
}

