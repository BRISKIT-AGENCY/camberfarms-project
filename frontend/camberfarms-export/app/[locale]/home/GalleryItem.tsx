import Image, { StaticImageData } from 'next/image'

type GalleryItemProps = {
	images: string[] | StaticImageData[]
}

export default function GalleryItem({ images }: GalleryItemProps) {
	return (
		<div className="w-full h-75 sm:h-155 xl:h-180 grid grid-rows-[1fr_1fr] grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-4 lg:gap-6 flex-1">
			<Image
				src={images[0]}
				alt=""
				width={600}
				height={400}
				className="w-full h-full col-span-3 rounded-3xl object-fill object-center overflow-hidden"
			/>
			<Image
				src={images[1]}
				alt=""
				width={400}
				height={400}
				className="w-full h-full col-span-2 rounded-3xl object-cover object-center overflow-hidden"
			/>
			<Image
				src={images[2]}
				alt=""
				width={400}
				height={400}
				className="w-full h-full col-span-2 rounded-3xl object-cover object-center overflow-hidden"
			/>
			<Image
				src={images[3]}
				alt=""
				width={600}
				height={400}
				className="w-full h-full col-span-3 rounded-3xl object-cover object-center overflow-hidden"
			/>
		</div>
	)
}
