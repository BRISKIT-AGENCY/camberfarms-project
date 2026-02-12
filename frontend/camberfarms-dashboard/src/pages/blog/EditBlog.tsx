import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
// import type { Blog } from '../../types/blog'

export default function EditBlog() {
	const goBack = useGoBack('/news')
	const params = useParams()
	const { data, isPending, error } = useQuery({
		queryKey: ['blog', params.blogId],
		queryFn: async () => {
			const res = await axiosInstance.get(
				`${params.siteId}-blogs/${params.blogId}`,
			)
			return res.data
		},
	})

	// const location = useLocation()
	// const blog: Blog = location.state?.blog

	useEffect(() => {
		// if there's no blogId, return to home (blog page)
		if (!params.blogId || !params.siteId) {
			setTimeout(goBack, 1000)
		}
		// console.log('blog: ', blog)
		// console.log('files: ', file)
	}, [params, goBack])

	console.log('blog: ', data)
	console.log('blog: ', isPending)
	console.log('blog: ', error)

	return (
		<OverlayWrapper>
			<div className="w-full pb-2">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						Edit Blog Post
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<section className="">
					<form className="w-full py-6 space-y-4">
						{/* title */}
						<label className="w-full flex flex-col gap-1">
							<span className="text-grey text-sm">Blog Title</span>
							<input
								type="text"
								required
								// defaultValue={blog.translations.en.title}
								className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								placeholder="Enter title"
								name="title"
							/>
						</label>

						<fieldset className="w-full grid grid-cols-2 gap-6">
							{/* date */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Date</span>
								<input
									type="date"
									// defaultValue={blog.updatedAt}
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									placeholder="Select date"
									name="date"
								/>
							</label>
							{/* image */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Upload image</span>
								<input
									type="file"
									name="image"
									id="image"
									accept="image/*"
									multiple={false}
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								/>
							</label>
						</fieldset>

						<label className="w-full flex flex-col gap-1 mt-6">
							<span className="text-grey text-sm">Write Post</span>
							<textarea
								name="description"
								required
								id="description"
								// defaultValue={blog.translations.en.excerpt}
								placeholder="Write your blog contents here..."
								className="w-full h-28 p-2 resize-y border-2 border-grey/40 rounded-md field-sizing-content focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
							></textarea>
						</label>
						<div className="w-full flex gap-6 items-center justify-end py-6 mt-8 border-t border-grey/50">
							<button
								type="button"
								// onClick={goBack}
								className="bg-transparent text-secondary border-2 border-secondary font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
							>
								Upload to Export
							</button>
							<button
								// type="submit"
								className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
							>
								Upload to Africa
							</button>
						</div>
					</form>
				</section>
			</div>
		</OverlayWrapper>
	)
}
