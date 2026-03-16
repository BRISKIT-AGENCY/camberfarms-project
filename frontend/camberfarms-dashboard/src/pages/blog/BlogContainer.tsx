import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
// import { useMemo } from 'react'
import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import CardItem from '../../components/CardItem'
import LocalSearchbar from '../../components/LocalSearchbar'
import useGetBlogs from '../../hooks/useGetBlogs'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'
import type { Blog } from '../../types/blog'

// FOR LATER
// const shuffleBlogs = (blogs: Blog[]): Blog[] => {
// 	const shuffled = [...blogs] // Copy to keep it immutable
// 	for (let i = shuffled.length - 1; i > 0; i--) {
// 		const j = Math.floor(Math.random() * (i + 1))
// 		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
// 	}
// 	return shuffled
// }

export default function BlogContainer() {
	const navigate = useNavigate()
	const [q, setQuery] = useState('')
	// invalidate/refetch blog queries
	const refetchBlogs = useRefetchQueries('blog')

	const { data, isPending, error } = useGetBlogs()
	// delete blog
	const { mutate: deleteBlog } = useMutation({
		mutationKey: ['blog'],
		mutationFn: async (data: { id: string; website: string }) =>
			await axiosInstance.delete(`${data.website}-blogs/${data.id}`),
		onSuccess: () => {
			refetchBlogs()
		},
	})
	// add 'website' field to export blogs
	const modifiedExportBlogs: Blog[] = data?.export.exportBlogs
		? data.export.exportBlogs.map((blog: Blog) => ({
				...blog,
				website: 'export',
			}))
		: []
	// add 'website' field to africa blogs
	const modifiedAfricaBlogs: Blog[] = data?.africa.blogs
		? data.africa.blogs.map((blog: Blog) => ({ ...blog, website: 'africa' }))
		: []

	const blogs = [...modifiedExportBlogs, ...modifiedAfricaBlogs].filter((b) =>
		b.translations?.en?.title?.toLowerCase().includes(q),
	)

	const editBlog = (id: string, siteId: string) => {
		navigate(`edit/${siteId}/${id}`)
	}

	if (isPending) return <div className="w-full text-center">Loading...</div>

	if (error)
		return (
			<div className="w-full mt-10 text-center">
				<p>Unable to fetch blogs: {error.message}</p>
				<button
					type="button"
					onClick={refetchBlogs}
					className="w-fit mx-auto mt-4 py-2 px-6 rounded-full border cursor-pointer capitalize"
				>
					refresh
				</button>
			</div>
		)

	return (
		<section className="w-full bg-light-grey dark:bg-dark-grey mb-20 transition-discrete ease-in duration-200">
			<div className="w-full bg-white dark:bg-black my-10 p-6 grid grid-cols-1 items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<LocalSearchbar
					placeholder="Search blogs"
					query={q}
					setState={setQuery}
				/>
			</div>
			<h4 className="text-black dark:text-white text-2xl font-semibold">
				blog post
			</h4>
			<p className="text-sm text-grey mb-6 mt-2">
				({blogs.length}) articles found
			</p>
			<div className="w-full grid grid-cols-1 xl:grid-cols-2 items-stretch gap-x-10 gap-y-6 mt-6">
				{blogs.map((item) => (
					<CardItem
						cardVariant="border border-primary p-4 has-[button]:w-full"
						key={item._id}
						title={item.translations.en.title}
						// image={item.image}
						primaryBtnText="edit"
						flag={item.website}
						flagColor={item.website === 'africa' ? '#16A34A' : '#FF741F'}
						primaryBtnClick={() => editBlog(item._id, item.website)}
						secondaryBtnText="delete"
						secondaryBtnClick={() =>
							deleteBlog({ id: item._id, website: item.website })
						}
					>
						<div className="w-full px-3 text-grey">
							<p className="text-sm font-inter">
								{item.translations.en.excerpt}
							</p>
							<p className="w-fit ml-auto my-1 text-sm text-grey">
								{format(new Date(item.publishedAt), 'dd/MM/yyyy')}
							</p>
							<p className="text-grey flex gap-1 items-center">
								<FaArrowRight />
								<span className="">{item.views || 0} views</span>
							</p>
						</div>
					</CardItem>
				))}
			</div>
		</section>
	)
}
