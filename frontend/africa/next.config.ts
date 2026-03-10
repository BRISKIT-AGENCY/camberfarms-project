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
        hostname: 'camberfarms-project.onrender.com',
        pathname: '/uploads/**', // matches your blog images
      },
    ],
  },
  // i18n: {
  //   locales: ['en', 'fr', 'de'],
  //   defaultLocale: 'en',
  // },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)