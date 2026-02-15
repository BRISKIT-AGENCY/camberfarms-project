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
import type {
	FarmFundApproved,
	FarmFundNewReplies,
	FarmFundPending,
	FarmFundReply,
} from '../../types/farm-fund'

export default function FarmFundStats() {
	const { data, isPending, error, isRefetching } = useQuery({
		queryKey: ['farm-fund', 'farm-fund/stats'],
		queryFn: async () => {
			const [a, p, r, n] = await Promise.all([
				axiosInstance.get('farm-fund/stats/approved-by-month'),
				axiosInstance.get('farm-fund/stats/pending-by-week'),
				axiosInstance.get('farm-fund/stats/reply-percentage'),
				axiosInstance.get('farm-fund/stats/new-messages'),
			])
			const [approved, pending, reply, newm] = [a.data, p.data, r.data, n.data]
			return { approved, pending, reply, newm } as {
				approved: FarmFundApproved
				pending: FarmFundPending
				reply: FarmFundReply
				newm: FarmFundNewReplies
			}
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const stats: HighlightCardProps[] = [
		{
			title: 'total investors',
			count: Number(data?.approved?.totalApprovedInvestors) || 0,
			percent: '+12%',
			info: 'from last month',
			Icon: HiOutlineMail,
			Icolor: 'text-primary',
			url: '#',
			disable: isPending || Boolean(error) || isRefetching,
		},
		{
			title: 'pending replies',
			count: Number(data?.pending?.totalPendingReplies) || 0,
			percent: `+${Number(data?.pending?.weeklyBreakdown?.[0]?.percentage) || 0}%`,
			info: 'from last week',
			Icon: MdPendingActions,
			Icolor: 'text-[#D00000]',
			Tcolor: 'text-[#D00000]',
			url: '#',
			disable: isPending || Boolean(error),
		},
		{
			title: 'sent messages',
			count: Number(data?.reply?.repliedForms) || 0,
			percent: `+${Number(data?.reply?.percentage) || 0}%`,
			info: 'verified rate',
			Icon: MdOutlineDoneAll,
			Icolor: 'text-primary',
			Tcolor: 'text-primary',
			url: '#',
			disable: isPending || Boolean(error) || isRefetching,
		},
		{
			title: 'new messages',
			count: Number(data?.newm?.totalNewMessages) || 0,
			percent: `+${Number(data?.newm?.monthlyBreakdown?.[0]?.percentage) || 0}%`,
			info: 'new inputs',
			Icon: MdAccessTime,
			Icolor: 'text-[#0088FF]',
			Tcolor: 'text-[#0088FF]',
			url: '#',
			disable: isPending || Boolean(error) || isRefetching,
		},
	]

	return (
		<div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8 items-center bg-light-grey dark:bg-dark-grey py-4">
			{stats.map((card, index) => (
				<HighlightCard key={index} {...card} showArrowUp={false} />
			))}
		</div>
	)
}
