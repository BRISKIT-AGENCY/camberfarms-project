import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Dropzone } from '../../components/Dropzone'
import LoadingSpinner from '../../components/LoadingSpinner'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { GalleryImage } from './GalleryContainer'

type ImageUpload = File[] | null

export default function EditGallery() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const goBack = useGoBack('/gallery')
	const [image, setImage] = useState<File[] | null>(null)
	const params = useParams()
	// fetch image details
	const { data, isPending, error } = useQuery({
		queryKey: ['gallery', params.imageId],
		queryFn: async () => {
			const { data } = await axiosInstance.get(`gallery/${params.imageId}`)
			return data as {
				success: boolean
				image: GalleryImage
			}
		},
		enabled: !!params.imageId,
	})
	// Upload new image
	const { mutate, isPending: updating } = useMutation({
		mutationFn: async (data: FormData) =>
			axiosInstance.patch(`gallery/${params.imageId}`, data),
		onSuccess: () => {
			toast.success('gallery updated successful')
			queryClient.invalidateQueries({ queryKey: ['gallery'] })
			navigate('/gallery')
		},
	})

	useEffect(() => {
		if (!params?.imageId) {
			const timer = setTimeout(goBack, 1000)
			return () => clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.imageId])

	async function handleSubmit(images: ImageUpload) {
		if (!images || images.length === 0) {
			toast.error('Please upload an image')
			return
		}
		const formData = new FormData()

		if (Array.isArray(images) && images.length > 0) {
			images.forEach((file) => {
				formData.append('image', file)
			})
		}

		mutate(formData)
	}

	if (isPending) return <LoadingSpinner />

	return (
		<OverlayWrapper>
			<section className="w-full">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						Edit image
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				{error && (
					<p className="text-red-400 my-2" aria-live="assertive">
						{error.message}
					</p>
				)}
				<div className="w-full">
					<Dropzone
						styleVariant="h-105 has-[img]:rounded-lg"
						setState={setImage}
						isMultiple
						image={data?.image?.url}
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
						type="button"
						onClick={() => handleSubmit(image)}
						disabled={updating}
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer disabled:opacity-50"
					>
						{updating ? 'Loading...' : 'Save Changes'}
					</button>
				</div>
			</section>
		</OverlayWrapper>
	)
}
