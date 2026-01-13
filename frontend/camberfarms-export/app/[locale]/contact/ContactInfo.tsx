import locationIcon from '@/app/[locale]/assets/icon/location-orange-bg.svg'
import mailIcon from '@/app/[locale]/assets/icon/mail-orange-bg.svg'
import phoneIcon from '@/app/[locale]/assets/icon/phone-orange-bg.svg'
import timeIcon from '@/app/[locale]/assets/icon/time-orange-bg.svg'
import Image from 'next/image'

export default function ContactInfo() {
	return (
		<section className="w-full py-20 px-10 md:px-20 bg-primary text-white flex flex-col items-start justify-start gap-10">
			<div className="flex items-center gap-5">
				<Image
					src={mailIcon}
					alt="email"
					width={50}
					height={50}
					className="bg-secondary rounded-full object-fill w-8 aspect-square"
				/>
				<div className="">
					<h6 className="font-poppins font-semibold text-lg capitalize">
						Email
					</h6>
					<a
						href="mailto:info@camberfarmexport.com"
						className="text-sm text-light-grey"
					>
						info@camberfarmexport.com
					</a>
				</div>
			</div>
			<div className="flex items-center gap-5">
				<Image
					src={phoneIcon}
					alt="phone"
					width={50}
					height={50}
					className="bg-secondary rounded-full object-fill w-8 aspect-square"
				/>
				<div className="">
					<h6 className="font-poppins font-semibold text-lg capitalize">
						Phone
					</h6>
					<a href="tel:+2349016789123" className="text-sm text-light-grey">
						+234 901 6789 123
					</a>
				</div>
			</div>
			<div className="flex items-center gap-5">
				<Image
					src={locationIcon}
					alt="address"
					width={50}
					height={50}
					className="bg-secondary rounded-full object-fill w-8 aspect-square"
				/>
				<div className="">
					<h6 className="font-poppins font-semibold text-lg capitalize">
						Address
					</h6>
					<address className="text-sm text-light-grey not-italic">
						123 Trade Zone, Lagos, Nigeria
					</address>
				</div>
			</div>
			<div className="flex items-center gap-5">
				<Image
					src={timeIcon}
					alt="time"
					width={50}
					height={50}
					className="bg-secondary rounded-full object-fill w-8 aspect-square"
				/>
				<div className="">
					<h6 className="font-poppins font-semibold text-lg capitalize">
						Business Hours
					</h6>
					<time className="text-sm text-light-grey">
						Monday - Friday | 8:00 AM - 6:00 PM
					</time>
				</div>
			</div>
		</section>
	)
}
