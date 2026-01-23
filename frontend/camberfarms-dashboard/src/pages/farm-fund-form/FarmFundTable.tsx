import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiReplyLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../components/Table'

export type FarmFundEnquiry = {
	name: string
	email: string
	country: string
	status: 'new' | 'pending' | 'replied'
	date: string
	id: string | number
	subject: string
	message: string
	phone: string
}

export default function FarmFundTable() {
	const navigate = useNavigate()

	const viewInfo = (enquiry: FarmFundEnquiry) => {
		navigate(`${enquiry.id}`, { state: { enquiry } })
	}
	const ReplyInfo = (enquiry: FarmFundEnquiry) => {
		navigate(`reply/${enquiry.id}`, { state: { enquiry } })
	}

	// temporarily putting this within the component to pass state across
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
				<p className="text-sm ml-0 text-start line-clamp-2">
					{enquiry.country}
				</p>
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
				<span className="text-sm">{enquiry.date}</span>
			),
		},
		{
			header: 'Action',
			key: 'action',
			render: (enquiry: FarmFundEnquiry) => (
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

const EnquiryData: FarmFundEnquiry[] = [
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'nigeria',
		status: 'new',
		date: '12/11/2025 | 3:59pm',
		id: 1,
		phone: '080878975656',
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
		subject: 'partnership opportunity for smart irigation',
		message:
			'I am interested in learning more about your organic seeds for my 50-acre corn farm. Could you provide pricing and application guidelines?',
	},
]
