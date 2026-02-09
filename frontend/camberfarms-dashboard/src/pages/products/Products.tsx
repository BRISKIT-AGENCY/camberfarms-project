import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
// import grainImg from '../../assets/img/grains-product.png'
// import productImg from '../../assets/img/wheat-product.png'
import CardItem from '../../components/CardItem'
import type { Product, ProductStats } from '../../types/product'

export default function Products() {
	const queryClient = useQueryClient()
	const { data, isPending } = useQuery({
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
	})
	// delete product
	const { mutate: deleteProduct } = useMutation({
		mutationKey: ['products'],
		mutationFn: async (id: string) =>
			await axiosInstance.delete(`products/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
		},
	})

	const navigate = useNavigate()
	const getFlagColor = (category: string) =>
		category == 'grains' ? '#FFFFFF' : '#16A34A'

	const editProduct = (id: string) => {
		navigate(`edit/${id}`)
	}

	if (isPending) return <div className="w-full text-center">Loading...</div>

	return (
		<section className="w-full bg-light-grey dark:bg-dark-grey mb-20">
			<h4 className="text-black dark:text-white text-2xl font-semibold">
				Products ({data?.total})
			</h4>
			<p className="text-sm text-grey dark:text-light-grey mb-6 mt-2">
				Manage your products inventory
			</p>
			<div className="w-full grid grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{data &&
					data.products.map((item) => (
						<CardItem
							key={item._id}
							title={item.translations.en.name}
							image={item.images?.[0]}
							flag={item.translations.en.category}
							flagColor={getFlagColor(item.translations.en.category)}
							primaryBtnText="edit"
							primaryBtnClick={() => editProduct(item._id)}
							secondaryBtnText="delete"
							secondaryBtnClick={() => deleteProduct(item._id)}
						>
							<div className="w-full px-2 text-grey">
								<p className="text-sm font-inter line-clamp-3">
									{item.translations.en.description}
								</p>
								<p className="mt-auto pt-4">
									<strong className="decoration-0 not-italic text-grey/60 font-medium">
										Stock:{' '}
									</strong>
									<span className="text-primary font-medium">
										{item.stockQuantity}
									</span>
								</p>
							</div>
						</CardItem>
					))}
			</div>
		</section>
	)
}

// const products: Product[] = [
// 	{
// 		title: 'premium wheat seeds',
// 		desc: 'High-yield wheat seeds perfect for commercial farming',
// 		quantity: 100,
// 		category: 'spices',
// 		image: productImg,
// 		id: 1,
// 		status: 'active',
// 	},
// 	{
// 		title: 'premium wheat seeds',
// 		desc: 'High-yield wheat seeds perfect for commercial farming',
// 		quantity: 100,
// 		category: 'spices',
// 		image: productImg,
// 		id: 2,
// 		status: 'active',
// 	},
// 	{
// 		title: 'premium wheat seeds',
// 		desc: 'High-yield wheat seeds perfect for commercial farming',
// 		quantity: 100,
// 		category: 'spices',
// 		image: productImg,
// 		id: 3,
// 		status: 'active',
// 	},
// 	{
// 		title: 'premium wheat seeds',
// 		desc: 'High-yield wheat seeds perfect for commercial farming',
// 		quantity: 100,
// 		category: 'grains',
// 		image: grainImg,
// 		id: 4,
// 		status: 'active',
// 	},
// 	{
// 		title: 'premium wheat seeds',
// 		desc: 'High-yield wheat seeds perfect for commercial farming',
// 		quantity: 100,
// 		category: 'grains',
// 		image: grainImg,
// 		id: 5,
// 		status: 'inactive',
// 	},
// 	{
// 		title: 'premium wheat seeds',
// 		desc: 'High-yield wheat seeds perfect for commercial farming',
// 		quantity: 100,
// 		category: 'spices',
// 		image: productImg,
// 		id: 6,
// 		status: 'inactive',
// 	},
// ]
