import { useNavigate } from 'react-router-dom'
import grainImg from '../../assets/img/grains-product.png'
import productImg from '../../assets/img/wheat-product.png'
import CardItem from '../../components/CardItem'

export type Product = {
	title: string
	image: string
	desc: string
	quantity: number
	category: string
	status: 'active' | 'inactive'
	id: string | number
}

export default function Products() {
	const navigate = useNavigate()
	const getFlagColor = (category: string) =>
		category == 'grains' ? '#FFFFFF' : '#16A34A'

	const editProduct = (product: Product) => {
		navigate(`edit/${product.id}`, { state: { product } })
	}
	return (
		<section className="w-full bg-light-grey mb-20">
			<h4 className="text-black text-2xl font-semibold">
				Products ({products.length})
			</h4>
			<p className="text-sm text-grey mb-6 mt-2">
				Manage your products inventory
			</p>
			<div className="w-full grid grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{products.map((item) => (
					<CardItem
						key={item.id}
						title={item.title}
						image={item.image}
						flag={item.category}
						flagColor={getFlagColor(item.category)}
						primaryBtnText="edit"
						primaryBtnClick={() => editProduct(item)}
						secondaryBtnText="delete"
						secondaryBtnClick={() => {}}
					>
						<div className="w-full px-2 text-grey">
							<p className="text-sm font-inter">{item.desc}</p>
							<p className="">
								<strong className="decoration-0 not-italic text-grey/60 font-medium">
									Stock:{' '}
								</strong>
								<span className="text-primary font-medium">
									{item.quantity}
								</span>
							</p>
						</div>
					</CardItem>
				))}
			</div>
		</section>
	)
}

const products: Product[] = [
	{
		title: 'premium wheat seeds',
		desc: 'High-yield wheat seeds perfect for commercial farming',
		quantity: 100,
		category: 'spices',
		image: productImg,
		id: 1,
		status: 'active',
	},
	{
		title: 'premium wheat seeds',
		desc: 'High-yield wheat seeds perfect for commercial farming',
		quantity: 100,
		category: 'spices',
		image: productImg,
		id: 2,
		status: 'active',
	},
	{
		title: 'premium wheat seeds',
		desc: 'High-yield wheat seeds perfect for commercial farming',
		quantity: 100,
		category: 'spices',
		image: productImg,
		id: 3,
		status: 'active',
	},
	{
		title: 'premium wheat seeds',
		desc: 'High-yield wheat seeds perfect for commercial farming',
		quantity: 100,
		category: 'grains',
		image: grainImg,
		id: 4,
		status: 'active',
	},
	{
		title: 'premium wheat seeds',
		desc: 'High-yield wheat seeds perfect for commercial farming',
		quantity: 100,
		category: 'grains',
		image: grainImg,
		id: 5,
		status: 'inactive',
	},
	{
		title: 'premium wheat seeds',
		desc: 'High-yield wheat seeds perfect for commercial farming',
		quantity: 100,
		category: 'spices',
		image: productImg,
		id: 6,
		status: 'inactive',
	},
]
