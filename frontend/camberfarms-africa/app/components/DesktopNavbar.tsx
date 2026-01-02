'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

interface DesktopNavbarProps {
  logoSrc: string
  linkTextColor?: string
  buttonBgColor?: string
  buttonTextColor?: string
}

const LANGUAGES = [
  { label: 'ENG', code: 'en', flag: '/images/flag.png' },
  { label: 'FRA', code: 'fr', flag: '/images/flag.png' }
]

const DesktopNavbar = ({
  logoSrc,
  linkTextColor = 'text-white',
  buttonBgColor = 'bg-white',
  buttonTextColor = 'text-[#1AD329]'
}: DesktopNavbarProps) => {
  const [isLangOpen, setIsLangOpen] = useState(false)

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
        <Link href="/">{t('home')}</Link>

        <div className="flex items-center gap-1">
          <Link href="/about">{t('about')}</Link>
          <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
        </div>

        <div className="flex items-center gap-1">
          <Link href="/our-works">{t('ourWork')}</Link>
          <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
        </div>

        <Link href="/blog">{t('blog')}</Link>

        <div className="flex items-center gap-1">
          <Link href="/resources">{t('resources')}</Link>
          <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
        </div>

        <Link href="/contact">{t('contact')}</Link>

        {/* 🌍 Language dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(prev => !prev)}
            className="flex items-center gap-1.25"
          >
            <Image src="/images/flag.png" alt="flag" width={24} height={24} />
            <span>{currentLang}</span>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </button>

          {isLangOpen && (
            <div className="absolute mt-2 bg-white border rounded-lg shadow-md right-0">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code)
                    setIsLangOpen(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-black"
                >
                  <Image src={lang.flag} alt="flag" width={20} height={20} />
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
