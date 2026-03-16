'use client'

import Image from 'next/image'
import { GalleryImageItem } from '../types/gallery'

type GalleryItemProps = {
	images: GalleryImageItem[]
}

export default function GalleryItem({ images }: GalleryItemProps) {
	// console.log(images[0].url)
	if (!images?.[0]?.url) return null

	return (
		<div className="w-full h-75 sm:h-155 xl:h-180 grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 lg:gap-6 flex-1">
			<Image
				src={images?.[0]?.url}
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-3 rounded-3xl object-fill object-center overflow-hidden"
			/>
			<Image
				src={images?.[1]?.url || images?.[0]?.url}
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-2 rounded-3xl object-cover object-center overflow-hidden"
			/>
			<Image
				src={images?.[2]?.url || images?.[0]?.url}
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-2 rounded-3xl object-cover object-center overflow-hidden"
			/>
			<Image
				src={images?.[3]?.url || images?.[0]?.url}
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-3 rounded-3xl object-cover object-center overflow-hidden"
			/>
		</div>
	)
}
