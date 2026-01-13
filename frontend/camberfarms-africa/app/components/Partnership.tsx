'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Partnership = () => {
  const { t } = useTranslation('partnership') // namespace "partnership"

  // Array of logos if you want to map over them
  const logos = [
    '/images/nafdac.png',
    '/images/nafdac.png',
    '/images/nafdac.png',
    '/images/nafdac.png'
  ]

  return (
    <div className='h-fit sm:h-211.25 w-full lg:px-24 lg:py-52 py-25.5 px-6'>
      <div className='h-full w-full flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='font-bold text-[24px] sm:text-[46px] text-[#1AD329]'>
            {t('title')}
          </h1>
          <p className='font-medium text-[12px] sm:text-[18px]'>
            {t('description')}
          </p>
        </div>

        <div className='flex justify-evenly w-full mt-12.5 md:mt-25'>
          {logos.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={t('altText')}
              width={198}
              height={198}
              className='w-17.5 h-17.5 sm:w-32 sm:h-32 lg:w-49.5 lg:h-49.5'
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Partnership
