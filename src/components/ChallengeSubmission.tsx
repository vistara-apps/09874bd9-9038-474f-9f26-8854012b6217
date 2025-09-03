import { useState } from 'react';
import { Photo } from '@/types';
import { useGifts } from '@/hooks/useGifts';
import { formatRelativeTime } from '@/utils/helpers';
import { TreatType } from '@/types';

interface ChallengeSubmissionProps {
  photo: Photo;
  userName?: string;
}

export default function ChallengeSubmission({
  photo,
  userName = 'Anonymous',
}: ChallengeSubmissionProps) {
  const {
    photoGifts,
    isLoading,
    isSending,
    error,
    fetchPhotoGifts,
    sendTreatGift,
    getTreatEmoji,
    getTreatCount,
  } = useGifts();
  
  const [showGiftOptions, setShowGiftOptions] = useState(false);
  const [selectedTreat, setSelectedTreat] = useState<TreatType | null>(null);
  
  // Fetch gifts when component mounts
  useState(() => {
    fetchPhotoGifts(photo.photoId);
  });
  
  const handleGiftClick = () => {
    setShowGiftOptions(!showGiftOptions);
  };
  
  const handleTreatSelect = (treatType: TreatType) => {
    setSelectedTreat(treatType);
  };
  
  const handleSendGift = async () => {
    if (selectedTreat) {
      await sendTreatGift(photo.photoId, selectedTreat);
      setShowGiftOptions(false);
      setSelectedTreat(null);
    }
  };
  
  const treatTypes: TreatType[] = ['fish', 'yarn', 'mouse', 'catnip'];
  
  return (
    <div className="card">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          {userName.charAt(0)}
        </div>
        <div className="ml-2">
          <div className="font-medium">{userName}</div>
          <div className="text-xs text-gray-500">
            {formatRelativeTime(photo.uploadTimestamp)}
          </div>
        </div>
      </div>
      
      <div className="relative aspect-square rounded-md overflow-hidden">
        <img
          src={photo.enhancedImageUrl || photo.imageUrl}
          alt="Cat photo submission"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mt-2">
        {photo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {photo.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {treatTypes.map((treatType) => {
              const count = getTreatCount(photoGifts, treatType);
              if (count > 0) {
                return (
                  <div key={treatType} className="flex items-center">
                    <span>{getTreatEmoji(treatType)}</span>
                    <span className="ml-1 text-xs text-gray-500">{count}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          <button
            onClick={handleGiftClick}
            className="text-sm btn-secondary"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Gift Treat'}
          </button>
        </div>
        
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
        
        {showGiftOptions && (
          <div className="mt-3 p-3 border rounded-md">
            <h4 className="text-sm font-medium mb-2">Select a treat to gift:</h4>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {treatTypes.map((treatType) => (
                <button
                  key={treatType}
                  onClick={() => handleTreatSelect(treatType)}
                  className={`p-2 text-xl rounded-md ${
                    selectedTreat === treatType
                      ? 'bg-primary/10 border border-primary'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {getTreatEmoji(treatType)}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <div className="text-xs text-gray-500">
                Cost: $0.10 per treat
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowGiftOptions(false)}
                  className="text-sm btn-secondary"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSendGift}
                  className="text-sm btn-primary"
                  disabled={!selectedTreat || isSending}
                >
                  {isSending ? 'Sending...' : 'Send Treat'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

