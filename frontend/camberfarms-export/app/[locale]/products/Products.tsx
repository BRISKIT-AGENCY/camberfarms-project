'use client'

import { useLocale, useTranslations } from 'next-intl'
import useGetProducts from '../hooks/useGetProducts'
import ProductItem from './ProductItem'

export default function Products() {
	const locale = useLocale()
	const { data: products, isPending } = useGetProducts(locale)
	const t = useTranslations('products.products')

	return (
		<section className="w-full pt-8 bg-white" aria-describedby="products">
			<h4
				className="font-poppins font-semibold text-base sm:text-xl md:text-2xl text-center text-primary"
				id="products"
			>
				{t('heading')}
			</h4>

			<div className="w-full flex flex-col gap-28 mt-8 bg-light-green py-20 px-6 md:px-12">
				{isPending && (
					<div className="w-full">
						<p>Loading products...</p>
					</div>
				)}
				{products &&
					products.map((p) => (
						<ProductItem
							_id={p._id}
							key={p._id}
							name={p.name}
							img={p?.images?.[0]}
							content={p.description}
						/>
					))}
			</div>
		</section>
	)
}
