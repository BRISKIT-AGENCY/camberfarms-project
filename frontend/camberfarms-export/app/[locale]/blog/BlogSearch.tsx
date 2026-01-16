'use client'
import searchIcon from '@/app/[locale]/assets/icon/search-icon.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { useDebounce } from '../hooks/useDebounce'

type Blog = {
	title: string
	slug: string
}

export default function BlogSearch() {
	const [query, setQuery] = useState('')
	const [result, setResult] = useState<Blog[]>([])
	const [loading, setLoading] = useState(false)

	const debouncedQuery = useDebounce(query)

	useEffect(() => {
		if (!debouncedQuery) {
			setResult([])
			return
		}

		async function searchBlogs() {
			setLoading(true)
			try {
				const res = await axiosInstance.get(
					`/export/blog/search?q=${debouncedQuery}`
				)
				// const data = await res.json()
				setResult(res.data)
			} catch (error) {
				console.error('Search failed', error)
			} finally {
				setLoading(false)
			}
		}

		searchBlogs()
	}, [debouncedQuery])

	return (
		<div className="w-full md:bg-white md:p-10 rounded-2xl relative">
			<label className="w-full bg-white flex items-center gap-2 p-2 text-grey border border-grey rounded-xl has-[input]:focus-within:border-primary transition-all ease-in-out duration-200">
				<Image
					src={searchIcon}
					alt="search"
					width={20}
					height={20}
					className="h-full aspect-square object-contain object-center"
				/>
				<input
					type="search"
					name="search"
					id="search-blog"
					className="w-full bg-transparent outline-0 font-inter font-normal"
					placeholder="Search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</label>
			{query && (
				<div className="w-full min-h-32 bg-white rounded-2xl shadow-xl p-10 flex flex-col space-y-2 absolute top-full left-1/2 -translate-x-1/2 z-10 transition-discrete transition-all duration-200 ease-in-out text-grey">
					{loading && <p className="text-sm text-gray-400">Searching…</p>}

					{!loading && result.length === 0 && (
						<p className="text-sm text-gray-400">No results found</p>
					)}
					{!loading &&
						result.map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								className="block text-primary hover:underline"
							>
								{post.title}
							</Link>
						))}
				</div>
			)}
		</div>
	)
}
