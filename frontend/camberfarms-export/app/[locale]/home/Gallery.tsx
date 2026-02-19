'use client'

import { useTranslations } from 'next-intl'
import GalleryItem from './GalleryItem'

import { Splide, SplideSlide } from 'react-splide-ts'
import 'react-splide-ts/css'
import useGetGalleries from '../hooks/useGetGalleries'

export default function Gallery() {
	const t = useTranslations('home.gallery')
	const { data: gallery, isPending } = useGetGalleries()

	if (isPending) return null

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
			<div className="w-full mx-auto">
				<Splide
					aria-label="gallery images"
					// hasTrack={false}
					options={{
						rewind: true,
						autoplay: true,
						arrows: true,
					}}
				>
					{gallery &&
						gallery.map((item) => (
							<SplideSlide key={item._id}>
								<GalleryItem images={item.images} />
							</SplideSlide>
						))}
				</Splide>
			</div>
		</section>
	)
}
