import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="w-full relative min-h-screen flex flex-col justify-center items-center">
			<div className="w-full flex gap-4 flex-col items-center justify-center pt-20 px-10 pb-10">
				<h1 className="text-4xl font-poppins font-bold text-secondary">
					Not Found
				</h1>
				<p>Could not find the requested resource</p>
				<Link
					href={'/'}
					className="w-fit mx-auto flex items-center px-6 py-2 rounded-full capitalize bg-[#1AD329] text-black text-base font-poppins font-medium mt-5 hover:bg-[#1AD329]/70 transition-colors duration-200"
				>
					Return Home
				</Link>
			</div>
		</div>
	)
}