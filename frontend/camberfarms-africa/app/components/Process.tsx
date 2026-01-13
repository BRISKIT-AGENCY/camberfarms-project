'use client'

import React, { useState } from 'react'

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
  showGreenH1?: boolean
  showImage?: boolean
}

const Process = ({
  py = 'py-11.25',
  mdPy = 'md:py-43.25',
  px = 'px-6',
  mdPx = 'md:px-25',
  mdMt = 'md:mt-20',
  mt = 'mt-0',
  showHeader = true,
  showGreenH1 = true,  // 👈 default
  showImage = true
}: ProcessProps) => {
  const { t } = useTranslation('process')

  // ✅ TypeScript-safe cast
  const stepsRaw = t('steps', { returnObjects: true })

  const steps: string[] = Array.isArray(stepsRaw)
    ? stepsRaw
    : []


  const [openIndex, setOpenIndex] = useState<number | null>(null)


  const stepDescriptions: string[] = [
    'We register farmers into our platform, verify their identities, and collect essential information to ensure proper access to services.',
    'We map farmlands using geo-location tools to understand land size, location, and farming conditions.',
    'We distribute quality seeds, fertilizers, and other farm inputs to farmers at the right time.',
    'We continuously monitor crop growth and field conditions to ensure optimal productivity.',
    'We support farmers during harvest to reduce losses and improve yield quality.',
    'We manage harvested produce efficiently through proper storage, tracking, and logistics.'
  ]


  return (
    <div
      className={`
        h-fit  w-full
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
          {steps.map((step, idx) => {
            const isOpen = openIndex === idx

            return (
              <div key={idx} className={idx !== 0 ? 'mt-12.5' : ''}>
                <div className="flex items-center justify-between">
                  <h2
                    className={`font-semibold text-[18px] md:text-[24px] ${!showGreenH1 && isOpen ? 'text-[#1AD329]' : ''
                      }`}
                  >
                    {step}
                  </h2>

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="transition-transform"
                    aria-label="Toggle step details"
                  >
                    <Image
                      src="/images/arrowdown.png"
                      alt="toggle"
                      width={44}
                      height={44}
                      className={`w-6 h-6 sm:w-11 cursor-pointer sm:h-11 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                </div>

                {/* Dropdown content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'h-fit opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                >
                  <hr className='border border-[#E6E6E6]' />
                  {/* Green H1 */}
                  {showGreenH1 && (
                    <h1 className="font-semibold text-[18px] md:text-[24px] text-[#1AD329] mt-16.75">
                      {step}
                    </h1>
                  )}

                  {/* Step description */}
                    <p className={`text-[14px] md:text-[16px] text-gray-600 max-w-3xl mt-4`}>
                    {stepDescriptions[idx]}
                  </p>

                  {/* Onboarding image */}
                  {showImage && (
                    <img
                      src="/images/onboarding.png"
                      alt="educating farmers"
                      className="w-full md:h-125 h-75 mt-3"
                    />
                  )}

                </div>

                <hr className="border-[#E6E6E6] mt-4" />
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Process
