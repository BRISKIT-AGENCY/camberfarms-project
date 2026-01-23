import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Searchbar from '../../components/Searchbar'

export default function BlogHeader() {
	return (
		<section className="w-full flex flex-col">
			<div className="w-full flex items-center justify-between gap-6">
				<div className="">
					<h3 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black mb-2">
						Blog Management
					</h3>
					<p className="text-grey text-sm lg:text-base font-inter">
						Create and manage agricultural stories
					</p>
				</div>
				<Link
					to={'/blog/new'}
					className="flex items-center gap-2 py-2 px-4 rounded-lg bg-primary text-white font-poppins text-base capitalize"
				>
					<FaPlus />
					post new blog
				</Link>
			</div>
			<div className="w-full bg-white my-10 p-6 grid grid-cols-1 items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<Searchbar placeholder="Search blogs" url="" />
			</div>
		</section>
	)
}
