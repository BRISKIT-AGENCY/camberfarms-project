'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
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
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 })
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get(`${API_URL}/api/africa/blog`, {
          params: { page, limit: 3, lang: locale }
        })
        setBlogs(res.data.data)
        setPagination(res.data.pagination)
      } catch (err) {
        console.error('Failed to fetch blogs:', err)
      }
    }

    async function fetchRecent() {
      const posts = await getRecentPosts(locale)
      setRecentPosts(posts)
    }

    fetchBlogs()
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
          {/* BLOG POSTS */}
          <div className="p-9 bg-white xl:w-[60%] rounded-3xl">
            {blogs.map(blog => (
              <div key={blog._id} className="border-b border-[#EBEBEB] pb-9 mb-12.5">
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

                <p className="text-[#808080] md:text-[18px] mt-2">{blog.excerpt}</p>

                <p className="text-[#808080] md:text-[18px]">
                  Date: {new Date(blog.publishedAt).toDateString()}
                </p>

                {/* ✅ Use locale in link */}
                <Link
                  href={`/${locale}/blog/${blog.slug}`}
                  className="flex mt-6 text-[#1AD329]"
                >
                  <span className="md:text-[24px] text-[16px]">Read More</span>
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

          {/* Client-Side Search */}
          <div className="xl:w-[40%]">
            <BlogSearchSidebar recentPosts={recentPosts} />
          </div>
        </div>

        {/* Pagination */}
        <div className="hidden md:block mt-25">
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        </div>
      </div>
    </div>
  )
}
