import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000', // your backend port
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yourdomain.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
