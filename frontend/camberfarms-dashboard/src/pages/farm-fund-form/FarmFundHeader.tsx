import { FiUpload } from 'react-icons/fi'
import { IoMdRefresh } from 'react-icons/io'
// import { Link } from 'react-router-dom'
import Searchbar from '../../components/Searchbar'
import FarmFundStats from './FarmFundStats'

export default function FarmFundHeader() {
	return (
		<section className="w-full flex flex-col">
			<div className="w-full flex items-center justify-between gap-6">
				<div className="w-fit">
					<h3 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black mb-2">
						Farm Fund Form
					</h3>
					<p className="text-grey text-sm lg:text-base font-inter">
						Manage and reply Investors messages
					</p>
				</div>
				{/* action buttons */}
				<div className="w-fit flex gap-6 items-center justify-end">
					<button
						onClick={window.location.reload}
						type="button"
						className="bg-transparent text-secondary border-2 border-secondary font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2"
					>
						<IoMdRefresh />
						<span>Refresh</span>
					</button>
					<button className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2">
						<FiUpload />
						<span>Export Data</span>
					</button>
				</div>
			</div>
			<FarmFundStats />
			<div className="w-full bg-white mb-10 p-6 grid grid-cols-[2fr_1fr] items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<Searchbar placeholder="Search forms by name, email..." url="" />
				<select
					name="status"
					id="status"
					className="bg-white px-4 py-2 rounded-xl w-full border-2 border-grey inline-flex outline-0"
				>
					<option value="all">All Status</option>
				</select>
			</div>
		</section>
	)
}
