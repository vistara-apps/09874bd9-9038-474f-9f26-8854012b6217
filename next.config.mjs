/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placeholder.com', 'picsum.photos', 'api.dicebear.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
