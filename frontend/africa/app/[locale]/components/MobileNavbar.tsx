'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import ReactCountryFlag from 'react-country-flag'

const LANGUAGES = [
  { label: 'United States', code: 'en', country: 'US' },
  { label: 'France', code: 'fr', country: 'FR' },
  { label: 'Россия', code: 'ru', country: 'RU' },
  { label: 'المملكة العربية السعودية', code: 'ar', country: 'SA' },
  { label: '中国', code: 'zh', country: 'CN' },
  { label: 'Nederland', code: 'nl', country: 'NL' },
  { label: 'Deutschland', code: 'de', country: 'DE' },
  { label: 'Italia', code: 'it', country: 'IT' },
  { label: 'Portugal', code: 'pt', country: 'PT' },
  { label: 'España', code: 'es', country: 'ES' }
]

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isOurWorkOpen, setIsOurWorkOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  const anyAccordionOpen = isAboutOpen || isOurWorkOpen || isResourcesOpen

  const t = useTranslations('Nav')
  const tBtn = useTranslations('Button')

  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const currentLang =
    LANGUAGES.find(l => l.code === locale)?.label ?? 'ENG'

  const currentCountry =
    LANGUAGES.find(l => l.code === locale)?.country ?? 'US'

  /** ✅ Close everything */
  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsLangOpen(false)
    setIsAboutOpen(false)
    setIsOurWorkOpen(false)
    setIsResourcesOpen(false)
  }

  return (
    <div className="relative xl:hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between py-5">
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/images/logo2.png"
            alt="Logo"
            width={80}
            height={50}
            priority
          />
        </Link>

        <button
          className="flex flex-col justify-between h-6 w-8 cursor-pointer"
          onClick={() => {
            setIsMenuOpen(prev => {
              if (prev) closeMenu()
              return !prev
            })
          }}
        >
          <Image
            src={isMenuOpen ? '/images/close.png' : '/images/hamburger.png'}
            alt="Menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-26.5 left-0 w-full bg-white p-4 flex flex-col gap-4 text-black z-50 rounded-b-xl shadow-lg">

          <Link
            href="/"
            onClick={closeMenu}
            className={`mt-6 ${anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}
          >
            {t('home')}
          </Link>

          {/* ABOUT */}
          <div className="flex flex-col w-full mt-6">
            <button
              onClick={() => setIsAboutOpen(prev => !prev)}
              className="flex justify-between w-full items-center"
            >
              <Link
                href="/about"
                onClick={closeMenu}
                className={`transition-colors ${isAboutOpen
                  ? 'text-[#1AD329]'
                  : anyAccordionOpen
                    ? 'text-[#808080]'
                    : 'text-black'
                  }`}
              >
                {t('about')}
              </Link>

              <Image
                src="/images/arrowdown.png"
                alt="Arrow Down"
                width={24}
                height={24}
                className={`transition-transform cursor-pointer ${isAboutOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isAboutOpen && (
              <div className="mt-2 flex flex-col gap-2 text-sm text-gray-700">
                <hr className="border-[0.5px] border-[#1AD329]" />
                <Link href="/about/#mission" onClick={closeMenu} className="mt-3">
                  Vision & Mission
                </Link>
                <Link href="/about" onClick={closeMenu}>
                  Theory of Change
                </Link>
                <Link href="/about/#values" onClick={closeMenu}>
                  Values
                </Link>
              </div>
            )}
          </div>

          {/* OUR WORK */}
          <div className="flex flex-col w-full mt-6">
            <button
              onClick={() => setIsOurWorkOpen(prev => !prev)}
              className="flex justify-between w-full items-center"
            >
              <Link
                href="/our-works"
                onClick={closeMenu}
                className={`transition-colors ${isOurWorkOpen
                  ? 'text-[#1AD329]'
                  : anyAccordionOpen
                    ? 'text-[#808080]'
                    : 'text-black'
                  }`}
              >
                {t('ourWork')}
              </Link>

              <Image
                src="/images/arrowdown.png"
                alt="Arrow Down"
                width={24}
                height={24}
                className={`transition-transform cursor-pointer ${isOurWorkOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOurWorkOpen && (
              <div className="mt-2 flex flex-col gap-2 text-sm text-gray-700">
                <hr className="border-[0.5px] border-[#1AD329]" />
                <Link href="/our-works/membership" onClick={closeMenu} className="mt-3">
                  Membership
                </Link>
                <Link href="/our-works/farm-fund" onClick={closeMenu}>
                  Farm Fund
                </Link>
                <Link href="/our-works/exportation" onClick={closeMenu}>
                  Exportation
                </Link>
                <Link href="/our-works/technology" onClick={closeMenu}>
                  Our Technology
                </Link>
                <Link href="/our-works/process" onClick={closeMenu}>
                  Our Process
                </Link>
              </div>
            )}
          </div>

          {/* BLOG */}
          <Link
            href="/blog"
            onClick={closeMenu}
            className={`mt-6 ${anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}
          >
            {t('blog')}
          </Link>

          {/* RESOURCES */}
          <div className="flex flex-col w-full mt-6">
            <button
              onClick={() => setIsResourcesOpen(prev => !prev)}
              className="flex justify-between w-full items-center cursor-pointer"
            >
              <span
                className={`transition-colors ${isResourcesOpen
                  ? 'text-[#1AD329]'
                  : anyAccordionOpen
                    ? 'text-[#808080]'
                    : 'text-black'
                  }`}
              >
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
              <div className="mt-2 flex flex-col gap-2 text-sm text-gray-700">
                <hr className="border-[0.5px] border-[#1AD329]" />
                <Link href="" onClick={closeMenu} className="mt-3">
                  Gallery
                </Link>
                <Link href="" onClick={closeMenu}>
                  FAQ
                </Link>
              </div>
            )}
          </div>

          {/* CONTACT */}
          <Link
            href="/contact"
            onClick={closeMenu}
            className={`mt-6 ${anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}
          >
            {t('contact')}
          </Link>

          {/* LANGUAGE SWITCH */}
          <div className="relative mt-6">
            <button
              onClick={() => setIsLangOpen(prev => !prev)}
              className="flex items-center gap-1.25 w-full"
            >
              <ReactCountryFlag svg countryCode={currentCountry} style={{ width: 24, height: 24 }} />
              <span>{currentLang}</span>
              <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} className='cursor-pointer' />
            </button>

            {isLangOpen && (
              <div className="mt-2 bg-white border rounded-lg shadow-md cursor-pointer">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      router.replace(pathname, { locale: lang.code })
                      closeMenu()
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
                  >
                    <ReactCountryFlag svg countryCode={lang.country} style={{ width: 20, height: 20 }} />
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="https://camberexports.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="inline-flex items-center justify-center h-12 rounded-xl bg-[#1AD329] px-6 text-white font-bold"
          >
            {tBtn('explore')}
          </Link>
        </div>
      )}
    </div>
  )
}

export default MobileNavbar