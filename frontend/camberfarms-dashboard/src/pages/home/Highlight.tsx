import { HiOutlineMail } from 'react-icons/hi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { MdOutlineCategory } from 'react-icons/md'
import { RiSeedlingLine } from 'react-icons/ri'
import HighlightCard, {
	type HighlightCardProps,
} from '../../components/HighlightCard'

export default function Highlight() {
	return (
		<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8 items-center bg-light-grey py-4">
			{highlights.map((card, index) => (
				<HighlightCard key={index} {...card} />
			))}
		</div>
	)
}

const highlights: HighlightCardProps[] = [
	{
		title: 'total products',
		count: '1,247',
		percent: '+12%',
		info: 'from last month',
		Icon: RiSeedlingLine,
		Icolor: 'text-primary',
		url: '/products',
	},
	{
		title: 'pending enquiries',
		count: '32',
		percent: '+15%',
		info: 'from last month',
		Icon: HiOutlineMail,
		Icolor: 'text-[#D00000]',
		url: '/enquiries',
	},
	{
		title: 'total blog stories',
		count: '24',
		percent: '+3%',
		info: 'from last month',
		Icon: MdOutlineCategory,
		Icolor: 'text-[#0088FF]',
		url: '/blog',
	},
	{
		title: 'news articles',
		count: '159',
		percent: '+8%',
		info: 'from last month',
		Icon: IoNewspaperOutline,
		Icolor: 'text-[#CB30E0]',
		url: 'news',
	},
]
