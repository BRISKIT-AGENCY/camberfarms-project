import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import callIcon from '../assets/icon/call-white.svg'
import facebookIcon from '../assets/icon/facebook-f.svg'
import instagramIcon from '../assets/icon/instagram.svg'
import linkedinIcon from '../assets/icon/linkedin-in.svg'
import mailIcon from '../assets/icon/mail-white.svg'
import twitterIcon from '../assets/icon/twitter-x.svg'
import bgPatternImg from '../assets/img/bg-pattern-white.png'

export default async function Footer() {
	const t = await getTranslations('common.footer')

	return (
		<footer className="h-164.25 lg:h-94.5 bg-grey w-full flex items-center py-13 px-6 lg:px-25 lg:py-16.5 relative font-inter">
			<Image
				src={bgPatternImg}
				fill
				sizes="100vw"
				placeholder="blur"
				alt=""
				className="object-cover opacity-3"
			/>
			<div className="w-full h-full flex flex-col items-center justify-center text-white z-3">
				<div className="flex flex-col lg:flex-row justify-between mb-8 w-full">
					<Link href={'/'}>
						<Image
							src="/logo-white.svg"
							alt="CamberFarm logo"
							width={130}
							height={75}
						/>
					</Link>
					<hr className="w-full h-px outline-0 border-0 bg-light-grey lg:hidden" />
					<div className="mt-4 md:mt-6 lg:mt-0 flex flex-col text-sm lg:text-base">
						<h6 className="font-bold text-base lg:text-lg font-poppins">
							{t('info.heading')}
						</h6>
						<Link href="/about" className="mt-2 lg:mt-6 w-fit">
							{t('info.about')}
						</Link>
						{/* <Link href="/about" className='mt-3'>Our Impact</Link> */}
						<Link href="/blog" className="mt-3 w-fit">
							{t('info.blog')}
						</Link>
					</div>
					<div className="flex flex-col text-sm lg:text-base mt-6 lg:mt-0">
						<h6 className="font-bold text-base lg:text-lg font-poppins">
							{t('links.heading')}
						</h6>
						<Link href="/privacy" className="mt-4 md:mt-6 w-fit">
							{t('links.link')}
						</Link>
					</div>
					<div className="flex flex-col lg:gap-6 text-sm lg:text-base mt-6 lg:mt-0">
						<p className="font-bold text-base lg:text-lg font-poppins">
							{t('contact.heading')}
						</p>
						<div className="flex gap-3 mt-4 lg:mt-0">
							<Image src={mailIcon} alt="Email icon" width={24} height={24} />
							<a href="mailto:camberfarmexport@gmail.com">
								camberfarmexport@gmail.com
							</a>
						</div>
						<div className="flex gap-3 mt-3 lg:mt-0">
							<Image src={callIcon} alt="Phone icon" width={24} height={24} />
							<p>
								<a href="tel:+234909746104">+234 90 974 6104</a>,{' '}
								<a href="tel:+2348109748304">+234 810 974 8304</a>
							</p>
						</div>
						<div className="flex gap-3 mt-4 lg:mt-0">
							<a
								href="https://www.instagram.com/camberexports?igsh=MTI5Nmk2dTc2Mm85OA%3D%3D&utm_source=qr"
								target="_blank"
							>
								<Image
									src={instagramIcon}
									alt="instagram icon"
									width={30.5}
									height={30.5}
								/>
							</a>
							<a href="www.twitter.com" target="_blank">
								<Image
									src={twitterIcon}
									alt="twitter icon"
									width={30.5}
									height={30.5}
								/>
							</a>
							<a
								href="https://www.facebook.com/share/17uHp1Yiyx/?mibextid=wwXIfr"
								target="_blank"
							>
								<Image
									src={facebookIcon}
									alt="facebook icon"
									width={30.5}
									height={30.5}
								/>
							</a>
							<a href="www.linkedin.com" target="_blank">
								<Image
									src={linkedinIcon}
									alt="linkedin icon"
									width={30.5}
									height={30.5}
								/>
							</a>
						</div>
					</div>
				</div>
				<p className="text-[10px] sm:text-sm">{t('copyright')}</p>
			</div>
		</footer>
	)
}
