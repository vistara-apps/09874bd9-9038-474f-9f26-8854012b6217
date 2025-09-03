import { Challenge } from '@/types';
import { formatDate } from '@/utils/helpers';

interface ChallengeCardProps {
  challenge: Challenge;
  variant?: 'active' | 'submitted';
  onParticipate?: () => void;
}

export default function ChallengeCard({
  challenge,
  variant = 'active',
  onParticipate,
}: ChallengeCardProps) {
  const isActive = new Date(challenge.endDate) > new Date();
  
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{challenge.title}</h2>
        
        {isActive && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )}
      </div>
      
      <p className="mt-2 text-gray-600">{challenge.description}</p>
      
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Ends: {formatDate(challenge.endDate)}</span>
        <span>Prompt: {challenge.prompt}</span>
      </div>
      
      {variant === 'active' && isActive && (
        <div className="mt-4">
          <button
            onClick={onParticipate}
            className="btn-primary w-full"
          >
            Participate in Challenge
          </button>
        </div>
      )}
      
      {variant === 'submitted' && (
        <div className="mt-4">
          <div className="bg-gray-100 p-3 rounded-md text-center">
            You've submitted to this challenge
          </div>
        </div>
      )}
    </div>
  );
}

