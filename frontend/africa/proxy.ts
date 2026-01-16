// import { defaultLocale, locales } from '@/i18n/config'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}