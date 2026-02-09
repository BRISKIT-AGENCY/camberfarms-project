import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Table } from '../../components/Table'
import type { Affiliate } from '../../types/affiliate'

export default function AffilateTable() {
	const { data, isPending, isRefetching } = useQuery({
		queryKey: ['affiliates'],
		queryFn: async () => {
			const res = await axiosInstance.get('affiliate')
			return res.data as {
				total: number
				data: Affiliate[]
			}
		},
	})

	if (isPending || isRefetching)
		return <div className="w-full text-center">Loading...</div>

	return (
		<div className="w-full mb-10">
			<Table columns={affiliateColumns} data={data?.data} />
		</div>
	)
}

const affiliateColumns = [
	{
		header: 'Farmers',
		key: 'farmers',
		render: (affiliate: Affiliate) => (
			<div className="flex flex-col gap-0.5 text-start lg:w-46">
				<strong className="decoration-0 not-italic font-semibold capitalize">
					{affiliate.fullName}
				</strong>
				<span className="lowercase text-[12px] lg:text-sm xl:text-base">
					{affiliate.email}
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
		render: (affiliate: Affiliate) => (
			<span
				className={`${affiliate.status === 'rejected' ? 'text-[#D00000] bg-[#D00000]/20' : affiliate.status === 'pending' ? 'text-[#FF8D28] bg-[#FF8D28]/20' : 'text-primary bg-primary/20'} py-2 px-4 capitalize rounded-full mx-auto`}
			>
				{affiliate.status}
			</span>
		),
	},
	{
		header: 'Date',
		key: 'date',
		render: (affiliate: Affiliate) => (
			<span className="text-sm">
				{format(parseISO(affiliate.createdAt), 'dd/MM/yyyy | hh:mm a')}
			</span>
		),
	},
	{
		header: 'Action',
		key: 'action',
		render: (affiliate: Affiliate) => (
			<Link
				to={`${affiliate._id}`}
				className="text-[#0088FF] w-fit inline-flex mx-auto cursor-pointer"
			>
				<MdOutlineRemoveRedEye size={20} />
			</Link>
		),
	},
]
