import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import useGetEnquiries from '../../hooks/useGetEnquiries'
import EnquiriesHeader from './EnquiriesHeader'
import EnquiriesTable from './EnquiriesTable'

export default function EnquiriesPage() {
	const [site, setSite] = useState<'all' | 'africa' | 'export'>('all')
	const [query, setQuery] = useState('')

	const { data, isPending, isRefetching, error } = useGetEnquiries()

	const enquiry =
		site == 'all'
			? data?.enquiries
			: data?.enquiries.filter((e) => e.source == site)

	const filteredEnquiry =
		enquiry?.filter((e) => e.message.includes(query)) ||
		enquiry?.filter((e) => e.name.includes(query)) ||
		[]

	if (isPending || isRefetching) return <LoadingSpinner />

	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<section className="w-full p-6">
			<EnquiriesHeader
				site={site}
				setSite={setSite}
				setQuery={setQuery}
				q={query}
			/>
			<EnquiriesTable enquiries={filteredEnquiry} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
