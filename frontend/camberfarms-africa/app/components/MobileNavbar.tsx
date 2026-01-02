'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

const LANGUAGES = [
  { label: 'ENG', code: 'en', flag: '/images/flag.png' },
  { label: 'FRA', code: 'fr', flag: '/images/flag.png' }
]


const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

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
            setIsMenuOpen(prev => !prev)
            setIsLangOpen(false)
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

          <div className="flex justify-between w-full items-center">
            <Link href="/about">{t('about')}</Link>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </div>

          <div className="flex justify-between w-full items-center">
            <Link href="/our-work">{t('ourWork')}</Link>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </div>

          <Link href="/blog">{t('blog')}</Link>

          <div className="flex justify-between w-full items-center">
            <Link href="/resources">{t('resources')}</Link>
            <Image src="/images/arrowdown.png" alt="Arrow Down" width={24} height={24} />
          </div>

          <Link href="/contact">{t('contact')}</Link>

          <div className="relative">
        <button
          onClick={() => setIsLangOpen(prev => !prev)}
          className="flex items-center gap-1.25 w-full"
        >
          <Image src="/images/flag.png" alt="flag" width={24} height={24} />
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
                <Image src={lang.flag} alt="flag" width={20} height={20} />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>


          <button className="h-12 rounded-xl bg-[#1AD329] px-6">
            <p className="text-white font-bold">{tBtn('explore')}</p>
          </button>
        </div>
      )}
    </div>
  )
}

export default MobileNavbar
