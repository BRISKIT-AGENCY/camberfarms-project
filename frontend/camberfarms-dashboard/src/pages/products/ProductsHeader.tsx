import type { Dispatch, SetStateAction } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
// import Searchbar from '../../components/Searchbar'
import LocalSearchbar from '../../components/LocalSearchbar'

type HeaderProps = {
	setCategory: Dispatch<SetStateAction<string>>
	setQuery: Dispatch<SetStateAction<string>>
	q: string
	cat: string
}

export default function ProductsHeader({
	setCategory,
	cat,
	q,
	setQuery,
}: HeaderProps) {
	return (
		<section className="w-full flex flex-col">
			<div className="w-full flex items-center justify-between gap-6">
				<div className="">
					<h3 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black dark:text-white mb-2">
						CamberFarms Products
					</h3>
					<p className="text-grey dark:text-light-grey text-sm lg:text-base font-inter">
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
			<div className="w-full bg-white dark:bg-black my-10 p-6 grid grid-cols-[2fr_1fr] items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<LocalSearchbar query={q} setState={setQuery} />
				<select
					name="category"
					id="category"
					value={cat}
					onChange={(e) => setCategory(e.target.value)}
					className="bg-white dark:bg-black px-4 py-2 rounded-xl w-full border-2 border-grey inline-flex outline-0"
				>
					<option value="all">Category</option>
					<option value="grain seed">Grain Seed</option>
					<option value="tumeric">Tumeric</option>
					<option value="raw pepper">Raw Pepper</option>
					<option value="shea nut">Shea Nut</option>
					<option value="soyabeans">Soya Beans</option>
					<option value="wheat">Wheat</option>
					<option value="others">Others</option>
				</select>
			</div>
		</section>
	)
}
