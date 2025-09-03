import axios from 'axios';
import { Challenge, Photo, Gift } from '@/types';

// API base URL
const API_BASE_URL = '/api';

// Challenge API
export async function fetchActiveChallenge(): Promise<Challenge> {
  try {
    // In a real implementation, we would call the API
    // const response = await axios.get(`${API_BASE_URL}/challenges/active`);
    // return response.data;
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    return {
      challengeId: 'challenge-1',
      title: 'Cats in Boxes',
      description: 'Share photos of your cats in boxes, bags, or any container they love to squeeze into!',
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      prompt: 'If it fits, I sits!'
    };
  } catch (error) {
    console.error('Error fetching active challenge:', error);
    throw error;
  }
}

export async function fetchChallengeSubmissions(challengeId: string): Promise<Photo[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/challenges/${challengeId}/submissions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching challenge submissions:', error);
    throw error;
  }
}

// Photo API
export async function uploadPhotoToIPFS(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_BASE_URL}/photos/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.ipfsHash;
  } catch (error) {
    console.error('Error uploading photo to IPFS:', error);
    throw error;
  }
}

export async function enhancePhotoWithAI(imageUrl: string, filterId: string): Promise<Photo> {
  try {
    const response = await axios.post(`${API_BASE_URL}/photos/enhance`, {
      imageUrl,
      filterId,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error enhancing photo with AI:', error);
    throw error;
  }
}

// Gift API
export async function sendGiftToPhoto(photoId: string, treatType: string): Promise<Gift> {
  try {
    const response = await axios.post(`${API_BASE_URL}/gifts/send`, {
      photoId,
      treatType,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending gift to photo:', error);
    throw error;
  }
}

export async function fetchPhotoGifts(photoId: string): Promise<Gift[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/gifts/photo/${photoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photo gifts:', error);
    throw error;
  }
}

