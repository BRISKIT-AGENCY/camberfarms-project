import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import CardItem from '../../components/CardItem'
// import { formatImgUrl } from '../../helpers/formatImgUrl'
import type { Product } from '../../types/product'

export default function Products({ products }: { products: Product[] }) {
	const queryClient = useQueryClient()

	// delete product
	const { mutate: deleteProduct, isPending: deleting } = useMutation({
		// mutationKey: ['products'],
		mutationFn: async (id: string) =>
			await axiosInstance.delete(`products/${id}`),
		onSuccess: () => {
			toast.success('Product deleted')
			queryClient.invalidateQueries({ queryKey: ['products'], type: 'all' })
		},
	})

	const navigate = useNavigate()
	const getFlagColor = (category: string) =>
		category == 'grains' ? '#FFFFFF' : '#16A34A'

	const editProduct = (id: string) => {
		navigate(`edit/${id}`)
	}

	// if (isPending || isRefetching || !data?.products)
	// 	return <div className="w-full text-center">Loading...</div>

	return (
		<section className="w-full bg-light-grey dark:bg-dark-grey mb-20">
			<h4 className="text-black dark:text-white text-2xl font-semibold">
				Products ({products?.length})
			</h4>
			<p className="text-sm text-grey dark:text-light-grey mb-6 mt-2">
				Manage your products inventory
			</p>
			<div className="w-full grid grid-cols-2 xl:grid-cols-3 items-stretch gap-x-10 gap-y-6 mt-6">
				{products &&
					products.map((item) => (
						<CardItem
							key={item._id}
							disabled={deleting}
							title={item.translations?.en?.name}
							image={item.images?.[0]}
							flag={item.translations?.en?.category}
							flagColor={getFlagColor(item.translations?.en?.category)}
							primaryBtnText="edit"
							primaryBtnClick={() => editProduct(item._id)}
							secondaryBtnText="delete"
							secondaryBtnClick={() => deleteProduct(item._id)}
						>
							<div className="w-full px-2 text-grey">
								<p className="text-sm font-inter line-clamp-3">
									{item.translations?.en?.description}
									{Object.entries(item.translations?.en?.variants).map(
										([key, value]) => (
											<span key={`${key}`}>
												{key}:{value}
											</span>
										),
									)}
								</p>
								<p className="text-sm font-inter flex flex-col mt-2 capitalize">
									{Object.entries(item.translations?.en?.variants).map(
										([key, value]) => (
											<span key={`${key}`}>
												{key}: <strong>{value}</strong>
											</span>
										),
									)}
								</p>
								<p className="mt-auto pt-4">
									<strong className="decoration-0 not-italic text-grey/60 font-medium">
										Stock:{' '}
									</strong>
									<span className="text-primary font-medium">
										{item?.stockQuantity}
									</span>
								</p>
							</div>
						</CardItem>
					))}
			</div>
		</section>
	)
}
