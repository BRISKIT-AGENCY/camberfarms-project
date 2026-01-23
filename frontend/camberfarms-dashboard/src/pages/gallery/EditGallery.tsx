import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation, useParams } from 'react-router-dom'
import { Dropzone } from '../../components/Dropzone'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { GalleryImage } from './GalleryContainer'

export default function EditGallery() {
	const goBack = useGoBack('/gallery')
	const [image, setImage] = useState<File | null>(null)
	const location = useLocation()
	const imageData: GalleryImage = location.state?.image
	const params = useParams()

	useEffect(() => {
		if (!params?.imageId) {
			setTimeout(goBack, 1000)
		}
	}, [params, image, goBack])

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
						image={imageData.image}
					/>
				</div>
				<div className="w-full flex gap-6 items-center justify-end py-6 mt-8 border-t border-grey/50">
					<button
						type="button"
						onClick={goBack}
						className="bg-light-grey text-dark-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
					>
						Save Changes
					</button>
				</div>
			</section>
		</OverlayWrapper>
	)
}
