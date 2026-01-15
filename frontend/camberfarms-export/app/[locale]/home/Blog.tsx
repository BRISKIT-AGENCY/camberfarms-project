import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from '../api/axios'
import arrowIcon from '../assets/icon/arrow-r-white.svg'
import userAvatar from '../assets/img/user-avatar.png'
import { iBlog } from '../blog/page'

async function getBlogs(): Promise<iBlog[] | null> {
	try {
		// using an instance of axios with baseURL set
		const res = await axiosInstance.get(`/api/export/blog`, {
			params: { page: 1, limit: 2 },
		})
		return res.data.data
	} catch {
		// since this is a server component, console.log won't work
		return null
	}
}

export default async function Blog() {
	// temporarily fill data with dummy local content (if fetch fails)
	const data = (await getBlogs()) || blogData
	const t = await getTranslations('home.blog')

	return (
		<section
			className="w-full h-fit py-10 md:py-14 relative"
			aria-labelledby="blog"
		>
			<h3
				className="font-poppins capitalize font-bold text-primary text-center text-2xl sm:text-3xl"
				id="blog"
			>
				{t('heading')}
			</h3>
			<p className="mt-2 mb-12 mx-4 sm:max-w-2xl sm:mx-auto text-base text-balance text-center md:text-wrap text-dark-grey">
				{t('paragraph')}
			</p>
			<div className="w-full flex flex-col sm:flex-row items-center gap-6 my-6 px-8 sm:px-10">
				{data &&
					data.map((b: iBlog) => (
						<div
							key={b._id}
							className="w-full sm:w-1/2 border rounded-2xl shadow px-3 py-3 lg:mx-4 flex flex-col gap-3"
						>
							<h6 className="text-lg font-semibold font-poppins capitalize">
								{b.title}
							</h6>
							<p className="text-dark-grey font-inter text-base line-clamp-3">
								{b.excerpt}
							</p>
							<Link
								href={`blog/${b.slug}`}
								className="text-sm font-inter text-secondary"
							>
								Read more
							</Link>
							<Image
								src={b?.image || userAvatar}
								alt=""
								width={300}
								height={300}
								placeholder="blur"
								className="w-14 lg:w-20 aspect-square rounded-full object-fill object-center"
							/>
						</div>
					))}
			</div>
			{!data && (
				<div className="text-grey  px-4 text-center">
					<Link
						href={'/blog'}
						className="w-fit flex items-center gap-1 px-4 py-2 rounded-full capitalize bg-primary font-sans font-medium mx-auto transition-all duration-200 hover:gap-4 origin-left text-white"
					>
						<span>visit blog</span>
						<Image
							src={arrowIcon}
							alt="arrow forward"
							width={50}
							height={50}
							className="h-full w-auto object-contain"
						/>
					</Link>
				</div>
			)}
		</section>
	)
}

const blogData: iBlog[] = [
	{
		_id: '1',
		title: 'The Authoritative Guide To Buying Grain Seeds In Bulk',
		excerpt:
			'For international procurement managers, commodity traders, and product developers, sourcing sourcing',
		image: userAvatar,
		slug: 'the-authority',
		publishedAt: '',
	},
	{
		_id: '2',
		title: 'The Authoritative Guide To Buying Grain Seeds In Bulk',
		excerpt:
			'For international procurement managers, commodity traders, and product developers, sourcing sourcing',
		image: userAvatar,
		slug: 'the-authority',
		publishedAt: '',
	},
]
