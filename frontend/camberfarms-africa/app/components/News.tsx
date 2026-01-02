'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

type NewsProps = {
  header?: string
}

const News = ({ header }: NewsProps) => {
  const { t } = useTranslation('news') // namespace: "news"
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const newsData = [
    {
      id: 1,
      image: '/images/news1.png',
      title: t('post1.title'),
      description: t('post1.description'),
      date: t('post1.date')
    },
    {
      id: 2,
      image: '/images/news2.png',
      title: t('post2.title'),
      description: t('post2.description'),
      date: t('post2.date')
    },
    {
      id: 3,
      image: '/images/news3.png',
      title: t('post3.title'),
      description: t('post3.description'),
      date: t('post3.date')
    }
  ]

  const handleScroll = () => {
    if (!carouselRef.current) return
    const scrollLeft = carouselRef.current.scrollLeft
    const cardWidth = carouselRef.current.offsetWidth
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(index)
  }

  return (
    <div className='h-fit w-full px-6 py-23.5 md:py-45.75 md:px-25'>
      <div className='h-full w-full'>
        <h1 className='md:text-[46px] text-[24px] font-bold text-center'>
          {header || t('heading')}
        </h1>
        <p className='md:text-[20px] text-[12px] text-center mt-1'>
          {t('description')}
        </p>

        {/* Scrollable carousel for mobile */}
        <div
          ref={carouselRef}
          className='lg:hidden mt-8 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide'
          onScroll={handleScroll}
        >
          {newsData.map((news) => (
            <div key={news.id} className='shrink-0 w-full snap-center rounded-lg'>
              <Image
                src={news.image}
                alt={news.title}
                width={380}
                height={320}
                className='w-full rounded-t-lg'
              />
              <div className='mt-4 px-4'>
                <h2 className='text-[18px] md:text-[28px] font-medium'>{news.title}</h2>
                <p className='text-[14px] md:text-[18px] mt-2'>{news.description}</p>
                <p className='text-[14px] md:text-[18px] mt-1'>{news.date}</p>
                <button className='flex mt-6 text-[#FF741F] items-center'>
                  <p className='text-[14px]'>{t('readMore')}</p>
                  <Image
                    src='/images/orangearrow.png'
                    alt={t('arrowAlt')}
                    width={24}
                    height={24}
                    className='ml-2'
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots (mobile only) */}
        <div className='flex justify-center gap-2 mt-6 lg:hidden'>
          {newsData.map((_, index) => (
            <span
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-6 bg-[#FF741F]' : 'w-2.5 bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Static grid for large screens */}
        <div className='hidden lg:flex w-full flex-row gap-12.5 lg:mt-25 mt-8'>
          {newsData.map((news) => (
            <div key={news.id} className='w-1/3 rounded-lg'>
              <Image
                src={news.image}
                alt={news.title}
                width={380}
                height={320}
                className='w-full rounded-t-lg'
              />
              <div className='mt-4 px-4'>
                <h2 className='text-[18px] md:text-[28px] font-medium'>{news.title}</h2>
                <p className='text-[14px] md:text-[18px] mt-2'>{news.description}</p>
                <p className='text-[14px] md:text-[18px] mt-1'>{news.date}</p>
                <button className='flex mt-6 text-[#1AD329] items-center'>
                  <p className='text-[14px]'>{t('readMore')}</p>
                  <Image
                    src='/images/greenarrow.png'
                    alt={t('arrowAlt')}
                    width={24}
                    height={24}
                    className='ml-2'
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default News
