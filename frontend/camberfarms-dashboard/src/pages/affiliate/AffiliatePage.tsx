import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import type { Affiliate, AffiliateStatus } from '../../types/affiliate'
import AffilateTable from './AffilateTable'
import AffiliateHeader from './AffiliateHeader'

export default function AffiliatePage() {
	const [status, setStatus] = useState<'all' | AffiliateStatus>('all')
	const [q, setQuery] = useState('')
	const { data, isPending, error } = useQuery({
		queryKey: ['affiliates'],
		queryFn: async () => {
			const res = await axiosInstance.get('affiliate')
			return res.data as {
				total: number
				data: Affiliate[]
			}
		},
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const affiliate =
		status == 'all' ? data?.data : data?.data.filter((a) => a.status == status)

	const filteredAffiliate =
		affiliate?.filter((a) => {
			const name = a?.fullName?.toLowerCase() || ''
			const email = a?.email?.toLowerCase() || ''

			return name.includes(q) || email.includes(q)
		}) || []

	if (isPending) return <LoadingSpinner />

	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<section className="w-full p-6">
			<AffiliateHeader
				status={status}
				setStatus={setStatus}
				setQuery={setQuery}
				q={q}
			/>
			<AffilateTable affiliates={filteredAffiliate} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
