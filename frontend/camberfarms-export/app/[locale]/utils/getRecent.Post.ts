type RecentPost = {
	title: string
	slug: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default async function getRecentPosts(): Promise<RecentPost[] | null> {
	const res = await fetch(`${API_URL}/api/export/blog?limit=6&page=1`, {
		cache: 'no-store',
	})

	if (!res.ok) return null

	const data = await res.json()
	return data.data
}
