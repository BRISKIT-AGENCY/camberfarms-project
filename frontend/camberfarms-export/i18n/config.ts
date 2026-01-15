export const locales = ['en', 'fr', 'es', 'pt', 'it', 'ru'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
