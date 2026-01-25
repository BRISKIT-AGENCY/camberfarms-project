import Link from 'next/link'
import React from 'react'
import { getTranslations } from 'next-intl/server'

const ExportationText = async() => {
  const t=await getTranslations('exportationText')
  return (
    <div className='mt-25 pb-33.75 md:px-25 px-6'>
      <h1 className='md:text-[46px] text-[24px] font-bold'>{t('title')}</h1>
      <img src="/images/exportation-hero.png" alt={t('imgAlt')} className='w-full h-108 object-center hidden md:block mt-6' />
      <img src="/images/exportation-hero-sm.png" alt={t('imgAlt')} className='w-full h-75  md:hidden block mt-2' />
      <p className='mt-12.5 md:text-[18px] text-[14px]'>{t('p1')}</p>
      <p className='md:text-[18px] text-[14px]'>{t('p2')}</p>
      <p className='md:text-[18px] text-[14px]'>{t('p3')}</p>
      <p className='md:text-[18px] text-[14px]'>{t('p4')}</p>
      <p className='mt-6 md:text-[18px] text-[14px]'>{t('p5')}</p>
      <Link href='/'  className='mt-12.5 flex'>
        <p className='bg-[#1AD329] text-white py-2.75 px-6 rounded-[100px] text-[18px]'>{t('button')}</p>
      </Link>
    </div>
  )
}

export default ExportationText