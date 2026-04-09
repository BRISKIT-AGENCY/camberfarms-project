'use client'

import { useTranslations } from 'next-intl'
import GalleryItem from './GalleryItem'

import { Splide, SplideSlide } from 'react-splide-ts'
import 'react-splide-ts/css'
import useGetGalleries from '../hooks/useGetGalleries'
import { GalleryImageItem } from '../types/gallery'

export default function Gallery() {
	const t = useTranslations('home.gallery')
	const { data, isPending } = useGetGalleries()
	// flatten all images into one array
	const images =
		data?.reduce(
			(acc: GalleryImageItem[], curr) => acc.concat(curr.images),
			[],
		) || []

	const chunkSize = 4
	const gallery: GalleryImageItem[][] = []
	// split images into groups of 4
	for (let i = 0; i < Number(images.length); i += chunkSize) {
		const chunk = images.slice(i, i + chunkSize) || []
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
				<Splide
					aria-label="gallery images"
					// hasTrack={false}
					options={{
						rewind: true,
						autoplay: true,
						arrows: true,
					}}
				>
					{gallery?.length > 0 &&
						gallery?.map((item, index) => (
							<SplideSlide key={index}>
								<GalleryItem images={item} />
							</SplideSlide>
						))}
				</Splide>
			</div>
		</section>
	)
}
