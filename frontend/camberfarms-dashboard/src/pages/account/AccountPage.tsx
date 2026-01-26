import { Outlet } from 'react-router-dom'
import AccountProfile from './AccountProfile'
import AccountSettings from './AccountSettings'

export default function AccountPage() {
	return (
		<section className="w-full px-6 pb-20 lg:pr-20" role="main">
			<h1 className="text-2xl lg:text-3xl xl:text-4xl font-poppins font-bold text-black dark:text-white capitalize">
				account settings
			</h1>
			<AccountProfile />
			<AccountSettings />
			<Outlet />
		</section>
	)
}
