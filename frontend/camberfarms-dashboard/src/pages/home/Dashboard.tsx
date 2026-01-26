import ChartContainer from './ChartContainer'
import Highlight from './Highlight'
import QuickActions from './QuickActions'
import RecentActivities from './RecentActivities'

export default function Dashboard() {
	return (
		<section className="w-full px-6">
			<h2 className="text-3xl text-black dark:text-white font-bold font-poppins xl:text-4xl">
				Dashboard overview
			</h2>
			<p className="text-base text-grey dark:text-light-grey my-2">
				Welcome back! Here's what's happening with your agricultural platform.
			</p>
			<Highlight />
			<div className="w-full grid grid-cols-[2fr_1fr] gap-4">
				<div className="w-full">
					<ChartContainer />
					<RecentActivities />
				</div>
				<QuickActions />
			</div>
		</section>
	)
}
