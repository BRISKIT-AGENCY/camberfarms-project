'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import axios from 'axios'
import Link from 'next/link'
import { useLocale } from 'next-intl'

type NewsItem = {
  id: string
  title: string
  excerpt: string
  slug: string
  image: string
  publishedAt: string
}

type NewsProps = {
  header?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const fetchNews = async (lang: string): Promise<NewsItem[]> => {
  try{
    const res = await axios.get(`${API_URL}/api/africa/news`, {
    params: {
      page: 1,
      limit: 3,
      lang
    }
  })
  return res.data.data
  }catch (error: any) {
    console.error('Failed to fetch news:', error.response?.data || error.message)
    throw new Error('Failed to fetch news')
  }
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const STATIC_IMAGES = [
  '/images/news1.png',
  '/images/news2.png',
  '/images/news3.png'
]

const News = ({ header }: NewsProps) => {
  const t = useTranslations('News')
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()

  useEffect(() => {
    fetchNews(locale)
      .then(setNewsData)
      .catch(err => console.error('Failed to fetch news:', err))
  }, [locale])

  const handleScroll = () => {
    if (!carouselRef.current) return
    const scrollLeft = carouselRef.current.scrollLeft
    const cardWidth = carouselRef.current.offsetWidth
    setActiveIndex(Math.round(scrollLeft / cardWidth))
  }

  return (
    <div className='h-fit w-full px-6 py-23.5 md:py-45.75 md:px-25 bg-[#F2F2F2]'>
      <div className='h-full w-full'>
        <h1 className='md:text-[46px] text-[24px] font-bold text-center'>
          {header || t('heading')}
        </h1>
        <p className='md:text-[20px] text-[12px] text-center mt-1'>
          {t('description')}
        </p>

        {/* Mobile carousel */}
        <div
          ref={carouselRef}
          className='lg:hidden mt-8 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide'
          onScroll={handleScroll}
        >
          {newsData.map((news, index) => (
            <div
              key={news.id}
              className='shrink-0 w-full snap-center rounded-lg'
            >
              <Image
                src={STATIC_IMAGES[index] || STATIC_IMAGES[0]}
                alt={news.title}
                width={380}
                height={320}
                className='w-full rounded-t-lg'
              />

              <div className='mt-4 px-4'>
                <h2 className='text-[18px] md:text-[28px] font-medium'>
                  {news.title}
                </h2>
                <p className='text-[14px] md:text-[18px] mt-2'>
                  {news.excerpt}
                </p>
                <p className='text-[14px] md:text-[18px] mt-1'>
                  {formatDate(news.publishedAt)}
                </p>

                <Link href={`/news/${news.slug}`} className='flex mt-6 text-[#FF741F] items-center'>
                  <p className='text-[14px]'>{t('readMore')}</p>
                  <Image
                    src='/images/orangearrow.png'
                    alt={t('arrowAlt')}
                    width={24}
                    height={24}
                    className='ml-2'
                  />
                </Link>
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
                activeIndex === index
                  ? 'w-6 bg-[#FF741F]'
                  : 'w-2.5 bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Desktop grid */}
        <div className='hidden lg:flex w-full flex-row gap-12.5 lg:mt-25 mt-8'>
          {newsData.map((news, index) => (
            <div key={news.id} className='w-1/3 rounded-lg'>
              <Image
                src={STATIC_IMAGES[index] || STATIC_IMAGES[0]}
                alt={news.title}
                width={380}
                height={320}
                className='w-full rounded-t-lg'
              />

              <div className='py-4 px-4 bg-white rounded-b-3xl'>
                <h2 className='text-[18px] md:text-[28px] font-medium'>
                  {news.title}
                </h2>
                <p className='text-[14px] md:text-[18px] mt-2'>
                  {news.excerpt}
                </p>
                <p className='text-[14px] md:text-[18px] mt-1'>
                  {formatDate(news.publishedAt)}
                </p>

                <Link href={`/news/${news.slug}`} className='flex mt-6 text-[#1AD329] items-center'>
                  <p className='text-[14px]'>{t('readMore')}</p>
                  <Image
                    src='/images/greenarrow.png'
                    alt={t('arrowAlt')}
                    width={24}
                    height={24}
                    className='ml-2'
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default News