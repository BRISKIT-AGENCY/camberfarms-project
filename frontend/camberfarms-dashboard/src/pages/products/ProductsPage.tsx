import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import type { Product, ProductStats } from '../../types/product'
import Products from './Products'
import ProductsHeader from './ProductsHeader'

export default function ProductsPage() {
	const [category, setCategory] = useState('all')
	const [query, setQuery] = useState('')

	const { data, isPending, isRefetching } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await axiosInstance.get('products')
			return res.data as {
				products: Product[]
				stats: ProductStats[]
				total: number
				success: boolean
			}
		},
		refetchOnWindowFocus: false,
	})

	const products =
		category == 'all'
			? data?.products
			: data?.products.filter(
					(p) => p.translations.en.category.toLocaleLowerCase() == category,
				)

	const filteredProducts =
		products?.filter((p) => p.translations?.en?.name.includes(query)) &&
		products?.filter((p) => p.translations?.en?.description.includes(query))

	if (isPending || isRefetching || !data?.products) return <LoadingSpinner />

	return (
		<section className="w-full p-6">
			<ProductsHeader
				cat={category}
				setCategory={setCategory}
				setQuery={setQuery}
				q={query}
			/>
			<Products products={filteredProducts || []} />
			{/* This will render the overlay */}
			<Outlet />
		</section>
	)
}
