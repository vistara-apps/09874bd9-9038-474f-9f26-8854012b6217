'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import FilterSelector from './FilterSelector';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import { Filter, Photo } from '@/types';

interface PhotoUploaderProps {
  onPhotoEnhanced: (photo: Photo) => void;
}

export default function PhotoUploader({ onPhotoEnhanced }: PhotoUploaderProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const { uploadPhoto, enhancePhoto, isUploading, isEnhancing, error } = usePhotoUpload();
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    
    try {
      const uploadedPhoto = await uploadPhoto(file);
      // In a real implementation, we would store the uploaded photo ID
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  }, [uploadPhoto]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1,
    multiple: false
  });
  
  const handleFilterSelect = (filter: Filter) => {
    setSelectedFilter(filter);
  };
  
  const handleEnhance = async () => {
    if (!uploadedImage || !selectedFilter) return;
    
    try {
      const enhanced = await enhancePhoto(uploadedImage, selectedFilter.id);
      setEnhancedImage(enhanced.enhancedImageUrl);
      
      onPhotoEnhanced(enhanced);
    } catch (error) {
      console.error('Error enhancing photo:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      {!uploadedImage ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">
              {isDragActive ? 'Drop your cat photo here' : 'Drag & drop your cat photo here, or click to select'}
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, WebP
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden">
            <Image
              src={enhancedImage || uploadedImage}
              alt="Uploaded cat photo"
              fill
              className="object-cover"
            />
            {isEnhancing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {!enhancedImage && (
            <>
              <div className="space-y-3">
                <h3 className="text-md font-medium">Select a filter</h3>
                <FilterSelector onSelectFilter={handleFilterSelect} selectedFilter={selectedFilter} />
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleEnhance}
                  disabled={!selectedFilter || isEnhancing}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    !selectedFilter || isEnhancing
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {isEnhancing ? 'Enhancing...' : 'Enhance Photo'}
                </button>
              </div>
            </>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

