import Link from 'next/link'

export default function Hero() {
	return (
		<div className="w-full px-10 md:px-20 py-20">
			<h1
				className="font-poppins capitalize font-bold text-primary text-2xl sm:text-3xl lg:text-4xl"
				id="contact"
			>
				Get In Touch With <br /> CamberFarm Export
			</h1>
			<p className="text-sm max-w-xl mt-4 lg:text-base lg:max-w-2xl">
				We&apos;d love to hear from you. Whether you&apos;re an importer,
				distributor, or trade partner, our team is ready t provide all the
				information you need about our products and export services.
			</p>
			<Link
				href={'contact#message'}
				className="w-fit mt-6 flex items-center justify-center px-6 py-2 rounded-full capitalize bg-primary text-white font-sans font-medium cursor-pointer hover:bg-primary/70 transition-colors ease-in-out"
			>
				send enquiry
			</Link>
		</div>
	)
}
