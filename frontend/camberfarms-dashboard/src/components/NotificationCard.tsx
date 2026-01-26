import { Link } from 'react-router-dom'
import { IconRenderer } from '../utils/IconRenderer'

export type NotiesProps = {
	iconName: string
	title: string
	desc: string
	Icolor: string
	id: string | number
	time?: string
	round?: string
}
export default function NotificationCard({
	iconName,
	title,
	desc,
	Icolor,
	time,
	id,
	round = 'full',
}: NotiesProps) {
	return (
		<Link
			to={`/${iconName}/${id}`}
			className="w-full block bg-white dark:bg-black rounded-lg py-1 hover:bg-light-grey dark:hover:bg-dark-grey"
		>
			<div className="w-full flex flex-nowrap items-center gap-3">
				<IconRenderer
					iconName={iconName}
					color={Icolor}
					className={`text-xl h-12 w-12 object-contain rounded-${round} p-2`}
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
