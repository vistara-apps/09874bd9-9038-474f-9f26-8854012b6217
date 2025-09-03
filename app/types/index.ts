export interface User {
  farcasterId: string;
  displayName: string;
  profilePicUrl: string;
}

export interface Photo {
  photoId: string;
  userId: string;
  imageUrl: string;
  enhancedImageUrl: string;
  tags: string[];
  uploadTimestamp: Date;
}

export interface Challenge {
  challengeId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  prompt: string;
}

export interface Gift {
  giftId: string;
  senderUserId: string;
  photoId: string;
  treatType: string;
  timestamp: Date;
}

export interface FilterOption {
  id: string;
  name: string;
  icon: string;
  premium: boolean;
  price?: number;
}
