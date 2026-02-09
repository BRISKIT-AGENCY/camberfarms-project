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
	MembershipApproved,
	MembershipNewReplies,
	MembershipPending,
	MembershipReply,
} from '../../types/membership'

export default function MembershipStats() {
	const { data, isPending, error, isRefetching } = useQuery({
		queryKey: ['membership', 'membership/stats'],
		queryFn: async () => {
			const [a, p, r, n] = await Promise.all([
				axiosInstance.get('membership/stats/forms-by-month'),
				axiosInstance.get('membership/stats/pending-by-week'),
				axiosInstance.get('membership/stats/approved-percentage'),
				axiosInstance.get('membership/stats/new-messages'),
			])
			const [approved, pending, reply, newm] = [a.data, p.data, r.data, n.data]
			return { approved, pending, reply, newm } as {
				approved: MembershipApproved
				pending: MembershipPending
				reply: MembershipReply
				newm: MembershipNewReplies
			}
		},
	})

	const stats: HighlightCardProps[] = [
		{
			title: 'total applications',
			count: Number(data?.approved?.totalForms) || 0,
			percent: '+12%',
			info: 'from last month',
			Icon: HiOutlineMail,
			Icolor: 'text-primary',
			url: '#',
			disable: isPending || Boolean(error) || isRefetching,
		},
		{
			title: 'pending',
			count: Number(data?.pending?.totalPendingReplies) || 0,
			percent: `+${Number(data?.pending?.weeklyBreakdown?.[0]?.percentage) || 0}%`,
			info: 'from last week',
			Icon: MdPendingActions,
			Icolor: 'text-[#D00000]',
			Tcolor: 'text-[#D00000]',
			url: '#',
			disable: isPending || Boolean(error) || isRefetching,
		},
		{
			title: 'approved',
			count: Number(data?.reply?.totalApproved) || 0,
			percent: `+${Number(data?.reply?.approvedPercentage) || 0}%`,
			info: 'verified rate',
			Icon: MdOutlineDoneAll,
			Icolor: 'text-primary',
			Tcolor: 'text-primary',
			url: '#',
			disable: isPending || Boolean(error) || isRefetching,
		},
		{
			title: 'new applications',
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
