import { useQuery } from '@tanstack/react-query'
import { HiOutlineMail } from 'react-icons/hi'
import {
	MdAccessTime,
	MdOutlineDoneAll,
	MdPendingActions,
} from 'react-icons/md'
import axiosInstance from '../../api/axios'
import HighlightCard, {
	type HighlightCardProps,
} from '../../components/HighlightCard'

export default function EnquiriesStats() {
	const { data, isPending, error } = useQuery({
		queryKey: ['enquiries', 'enquiries/stats'],
		queryFn: async () => {
			const [ta, tp, rr, rt] = await Promise.all([
				axiosInstance.get('enquiries/stats/by-month'),
				axiosInstance.get('enquiries/stats/pending-by-week'),
				axiosInstance.get('enquiries/stats/resolution-rate'),
				axiosInstance.get('enquiries/stats/response-time'),
			])
			const [tApproved, tPending, rRate, rTime] = [
				ta.data,
				tp.data,
				rr.data,
				rt.data,
			]
			return { tApproved, tPending, rRate, rTime }
		},
	})

	console.log('enquiries stat: ', data)
	console.log('enquiries stat: ', isPending)
	console.log('enquiries stat: ', error)

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
