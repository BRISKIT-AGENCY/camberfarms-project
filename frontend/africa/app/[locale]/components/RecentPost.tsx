export type RecentPost = {
  title: string
  slug: string
}

export default async function getRecentPosts(lang?: string): Promise<RecentPost[]> {
  const url = new URL(`http://localhost:5000/api/africa/blog`)
  url.searchParams.append('limit', '6')
  url.searchParams.append('page', '1')
  if (lang) url.searchParams.append('lang', lang) // ✅ pass locale to backend

  const res = await fetch(url.toString(), { cache: 'no-store' })

  if (!res.ok) return []

  const data = await res.json()
  return data.data
}
