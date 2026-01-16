import ProductItem from './ProductItem'

import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import axiosInstance from '../api/axios'
import pepperImg from '../assets/img/black-pepper.webp'
import cashewImg from '../assets/img/cashew.webp'
import grainsImg from '../assets/img/grain-seed.png'
import tumericImg from '../assets/img/tumeric-root.webp'

export type ProductType = {
	_id: string
	containerSize: string
	createdAt: string
	descriptions: string
	image: string
	incoterms: string[]
	packaging: string
	seasons: string
	title: string
	updatedAt: string
	variants: [
		{
			name: string
			image: string
			minimumOrder: number
			maximumOrder: number
		}
	]
}

async function getProducts(): Promise<ProductType[] | null> {
	try {
		const res = await axiosInstance.get(`/products`)
		return res.data
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.response?.status === 404) {
			notFound()
		}

		// console.error(
		//   'Failed to fetch blog:',
		//   error.response?.data || error.message
		// )
		// throw Error('Failed to fetch blog')
		// console.log doesn't work in server components
		return null
	}
}

export default async function Products() {
	const t = await getTranslations('products.products')

	const products = await getProducts()

	if (!products) return notFound()

	return (
		<section className="w-full pt-8 bg-white" aria-describedby="products">
			<h4
				className="font-poppins font-semibold text-base sm:text-xl md:text-2xl text-center text-primary"
				id="products"
			>
				{t('heading')}
			</h4>

			<div className="w-full flex flex-col gap-28 mt-8 bg-light-green py-20 px-6 md:px-12">
				{products.map((item) => (
					<ProductItem
						key={item._id}
						id={item._id}
						name={item.title}
						img={item.image}
						content={`${item.descriptions} ${item.containerSize} ${item.packaging} ${item.seasons}`}
					/>
				))}
			</div>
		</section>
	)
}

{
	/* <div><ProductItem
					name="black pepper"
					img={pepperImg}
					content="Our Wheat grain is available in two forms; solid grains and powdered grains (grinded/broken).The grains are sourced directly from the farms and transported to our cleaning facility where they are properly processed by hand picking to ensure final product is free of debris and unwanted particles.product is shipped in 25kg to 50kg bags in 40ft containers, containing 12 tons of products.
current capacity is 10 containers monthly. Total monthly production volume is 120MT or 120,000 kilos."
				/>
				<ProductItem
					name="raw cashew nuts"
					img={cashewImg}
					content="Our Wheat grain is available in two forms; solid grains and powdered grains (grinded/broken).The grains are sourced directly from the farms and transported to our cleaning facility where they are properly processed by hand picking to ensure final product is free of debris and unwanted particles.product is shipped in 25kg to 50kg bags in 40ft containers, containing 12 tons of products.
current capacity is 10 containers monthly. Total monthly production volume is 120MT or 120,000 kilos."
				/>
				<ProductItem
					name="tumeric"
					img={tumericImg}
					content="Our Wheat grain is available in two forms; solid grains and powdered grains (grinded/broken).The grains are sourced directly from the farms and transported to our cleaning facility where they are properly processed by hand picking to ensure final product is free of debris and unwanted particles.product is shipped in 25kg to 50kg bags in 40ft containers, containing 12 tons of products.
current capacity is 10 containers monthly. Total monthly production volume is 120MT or 120,000 kilos."
				/></div> */
}
