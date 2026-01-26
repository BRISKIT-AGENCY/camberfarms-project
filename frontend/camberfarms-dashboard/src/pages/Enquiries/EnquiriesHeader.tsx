import { FiUpload } from 'react-icons/fi'
import { IoMdRefresh } from 'react-icons/io'
import Searchbar from '../../components/Searchbar'
import EnquiriesStats from './EnquiriesStats'

export default function EnquiriesHeader() {
	return (
		<section className="w-full flex flex-col">
			<div className="w-full flex items-center justify-between gap-6">
				<div className="w-fit">
					<h3 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black dark:text-white mb-2">
						Enquiry Management
					</h3>
					<p className="text-grey dark:text-light-grey text-sm lg:text-base font-inter">
						Manage customer enquiries and support requests
					</p>
				</div>
				{/* action buttons */}
				<div className="w-fit flex gap-6 items-center justify-end">
					<button
						onClick={() => window.location.reload()}
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
			<EnquiriesStats />
			<div className="w-full bg-white dark:bg-black mb-10 p-6 grid grid-cols-[2fr_1fr] items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<Searchbar placeholder="Search enquiries by name, email..." url="" />
				<select
					name="status"
					id="status"
					className="bg-white dark:bg-black px-4 py-2 rounded-xl w-full border-2 border-grey inline-flex outline-0"
				>
					<option value="all">website</option>
				</select>
			</div>
		</section>
	)
}
