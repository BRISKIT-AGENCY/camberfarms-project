import { Outlet } from 'react-router-dom'
import EnquiriesHeader from './EnquiriesHeader'
import EnquiriesTable from './EnquiriesTable'

export default function EnquiriesPage() {
	return (
		<section className="w-full p-6">
			<EnquiriesHeader />
			<EnquiriesTable />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
