import type { IconType } from 'react-icons'
import { CiImageOn } from 'react-icons/ci'
import { FaWpforms } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { IoNewspaperOutline, IoPeople } from 'react-icons/io5'
import { MdArticle, MdDashboard } from 'react-icons/md'
import { RiNotification2Fill, RiSeedlingLine } from 'react-icons/ri'
import { TbAffiliate } from 'react-icons/tb'

// export type IconName = keyof typeof ICONS

type IconProps = {
	iconName: string
	size?: number
	color?: string
	className?: string
	style?: object
}

export function IconRenderer({
	iconName,
	size = 24,
	color = 'currentColor',
	className,
	style,
}: IconProps) {
	const Icon: IconType = ICONS[iconName] || null

	return Icon ? (
		<Icon size={size} color={color} className={className} style={style} />
	) : null
}

const ICONS: Record<string, IconType> = {
	enquiries: HiOutlineMail,
	products: RiSeedlingLine,
	articles: MdArticle,
	affiliate: TbAffiliate,
	dashboard: MdDashboard,
	notification: RiNotification2Fill,
	news: IoNewspaperOutline,
	forms: FaWpforms,
	gallery: CiImageOn,
	membership: IoPeople,
	blog: MdArticle,
	['farm fund form']: FaWpforms,
}
