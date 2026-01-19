import { Link } from 'react-router-dom'
import { IconRenderer } from '../utils/IconRenderer'

type notiesProps = {
	iconName: string
	title: string
	desc: string
	Icolor: string
	time?: string
	round?: string
}
export default function NotificationCard({
	iconName,
	title,
	desc,
	Icolor,
	time,
	round = 'full',
}: notiesProps) {
	return (
		<Link
			to={`/${iconName}`}
			className="w-full block bg-white rounded-lg py-1 hover:bg-light-grey"
		>
			<div className="w-full flex flex-nowrap items-center gap-3">
				<IconRenderer
					iconName={iconName}
					color={Icolor}
					className={`text-xl h-12 w-12 rounded-${round} p-2`}
					style={{ backgroundColor: `${Icolor}17` }}
				/>
				<div className="flex-1 flex flex-col justify-between">
					<h6 className="text-lg font-dark-grey capitalize">{title}</h6>
					<p className="text-grey">{desc}</p>
				</div>
			</div>
			{time && <p className="text-sm text-grey w-fit ml-auto">{time}</p>}
		</Link>
	)
}
