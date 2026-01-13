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
						faq={faq}
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
		question: 'Do you have Agricultural products?',
		answer:
			'We appreciate their consistency in quality and after service. Their corporation with rural African farmers is also commendable.” Moreover, we deeply admire their proactive efforts towards customer satisfaction.',
	},
	{
		question: 'Do you have Agricultural products?',
		answer: 'yes',
	},
	{
		question: 'Do you have Agricultural products?',
		answer: 'yes',
	},
	{
		question: 'Do you have Agricultural products?',
		answer: 'yes',
	},
	{
		question: 'Do you have Agricultural products?',
		answer: 'yes',
	},
	{
		question: 'Do you have Agricultural products?',
		answer: 'yes',
	},
]
