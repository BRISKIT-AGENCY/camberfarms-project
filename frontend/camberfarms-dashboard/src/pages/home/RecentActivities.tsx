import { formatDistanceToNow } from 'date-fns'
import NotificationCard from '../../components/NotificationCard'

export default function RecentActivities() {
	return (
		<div className="w-full py-4 px-6 lg:py-6 mb-6 shadow-2xs bg-white text-black rounded-xl space-y-6">
			<h4 className="text-2xl font-semibold font-poppins capitalize py-2">
				recent activities
			</h4>
			{notifications.map((item, index) => (
				<NotificationCard
					key={index}
					title={item.title}
					desc={`by ${item.from} • ${formatDistanceToNow(item.time, { addSuffix: true })}`}
					Icolor={categoryColor[item.category]}
					iconName={item.category}
					round="lg"
				/>
			))}
		</div>
	)
}

const categoryColor: Record<string, string> = {
	products: '#16A34A',
	enquiries: '#D00000',
	articles: '#CB30E0',
	news: '#CB30E0',
}

const notifications = [
	{
		title: 'New product "Organic Tomato Seeds" added',
		from: 'Admin User',
		time: '2026-01-17T13:18:36Z',
		category: 'products',
	},
	{
		title: 'New enquiry from John Smith about fertilizers',
		from: 'Customer',
		time: '2026-01-17T13:18:36Z',
		category: 'enquiries',
	},
	{
		title: 'Published article "Sustainable Farming Practices"',
		from: 'Admin User',
		time: '2026-01-17T13:18:36Z',
		category: 'articles',
	},
	{
		title: 'New enquiry from John Smith about fertilizers',
		from: 'Customer',
		time: '2026-01-17T13:18:36Z',
		category: 'enquiries',
	},
]
