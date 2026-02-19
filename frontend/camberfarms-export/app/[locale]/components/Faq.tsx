'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import FaqItem from './FaqItem'

export default function Faq() {
	const t = useTranslations('common.faq')
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	return (
		<section
			className="w-full h-fit py-10 md:py-14 relative"
			aria-labelledby="faq"
		>
			<h3
				className="font-manrope capitalize font-bold text-primary text-center text-xl sm:text-3xl"
				id="faq"
			>
				{t('heading')}
			</h3>
			<p className="mt-2 mb-12 mx-4 sm:max-w-2xl sm:mx-auto text-base text-center text-grey">
				{t('paragraph')}
			</p>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 items-start gap-x-6 gap-y-3 my-6 px-8 sm:px-10">
				{faqs.map((faq, index) => (
					<FaqItem
						key={index}
						id={index}
						isOpen={openIndex === index}
						onToggle={() => setOpenIndex(openIndex === index ? null : index)}
					/>
				))}
			</div>
		</section>
	)
}

const faqs = [
	{
		question:
			'DO YOU HAVE ALL AGRICULTURAL ALLIED PRODUCTS AVAILABLE AT ALL TIMES?',
		answer:
			'Product availability depends on the specific season in which the request is made. Seasonal cycles also influence pricing and supply levels.',
	},
	{
		question: 'HOW COMPETITIVE ARE YOUR PRICES?',
		answer:
			'We maintain direct relationships with our farmers, managing the supply chain from farm gate through processing to final delivery. This streamlined approach allows us to offer highly competitive pricing without compromising on quality.',
	},
	{
		question: 'DO YOU HAVE THE FINANCIAL CAPACITY TO FULFILL LARGE ORDERS?',
		answer:
			'Yes, we do. We are well positioned to handle high-volume orders and support transactions through advance payments and financial instruments such as letters of credit, ensuring efficient processing and timely delivery.',
	},
	{
		question: 'HOW TIMELY IS YOUR DELIVERY?',
		answer:
			'Shipment preparation typically takes approximately two weeks, followed by an estimated sea transit time of 30 to 45 days, depending on the destination and shipping conditions.',
	},
	{
		question: 'HOW DO YOU CONDUCT SHIPMENT INSPECTION FOR YOUR PRODUCTS?',
		answer:
			'We operate a rigorous and efficient quality control system throughout our production and export processes. In addition, we readily accommodate independent third-party inspection services such as SGS, Bureau Veritas, and similar internationally recognized agencies.',
	},
	{
		question: 'WHAT ARE YOUR PAYMENT TERMS?',
		answer:
			'Our standard terms require a 30% advance payment, with the remaining balance payable upon receipt of scanned copies of the original shipping documents. Telex release or courier dispatch is completed once full payment has been confirmed',
	},
	{
		question: 'WHICH DOCUMENTS ARE REQUIRED FOR CONSIGNMENT CLEARANCE?',
		answer:
			'We provide all standard export documentation required for clearance, including the original bill of lading, certificate of origin, phytosanitary certificate, fumigation certificate, packing list, and commercial invoice.',
	},
]
