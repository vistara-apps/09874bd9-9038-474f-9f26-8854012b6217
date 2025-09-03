'use client';

import { usePrivy } from '@privy-io/react-auth';
import Image from 'next/image';

export default function Header() {
  const { login, authenticated, user, logout } = usePrivy();
  
  return (
    <header className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 relative mr-3">
          <Image 
            src="/logo.svg" 
            alt="FurryFrame Logo" 
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-primary">FurryFrame</h1>
      </div>
      
      <div>
        {authenticated ? (
          <div className="flex items-center">
            {user?.farcaster?.username && (
              <span className="mr-3 text-sm text-gray-600">
                @{user.farcaster.username}
              </span>
            )}
            <button
              onClick={() => logout()}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => login()}
            className="px-4 py-2 text-sm bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
          >
            Login with Farcaster
          </button>
        )}
      </div>
    </header>
  );
}

