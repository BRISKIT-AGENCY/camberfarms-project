import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../api/axios'
import type { Product, ProductStats } from '../types/product'

export default function useGetProducts() {
	return useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await axiosInstance.get('products')
			return res.data as {
				products: Product[]
				stats: ProductStats
				total: number
				success: boolean
			}
		},
	})
}
