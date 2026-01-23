import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiReplyLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../components/Table'

export type Enquiry = {
	name: string
	email: string
	country: string
	status: 'new' | 'pending' | 'approved'
	website: 'africa' | 'export'
	date: string
	id: string | number
	subject: string
	message: string
	phone: string
}

export default function EnquiriesTable() {
	const navigate = useNavigate()

	const viewInfo = (enquiry: Enquiry) => {
		navigate(`${enquiry.id}`, { state: { enquiry } })
	}
	const ReplyInfo = (enquiry: Enquiry) => {
		navigate(`reply/${enquiry.id}`, { state: { enquiry } })
	}

	// temporarily putting this within the component to pass state across
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
					{enquiry.subject}
				</p>
			),
		},
		{
			header: 'Website',
			key: 'website',
			render: (enquiry: Enquiry) => (
				<span
					className={`${enquiry.website === 'export' ? 'text-[#FF8D28] bg-[#FF8D28]/20' : 'text-primary bg-primary/20'} py-2 px-4 capitalize rounded-full mx-auto w-32`}
				>
					{enquiry.website}
				</span>
			),
		},
		{
			header: 'Date',
			key: 'date',
			render: (enquiry: Enquiry) => (
				<span className="text-sm">{enquiry.date}</span>
			),
		},
		{
			header: 'Action',
			key: 'action',
			render: (enquiry: Enquiry) => (
				<div className="w-fit items-center gap-2 inline-flex mx-auto">
					<MdOutlineRemoveRedEye
						size={20}
						onClick={() => viewInfo(enquiry)}
						className="text-[#0088FF] cursor-pointer"
					/>
					<RiReplyLine
						size={20}
						onClick={() => ReplyInfo(enquiry)}
						className="text-primary cursor-pointer"
					/>
				</div>
			),
		},
	]

	return (
		<div className="w-full mb-10">
			<Table columns={EnquiryColumns} data={EnquiryData} wrapContent={true} />
		</div>
	)
}

const EnquiryData: Enquiry[] = [
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'nigeria',
		status: 'new',
		date: '12/11/2025 | 3:59pm',
		id: 1,
		phone: '080878975656',
		website: 'export',
		subject: 'Enquiry about products exporting',
		message:
			'I am interested in learning more about your organic seeds for my 50-acre corn farm. Could you provide pricing and application guidelines?',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'ghana',
		status: 'pending',
		date: '12/11/2025 | 3:59pm',
		id: 2,
		phone: '080878975656',
		website: 'africa',
		subject: 'partnership opportunity for smart irigation',
		message:
			'I am interested in learning more about your organic seeds for my 50-acre corn farm. Could you provide pricing and application guidelines?',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'nigeria',
		status: 'new',
		date: '12/11/2025 | 3:59pm',
		id: 3,
		phone: '080878975656',
		website: 'export',
		subject: 'Enquiry about products exporting',
		message:
			'I am interested in learning more about your organic seeds for my 50-acre corn farm. Could you provide pricing and application guidelines?',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'ghana',
		status: 'pending',
		date: '12/11/2025 | 3:59pm',
		id: 4,
		phone: '080878975656',
		website: 'africa',
		subject: 'partnership opportunity for smart irigation',
		message:
			'I am interested in learning more about your organic seeds for my 50-acre corn farm. Could you provide pricing and application guidelines?',
	},
]
