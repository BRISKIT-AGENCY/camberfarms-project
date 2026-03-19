import Image from 'next/image'
import Link from 'next/link'
import arrowIcon from '../assets/icon/arrow-r-white.svg'
import facebookIcon from '../assets/icon/facebook-f.svg'
import instagramIcon from '../assets/icon/instagram.svg'
import locationIcon from '../assets/icon/location-white.svg'
import nutsBgImgSmall from '../assets/img/nuts-bg.webp'
import tomatoesImg from '../assets/img/tomato-shrubs.png'

import { getTranslations } from 'next-intl/server'

export default async function Hero() {
	const t = await getTranslations('home.hero')

	return (
		<section className="w-full h-svh lg:h-dvh flex flex-col items-center justify-center px-6 py-10 bg-black/70 text-white relative">
			<picture>
				<source
					media="(min-width: 1024px)"
					srcSet="../images/home-bg-lg.webp"
					type="image/webp"
				/>
				<Image
					src={nutsBgImgSmall}
					fill
					priority={false}
					sizes="100vw"
					placeholder="blur"
					alt="camberfarms nuts"
					className="object-cover object-center"
				/>
			</picture>
			<div
				className="w-full h-full absolute inset-0 z-1 bg-black/60 lg:bg-black/30"
				aria-hidden
			/>
			<div className="w-full sm:w-4/5 md:max-w-3xl flex flex-col items-center justify-center mx-auto mt-10 gap-2 relative z-3">
				<h1 className="font-poppins font-bold text-center md:text-balance text-[26px] sm:text-3xl md:text-4xl lg:text-[40px] leading-9 md:leading-12">
					{t('title')}
				</h1>
				<p className="font-inter text-base text-center mt-2 text-light-grey">
					{t('info')}
				</p>
				<Link
					href={'/contact'}
					className="w-fit flex items-center gap-1 px-4 py-2 rounded-full capitalize bg-primary font-sans font-medium mt-6 transition-all duration-200 hover:gap-4 origin-left"
				>
					<span>{t('contact')}</span>
					<Image
						src={arrowIcon}
						alt="arrow forward"
						width={50}
						height={50}
						className="h-full w-auto object-contain"
					/>
				</Link>
				<div className="w-full min-h-20 sm:min-h-24 flex flex-col bg-primary mt-20 gap-2">
					<div className="w-full h-1/2 flex items-center justify-around py-4 px-8 relative">
						<Image
							src={tomatoesImg}
							alt=""
							placeholder="blur"
							fill
							sizes="500px"
							className="object-cover"
						/>
						<div
							className="w-full h-full absolute inset-0 bg-primary/20 bg-blend-screen"
							aria-hidden
						/>
						{SOCIALS.map((s) => (
							<a
								key={s.name}
								href={s.url}
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 lg:w-10 aspect-square bg-primary rounded-full relative"
							>
								<Image
									src={s.icon}
									alt={s.name}
									fill
									// sizes="100px"
									className="object-cover object-center"
								/>
							</a>
						))}
						{/* tiktok */}
						<a
							href="https://www.tiktok.com/@camber.exports?_r=1&amp;_t=ZS-931qhot2Dez"
							target="_blank"
							rel="noopener noreferrer"
							className="w-9 h-9 z-0 flex items-center justify-center rounded-full bg-primary p-2"
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
					</div>
					<div className="w-full min-h-1/2 px-8 flex items-center gap-2 text-[8px] sm:text-sm lg:text-lg lg:gap-4 font-semibold font-poppins">
						<Image
							src={locationIcon}
							alt="location"
							width={50}
							height={50}
							className="w-4 lg:w-6 aspect-square"
						/>

						<address>{t('address')}</address>
					</div>
				</div>
			</div>
		</section>
	)
}

const SOCIALS = [
	{
		name: 'instagram',
		url: 'https://www.instagram.com/camberexports?igsh=MTI5Nmk2dTc2Mm85OA%3D%3D&utm_source=qr',
		icon: instagramIcon,
	},
	{
		name: 'facebook',
		url: 'https://www.facebook.com/share/17uHp1Yiyx/?mibextid=wwXIfr',
		icon: facebookIcon,
	},
]
