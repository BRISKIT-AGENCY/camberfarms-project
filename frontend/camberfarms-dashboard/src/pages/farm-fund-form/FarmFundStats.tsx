import { HiOutlineMail } from 'react-icons/hi'
import {
	MdAccessTime,
	MdOutlineDoneAll,
	MdPendingActions,
} from 'react-icons/md'
import HighlightCard, {
	type HighlightCardProps,
} from '../../components/HighlightCard'

export default function FarmFundStats() {
	return (
		<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8 items-center bg-light-grey py-4">
			{stats.map((card, index) => (
				<HighlightCard key={index} {...card} showArrowUp={false} />
			))}
		</div>
	)
}

const stats: HighlightCardProps[] = [
	{
		title: 'total applications',
		count: '12,012',
		percent: '+12%',
		info: 'from last month',
		Icon: HiOutlineMail,
		Icolor: 'text-primary',
		url: '#',
	},
	{
		title: 'pending applications',
		count: '23',
		percent: '+3%',
		info: 'from last week',
		Icon: MdPendingActions,
		Icolor: 'text-[#D00000]',
		Tcolor: 'text-[#D00000]',
		url: '#',
	},
	{
		title: 'approved affiliate',
		count: '1,156',
		percent: '+92.7%',
		info: 'verified rate',
		Icon: MdOutlineDoneAll,
		Icolor: 'text-primary',
		Tcolor: 'text-primary',
		url: '#',
	},
	{
		title: 'new applications',
		count: '202',
		percent: '+8%',
		info: 'new inputs',
		Icon: MdAccessTime,
		Icolor: 'text-[#0088FF]',
		Tcolor: 'text-[#0088FF]',
		url: '#',
	},
]
