'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDebounce } from '../hooks/UseDebounce'

type Blog = {
  title: string
  slug: string
}

export default function BlogSearchSidebar({
  recentPosts
}: {
  recentPosts: Blog[]
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    async function searchBlogs() {
      setLoading(true)
      try {
        const res = await fetch(
          `http://localhost:5000/api/africa/blog/search?q=${debouncedQuery}`
        )
        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error('Search failed')
      } finally {
        setLoading(false)
      }
    }

    searchBlogs()
  }, [debouncedQuery])

  return (
    <div className="h-fit">
      {/* SEARCH INPUT */}
      <div className="relative w-full bg-white p-9 rounded-3xl">
        <Image
          width={20}
          height={20}
          alt="search icon"
          src="/images/Search.png"
          className="absolute left-13 top-1/2 -translate-y-1/2"
        />

        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-black"
        />

        {/* SEARCH RESULTS */}
        {query && (
          <div className="mt-4 space-y-3">
            {loading && (
              <p className="text-sm text-gray-400">Searching…</p>
            )}

            {!loading && results.length === 0 && (
              <p className="text-sm text-gray-400">No results found</p>
            )}

            {!loading &&
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
        <h3 className="md:text-[24px] text-[18px]">Recent posts</h3>

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
