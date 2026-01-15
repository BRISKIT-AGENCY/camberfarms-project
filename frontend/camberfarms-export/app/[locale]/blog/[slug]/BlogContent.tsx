import { iBlogContent } from './page'

type BlogPropType = {
	blog: iBlogContent | null
}

export default async function BlogContent({ blog }: BlogPropType) {
	if (blog === null)
		return (
			<div className="w-full p-6 text-grey">
				<p>Something went wrong. Please try again.</p>
			</div>
		)

	return (
		<div className="w-full bg-[#F3F5F7] md:pt-38.25 md:px-25 px-6 pt-15 pb-19.5">
			{/* TITLE */}
			<h1 className="font-bold md:text-[36px] text-[16px]">{blog.title}</h1>

			<p className="md:text-[18px] text-[#808080] mt-2">
				Date: {new Date(blog.publishedAt).toDateString()}
			</p>

			{/* CONTENT SECTIONS */}
			<div className="mt-12">
				{blog.sections.map((section, index) => (
					<div key={index} className="w-full md:mt-12.5 mt-6">
						<h2 className="font-medium md:text-[28px] text-[16px]">
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
