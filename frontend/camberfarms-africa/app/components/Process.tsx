'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

type ProcessProps = {
  py?: string
  mdPy?: string
  px?: string
  mdPx?: string
  showHeader?: boolean
  mdMt?: string
  mt?: string
}

const Process = ({
  py = 'py-11.25',
  mdPy = 'md:py-43.25',
  px = 'px-6',
  mdPx = 'md:px-25',
  mdMt = 'md:mt-20',
  mt = 'mt-0',
  showHeader = true
}: ProcessProps) => {
  const { t } = useTranslation('process')

  // ✅ TypeScript-safe cast
  const steps = t('steps', { returnObjects: true }) as string[]

  return (
    <div
      className={`
        h-230.25 md:h-322 w-full
        ${px} ${mdPx}
        ${py} ${mdPy}
      `}
    >
      <div className="h-full w-full">
        {showHeader && (
          <div>
            <h1 className="font-bold text-[24px] md:text-[46px]">
              {t('title')}
            </h1>

            <p className="font-medium text-[14px] md:text-[18px] mt-2">
              {t('description')}
            </p>
          </div>
        )}

        <div className={`${mdMt} ${mt}`}>
          {steps.map((step, idx) => (
            <div key={idx} className={idx !== 0 ? 'mt-12.5' : ''}>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-[18px] md:text-[24px]">
                  {step}
                </h2>

                <Image
                  src="/images/arrowdown.png"
                  alt="process step"
                  width={44}
                  height={44}
                  className="w-6 h-6 sm:w-11 sm:h-11"
                />
              </div>

              <hr className="border-[#E6E6E6] mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Process
