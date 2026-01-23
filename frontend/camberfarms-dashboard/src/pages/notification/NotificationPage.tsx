import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function NotificationPage() {
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		// navigate from base route to /africa
		if (location.pathname === '/notification') {
			navigate('africa')
		}
	}, [location, navigate])

	return (
		<section className="w-full bg-light-grey px-6 pt-6">
			<h3 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black mb-2">
				Notifications
			</h3>
			<nav className="w-full flex justify-start gap-6 border-b border-grey/20 mb-4 text-lg font-poppins text-grey">
				<NavLink
					to={'africa'}
					className={({ isActive }) =>
						`border-b-2 py-2 transition-all duration-200 ease-in-out ${isActive ? 'text-primary border-primary' : 'border-transparent'}`
					}
				>
					CamberFarms Africa
				</NavLink>
				<NavLink
					to={'export'}
					className={({ isActive }) =>
						`border-b-2 py-2 transition-all duration-200 ease-in-out ${isActive ? 'text-primary border-primary' : 'border-transparent'}`
					}
				>
					CamberFarms Export
				</NavLink>
			</nav>
			<Outlet />
		</section>
	)
}
