import Link from 'next/link'
import { ReactElement } from 'react'

type ButtonProps = {
	link: string
	children: ReactElement | string
}

export function PrimaryBtnLink({ link, children }: ButtonProps) {
	return (
		<Link
			href={link}
			className="w-fit flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium"
		>
			{children}
		</Link>
	)
}

export function SecondaryBtnLink({ link, children }: ButtonProps) {
	return (
		<Link
			href={link}
			className="w-fit px-6 py-2 rounded-full capitalize bg-transparent border text-primary font-sans font-medium hover:bg-primary hover:text-white transition-colors duration-200"
		>
			{children}
		</Link>
	)
}
