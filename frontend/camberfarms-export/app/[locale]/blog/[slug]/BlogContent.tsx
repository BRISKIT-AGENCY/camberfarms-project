'use client'
import Image from 'next/image'
import { useImageCheck } from '../../hooks/useImageCheck'
import { iBlogContent } from './page'

type BlogPropType = {
	blog: iBlogContent | null
}

export default function BlogContent({ blog }: BlogPropType) {
	const imgWorking = useImageCheck(blog?.image || '')

	if (blog === null)
		return (
			<div className="w-full p-6 text-grey">
				<p>Something went wrong. Please try again.</p>
			</div>
		)

	return (
		<div className="w-full bg-[#F3F5F7] md:pt-18.25 md:px-25 px-6 pt-15">
			{/* IMAGE */}
			{imgWorking && blog.image && (
				<div className="w-full h-75 lg:h-85 xl:h-95 relative mb-4 bg-light-grey">
					<Image
						src={`https://api.camberfarms.org/${blog.image.replace(/^\//, '')}`}
						alt={blog.title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
						// placeholder="blur"
						className="w-full object-cover object-center rounded-2xl"
					/>
				</div>
			)}
			{/* TITLE */}
			<h1 className="font-bold md:text-[36px] text-[16px] capitalize">
				{blog.title}
			</h1>

			<p className="md:text-[18px] text-[#808080] mt-2">
				Date: {new Date(blog.publishedAt).toDateString()}
			</p>

			{/* CONTENT SECTIONS */}
			<div className="mt-12">
				{blog.sections.map((section, index) => (
					<div key={index} className="w-full md:mt-12.5 mt-6">
						<h2 className="font-medium md:text-[28px] text-[16px] capitalize">
							{section.heading}
						</h2>

						{section.paragraphs.map((paragraph, i) => (
							<p
								key={i}
								className="md:text-[22px] text-[#333333] text-[14px] mt-4"
							>
								{paragraph}
							</p>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
