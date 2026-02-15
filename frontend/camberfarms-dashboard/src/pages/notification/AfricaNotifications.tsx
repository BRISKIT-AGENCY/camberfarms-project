import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import axiosInstance from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import NotificationCard from '../../components/NotificationCard'
import { categoryColor } from '../../helpers/getCategoryColor'
import { useRefetchQueries } from '../../hooks/useRefetchQueries'
import type { Notification } from '../../types/notification'

export default function AfricaNotifications() {
	const refresh = useRefetchQueries('notifications/africa')
	const { data, isPending, error } = useQuery({
		queryKey: ['notifications', 'notifications/africa'],
		queryFn: async () => {
			const res = await axiosInstance.get('africa/notifications')
			return res.data as {
				total: number
				notifications: Notification[]
			}
		},
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

// const notification: NotiesProps[] = [
// 	{
// 		title: 'New enquiry from John Smith about Camberfarm',
// 		desc: 'I want to partner with Camberfarm, i love what they are building...',
// 		Icolor: '#D00000',
// 		iconName: 'enquiries',
// 		time: '2026-01-17T13:18:36Z',
// 		id: 1,
// 	},
// 	{
// 		title: 'New News articles have just been uploaded successfully',
// 		desc: 'Moew new articles have been uploaded.',
// 		Icolor: '#CB30E0',
// 		iconName: 'news',
// 		time: '2026-01-17T13:18:36Z',
// 		id: 2,
// 	},
// 	{
// 		title: 'New enquiry from John Smith about Camberfarm',
// 		desc: 'I want to partner with Camberfarm, i love what they are building...',
// 		Icolor: '#D00000',
// 		iconName: 'enquiries',
// 		time: '2026-01-17T13:18:36Z',
// 		id: 3,
// 	},
// 	{
// 		title: 'New News articles have just been uploaded successfully',
// 		desc: 'Moew new articles have been uploaded.',
// 		Icolor: '#CB30E0',
// 		iconName: 'news',
// 		time: '2026-01-17T13:18:36Z',
// 		id: 4,
// 	},
// 	{
// 		title: 'New enquiry from John Smith about Camberfarm',
// 		desc: 'I want to partner with Camberfarm, i love what they are building...',
// 		Icolor: '#D00000',
// 		iconName: 'enquiries',
// 		time: '2026-01-17T13:18:36Z',
// 		id: 5,
// 	},
// 	{
// 		title: 'New News articles have just been uploaded successfully',
// 		desc: 'Moew new articles have been uploaded.',
// 		Icolor: '#CB30E0',
// 		iconName: 'news',
// 		time: '2026-01-17T13:18:36Z',
// 		id: 6,
// 	},
// ]
