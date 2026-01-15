import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['en', 'fr', 'es', 'pt', 'it', 'ru'],
	defaultLocale: 'en',
	localePrefix: 'as-needed',
})
