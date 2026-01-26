import type { IconType } from 'react-icons'
import { FaArrowRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export type QuickActionCardProps = {
	title: string
	desc: string
	url: string
	Icon: IconType
	Icolor: string
}

export default function QuickActionCard({
	title,
	desc,
	url,
	Icon,
	Icolor,
}: QuickActionCardProps) {
	return (
		<Link
			to={url}
			className="w-full flex flex-nowrap items-center gap-4 p-3 shadow-xs lg:p-6 bg-light-grey dark:bg-dark-grey text-white dark:text-black lg:shadow-sm rounded-xl transition-all duration-200 ease-in"
			title={title}
		>
			<Icon
				className={`text-xl h-12 w-12 rounded-xl p-2 dark:text-black ${Icolor}`}
			/>
			<div className="flex-1 flex flex-col justify-between">
				<h6 className="text-sm font-medium lg:font-normal lg:text-lg capitalize text-black dark:text-white">
					{title}
				</h6>
				<p className="text-grey hidden lg:block">{desc}</p>
			</div>
			<FaArrowRight className="hidden lg:flex ml-auto text-2xl text-grey" />
		</Link>
	)
}
