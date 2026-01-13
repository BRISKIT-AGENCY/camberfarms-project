// import wheatImg from '@/app/assets/img/wheat.png'
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

// const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getBlogs(page: number) {
	const result = {
		data: [],
		error: [],
	}
	try {
		// using an instance of axios with baseURL set
		const res = await axiosInstance.get(`/api/export/blog`, {
			params: { page, limit: 3 },
		})
		return { ...result, data: res.data }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		const error = err.response?.data || err.message
		// console.error(
		// 	'Failed to fetch blogs:',
		// 	error.response?.data || error.message
		// )
		// throw new Error('Failed to fetch blogs', error)

		// since this is a server component, console.log won't work
		return { ...result, error }
	}
}

export default async function BlogHome({
	searchParams,
}: {
	searchParams?: Promise<{ page?: string }>
}) {
	const params = await searchParams // unwrap the Promise
	const currentPage = Number(params?.page) || 1
	const {
		error,
		data: { data, pagination },
	} = await getBlogs(currentPage)
	//   const recentPosts = await getRecentPosts()

	if (error) console.error('fetch error: ', error)

	return (
		<main className="w-full py-20 md:py-52 px-6 md:px-10 lg:px-20 bg-light-grey grid grid-cols-1 md:grid-cols-[55%_auto] gap-32 md:gap-20 items-start relative">
			<BlogMain blogs={data} pagination={pagination} />
			<BlogSidebar />
		</main>
	)
}

// const articles: iBlog[] = [
// 	{
// 		title: 'The Best Guide To Buying Wheat Grains in Bulk',
// 		image: undefined,
// 		excerpt:
// 			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
// 		publishedAt: 'September 18, 2025',
// 		slug: 'the-guide',
// 	},
// 	{
// 		title: 'The Best Guide To Buying Wheat Grains in Bulk',
// 		image: wheatImg,
// 		excerpt:
// 			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
// 		publishedAt: 'September 18, 2025',
// 		slug: 'guide-the',
// 	},
// 	{
// 		title: 'The Best Guide To Buying Wheat Grains in Bulk',
// 		image: undefined,
// 		excerpt:
// 			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
// 		publishedAt: 'September 18, 2025',
// 		slug: 'best-guide',
// 	},
// ]
