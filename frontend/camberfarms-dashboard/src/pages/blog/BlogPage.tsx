import { Outlet } from 'react-router-dom'
import BlogContainer from './BlogContainer'
import BlogHeader from './BlogHeader'

export default function BlogPage() {
	return (
		<section className="w-full p-6">
			<BlogHeader />
			<BlogContainer />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
