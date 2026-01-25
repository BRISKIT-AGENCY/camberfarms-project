'use client'

import Image from 'next/image'
import Navbar from './Navbar'
import News from './News' // The component showing recent news
import { useLocale, useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import getRecentNews, { type RecentNews } from './RecentNews'

type Section = {
  heading?: string
  paragraphs: string[]
}

type NewsType = {
  title?: string
  excerpt?: string
  image?: string
  publishedAt?: string
  sections?: Section[]
}

interface NewsClientProps {
  news?: NewsType
}

export default function NewsClient({ news }: NewsClientProps) {
  const locale = useLocale()
  const tBlog = useTranslations('Blog') // For errors: loadFailed, empty
  const tNews = useTranslations('News') // Existing News translations
  const [recentNews, setRecentNews] = useState<RecentNews[]>([])
  const [recentError, setRecentError] = useState(false)

  // Check if the news object is valid
  const isNewsValid =
    news &&
    news.title &&
    news.publishedAt &&
    news.image &&
    Array.isArray(news.sections) &&
    news.sections.length > 0

  const formattedDate =
    news?.publishedAt &&
    new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(news.publishedAt))

  // Fetch recent news (for sidebar)
  useEffect(() => {
    async function fetchRecent() {
      try {
        const data = await getRecentNews(locale)
        setRecentNews(data || [])
      } catch (err) {
        console.error('Failed to load recent news', err)
        setRecentError(true)
      }
    }

    fetchRecent()
  }, [locale])

  return (
    <div>
      {/* NAVBAR */}
      <div className='hidden xl:block'>
        <Navbar
          logoSrc="/images/logo2.png"
          linkTextColor="text-black"
          buttonBgColor="bg-[#1AD329]"
          buttonTextColor='text-white'
        />
      </div>

      <div className='pt-21.5 bg-[#F2F2F2]'>
        <div className='flex justify-center md:px-25 px-6'>
          {isNewsValid ? (
            <h1 className='text-[#1AD329] md:text-[50px] font-bold text-[28px]'>
              {news.title}
            </h1>
          ) : (
            <div className='bg-white rounded-3xl p-9 text-center w-full'>
              <h1 className='font-bold md:text-[28px] text-[18px]'>
                {tBlog('errors.loadFailed')}
              </h1>
              <p className='text-[#808080] mt-4'>{tBlog('empty')}</p>
            </div>
          )}
        </div>

        {/* If news is valid, render content */}
        {isNewsValid && (
          <>
            {/* Featured image */}
            {news.image && (
              <div className='md:mt-12.5 mt-8 w-full md:px-25 px-6'>
                <Image
                  src={news.image}
                  alt={news.title || 'News image'}
                  className='h-90.75 w-full object-cover'
                  width={1200}
                  height={500}
                />
                <div className='flex md:mt-6 mt-2 md:gap-12 gap-4'>
                  <p>{tNews("admin")}</p>
                  <p>{formattedDate}</p>
                </div>
              </div>
            )}

            {/* News sections */}
            <div className='mt-12 md:px-25 px-6'>
              {news.sections!.map((section, index) => (
                <div key={index} className='w-full md:mt-12.5 mt-6'>
                  <h2 className='font-medium md:text-[28px] text-[16px]'>
                    {section.heading}
                  </h2>
                  {section.paragraphs?.length ? (
                    section.paragraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className='md:text-[22px] text-[#333333] text-[14px] mt-4'
                      >
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-[#808080] mt-4">{tBlog('empty')}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Recent news component */}
        <div className='md:mt-25 mt-15'>
          {recentError ? (
            <div className='bg-white rounded-3xl p-9 text-[#808080]'>
              {tBlog('errors.loadFailed')}
            </div>
          ) : (
            <News header={tNews('heading2')} />
          )}
        </div>
      </div>
    </div>
  )
}
