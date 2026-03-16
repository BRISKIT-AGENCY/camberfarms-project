import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import type { Membership, MembershipStatus } from '../../types/membership'
import MembershipHeader from './MembershipHeader'
import MembershipTable from './MembershipTable'

export default function MembershipPage() {
	const [status, setStatus] = useState<'all' | MembershipStatus>('all')
	const [q, setQuery] = useState('')
	const { data, isPending } = useQuery({
		queryKey: ['membership'],
		queryFn: async () => {
			const res = await axiosInstance.get('membership')
			return res.data as {
				count: number
				members: Membership[]
			}
		},
		refetchOnWindowFocus: false,
	})

	const members =
		status == 'all'
			? data?.members
			: data?.members.filter((m) => m.status.toLowerCase() == status)

	const filteredMembers =
		members?.filter((m) => {
			const name = m?.name?.toLowerCase() || ''
			const email = m?.email?.toLowerCase() || ''

			return name.includes(q) || email.includes(q)
		}) || []

	if (isPending) return <LoadingSpinner />

	return (
		<section className="w-full p-6">
			<MembershipHeader
				status={status}
				setStatus={setStatus}
				setQuery={setQuery}
				q={q}
			/>
			<MembershipTable members={filteredMembers} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
