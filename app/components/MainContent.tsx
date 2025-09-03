'use client';

import { Star, Upload, Image as ImageIcon, Trophy } from 'lucide-react';
import { type User, type Challenge } from '../types';

interface MainContentProps {
  user: User;
  challenge: Challenge;
  onChallengeSelect: (challenge: Challenge) => void;
  onViewGallery: () => void;
  onUploadPhoto: () => void;
}

export function MainContent({ 
  user, 
  challenge, 
  onChallengeSelect, 
  onViewGallery, 
  onUploadPhoto 
}: MainContentProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Welcome to FurryFrame</h2>
        <p className="text-white/80 text-sm">
          Use AI filters to make photos pop, and join in! And your cat doesn't necessarily matter this choice but figure your frame on a challenge for extras yearly fun chances.
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-accent">
            <Star className="w-4 h-4" />
            <span className="font-semibold">2.5M+</span>
          </div>
          <p className="text-xs text-white/60">Filters</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-accent">
            <ImageIcon className="w-4 h-4" />
            <span className="font-semibold">$1.69</span>
          </div>
          <p className="text-xs text-white/60">Premium</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-accent">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">3</span>
          </div>
          <p className="text-xs text-white/60">Monetise</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onUploadPhoto}
          className="w-full btn-accent flex items-center justify-center gap-2 py-3"
        >
          <Upload className="w-4 h-4" />
          Upload Filenames
        </button>
        
        <button
          onClick={() => onViewGallery()}
          className="w-full btn-secondary py-3"
        >
          Send Virtual Treats
        </button>
      </div>

      {/* Current Challenge */}
      <div className="card-dark">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-900 font-bold">📦</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">{challenge.title}</h3>
              <p className="text-xs text-white/60">Weekly Photos</p>
            </div>
          </div>
          <button className="text-white/60 hover:text-white">×</button>
        </div>
        
        {/* Challenge Preview Image */}
        <div className="bg-white/10 rounded-md h-32 mb-3 flex items-center justify-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <span className="text-2xl">🐱</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <ImageIcon className="w-4 h-4" />
            <span>AI Filters</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Star className="w-4 h-4" />
            <span>Challenge</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Trophy className="w-4 h-4" />
            <span>Filters</span>
            <span className="ml-auto bg-accent text-purple-900 px-2 py-1 rounded text-xs">1</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Upload className="w-4 h-4" />
            <span>Taylor</span>
            <div className="ml-auto flex gap-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs">•</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onChallengeSelect(challenge)}
          className="w-full btn-primary mt-4"
        >
          Weekly Challenge
        </button>
      </div>

      {/* Bottom Section - Filters Preview */}
      <div className="card-dark">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white">Cats in Fall Filters</h3>
          <button className="text-white/60 hover:text-white">×</button>
        </div>
        
        <div className="flex gap-2 mb-3">
          <span className="px-2 py-1 bg-accent text-purple-900 rounded-full text-xs">All Filters</span>
          <span className="px-2 py-1 bg-white/20 text-white rounded-full text-xs">AI Personalize</span>
          <span className="px-2 py-1 bg-white/20 text-white rounded-full text-xs">Kitchize</span>
          <span className="px-2 py-1 bg-white/20 text-white rounded-full text-xs">Cat in Photos</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="aspect-square bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-md"></div>
          <div className="aspect-square bg-gradient-to-br from-purple-400/20 to-accent/20 rounded-md"></div>
          <div className="aspect-square bg-gradient-to-br from-white/20 to-purple-500/20 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
