import cashewImg from '@/app/assets/img/cashew.webp'
import Faq from '@/app/components/Faq'
import ProductInfo from './ProductInfo'
import RequestQuotation from './RequestQuotation'

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

export default function GetAQuote() {
	return (
		<section className="flex flex-col w-full items-center justify-center bg-light-grey text-foreground font-inter relative">
			<ProductInfo {...sampleProduct} />
			<RequestQuotation />
			<Faq />
		</section>
	)
}

// TODO make this a dynamic route
