import Image, { StaticImageData } from 'next/image'
import { notFound } from 'next/navigation'
import { ProductType } from '../Products'

export type ProductInfoType = {
	name: string
	images: string[] | StaticImageData[]
	desc: string
	info?: string[]
}

type ProductInfoProps = {
	product: ProductType | null
}

export default function ProductInfo({ product }: ProductInfoProps) {
	if (!product) return notFound()

	return (
		<article className="w-full mt-20">
			<h1 className="w-full p-10 capitalize text-center font-poppins font-bold text-2xl md:text-3xl bg-grey text-white mb-10">
				{product.title}
			</h1>
			<div className="w-full px-10 lg:px-14 xl:px-20 py-6 text-grey">
				<div className="w-full flex items-center gap-6 flex-wrap mb-6">
					<Image
						src={product.image}
						alt={product.title}
						width={520}
						height={500}
						// key={index}
						className="w-full flex-1 md:w-1/2 h-87.5 md:h-105 lg:h-130 object-center object-cover"
					/>
					{/* {product.images.map((img, index) => (
					))} */}
				</div>
				<h5 className="font-poppins capitalize font-semibold text-black text-xl sm:text-2xl mb-4">
					{product.title}
				</h5>
				<p>{product.descriptions}</p>
				<ul className="w-full flex flex-col gap-2 mt-4">
					<li className="text-sm marker:hidden">
						- <strong className="not-italic decoration-0">Packaging: </strong>
						<span>{product.packaging}</span>
					</li>
				</ul>
			</div>
		</article>
	)
}
