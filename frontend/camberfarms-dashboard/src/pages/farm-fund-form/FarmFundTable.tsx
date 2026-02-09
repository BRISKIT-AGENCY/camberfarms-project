import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiReplyLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Table } from '../../components/Table'
import type { FarmFundEnquiry } from '../../types/farm-fund'

export default function FarmFundTable() {
	const { data, error, isPending, isRefetching } = useQuery({
		queryKey: ['farm-fund'],
		queryFn: async () => {
			const res = await axiosInstance.get('farm-fund')
			return res.data as {
				count: number
				registrations: FarmFundEnquiry[]
			}
		},
	})

	if (isPending || isRefetching) return <div>Loading...</div>
	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<div className="w-full mb-10">
			<Table
				columns={EnquiryColumns}
				data={data?.registrations}
				wrapContent={true}
			/>
		</div>
	)
}

const EnquiryColumns = [
	{
		header: 'Farmers',
		key: 'farmers',
		render: (enquiry: FarmFundEnquiry) => (
			<div className="flex flex-col gap-0.5 text-start lg:w-46">
				<strong className="decoration-0 not-italic font-semibold capitalize">
					{enquiry.name}
				</strong>
				<span className="lowercase text-[12px] lg:text-sm xl:text-base">
					{enquiry.email}
				</span>
			</div>
		),
	},
	{
		header: 'Country',
		key: 'country',
		render: (enquiry: FarmFundEnquiry) => (
			<p className="text-sm ml-0 text-start line-clamp-2">{enquiry.country}</p>
		),
	},
	{
		header: 'Status',
		key: 'status',
		render: (enquiry: FarmFundEnquiry) => (
			<span
				className={`${enquiry.status === 'new' ? 'text-[#0088FF] bg-[#0088FF]/20' : enquiry.status === 'pending' ? 'text-[#FF8D28] bg-[#FF8D28]/20' : 'text-primary bg-primary/20'} py-2 px-4 capitalize rounded-full mx-auto`}
			>
				{enquiry.status}
			</span>
		),
	},
	{
		header: 'Date',
		key: 'date',
		render: (enquiry: FarmFundEnquiry) => (
			<span className="text-sm">
				{format(parseISO(enquiry.createdAt), 'dd/MM/yyyy | hh:mm a')}
			</span>
		),
	},
	{
		header: 'Action',
		key: 'action',
		render: (enquiry: FarmFundEnquiry) => (
			<div className="w-fit items-center gap-2 inline-flex mx-auto">
				<Link to={`${enquiry._id}`}>
					<MdOutlineRemoveRedEye
						size={20}
						className="text-[#0088FF] cursor-pointer"
					/>
				</Link>
				<Link to={`reply/${enquiry._id}`}>
					<RiReplyLine size={20} className="text-primary cursor-pointer" />
				</Link>
			</div>
		),
	},
]
