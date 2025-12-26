import Image from 'next/image'
import Link from 'next/link'
import { SecondaryBtnLink } from '../components/Buttons'

import grainsImg from '../assets/img/grain-seed.png'
import pepperImg from '../assets/img/raw-pepper.webp'
import sheaNutImg from '../assets/img/shea-nut.webp'
import soyabeansImg from '../assets/img/soyabeans.png'
import tumericImg from '../assets/img/tumeric.png'
import wheatImg from '../assets/img/wheat.png'

export default function Products() {
	return (
		<section
			className="w-full bg-light-grey py-28 px-6 md:px-12"
			aria-describedby="products"
		>
			<h3 className="font-poppins font-bold text-2xl md:text-3xl" id="products">
				CamberFarm Products
			</h3>
			<p className="mt-2 mb-8 text-base text-dark-grey xl:pr-4">
				We are committed to being among the leading exporter, farmers and
				suppliers of wide range of agricultural products. These products are
				proceserysed under hygienic conditions to ensure long shelf life. With
				excellent packaging and prompt delivery, we have gained a remarkable
				position in the hearts of our esteemed customers.
			</p>

			<SecondaryBtnLink link={'/products'}>all products</SecondaryBtnLink>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">
				{PRODUCTS.map((p) => (
					<Link
						href={`products/${p.id}`}
						key={p.id}
						title={p.name}
						className="w-full flex items-center justify-center h-80 xl:h-96 border-3 border-primary rounded-lg relative"
					>
						<Image
							src={p.img}
							alt={p.name}
							fill
							sizes="300px"
							placeholder="blur"
							className="object-cover object-center"
						/>
						<h6 className="capitalize font-bold text-white text-2xl z-3">
							{p.name}
						</h6>
					</Link>
				))}
			</div>
		</section>
	)
}

const PRODUCTS = [
	{
		id: 1,
		name: 'grain seed',
		img: grainsImg,
	},
	{
		id: 2,
		name: 'tumeric',
		img: tumericImg,
	},
	{
		id: 3,
		name: 'raw pepper',
		img: pepperImg,
	},
	{
		id: 4,
		name: 'shea nut',
		img: sheaNutImg,
	},
	{
		id: 5,
		name: 'soyabeans',
		img: soyabeansImg,
	},
	{
		id: 6,
		name: 'wheat',
		img: wheatImg,
	},
]
