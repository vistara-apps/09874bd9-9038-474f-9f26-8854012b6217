'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';

interface ChallengeSubmissionProps {
  photo: Photo;
  onSendGift: (photoId: string, treatType: string) => void;
}

const TREAT_TYPES = [
  { id: 'fish', emoji: '🐟', name: 'Fish' },
  { id: 'yarn', emoji: '🧶', name: 'Yarn Ball' },
  { id: 'milk', emoji: '🥛', name: 'Milk' },
];

export default function ChallengeSubmission({ photo, onSendGift }: ChallengeSubmissionProps) {
  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const handleGiftClick = () => {
    setShowGiftOptions(!showGiftOptions);
  };
  
  const handleSendGift = async (treatType: string) => {
    setIsSending(true);
    try {
      await onSendGift(photo.photoId, treatType);
      setShowGiftOptions(false);
    } catch (error) {
      console.error('Error sending gift:', error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={photo.enhancedImageUrl}
          alt={`Photo by ${photo.user?.displayName || 'Anonymous'}`}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-3">
        <div className="flex items-center">
          <div className="w-8 h-8 relative rounded-full overflow-hidden">
            <Image
              src={photo.user?.profilePicUrl || 'https://placekitten.com/100/100'}
              alt={photo.user?.displayName || 'Anonymous'}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-2">
            <div className="text-sm font-medium">{photo.user?.displayName || 'Anonymous'}</div>
            <div className="text-xs text-gray-500">
              {new Date(photo.uploadTimestamp).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <div className="flex space-x-1">
            {photo.tags?.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="relative">
            <button
              onClick={handleGiftClick}
              disabled={isSending}
              className={`text-sm px-3 py-1 rounded-md transition-colors ${
                isSending
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-accent text-text hover:bg-accent/90'
              }`}
            >
              {isSending ? 'Sending...' : 'Gift Treat'}
            </button>
            
            {showGiftOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  {TREAT_TYPES.map(treat => (
                    <button
                      key={treat.id}
                      onClick={() => handleSendGift(treat.id)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                    >
                      <span className="mr-2 text-lg">{treat.emoji}</span>
                      <span>{treat.name}</span>
                      <span className="ml-auto text-xs text-gray-500">$0.10</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

