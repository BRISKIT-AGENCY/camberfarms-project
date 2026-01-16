import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['en', 'fr', 'es', 'pt', 'it', 'ru', 'ar','de','zh','nl'],
	defaultLocale: 'en',
	localePrefix: 'as-needed',
})