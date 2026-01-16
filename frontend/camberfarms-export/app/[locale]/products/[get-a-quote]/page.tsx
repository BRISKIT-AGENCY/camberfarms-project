import cashewImg from '@/app/[locale]/assets/img/cashew.webp'
import Faq from '@/app/[locale]/components/Faq'
import { notFound } from 'next/navigation'
import axiosInstance from '../../api/axios'
import ProductInfo from './ProductInfo'
import RequestQuotation from './RequestQuotation'

import { ProductType } from '../Products'

async function getProduct(slug: string): Promise<ProductType | null> {
	try {
		const res = await axiosInstance.get(`/${slug}`)
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

export default async function GetAQuote({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const product = await getProduct(slug)

	// if (!product) return notFound()

	return (
		<section className="flex flex-col w-full items-center justify-center bg-light-grey text-foreground font-inter relative">
			<ProductInfo product={product} />
			<RequestQuotation />
			<Faq />
		</section>
	)
}

// TODO make this a dynamic route

const sampleProduct = {
	name: 'raw cashew nuts',
	images: [cashewImg],
	desc: 'Our Raw Cashew Nuts are sourced directly from our community of cashew growers, known for producing high-quality cashew nuts. We offer Raw Cashew Nuts only. The nuts undergo meticulous processing and drying to ensure they meet our strict quality standards. Our process involves sorting, cleaning, drying and grading by hand to remove any impurities and ensure uniformity in size and color.',
	info: [
		'Packaging: 80kg sea worthy jute bags',
		'Container Size: 40ft containers, containing between 26 to 28 tons of product.',
		'Season: December to August.',
		'Incoterms: FOB and CNF.',
		'Minimum Order: 5 containers.',
		'Maximum Order: 50 containers (monthly).',
	],
}
