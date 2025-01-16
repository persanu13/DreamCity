import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // Add any other domains you need to load images from
    ],
  },
};

export default nextConfig;
