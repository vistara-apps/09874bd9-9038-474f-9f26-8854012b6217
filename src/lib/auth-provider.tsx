import { PrivyProvider } from '@privy-io/react-auth';
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { createConfig, configureChains } from 'wagmi';
import { base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ReactNode } from 'react';

const { chains, publicClient } = configureChains([base], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!privyAppId) {
    console.error('Missing NEXT_PUBLIC_PRIVY_APP_ID environment variable');
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="card p-6 max-w-md">
          <h1 className="text-xl font-bold mb-4">Configuration Error</h1>
          <p>
            Missing Privy App ID. Please set the NEXT_PUBLIC_PRIVY_APP_ID environment variable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['farcaster'],
        appearance: {
          theme: 'light',
          accentColor: 'hsl(230, 75%, 50%)',
          logo: '/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <PrivyWagmiConnector wagmiConfig={config} chains={chains}>
        {children}
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}

