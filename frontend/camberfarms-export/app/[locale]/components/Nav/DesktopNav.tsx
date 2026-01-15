'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import arrowDown from '../../assets/icon/arrow-down.svg'
import { useClickOutside } from '../../hooks/useClickOutside'
import LocaleSwitcher from './LocaleSwitcher'
import NavLink from './NavLink'

type NavProps = {
	darkBg: boolean
}

export default function DesktopNav({ darkBg }: NavProps) {
	const [isOpen, setIsOpen] = useState(false)
	const close = () => setIsOpen(false)
	const ref = useRef<HTMLDivElement | null>(null)
	// close menu when user clicks outside
	useClickOutside(ref, close)

	const t = useTranslations('common.nav')
	const tBtn = useTranslations('common.buttons')

	return (
		<nav
			className={`hidden w-full lg:flex items-center justify-between py-6 px-8 absolute top-0 z-20 ${
				darkBg ? 'bg-transparent text-white' : 'bg-white text-black shadow-xs'
			}`}
		>
			<div className="h-10 w-20 relative">
				{darkBg && (
					<Image
						src={'./logo-white.svg'}
						alt="camberfarms"
						fill
						priority
						className="object-contain"
					/>
				)}
				{!darkBg && (
					<Image
						src={'/logo.png'}
						alt="camberfarms"
						fill
						priority
						className="object-contain"
					/>
				)}
			</div>
			<div className="flex items-center gap-4">
				<NavLink href="/" darkBg={darkBg}>
					{t('home')}
				</NavLink>
				<NavLink href="/about" darkBg={darkBg}>
					{t('about')}
				</NavLink>
				<div
					className="relative"
					ref={ref}
					// onMouseEnter={() => setIsOpen(true)}
					// onMouseLeave={() => setIsOpen(false)}
				>
					<h6
						className={`flex items-center capitalize ${
							darkBg ? 'text-white' : 'text-dark-grey'
						}`}
					>
						<NavLink href="/products" darkBg={darkBg}>
							{t('products')}
						</NavLink>
						<Image
							onClick={() => setIsOpen(!isOpen)}
							src={arrowDown}
							alt=""
							priority
							// width={50}
							// height={50}
							className={`w-5 aspect-square shrink-0 transition-transform duration-300 cursor-pointer ${
								isOpen ? 'rotate-180' : ''
							}`}
						/>
					</h6>
					{isOpen && (
						<div className="bg-white rounded-2xl py-4 px-8 min-w-max shadow-2xl flex flex-col space-y-2 absolute top-6 z-20 transition-discrete duration-200 ease-in-out transition-all">
							{PRODUCTS.map((p) => (
								<NavLink
									key={p.id}
									href={`/products/${p.name.replaceAll(' ', '-')}`}
									onClick={close}
								>
									{p.name}
								</NavLink>
							))}
						</div>
					)}
				</div>
				<NavLink href="/blog" darkBg={darkBg}>
					{t('blog')}
				</NavLink>
				<NavLink href="/contact" darkBg={darkBg}>
					{t('contact')}
				</NavLink>
				<NavLink href="/affiliate" darkBg={darkBg}>
					{t('affiliate')}
				</NavLink>
				<LocaleSwitcher />
			</div>
			<Link
				href={'#'}
				className={`py-2 px-4 rounded-lg font-poppins font-bold capitalize ${
					darkBg ? 'bg-white text-primary' : 'bg-primary text-white'
				}`}
			>
				{tBtn('explore')}
			</Link>
		</nav>
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
