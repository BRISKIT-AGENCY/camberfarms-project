'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import arrowDown from '../../assets/icon/arrow-down.svg'
import closeIcon from '../../assets/icon/close-icon.svg'
import hamburgerIcon from '../../assets/icon/hamburger.svg'
import { useClickOutside } from '../../hooks/useClickOutside'
import LocaleSwitcher from './LocaleSwitcher'
import NavLink from './NavLink'

type NavMenuProps = {
	closeNav: () => void
}

export default function MobileNav() {
	const [isOpenNav, setIsOpenNav] = useState(false)
	const closeNav = () => setIsOpenNav(false)
	const ref = useRef<HTMLDivElement | null>(null)
	// close menu when user clicks outside
	useClickOutside(ref, closeNav)

	return (
		<nav
			className="lg:hidden w-full h-auto py-4 px-8 bg-white text-grey flex items-center justify-between capitalize shadow relative"
			ref={ref}
		>
			<div className="h-10 w-20 relative">
				<Image
					src={'/logo.png'}
					alt="camberfarms"
					fill
					priority
					className="object-contain"
				/>
			</div>
			{isOpenNav && <NavMenu closeNav={closeNav} />}
			<button
				type="button"
				aria-label="toggle navigation"
				className="h-10 w-20 cursor-pointer relative"
				onClick={() => setIsOpenNav(!isOpenNav)}
			>
				{isOpenNav && (
					<Image
						src={closeIcon}
						alt="camberfarms"
						fill
						priority
						className="object-contain"
					/>
				)}
				{!isOpenNav && (
					<Image
						src={hamburgerIcon}
						alt="camberfarms"
						fill
						priority
						className="object-contain"
					/>
				)}
			</button>
		</nav>
	)
}

function NavMenu({ closeNav }: NavMenuProps) {
	const [isOpen, setIsOpen] = useState(false)
	const t = useTranslations('common.nav')
	const tBtn = useTranslations('common.buttons')

	return (
		<div className="flex items-start flex-col gap-3 w-full bg-white z-20 absolute top-16 border-t border-light-grey px-10 py-6 left-0 shadow">
			<NavLink
				href="/"
				onClick={closeNav}
				extraStyles={isOpen ? 'text-grey' : ''}
			>
				{t('home')}
			</NavLink>
			<NavLink
				href="/about"
				onClick={closeNav}
				extraStyles={isOpen ? 'text-grey' : ''}
			>
				{t('about')}
			</NavLink>
			<div className="w-full" onClick={() => setIsOpen(!isOpen)}>
				<h6
					className={`flex items-center justify-between capitalize text-dark-grey cursor-pointer w-full pb-2 ${
						isOpen ? 'text-primary font-poppins font-bold border-b-2' : ''
					}`}
				>
					<span>{t('products')}</span>
					<Image
						src={arrowDown}
						alt=""
						width={50}
						height={50}
						className={`w-5 aspect-square shrink-0 transition-transform duration-300 ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</h6>
				{isOpen && (
					<div className="w-full flex flex-col pt-2 space-y-2 transition-discrete duration-200 ease-in-out transition-all">
						{PRODUCTS.map((p) => (
							<NavLink
								key={p.id}
								href={`/products/${p.name.replaceAll(' ', '-')}`}
								onClick={closeNav}
							>
								{p.name}
							</NavLink>
						))}
					</div>
				)}
			</div>
			<NavLink
				href="/blog"
				onClick={closeNav}
				extraStyles={isOpen ? 'text-grey' : ''}
			>
				{t('blog')}
			</NavLink>
			<NavLink
				href="/contact"
				onClick={closeNav}
				extraStyles={isOpen ? 'text-grey' : ''}
			>
				{t('contact')}
			</NavLink>
			<NavLink
				href="/affiliate"
				onClick={closeNav}
				extraStyles={isOpen ? 'text-grey' : ''}
			>
				{t('affiliate')}
			</NavLink>
			<LocaleSwitcher />
			<Link
				href={'#'}
				className="py-2 px-4 flex mt-4 rounded-lg font-poppins font-bold capitalize bg-primary text-white"
			>
				{tBtn('explore')}
			</Link>
		</div>
	)
}

const PRODUCTS = [
	{
		id: 1,
		name: 'grain seed',
	},
	{
		id: 2,
		name: 'tumeric',
	},
	{
		id: 3,
		name: 'raw pepper',
	},
	{
		id: 4,
		name: 'shea nut',
	},
	{
		id: 5,
		name: 'soyabeans',
	},
	{
		id: 6,
		name: 'wheat',
	},
]
