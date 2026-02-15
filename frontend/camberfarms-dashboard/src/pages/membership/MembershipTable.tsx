import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Table } from '../../components/Table'
import type { Membership } from '../../types/membership'

export default function MembershipTable() {
	const { data, isPending, isRefetching } = useQuery({
		queryKey: ['membership'],
		queryFn: async () => {
			const res = await axiosInstance.get('membership')
			return res.data as {
				count: number
				members: Membership[]
			}
		},
		refetchOnWindowFocus: false,
	})

	if (isPending || isRefetching)
		return <div className="w-full text-center">Loading...</div>

	return (
		<div className="w-full mb-10">
			<Table columns={affiliateColumns} data={data?.members} />
		</div>
	)
}

const affiliateColumns = [
	{
		header: 'Farmers',
		key: 'farmers',
		render: (farmer: Membership) => (
			<div className="flex flex-col gap-0.5 text-start lg:w-46">
				<strong className="decoration-0 not-italic font-semibold capitalize">
					{farmer.name}
				</strong>
				<span className="lowercase text-[12px] lg:text-sm xl:text-base">
					{farmer.email}
				</span>
			</div>
		),
	},
	{
		header: 'Country',
		key: 'country',
	},
	{
		header: 'Status',
		key: 'status',
		render: (farmer: Membership) => (
			<span
				className={`${farmer.status === 'reject' ? 'text-[#D00000] bg-[#D00000]/20' : farmer.status === 'pending' ? 'text-[#FF8D28] bg-[#FF8D28]/20' : 'text-primary bg-primary/20'} py-2 px-4 capitalize rounded-full mx-auto`}
			>
				{farmer.status}
			</span>
		),
	},
	{
		header: 'Date',
		key: 'date',
		render: (farmer: Membership) => (
			<span className="text-sm">
				{format(parseISO(farmer.createdAt), 'dd/MM/yyyy | hh:mm a')}
			</span>
		),
	},
	{
		header: 'Action',
		key: 'action',
		render: (farmer: Membership) => (
			<Link
				to={`${farmer._id}`}
				className="text-[#0088FF] w-fit inline-flex mx-auto cursor-pointer"
			>
				<MdOutlineRemoveRedEye size={20} />
			</Link>
		),
	},
]
