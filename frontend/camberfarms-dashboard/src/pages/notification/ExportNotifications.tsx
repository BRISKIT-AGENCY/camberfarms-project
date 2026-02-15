import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import NotificationCard from '../../components/NotificationCard'
import { categoryColor } from '../../helpers/getCategoryColor'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'
import type { Notification } from '../../types/notification'
//
export default function ExportNotifications() {
	const refresh = useRefetchQueries('notifications/export')
	const { data, isPending, error } = useQuery({
		queryKey: ['notifications', 'notifications/export'],
		queryFn: async () => {
			const res = await axiosInstance.get('export/notifications')
			return res.data as {
				total: number
				notifications: Notification[]
			}
		},
		retry: false,
		refetchOnWindowFocus: false,
	})

	if (isPending) return <LoadingSpinner />

	if (error)
		return (
			<div className="w-full mt-10 text-center">
				<p>Unable to get notifications: {error.message}</p>
				<button
					type="button"
					onClick={refresh}
					className="w-fit mx-auto mt-4 py-2 px-6 rounded-full border"
				>
					refresh
				</button>
			</div>
		)

	return (
		<div className="w-full grid grid-cols-1 gap-4 my-6 pb-20">
			{data &&
				data.notifications.map((item) => (
					<div
						className="w-full bg-white dark:bg-black p-4 rounded-lg"
						key={item._id}
					>
						<NotificationCard
							desc={item.description}
							id={item._id}
							title={item.title}
							iconName={item.type}
							Icolor={categoryColor[item.type]}
							time={formatDistanceToNow(item.createdAt!)}
						/>
					</div>
				))}
		</div>
	)
}
