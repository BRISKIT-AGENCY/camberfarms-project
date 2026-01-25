'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'

type Blog = {
  title: string
  slug: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const BlogHeader = () => {
  const locale = useLocale()
  const [blog, setBlog] = useState<Blog | null>(null)
  const t= useTranslations('Blog')

  useEffect(() => {
    async function fetchLatestBlog() {
      try {
        const res = await axios.get(`${API_URL}/api/africa/blog`, {
          params: {
            page: 1,
            limit: 1, // ✅ only latest blog
            lang: locale
          }
        })

        const latest = res.data?.data?.[0]
        if (latest) {
          setBlog({
            title: latest.title,
            slug: latest.slug
          })
        }
      } catch {
        // ❌ Fail silently
        setBlog(null)
      }
    }

    fetchLatestBlog()
  }, [locale])

  // ✅ HARD FAILSAFE: render nothing
  if (!blog) return null

  return (
    <div className="w-full bg-[#808080] text-white py-17.5 px-6 md:px-17.5">
      <div className="flex gap-4 w-full items-center sm:justify-between">
        <h1 className="md:text-[32px] text-[18px] font-bold w-[60%]">
          {blog.title}
        </h1>

        <Link
          href={`/blog/${blog.slug}`}
          className="hover:underline w-[40%] sm:w-auto flex items-center justify-center cursor-pointer"
        >
          <p className='bg-[#1AD329] text-white py-2.75 px-2 rounded-[100px] md:text-[18px] text-[12px] '>{t('button')} →</p>
        </Link>
      </div>
    </div>
  )
}

export default BlogHeader
