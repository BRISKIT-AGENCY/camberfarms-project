import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import tomatoesImgSamll from '../assets/img/tomato-shrubs.png'

export default async function Header() {
	const t = await getTranslations('products.hero')
	return (
		<section className="w-full h-[60vh] flex flex-col items-center justify-center px-4 py-10 bg-black/70 text-white relative">
			<picture>
				<source
					media="(min-width: 1024px)"
					srcSet="../images/products-bg-lg.webp"
					type="image/webp"
				/>
				<Image
					src={tomatoesImgSamll}
					fill
					sizes="100vw"
					priority={false}
					placeholder="blur"
					alt="camberfarms nuts"
					className="object-cover object-center"
				/>
			</picture>
			<div
				className="w-full h-full lg:bg-black/10 absolute inset-0 z-1 bg-black/40"
				aria-hidden
			/>
			<div className="w-full sm:w-4/5 md:max-w-3xl flex flex-col items-center justify-center mx-auto mt-10 gap-2 relative z-3">
				<h1 className="font-poppins font-bold text-center text-3xl md:text-4xl lg:text-[46px] leading-9 md:leading-12">
					{t('heading')}
				</h1>
				<p className="font-inter text-sm sm:text-base text-center mt-2 text-light-grey">
					{t('paragraphs.0')}
					<br />
					{t('paragraphs.1')}
				</p>
			</div>
		</section>
	)
}

// TODO fix stretched background image (on desktop)
