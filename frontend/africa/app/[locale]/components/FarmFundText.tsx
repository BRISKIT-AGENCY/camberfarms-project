import React from 'react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

const FarmFundText = async() => {
  const t= await getTranslations('FarmFundText')
  return (
    <div className='mt-25 pb-33.75 md:px-25 px-6'>
      <h1 className='md:text-[46px] text-[24px] font-bold'>{t('title')}</h1>
      <img src="/images/farmfund-hero.png" alt={t('imgAlt')} className='w-full h-108 object-center hidden md:block mt-6' />
      <img src="/images/farmfund-hero-bg.png" alt={t('imgAlt')} className='w-full h-75  md:hidden block mt-2' />
      <p className='mt-12.5 md:text-[18px] text-[14px]'>{t('p1')}</p>
      <p className='md:text-[18px] text-[14px]'>{t('p2')}</p>
      <p className='md:text-[18px] text-[14px]'>{t('p3')}</p>
      <p className='md:text-[18px] text-[14px]'>{t('p4')}</p>
      <ul className='list-disc mt-6 md:text-[18px] text-[14px]'>
        <li>{t('l1')}</li>
        <li>{t('l2')}</li>
        <li>{t('l3')}</li>
        <li>{t('l4')}</li>
      </ul>
      <p className='mt-6 md:text-[18px] text-[14px]'>{t('p5')}</p>
      <Link href='/farm-fund' className='mt-12.5 flex'>
        <p className='bg-[#1AD329] text-white py-2.75 px-11.25 rounded-[100px] text-[18px]'>{t('button')}</p>
      </Link>
    </div>
  )
}

export default FarmFundText