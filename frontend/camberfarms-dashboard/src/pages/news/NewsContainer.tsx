import { useNavigate } from 'react-router-dom'
// import grainImg from '../../assets/img/grains-product.png'
import { format } from 'date-fns'
import { FaArrowRight } from 'react-icons/fa6'
import productImg from '../../assets/img/wheat-product.png'
import CardItem from '../../components/CardItem'

export type News = {
	title: string
	image: string
	excerpt: string
	views: number
	date: string
	category: string
	id: string | number
}

export default function NewsContainer() {
	const navigate = useNavigate()

	const editNews = (news: News) => {
		navigate(`edit/${news.id}`, { state: { news } })
	}
	return (
		<section className="w-full bg-light-grey mb-20">
			<h4 className="text-black text-2xl font-semibold">News &amp; Insights</h4>
			<p className="text-sm text-grey mb-6 mt-2">
				({news.length}) articles found
			</p>
			<div className="w-full grid grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{news.map((item) => (
					<CardItem
						cardVariant="has-[button]:w-full"
						key={item.id}
						title={item.title}
						image={item.image}
						primaryBtnText="edit"
						primaryBtnClick={() => editNews(item)}
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

const news: News[] = [
	{
		title: 'Revolutionary Smart Irrigation System Increases Crop Yield by 40%',
		excerpt:
			'As global demand for ethically sourced food grows, African exporters are turning to eco-friendly...',
		views: 100,
		category: 'sustainability',
		image: productImg,
		date: '2025-11-12',
		id: 1,
	},
	{
		title: 'Organic Farming Practices Show 25% Increase in Soil Health',
		excerpt:
			'Recent studies demonstrate the long-term benefits of organic farming methods on soil...',
		views: 100,
		category: 'sustainability',
		image: productImg,
		date: '2025-11-12',
		id: 2,
	},
	{
		title: 'Precision Agriculture: GPS-Guided Tractors Improve Efficiency',
		excerpt:
			'Advanced GPS technology in agricultural machinery is revolutionizing field and more...',
		views: 100,
		category: 'sustainability',
		image: productImg,
		date: '2025-11-12',
		id: 3,
	},
]
