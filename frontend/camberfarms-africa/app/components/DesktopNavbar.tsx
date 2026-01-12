'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { usePathname } from 'next/navigation'
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


  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`)

  const handleDropdown = (dropdown: 'about' | 'ourWork' | 'resources') => {
    // close all other dropdowns
    if (dropdown !== 'about') setIsAboutOpen(false)
    if (dropdown !== 'ourWork') setIsOurWorkOpen(false)
    if (dropdown !== 'resources') setIsResourcesOpen(false)

    // toggle the clicked dropdown
    if (dropdown === 'about') setIsAboutOpen(prev => !prev)
    if (dropdown === 'ourWork') setIsOurWorkOpen(prev => !prev)
    if (dropdown === 'resources') setIsResourcesOpen(prev => !prev)
  }



  const { t } = useTranslation('nav')
  const { t: tBtn } = useTranslation('buttons')

  const currentLang =
    LANGUAGES.find(l => l.code === i18n.resolvedLanguage)?.label ?? 'ENG'

  return (
    <div className="items-center justify-between hidden xl:flex">
      {/* LOGO */}
      <Image src={logoSrc} alt="Logo" width={103.35} height={60} />

      {/* NAV LINKS */}
      <div className={`text-[18px] flex gap-5 font-normal ${linkTextColor}`}>
        <Link href="/" className={isActive('/') ? 'text-[#1AD329]' : linkTextColor}>{t('home')}</Link>

        <div className="relative">
          <button
            onClick={() => handleDropdown('about')}
            className={`flex items-center gap-1 ${linkTextColor}`}
          >
            <span className={isActive('/about') ? 'text-[#1AD329]' : linkTextColor}>{t('about')}</span>
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
                onClick={() => setIsAboutOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-t-xl"
              >
                Vision & Mission
              </Link>

              <Link
                href="/about/theory-of-change"
                onClick={() => setIsAboutOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100"
              >
                Theory of Change
              </Link>

              <Link
                href="/about/values"
                onClick={() => setIsAboutOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-b-xl"
              >
                Values
              </Link>
            </div>
          )}
        </div>


        <div className="relative">
          <button
            onClick={() => handleDropdown('ourWork')}
            className={`flex items-center gap-1 ${linkTextColor}`}
          >
            <span className={isActive('/our-works') ? 'text-[#1AD329]' : linkTextColor}>{t('ourWork')}</span>
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
              <Link
                href="/our-works/membership"
                onClick={() => setIsOurWorkOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-t-xl"
              >
                Membership
              </Link>

              <Link
                href="/our-works/farm-fund"
                onClick={() => setIsOurWorkOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100"
              >
                Farm Fund
              </Link>

              <Link
                href="/our-works/exportation"
                onClick={() => setIsOurWorkOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100"
              >
                Exportation
              </Link>

              <Link
                href="/our-works/technology"
                onClick={() => setIsOurWorkOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100"
              >
                Our Technology
              </Link>

              <Link
                href="/our-works/process"
                onClick={() => setIsOurWorkOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-b-xl"
              >
                Our Process
              </Link>
            </div>
          )}
        </div>


        <Link href="/blog" className={isActive('/blog') ? 'text-[#1AD329]' : linkTextColor}>{t('blog')}</Link>

        <div className="relative">
          <button
            onClick={() => handleDropdown('resources')}
            className={`flex items-center gap-1 ${linkTextColor}`}
          >
            <span className={isActive('/resources') ? 'text-[#1AD329]' : linkTextColor}>{t('resources')}</span>
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
                onClick={() => setIsResourcesOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-t-xl"
              >
                Gallery
              </Link>

              <Link
                href="/resources/faq"
                onClick={() => setIsResourcesOpen(false)}
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-b-xl"
              >
                FAQ
              </Link>
            </div>
          )}
        </div>


        <Link href="/contact" className={isActive('/contact') ? 'text-[#1AD329]' : linkTextColor}>{t('contact')}</Link>

        {/* 🌍 Language dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(prev => !prev)}
            className="flex items-center gap-1.25"
          >
            <ReactCountryFlag
              svg
              countryCode={
                LANGUAGES.find(l => l.code === i18n.language)?.country || 'US'
              }
              style={{ width: '24px', height: '24px' }}
            />
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
            <div className="absolute mt-2 bg-white border rounded-lg shadow-md right-0 z-100">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code)
                    setIsLangOpen(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-black"
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
      </div>

      {/* CTA BUTTON */}
      <button className={`h-12 rounded-xl px-6 ${buttonBgColor}`}>
        <p className={`font-bold ${buttonTextColor}`}>
          {tBtn('explore')}
        </p>
      </button>
    </div>
  )
}

export default DesktopNavbar
