import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import callIcon from '../assets/icon/call-white.svg'
import locationIcon from '../assets/icon/location-white.svg'
import mailIcon from '../assets/icon/mail-white.svg'
import bgPatternImg from '../assets/img/bg-pattern-white.png'

export default async function Footer() {
	const t = await getTranslations('common.footer')
	const tHero = await getTranslations('home.hero')

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
						<div className="flex gap-3 mt-4 lg:mt-0 max-w-lg">
							<Image src={locationIcon} alt="location" />
							<address className="not-italic decoration-0">
								{tHero('address')}
							</address>
						</div>
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
								href="https://www.instagram.com/camberfarms?igsh=Y21ucmtyZWc3YTJx&amp;utm_source=qr"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 p-2 flex items-center justify-center rounded-full bg-primary"
							>
								<svg
									data-prefix="fab"
									data-icon="instagram"
									className="svg-inline--fa fa-instagram text-white w-full"
									role="img"
									viewBox="0 0 448 512"
									aria-hidden="true"
								>
									<path
										fill="currentColor"
										d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
									></path>
								</svg>
							</a>
							<a
								href="https://www.tiktok.com/@camber.exports?_r=1&amp;_t=ZS-931qhot2Dez"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 flex items-center justify-center rounded-full bg-primary p-2"
							>
								<svg
									data-prefix="fab"
									data-icon="tiktok"
									className="svg-inline--fa fa-tiktok text-white w-full"
									role="img"
									viewBox="0 0 448 512"
									aria-hidden="true"
								>
									<path
										fill="currentColor"
										d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z"
									></path>
								</svg>
							</a>

							<a
								href="https://www.facebook.com/share/17uHp1Yiyx/?mibextid=wwXIfr"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 p-1.5 flex items-center justify-center rounded-full bg-primary"
							>
								<svg
									data-prefix="fab"
									data-icon="facebook-f"
									className="svg-inline--fa fa-facebook-f text-white w-full p-1"
									role="img"
									viewBox="0 0 320 512"
									aria-hidden="true"
								>
									<path
										fill="currentColor"
										d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"
									></path>
								</svg>
							</a>
						</div>
					</div>
				</div>
				<p className="text-[10px] sm:text-sm">{t('copyright')}</p>
			</div>
		</footer>
	)
}
