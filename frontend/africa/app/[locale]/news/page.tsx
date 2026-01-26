'use client'

import Image from 'next/image'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import Pagination from '../components/Pagination'
import getRecentNews, { type RecentNews } from '../components/RecentNews'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'

type News = {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  image: string
  slug: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function NewsPage({ initialPage = 1 }) {
  const locale = useLocale()
  const t = useTranslations('News') // For translations
  const m = useTranslations('BlogSidebar')
  const n = useTranslations('Blog')
  const [newsData, setNewsData] = useState<News[]>([])
  const [recentNews, setRecentNews] = useState<RecentNews[]>([])
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 })
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchNews() {
      setLoading(true)
      setError(false)
      try {
        const res = await axios.get(`${API_URL}/api/africa/news`, {
          params: { page, limit: 3, lang: locale } // ✅ pass locale
        })
        setNewsData(res.data.data || [])
        setPagination(res.data.pagination || { currentPage: 1, totalPages: 1 })
      } catch (err) {
        console.error('Failed to fetch news:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    async function fetchRecent() {
      try {
        const data = await getRecentNews(locale)
        setRecentNews(data)
      } catch {
        // Fail silently for recent news
        setRecentNews([])
      }
    }

    fetchNews()
    fetchRecent()
  }, [locale, page])

  return (
    <div className="w-full bg-[#F3F5F7] pb-19.5">
      <div className="hidden xl:block">
        <Navbar
          logoSrc="/images/logo2.png"
          linkTextColor="text-black"
          buttonBgColor="bg-[#1AD329]"
          buttonTextColor="text-white"
        />
      </div>

      <div className="md:pl-19.5 md:pr-30.5 px-6">
        <div className="w-full flex xl:flex-row flex-col gap-16.5 pt-15.5">
          {/* NEWS POSTS */}
          <div className="p-9 bg-white xl:w-[60%] rounded-3xl">
            {loading && (
              <p className="text-center text-gray-500">{m('searching')}</p>
            )}

            {error && (
              <p className="text-center text-red-500">{t('loadFailed')}</p>
            )}

            {!loading && !error && newsData.length === 0 && (
              <p className="text-center text-gray-500">{m('noRecentPosts')}</p>
            )}

            {!loading && !error && newsData.map(news => (
              <div key={news._id} className="border-b border-[#EBEBEB] pb-9 mb-12.5">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={800}
                  height={400}
                  className="w-full h-65.25 object-cover rounded-xl"
                />

                <h2 className="font-medium md:text-[28px] text-[20px] mt-6">
                  {news.title}
                </h2>

                <p className="text-[#808080] md:text-[18px] mt-2">
                  {news.excerpt}
                </p>

                <p className="text-[#808080] md:text-[18px]">
                  {n('Date')} {new Date(news.publishedAt).toDateString()}
                </p>

                <Link
                  href={`/${locale}/news/${news.slug}`}
                  className="flex mt-6 text-[#1AD329]"
                >
                  <span className="md:text-[24px] text-[16px]">{n('button')}</span>
                  <Image
                    src="/images/greenarrow.png"
                    alt={t('arrowAlt')}
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Client-side search / recent news */}
          <div className="xl:w-[40%]">
            {/* You can add a NewsSearchSidebar like BlogSearchSidebar */}
          </div>
        </div>

        {/* Pagination */}
        {!loading && !error && newsData.length > 0 && (
          <div className="mt-25">
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}
