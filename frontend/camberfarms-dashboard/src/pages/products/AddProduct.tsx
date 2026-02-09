/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Dropzone } from '../../components/Dropzone'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useCreateProduct } from '../../hooks/useCreateProduct'
import { useGoBack } from '../../hooks/useGoBack'
import type { CreateProduct, ProductVariants } from '../../types/product'
import { AddVariants } from './AddVariants'

const initialState = {
	name: '',
	category: '',
	description: '',
	stockQuantity: 0,
	images: null,
	variants: {},
}

export default function AddProduct() {
	const goBack = useGoBack('/products')
	const { mutate, isPending } = useCreateProduct()
	const [file, setFile] = useState<File[] | null>(null)
	const [formData, setFormData] = useState(initialState)
	const [variants, setVariants] = useState<ProductVariants>({})

	function handleChange(e: any) {
		e.preventDefault()
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	async function handleSubmit(e: any) {
		e.preventDefault()
		const formToSubmit: CreateProduct = { ...formData, images: file!, variants }

		mutate(formToSubmit)
	}

	return (
		<OverlayWrapper>
			<div className="w-full pb-2">
				<div className="w-full flex items-center justify-between gap-6 pb-4 mb-6 border-b border-grey/50">
					<h1
						id="page-title"
						className="text-2xl lg:text-3xl capitalize font-bold"
					>
						add new product
					</h1>
					<IoClose size={30} className="cursor-pointer" onClick={goBack} />
				</div>
				<section className="">
					<Dropzone setState={setFile} image={undefined} isMultiple />
					<form className="w-full py-6" onSubmit={handleSubmit}>
						{/* product name */}
						<label className="w-full flex flex-col gap-1">
							<span className="text-grey text-sm">Product name</span>
							<input
								type="text"
								required
								className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								placeholder="Enter product name"
								name="name"
								value={formData.name}
								onChange={handleChange}
							/>
						</label>
						<fieldset className="w-full grid grid-cols-2 gap-4 md:gap-6 mt-4">
							{/* category */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Product category</span>
								<select
									name="category"
									onChange={handleChange}
									defaultValue={formData.category}
									id="category"
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								>
									<option value="">Select category</option>
									<option value="grains">Grains</option>
									<option value="seeds">Seeds</option>
								</select>
							</label>
							{/* quantity */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Stock Quantity</span>
								<input
									type="number"
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									placeholder="Enter product name"
									name="stockQuantity"
									value={formData.stockQuantity}
									onChange={handleChange}
								/>
							</label>
						</fieldset>
						<label className="w-full flex flex-col gap-1 mt-6">
							<span className="text-grey text-sm">Description</span>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								id="description"
								placeholder="Describe the role and it's responsibility"
								className="w-full min-h-20 p-2 resize-y field-sizing-content border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
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
								disabled={isPending}
								className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer disabled:opacity-50"
							>
								Add Product
							</button>
						</div>
					</form>
				</section>
			</div>
		</OverlayWrapper>
	)
}
