import { LuCalendar } from 'react-icons/lu'
import { RiNotification2Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export default function Topbar({ name = 'a' }: { name: string }) {
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
					className="p-2 w-10 flex items-center justify-center aspect-square bg-primary rounded-full text-white text-base font-poppins font-bold capitalize"
				>
					{name[0]}
				</Link>
			</div>
		</div>
	)
}
