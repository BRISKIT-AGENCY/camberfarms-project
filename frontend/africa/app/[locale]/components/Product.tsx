'use client'
import React, { use } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'


const PRODUCT_KEYS = {
  membership_title: 'membership_title',
  membership_description: 'membership_description',
  membership_button: 'membership_button',
  farmFund_title: 'farmFund_title',
  farmFund_description: 'farmFund_description',
  farmFund_button: 'farmFund_button',
  export_title: 'export_title',
  export_description: 'export_description',
  export_button: 'export_button'
} as const

type ProductKey = typeof PRODUCT_KEYS[keyof typeof PRODUCT_KEYS]

type ProductProps = {
  titleKey: ProductKey
  descriptionKey: ProductKey
  buttonTextKey?: ProductKey
  imageSrc: string
  imageAlt?: string

  link: string
}

const Products = ({
  titleKey,
  descriptionKey,
  buttonTextKey,
  imageSrc,
  imageAlt = 'section image',

  link
}: ProductProps) => {
  const t=useTranslations('Products');

  return (
    <div className="h-fit w-full">
      <div className="py-20 px-6 xl:py-50.5 xl:px-25 w-full h-full flex flex-col xl:flex-row xl:justify-between items-center gap-15.75">

        {/* Text Content */}
        <div className="xl:w-[50%] flex flex-col items-center xl:items-start">
          <div className="flex items-center gap-4">
            <Image
              src="/images/arrow-right.png"
              alt="right arrow"
              width={32}
              height={32}
              className="w-4 h-4 md:w-6 md:h-6 xl:w-8 xl:h-8"
            />
            <h2 className="text-2xl font-bold md:text-[48px] md:font-semibold">
              {t(titleKey)}
            </h2>
          </div>

          <p className="mt-6 text-[14px] md:text-[28px]">
            {t(descriptionKey)}
          </p>

          {buttonTextKey && (
            <Link
              href={link}
              className='mt-12.5'
            >
              <p className='bg-[#1AD329] text-white py-2.75 px-6 rounded-[100px] text-[18px]'>
                {t(buttonTextKey)}
              </p>
            </Link>
          )}
        </div>

        {/* Image */}
        <div className="h-full xl:w-[50%]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Products