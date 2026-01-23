import { formatDistanceToNow } from 'date-fns'
import NotificationCard, {
	type NotiesProps,
} from '../../components/NotificationCard'

export default function ExportNitifications() {
	return (
		<div className="w-full grid grid-cols-1 gap-4 my-6 pb-20">
			{notification.map((item, index) => (
				<div className="w-full bg-white p-4 rounded-lg">
					<NotificationCard
						key={index}
						{...item}
						time={formatDistanceToNow(item.time!)}
					/>
				</div>
			))}
		</div>
	)
}

const notification: NotiesProps[] = [
	{
		title: 'New enquiry from John Smith about Camberfarm',
		desc: 'I want to partner with Camberfarm, i love what they are building...',
		Icolor: '#D00000',
		iconName: 'enquiries',
		time: '2026-01-17T13:18:36Z',
		id: 1,
	},
	{
		title: 'New News articles have just been uploaded successfully',
		desc: 'Moew new articles have been uploaded.',
		Icolor: '#CB30E0',
		iconName: 'news',
		time: '2026-01-17T13:18:36Z',
		id: 2,
	},
	{
		title: 'New enquiry from John Smith about Camberfarm',
		desc: 'I want to partner with Camberfarm, i love what they are building...',
		Icolor: '#D00000',
		iconName: 'enquiries',
		time: '2026-01-17T13:18:36Z',
		id: 3,
	},
	{
		title: 'New News articles have just been uploaded successfully',
		desc: 'Moew new articles have been uploaded.',
		Icolor: '#CB30E0',
		iconName: 'news',
		time: '2026-01-17T13:18:36Z',
		id: 4,
	},
	{
		title: 'New enquiry from John Smith about Camberfarm',
		desc: 'I want to partner with Camberfarm, i love what they are building...',
		Icolor: '#D00000',
		iconName: 'enquiries',
		time: '2026-01-17T13:18:36Z',
		id: 5,
	},
	{
		title: 'New News articles have just been uploaded successfully',
		desc: 'Moew new articles have been uploaded.',
		Icolor: '#CB30E0',
		iconName: 'news',
		time: '2026-01-17T13:18:36Z',
		id: 6,
	},
]
