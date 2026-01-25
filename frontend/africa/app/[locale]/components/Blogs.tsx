'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useLocale, useTranslations } from 'next-intl'

type Blog = {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  slug: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getBlogs(lang: string): Promise<Blog[]> {
  const res = await axios.get(`${API_URL}/api/africa/blog`, {
    params: {
      page: 1,
      limit: 2,
      lang
    }
  })

  return res.data.data
}

const Blogs = () => {
  const t = useTranslations('Blog')
  const locale = useLocale()

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)

    getBlogs(locale)
      .then(data => {
        setBlogs(data || [])
      })
      .catch(err => {
        console.error('Failed to fetch blogs', err)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [locale])

  return (
    <div className="h-fit py-14.5 px-6 w-full md:py-35 md:px-25 bg-[#F2F2F2]">
      <div className="w-full h-full">
        {/* HEADER */}
        <div>
          <h1 className="md:text-[46px] text-[24px] font-bold text-center">
            {t('title')}
          </h1>
          <p className="md:text-[20px] text-[12px] text-center mt-1">
            {t('description')}
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-12 text-[#808080]">
            {t('loading')}
          </p>
        )}

        {/* ERROR */}
        {!loading && error && (
          <p className="text-center mt-12 text-red-500">
            {t('errors.loadFailed')}
          </p>
        )}

        {/* EMPTY */}
        {!loading && !error && blogs.length === 0 && (
          <p className="text-center mt-12 text-[#808080]">
            {t('empty')}
          </p>
        )}

        {/* BLOG CARDS */}
        {!loading && !error && blogs.length > 0 && (
          <div className="w-full md:mt-25 mt-8 flex lg:flex-row flex-col gap-11">
            {blogs.map((blog, idx) => {
              const formattedDate = new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(new Date(blog.publishedAt))

              return (
                <div
                  key={blog._id}
                  className={`w-full lg:w-[50%] border-2 border-[#1AD329]
                    ${idx === 0 ? 'border-l-0' : 'border-r-0'}
                    rounded-4xl px-4 py-12.5 md:p-12.5 flex flex-col md:items-start items-center`}
                >
                  <h2 className="text-[18px] md:text-[28px] font-medium">
                    {blog.title}
                  </h2>

                  <p className="text-[14px] md:text-[18px] mt-2 text-[#808080]">
                    {blog.excerpt}
                  </p>

                  <p className="text-[14px] md:text-[18px] mt-2 text-[#808080]">
                    {t('Date')} {formattedDate}
                  </p>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="flex mt-6 text-[#1AD329]"
                  >
                    <span className="text-[14px]">
                      {t('button')}
                    </span>

                    <Image
                      src="/images/greenarrow.png"
                      alt={t('arrowAlt')}
                      width={24}
                      height={24}
                      className="ml-2"
                    />
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs
