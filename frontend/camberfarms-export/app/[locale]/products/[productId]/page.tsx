'use client'

import Faq from '@/app/[locale]/components/Faq'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import useGetSingleProduct from '../../hooks/useGetSingleProduct'
import ProductInfo from './ProductInfo'
import RequestQuotation from './RequestQuotation'

export default function GetAQuote() {
	const { productId } = useParams()
	const locale = useLocale()
	const {
		data: product,
		isPending,
		error,
	} = useGetSingleProduct(productId as string, locale)

	return (
		<section className="flex flex-col w-full items-center justify-center bg-light-grey text-foreground font-inter relative">
			{isPending && (
				<div className="w-full  px-10 lg:px-14 xl:px-20 py-6 mt-28">
					<p>Loading product details...</p>
				</div>
			)}
			{error && (
				<div className="w-full mt-28 px-10 lg:px-14 xl:px-20 py-6">
					<p>Could not fetch product info: {error?.message}...</p>
				</div>
			)}
			<ProductInfo product={product} />
			<RequestQuotation />
			<Faq />
		</section>
	)
}
