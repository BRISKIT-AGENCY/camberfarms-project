import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import CardItem from '../../components/CardItem'
import useGetNews from '../../hooks/useGetNews'

export default function NewsContainer() {
	const navigate = useNavigate()
	const editNews = (id: string) => {
		navigate(`edit/${id}`)
	}
	const queryClient = useQueryClient()
	// fetch news
	const { data: news, isPending } = useGetNews()

	// delete news
	const { mutate } = useMutation({
		mutationKey: ['news'],
		mutationFn: async (id: string) => await axiosInstance.delete(`news/${id}`),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ['news'],
			}),
	})

	// console.log('news: ', news)

	if (isPending) return <div className="w-full text-center">Loading...</div>

	return (
		<section className="w-full bg-light-grey dark:bg-dark-grey mb-20">
			<h4 className="text-black dark:text-white text-2xl font-semibold">
				News &amp; Insights
			</h4>
			<p className="text-sm text-grey mb-6 mt-2">
				({news?.total}) articles found
			</p>
			<div className="w-full grid grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{news?.news.map((item) => (
					<CardItem
						cardVariant="has-[button]:w-full"
						key={item._id}
						title={item.translations.en.title}
						image={item.image}
						primaryBtnText="edit"
						primaryBtnClick={() => editNews(item._id)}
						secondaryBtnText="delete"
						secondaryBtnClick={() => mutate(item._id)}
					>
						<div className="w-full px-3 text-grey">
							<p className="text-sm font-inter">
								{item.translations.en.excerpt}
							</p>
							<p className="w-fit ml-auto my-1 text-sm text-grey">
								{format(new Date(item.publishedAt), 'dd/MM/yyyy')}
							</p>
							<p className="text-grey flex gap-1 items-center">
								<FaArrowRight />
								<span className="">{item.viewCount || 0} views</span>
							</p>
						</div>
					</CardItem>
				))}
			</div>
		</section>
	)
}
