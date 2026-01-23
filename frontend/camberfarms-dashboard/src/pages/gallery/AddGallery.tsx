import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Dropzone } from '../../components/Dropzone'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'

export default function AddGallery() {
	const goBack = useGoBack('/gallery')
	const [image, setImage] = useState<File | null>(null)

	console.log(image)
	return (
		<OverlayWrapper>
			<section className="w-full">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						upload image
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<div className="w-full">
					<Dropzone
						styleVariant="h-105 has-[img]:rounded-lg"
						setState={setImage}
					/>
				</div>
				<div className="w-full flex gap-6 items-center justify-end py-6 mt-8 border-t border-grey/50">
					<button
						type="button"
						className="bg-transparent text-secondary border-2 border-secondary font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
					>
						Upload to Export
					</button>
					<button className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer">
						Upload to Africa
					</button>
				</div>
			</section>
		</OverlayWrapper>
	)
}
