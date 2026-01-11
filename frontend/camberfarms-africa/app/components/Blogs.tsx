'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import axios from 'axios'

type Blog = {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  slug: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getBlogs(): Promise<Blog[]> {
  const res = await axios.get(`${API_URL}/api/africa/blog`, {
    params: {
      page: 1,
      limit: 2
    }
  })

  // backend returns { data, pagination }
  return res.data.data
}

const Blogs = () => {
  const { t } = useTranslation('blogs')
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    getBlogs()
      .then(setBlogs)
      .catch(err => {
        console.error('Failed to fetch blogs', err)
      })
  }, [])

  return (
    <div className='h-fit py-14.5 px-6 w-full md:py-35 md:px-25 bg-[#F2F2F2]'>
      <div className='w-full h-full'>
        <div>
          <h1 className='md:text-[46px] text-[24px] font-bold text-center'>
            {t('heading')}
          </h1>
          <p className='md:text-[20px] text-[12px] text-center mt-1'>
            {t('description')}
          </p>
        </div>

        <div className='w-full md:mt-25 mt-8 flex lg:flex-row flex-col gap-11'>
          {blogs.map((blog, idx) => (
            <div
              key={blog._id}
              className={`w-full lg:w-[50%] border-2 border-[#1AD329]
                ${idx === 0 ? 'border-l-0' : 'border-r-0'}
                rounded-4xl px-4 py-12.5 md:p-12.5 flex flex-col md:items-start items-center`}
            >
              <h2 className='text-[18px] md:text-[28px] font-medium'>
                {blog.title}
              </h2>

              <p className='text-[14px] md:text-[18px] mt-2 text-[#808080]'>
                {blog.excerpt}
              </p>

              <p className='text-[14px] md:text-[18px] mt-2 text-[#808080]'>
                Date:{new Date(blog.publishedAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}
              </p>

              <Link
                href={`/blog/${blog.slug}`}
                className='flex mt-6 text-[#1AD329]'
              >
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs
