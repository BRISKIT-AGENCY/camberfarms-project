import Image from 'next/image'
import Link from 'next/link'
import arrowIcon from '../assets/icon/arrow-r-white.svg'
import facebookIcon from '../assets/icon/facebook-f.svg'
import instagramIcon from '../assets/icon/instagram.svg'
import linkedinIcon from '../assets/icon/linkedin-in.svg'
import locationIcon from '../assets/icon/location-white.svg'
import twitterIcon from '../assets/icon/twitter-x.svg'
import nutsBgImgSmall from '../assets/img/nuts-bg.webp'
import tomatoesImg from '../assets/img/tomato-shrubs.png'

import { getTranslations } from 'next-intl/server'

export default async function Hero() {
	const t = await getTranslations('home.hero')

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center px-6 py-10 bg-black/70 text-white relative">
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
				<div className="w-full h-20 sm:h-24 flex flex-col bg-primary mt-20 gap-2">
					<div className="w-full h-1/2 flex items-center justify-between py-4 px-8 relative">
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
								className="w-6 lg:w-8 aspect-square bg-primary rounded-full relative"
							>
								<Image
									src={s.icon}
									alt={s.name}
									fill
									sizes="50px"
									className="object-cover object-center"
								/>
							</a>
						))}
					</div>
					<div className="w-full h-1/2 px-8 flex items-center gap-2 text-[8px] sm:text-sm lg:text-lg lg:gap-4 font-semibold font-poppins">
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
		name: 'x (twitter)',
		url: 'www.twitter.com',
		icon: twitterIcon,
	},
	{
		name: 'facebook',
		url: 'https://www.facebook.com/share/17uHp1Yiyx/?mibextid=wwXIfr',
		icon: facebookIcon,
	},
	{
		name: 'linkedIn',
		url: 'www.linkedin.com',
		icon: linkedinIcon,
	},
]

// TODO fix links
