import { IoMdArrowDropup } from 'react-icons/io'
import Chart from './Chart'

export default function ChartContainer() {
	return (
		<div className="w-full min-h-72 mb-4 p-4 shadow bg-white text-black rounded-2xl dark:text-white dark:bg-black">
			<h5 className="text-grey text-base mb-2">Daily Traffic</h5>
			<div className="w-full flex">
				<p className="text-sm text-grey">
					<strong className="text-3xl font-bold text-black dark:text-white font-poppins pr-4">
						1.978
					</strong>
					Visitors
				</p>
				<p className="text-sm flex items-center gap-1 text-primary font-semibold ml-auto">
					<IoMdArrowDropup className="text-red-500 text-xl" />
					+4.9%
				</p>
			</div>
			<Chart />
		</div>
	)
}
