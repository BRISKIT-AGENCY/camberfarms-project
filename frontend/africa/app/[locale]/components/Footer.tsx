'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations() // initialize translation hook

  return (
    <div className='h-164.25 md:h-94.5 bg-[#808080] w-full flex items-center py-13 px-6 lg:px-25 lg:py-16.5'>
      <div className=' w-full h-full flex flex-col items-center justify-center text-white'>
        <div className='flex flex-col md:flex-row justify-between mb-8 w-full'>
          <Link href="/">
            <Image src="/images/logo.png" alt="CamberFarm logo" width={130} height={75} />
          </Link>

          <hr className='w-full bg-white md:hidden border' />

          <div className='mt-3 md:mt-0 flex flex-col text-[14px] md:text-[16px]'>
            <p className='font-bold text-[16px] md:text-[18px]'>{t('Footer.information')}</p>
            <Link href="/about" className='mt-4 md:mt-6'>{t('Footer.aboutUs')}</Link>
            <Link href="/#impact" className='mt-3 md:hidden'>{t('Footer.impact')}</Link>
            <Link href="/news" className='mt-3'>{t('Footer.news')}</Link>
          </div>

          <div className='flex flex-col text-[14px] md:text-[16px] mt-6 md:mt-0'>
            <p className='font-bold text-[16px] md:text-[18px]'>{t('Footer.helpfulLinks')}</p>
            <Link href="/privacy" className='mt-4 md:mt-6'>{t('Footer.privacy')}</Link>
          </div>

          <div className='flex flex-col md:gap-6 text-[14px] md:text-[16px] mt-6 md:mt-0'>
            <p className='font-bold text-[16px] md:text-[18px]'>{t('Footer.contactUs')}</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Image src="/images/email.png" alt={t('Footer.emailAlt')} width={24} height={24} />
              <a href="mailto:camberfarmafrica@gmail.com" className="hover:underline">camberfarmafrica@gmail.com</a>
            </div>

            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Image src="/images/phone.png" alt={t('Footer.phoneAlt')} width={24} height={24} />
              <a href="tel:+234909746104" className="hover:underline">+234 90 974 6104</a>
              <span>,</span>
              <a href="tel:+2348109748304" className="hover:underline">+234 810 974 8304</a>
            </div>

            <div className='flex gap-3 mt-4 md:mt-0'>
              <a href="https://www.instagram.com/camberfarms?igsh=Y21ucmtyZWc3YTJx&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <Image src="/images/instagram.png" alt="instagram icon" width={26.5} height={26.5} />
              </a>
              <a href="">
                <Image src="/images/twitter.png" alt="twitter icon" width={26.5} height={26.5} />
              </a>
              <a href="https://www.facebook.com/share/17uHp1Yiyx/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <Image src="/images/facebook.png" alt="facebook icon" width={26.5} height={26.5} />
              </a>
              <a href="">
                <Image src="/images/linkedin.png" alt="linkedin icon" width={26.5} height={26.5} />
              </a>
            </div>
          </div>
        </div>
        <p className='text-[14px]'>{t('Footer.copyright')}</p>
      </div>
    </div>
  )
}

export default Footer
