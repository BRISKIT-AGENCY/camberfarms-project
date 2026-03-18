import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import farmerImgSmall from '../assets/img/farm-lady.webp'

export default async function Hero() {
	const t = await getTranslations('affiliate.hero')
	return (
		<section className="w-full h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center px-6 py-10 bg-black/70 text-white relative">
			<picture className="">
				<source
					media="(min-width: 1024px)"
					type="image/webp"
					srcSet="../images/affiliate-bg-lg.webp"
				/>
				<Image
					src={farmerImgSmall}
					fill
					priority={false}
					sizes="100vw"
					placeholder="blur"
					alt="a farmer"
					className="object-cover object-center lg:object-fill"
				/>
			</picture>
			<div
				className="w-full lg:hidden h-full absolute inset-0 z-1 bg-black/50"
				aria-hidden
			/>
			<div className="w-full sm:w-4/5 md:max-w-3xl flex flex-col items-center justify-center mx-auto mt-10 gap-2 relative z-3">
				<h1 className="font-poppins font-bold text-center uppercase text-3xl md:text-4xl lg:text-[46px] leading-9 md:leading-12">
					{t('heading')}
				</h1>
				<p className="font-inter text-base text-center mt-2 text-light-grey max-w-2xl mx-auto">
					{t('paragraph')}
				</p>
			</div>
		</section>
	)
}
