'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type NavLinkProps = {
	href: string
	children: string | ReactNode
	darkBg?: boolean
	extraStyles?: string
	onClick?: () => void
}

// returns a replica of React's NavLink element
// darkBg: does the parent have a dark background?
// extraStyles: customise element styles
export default function NavLink({
	href,
	darkBg = false,
	extraStyles,
	onClick,
	children,
}: NavLinkProps) {
	const pathname = usePathname()
	const isActive = href === pathname

	return (
		<Link
			href={href}
			onClick={onClick}
			className={`capitalize text-base hover:border-b-2 transition-all duration-200 ease-in-out w-fit ${
				darkBg
					? `text-white ${
							isActive ? 'font-bold font-poppins' : 'text-dark-grey font-inter'
					  }`
					: `text-black  ${
							isActive
								? 'font-bold font-poppins text-primary'
								: 'text-dark-grey font-inter'
					  }`
			} ${extraStyles}`}
		>
			{children}
		</Link>
	)
}
