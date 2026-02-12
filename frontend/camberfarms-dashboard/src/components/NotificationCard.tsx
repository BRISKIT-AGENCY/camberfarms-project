import { Link } from 'react-router-dom'
import type { NotificationProps } from '../types/notification'
import { IconRenderer } from '../utils/IconRenderer'

export default function NotificationCard({
	iconName,
	title,
	desc,
	Icolor,
	time,
	id,
	round = 'full',
}: NotificationProps) {
	return (
		<Link
			to={`/${iconName}/${id}`}
			className="w-full block bg-white dark:bg-black rounded-lg py-1 hover:bg-light-grey dark:hover:bg-dark-grey"
		>
			<div className="w-full flex flex-nowrap items-center gap-3">
				<IconRenderer
					iconName={iconName}
					className={`text-xl h-12 w-12 object-contain text-primary rounded-${round} p-2`}
					color={Icolor}
					style={{ backgroundColor: `${Icolor}17` }}
				/>
				<div className="flex-1 flex flex-col justify-between">
					<h6 className="text-lg capitalize">{title}</h6>
					<p className="text-grey dark:text-light-grey">{desc}</p>
				</div>
			</div>
			{time && (
				<p className="text-sm text-grey dark:text-light-grey w-fit ml-auto">
					{time}
				</p>
			)}
		</Link>
	)
}
