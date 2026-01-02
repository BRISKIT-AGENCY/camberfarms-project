'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Blogs = () => {
  const { t } = useTranslation('blogs') // namespace: "blogs"

  // Example blog items
  const blogPosts = [
    {
      title: t('post1.title'),
      description: t('post1.description'),
      date: t('post1.date')
    },
    {
      title: t('post2.title'),
      description: t('post2.description'),
      date: t('post2.date')
    }
  ]

  return (
    <div className='h-fit py-14.5 px-6 w-full md:py-35 md:px-25'>
      <div className='w-full h-full'>
        <div>
          <h1 className='md:text-[46px] text-[24px] font-bold text-center'>
            {t('heading')}
          </h1>
          <p className='md:text-[20px] text-[12px] text-center mt-1'>
            {t('description')}
          </p>
        </div>

        <div className='w-full lg:h-fit h-fit md:mt-25 mt-8 flex lg:flex-row flex-col gap-11'>
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className={`w-full lg:h-fit lg:w-[50%] border-2 border-[#1AD329] 
                ${idx === 0 ? 'border-l-0' : 'border-r-0'} 
                rounded-4xl px-4 py-12.5 md:p-12.5 flex flex-col md:items-start items-center`}
            >
              <h2 className='text-[18px] md:text-[28px] font-medium'>
                {post.title}
              </h2>
              <p className='text-[14px] md:text-[18px] mt-2'>
                {post.description}
              </p>
              <p className='text-[14px] md:text-[18px]'>{post.date}</p>
              <button className='flex mt-6 text-[#1AD329]'>
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
