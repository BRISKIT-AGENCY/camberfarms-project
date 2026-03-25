import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import getRecentPosts from '../utils/getRecent.Post'

export default async function BlogRecentPosts() {
	const locale = await getLocale()
	const recentPosts = await getRecentPosts(locale)

	return (
		<div className="w-full md:bg-white md:p-8 md:shadow-2xs space-y-4 capitalize font-inter rounded-2xl">
			<h6 className="text-xl font-poppins font-medium w-full">recent posts</h6>
			{recentPosts &&
				recentPosts.map((b) => (
					<Link
						href={`/blog/${b.slug}`}
						key={b.slug}
						className="text-primary text-sm hover:text-primary/80 mb-2 md:mb-4 block line-clamp-1"
					>
						{b.title}
					</Link>
				))}
			{(!recentPosts || !recentPosts?.length) && (
				<p className="w-fit min-h-20 px-2 py-4 text-base text-grey lg:min-h-0 lg:p-0">
					No recent blog posts yet.
				</p>
			)}
		</div>
	)
}
