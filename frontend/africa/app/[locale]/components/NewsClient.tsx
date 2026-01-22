'use client'

import Image from 'next/image'
import Navbar from './Navbar'
import News from './News' // The component showing recent news
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'

type Section = {
  heading?: string
  paragraphs: string[]
}

type NewsType = {
  title: string
  excerpt?: string
  image: string
  publishedAt: string
  sections: Section[]
}

interface NewsClientProps {
  news: NewsType
}

export default function NewsClient({ news }: NewsClientProps) {
  const locale = useLocale()
  const t= useTranslations('News')

  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(news.publishedAt));

  return (
    <div>
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
          <h1 className='text-[#1AD329] md:text-[50px] font-bold text-[28px]'>{news.title}</h1>
        </div>

        <div className='md:mt-12.5 mt-8 w-full md:px-25 px-6'>
          <Image
            src={news.image}
            alt={news.title}
            className='h-90.75 w-full object-cover'
            width={1200}
            height={500}
          />
          <div className='flex md:mt-6 mt-2 md:gap-12 gap-4'>
            <p>{t("admin")}</p>
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className='mt-12 md:px-25 px-6'>
          {news.sections.map((section, index) => (
            <div key={index} className='w-full md:mt-12.5 mt-6'>
              <h2 className='font-medium md:text-[28px] text-[16px]'>{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className='md:text-[22px] text-[#333333] text-[14px] mt-4'>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Recent news component */}
        <News header='MORE NEWS AND INSIGHTS' />
      </div>
    </div>
  )
}
