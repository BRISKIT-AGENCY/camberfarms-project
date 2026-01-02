import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import BlogPagination from './BlogPagination'

type BlogMainProps = {
	title: string
	img: string | StaticImageData | undefined
	content: string
	date: string
}

type BlogsType = {
	blogs: BlogMainProps[]
}

export default function BlogMain({ blogs }: BlogsType) {
	return (
		<div className="w-full flex flex-col">
			<section className="w-full bg-light-grey md:bg-white md:p-6 rounded-2xl space-y-8 md:shadow-xs">
				{blogs.map((blog, index) => (
					<div
						className="w-full flex flex-col pb-4 border-b-2 border-[#EBEBEB] md:last:border-none"
						key={index}
					>
						{blog.img && (
							<div className="w-full h-75 relative mb-4">
								<Image
									src={blog.img}
									alt={blog.title}
									fill
									placeholder="blur"
									className="w-full object-cover object-center rounded-2xl"
								/>
							</div>
						)}
						<h5 className="font-poppins font-medium text-xl sm:text-2xl capitalize mb-4">
							{blog.title}
						</h5>
						<p className="text-sm font-inter text-grey">{blog.content}</p>
						<p className="text-sm font-inter text-grey mb-4">{blog.date}</p>
						<Link
							href={`blog/${blog.title
								.toLocaleLowerCase()
								.replaceAll(' ', '-')}`}
							className="text-primary font-poppins font-medium"
						>
							Read more
						</Link>
					</div>
				))}
			</section>
			<BlogPagination />
		</div>
	)
}
