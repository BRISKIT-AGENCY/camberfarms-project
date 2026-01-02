'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

type ProductProps = {
  titleKey: string          // translation key for title
  descriptionKey: string    // translation key for description
  buttonTextKey?: string    // translation key for button text
  imageSrc: string
  imageAlt?: string
  onButtonClick?: () => void
  buttonClassName?: string
}

const Products = ({
  titleKey,
  descriptionKey,
  buttonTextKey,
  imageSrc,
  imageAlt = 'section image',
  onButtonClick,
  buttonClassName
}: ProductProps) => {
  const { t } = useTranslation('products') // namespace "products"

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
            <button
              onClick={onButtonClick}
              className={`mt-12.5 md:h-12.5 bg-[#1AD329] rounded-[100px] ${buttonClassName}`}
            >
              <p className="text-white font-bold text-[14px] px-4 py-2.5">
                {t(buttonTextKey)}
              </p>
            </button>
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
