import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/w40/**',
      },
      {
        protocol: 'https',
        hostname: 'api.camberfarms.org',
        pathname: '/uploads/**',
      },
      // Optional: keep this if you still use render
      {
        protocol: 'https',
        hostname: 'camberfarms-project.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)