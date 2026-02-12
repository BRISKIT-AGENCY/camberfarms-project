import { useNavigate } from 'react-router-dom'
// import grainImg from '../../assets/img/grains-product.png'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import axiosInstance from '../../api/axios'
// import productImg from '../../assets/img/wheat-product.png'
import CardItem from '../../components/CardItem'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'

export type GalleryImage = {
	_id: string
	createdAt: string
	updatedAt: string
	images: {
		aspectRatio: string
		height: number
		size: number
		width: number
		url: string
		uploadedAt: string
		_id: string
	}[]
}

export default function GalleryContainer() {
	const navigate = useNavigate()
	const refetchGallery = useRefetchQueries('gallery')
	const { data, isPending, error } = useQuery({
		queryKey: ['gallery'],
		queryFn: async () => {
			const res = await axiosInstance.get('gallery')
			return res.data as {
				success: boolean
				total: number
				galleries: GalleryImage[]
			}
		},
	})
	// delete gallery image
	const { mutate: deleteGallery } = useMutation({
		mutationKey: ['gallery'],
		mutationFn: async (id: string) =>
			await axiosInstance.delete(`gallery/${id}`),
		onSuccess: () => {
			refetchGallery()
		},
	})

	const changeImage = (id: string) => {
		navigate(`edit/${id}`)
	}

	if (isPending) return <div className="w-full text-center">Loading...</div>

	return (
		<section className="w-full bg-light-grey dark:bg-dark-grey mb-20">
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{data?.galleries.map((item) => (
					<CardItem
						key={item._id}
						image={item.images[0].url}
						primaryBtnText="change image"
						primaryBtnClick={() => changeImage(item._id)}
						secondaryBtnText="delete"
						secondaryBtnClick={() => deleteGallery(item._id)}
					>
						<div className="w-full px-3 text-grey text-sm font-inter">
							<div className="flex gap-1 items-center justify-between">
								<span>
									Size: {(item.images[0].size / 1024 / 1024).toFixed(3)}MB
								</span>
								<span className="">{10} views</span>
							</div>
							<p className="my-2">
								Dimensions: {item.images[0].width} x {item.images[0].height}
							</p>
							<p className="w-fit my-1 text-sm text-grey">
								Uploaded: {format(new Date(item.updatedAt), 'dd/MM/yyyy')}
							</p>
						</div>
					</CardItem>
				))}
			</div>
			{(error || !data.galleries.length) && (
				<div className="w-full text-center">No gallery images found.</div>
			)}
		</section>
	)
}

// const images: GalleryImage[] = [
// 	{
// 		image: productImg,
// 		dimensions: '1920 x 1080',
// 		size: '2.5mb',
// 		views: 100,
// 		date: '2025-11-12',
// 		id: 1,
// 	},

// 	{
// 		image: productImg,
// 		dimensions: '1920 x 1080',
// 		size: '2.5mb',
// 		views: 100,
// 		date: '2025-11-12',
// 		id: 2,
// 	},

// 	{
// 		image: productImg,
// 		dimensions: '1920 x 1080',
// 		size: '2.5mb',
// 		views: 100,
// 		date: '2025-11-12',
// 		id: 3,
// 	},
// ]
