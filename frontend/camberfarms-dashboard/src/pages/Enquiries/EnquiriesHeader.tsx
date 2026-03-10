import { useMutation } from '@tanstack/react-query'
import { FiUpload } from 'react-icons/fi'
import { IoMdRefresh } from 'react-icons/io'
import axiosInstance from '../../api/axios'
// import Searchbar from '../../components/Searchbar'
import type { Dispatch, SetStateAction } from 'react'
import LocalSearchbar from '../../components/LocalSearchbar'
import { exportToPDF } from '../../helpers/ExportToPDF'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'
import EnquiriesStats from './EnquiriesStats'

type SiteType = 'all' | 'export' | 'africa'

type HeaderProps = {
	setSite: Dispatch<SetStateAction<SiteType>>
	setQuery: Dispatch<SetStateAction<string>>
	q: string
	site: string
}

export default function EnquiriesHeader({
	q,
	site,
	setQuery,
	setSite,
}: HeaderProps) {
	const refreshEnquiries = useRefetchQueries('enquiries')
	const { isPending, mutate } = useMutation({
		mutationKey: ['enquiries'],
		mutationFn: async () => {
			const res = await axiosInstance.post('enquiries/export', {
				responseType: 'blob',
			})
			// create file blob
			const blob = await res.data
			const url = window.URL.createObjectURL(new Blob([blob]))

			return url
		},
		onSuccess: (url) => {
			// onSuccess, download PDF
			exportToPDF(url, 'enquiries')
		},
	})

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
						onClick={refreshEnquiries}
						type="button"
						className="bg-transparent text-secondary border-2 border-secondary font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2"
					>
						<IoMdRefresh />
						<span>Refresh</span>
					</button>
					<button
						type="button"
						onClick={() => mutate()}
						disabled={isPending}
						className="bg-primary text-white font-poppins font-medium text-base py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2 disabled:opacity-40"
					>
						<FiUpload />
						<span>Export Data</span>
					</button>
				</div>
			</div>
			<EnquiriesStats />
			<div className="w-full bg-white dark:bg-black mb-10 p-6 grid grid-cols-[2fr_1fr] items-center justify-between gap-6 flex-nowrap rounded-lg shadow-2xs">
				<LocalSearchbar
					placeholder="Search enquiries by name, email..."
					query={q}
					setState={setQuery}
				/>
				<select
					name="status"
					id="status"
					value={site}
					onChange={(e) => setSite(e.target.value as SiteType)}
					className="bg-white dark:bg-black px-4 py-2 rounded-xl w-full border-2 border-grey inline-flex outline-0"
				>
					<option value="all">website</option>
					<option value="africa">Africa</option>
					<option value="export">Export</option>
				</select>
			</div>
		</section>
	)
}
