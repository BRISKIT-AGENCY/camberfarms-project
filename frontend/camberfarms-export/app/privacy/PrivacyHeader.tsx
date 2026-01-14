import patternBg from '@/app/assets/img/bg-pattern-white.png'
import Image from 'next/image'
import Link from 'next/link'

export default function PrivacyHeader() {
	return (
		<div className="w-full min-h-[60vh] xl:min-h-[40vh] flex items-center justify-center flex-col gap-4 bg-white text-dark-grey p-10 md:p-20 relative">
			<Image
				src={patternBg}
				fill
				sizes="100vw"
				placeholder="blur"
				alt=""
				className="object-cover object-center opacity-3"
			/>
			<div className="w-full flex flex-col gap-4 z-2">
				<h1 className="text-3xl sm:text-4xl font-poppins font-bold text-primary">
					PRIVACY POLICY
				</h1>
				<p className="text-sm font-inter">
					Last Updated: 07 November 2025 — Version Number: 1.0.
				</p>
				<Link
					href={'privacy#introduction'}
					className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out"
				>
					read
				</Link>
			</div>
		</div>
	)
}
