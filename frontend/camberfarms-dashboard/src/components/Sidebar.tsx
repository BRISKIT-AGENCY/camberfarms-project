import { CiImageOn } from 'react-icons/ci'
import { FaWpforms } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { IoNewspaperOutline, IoPeople } from 'react-icons/io5'
import { MdArticle, MdDashboard } from 'react-icons/md'
import { RiNotification2Fill } from 'react-icons/ri'
import { TbAffiliate, TbSeedingFilled } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import logo from '../assets/icon/logo-white.svg'
// import patternBg from '../assets/img/bg-pattern-white.png'

export default function Sidebar() {
	return (
		<nav className="w-full flex flex-col bg-grey/98 bg-[url('./assets/img/bg-pattern-white.png')] bg-blend-color text-white px-4 pt-2 pb-10 space-y-6">
			<div className="w-full h-28 mb-8 flex items-center justify-center p-6 border-b border-light-grey">
				<img
					src={logo}
					alt="camberfarms"
					className="w-full object-contain object-centers"
				/>
			</div>
			{navLinks.map((l) => (
				<NavLink
					to={l.url}
					key={l.title}
					className={({ isActive }) =>
						`flex items-center justify-start gap-2 py-2 px-2 w-full capitalize rounded-lg ${
							isActive
								? 'bg-white text-primary border-secondary border-r-4 font-poppins font-bold'
								: 'text-white font-inter bg-transparent'
						}`
					}
				>
					<l.icon className="text-2xl" />
					<span>{l.title}</span>
				</NavLink>
			))}
		</nav>
	)
}

const navLinks = [
	{
		title: 'dashboard',
		url: '/',
		icon: MdDashboard,
	},
	{
		title: 'products',
		url: '/products',
		icon: TbSeedingFilled,
	},
	{
		title: 'enquiries',
		url: '/enquiries',
		icon: HiOutlineMail,
	},
	{
		title: 'blog',
		url: '/blog',
		icon: MdArticle,
	},
	{
		title: 'news',
		url: '/news',
		icon: IoNewspaperOutline,
	},
	{
		title: 'gallery',
		url: '/gallery',
		icon: CiImageOn,
	},
	{
		title: 'membership',
		url: '/membership',
		icon: IoPeople,
	},
	{
		title: 'farm fund form',
		url: '/farm-fund-form',
		icon: FaWpforms,
	},
	{
		title: 'notification',
		url: '/notification',
		icon: RiNotification2Fill,
	},
	{
		title: 'affiliate',
		url: '/affiliate',
		icon: TbAffiliate,
	},
]
