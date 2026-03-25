'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useImageCheck } from '../hooks/useImageCheck'
import BlogPagination from './BlogPagination'
import { iBlog } from './page'

type BlogsPropType = {
	blogs: iBlog[]
	pagination: {
		currentPage: number
		totalPages: number
	}
}

export default function BlogMain({
	blogs,
	pagination = { currentPage: 1, totalPages: 1 },
}: BlogsPropType) {
	const imgWorking = useImageCheck(blogs?.[0]?.image || '')

	return (
		<div className="w-full flex flex-col">
			<section className="w-full min-h-72 bg-light-grey md:bg-white md:p-6 rounded-2xl space-y-8 md:shadow-xs">
				{blogs?.length &&
					blogs.map((blog, index) => (
						<div
							className="w-full flex flex-col pb-4 border-b-2 border-[#EBEBEB] md:last:border-none"
							key={index}
						>
							{imgWorking && blog.image && (
								<div className="w-full h-75 relative mb-4">
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
							<h5 className="font-poppins font-medium text-xl sm:text-2xl capitalize mb-4">
								{blog.title}
							</h5>
							<p className="text-sm font-inter text-grey">{blog.excerpt}</p>
							<p className="text-sm font-inter text-dark-grey/50 mt-2 mb-4">
								{new Date(blog?.publishedAt)?.toDateString()}
							</p>
							<Link
								href={`blog/${blog.slug}`}
								className="text-primary font-poppins font-medium"
							>
								Read more
							</Link>
						</div>
					))}

				{!blogs?.length && (
					<p className="w-fit text-base text-grey p-4">No posts yet.</p>
				)}
			</section>
			<BlogPagination
				totalPages={pagination.totalPages}
				currentPage={pagination.currentPage}
			/>
		</div>
	)
}
