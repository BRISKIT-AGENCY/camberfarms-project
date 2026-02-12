import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'
import type { EditProductType } from '../types/product'

export function useEditProduct() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: editProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			toast.success('Product updated successfully!')
			navigate('/products')
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			console.error('update error: ', error)
			toast.error(error.response?.data?.message || 'Error updating product')
		},
	})
}

async function editProduct(input: EditProductType) {
	const formData = new FormData()

	formData.append('name', input.name!)
	formData.append('category', input.category!)
	formData.append('description', input.description!)
	// if stockQuantity
	if (input.stockQuantity) {
		formData.append('stockQuantity', String(input.stockQuantity))
	}
	// append variants
	if (input.variants) {
		Object.entries(input.variants).forEach(([key, value]) => {
			formData.append(`variants[${key}]`, String(value))
		})
	}

	//   append images
	if (typeof input.images === 'object' && input.images?.length) {
		input.images.forEach((file) => {
			formData.append('images', file)
		})
	}

	const { data } = await axiosInstance.patch(
		`products/${input._id}`,
		formData,
		{ params: { id: input._id } },
	)
	return data
}
