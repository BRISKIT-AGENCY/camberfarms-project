import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import searchIcon from '../assets/icon/search-icon.svg'
import { useDebounce } from '../hooks/useDebounce'

type SearchResult = {
	title: string
	slug: string
}

export default function Searchbar({
	url,
	placeholder = 'Search',
}: {
	url: string
	placeholder?: string
}) {
	const [query, setQuery] = useState('')
	const [result, setResult] = useState<SearchResult[]>([])
	const [loading, setLoading] = useState(false)

	const debouncedQuery = useDebounce(query)

	useEffect(() => {
		if (!debouncedQuery) {
			setResult([])
			return
		}

		const controller = new AbortController()

		async function searchItems() {
			setLoading(true)
			try {
				const res = await axios.get(
					`${url}/search?q=${encodeURIComponent(debouncedQuery)}`,
					{ signal: controller.signal },
				)
				const data = Array.isArray(res.data) ? res.data : []
				setResult(data)
			} catch (error) {
				if (!axios.isCancel(error)) {
					console.error('Search failed', error)
				}
			} finally {
				setLoading(false)
			}
		}

		searchItems()

		return () => {
			controller.abort('Ended')
		}
	}, [debouncedQuery, url])

	return (
		<div className="w-full md:bg-white rounded-2xl relative dark:bg-black">
			<label className="w-full bg-white flex items-center gap-2 p-2 text-grey border border-grey rounded-xl has-[input]:focus-within:border-primary transition-all ease-in-out duration-200 dark:bg-black">
				<img
					src={searchIcon}
					alt="search"
					className="h-full aspect-square object-contain object-center"
				/>
				<input
					type="search"
					name="search"
					id="search"
					className="w-full bg-transparent outline-0 font-inter font-normal"
					placeholder={placeholder}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
			</label>
			{debouncedQuery && (
				<div className="w-full min-h-32 bg-white rounded-2xl shadow-xl p-10 flex flex-col space-y-2 absolute top-full left-1/2 -translate-x-1/2 z-10 transition-discrete transition-all duration-200 ease-in-out text-grey dark:bg-dark-grey dark:text-light-grey">
					{loading && <p className="text-sm text-gray-400">Searching…</p>}

					{!loading && result.length === 0 && (
						<p className="text-sm text-gray-400">No results found</p>
					)}
					{!loading &&
						result.map((r) => (
							<Link
								key={r.slug}
								to={`/${url}/${r.slug}`}
								className="block text-primary hover:underline"
							>
								{r.title}
							</Link>
						))}
				</div>
			)}
		</div>
	)
}
