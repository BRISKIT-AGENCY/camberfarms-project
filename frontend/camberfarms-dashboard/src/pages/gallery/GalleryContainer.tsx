import { useNavigate } from 'react-router-dom'
// import grainImg from '../../assets/img/grains-product.png'
import { format } from 'date-fns'
import productImg from '../../assets/img/wheat-product.png'
import CardItem from '../../components/CardItem'

export type GalleryImage = {
	image: string
	size: string
	dimensions: string
	views: number
	date: string
	id: string | number
}

export default function GalleryContainer() {
	const navigate = useNavigate()

	const changeImage = (image: GalleryImage) => {
		navigate(`edit/${image.id}`, { state: { image } })
	}
	return (
		<section className="w-full bg-light-grey mb-20">
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{images.map((item) => (
					<CardItem
						key={item.id}
						image={item.image}
						primaryBtnText="change image"
						primaryBtnClick={() => changeImage(item)}
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
		</section>
	)
}

const images: GalleryImage[] = [
	{
		image: productImg,
		dimensions: '1920 x 1080',
		size: '2.5mb',
		views: 100,
		date: '2025-11-12',
		id: 1,
	},

	{
		image: productImg,
		dimensions: '1920 x 1080',
		size: '2.5mb',
		views: 100,
		date: '2025-11-12',
		id: 1,
	},

	{
		image: productImg,
		dimensions: '1920 x 1080',
		size: '2.5mb',
		views: 100,
		date: '2025-11-12',
		id: 1,
	},
]
