import BlogRecentPosts from './BlogRecentPosts'
import BlogSearch from './BlogSearch'

export default function BlogSidebar() {
	return (
		<aside className="w-full bg-light-grey space-y-6">
			<BlogSearch />
			<BlogRecentPosts />
		</aside>
	)
}
