export const locales = ['en', 'fr', 'es', 'pt', 'it', 'ru', 'ar','de','zh','nl'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'