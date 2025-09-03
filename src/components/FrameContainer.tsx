import { ReactNode } from 'react';

interface FrameContainerProps {
  children: ReactNode;
  variant?: 'default';
}

export default function FrameContainer({ 
  children, 
  variant = 'default' 
}: FrameContainerProps) {
  return (
    <div className="w-full max-w-lg mx-auto bg-surface rounded-lg shadow-card overflow-hidden">
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

