import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import { PiCaretDownFill } from 'react-icons/pi'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useBlogSections } from '../../hooks/useBlogSections'
import { useGoBack } from '../../hooks/useGoBack'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'
import { useUpdateBlog } from '../../hooks/useUpdateBlog'
import type { News } from '../../types/news'

type NewsEdit = {
	title: string
	excerpt: string
	publishedAt: string
	image: null
}

export default function EditNews() {
	const goBack = useGoBack('/news')
	const params = useParams()
	// refetch function (in case of error)
	const refetchNews = useRefetchQueries(params.newsId!)
	// show news preview?
	const [showPreview, setShowPreview] = useState(false)
	// fetch news details
	const { data, isPending, error } = useQuery({
		queryKey: ['news', params.newsId],
		queryFn: async () => {
			const res = await axiosInstance.get(`news/${params.newsId!}`)

			return res.data as {
				success: boolean
				news: News
			}
		},
		refetchOnWindowFocus: false,
	})

	// update news
	const { mutate, isPending: uploading } = useUpdateBlog(
		`news/${params.newsId}`,
		'news',
	)

	const defaultFormValues = {
		title: data?.news.translations.en.title || '',
		publishedAt: data?.news.publishedAt || '',
		excerpt: data?.news.translations.en.excerpt || '',
		image: null,
	}
	// form state
	const {
		handleSubmit,
		register,
		// formState: { errors },
		reset,
	} = useForm({ defaultValues: defaultFormValues })
	// blog sections logic
	const {
		sections,
		addSection,
		removeSection,
		updateHeading,
		addParagraph,
		updateParagraph,
		setSections,
		// removeParagraph,
	} = useBlogSections(data?.news.translations.en.sections || [])
	// upload submit handler
	const onSubmit: SubmitHandler<NewsEdit> = (formData) => {
		// console.log('content: ', data)
		mutate({ ...formData, sections })
	}

	useEffect(() => {
		// if there's no blogId, return to home (blog page)
		if (!params.newsId) {
			const timer = setTimeout(goBack, 1000)
			return () => clearTimeout(timer)
		}
	}, [params.newsId, goBack])

	// update fields onload
	useEffect(() => {
		if (data?.news) {
			reset({
				title: data.news.translations.en.title,
				publishedAt: data.news.publishedAt,
				excerpt: data.news.translations.en.excerpt,
				image: null,
			})
			setSections(data.news.translations.en.sections)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, reset])

	if (isPending || !data?.news) return <LoadingSpinner />

	if (error)
		return (
			<div className="w-full mt-10 text-center">
				<p>Unable to fetch news content: {error.message}</p>
				<button
					type="button"
					onClick={refetchNews}
					className="w-fit mx-auto mt-4 py-2 px-6 rounded-full border cursor-pointer capitalize"
				>
					refresh
				</button>
			</div>
		)

	return (
		<OverlayWrapper>
			<div className="w-full pb-2">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						Edit Article
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<section className="">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full py-6 space-y-4"
					>
						{/* title */}
						<label className="w-full flex flex-col gap-1">
							<span className="text-grey text-sm">Article Title</span>
							<input
								type="text"
								{...register('title', { required: true })}
								// required
								className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								placeholder="Enter title"
								// name="title"
							/>
						</label>

						<fieldset className="w-full grid grid-cols-2 gap-6">
							{/* date */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Date</span>
								<input
									type="text"
									readOnly
									defaultValue={format(
										new Date(data.news.publishedAt || ''),
										'dd-MM-yyyy',
									)}
									// {...register('publishedAt')}
									// required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									// placeholder="Select date"
									// name="date"
								/>
							</label>
							{/* image */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Upload image</span>
								<input
									type="file"
									// name="image"
									id="image"
									{...register('image')}
									accept="image/*"
									multiple={false}
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								/>
							</label>
						</fieldset>

						<label className="w-full flex flex-col gap-1 mt-6">
							<span className="text-grey text-sm">Article Excerpt</span>
							<textarea
								// name="description"
								// required
								id="excerpt"
								{...register('excerpt', { required: true })}
								placeholder="Write a preview for your content here..."
								className="w-full h-28 p-2 resize-y border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
							></textarea>
						</label>

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
								onClick={goBack}
								className="bg-light-grey text-dark-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={uploading}
								className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer disabled:opacity-40"
							>
								Upload Article
							</button>
						</div>
					</form>
				</section>
			</div>
		</OverlayWrapper>
	)
}
