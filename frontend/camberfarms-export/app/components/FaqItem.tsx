// 'use client'

import Image from 'next/image'
import arrowDown from '../assets/icon/arrow-down.svg'

type FAQ = {
	question: string
	answer: string
}

type FaqItemProps = {
	faq: FAQ
	isOpen: boolean
	onToggle: () => void
}

export default function FaqItem({ faq, isOpen, onToggle }: FaqItemProps) {
	return (
		<div className="w-full p-2 bg-[#F7F7F7] shadow-xs transition hover:shadow">
			<button
				type="button"
				onClick={onToggle}
				className="flex w-full items-center justify-between gap-4 cursor-pointer"
				aria-expanded={isOpen}
			>
				<span className="text-left text-sm md:text-base">{faq.question}</span>
				<Image
					src={arrowDown}
					alt=""
					width={50}
					height={50}
					className={`w-5 aspect-square shrink-0 transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			<div
				className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen
						? 'grid-rows-[1fr] opacity-100 pt-4'
						: 'grid-rows-[0fr] opacity-0'
				}`}
			>
				<p className="px-0.5 overflow-hidden text-grey">{faq.answer}</p>
			</div>
		</div>
	)
}
