'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import ReactCountryFlag from 'react-country-flag'


interface DesktopNavbarProps {
  logoSrc: string
  linkTextColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
}

const LANGUAGES = [
  { label: 'ENG', code: 'en', country: 'US' },
  { label: 'FRA', code: 'fr', country: 'FR' },
  { label: 'RUS', code: 'ru', country: 'RU' },
  { label: 'ARA', code: 'ar', country: 'SA' },
  { label: 'CHN', code: 'zh', country: 'CN' },
  { label: 'NLD', code: 'nl', country: 'NL' },
  { label: 'DEU', code: 'de', country: 'DE' },
  { label: 'ITA', code: 'it', country: 'IT' },
  { label: 'POR', code: 'pt', country: 'PT' },
  { label: 'ESP', code: 'es', country: 'ES' }
]

const DesktopNavbar = ({
  logoSrc,
  linkTextColor = 'text-white',
  buttonBgColor = 'bg-white',
  buttonTextColor = 'text-[#1AD329]'
}: DesktopNavbarProps) => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isOurWorkOpen, setIsOurWorkOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()

  const t = useTranslations('Nav')
  const tBtn = useTranslations('Button')

  const isActive = (path: string) =>
    pathname === `/${locale}${path}` ||
    pathname.startsWith(`/${locale}${path}/`)

  /** ✅ Close everything */
  const closeAllDropdowns = () => {
    setIsAboutOpen(false)
    setIsOurWorkOpen(false)
    setIsResourcesOpen(false)
    setIsLangOpen(false)
  }

  /** Toggle one dropdown & close others */
  const handleDropdown = (dropdown: 'about' | 'ourWork' | 'resources') => {
    closeAllDropdowns()

    if (dropdown === 'about') setIsAboutOpen(prev => !prev)
    if (dropdown === 'ourWork') setIsOurWorkOpen(prev => !prev)
    if (dropdown === 'resources') setIsResourcesOpen(prev => !prev)
  }

  const currentLang =
    LANGUAGES.find(l => l.code === locale)?.label ?? 'ENG'

  const currentCountry =
    LANGUAGES.find(l => l.code === locale)?.country ?? 'US'

  return (
    <div className="items-center justify-between hidden xl:flex">
      {/* LOGO */}
      <Link href="/" aria-label="Go to homepage">
        <Image src={logoSrc} alt="Logo" width={103.35} height={60} />
      </Link>

      {/* NAV LINKS */}
      <div className={`text-[18px] flex gap-5 font-normal ${linkTextColor}`}>
        <Link
          href="/"
          onClick={closeAllDropdowns}
          className={isActive('/') ? 'text-[#1AD329]' : linkTextColor}
        >
          {t('home')}
        </Link>

        {/* ABOUT */}
        <div className="relative">
          <button
            onClick={() => handleDropdown('about')}
            className="flex items-center gap-1"
          >
            <span className={isActive('/about') ? 'text-[#1AD329]' : linkTextColor}>
              {t('about')}
            </span>
            <Image
              src="/images/arrowdown.png"
              alt="Arrow Down"
              width={24}
              height={24}
              className={`transition-transform ${isAboutOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isAboutOpen && (
            <div className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-lg z-50">
              <Link
                href="/about/vision-mission"
                onClick={closeAllDropdowns}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-t-xl"
              >
                Vision & Mission
              </Link>
              <Link
                href="/about"
                onClick={closeAllDropdowns}
                className="block px-4 py-3 text-black hover:bg-gray-100"
              >
                Theory of Change
              </Link>
              <Link
                href="/about/values"
                onClick={closeAllDropdowns}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-b-xl"
              >
                Values
              </Link>
            </div>
          )}
        </div>

        {/* OUR WORK */}
        <div className="relative">
          <button
            onClick={() => handleDropdown('ourWork')}
            className="flex items-center gap-1"
          >
            <span className={isActive('/our-works') ? 'text-[#1AD329]' : linkTextColor}>
              {t('ourWork')}
            </span>
            <Image
              src="/images/arrowdown.png"
              alt="Arrow Down"
              width={24}
              height={24}
              className={`transition-transform ${isOurWorkOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOurWorkOpen && (
            <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-lg z-50">
              {[
                ['Membership', '/our-works/membership'],
                ['Farm Fund', '/our-works/farm-fund'],
                ['Exportation', '/our-works/exportation'],
                ['Our Technology', '/our-works/technology'],
                ['Our Process', '/our-works/process']
              ].map(([label, href], i, arr) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAllDropdowns}
                  className={`block px-4 py-3 text-black hover:bg-gray-100 ${i === 0 ? 'rounded-t-xl' : ''
                    } ${i === arr.length - 1 ? 'rounded-b-xl' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/blog"
          onClick={closeAllDropdowns}
          className={isActive('/blog') ? 'text-[#1AD329]' : linkTextColor}
        >
          {t('blog')}
        </Link>

        {/* RESOURCES */}
        <div className="relative">
          <button
            onClick={() => handleDropdown('resources')}
            className="flex items-center gap-1"
          >
            <span className={isActive('/resources') ? 'text-[#1AD329]' : linkTextColor}>
              {t('resources')}
            </span>
            <Image
              src="/images/arrowdown.png"
              alt="Arrow Down"
              width={24}
              height={24}
              className={`transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isResourcesOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
              <Link
                href="/resources/gallery"
                onClick={closeAllDropdowns}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-t-xl"
              >
                Gallery
              </Link>
              <Link
                href="/resources/faq"
                onClick={closeAllDropdowns}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-b-xl"
              >
                FAQ
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/contact"
          onClick={closeAllDropdowns}
          className={isActive('/contact') ? 'text-[#1AD329]' : linkTextColor}
        >
          {t('contact')}
        </Link>

        {/* LANGUAGE */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(prev => !prev)}
            className="flex items-center gap-1.25 cursor-pointer"
          >
            <ReactCountryFlag svg countryCode={currentCountry} style={{ width: 24, height: 24 }} />
            <span>{currentLang}</span>
            <Image
              src="/images/arrowdown.png"
              alt="Arrow Down"
              width={24}
              height={24}
              className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md z-50">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    router.replace(pathname, { locale: lang.code })
                    closeAllDropdowns()
                  }}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-black cursor-pointer"
                >
                  <ReactCountryFlag svg countryCode={lang.country} style={{ width: 20, height: 20 }} />
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <button className={`h-12 rounded-xl px-6 ${buttonBgColor} cursor-pointer`}>
        <p className={`font-bold ${buttonTextColor}`}>{tBtn('explore')}</p>
      </button>
    </div>
  )
}

export default DesktopNavbar