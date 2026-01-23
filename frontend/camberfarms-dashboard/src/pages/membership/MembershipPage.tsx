import { Outlet } from 'react-router-dom'
import MembershipHeader from './MembershipHeader'
import MembershipTable from './MembershipTable'

export default function MembershipPage() {
	return (
		<section className="w-full p-6">
			<MembershipHeader />
			<MembershipTable />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
