// 'use client'

import Image from 'next/image'
import img4 from '../assets/img/farm-man.webp'
import img1 from '../assets/img/farmer-veg.png'
import img2 from '../assets/img/raw-pepper.webp'
import img3 from '../assets/img/tumeric.png'

export default function FallbackGallery() {
	return (
		<div className="w-full h-75 sm:h-155 xl:h-180 grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 lg:gap-6 flex-1">
			<Image
				src={img1}
				placeholder="blur"
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-3 rounded-3xl object-fill object-center overflow-hidden"
			/>
			<Image
				src={img2}
				placeholder="blur"
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-2 rounded-3xl object-cover object-center overflow-hidden"
			/>
			<Image
				src={img3}
				placeholder="blur"
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-2 rounded-3xl object-cover object-center overflow-hidden"
			/>
			<Image
				src={img4}
				placeholder="blur"
				alt=""
				sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
				width={600}
				height={400}
				className="w-full h-full col-span-3 rounded-3xl object-cover object-center overflow-hidden"
			/>
		</div>
	)
}
