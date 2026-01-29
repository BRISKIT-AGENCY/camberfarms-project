type RecentPost = {
	title: string
	slug: string
}

const API_URL = 'https://camberfarms-project.onrender.com'

export default async function getRecentPosts(
	locale: string,
): Promise<RecentPost[] | null> {
	const res = await fetch(
		`${API_URL}/api/export/blog?limit=6&page=1&lang=${locale}`,
		{
			cache: 'no-store',
		},
	)

	if (!res.ok) return null

	const data = await res.json()
	return data.data
}
