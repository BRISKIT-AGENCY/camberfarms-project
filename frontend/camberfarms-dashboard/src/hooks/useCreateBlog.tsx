import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'
// import { createSections } from '../helpers/createSections'
import { createSlug } from '../helpers/createSlug'
import type { CreateBlogFormValues } from '../types/blog'

export function useCreateBlog(url: string, queryKey: string) {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	return useMutation({
		mutationFn: async (values: CreateBlogFormValues) => {
			// const sections = createSections(values.body)
			const slug = createSlug(values.title)
			// remove _id's from sections
			const sections = values.sections.map((s) => ({
				heading: s.heading,
				paragraphs: s.paragraphs,
			}))

			const formData = new FormData()

			formData.append('title', values.title)
			formData.append('excerpt', values.excerpt)
			formData.append('slug', slug)

			formData.append('sections', JSON.stringify(sections))

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
		onSuccess: () => {
			toast.success('Content uploaded successfully')
			queryClient.invalidateQueries({ queryKey: [queryKey], type: 'all' })
			navigate(`/${queryKey}`)
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Error uploading content')
		},
	})
}
