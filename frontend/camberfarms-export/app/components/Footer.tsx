import Image from 'next/image'
import Link from 'next/link'
import callIcon from '../assets/icon/call-white.svg'
import facebookIcon from '../assets/icon/facebook-f.svg'
import instagramIcon from '../assets/icon/instagram.svg'
import linkedinIcon from '../assets/icon/linkedin-in.svg'
import mailIcon from '../assets/icon/mail-white.svg'
import twitterIcon from '../assets/icon/twitter-x.svg'
import bgPatternImg from '../assets/img/bg-pattern-white.png'

export default function Footer() {
	return (
		<footer className="h-164.25 md:h-94.5 bg-grey w-full flex items-center py-13 px-6 lg:px-25 lg:py-16.5 relative font-inter">
			<Image
				src={bgPatternImg}
				fill
				sizes="100vw"
				placeholder="blur"
				alt=""
				className="object-cover opacity-3"
			/>
			<div className=" w-full h-full flex flex-col items-center justify-center text-white z-3">
				<div className="flex flex-col md:flex-row justify-between mb-8 w-full">
					<div>
						<Image
							src="/logo-white.svg"
							alt="CamberFarm logo"
							width={130}
							height={75}
						/>
					</div>
					<hr className="w-full bg-white md:hidden border" />
					<div className="mt-3 md:mt-0 flex flex-col text-sm md:text-base">
						<h6 className="font-bold text-base md:text-lg font-poppins">
							Information
						</h6>
						<Link href="/about" className="mt-4 md:mt-6 w-fit">
							About us
						</Link>
						{/* <Link href="/about" className='mt-3'>Our Impact</Link> */}
						<Link href="/blog" className="mt-3 w-fit">
							Blogs
						</Link>
					</div>
					<div className="flex flex-col text-sm md:text-base mt-6 md:mt-0">
						<h6 className="font-bold text-base md:text-lg font-poppins">
							Helpful links
						</h6>
						<Link href="/privacy" className="mt-4 md:mt-6 w-fit">
							Privacy / Support
						</Link>
					</div>
					<div className="flex flex-col md:gap-6 text-sm md:text-base mt-6 md:mt-0">
						<p className="font-bold text-base md:text-lg font-poppins">
							Contact us
						</p>
						<div className="flex gap-3 mt-4 md:mt-0">
							<Image src={mailIcon} alt="Email icon" width={24} height={24} />
							<a href="mailto:camberfarmexport@gmail.com">
								camberfarmexport@gmail.com
							</a>
						</div>
						<div className="flex gap-3 mt-3 md:mt-0">
							<Image src={callIcon} alt="Phone icon" width={24} height={24} />
							<p>
								<a href="tel:+234909746104">+234 90 974 6104</a>,{' '}
								<a href="tel:+2348109748304">+234 810 974 8304</a>
							</p>
						</div>
						<div className="flex gap-3 mt-4 md:mt-0">
							<a href="www.instagram.com" target="_blank">
								<Image
									src={instagramIcon}
									alt="instagram icon"
									width={26.5}
									height={26.5}
								/>
							</a>
							<a href="www.twitter.com" target="_blank">
								<Image
									src={twitterIcon}
									alt="twitter icon"
									width={26.5}
									height={26.5}
								/>
							</a>
							<a href="www.facebook.com" target="_blank">
								<Image
									src={facebookIcon}
									alt="facebook icon"
									width={26.5}
									height={26.5}
								/>
							</a>
							<a href="www.linkedin.com" target="_blank">
								<Image
									src={linkedinIcon}
									alt="linkedin icon"
									width={26.5}
									height={26.5}
								/>
							</a>
						</div>
					</div>
				</div>
				<p className="text-[10px] sm:text-sm">
					Copyright 2026 CamberFarm.Export@All Rights Reserved.
				</p>
			</div>
		</footer>
	)
}
