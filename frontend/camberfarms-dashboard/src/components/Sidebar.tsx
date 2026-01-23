import { NavLink } from 'react-router-dom'
import logo from '../assets/icon/logo-white.svg'
import { IconRenderer } from '../utils/IconRenderer'

export default function Sidebar() {
	return (
		<nav className="w-full flex flex-col bg-grey/98 bg-[url('./assets/img/bg-pattern-white.png')] bg-blend-color text-white px-4 pt-2 pb-10 space-y-6">
			<div className="w-full h-10 lg:h-28 mb-8 flex items-center justify-center lg:p-6 border-b border-light-grey">
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
						`flex items-center justify-start gap-2 py-2 px-2 w-full capitalize rounded-lg focus-within:outline-0 focus-within:border-l-3 focus-within:rounded-l-sm focus-within:border-l-white transition-all ease-in-out duration-200 transition-discrete ${
							isActive
								? 'bg-white text-primary border-secondary border-r-4 font-poppins font-bold'
								: 'text-white font-inter bg-transparent'
						}`
					}
				>
					<IconRenderer iconName={l.title} className="text-2xl" />
					<span className="hidden lg:inline-flex">{l.title}</span>
				</NavLink>
			))}
		</nav>
	)
}

const navLinks = [
	{
		title: 'dashboard',
		url: '/',
	},
	{
		title: 'products',
		url: '/products',
	},
	{
		title: 'enquiries',
		url: '/enquiries',
	},
	{
		title: 'blog',
		url: '/blog',
	},
	{
		title: 'news',
		url: '/news',
	},
	{
		title: 'gallery',
		url: '/gallery',
	},
	{
		title: 'membership',
		url: '/membership',
	},
	{
		title: 'farm fund form',
		url: '/farm-fund-form',
	},
	{
		title: 'notification',
		url: '/notification',
	},
	{
		title: 'affiliate',
		url: '/affiliate',
	},
]
