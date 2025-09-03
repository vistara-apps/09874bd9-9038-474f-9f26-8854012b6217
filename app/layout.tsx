import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'FurryFrame',
  description: 'Your Farcaster frame for crafting and sharing purrfect cat moments',
  openGraph: {
    title: 'FurryFrame',
    description: 'Your Farcaster frame for crafting and sharing purrfect cat moments',
    images: ['/api/og'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/api/og',
    'fc:frame:button:1': 'Launch FurryFrame',
    'fc:frame:post_url': '/api/frame',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
