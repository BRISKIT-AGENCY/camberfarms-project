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
	const [query, setQuery] = useState('')
	const { data, isPending, isRefetching, error } = useQuery({
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

	const filteredNames =
		affiliate?.filter((a) => a.fullName.toLowerCase().includes(query)) || []
	const filteredEmail = affiliate?.filter((a) => a.email.includes(query)) || []

	const filteredAffiliate = [...filteredNames, ...filteredEmail]

	if (isPending || isRefetching) return <LoadingSpinner />

	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<section className="w-full p-6">
			<AffiliateHeader
				status={status}
				setStatus={setStatus}
				setQuery={setQuery}
				q={query}
			/>
			<AffilateTable affiliates={filteredAffiliate} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
