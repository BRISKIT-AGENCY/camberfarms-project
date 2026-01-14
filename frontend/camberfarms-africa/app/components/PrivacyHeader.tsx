
import Link from 'next/link'

export default function PrivacyHeader() {
	return (
		<div className="w-full bg-white h-fit md:py-30 py-17.5 flex items-center justify-center flex-col gap-4  text-dark-grey p-10 md:p-20 relative">
			
			<div className="w-full flex flex-col gap-4 z-2">
				<h1 className="md:text-[56px] text-[24px] text-[#1AD329] font-poppins font-bold text-primary">
					PRIVACY POLICY
				</h1>
				<p className="text-sm md:text-lg font-inter">
					Last Updated: 07 November 2025 — Version Number: 1.0.
				</p>
				<Link
					href={'privacy#introduction'}
					className="w-fit bg-[#1AD329] mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out"
				>
					<p className='md:text-[24px] text-[14px] font-bold'>Read</p>
				</Link>
			</div>
		</div>
	)
}