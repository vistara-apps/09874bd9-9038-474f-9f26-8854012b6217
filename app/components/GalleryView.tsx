'use client';

import { ArrowLeft, Heart, Gift } from 'lucide-react';
import { useState } from 'react';
import { type Photo } from '../types';
import { GiftModal } from './GiftModal';

interface GalleryViewProps {
  photos: Photo[];
  onBack: () => void;
}

export function GalleryView({ photos, onBack }: GalleryViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showGiftModal, setShowGiftModal] = useState(false);

  const handleGiftTreat = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShowGiftModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-md text-white/80 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Photo Gallery</h2>
          <p className="text-white/60 text-sm">{photos.length} photos</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <div key={photo.photoId} className="card-dark p-2">
            <div className="aspect-square bg-white/5 rounded-md overflow-hidden mb-2">
              <img
                src={photo.imageUrl}
                alt="Cat photo"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/60">12</span>
              </div>
              
              <button
                onClick={() => handleGiftTreat(photo)}
                className="p-1.5 bg-accent hover:bg-accent/90 rounded-md text-purple-900 transition-colors"
              >
                <Gift className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showGiftModal && selectedPhoto && (
        <GiftModal
          photo={selectedPhoto}
          onClose={() => {
            setShowGiftModal(false);
            setSelectedPhoto(null);
          }}
          onGiftSent={() => {
            setShowGiftModal(false);
            setSelectedPhoto(null);
          }}
        />
      )}
    </div>
  );
}
