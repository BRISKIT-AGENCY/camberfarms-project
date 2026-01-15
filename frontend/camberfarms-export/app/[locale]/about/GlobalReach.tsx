import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import mapImg from '../assets/img/map-img.webp'

export default async function GlobalReach() {
	const t = await getTranslations('about.globalReach')
	return (
		<section className="w-full px-6 sm:px-10 lg:px-20 my-10 flex flex-col-reverse items-center lg:flex-row gap-8 lg:gap-20">
			<Image
				src={mapImg}
				alt="Global reach map"
				// width={3000}
				// height={1500}
				// priority
				placeholder="blur"
				className="w-full rounded-4xl shadow-xs bg-light-green lg:w-1/2 lg:h-100"
				sizes="(max-width: 768px) 100vw, 1200px"
			/>
			<div className="w-full space-y-2 lg:w-1/2 text-center lg:text-left">
				<h2 className="text-primary font-poppins font-bold leading-normal text-2xl lg:text-3xl lg:w-56 xl:text-4xl">
					{t('heading')}
				</h2>

				<p className="lg:text-lg mt-6">{t('paragraph')}</p>
			</div>
		</section>
	)
}
