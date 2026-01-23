import { Outlet } from 'react-router-dom'
import GalleryContainer from './GalleryContainer'
import GalleryHeader from './GalleryHeader'

export default function GalleryPage() {
	return (
		<section className="w-full p-6">
			<GalleryHeader />
			<GalleryContainer />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
