import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import useGetEnquiries from '../../hooks/useGetEnquiries'
import EnquiriesHeader from './EnquiriesHeader'
import EnquiriesTable from './EnquiriesTable'

export default function EnquiriesPage() {
	const [site, setSite] = useState<'all' | 'africa' | 'export'>('all')
	const [q, setQuery] = useState('')

	const { data, isPending, error } = useGetEnquiries()

	const enquiry =
		site == 'all'
			? data?.enquiries
			: data?.enquiries.filter((e) => e.source == site)

	const filteredEnquiry =
		enquiry?.filter((a) => {
			const name = a?.name?.toLowerCase() || ''
			const message = a?.message?.toLowerCase() || ''

			return name.includes(q) || message.includes(q)
		}) || []

	if (isPending) return <LoadingSpinner />

	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<section className="w-full p-6">
			<EnquiriesHeader
				site={site}
				setSite={setSite}
				setQuery={setQuery}
				q={q}
			/>
			<EnquiriesTable enquiries={filteredEnquiry} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
