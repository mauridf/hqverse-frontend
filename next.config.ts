import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'comicvine.gamespot.com',
        pathname: '/api/image/**',
      },
      {
        protocol: 'https',
        hostname: 'hqverse-api.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/aida-public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  
  turbopack: {},
};

export default nextConfig;