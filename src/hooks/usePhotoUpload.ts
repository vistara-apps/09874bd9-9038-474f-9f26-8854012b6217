import { useState } from 'react';
import { useStore } from '@/lib/store';
import { enhancePhoto, uploadPhoto } from '@/utils/api';
import { generateId } from '@/utils/helpers';
import { Photo } from '@/types';

export const usePhotoUpload = () => {
  const { user, addPhoto, filters } = useStore();
  const [isUploading, setIsUploading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<Photo | null>(null);
  const [enhancedPhoto, setEnhancedPhoto] = useState<Photo | null>(null);

  const resetState = () => {
    setIsUploading(false);
    setIsEnhancing(false);
    setUploadProgress(0);
    setError(null);
    setUploadedPhoto(null);
    setEnhancedPhoto(null);
  };

  const handleUpload = async (file: File) => {
    if (!user) {
      setError('You must be logged in to upload photos');
      return null;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await uploadPhoto(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.error || !response.data) {
        setError(response.error || 'Failed to upload photo');
        setIsUploading(false);
        return null;
      }

      const newPhoto: Photo = {
        photoId: generateId(),
        userId: user.farcasterId,
        imageUrl: response.data.imageUrl,
        tags: [],
        uploadTimestamp: Date.now(),
      };

      setUploadedPhoto(newPhoto);
      addPhoto(newPhoto);
      setIsUploading(false);
      
      return newPhoto;
    } catch (err) {
      setError('An unexpected error occurred during upload');
      setIsUploading(false);
      return null;
    }
  };

  const handleEnhance = async (photo: Photo, filterId: string) => {
    if (!user) {
      setError('You must be logged in to enhance photos');
      return null;
    }

    try {
      setIsEnhancing(true);
      setError(null);

      const selectedFilter = filters.find(f => f.id === filterId);
      
      if (!selectedFilter) {
        setError('Invalid filter selected');
        setIsEnhancing(false);
        return null;
      }

      const response = await enhancePhoto(photo.imageUrl, filterId);

      if (response.error || !response.data) {
        setError(response.error || 'Failed to enhance photo');
        setIsEnhancing(false);
        return null;
      }

      const enhancedPhoto: Photo = {
        ...photo,
        enhancedImageUrl: response.data.enhancedImageUrl,
      };

      setEnhancedPhoto(enhancedPhoto);
      addPhoto(enhancedPhoto);
      setIsEnhancing(false);
      
      return enhancedPhoto;
    } catch (err) {
      setError('An unexpected error occurred during enhancement');
      setIsEnhancing(false);
      return null;
    }
  };

  return {
    isUploading,
    isEnhancing,
    uploadProgress,
    error,
    uploadedPhoto,
    enhancedPhoto,
    handleUpload,
    handleEnhance,
    resetState,
  };
};

