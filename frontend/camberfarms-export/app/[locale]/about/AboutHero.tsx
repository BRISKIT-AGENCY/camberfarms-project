import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import heroImg from '../assets/img/about-hero-img.png'

export default async function AboutHero() {
	const t = await getTranslations('about.hero')
	return (
		<section className="w-full px-6 sm:px-10 lg:px-20 text-center mt-10 mb-20 lg:mt-32">
			<div className="about-hero-content">
				<h1 className="text-primary font-poppins font-bold text-2xl sm:text-3xl my-4">
					{t('heading')}
				</h1>

				<p className="px-6 max-w-3xl mx-auto text-base xl:text-lg">
					{t('paragraph')}
				</p>

				<Link
					href={'/contact'}
					className="w-fit mx-auto flex items-center px-6 py-2 rounded-full capitalize bg-primary text-white text-base font-poppins font-medium my-6"
				>
					{t('button')}
				</Link>
			</div>
			<div className="w-full mx-auto">
				<Image
					className="w-full lg:h-125"
					src={heroImg}
					alt="Agricultural produce"
					// width={3000}
					// height={1500}
					priority
					placeholder="blur"
					sizes="(max-width: 768px) 100vw, 1200px"
				/>
			</div>
		</section>
	)
}
