'use client'

import { usePathname } from 'next/navigation'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Navbar() {
	const pathname = usePathname()
	// check if current route is part of 'routesWithBg
	const darkBg = routesWithBg.some((route) => route === pathname)
	return (
		<>
			<MobileNav />
			<DesktopNav darkBg={darkBg} />
		</>
	)
}

// pages/routes that have a transparent navbar
const routesWithBg = ['/', '/affiliate', '/products']

// TODO add language switcher (internationalization)
