import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import type { FarmFundEnquiry, FarmFundStatus } from '../../types/farm-fund'
import FarmFundHeader from './FarmFundHeader'
import FarmFundTable from './FarmFundTable'

export default function FarmFundPage() {
	const [status, setStatus] = useState<'all' | FarmFundStatus>('all')
	const [q, setQuery] = useState('')
	const { data, error, isPending } = useQuery({
		queryKey: ['farm-fund'],
		queryFn: async () => {
			const res = await axiosInstance.get('farm-fund')
			return res.data as {
				count: number
				registrations: FarmFundEnquiry[]
			}
		},
		refetchOnWindowFocus: false,
	})

	const members =
		status == 'all'
			? data?.registrations
			: data?.registrations.filter((m) => m.status == status)

	const filteredFarmFund =
		members?.filter((f) => {
			const name = f?.name?.toLowerCase() || ''
			const email = f?.email?.toLowerCase() || ''

			return name.includes(q) || email.includes(q)
		}) || []

	if (isPending) return <LoadingSpinner />

	if (error)
		return <div className="px-8">Something went wrong: {error.message}</div>

	return (
		<section className="w-full p-6">
			<FarmFundHeader
				status={status}
				setStatus={setStatus}
				setQuery={setQuery}
				q={q}
			/>
			<FarmFundTable registrations={filteredFarmFund} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
