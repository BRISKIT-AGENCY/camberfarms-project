import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import axiosInstance from '../../api/axios'
import { Dropzone } from '../../components/Dropzone'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'

type ImageUpload = File[] | File | null
// TODO make this work
export default function AddGallery() {
	const queryClient = useQueryClient()
	const goBack = useGoBack('/gallery')
	const [images, setImages] = useState<ImageUpload>(null)
	const { mutate } = useMutation({
		mutationKey: ['galleries'],
		mutationFn: async (data: ImageUpload) =>
			axiosInstance.post('gallery', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleries'] }),
	})

	async function handleSubmit(images: ImageUpload) {
		const formData = new FormData()
		formData.append('images', JSON.stringify(images))
		// console.log('mutate images: ', images)
		mutate(images)
	}

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
						isMultiple
						styleVariant="h-105 has-[img]:rounded-lg"
						setState={setImages}
					/>
				</div>
				<div className="w-full flex gap-6 items-center justify-end py-6 mt-8 border-t border-grey/50">
					<button
						type="button"
						onClick={() => handleSubmit(images)}
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
