'use client';

import { Challenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  variant: 'active' | 'submitted';
  onParticipate: () => void;
}

export default function ChallengeCard({ challenge, variant, onParticipate }: ChallengeCardProps) {
  // Calculate days remaining
  const endDate = new Date(challenge.endDate);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-primary/10 p-4">
        <h2 className="text-lg font-semibold text-primary">{challenge.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500">Prompt:</span>
            <span className="ml-2 font-medium">{challenge.prompt}</span>
          </div>
          
          <div className="text-sm text-accent font-medium">
            {daysRemaining > 0 ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left` : 'Ending today'}
          </div>
        </div>
        
        {variant === 'active' ? (
          <button
            onClick={onParticipate}
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Participate Now
          </button>
        ) : (
          <div className="flex items-center justify-center py-2 bg-green-50 text-green-700 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            You've submitted to this challenge
          </div>
        )}
      </div>
    </div>
  );
}

