'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Review = () => {
  const { t } = useTranslation('whatWeDo') // currently unused

  return (
    <div className="h-fit  w-full px-3 lg:px-25 lg:py-42.75 py-21 bg-[#1AD329]">
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="font-bold text-[24px] md:text-[46px] text-white">
          What Our Client Says
        </h1>

        {/* GRID WRAPPER */}
        <div className="md:mt-25 mt-12.5 flex gap-9">

          {/* LEFT COLUMN */}
          <div className="w-1/2 flex flex-col gap-7.25">
            <div className="w-full border md:border-[3px] rounded-3xl border-[#FFCC00] md:p-12.5 p-3.75">
              <div className="flex justify-end">
                <Image
                  src="/images/star.png"
                  alt="star"
                  width={60}
                  height={60}
                  className="w-11 h-11 md:w-15 md:h-15"
                />
              </div>

              <h2 className="mt-6 md:mt-9 md:text-[24px] text-[12px] font-medium text-white">
                “Partnering with Camberfarm has changed how we grow and sell our crops.
                We now produce better yields and reach buyers we never thought possible.”
              </h2>

              <div className="flex items-center gap-4 md:mt-7.5 mt-[7.5px]">
                <img
                  src="/images/client.png"
                  alt="image of client"
                  className="md:w-20 md:h-20 w-10 h-10"
                />
                <div className="text-white">
                  <p className="md:text-[24px] text-[12px]">Amina Yusuf</p>
                  <p className="text-[8px] md:text-[18px]">
                    Farmer, Kaduna Region
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full border md:border-[3px] rounded-3xl border-[#FFCC00] md:p-12.5 p-3.75">
              <div className="flex justify-end">
                <Image
                  src="/images/star.png"
                  alt="star"
                  width={60}
                  height={60}
                  className="w-11 h-11 md:w-15 md:h-15"
                />
              </div>

              <h2 className="mt-6 md:mt-9 md:text-[24px] text-[12px] font-medium text-white">
                “Partnering with Camberfarm has changed how we grow and sell our crops.
                We now produce better yields and reach buyers we never thought possible.”
              </h2>

              <div className="flex items-center gap-4 md:mt-7.5 mt-[7.5px]">
                <img
                  src="/images/client.png"
                  alt="image of client"
                  className="md:w-20 md:h-20 w-10 h-10"
                />
                <div className="text-white">
                  <p className="md:text-[24px] text-[12px]">Amina Yusuf</p>
                  <p className="text-[8px] md:text-[18px]">
                    Farmer, Kaduna Region
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-1/2 flex flex-col gap-7.25 mt-11.25">
            <div className="w-full border md:border-[3px] rounded-3xl border-[#FFCC00] md:p-12.5 p-3.75">
              <div className="flex justify-end">
                <Image
                  src="/images/star.png"
                  alt="star"
                  width={60}
                  height={60}
                  className="w-11 h-11 md:w-15 md:h-15"
                />
              </div>

              <h2 className="mt-6 md:mt-9 md:text-[24px] text-[12px] font-medium text-white">
                “Partnering with Camberfarm has changed how we grow and sell our crops.
                We now produce better yields and reach buyers we never thought possible.”
              </h2>

              <div className="flex items-center gap-4 md:mt-7.5 mt-[7.5px]">
                <img
                  src="/images/client.png"
                  alt="image of client"
                  className="md:w-20 md:h-20 w-10 h-10"
                />
                <div className="text-white">
                  <p className="md:text-[24px] text-[12px]">Amina Yusuf</p>
                  <p className="text-[8px] md:text-[18px]">
                    Farmer, Kaduna Region
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full border md:border-[3px] rounded-3xl border-[#FFCC00] md:p-12.5 p-3.75">
              <div className="flex justify-end">
                <Image
                  src="/images/star.png"
                  alt="star"
                  width={60}
                  height={60}
                  className="w-11 h-11 md:w-15 md:h-15"
                />
              </div>

              <h2 className="mt-6 md:mt-9 md:text-[24px] text-[12px] font-medium text-white">
                “Partnering with Camberfarm has changed how we grow and sell our crops.
                We now produce better yields and reach buyers we never thought possible.”
              </h2>

              <div className="flex items-center gap-4 md:mt-7.5 mt-[7.5px]">
                <img
                  src="/images/client.png"
                  alt="image of client"
                  className="md:w-20 md:h-20 w-10 h-10"
                />
                <div className="text-white">
                  <p className="md:text-[24px] text-[12px]">Amina Yusuf</p>
                  <p className="text-[8px] md:text-[18px]">
                    Farmer, Kaduna Region
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div> 
      </div>
    </div>
  )
}

export default Review
