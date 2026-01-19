import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Searchbar from '../../components/Searchbar'

export default function ProductsHeader() {
	return (
		<section className="w-full flex flex-col">
			<div className="w-full flex items-center justify-between gap-6">
				<div className="">
					<h3 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black mb-2">
						CamberFarms Products
					</h3>
					<p className="text-grey text-sm lg:text-base font-inter">
						Manage your agricultural products and inventory.
					</p>
				</div>
				<Link
					to={'/products/new'}
					className="flex items-center gap-2 py-2 px-4 rounded-lg bg-primary text-white font-poppins text-base capitalize"
				>
					<FaPlus />
					add new product
				</Link>
			</div>
			<div className="w-full bg-white my-10 p-6 grid grid-cols-[2fr_1fr] items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<Searchbar url="" />
				<select
					name="category"
					id="category"
					className="bg-white px-4 py-2 rounded-xl w-full border-2 border-grey inline-flex outline-0"
				>
					<option value="">Category</option>
				</select>
			</div>
		</section>
	)
}
