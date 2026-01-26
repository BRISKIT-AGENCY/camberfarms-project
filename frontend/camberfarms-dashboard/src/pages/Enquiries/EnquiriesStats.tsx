import { HiOutlineMail } from 'react-icons/hi'
import {
	MdAccessTime,
	MdOutlineDoneAll,
	MdPendingActions,
} from 'react-icons/md'
import HighlightCard, {
	type HighlightCardProps,
} from '../../components/HighlightCard'

export default function EnquiriesStats() {
	return (
		<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8 items-center bg-light-grey dark:bg-dark-grey py-4">
			{stats.map((card, index) => (
				<HighlightCard key={index} {...card} showArrowUp={false} />
			))}
		</div>
	)
}

const stats: HighlightCardProps[] = [
	{
		title: 'total enquiries',
		count: '12,012',
		percent: '+12%',
		info: 'from last month',
		Icon: HiOutlineMail,
		Icolor: 'text-primary',
		url: '#',
	},
	{
		title: 'pending enquiries',
		count: '23',
		percent: '+3%',
		info: 'from new today',
		Icon: MdPendingActions,
		Icolor: 'text-[#D00000]',
		Tcolor: 'text-[#D00000]',
		url: '#',
	},
	{
		title: 'resolved',
		count: '1,156',
		percent: '+92.7%',
		info: 'resolution rate',
		Icon: MdOutlineDoneAll,
		Icolor: 'text-primary',
		Tcolor: 'text-primary',
		url: '#',
	},
	{
		title: 'average responses',
		count: '202',
		percent: '+8%',
		info: 'improvement',
		Icon: MdAccessTime,
		Icolor: 'text-[#CB30E0]',
		Tcolor: 'text-[#CB30E0]',
		url: '#',
	},
]
