import user1 from '../assets/img/user-1.png'
import user2 from '../assets/img/user-2.png'
import user3 from '../assets/img/user-3.png'
import GalleryItem from './GalleryItem'

export default function Gallery() {
	const images = [user1, user2, user3, user1]
	return (
		<section
			className="w-full h-fit py-10 md:py-14 px-8 sm:px-12 relative"
			aria-labelledby="gallery"
		>
			<h3
				className="font-poppins capitalize font-bold text-primary text-center text-2xl sm:text-3xl"
				id="gallery"
			>
				Our gallery
			</h3>
			<p className="mt-2 mb-12 mx-4 sm:mx-auto text-base text-center text-dark-grey">
				View pictures of our farm and products below
			</p>
			<div className="w-full flex flex-col sm:flex-row items-center gap-6 my-6 mx-auto">
				<GalleryItem images={images} />
			</div>
		</section>
	)
}
