import { create } from 'zustand';
import { AppState, Challenge, Filter, Gift, Photo, User } from '@/types';

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  activeChallenge: null,
  challenges: [],
  photos: [],
  gifts: [],
  filters: [
    {
      id: 'basic-light',
      name: 'Basic Light',
      description: 'Enhances lighting for better visibility',
      isPremium: false,
    },
    {
      id: 'basic-color',
      name: 'Basic Color',
      description: 'Improves color balance and saturation',
      isPremium: false,
    },
    {
      id: 'basic-sharp',
      name: 'Basic Sharp',
      description: 'Increases sharpness for clearer details',
      isPremium: false,
    },
    {
      id: 'premium-portrait',
      name: 'Premium Portrait',
      description: 'Professional portrait enhancement with bokeh effect',
      isPremium: true,
      price: 0.25,
    },
    {
      id: 'premium-vibrant',
      name: 'Premium Vibrant',
      description: 'Dramatic color enhancement for eye-catching photos',
      isPremium: true,
      price: 0.25,
    },
    {
      id: 'premium-artistic',
      name: 'Premium Artistic',
      description: 'Artistic filter with painterly effects',
      isPremium: true,
      price: 0.25,
    },
  ],
  
  setUser: (user: User | null) => set({ user }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setActiveChallenge: (activeChallenge: Challenge | null) => set({ activeChallenge }),
  setChallenges: (challenges: Challenge[]) => set({ challenges }),
  addPhoto: (photo: Photo) => set((state) => ({ 
    photos: [...state.photos, photo] 
  })),
  addGift: (gift: Gift) => set((state) => ({ 
    gifts: [...state.gifts, gift] 
  })),
  setFilters: (filters: Filter[]) => set({ filters }),
}));

