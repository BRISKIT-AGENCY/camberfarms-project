import Footer from './components/Footer'
import Navbar from './components/Nav/Navbar'
// import './globals.css'

// import { locales } from '@/i18n/config'
import { NextIntlClientProvider } from 'next-intl'
// import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) notFound()

	// const messages = await getMessages()

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider>
					<Navbar />
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
