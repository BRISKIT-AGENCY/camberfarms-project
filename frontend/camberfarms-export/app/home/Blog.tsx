import Image from 'next/image'
import Link from 'next/link'
import userAvatar from '../assets/img/user-avatar.png'

export default function Blog() {
	return (
		<section
			className="w-full h-fit py-10 md:py-14 relative"
			aria-labelledby="blog"
		>
			<h3
				className="font-poppins capitalize font-bold text-primary text-center text-2xl sm:text-3xl"
				id="blog"
			>
				blog post
			</h3>
			<p className="mt-2 mb-12 mx-4 sm:max-w-2xl sm:mx-auto text-base text-balance text-center md:text-wrap text-dark-grey">
				Our blog is a hub of valuable resources, offering in-depth insights into
				our products and services. It&apos;s tailored to educate our customers
				and serve as a comprehensive guide for exporting agricultural products
				with ease and efficiency
			</p>
			<div className="w-full flex flex-col sm:flex-row items-center gap-6 my-6 px-8 sm:px-10">
				{blogData.map((b) => (
					<div
						key={b.id}
						className="w-full sm:w-1/2 border rounded-2xl shadow px-3 py-3 lg:mx-4 flex flex-col gap-3"
					>
						<h6 className="text-lg font-semibold font-poppins capitalize">
							{b.title}
						</h6>
						<p className="text-dark-grey font-inter text-base line-clamp-3">
							{b.content}
						</p>
						<Link
							href={`blog/${b.id}`}
							className="text-sm font-inter text-secondary"
						>
							Read more
						</Link>
						<Image
							src={b.avatar}
							alt=""
							width={300}
							height={300}
							placeholder="blur"
							className="w-14 lg:w-20 aspect-square rounded-full object-fill object-center"
						/>
					</div>
				))}
			</div>
		</section>
	)
}

const blogData = [
	{
		id: 1,
		title: 'The Authoritative Guide To Buying Grain Seeds In Bulk',
		content:
			'For international procurement managers, commodity traders, and product developers, sourcing sourcing',
		avatar: userAvatar,
	},
	{
		id: 2,
		title: 'The Authoritative Guide To Buying Grain Seeds In Bulk',
		content:
			'For international procurement managers, commodity traders, and product developers, sourcing sourcing',
		avatar: userAvatar,
	},
]
