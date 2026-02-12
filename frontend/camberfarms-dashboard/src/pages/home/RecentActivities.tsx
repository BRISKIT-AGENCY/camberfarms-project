import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import axiosInstance from '../../api/axios'
import NotificationCard from '../../components/NotificationCard'
import { categoryColor } from '../../helpers/getCategoryColor'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'
import type { Notification } from '../../types/notification'

export default function RecentActivities() {
	const refresh = useRefetchQueries('recent-activity')
	const { data, isPending, isRefetching, error } = useQuery({
		queryKey: ['recent-activity'],
		queryFn: async () => {
			const [a, e] = await Promise.all([
				axiosInstance.get('africa/notifications', { params: { limit: 3 } }),
				axiosInstance.get('export/notifications', { params: { limit: 3 } }),
			])
			return { africa: a.data, export: e.data } as {
				africa: {
					total: number
					notifications: Notification[]
				}
				export: {
					total: number
					notifications: Notification[]
				}
			}
		},
		refetchOnWindowFocus: false,
	})

	const notifications = data?.africa.notifications
		? [...data.africa.notifications, ...data.export.notifications]
		: []
	// console.log('notifications: ', notifications)
	return (
		<div className="w-full py-4 px-6 lg:py-6 mb-6 shadow-2xs bg-white text-black rounded-xl space-y-6 dark:text-white dark:bg-black">
			<h4 className="text-2xl font-semibold font-poppins capitalize py-2">
				recent activities
			</h4>
			{isPending ||
				(isRefetching && !data && (
					<div className="w-full text-center mt-10">Loading activitiess...</div>
				))}
			{error && (
				<div className="w-full mt-10 text-center">
					<p>Unable to get recent activities: {error?.message}</p>
					<button
						type="button"
						onClick={refresh}
						className="w-fit mx-auto mt-4 py-2 px-6 rounded-full border capitalize cursor-pointer"
					>
						refresh
					</button>
				</div>
			)}
			{!error &&
				notifications &&
				notifications.map((item, index) => (
					<NotificationCard
						id={item._id}
						key={index}
						title={item.title}
						desc={`by ${item.type === 'enquiry' ? 'Customer' : 'Admin User'} • ${formatDistanceToNow(item.createdAt, { addSuffix: true })}`}
						Icolor={categoryColor[item.type]}
						iconName={item.type}
						round="lg"
					/>
				))}
		</div>
	)
}
