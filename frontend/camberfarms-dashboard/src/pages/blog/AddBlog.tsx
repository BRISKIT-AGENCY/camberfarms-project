import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import { PiCaretDownFill } from 'react-icons/pi'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useBlogSections } from '../../hooks/useBlogSections'
import { useCreateBlog } from '../../hooks/useCreateBlog'
import { useGoBack } from '../../hooks/useGoBack'
import type { CreateBlogFormValues } from '../../types/blog'

const initialState = {
	title: '',
	image: null,
	publishedAt: '',
	slug: '',
	body: '',
	excerpt: '',
	sections: [],
}

export default function AddBlog() {
	const [showPreview, setShowPreview] = useState(false)
	const {
		sections,
		addSection,
		removeSection,
		updateHeading,
		addParagraph,
		updateParagraph,
		// setSections,
		// removeParagraph,
	} = useBlogSections()
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
		postToAfrica({ ...data, sections })
	}

	const submitToExport = (data: CreateBlogFormValues) => {
		postToExport({ ...data, sections })
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
									type="date"
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
							<span className="text-grey text-sm">Excerpt</span>
							<textarea
								// name="description"
								id="description"
								{...register('excerpt', {
									required: true,
									minLength: {
										value: 90,
										message: 'Blog excerpt is too short',
									},
								})}
								placeholder="Write a descriptive preview of your post here..."
								className="w-full min-h-28 p-2 resize-y border-2 border-grey/40 rounded-md field-sizing-content focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
							></textarea>
							{errors.excerpt && (
								<p className="text-red-500">{errors.excerpt.message}</p>
							)}
						</label>
						{/* blog content */}
						<fieldset>
							{/* content preview */}
							<button
								type="button"
								onClick={() => setShowPreview((prev) => !prev)}
								className="flex items-center gap-1 cursor-pointer"
							>
								<PiCaretDownFill
									className={`ease-in-out transition-discrete transition-all duration-200 ${showPreview ? '' : '-rotate-90'}`}
								/>
								Preview
							</button>
							{showPreview && (
								<div className="border border-dark-grey rounded-sm bg-light-grey dark:bg-dark-grey p-4 my-2">
									{sections.map((s) => (
										<div key={s._id} className="my-3">
											<h6 className="font-medium mb-4 text-lg">{s.heading}</h6>
											{s.paragraphs.map((p, index) => (
												<div key={index} className="my-1">
													<p>{p}</p>
												</div>
											))}
										</div>
									))}
								</div>
							)}
							{/* sections */}
							<div className="space-y-6">
								{sections.map((section) => (
									<div
										key={section._id}
										className="space-y-4 bg-light-grey dark:bg-black p-4"
									>
										<input
											maxLength={200}
											placeholder="subheading (optional)"
											value={section.heading || ''}
											onChange={(e) =>
												updateHeading(section._id, e.target.value)
											}
											className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
										/>

										{section.paragraphs.map((p, i) => (
											<textarea
												placeholder="paragraph"
												key={i}
												value={p}
												onChange={(e) =>
													updateParagraph(section._id, i, e.target.value)
												}
												className="w-full resize-none field-sizing-content p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200 "
											/>
										))}

										<div className="w-full flex items-center gap-6">
											<button
												type="button"
												onClick={() => addParagraph(section._id)}
												className="bg-transparent text-secondary border border-secondary font-poppins font-sm text-sm p-2 rounded-lg cursor-pointer"
											>
												+ Add Paragraph
											</button>

											<button
												type="button"
												onClick={() => removeSection(section._id)}
												className="bg-transparent text-red-500 border font-poppins text-sm p-2 flex items-center gap-1 rounded-lg cursor-pointer"
											>
												<MdDeleteOutline /> Remove Section
											</button>
										</div>
									</div>
								))}

								<button
									type="button"
									onClick={addSection}
									className="bg-transparent text-primary border-2 font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
								>
									+ Add Section
								</button>
							</div>
						</fieldset>

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
