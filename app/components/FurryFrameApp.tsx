'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FrameContainer } from './FrameContainer';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { ChallengeModal } from './ChallengeModal';
import { PhotoEnhancer } from './PhotoEnhancer';
import { GalleryView } from './GalleryView';
import { type Challenge, type Photo, type User } from '../types';

// Mock data
const mockUser: User = {
  farcasterId: '12345',
  displayName: 'CatLover',
  profilePicUrl: 'https://api.dicebear.com/7.x/cats/svg?seed=CatLover',
};

const mockChallenge: Challenge = {
  challengeId: '1',
  title: 'Cats in Boxes',
  description: 'Show us your cats in their favorite boxes!',
  startDate: new Date(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  prompt: 'Share a photo of your cat in any kind of box - cardboard, gift box, or any container they love!',
};

const mockPhotos: Photo[] = [
  {
    photoId: '1',
    userId: '12345',
    imageUrl: 'https://picsum.photos/300/300?random=1',
    enhancedImageUrl: 'https://picsum.photos/300/300?random=1',
    tags: ['orange', 'kitten', 'looking-up'],
    uploadTimestamp: new Date(),
  },
  {
    photoId: '2',
    userId: '67890',
    imageUrl: 'https://picsum.photos/300/300?random=2',
    enhancedImageUrl: 'https://picsum.photos/300/300?random=2',
    tags: ['tabby', 'sleeping'],
    uploadTimestamp: new Date(),
  },
  {
    photoId: '3',
    userId: '11111',
    imageUrl: 'https://picsum.photos/300/300?random=3',
    enhancedImageUrl: 'https://picsum.photos/300/300?random=3',
    tags: ['black', 'playing'],
    uploadTimestamp: new Date(),
  },
];

export function FurryFrameApp() {
  const [currentView, setCurrentView] = useState<'main' | 'challenge' | 'upload' | 'gallery'>('main');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userPhotos, setUserPhotos] = useState<Photo[]>(mockPhotos);

  const handleViewChange = (view: 'main' | 'challenge' | 'upload' | 'gallery') => {
    setCurrentView(view);
  };

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentView('challenge');
  };

  const handlePhotoSubmit = (photo: Photo) => {
    setUserPhotos([photo, ...userPhotos]);
    setCurrentView('main');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'challenge':
        return (
          <ChallengeModal
            challenge={selectedChallenge || mockChallenge}
            onClose={() => setCurrentView('main')}
            onUploadPhoto={() => setCurrentView('upload')}
          />
        );
      case 'upload':
        return (
          <PhotoEnhancer
            challenge={selectedChallenge || mockChallenge}
            onSubmit={handlePhotoSubmit}
            onCancel={() => setCurrentView('main')}
          />
        );
      case 'gallery':
        return (
          <GalleryView
            photos={userPhotos}
            onBack={() => setCurrentView('main')}
          />
        );
      default:
        return (
          <MainContent
            user={mockUser}
            challenge={mockChallenge}
            onChallengeSelect={handleChallengeSelect}
            onViewGallery={() => setCurrentView('gallery')}
            onUploadPhoto={() => setCurrentView('upload')}
          />
        );
    }
  };

  return (
    <FrameContainer>
      <Header user={mockUser} />
      <motion.div
        key={currentView}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1"
      >
        {renderContent()}
      </motion.div>
    </FrameContainer>
  );
}
