import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'
import type { UpdateBlogFormValues } from '../types/blog'

export function useUpdateBlog(url: string, queryKey: string) {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	return useMutation({
		mutationFn: async (values: UpdateBlogFormValues) => {
			const formData = new FormData()

			formData.append('title', values.title)
			formData.append('excerpt', values.excerpt)
			// formData.append('slug', slug)

			formData.append('sections', JSON.stringify([values.sections]))

			// if (!values.image?.length) {
			// 	throw new Error('Image is required')
			// }
			// formData.append('image', values.image[0])

			const res = await axiosInstance.patch(url, formData)

			return res.data
		},
		onSuccess: () => {
			// console.log('update result', data)
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
