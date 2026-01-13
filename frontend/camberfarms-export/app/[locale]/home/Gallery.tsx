'use client'

import { useTranslations } from 'next-intl'
import cashewsImg from '../assets/img/cashews.png'
import cropsImg from '../assets/img/crops.png'
import farmerLadyImg from '../assets/img/farmer-veg.png'
import farmersImg from '../assets/img/farmers.png'
import Carousel from '../components/Carousel'
import GalleryItem from './GalleryItem'

// import Carousel from 'react-multi-carousel'
// import 'react-multi-carousel/lib/styles.css'

export default function Gallery() {
	const t = useTranslations('home.gallery')

	const images = [cropsImg, farmerLadyImg, farmersImg, cashewsImg]

	return (
		<section
			className="w-full h-fit py-10 md:py-14 px-8 sm:px-12 relative"
			aria-labelledby="gallery"
		>
			<h3
				className="font-poppins capitalize font-bold text-primary text-center text-2xl sm:text-3xl"
				id="gallery"
			>
				{t('heading')}
			</h3>
			<p className="mt-2 mb-12 mx-4 sm:mx-auto text-base text-center text-dark-grey">
				{t('paragraph')}
			</p>
			<div className="w-full flex items-center gap-6 my-6 mx-auto">
				<Carousel>
					<GalleryItem images={images} />
					<GalleryItem images={images} />
					<GalleryItem images={images} />
					<GalleryItem images={images} />
				</Carousel>
			</div>
		</section>
	)
}
