'use client'
import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { Product } from '../types/product'
import {
	getUniqueCategories,
	UniqueProduct,
} from '../utils/getProductCategories'

export default function useGetProducts(locale: string) {
	const [data, setData] = useState<Product[] | null>(null)
	const [categories, setCategories] = useState<UniqueProduct[]>([])
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const controller = new AbortController()
		async function getProducts() {
			setIsPending(true)
			setError(null)
			try {
				const res = await axiosInstance.get('api/products', {
					signal: controller.signal,
					params: { lang: locale },
				})
				const result = res.data as {
					success: boolean
					total: number
					products: Product[]
				}
				console.log('result: ', result.products)
				setData(result?.products)
				const cat = getUniqueCategories(result?.products)
				setCategories(cat)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				if (err.name == 'CanceledError') return

				console.error('fetch error: ', err)
				setError(err)
			} finally {
				setIsPending(false)
			}
		}
		getProducts()

		return () => {
			controller.abort()
		}
	}, [locale])

	return { data, isPending, error, categories }
}
