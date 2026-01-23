import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useLocation, useParams } from 'react-router-dom'
import { Dropzone } from '../../components/Dropzone'
import OverlayWrapper from '../../components/OverlayWrapper'
import { useGoBack } from '../../hooks/useGoBack'
import type { Product } from './Products'

export default function EditProduct() {
	const goBack = useGoBack('/products')
	const params = useParams()
	const location = useLocation()
	const product: Product = location.state?.product
	const [file, setFile] = useState<File | null>(null)

	useEffect(() => {
		// if there's no productId, return to home (product page)
		if (!params.productId) {
			setTimeout(goBack, 1000)
		}
		console.log('product: ', product)
		console.log('files: ', file)
	}, [params, goBack, product, file])

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
				<section className="">
					<Dropzone setState={setFile} image={product.image} />
					<form className="w-full py-6">
						<fieldset className="w-full grid grid-cols-2 gap-4 md:gap-6">
							{/* product name */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Product name</span>
								<input
									type="text"
									defaultValue={product.title}
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									placeholder="Enter product name"
									name="productName"
								/>
							</label>
							{/* category */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Product category</span>
								<select
									name="category"
									id="category"
									defaultValue={product.category}
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
									defaultValue={product.quantity}
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									placeholder="Enter product name"
									name="quantity"
								/>
							</label>
							{/* status */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Status</span>
								<select
									name="status"
									id="status"
									defaultValue={product.status}
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
								>
									<option value="active">Active</option>
									<option value="inactive">Inactive</option>
								</select>
							</label>
							{/* type */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Type</span>
								<input
									type="text"
									autoComplete="off"
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									// placeholder="Enter product name"
									name="productType"
								/>
							</label>
							{/* moisture */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Moisture</span>
								<input
									type="text"
									autoComplete="off"
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									// placeholder="Enter product name"
									name="moisture"
								/>
							</label>
							{/* protein content */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Protein Content</span>
								<input
									type="text"
									autoComplete="off"
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									// placeholder="Enter product name"
									name="proteinContent"
								/>
							</label>
							{/* crop year */}
							<label className="w-full flex flex-col gap-1">
								<span className="text-grey text-sm">Crop Year</span>
								<input
									type="text"
									autoComplete="off"
									required
									className="w-full p-2 border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
									// placeholder="Enter product name"
									name="cropYear"
								/>
							</label>
						</fieldset>
						<label className="w-full flex flex-col gap-1 mt-6">
							<span className="text-grey text-sm">Description</span>
							<textarea
								name="description"
								id="description"
								defaultValue={product.desc}
								placeholder="Describe the role and it's responsibility"
								className="w-full h-20 p-2 resize-y border-2 border-grey/40 rounded-md focus-within:outline-0 focus-within:border-primary transition-all ease-in duration-200"
							></textarea>
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
								className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer"
							>
								Save Changes
							</button>
						</div>
					</form>
				</section>
			</div>
		</OverlayWrapper>
	)
}
