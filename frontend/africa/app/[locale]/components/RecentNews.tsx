// getRecentNews.ts
export type RecentNews = {
  title: string
  slug: string
}
const API_URL = process.env.NEXT_PUBLIC_API_URL
export default async function getRecentNews(lang?: string): Promise<RecentNews[]> {
  const url = new URL(`${API_URL}/api/africa/news`)
  url.searchParams.append('limit', '6')
  url.searchParams.append('page', '1')
  if (lang) url.searchParams.append('lang', lang) // ✅ same as getRecentPosts

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) return []

  const data = await res.json()
  return data.data
}
