'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const WhoWeAre = () => {
  const { t } = useTranslation('whoWeAre') // namespace "whoWeAre"

  return (
    <div className='h-118.75 md:h-221.5 w-full md:-25 md:py-41.25 px-6 py-15.5'>
      <div className='w-full h-full '>
        <h1 className='md:text-[48px] text-[32px] font-bold'>
          {t('title')}
        </h1>

        <p className='md:text-[36px] text-[16px] md:mt-12.5 mt-7'>
          <span className='md:text-[100px] text-[50px] text-[#FF741F] leading-0'>“</span>
          {t('description')}
        </p>

        <button className='flex mt-6 text-[#1AD329]'>
          <p className='md:text-[24px] text-[16px]'>
            {t('buttonText')}
          </p>
          <Image
            src="/images/greenarrow.png"
            alt="arrow right"
            width={24}
            height={24}
            className="ml-2"
          />
        </button>
      </div>
    </div>
  )
}

export default WhoWeAre
