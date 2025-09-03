// User types
export interface User {
  farcasterId: string;
  displayName: string;
  profilePicUrl?: string;
}

// Photo types
export interface Photo {
  photoId: string;
  userId: string;
  imageUrl: string;
  enhancedImageUrl: string;
  tags?: string[];
  uploadTimestamp: string;
  user?: User;
}

// Challenge types
export interface Challenge {
  challengeId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prompt: string;
}

// Gift types
export interface Gift {
  giftId: string;
  senderUserId: string;
  photoId: string;
  treatType: string;
  timestamp: string;
}

// Filter types
export interface Filter {
  id: string;
  name: string;
  type: 'basic' | 'premium';
  description: string;
  price: number;
}

