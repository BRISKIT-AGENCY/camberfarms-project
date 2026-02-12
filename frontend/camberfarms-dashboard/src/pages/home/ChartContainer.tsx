import { useQuery } from '@tanstack/react-query'
import { IoMdArrowDropup } from 'react-icons/io'
import axiosInstance from '../../api/axios'
import Chart from './Chart'

export default function ChartContainer() {
	const { data, isPending } = useQuery({
		queryKey: ['track-visit'],
		queryFn: async () => {
			const res = await axiosInstance.get('track-visit/stats')
			return res.data as {
				success: boolean
				totalTraffic: number
				percentageIncrease: number
				dailyTraffic: {
					day: string
					traffic: number
				}[]
			}
		},
		// refetchOnMount: false,
		refetchOnWindowFocus: false,
	})

	// day comes as yyyy-mm-dd
	// get only the day and
	// get only the first seven days (just in case)
	const traffic = data?.dailyTraffic
		.map((item) => ({
			day: item.day.split('-')[2],
			traffic: item.traffic,
		}))
		.slice(0, 8)

	if (isPending)
		return (
			<div className="w-full min-h-72 mb-4 p-4 shadow bg-white text-black rounded-2xl dark:text-white dark:bg-black">
				Loading traffic info...
			</div>
		)

	return (
		<div className="w-full min-h-72 mb-4 p-4 shadow bg-white text-black rounded-2xl dark:text-white dark:bg-black">
			<h5 className="text-grey text-base mb-2">Daily Traffic</h5>
			<div className="w-full flex">
				<p className="text-sm text-grey">
					<strong className="text-3xl font-bold text-black dark:text-white font-poppins pr-4">
						{data?.totalTraffic || 0}
					</strong>
					Visitors
				</p>
				<p className="text-sm flex items-center gap-1 text-primary font-semibold ml-auto">
					<IoMdArrowDropup className="text-red-500 text-xl" />+
					{data?.percentageIncrease || 0}%
				</p>
			</div>
			<Chart data={traffic || []} />
		</div>
	)
}
