import type { IconType } from 'react-icons'
import { FaArrowUp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export type HighlightCardProps = {
	title: string
	count: string | number
	Icon: IconType
	percent: string | number
	url: string
	info: string
	Tcolor?: string
	Icolor?: string
	showArrowUp?: boolean
	disable?: boolean
}

export default function HighlightCard({
	title,
	count,
	Icon,
	info,
	percent,
	url,
	Icolor = 'black',
	Tcolor = 'black',
	showArrowUp = true,
	disable = false,
}: HighlightCardProps) {
	return (
		<Link
			to={url}
			className={`p-4 shadow bg-white text-black rounded-2xl  transition-all duration-200 ease-in dark:bg-black dark:text-white dark:hover:bg-black/50 ${disable ? 'opacity-50' : 'opacity-100 hover:scale-98 hover:bg-light-grey'}`}
		>
			<h6 className="text-lg capitalize">{title}</h6>
			<div className="flex items-center justify-between gap-6 my-2 mr-4">
				<h5 className={`text-3xl font-bold font-poppins ${Tcolor}`}>
					{disable ? '--' : count}
				</h5>
				<Icon
					className={`text-5xl bg-light-grey dark:bg-dark-grey p-2 rounded-xl ${Icolor}`}
				/>
			</div>
			<div className="flex items-center gap-1 text-primary font-light">
				{showArrowUp && <FaArrowUp className="text-lg pr-1" />}
				<p className="">{disable ? '--' : percent}</p>
				<p className="text-grey">{info}</p>
			</div>
		</Link>
	)
}
