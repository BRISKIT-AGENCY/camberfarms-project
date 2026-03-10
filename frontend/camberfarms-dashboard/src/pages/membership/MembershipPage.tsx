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
	const [query, setQuery] = useState('')
	const { data, isPending, isRefetching } = useQuery({
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

	const filteredNames =
		members?.filter((m) => m.name.toLowerCase().includes(query)) || []
	const filteredEmail = members?.filter((m) => m.email.includes(query)) || []

	const filteredMembers = [...filteredNames, ...filteredEmail]

	if (isPending || isRefetching) return <LoadingSpinner />

	return (
		<section className="w-full p-6">
			<MembershipHeader
				status={status}
				setStatus={setStatus}
				setQuery={setQuery}
				q={query}
			/>
			<MembershipTable members={filteredMembers} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
