'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTiktok, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
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

            {/* Address with home icon */}
            <div className="flex items-start gap-2">
              <FontAwesomeIcon icon={faHome} className="text-[20px] mt-1" />
              <p>
                Graceland Plaza, by Mobil Junction <br />
                along Nkpolu-Rumuigbo east west road, <br />
                Port Harcourt Rivers State, Nigeria.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Image src="/images/email.png" alt={t('Footer.emailAlt')} width={24} height={24} />
              <a href="mailto:camberwallresorts@gmail.com" className="hover:underline">
                camberwallresorts@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 mt-3 md:mt-0">
              <Image src="/images/phone.png" alt={t('Footer.phoneAlt')} width={24} height={24} />
              <a href="tel:+2348062741841" className="hover:underline">+234 806 274 1841</a>
              <span>,</span>
              <a href="tel:+2348133486885" className="hover:underline">+234 813 348 6885</a>
            </div>

            <div className='flex gap-3 mt-4 md:mt-0'>
              <a
                href="https://www.instagram.com/camberfarms?igsh=Y21ucmtyZWc3YTJx&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[26.5px] h-[26.5px] flex items-center justify-center rounded-full bg-green-600"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-white text-[14px]" />
              </a>

              <a
                href="https://www.tiktok.com/@camber.exports?_r=1&_t=ZS-931qhot2Dez"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[26.5px] h-[26.5px] flex items-center justify-center rounded-full bg-green-600"
              >
                <FontAwesomeIcon icon={faTiktok} className="text-white text-[14px]" />
              </a>

              <a
                href="https://www.facebook.com/share/17uHp1Yiyx/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[26.5px] h-[26.5px] flex items-center justify-center rounded-full bg-green-600"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-white text-[14px]" />
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
