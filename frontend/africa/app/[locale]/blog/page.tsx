'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import axios from 'axios'

import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'
import BlogSearchSidebar from '../components/BlogSearchSidebar'
import getRecentPosts, { type RecentPost } from '../components/RecentPost'

type Blog = {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  image: string
  slug: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function BlogPage({ initialPage = 1 }) {
  const locale = useLocale()
  const t = useTranslations('Blog')

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1
  })
  const [page, setPage] = useState(initialPage)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)



  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get(`${API_URL}/api/africa/blog`, {
          params: {
            page,
            limit: 3,
            lang: locale
          }
        })

        setBlogs(res.data.data)
        setPagination(res.data.pagination)
      } catch (err) {
        console.error('Failed to fetch blogs:', err)
        setError(t('errors.loadFailed'))
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    async function fetchRecent() {
      try {
        const posts = await getRecentPosts(locale)
        setRecentPosts(posts)
      } catch (err) {
        console.error('Failed to fetch recent posts:', err)
        setRecentPosts([])
      }
    }

    fetchBlogs()
    fetchRecent()
  }, [locale, page, t])

  return (
    <div className="w-full bg-[#F3F5F7] pb-19.5">
      {/* NAVBAR */}
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
          {/* BLOG POSTS */}
          <div className="p-9 bg-white xl:w-[60%] rounded-3xl">
            {/* Loading */}
            {loading && (
              <p className="text-center text-gray-500">
                {t('loading')}
              </p>
            )}

            {/* Error */}
            {!loading && error && (
              <p className="text-center text-red-500">
                {error}
              </p>
            )}

            {/* Empty */}
            {!loading && !error && blogs.length === 0 && (
              <p className="text-center text-gray-500">
                {t('empty')}
              </p>
            )}

            {/* Blog list */}
            {!loading &&
              !error &&
              blogs.map(blog => (
                <div
                  key={blog._id}
                  className="border-b border-[#EBEBEB] pb-9 mb-12.5"
                >
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={800}
                    height={400}
                    className="w-full h-65.25 object-cover rounded-xl"
                  />

                  <h2 className="font-medium md:text-[28px] text-[20px] mt-6">
                    {blog.title}
                  </h2>

                  <p className="text-[#808080] md:text-[18px] mt-2">
                    {blog.excerpt}
                  </p>

                  <p className="text-[#808080] md:text-[18px]">
                    {new Intl.DateTimeFormat(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(new Date(blog.publishedAt))}
                  </p>

                  <Link
                    href={
                      locale === 'en'
                        ? `/blog/${blog.slug}`
                        : `/${locale}/blog/${blog.slug}`
                    }
                    className="flex mt-6 text-[#1AD329] items-center"
                  >
                    <span className="md:text-[24px] text-[16px]">
                      {t('button')}
                    </span>
                    <Image
                      src="/images/greenarrow.png"
                      alt="arrow"
                      width={24}
                      height={24}
                      className="ml-2"
                    />
                  </Link>
                </div>
              ))}
          </div>

          {/* SIDEBAR */}
          <div className="xl:w-[40%]">
            <BlogSearchSidebar recentPosts={recentPosts} />
          </div>
        </div>

        {/* PAGINATION */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="hidden md:block mt-25">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  )
}
