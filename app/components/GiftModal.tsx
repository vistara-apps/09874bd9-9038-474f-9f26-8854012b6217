'use client';

import { X, Gift } from 'lucide-react';
import { useState } from 'react';
import { type Photo } from '../types';

interface GiftModalProps {
  photo: Photo;
  onClose: () => void;
  onGiftSent: () => void;
}

const treats = [
  { id: 'fish', emoji: '🐟', name: 'Fish Treat', price: 0.10 },
  { id: 'yarn', emoji: '🧶', name: 'Yarn Ball', price: 0.10 },
  { id: 'mouse', emoji: '🐭', name: 'Toy Mouse', price: 0.10 },
  { id: 'milk', emoji: '🥛', name: 'Milk Bowl', price: 0.15 },
  { id: 'heart', emoji: '💝', name: 'Love Gift', price: 0.25 },
  { id: 'crown', emoji: '👑', name: 'Royal Crown', price: 0.50 },
];

export function GiftModal({ photo, onClose, onGiftSent }: GiftModalProps) {
  const [selectedTreat, setSelectedTreat] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendGift = async () => {
    if (!selectedTreat) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onGiftSent();
  };

  const selectedTreatData = treats.find(t => t.id === selectedTreat);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 w-full max-w-md">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Send Virtual Treat</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-md text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="aspect-square bg-white/5 rounded-md overflow-hidden">
            <img
              src={photo.imageUrl}
              alt="Cat photo"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Choose a treat to send:</h4>
            <div className="grid grid-cols-3 gap-2">
              {treats.map((treat) => (
                <button
                  key={treat.id}
                  onClick={() => setSelectedTreat(treat.id)}
                  className={`p-3 rounded-md border text-center transition-all ${
                    selectedTreat === treat.id
                      ? 'bg-accent/20 border-accent'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="text-2xl mb-1">{treat.emoji}</div>
                  <div className="text-xs text-white/80">{treat.name}</div>
                  <div className="text-xs text-accent font-medium">${treat.price}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedTreatData && (
            <div className="bg-white/5 rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedTreatData.emoji}</span>
                  <span className="text-white font-medium">{selectedTreatData.name}</span>
                </div>
                <span className="text-accent font-bold">${selectedTreatData.price}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleSendGift}
            disabled={!selectedTreat || isProcessing}
            className="w-full btn-accent py-3 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Gift className="w-4 h-4 animate-pulse mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Gift className="w-4 h-4 mr-2" />
                Send Gift
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
