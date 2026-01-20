// app/[locale]/blog/[slug]/page.tsx
import SingleBlogClient from '../../components/SingleBlogClient'
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
  const locale = await getLocale() // you can get locale from next-intl server API if needed

  try {
    const res = await axios.get(`${API_URL}/api/africa/blog/${slug}`, {
      params: { lang: locale }
    })
    const blog = res.data

    return <SingleBlogClient blog={blog} />
  } catch (err: any) {
    console.error('Failed to fetch blog:', err.message)
    notFound()
  }
}
