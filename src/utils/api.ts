import axios from 'axios';
import { ApiResponse, Challenge, Gift, Photo, User } from '@/types';

const API_BASE_URL = '/api';

// User API
export const verifyUser = async (message: string, signature: string): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify`, { message, signature });
    return { data: response.data };
  } catch (error) {
    console.error('Error verifying user:', error);
    return { error: 'Failed to verify user' };
  }
};

export const getUser = async (userId: string): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { error: 'Failed to fetch user' };
  }
};

// Photo API
export const uploadPhoto = async (file: File): Promise<ApiResponse<{ imageUrl: string }>> => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    
    const response = await axios.post(`${API_BASE_URL}/photos/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return { data: response.data };
  } catch (error) {
    console.error('Error uploading photo:', error);
    return { error: 'Failed to upload photo' };
  }
};

export const enhancePhoto = async (
  imageUrl: string, 
  filterId: string
): Promise<ApiResponse<{ enhancedImageUrl: string }>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/photos/enhance`, { imageUrl, filterId });
    return { data: response.data };
  } catch (error) {
    console.error('Error enhancing photo:', error);
    return { error: 'Failed to enhance photo' };
  }
};

// Challenge API
export const getActiveChallenge = async (): Promise<ApiResponse<Challenge>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/challenges/active`);
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching active challenge:', error);
    return { error: 'Failed to fetch active challenge' };
  }
};

export const getChallengeSubmissions = async (challengeId: string): Promise<ApiResponse<Photo[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/challenges/${challengeId}/submissions`);
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching challenge submissions:', error);
    return { error: 'Failed to fetch challenge submissions' };
  }
};

export const submitToChallenge = async (
  challengeId: string, 
  photoId: string
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/challenges/${challengeId}/submissions`, { photoId });
    return { data: response.data };
  } catch (error) {
    console.error('Error submitting to challenge:', error);
    return { error: 'Failed to submit to challenge' };
  }
};

// Gift API
export const sendGift = async (
  photoId: string, 
  treatType: string
): Promise<ApiResponse<Gift>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/gifts/send`, { photoId, treatType });
    return { data: response.data };
  } catch (error) {
    console.error('Error sending gift:', error);
    return { error: 'Failed to send gift' };
  }
};

export const getPhotoGifts = async (photoId: string): Promise<ApiResponse<Gift[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gifts/photo/${photoId}`);
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching photo gifts:', error);
    return { error: 'Failed to fetch photo gifts' };
  }
};

