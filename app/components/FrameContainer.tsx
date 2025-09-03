'use client';

import { ReactNode } from 'react';

interface FrameContainerProps {
  children: ReactNode;
}

export function FrameContainer({ children }: FrameContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-purple">
      <div className="frame-container flex flex-col min-h-screen">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-card overflow-hidden flex flex-col min-h-[600px]">
          {children}
        </div>
      </div>
    </div>
  );
}
