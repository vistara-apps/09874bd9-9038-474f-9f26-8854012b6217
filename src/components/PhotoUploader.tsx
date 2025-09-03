import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import FilterSelector from './FilterSelector';
import { Photo } from '@/types';

interface PhotoUploaderProps {
  onPhotoEnhanced?: (photo: Photo) => void;
}

export default function PhotoUploader({ onPhotoEnhanced }: PhotoUploaderProps) {
  const {
    isUploading,
    isEnhancing,
    uploadProgress,
    error,
    uploadedPhoto,
    enhancedPhoto,
    handleUpload,
    handleEnhance,
    resetState,
  } = usePhotoUpload();

  const [selectedFilter, setSelectedFilter] = useState<string>('basic-light');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const photo = await handleUpload(file);
      
      if (photo) {
        // Auto-enhance with selected filter
        const enhanced = await handleEnhance(photo, selectedFilter);
        
        if (enhanced && onPhotoEnhanced) {
          onPhotoEnhanced(enhanced);
        }
      }
    }
  }, [handleUpload, handleEnhance, selectedFilter, onPhotoEnhanced]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxFiles: 1,
    disabled: isUploading || isEnhancing,
  });

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
    
    if (uploadedPhoto) {
      handleEnhance(uploadedPhoto, filterId);
    }
  };

  const handleReset = () => {
    resetState();
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}
      
      {!uploadedPhoto ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="space-y-2">
              <p>Uploading your cat photo...</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">
                {isDragActive
                  ? "Drop your cat photo here..."
                  : "Drag & drop your cat photo here, or click to select"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPEG, PNG, WebP
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative aspect-square rounded-md overflow-hidden">
                <img
                  src={enhancedPhoto?.enhancedImageUrl || uploadedPhoto.imageUrl}
                  alt="Uploaded cat"
                  className="w-full h-full object-cover"
                />
                
                {isEnhancing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="mb-2">Enhancing your photo...</p>
                      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <FilterSelector
                selectedFilter={selectedFilter}
                onSelectFilter={handleFilterChange}
                disabled={isEnhancing}
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleReset}
              className="btn-secondary"
              disabled={isEnhancing}
            >
              Upload Another Photo
            </button>
            
            {enhancedPhoto && (
              <button
                onClick={() => onPhotoEnhanced?.(enhancedPhoto)}
                className="btn-primary"
              >
                Use This Photo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

