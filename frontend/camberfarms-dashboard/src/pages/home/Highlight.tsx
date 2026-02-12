// import { useQuery } from '@tanstack/react-query'
import { HiOutlineMail } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { MdOutlineCategory } from 'react-icons/md'
import { RiSeedlingLine } from 'react-icons/ri'
// import axiosInstance from '../../api/axios'
import HighlightCard, {
	type HighlightCardProps,
} from '../../components/HighlightCard'
import useGetBlogs from '../../hooks/useGetBlogs'
import useGetEnquiries from '../../hooks/useGetEnquiries'
import useGetNews from '../../hooks/useGetNews'
import useGetProducts from '../../hooks/useGetProducts'

export default function Highlight() {
	const { data, isPending, error } = useGetBlogs()
	const {
		data: products,
		isPending: fetchingProducts,
		error: productsError,
	} = useGetProducts()
	const { data: news, isPending: fetchingNews, error: newsError } = useGetNews()
	const {
		data: enquiries,
		isPending: fetchingenquiries,
		error: enquiriesError,
	} = useGetEnquiries()

	const totalBlogs = Number(data?.africa.total) + Number(data?.export.total)

	const highlights: HighlightCardProps[] = [
		{
			title: 'total products',
			count: Number(products?.total),
			percent: `+${products?.stats.monthly[0].changePercentage || 0}%`,
			info: 'from last month',
			Icon: RiSeedlingLine,
			Icolor: 'text-primary',
			url: '/products',
			disable: fetchingProducts || Boolean(productsError),
		},
		{
			title: 'pending enquiries',
			count: Number(enquiries?.totalEnquiries),
			percent: `+${Number(enquiries?.monthlyStats.changePercentage) || 0}%`,
			info: 'from last month',
			Icon: HiOutlineMail,
			Icolor: 'text-[#D00000]',
			url: '/enquiries',
			disable: fetchingenquiries || Boolean(enquiriesError),
		},
		{
			title: 'total blog stories',
			count: totalBlogs,
			percent: '+3%',
			info: 'from last month',
			Icon: MdOutlineCategory,
			Icolor: 'text-[#0088FF]',
			url: '/blog',
			disable: isPending || Boolean(error),
		},
		{
			title: 'news articles',
			count: Number(news?.total),
			percent: '+8%',
			info: 'from last month',
			Icon: IoNewspaperOutline,
			Icolor: 'text-[#CB30E0]',
			url: 'news',
			disable: fetchingNews || Boolean(newsError),
		},
	]

	return (
		<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8 items-center bg-light-grey dark:bg-dark-grey py-4">
			{highlights.map((card, index) => (
				<HighlightCard key={index} {...card} />
			))}
		</div>
	)
}
