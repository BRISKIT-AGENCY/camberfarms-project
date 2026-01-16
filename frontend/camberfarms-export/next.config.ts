import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
				pathname: '/w40/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				pathname: '/api/**',
				port: '5000',
			},
		],
	},
	// i18n: {
	// 	locales: ['en', 'fr', 'de'],
	// 	defaultLocale: 'en',
	// },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
