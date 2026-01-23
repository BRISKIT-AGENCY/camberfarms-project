import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../components/Table'

export type Farmer = {
	name: string
	email: string
	country: string
	status: 'new' | 'pending' | 'approved'
	date: string
	id: string | number
	gender: 'male' | 'female'
	state: string
	region: string
	phone: string
	dob: string
	validID?: string
	action?: () => void
	buyerName?: string
	buyerCountry?: string
	buyerProduct?: string
	productVolume?: string
	aboutInterest: string
	aboutCommission: string
	referralPlatform: string
}

export default function AffilateTable() {
	const navigate = useNavigate()
	const viewInfo = (farmer: Farmer) => {
		navigate(`${farmer.id}`, { state: { farmer } })
	}

	// temporarily putting this within the component to pass state across
	const affiliateColumns = [
		{
			header: 'Farmers',
			key: 'farmers',
			render: (farmer: Farmer) => (
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
			render: (farmer: Farmer) => (
				<span
					className={`${farmer.status === 'new' ? 'text-[#0088FF] bg-[#0088FF]/20' : farmer.status === 'pending' ? 'text-[#FF8D28] bg-[#FF8D28]/20' : 'text-primary bg-primary/20'} py-2 px-4 capitalize rounded-full mx-auto`}
				>
					{farmer.status}
				</span>
			),
		},
		{
			header: 'Date',
			key: 'date',
			render: (farmer: Farmer) => (
				<span className="text-sm">{farmer.date}</span>
			),
		},
		{
			header: 'Action',
			key: 'action',
			render: (farmer: Farmer) => (
				<div className="text-[#0088FF] w-fit inline-flex mx-auto cursor-pointer">
					<MdOutlineRemoveRedEye size={20} onClick={() => viewInfo(farmer)} />
				</div>
			),
		},
	]

	return (
		<div className="w-full mb-10">
			<Table columns={affiliateColumns} data={affiliateData} />
		</div>
	)
}

const affiliateData: Farmer[] = [
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'nigeria',
		status: 'new',
		date: '12/11/2025 | 3:59pm',
		id: 1,
		phone: '080878975656',
		dob: '10-02-1998',
		gender: 'male',
		state: 'rivers',
		region: 'southeast',
		buyerName: 'David Chucks',
		buyerProduct: 'Sesame seeds',
		buyerCountry: 'Nigeria',
		productVolume: '245kg',
		referralPlatform: 'a friend',
		aboutInterest:
			'My interest in Camberfarms is because they are a great Agro-Export company and I want to be part of the company.',
		aboutCommission: 'cash',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'ghana',
		status: 'pending',
		date: '12/11/2025 | 3:59pm',
		id: 2,
		phone: '080878975656',
		dob: '10-02-1998',
		gender: 'male',
		state: 'rivers',
		region: 'southeast',
		buyerName: 'David Chucks',
		buyerProduct: 'Sesame seeds',
		buyerCountry: 'Nigeria',
		productVolume: '245kg',
		referralPlatform: 'a friend',
		aboutInterest:
			'My interest in Camberfarms is because they are a great Agro-Export company and I want to be part of the company.',
		aboutCommission: 'cash',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'congo DR',
		status: 'approved',
		date: '12/11/2025 | 3:59pm',
		id: 3,
		phone: '080878975656',
		dob: '10-02-1998',
		gender: 'male',
		state: 'rivers',
		region: 'southeast',
		buyerName: 'David Chucks',
		buyerProduct: 'Sesame seeds',
		buyerCountry: 'Nigeria',
		productVolume: '245kg',
		referralPlatform: 'a friend',
		aboutInterest:
			'My interest in Camberfarms is because they are a great Agro-Export company and I want to be part of the company.',
		aboutCommission: 'cash',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'nigeria',
		status: 'new',
		date: '12/11/2025 | 3:59pm',
		id: 4,
		phone: '080878975656',
		dob: '10-02-1998',
		gender: 'male',
		state: 'rivers',
		region: 'southeast',
		buyerName: 'David Chucks',
		buyerProduct: 'Sesame seeds',
		buyerCountry: 'Nigeria',
		productVolume: '245kg',
		referralPlatform: 'a friend',
		aboutInterest:
			'My interest in Camberfarms is because they are a great Agro-Export company and I want to be part of the company.',
		aboutCommission: 'cash',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'ghana',
		status: 'pending',
		date: '12/11/2025 | 3:59pm',
		id: 5,
		phone: '080878975656',
		dob: '10-02-1998',
		gender: 'male',
		state: 'rivers',
		region: 'southeast',
		buyerName: 'David Chucks',
		buyerProduct: 'Sesame seeds',
		buyerCountry: 'Nigeria',
		productVolume: '245kg',
		referralPlatform: 'a friend',
		aboutInterest:
			'My interest in Camberfarms is because they are a great Agro-Export company and I want to be part of the company.',
		aboutCommission: 'cash',
	},
	{
		name: 'john smith',
		email: 'johnsmith@gmail.com',
		country: 'congo DR',
		status: 'approved',
		date: '12/11/2025 | 3:59pm',
		id: 6,
		phone: '080878975656',
		dob: '10-02-1998',
		gender: 'male',
		state: 'rivers',
		region: 'southeast',
		buyerName: 'David Chucks',
		buyerProduct: 'Sesame seeds',
		buyerCountry: 'Nigeria',
		productVolume: '245kg',
		referralPlatform: 'a friend',
		aboutInterest:
			'My interest in Camberfarms is because they are a great Agro-Export company and I want to be part of the company.',
		aboutCommission: 'cash',
	},
]
