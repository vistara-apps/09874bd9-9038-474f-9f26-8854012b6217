import { useEffect } from 'react';
import { Photo } from '@/types';
import ChallengeSubmission from './ChallengeSubmission';
import { useChallenges } from '@/hooks/useChallenges';

interface SubmissionGalleryProps {
  challengeId: string;
}

export default function SubmissionGallery({ challengeId }: SubmissionGalleryProps) {
  const { submissions, isLoading, error, fetchChallengeSubmissions } = useChallenges();
  
  useEffect(() => {
    fetchChallengeSubmissions(challengeId);
  }, [challengeId, fetchChallengeSubmissions]);
  
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading submissions...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }
  
  if (submissions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-600">No submissions yet. Be the first to submit!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Challenge Submissions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {submissions.map((photo) => (
          <ChallengeSubmission
            key={photo.photoId}
            photo={photo}
            userName={`User ${photo.userId.substring(0, 4)}`}
          />
        ))}
      </div>
    </div>
  );
}

