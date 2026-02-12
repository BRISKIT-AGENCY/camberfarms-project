import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useCreateBlog } from '../../hooks/useCreateBlog'
import { useGoBack } from '../../hooks/useGoBack'
import type { CreateBlogFormValues } from '../../types/blog'

const initialState = {
	title: '',
	image: null,
	publishedAt: '',
	slug: '',
	body: '',
}
// TODO mayble add the subheading feature (sigh)
export default function AddBlog() {
	const goBack = useGoBack('/blog')
	const { mutate: postToAfrica, isPending: africaPending } = useCreateBlog(
		'/africa-blogs',
		'blog',
	)
	const { mutate: postToExport, isPending: exportPending } = useCreateBlog(
		'/export-blogs',
		'blog',
	)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialState })

	const submitToAfrica = (data: CreateBlogFormValues) => {
		postToAfrica(data)
	}

	const submitToExport = (data: CreateBlogFormValues) => {
		postToExport(data)
	}

	return (
		<OverlayWrapper>
			<div className="w-full pb-2">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						Post Blog
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
								{...register('title', { required: true })}
								className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								placeholder="Enter title"
								// name="title"
							/>
							{errors.title && <p>{errors.title.message}</p>}
						</label>

						<fieldset className="w-full grid grid-cols-2 gap-6">
							{/* date */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Date</span>
								<input
									type="datetime-local"
									{...register('publishedAt', { required: true })}
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									placeholder="Select date"
									// name="date"
								/>
								{errors.publishedAt && <p>{errors.publishedAt.message}</p>}
							</label>
							{/* image */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Upload image</span>
								<input
									type="file"
									{...register('image', { required: true })}
									id="image"
									accept="image/*"
									multiple={false}
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								/>
							</label>
							{errors.image && <p>{errors.image.message}</p>}
						</fieldset>

						<label className="w-full flex flex-col gap-1 mt-6">
							<span className="text-grey text-sm">Write Post</span>
							<textarea
								// name="description"
								id="description"
								{...register('body', {
									required: true,
									minLength: {
										value: 200,
										message: 'Blog content is too short',
									},
								})}
								placeholder="Write your blog contents here..."
								className="w-full min-h-28 p-2 resize-y border-2 border-grey/40 rounded-md field-sizing-content focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
							></textarea>
							{errors.body && (
								<p className="text-red-500">{errors.body.message}</p>
							)}
						</label>
						<div className="w-full flex gap-6 items-center justify-end py-6 mt-8 border-t border-grey/50">
							<button
								type="button"
								disabled={exportPending}
								onClick={handleSubmit(submitToExport)}
								// onClick={goBack}
								className="bg-transparent text-secondary border-2 border-secondary font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer disabled:opacity-40"
							>
								Upload to Export
							</button>
							<button
								type="button"
								disabled={africaPending}
								onClick={handleSubmit(submitToAfrica)}
								className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer disabled:opacity-40"
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
