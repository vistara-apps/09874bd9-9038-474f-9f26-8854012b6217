import { create } from 'zustand';
import { User, Challenge, Photo, Gift, Filter } from '@/types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  
  // Challenge state
  activeChallenge: Challenge | null;
  challenges: Challenge[];
  setActiveChallenge: (challenge: Challenge | null) => void;
  setChallenges: (challenges: Challenge[]) => void;
  
  // Photo state
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  setPhotos: (photos: Photo[]) => void;
  
  // Gift state
  gifts: Gift[];
  addGift: (gift: Gift) => void;
  setGifts: (gifts: Gift[]) => void;
  
  // Filter state
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  
  // Challenge state
  activeChallenge: null,
  challenges: [],
  setActiveChallenge: (activeChallenge) => set({ activeChallenge }),
  setChallenges: (challenges) => set({ challenges }),
  
  // Photo state
  photos: [],
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  setPhotos: (photos) => set({ photos }),
  
  // Gift state
  gifts: [],
  addGift: (gift) => set((state) => ({ gifts: [...state.gifts, gift] })),
  setGifts: (gifts) => set({ gifts }),
  
  // Filter state
  filters: [],
  setFilters: (filters) => set({ filters }),
}));

