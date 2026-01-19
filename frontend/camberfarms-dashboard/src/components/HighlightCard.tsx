import type { IconType } from 'react-icons'
import { FaArrowUp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export type HighlightCardProps = {
	title: string
	count: string
	Icon: IconType
	percent: string
	url: string
	info: string
	Tcolor?: string
	Icolor?: string
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
}: HighlightCardProps) {
	return (
		<Link
			to={url}
			className="p-4 shadow bg-white text-black rounded-2xl hover:scale-98 hover:bg-light-grey transition-all duration-200 ease-in"
		>
			<h6 className="text-lg capitalize">{title}</h6>
			<div className="flex items-center justify-between gap-6 my-2 mr-4">
				<h5 className={`text-3xl font-bold font-poppins ${Tcolor}`}>{count}</h5>
				<Icon className={`text-5xl bg-light-grey p-2 rounded-xl ${Icolor}`} />
			</div>
			<div className="flex items-center gap-1 text-primary font-light">
				<FaArrowUp className="text-lg" />
				<p className="ml-2">{percent}</p>
				<p className="text-grey">{info}</p>
			</div>
		</Link>
	)
}
