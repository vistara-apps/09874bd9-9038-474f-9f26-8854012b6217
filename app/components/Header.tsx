'use client';

import { User } from 'lucide-react';
import { type User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="p-4 border-b border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-purple-900 font-bold text-lg">🐱</span>
          </div>
          <h1 className="text-display text-white font-semibold">FurryFrame</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-white/80">{user.displayName}</span>
        </div>
      </div>
    </header>
  );
}
