import axiosInstance from '@/app/[locale]/api/axios'
import { notFound } from 'next/navigation'
import BlogSidebar from '../BlogSidebar'
import BlogContent from './BlogContent'

export type iBlogContent = {
	title: string
	publishedAt: string
	sections: {
		heading: string
		paragraphs: string[]
	}[]
}

async function getBlog(slug: string): Promise<iBlogContent | null> {
	try {
		const res = await axiosInstance.get(`/api/export/blog/${slug}`)
		return res.data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response?.status === 404) {
			notFound()
		}

		// console.error(
		//   'Failed to fetch blog:',
		//   error.response?.data || error.message
		// )
		// throw Error('Failed to fetch blog')
		return null
	}
}

export default async function SingleBlog({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const blog = await getBlog(slug)

	return (
		<main className="w-full py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-light-grey space-y-10 relative">
			<BlogContent blog={blog} />
			<BlogSidebar />
		</main>
	)
}
