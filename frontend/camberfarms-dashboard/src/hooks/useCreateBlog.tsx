import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../api/axios'
// import { createSections } from '../helpers/createSections'
import { createSlug } from '../helpers/createSlug'
import type { CreateBlogFormValues } from '../types/blog'

export const useCreateBlog = (url: string) =>
	useMutation({
		mutationFn: async (values: CreateBlogFormValues) => {
			const excerpt = values.body.trim().slice(0, 200)
			// const sections = createSections(values.body)
			const slug = createSlug(values.title)

			const formData = new FormData()

			formData.append('title', JSON.stringify({ en: values.title }))
			formData.append('excerpt', JSON.stringify({ en: excerpt }))
			formData.append('slug', slug)

			formData.append(
				'sections',
				JSON.stringify([
					{
						paragraphs: {
							en: values.body,
						},
					},
				]),
			)

			formData.append(
				'publishedAt',
				values.publishedAt || new Date().toISOString(),
			)

			if (!values.image?.length) {
				throw new Error('Image is required')
			}
			formData.append('image', values.image[0])

			const res = await axiosInstance.post(url, formData)

			return res.data
		},
	})
