'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Navbar() {
	const pathname = usePathname()
	const locale = useLocale()
	// add routes+locale
	// remove extra / (for homepage with locale)
	const routesWithLocale = routesWithBg.map((route) =>
		`${route}/${locale}`.replace('//', '/')
	)

	const routes = [...routesWithBg, ...routesWithLocale]

	// check if current route is part of 'routesWithBg
	const darkBg = routes.some((route) => route === pathname)
	return (
		<>
			<MobileNav />
			<DesktopNav darkBg={darkBg} />
		</>
	)
}

// pages/routes that have a transparent navbar
const routesWithBg = ['/', '/affiliate', '/products']
