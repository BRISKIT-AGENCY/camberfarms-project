import { LuCalendar } from 'react-icons/lu'
import { RiNotification2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { formatImgUrl } from '../helpers/formatImgUrl'

export default function Topbar({
	name = 'admin',
	avatar,
}: {
	name?: string
	avatar?: string
}) {
	const now = new Date()
	const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' })
	const month = now.toLocaleDateString('en-US', { month: 'short' })
	const day = now.getDate()
	const year = now.getFullYear()

	return (
		<div className="w-full p-8 shadow-xs flex items-center justify-between gap-4 light:bg-background dark:bg-foreground light:text-foreground dark:text-background">
			<div className="flex items-center gap-2 capitalize font-inter">
				<LuCalendar className="text-lg" />
				<p>
					{dayOfWeek}, {month} {day}, {year}
				</p>
			</div>
			<div className="flex gap-2 items-center">
				<Link
					to={'/notification'}
					className="p-2 w-10 flex items-center justify-center aspect-square bg-light-grey rounded-full text-foreground text-lg"
				>
					<RiNotification2Fill />
				</Link>
				<Link
					to={'/account'}
					className="w-10 aspect-square text-white text-base font-poppins font-bold capitalize"
				>
					{!avatar && (
						<span className="w-full p-2 flex items-center justify-center aspect-square bg-primary rounded-full">
							{name[0]}
						</span>
					)}
					{avatar && (
						<img
							src={formatImgUrl(avatar)}
							className="w-full h-full object-fill object-center rounded-full shadow"
							alt=""
						/>
					)}
				</Link>
			</div>
		</div>
	)
}
