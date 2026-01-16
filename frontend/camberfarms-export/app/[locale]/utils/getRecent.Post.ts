type RecentPost = {
	title: string
	slug: string
}

const API_URL = 'http://localhost:5000/api'

export default async function getRecentPosts(): Promise<RecentPost[] | null> {
	const res = await fetch(`${API_URL}/export/blog?limit=6&page=1`, {
		cache: 'no-store',
	})

	if (!res.ok) return null

	const data = await res.json()
	return data.data
}
