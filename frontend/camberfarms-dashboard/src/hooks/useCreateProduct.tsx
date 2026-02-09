import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios'
import type { CreateProduct, EditProduct } from '../types/product'

export function useCreateProduct() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			toast.success('Product added successfully!')
			navigate('/products')
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast.error(error.response?.data?.message || 'Error creating product')
		},
	})
}

async function createProduct(input: CreateProduct | EditProduct) {
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
	if (typeof input.images === 'object') {
		input.images.forEach((file) => {
			formData.append('images', file)
		})
	}

	const { data } = await axiosInstance.post('products', formData)
	return data
}
