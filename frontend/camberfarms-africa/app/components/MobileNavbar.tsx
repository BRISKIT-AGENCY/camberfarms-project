'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import ReactCountryFlag from 'react-country-flag'

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

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isOurWorkOpen, setIsOurWorkOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const anyAccordionOpen = isAboutOpen || isOurWorkOpen || isResourcesOpen





  const { t } = useTranslation('nav')
  const { t: tBtn } = useTranslation('buttons')

  const currentLang = LANGUAGES.find(l => l.code === i18n.language)?.label ?? 'ENG'


  const changeLanguage = (lng: 'en' | 'fr') => {
    i18n.changeLanguage(lng)
    setIsLangOpen(false)
  }

  return (
    <div className="relative xl:hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between py-5">
        <img src="/images/logo2.png" alt="Logo" width={80} height={50} />

        <button
          className="flex flex-col justify-between h-6 w-8"
          onClick={() => {
            setIsMenuOpen(prev => {
              if (prev) {
                setIsAboutOpen(false)
                setIsOurWorkOpen(false)
                setIsResourcesOpen(false)
              }
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

          <div className="flex flex-col w-full">
            <button
              onClick={() => setIsAboutOpen(prev => !prev)}
              className="flex justify-between w-full items-center"
            >
              <Link href='/about' className={`transition-colors ${isAboutOpen ? 'text-[#1AD329]' : anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}>{t('about')}</Link>
              <Image
                src="/images/arrowdown.png"
                alt="Arrow Down"
                width={24}
                height={24}
                className={`transition-transform ${isAboutOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isAboutOpen && (
              <div className="mt-2 flex flex-col gap-2 text-sm text-gray-700">
                <hr className='border-[0.5px] border-[#1AD329]' />
                <Link href="/about/#mission" onClick={() => setIsMenuOpen(false)} className='mt-3'>
                  Vision & Mission
                </Link>
                <Link href="/about/theory-of-change" onClick={() => setIsMenuOpen(false)}>
                  Theory of Change
                </Link>
                <Link href="/about/#values" onClick={() => setIsMenuOpen(false)}>
                  Values
                </Link>
              </div>
            )}
          </div>


          <div className="flex flex-col w-full mt-6">
            <button
              onClick={() => setIsOurWorkOpen(prev => !prev)}
              className="flex justify-between w-full items-center"
            >
              <Link href='/our-works' className={`transition-colors ${isOurWorkOpen ? 'text-[#1AD329]' : anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}>{t('ourWork')}</Link>
              <Image
                src="/images/arrowdown.png"
                alt="Arrow Down"
                width={24}
                height={24}
                className={`transition-transform ${isOurWorkOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOurWorkOpen && (
              <div className="mt-2 flex flex-col gap-2 text-sm text-gray-700">
                <hr className="border-[0.5px] border-[#1AD329]" />

                <Link href="/our-works/membership" onClick={() => setIsMenuOpen(false)} className="mt-3">
                  Membership
                </Link>

                <Link href="/our-works/farm-fund" onClick={() => setIsMenuOpen(false)}>
                  Farm Fund
                </Link>

                <Link href="/our-works/exportation" onClick={() => setIsMenuOpen(false)}>
                  Exportation
                </Link>

                <Link href="/our-works/technology" onClick={() => setIsMenuOpen(false)}>
                  Our Technology
                </Link>

                <Link href="/our-works/process" onClick={() => setIsMenuOpen(false)}>
                  Our Process
                </Link>
              </div>
            )}
          </div>


          <Link href="/blog" className={`mt-6 ${anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}>{t('blog')}</Link>

          <div className="flex flex-col w-full mt-6">
            <button
              onClick={() => setIsResourcesOpen(prev => !prev)}
              className="flex justify-between w-full items-center"
            >
              <span className={`transition-colors ${isResourcesOpen ? 'text-[#1AD329]' : anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}>{t('resources')}</span>
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

                <Link
                  href="/resources/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-3"
                >
                  Gallery
                </Link>

                <Link
                  href="/resources/faq"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>


          <Link href="/contact" className={`mt-6 ${anyAccordionOpen ? 'text-[#808080]' : 'text-black'}`}>{t('contact')}</Link>

          <div className="relative mt-6">
            <button
              onClick={() => setIsLangOpen(prev => !prev)}
              className="flex items-center gap-1.25 w-full"
            >
              <ReactCountryFlag
                svg
                countryCode={
                  LANGUAGES.find(l => l.code === i18n.language)?.country || 'US'
                }
                style={{ width: '24px', height: '24px' }}
              />

              <span>{currentLang}</span>
              <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
            </button>

            {isLangOpen && (
              <div className="mt-2 bg-white border rounded-lg shadow-md">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code)
                      setIsLangOpen(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                  >
                    <ReactCountryFlag
                      svg
                      countryCode={lang.country}
                      style={{ width: '20px', height: '20px' }}
                    />

                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>


          <button className={`h-12 rounded-xl bg-[#1AD329] px-6 `}>
            <p className="text-white font-bold">{tBtn('explore')}</p>
          </button>
        </div>
      )}
    </div>
  )
}

export default MobileNavbar
