import { FiUpload } from 'react-icons/fi'
import { IoMdRefresh } from 'react-icons/io'
// import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../api/axios'
import Searchbar from '../../components/Searchbar'
import { exportToPDF } from '../../helpers/ExportToPDF'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'
import AffiliateStats from './AffiliateStats'

export default function AffiliateHeader() {
	const refresh = useRefetchQueries('affiliates')
	const { isPending, mutate } = useMutation({
		mutationKey: ['affiliates'],
		mutationFn: async () => {
			const res = await axiosInstance.post('affiliate/export', {
				responseType: 'blob',
			})
			// create file blob
			const blob = await res.data
			const url = window.URL.createObjectURL(new Blob([blob]))

			return url
		},
		onSuccess: (url) => {
			// onSuccess, download PDF
			exportToPDF(url, 'affiliates')
		},
	})

	return (
		<section className="w-full flex flex-col">
			<div className="w-full flex items-center justify-between gap-6">
				<h3 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black dark:text-white mb-2">
					Affiliate Program
				</h3>
				{/* action buttons */}
				<div className="w-fit flex gap-6 items-center justify-end">
					<button
						type="button"
						onClick={refresh}
						className="bg-transparent text-secondary border-2 border-secondary font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2"
					>
						<IoMdRefresh />
						<span>Refresh</span>
					</button>
					<button
						type="button"
						onClick={() => mutate()}
						disabled={isPending}
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2"
					>
						<FiUpload />
						<span>Export Data</span>
					</button>
				</div>
			</div>
			<AffiliateStats />
			<div className="w-full bg-white dark:bg-black mb-10 p-6 grid grid-cols-[2fr_1fr] items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<Searchbar placeholder="Search forms by name, email..." url="" />
				<select
					name="status"
					id="status"
					className="bg-white dark:bg-black px-4 py-2 rounded-xl w-full border-2 border-grey inline-flex outline-0"
				>
					<option value="all">All Status</option>
				</select>
			</div>
		</section>
	)
}
