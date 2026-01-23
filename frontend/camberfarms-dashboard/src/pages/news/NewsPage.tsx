import { Outlet } from 'react-router-dom'
import NewsContainer from './NewsContainer'
import NewsHeader from './NewsHeader'

export default function NewsPage() {
	return (
		<section className="w-full p-6">
			<NewsHeader />
			<NewsContainer />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
