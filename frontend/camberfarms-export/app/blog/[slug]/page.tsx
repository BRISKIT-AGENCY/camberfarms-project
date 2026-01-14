import BlogSidebar from '../BlogSidebar'
import BlogContent from './BlogContent'

export default function SingleBlog() {
	return (
		<main className="w-full py-20 md:py-28 px-6 md:px-10 lg:px-20 bg-light-grey space-y-10 relative">
			<BlogContent />
			<BlogSidebar />
		</main>
	)
}
