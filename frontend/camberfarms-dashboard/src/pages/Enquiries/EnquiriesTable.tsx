// import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiReplyLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
// import axiosInstance from '../../api/axios'
import { Table } from '../../components/Table'
import useGetEnquiries from '../../hooks/useGetEnquiries'
import type { Enquiry } from '../../types/enquiry'

export default function EnquiriesTable() {
	const { data, isPending, isRefetching, error } = useGetEnquiries()

	if (isPending || isRefetching) return <div>Loading...</div>

	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<div className="w-full mb-10">
			<Table
				columns={EnquiryColumns}
				data={data?.enquiries}
				wrapContent={true}
			/>
		</div>
	)
}

const EnquiryColumns = [
	{
		header: 'Customer',
		key: 'customer',
		render: (enquiry: Enquiry) => (
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
		header: 'Subject',
		key: 'subject',
		render: (enquiry: Enquiry) => (
			<p className="text-sm ml-0 text-start line-clamp-2">
				Enquiry from {enquiry.sourceModel}
			</p>
		),
	},
	{
		header: 'Website',
		key: 'website',
		render: (enquiry: Enquiry) => (
			<span
				className={`${enquiry.source === 'export' ? 'text-[#FF8D28] bg-[#FF8D28]/20' : 'text-primary bg-primary/20'} py-2 px-4 capitalize rounded-full mx-auto w-32`}
			>
				{enquiry.source}
			</span>
		),
	},
	{
		header: 'Date',
		key: 'date',
		render: (enquiry: Enquiry) => (
			<span className="text-sm">
				{format(parseISO(enquiry.createdAt), 'dd/MM/yyyy | hh:mm a')}
			</span>
		),
	},
	{
		header: 'Action',
		key: 'action',
		render: (enquiry: Enquiry) => (
			<div className="w-fit items-center gap-2 inline-flex mx-auto">
				<Link to={`${enquiry.sourceModel}/${enquiry._id}`}>
					<MdOutlineRemoveRedEye
						size={20}
						className="text-[#0088FF] cursor-pointer"
					/>
				</Link>
				<Link to={`reply/${enquiry.sourceModel}/${enquiry._id}`}>
					<RiReplyLine
						size={20}
						// onClick={() => ReplyInfo(enquiry)}
						className="text-primary cursor-pointer"
					/>
				</Link>
			</div>
		),
	},
]
