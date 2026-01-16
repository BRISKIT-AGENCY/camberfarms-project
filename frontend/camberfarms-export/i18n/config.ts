export const locales = [
	'en',
	'fr',
	'es',
	'pt',
	'it',
	'ru',
	'cn',
	'de',
	'nl',
	'sa',
] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
