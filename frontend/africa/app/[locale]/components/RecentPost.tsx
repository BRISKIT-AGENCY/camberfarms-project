type RecentPost = {
  title: string
  slug: string
}

export default async function getRecentPosts(): Promise<RecentPost[]> {
  const res = await fetch(
    `http://localhost:5000/api/africa/blog?limit=6&page=1`,
    { cache: 'no-store' }
  )

  if (!res.ok) return []

  const data = await res.json()
  return data.data
}