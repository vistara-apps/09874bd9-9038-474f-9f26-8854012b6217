'use client';

import { useState, useCallback } from 'react';
import { Upload, Sparkles, X, Check, Zap } from 'lucide-react';
import { type Challenge, type Photo } from '../types';

interface PhotoEnhancerProps {
  challenge: Challenge;
  onSubmit: (photo: Photo) => void;
  onCancel: () => void;
}

const filters = [
  { id: 'brightness', name: 'Brightness Boost', icon: '☀️', premium: false },
  { id: 'contrast', name: 'Sharp Contrast', icon: '🔍', premium: false },
  { id: 'warmth', name: 'Warm Glow', icon: '🧡', premium: false },
  { id: 'vintage', name: 'Vintage Film', icon: '📸', premium: true },
  { id: 'professional', name: 'Pro Studio', icon: '⭐', premium: true },
  { id: 'magical', name: 'Magical Aura', icon: '✨', premium: true },
];

export function PhotoEnhancer({ challenge, onSubmit, onCancel }: PhotoEnhancerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [caption, setCaption] = useState('');

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleEnhance = async () => {
    if (!selectedImage || !selectedFilter) return;
    
    setIsEnhancing(true);
    // Simulate AI enhancement
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsEnhancing(false);
  };

  const handleSubmit = () => {
    if (!selectedImage) return;

    const newPhoto: Photo = {
      photoId: Date.now().toString(),
      userId: '12345',
      imageUrl: selectedImage,
      enhancedImageUrl: selectedImage,
      tags: ['challenge', challenge.challengeId],
      uploadTimestamp: new Date(),
    };

    onSubmit(newPhoto);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Enhance Your Photo</h2>
          <p className="text-white/60 text-sm">For: {challenge.title}</p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/10 rounded-md text-white/80 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image Upload */}
      {!selectedImage ? (
        <div className="card-dark">
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-white/60 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Upload Your Cat Photo</h3>
            <p className="text-white/60 text-sm mb-4">Choose a photo that fits the challenge theme</p>
            <label className="btn-accent cursor-pointer inline-block">
              Select Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <>
          {/* Image Preview */}
          <div className="card-dark">
            <div className="aspect-square bg-white/5 rounded-md overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt="Uploaded cat"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="w-full btn-secondary text-sm py-2"
            >
              Choose Different Photo
            </button>
          </div>

          {/* Filter Selection */}
          <div className="card-dark">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="text-white font-medium">AI Enhancement Filters</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`p-3 rounded-md border text-left transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-accent/20 border-accent text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{filter.icon}</span>
                    <span className="text-sm font-medium">{filter.name}</span>
                    {filter.premium && (
                      <Zap className="w-3 h-3 text-accent" />
                    )}
                  </div>
                  {filter.premium && (
                    <div className="text-xs text-accent">$0.25</div>
                  )}
                </button>
              ))}
            </div>

            {selectedFilter && (
              <button
                onClick={handleEnhance}
                disabled={isEnhancing}
                className="w-full btn-accent mt-4 py-3 disabled:opacity-50"
              >
                {isEnhancing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin mr-2" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Apply Enhancement
                  </>
                )}
              </button>
            )}
          </div>

          {/* Caption */}
          <div className="card-dark">
            <label className="block text-white font-medium mb-2">
              Add a Caption (Optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tell us about your furry friend..."
              className="w-full bg-white/5 border border-white/20 rounded-md p-3 text-white placeholder-white/50 resize-none"
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="space-y-2">
            <button
              onClick={handleSubmit}
              className="w-full btn-accent py-3"
            >
              <Check className="w-4 h-4 mr-2" />
              Submit to Challenge
            </button>
            <p className="text-center text-white/60 text-xs">
              Your photo will be added to the "{challenge.title}" challenge
            </p>
          </div>
        </>
      )}
    </div>
  );
}
