import { routing } from '@/i18n/routing'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'es' },
    { locale: 'pt' },
    { locale: 'it' },
    { locale: 'ru' },
    { locale: 'ar' },
    { locale: 'de' },
    { locale: 'zh' },
    { locale: 'nl' }
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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="xl:hidden block">
            <Navbar logoSrc="/images/logo.png" />
          </div>

          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}