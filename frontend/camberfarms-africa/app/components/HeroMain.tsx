'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const HeroMain = () => {
  const { t } = useTranslation('hero')

  return (
    <div className="mt-40.75 mx-5 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-52.5 flex flex-col items-center text-center">
      <h1 className="text-white text-2xl md:text-6xl font-bold md:leading-22.5">
        {t('title')}
      </h1>

      <p className="text-white text-[14px] md:text-[22px] mt-4.5 font-medium">
        {t('subtitle')}
      </p>

      <Link href="/our-works" className="mt-12.5 md:h-16 md:w-60 bg-[#1AD329] p-2.5 md:p-5 rounded-[100px]">
        <p className="text-white font-bold md:font-extrabold text-[14px] md:text-[18px]">
          {t('cta')}
        </p>
      </Link>
    </div>
  )
}

export default HeroMain
