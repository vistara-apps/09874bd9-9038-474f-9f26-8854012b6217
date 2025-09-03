'use client';

import { X, Calendar, Users, Trophy } from 'lucide-react';
import { type Challenge } from '../types';

interface ChallengeModalProps {
  challenge: Challenge;
  onClose: () => void;
  onUploadPhoto: () => void;
}

export function ChallengeModal({ challenge, onClose, onUploadPhoto }: ChallengeModalProps) {
  const daysLeft = Math.ceil((challenge.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Challenge Details</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-md text-white/80 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="card-dark space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
            <p className="text-white/60 text-sm">{challenge.description}</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-md p-4 space-y-3">
          <p className="text-white/90 text-sm">{challenge.prompt}</p>
          
          <div className="flex items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{daysLeft} days left</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>1.2k participants</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>125 treats sent</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-white font-medium">Challenge Rules:</h4>
          <ul className="space-y-1 text-sm text-white/80">
            <li>• Photo must feature a cat in or around a box</li>
            <li>• Use AI enhancement for best results</li>
            <li>• Original photos only - no reposts</li>
            <li>• Keep it family-friendly and fun!</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={onUploadPhoto}
            className="w-full btn-accent py-3"
          >
            📸 Upload Photo for Challenge
          </button>
          
          <button
            onClick={() => {/* Handle browse existing */}}
            className="w-full btn-secondary py-3"
          >
            Browse Challenge Submissions
          </button>
        </div>
      </div>

      {/* Recent Submissions Preview */}
      <div className="space-y-3">
        <h4 className="text-white font-medium">Recent Submissions</h4>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-purple-400/20 to-accent/20 rounded-md flex items-center justify-center"
            >
              <span className="text-2xl">🐱</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
