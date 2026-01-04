import { NavLink } from 'react-router-dom'

export default function Sidebar() {
	return (
		<nav className="w-full flex flex-col bg-grey text-white p-6 space-y-4">
			<h2>Sidebar</h2>
			<NavLink to={'/'}>Home</NavLink>
			<NavLink to={'/products'}>products</NavLink>
		</nav>
	)
}
