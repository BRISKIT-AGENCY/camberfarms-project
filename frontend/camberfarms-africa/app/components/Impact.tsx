'use client'

import Link from 'next/link';
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ImpactProps {
  bgColor?: string;
  pColor?: string;
  hColor: string;
  p2Color?: string;
  border?: string; // optional prop for border color
}

const Impact: React.FC<ImpactProps> = ({
  bgColor = "#FFFFFF",
  pColor = '#808080',
  hColor,
  p2Color,
  border = 'border-[#FF741F]'
}) => {
  const { t } = useTranslation('impact') // namespace "impact"

  const stats = [
    { value: '2000+', label: t('stat1') },
    { value: '2000+', label: t('stat2') },
    { value: '2000+', label: t('stat3') },
    { value: '2000+', label: t('stat4') }
  ]

  return (
    <div
      className="w-full lg:h-254.25 h-fit lg:py-46 lg:px-25 px-6 py-29.5"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full h-full">
        <h1 className="font-bold text-[24px] md:text-[46px]" style={{ color: hColor }}>
          {t('title')}
        </h1>

        <p className="font-medium text-[14px] md:text-[18px] mt-2" style={{ color: pColor }}>
          {t('description')}
        </p>

        <div className="flex lg:flex-row justify-between flex-col px-[29.5px] lg:px-0 lg:mt-25 mt-12.5 gap-15 lg:gap-0">
          {stats.map((stat, idx) => (
            <div key={idx} className={`border-l-2 ${border} pl-9`}>
              <h2 className="font-bold text-[46px] md:text-[50px] text-[#1AD329]" style={{ color: hColor }}>
                {stat.value}
              </h2>
              <p className="font-medium text-[14px] md:text-[18px] mt-2" style={{ color: p2Color }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-25 w-full bg-[#FF741F] flex justify-center items-center h-25 rounded-3xl">
          <Link href='/contact' className="bg-white flex justify-center items-center text-[#1AD329] rounded-[100px] text-[14px] md:text-[24px] h-[60%] lg:w-75 w-[70%]">
            {t('button')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Impact
