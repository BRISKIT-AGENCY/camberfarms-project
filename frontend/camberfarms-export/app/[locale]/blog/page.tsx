// import wheatImg from '@/app/[locale]/assets/img/wheat.png'
import { getLocale } from 'next-intl/server'
import axiosInstance from '../api/axios'
import BlogMain from './BlogMain'
import BlogSidebar from './BlogSidebar'

export type iBlog = {
	_id?: string
	title: string
	excerpt: string
	publishedAt: string
	image: string | undefined
	slug: string
	authorImage: string
}

async function getBlogs(page: number, locale: string) {
	try {
		// using an instance of axios with baseURL set
		const res = await axiosInstance.get(`/api/export/blog`, {
			params: { page, limit: 3, lang: locale },
		})
		return res.data
	} catch (_) {
		// since this is a server component, console.log won't work
		// this is the expected shape of valid data
		// the hardcoded pagination values is to 'maintain the layout' of the page
		return {
			data: null,
			pagination: {
				currentPage: 1,
				totalPages: 1,
			},
		}
	}
}

export default async function BlogHome({
	searchParams,
}: {
	searchParams?: Promise<{ page?: string }>
}) {
	const locale = await getLocale()
	const params = await searchParams
	const currentPage = Number(params?.page) || 1
	const { data, pagination } = await getBlogs(currentPage, locale)

	return (
		<main className="w-full py-20 md:py-52 px-6 md:px-10 lg:px-20 bg-light-grey grid grid-cols-1 md:grid-cols-[55%_auto] gap-32 md:gap-20 items-start relative">
			<BlogMain blogs={data} pagination={pagination} />
			<BlogSidebar />
		</main>
	)
}
