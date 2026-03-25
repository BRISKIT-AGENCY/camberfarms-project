'use client'

import { useTranslations } from 'next-intl'
import GalleryItem from './GalleryItem'

import { Splide, SplideSlide } from 'react-splide-ts'
import 'react-splide-ts/css'
import useGetGalleries from '../hooks/useGetGalleries'
import { useImageCheck } from '../hooks/useImageCheck'
import { GalleryImageItem } from '../types/gallery'
import FallbackGallery from './FallbackGallery'

export default function Gallery() {
	const t = useTranslations('home.gallery')
	const { data, isPending } = useGetGalleries()
	// check if the 1st image in gallery is valid
	const imgWorking = useImageCheck(data?.[0]?.url || '')
	// split images into groups of 4
	const chunkSize = 4
	const gallery: GalleryImageItem[][] = []

	for (let i = 0; i < Number(data?.length); i += chunkSize) {
		const chunk = data?.slice(i, i + chunkSize) || []
		gallery.push(chunk)
	}

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
				{imgWorking ? (
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
							gallery?.map((item, index) => (
								<SplideSlide key={index}>
									<GalleryItem images={item} />
								</SplideSlide>
							))}
					</Splide>
				) : (
					<FallbackGallery />
				)}
			</div>
		</section>
	)
}
