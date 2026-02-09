import { useNavigate } from 'react-router-dom'
// import grainImg from '../../assets/img/grains-product.png'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import axiosInstance from '../../api/axios'
// import productImg from '../../assets/img/wheat-product.png'
import CardItem from '../../components/CardItem'

export type GalleryImage = {
	image: string
	size: string
	dimensions: string
	views: number
	date: string
	_id: string
}

export default function GalleryContainer() {
	const navigate = useNavigate()
	const { data, isPending, error } = useQuery({
		queryKey: ['galleries'],
		queryFn: async () => {
			const res = await axiosInstance.get('gallery')
			return res.data as {
				success: boolean
				total: number
				galleries: GalleryImage[]
			}
		},
	})
	const images = data?.galleries || []

	const changeImage = (id: string) => {
		navigate(`edit/${id}`)
	}

	if (isPending) return <div className="w-full text-center">Loading...</div>

	return (
		<section className="w-full bg-light-grey dark:bg-dark-grey mb-20">
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{images.map((item) => (
					<CardItem
						key={item._id}
						image={item.image}
						primaryBtnText="change image"
						primaryBtnClick={() => changeImage(item._id)}
						secondaryBtnText="delete"
						secondaryBtnClick={() => {}}
					>
						<div className="w-full px-3 text-grey text-sm font-inter">
							<div className="flex gap-1 items-center justify-between">
								<span>Size: {item.size}</span>
								<span className="">{item.views} views</span>
							</div>
							<p className="my-2">Dimensions: {item.dimensions}</p>
							<p className="w-fit my-1 text-sm text-grey">
								Uploaded: {format(new Date(item.date), 'dd/MM/yyyy')}
							</p>
						</div>
					</CardItem>
				))}
			</div>
			{(error || !images.length) && (
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
