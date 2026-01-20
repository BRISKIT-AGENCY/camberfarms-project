// app/[locale]/news/[slug]/page.tsx
import NewsClient from '../../components/NewsClient'
import { notFound } from 'next/navigation'
import axios from 'axios'
import { getLocale } from 'next-intl/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface PageProps {
  params: { slug: string }
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()

  try {
    const res = await axios.get(`${API_URL}/api/africa/news/${slug}`, {
      params: { lang: locale } // pass locale to backend
    })

    const news = res.data

    return <NewsClient news={news} />
  } catch (err: any) {
    console.error('Failed to fetch news:', err.message)
    notFound()
  }
}
