import { Outlet } from 'react-router-dom'
import FarmFundHeader from './FarmFundHeader'
import FarmFundTable from './FarmFundTable'

export default function FarmFundPage() {
	return (
		<section className="w-full p-6">
			<FarmFundHeader />
			<FarmFundTable />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
