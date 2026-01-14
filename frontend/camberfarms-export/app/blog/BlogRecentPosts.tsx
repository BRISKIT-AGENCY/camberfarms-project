import Link from 'next/link'

export default function BlogRecentPosts() {
	return (
		<div className="w-full md:bg-white md:p-8 shadow-2xs space-y-4 capitalize font-inter rounded-2xl">
			<h6 className="text-xl font-poppins font-medium">recent posts</h6>
			{recentBlogs.map((b, index) => (
				<Link
					href={`blog/${b.title.toLocaleLowerCase().replaceAll(' ', '-')}`}
					key={index}
					className="text-primary text-sm hover:text-primary/80 flex mb-4"
				>
					{b.title}
				</Link>
			))}
		</div>
	)
}

const recentBlogs = [
	{
		title: 'Nigerian Export Rules',
	},
	{
		title: 'Market Pricing and Export Inflation',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
	},
	{
		title: 'Market Pricing and Export Inflation',
	},
	{
		title: 'Premium Quality From CamberFarm',
	},
	{
		title: 'The Best Guide To Buying Wheat Grains in Bulk',
	},
]
