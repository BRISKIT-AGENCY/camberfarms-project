import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import patternBg from '../assets/img/bg-pattern-white.png'

export default async function OffersAndLocation() {
	const t = await getTranslations('home.offers')

	return (
		<section
			className="w-full h-fit py-10 md:py-14 relative"
			aria-labelledby="special-offers"
		>
			<Image
				src={patternBg}
				alt=""
				fill
				className="object-cover opacity-3"
				aria-hidden
			/>
			<div className="w-full relative z-3">
				<h3
					className="font-poppins font-bold text-center text-xl md:text-2xl"
					id="special-offers"
				>
					{t('headingOffers')}
				</h3>
				<p className="mt-2 mb-12 mx-4 sm:max-w-2xl sm:mx-auto text-base text-balance text-center md:text-wrap text-dark-grey">
					{t('paragraphOffers')}
				</p>

				<article className="w-full bg-primary text-white px-10 py-14 lg:py-16 flex flex-col items-center sm:flex-row sm:justify-between gap-4 gap-y-8 font-poppins">
					<div className="flex flex-1 flex-col items-center gap-2">
						<h6 className="text-sm font-medium leading-relaxed">
							{t('stats.harvest.title')}
						</h6>
						<p className="text-4xl font-bold">{t('stats.harvest.number')}</p>
					</div>
					<div className="flex flex-1 flex-col items-center gap-2">
						<h6 className="text-sm font-medium leading-relaxed">
							{t('stats.bags.title')}
						</h6>
						<p className="text-4xl font-bold">{t('stats.bags.number')}</p>
					</div>
					<div className="flex flex-1 flex-col items-center gap-2">
						<h6 className="text-sm font-medium leading-relaxed">
							{t('stats.equipments.title')}
						</h6>
						<p className="text-4xl font-bold">{t('stats.equipments.number')}</p>
					</div>
				</article>
				<div className="w-11/12 my-16 mx-4 sm:max-w-2xl lg:max-w-4xl sm:mx-auto">
					<h4 className="font-poppins font-bold text-center text-xl md:text-2xl">
						{t('headingLocation.0')} <br aria-hidden /> {t('headingLocation.1')}
					</h4>
					<p className="mt-2 text-base lg:text-lg text-center text-balance text-dark-grey">
						{t('paragraphLocation')}
					</p>
				</div>
			</div>
		</section>
	)
}
