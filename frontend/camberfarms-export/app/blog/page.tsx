import wheatImg from '@/app/assets/img/wheat.png'
import BlogMain from './BlogMain'
import BlogSidebar from './BlogSidebar'

export default function BlogHome() {
	return (
		<main className="w-full py-20 md:py-52 px-6 md:px-10 lg:px-20 bg-light-grey grid grid-cols-1 md:grid-cols-[55%_auto] gap-32 md:gap-20 items-start relative">
			<BlogMain blogs={articles} />
			<BlogSidebar />
		</main>
	)
}

const articles = [
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		img: undefined,
		content:
			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
		date: 'September 18, 2025',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		img: wheatImg,
		content:
			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
		date: 'September 18, 2025',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		img: undefined,
		content:
			'Increased investment in agricultural infrastructure is helping African producers tap into new markets across Europe and Asia, with maize and sesame leading the surge.',
		date: 'September 18, 2025',
	},
]
