import axiosInstance from '../api/axios'

type RecentPost = {
	title: string
	slug: string
}

// const API_URL = 'https://api.camberfarms.org'

export default async function getRecentPosts(
	locale: string,
): Promise<RecentPost[] | null> {
	try {
		const res = await axiosInstance.get(`/api/export/blog`, {
			params: {
				limit: 6,
				page: 1,
				lang: locale,
			},
		})

		// console.log('recents: ', res.data)

		return res.data.data as RecentPost[]
	} catch (error) {
		console.error('Failed to fetch recent posts:', error)
		return null
	}
}

// const res = await fetch(`${API_URL}/api/export/blog?limit=6&page=1&lang=${locale}`,{cache: 'no-store',		},	)
