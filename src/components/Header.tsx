import { usePrivy } from '@privy-io/react-auth';
import { useStore } from '@/lib/store';
import { verifyUser } from '@/utils/api';

export default function Header() {
  const { login, logout, authenticated, user } = usePrivy();
  const { setUser, setIsAuthenticated } = useStore();

  const handleLogin = async () => {
    await login();
    
    // In a real implementation, we would verify the Farcaster user
    // and fetch their profile data from the API
    if (user?.farcaster?.fid) {
      const message = `Login to FurryFrame with Farcaster FID: ${user.farcaster.fid}`;
      const signature = 'mock-signature'; // In a real app, we would get this from Farcaster
      
      const response = await verifyUser(message, signature);
      
      if (response.data) {
        setUser(response.data);
        setIsAuthenticated(true);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-surface shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">FurryFrame</h1>
        <p className="ml-2 text-sm text-gray-500">Your purrfect cat moments</p>
      </div>
      
      <div>
        {authenticated ? (
          <div className="flex items-center">
            {user?.farcaster?.username && (
              <span className="mr-2 text-sm">
                @{user.farcaster.username}
              </span>
            )}
            <button 
              onClick={handleLogout}
              className="btn-secondary text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="btn-primary"
          >
            Login with Farcaster
          </button>
        )}
      </div>
    </header>
  );
}

