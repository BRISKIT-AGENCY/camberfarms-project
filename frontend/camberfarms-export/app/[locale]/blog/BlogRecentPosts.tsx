import Link from 'next/link'
import getRecentPosts from '../utils/getRecent.Post'

export default async function BlogRecentPosts() {
	const recentPosts = (await getRecentPosts()) || recentBlogs

	return (
		<div className="w-full md:bg-white md:p-8 shadow-2xs space-y-4 capitalize font-inter rounded-2xl">
			<h6 className="text-xl font-poppins font-medium">recent posts</h6>
			{recentPosts &&
				recentPosts.map((b) => (
					<Link
						href={`/blog/${b.slug}`}
						key={b.slug}
						className="text-primary text-sm hover:text-primary/80 flex mb-4 w-fit"
					>
						{b.title}
					</Link>
				))}
			{!recentPosts.length && (
				<p className="w-fit min-h-20 px-2 py-4 text-base text-grey lg:min-h-0 lg:p-0">
					No recent blog posts yet.
				</p>
			)}
		</div>
	)
}

const recentBlogs = [
	{
		title: 'Nigerian Export Rules',
		slug: 'nigeria-export',
	},
	{
		title: 'Market Pricing and Export Inflation',
		slug: 'nigeria-pricing',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		slug: 'nigeria-guide',
	},
	{
		title: 'Market Pricing and Export Inflation',
		slug: 'nigeria-inflation',
	},
	{
		title: 'Premium Quality From CamberFarm',
		slug: 'nigeria-quality',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
		slug: 'nigeria-wheat',
	},
]
