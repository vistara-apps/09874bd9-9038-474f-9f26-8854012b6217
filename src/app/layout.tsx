import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'FurryFrame - Cat Photo Challenges',
  description: 'Your Farcaster frame for crafting and sharing purrfect cat moments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main className="min-h-screen bg-bg">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

