/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import { Dropzone } from '../../components/Dropzone'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useCreateProduct } from '../../hooks/useCreateProduct'
import { useGoBack } from '../../hooks/useGoBack'
import type { EditProduct, Product, ProductVariants } from '../../types/product'
import { AddVariants } from './AddVariants'

// TODO make this work
export default function EditProduct() {
	const goBack = useGoBack('/products')
	const params = useParams()
	const { mutate, isPending: updatingProduct } = useCreateProduct()
	const { data, isPending, error } = useQuery({
		queryKey: ['products', params.productId],
		queryFn: async () => {
			const { data } = await axiosInstance.get(`products/${params.productId}`)
			return data
		},
	})
	// const product: Product = location.state?.product
	const [file, setFile] = useState<File[] | null | string>(null)
	// const [variants, setVariants] = useState()
	const [variants, setVariants] = useState<ProductVariants>({})

	const [product, setFormData] = useState<Product>(data)

	function handleChange(e: any) {
		e.preventDefault()
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	async function handleSubmit(e: any) {
		e.preventDefault()
		const formToSubmit: EditProduct = { ...product, images: file!, variants }

		mutate(formToSubmit)
	}

	useEffect(() => {
		// if there's no productId, return to home (product page)
		if (!params.productId) {
			setTimeout(goBack, 1000)
		}
		// console.log('product: ', product)
		// console.log('files: ', file)
	}, [params, goBack])

	if (isPending) return <div className="w-full text-center">Loading...</div>

	return (
		<OverlayWrapper>
			<div className="w-full pb-2">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						edit product
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				{error && (
					<div className="w-full">
						<p className="mt-8 text-secondary">
							Unable to fetch product details details, please refresh or try
							again later.
						</p>
					</div>
				)}
				{product && (
					<section className="">
						<Dropzone setState={setFile} image={product.images[0]} isMultiple />
						<form className="w-full py-6" onSubmit={handleSubmit}>
							<fieldset className="w-full grid grid-cols-2 gap-4 md:gap-6">
								{/* product name */}
								<label className="w-full flex flex-col gap-1">
									<span className="text-grey text-sm">Product name</span>
									<input
										type="text"
										value={product.translations.en.name}
										onChange={handleChange}
										required
										className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
										placeholder="Enter product name"
										name="name"
									/>
								</label>
								{/* category */}
								<label className="w-full flex flex-col gap-1">
									<span className="text-grey text-sm">Product category</span>
									<select
										name="category"
										id="category"
										value={product.translations.en.category}
										onChange={handleChange}
										className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									>
										<option value="">Select category</option>
									</select>
								</label>
								{/* quantity */}
								<label className="w-full flex flex-col gap-1">
									<span className="text-grey text-sm">Stock Quantity</span>
									<input
										type="number"
										value={product.stockQuantity}
										onChange={handleChange}
										required
										className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
										placeholder="Enter product name"
										name="stockQuantity"
									/>
								</label>
							</fieldset>
							<label className="w-full flex flex-col gap-1 mt-6">
								<span className="text-grey text-sm">Description</span>
								<textarea
									name="description"
									id="description"
									value={product.translations.en.description}
									onChange={handleChange}
									placeholder="Describe the role and it's responsibility"
									className="w-full h-20 p-2 resize-y border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								></textarea>
							</label>
							{/* variants */}
							<label className="w-full flex flex-col gap-1">
								<h6 className="text-black dark:text-light-grey text-xl mt-4">
									Product variants
								</h6>
								<p className="text-sm">
									You can add more specific information about the current here.
									E.g: Container size, weight, etc.
								</p>
								<div className="flex flex-col gap-4 my-2">
									{variants &&
										Object.entries(variants).map(([key, value]) => (
											<label className="w-full flex flex-col gap-1">
												<span className="text-grey text-sm capitalize">
													{key}
												</span>
												<input
													type="text"
													value={value}
													readOnly
													className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
												/>
											</label>
										))}
								</div>
								<AddVariants value={variants} onChange={setVariants} />
							</label>

							<div className="w-full flex gap-6 items-center justify-end py-6 mt-8 border-t border-grey/50">
								<button
									type="button"
									onClick={goBack}
									className="bg-light-grey text-dark-grey font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={updatingProduct}
									className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
								>
									Save Changes
								</button>
							</div>
						</form>
					</section>
				)}
			</div>
		</OverlayWrapper>
	)
}
