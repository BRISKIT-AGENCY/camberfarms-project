'use client'
import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import { Product } from '../types/product'

export default function useGetSingleProduct(url: string, locale: string) {
	const [data, setData] = useState<Product | null>(null)
	const [isPending, setIsPending] = useState(false)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [error, setError] = useState<any>(null)

	useEffect(() => {
		const controller = new AbortController()
		async function getProducts() {
			setIsPending(true)
			setError(null)
			try {
				const res = await axiosInstance.get(`api/products/${url}`, {
					signal: controller.signal,
					params: { lang: locale },
				})
				const result = res.data as { product: Product; success: boolean }
				// console.log('result: ', result)
				setData(result.product)
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
	}, [locale, url])

	return { data, isPending, error }
}
