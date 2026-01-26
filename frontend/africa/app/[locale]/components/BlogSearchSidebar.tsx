'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDebounce } from '../hooks/UseDebounce'
import { useLocale, useTranslations } from 'next-intl'

type Blog = {
  title: string
  slug: string
}

export default function BlogSearchSidebar({
  recentPosts = []
}: {
  recentPosts?: Blog[]
}) {
  const locale = useLocale()
  const t = useTranslations('BlogSidebar')

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      setError(false)
      return
    }

    const controller = new AbortController()

    async function searchBlogs() {
      setLoading(true)
      setError(false)

      try {
        const res = await fetch(
          `http://localhost:5000/api/africa/blog/search?q=${debouncedQuery}&lang=${locale}`,
          { signal: controller.signal }
        )

        if (!res.ok) {
          throw new Error('Request failed')
        }

        const data = await res.json()

        // ✅ Fail-safe: ensure array
        if (!Array.isArray(data)) {
          throw new Error('Invalid response')
        }

        setResults(data)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Search failed:', err)
          setError(true)
          setResults([])
        }
      } finally {
        setLoading(false)
      }
    }

    searchBlogs()

    // ✅ cancel in-flight request on unmount / change
    return () => controller.abort()
  }, [debouncedQuery, locale])

  return (
    <div className="h-fit">
      {/* SEARCH BOX */}
      <div className="w-full bg-white p-9 rounded-3xl">
        <div className="relative">
          <Image
            width={20}
            height={20}
            alt={t('searchIconAlt')}
            src="/images/Search.png"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />

          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-black"
          />
        </div>

        {/* SEARCH RESULTS */}
        {query && (
          <div className="mt-4 space-y-3">
            {loading && (
              <p className="text-sm text-gray-400">
                {t('searching')}
              </p>
            )}

            {!loading && error && (
              <p className="text-sm text-red-500">
                {t('searchError')}
              </p>
            )}

            {!loading && !error && results.length === 0 && (
              <p className="text-sm text-gray-400">
                {t('noResults')}
              </p>
            )}

            {!loading &&
              !error &&
              results.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block text-[#1AD329] hover:underline"
                >
                  {post.title}
                </Link>
              ))}
          </div>
        )}
      </div>

      {/* RECENT POSTS */}
      <div className="bg-white mt-6 rounded-3xl p-9">
        <h3 className="md:text-[24px] text-[18px]">
          {t('recentPosts')}
        </h3>

        {recentPosts.length === 0 && (
          <p className="text-sm text-gray-400 mt-3">
            {t('noRecentPosts')}
          </p>
        )}

        {recentPosts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block md:text-[18px] text-[14px] text-[#1AD329] mt-3 hover:underline"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
