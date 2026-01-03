import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import arrowDown from '../../assets/icon/arrow-down.svg'
import NavLink from './NavLink'

type NavProps = {
	darkBg: boolean
}

export default function DesktopNav({ darkBg }: NavProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav
			className={`hidden w-full md:flex items-center justify-between py-6 px-8 absolute top-0 z-20 ${
				darkBg ? 'bg-transparent' : 'bg-white shadow-xs'
			}`}
		>
			<div className="h-10 w-20 relative">
				{darkBg && (
					<Image
						src={'./logo-white.svg'}
						alt="camberfarms"
						fill
						className="object-contain"
					/>
				)}
				{!darkBg && (
					<Image
						src={'/logo.png'}
						alt="camberfarms"
						fill
						className="object-contain"
					/>
				)}
			</div>
			<div className="flex items-center gap-4">
				<NavLink href="/" darkBg={darkBg}>
					home
				</NavLink>
				<NavLink href="/about" darkBg={darkBg}>
					about us
				</NavLink>
				<div
					className="relative"
					onMouseEnter={() => setIsOpen(true)}
					onMouseLeave={() => setIsOpen(false)}
				>
					<h6
						className={`flex items-center capitalize ${
							darkBg ? 'text-white' : 'text-dark-grey'
						}`}
					>
						<NavLink href="/products" darkBg={darkBg}>
							our products
						</NavLink>
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
						<div className="bg-white rounded-2xl py-4 px-8 min-w-max shadow-2xl flex flex-col space-y-2 absolute top-6 z-20 transition-discrete duration-200 ease-in-out transition-all">
							<NavLink href="/products/wheat" darkBg={false}>
								wheat
							</NavLink>
							<NavLink href="/products/black-pepper" darkBg={false}>
								black pepper
							</NavLink>
							<NavLink href="/products/mango-fruit" darkBg={false}>
								mango fruit
							</NavLink>
						</div>
					)}
				</div>
				<NavLink href="/blog" darkBg={darkBg}>
					blog
				</NavLink>
				<NavLink href="/contact" darkBg={darkBg}>
					contact us
				</NavLink>
				<NavLink href="/affiliate" darkBg={darkBg}>
					affiliate program
				</NavLink>
			</div>
			<Link
				href={'#'}
				className={`py-2 px-4 rounded-lg font-poppins font-bold capitalize ${
					darkBg ? 'bg-white text-primary' : 'bg-primary text-white'
				}`}
			>
				explore camberfarms africa
			</Link>
		</nav>
	)
}
