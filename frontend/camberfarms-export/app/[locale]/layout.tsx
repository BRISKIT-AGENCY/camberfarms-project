import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Navbar from './components/Nav/Navbar'
import TrackVisit from './components/TrackVisit'
// import './globals.css'

import { routing } from '@/i18n/routing'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
	return [
		{ locale: 'en' },
		{ locale: 'fr' },
		{ locale: 'es' },
		{ locale: 'pt' },
		{ locale: 'it' },
		{ locale: 'cn' },
		{ locale: 'de' },
		{ locale: 'nl' },
		{ locale: 'sa' },
	]
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

	return (
		<NextIntlClientProvider>
			<TrackVisit />
			<Navbar />
			{children}
			<Footer />
			<ToastContainer />
		</NextIntlClientProvider>
	)
}
