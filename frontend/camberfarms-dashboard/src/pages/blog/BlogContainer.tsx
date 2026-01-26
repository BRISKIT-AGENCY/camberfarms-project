import { format } from 'date-fns'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import CardItem from '../../components/CardItem'

export type Blog = {
	title: string
	image?: string
	excerpt: string
	views: number
	date: string
	website: 'africa' | 'export'
	id: string | number
}

export default function BlogContainer() {
	const navigate = useNavigate()

	const editBlog = (blog: Blog) => {
		navigate(`edit/${blog.id}`, { state: { blog } })
	}
	return (
		<section className="w-full bg-light-grey dark:bg-dark-grey mb-20">
			<h4 className="text-black dark:text-white text-2xl font-semibold">
				blog post
			</h4>
			<p className="text-sm text-grey mb-6 mt-2">
				({blog.length}) articles found
			</p>
			<div className="w-full grid grid-cols-1 xl:grid-cols-2 items-stretch gap-x-10 gap-y-6 mt-6">
				{blog.map((item) => (
					<CardItem
						cardVariant="border border-primary p-4 has-[button]:w-full"
						key={item.id}
						title={item.title}
						// image={item.image}
						primaryBtnText="edit"
						flag={item.website}
						flagColor={item.website === 'africa' ? '#16A34A' : '#FF741F'}
						primaryBtnClick={() => editBlog(item)}
						secondaryBtnText="delete"
						secondaryBtnClick={() => {}}
					>
						<div className="w-full px-3 text-grey">
							<p className="text-sm font-inter">{item.excerpt}</p>
							<p className="w-fit ml-auto my-1 text-sm text-grey">
								{format(new Date(item.date), 'dd/MM/yyyy')}
							</p>
							<p className="text-grey flex gap-1 items-center">
								<FaArrowRight />
								<span className="">{item.views} views</span>
							</p>
						</div>
					</CardItem>
				))}
			</div>
		</section>
	)
}

const blog: Blog[] = [
	{
		title: 'Revolutionary Smart Irrigation System Increases Crop Yield by 40%',
		excerpt:
			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
		views: 100,
		date: '2025-11-12',
		id: 1,
		website: 'africa',
	},
	{
		title: 'Organic Farming Practices Show 25% Increase in Soil Health',
		excerpt:
			'Recent studies demonstrate the long-term benefits of organic farming methods on soil...',
		views: 100,
		date: '2025-11-12',
		id: 2,
		website: 'export',
	},
	{
		title: 'Precision Agriculture: GPS-Guided Tractors Improve Efficiency',
		excerpt:
			'Advanced GPS technology in agricultural machinery is revolutionizing field and more...',
		views: 100,
		date: '2025-11-12',
		id: 3,
		website: 'africa',
	},
]
