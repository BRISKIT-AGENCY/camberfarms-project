import wheatImg from '@/app/[locale]/assets/img/wheat.png'
import { StaticImageData } from 'next/image'
import axiosInstance from '../api/axios'
import BlogMain from './BlogMain'
import BlogSidebar from './BlogSidebar'

export type iBlog = {
	_id?: string
	title: string
	excerpt: string
	publishedAt: string
	image: string | StaticImageData | undefined
	slug: string
}

async function getBlogs(page: number) {
	try {
		// using an instance of axios with baseURL set
		const res = await axiosInstance.get(`/api/export/blog`, {
			params: { page, limit: 3 },
		})
		return res.data
	} catch (_) {
		// console.error(
		// 	'Failed to fetch blogs:',
		// 	error.response?.data || error.message
		// )
		// throw new Error('Failed to fetch blogs', error)

		// since this is a server component, console.log won't work
		// this is the expected shape of valid data
		// the hardcoded pagination values is to 'maintain the layout' of the page
		return {
			data: null,
			pagination: {
				currentPage: 1,
				totalPages: 8,
			},
		}
	}
}

export default async function BlogHome({
	searchParams,
}: {
	searchParams?: Promise<{ page?: string }>
}) {
	const params = await searchParams
	const currentPage = Number(params?.page) || 1
	const { data, pagination } = await getBlogs(currentPage)

	return (
		<main className="w-full py-20 md:py-52 px-6 md:px-10 lg:px-20 bg-light-grey grid grid-cols-1 md:grid-cols-[55%_auto] gap-32 md:gap-20 items-start relative">
			<BlogMain blogs={articles} pagination={pagination} />
			<BlogSidebar />
		</main>
	)
}

const articles: iBlog[] = [
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		image: undefined,
		excerpt:
			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
		publishedAt: 'September 18, 2025',
		slug: 'the-guide',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		image: wheatImg,
		excerpt:
			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
		publishedAt: 'September 18, 2025',
		slug: 'guide-the',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		image: undefined,
		excerpt:
			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
		publishedAt: 'September 18, 2025',
		slug: 'best-guide',
	},
]
