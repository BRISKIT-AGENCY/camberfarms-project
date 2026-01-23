import { Outlet } from 'react-router-dom'
import AffilateTable from './AffilateTable'
import AffiliateHeader from './AffiliateHeader'

export default function AffiliatePage() {
	return (
		<section className="w-full p-6">
			<AffiliateHeader />
			<AffilateTable />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
