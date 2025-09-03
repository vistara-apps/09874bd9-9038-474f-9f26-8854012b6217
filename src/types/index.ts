// User types
export interface User {
  farcasterId: string;
  displayName: string;
  profilePicUrl: string;
}

// Photo types
export interface Photo {
  photoId: string;
  userId: string;
  imageUrl: string;
  enhancedImageUrl?: string;
  tags: string[];
  uploadTimestamp: number;
}

// Challenge types
export interface Challenge {
  challengeId: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  prompt: string;
}

// Gift types
export interface Gift {
  giftId: string;
  senderUserId: string;
  photoId: string;
  treatType: TreatType;
  timestamp: number;
}

export type TreatType = 'fish' | 'yarn' | 'mouse' | 'catnip';

// Filter types
export interface Filter {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  price?: number;
}

// Store types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  activeChallenge: Challenge | null;
  challenges: Challenge[];
  photos: Photo[];
  gifts: Gift[];
  filters: Filter[];
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setActiveChallenge: (challenge: Challenge | null) => void;
  setChallenges: (challenges: Challenge[]) => void;
  addPhoto: (photo: Photo) => void;
  addGift: (gift: Gift) => void;
  setFilters: (filters: Filter[]) => void;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

