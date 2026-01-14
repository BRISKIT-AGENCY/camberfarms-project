'use client'
import closeIcon from '@/app/assets/icon/close-icon.svg'
import hamburgerIcon from '@/app/assets/icon/hamburger.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import arrowDown from '../../assets/icon/arrow-down.svg'
import NavLink from './NavLink'

export default function MobileNav() {
	const [isOpenNav, setIsOpenNav] = useState(false)
	return (
		<nav className="md:hidden w-full h-auto py-4 px-8 bg-white text-grey flex items-center justify-between capitalize shadow relative">
			<div className="h-10 w-20 relative">
				<Image
					src={'/logo.png'}
					alt="camberfarms"
					fill
					className="object-contain"
				/>
			</div>
			{isOpenNav && <NavMenu />}
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
						className="object-contain"
					/>
				)}
				{!isOpenNav && (
					<Image
						src={hamburgerIcon}
						alt="camberfarms"
						fill
						className="object-contain"
					/>
				)}
			</button>
		</nav>
	)
}

function NavMenu() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="flex items-start flex-col gap-3 w-full bg-white z-20 absolute top-16 border-t border-light-grey px-10 py-6 left-0 shadow">
			<NavLink href="/" extraStyles={isOpen ? 'text-grey' : ''}>
				home
			</NavLink>
			<NavLink href="/about" extraStyles={isOpen ? 'text-grey' : ''}>
				about us
			</NavLink>
			<div className="w-full" onClick={() => setIsOpen(!isOpen)}>
				<h6
					className={`flex items-center justify-between capitalize text-dark-grey cursor-pointer w-full pb-2 ${
						isOpen ? 'text-primary font-poppins font-bold border-b-2' : ''
					}`}
				>
					<span>our products</span>
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
						<NavLink href="/products/wheat">wheat</NavLink>
						<NavLink href="/products/black-pepper">black pepper</NavLink>
						<NavLink href="/products/mango-fruit">mango fruit</NavLink>
					</div>
				)}
			</div>
			<NavLink href="/blog" extraStyles={isOpen ? 'text-grey' : ''}>
				blog
			</NavLink>
			<NavLink href="/contact" extraStyles={isOpen ? 'text-grey' : ''}>
				contact us
			</NavLink>
			<NavLink href="/affiliate" extraStyles={isOpen ? 'text-grey' : ''}>
				affiliate program
			</NavLink>
			<Link
				href={'#'}
				className="py-2 px-4 flex mt-4 rounded-lg font-poppins font-bold capitalize bg-primary text-white"
			>
				explore camberfarms africa
			</Link>
		</div>
	)
}
