// getRecentNews.ts
export type RecentNews = {
  title: string
  slug: string
}

export default async function getRecentNews(lang?: string): Promise<RecentNews[]> {
  const url = new URL(`http://localhost:5000/api/africa/news`)
  url.searchParams.append('limit', '6')
  url.searchParams.append('page', '1')
  if (lang) url.searchParams.append('lang', lang) // ✅ same as getRecentPosts

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) return []

  const data = await res.json()
  return data.data
}
